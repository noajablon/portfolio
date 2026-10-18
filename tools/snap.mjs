// Grid clean-up pass, run after build.py.
// Figma leaves small gaps between the grid lines, the joints that mark their crossings and the
// images framed by them. This loads each built page at design size (1480px, zoom 1), measures
// every line, joint and raster image, and writes assets/css/snap.css so that:
//   - line ends reach the perpendicular line they stop at,
//   - joints sit centred on the crossing they mark,
//   - image edges reach the line that frames them (no paper showing in between),
//   - lines and joints draw above the images they frame.
// Usage: node tools/snap.mjs [page.html ...]   (needs `python3 -m http.server 8123` running)
import { createRequire } from "module";
import fs from "fs";
import path from "path";
const require = createRequire(import.meta.url);
const { chromium } = require("/opt/node22/lib/node_modules/playwright");

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const PAGES = process.argv.slice(2).length ? process.argv.slice(2) : [
  "maskit-classic.html", "mazor.html", "mnemo.html", "stil.html", "lifta.html", "explainer.html",
  "unmask-qatar.html", "voices-from-the-desert.html", "miansi.html", "sorora.html",
  "about.html", "work-with-me.html", "portfolio-classic.html", "entrance.html",
];
const OUT = path.join(ROOT, "assets", "css", "snap.css");

const measure = async () => {
  const LINE_END = 10, JOINT = 6, EDGE = 8;
  const stage = document.querySelector(".stage");
  const sb = stage.getBoundingClientRect();
  const box = (e) => {
    const b = e.getBoundingClientRect();
    return { x: b.left - sb.left, y: b.top - sb.top, r: b.right - sb.left, b: b.bottom - sb.top, w: b.width, h: b.height };
  };
  const skip = (e) => e.closest(".fx, .marquee, .pv, .reel, .gal, [data-name='Marquee'], [data-name='Header Title']");
  const frameEl = stage.querySelector(".frame") || stage;
  const ided = [...stage.querySelectorAll("[data-node-id]")].filter((e) => !skip(e));

  // Lines: Figma exports them as zero-width (or zero-height) boxes holding a stretched SVG.
  const H = [], V = [];
  for (const e of ided) {
    const g = box(e);
    if (e.dataset.name === "Joint" || !e.querySelector("img[src$='.svg']") && !e.matches("[class*='bg-[#363636]']")) continue;
    if (g.h <= 5 && g.w > 30) H.push({ e, y: g.y + g.h / 2, a: g.x, z: g.r, g });
    else if (g.w <= 5 && g.h > 30) V.push({ e, x: g.x + g.w / 2, a: g.y, z: g.b, g });
  }
  // Raster images and videos: the innermost id'd box that clips them.
  const media = [];
  for (const e of ided) {
    if (e.closest("a, button:not(.has-media)")) continue;
    const g = box(e);
    if (g.w < 120 || g.h < 120 || e.offsetParent !== frameEl) continue;
    const m = e.querySelector("video, img:not([src$='.svg'])");
    if (!m) continue;
    if ([...e.querySelectorAll("[data-node-id]")].some((c) => { const k = box(c); return k.w >= 60 && k.h >= 60 && c.querySelector("video, img:not([src$='.svg'])"); })) continue;
    const cs = getComputedStyle(e);
    if (cs.position !== "absolute") continue;
    if (cs.transform !== "none") {
      const t = new DOMMatrix(cs.transform);
      if (t.b || t.c || Math.abs(Math.abs(t.a) - 1) > 1e-6 || Math.abs(Math.abs(t.d) - 1) > 1e-6) continue;
    }
    media.push({ e, g });
  }

  const fix = new Map();
  const set = (e, k, v) => { if (!fix.has(e)) fix.set(e, {}); fix.get(e)[k] = v; };
  const cs = (e) => getComputedStyle(e);

  // 0. Artwork pages: one grid like the Portfolio page. Figma draws the outer columns twice (87 + 103,
  // 1377 + 1390) and the top rule twice (180 + 193); keep the outer line of each pair, put the left rule
  // on 87 like the Portfolio page, and send whatever touched a removed line to the kept one.
  const aliasV = [], aliasH = [];
  if (document.body.classList.contains("art-page")) {
    const ov = (p, q) => Math.min(p.z, q.z) - Math.max(p.a, q.a);
    for (const v of V) for (const w of V) {
      if (v === w || v.dead || w.dead) continue;
      const d = w.x - v.x;
      if (d > 10 && d < 16 && ov(v, w) > 0.6 * Math.min(v.z - v.a, w.z - w.a)) {
        const inner = v.x < 740 ? w : v, outer = inner === w ? v : w;
        inner.dead = true;
        aliasV.push({ from: inner.x, to: outer.x, a: inner.a, z: inner.z });
      }
    }
    for (const h of H) if (h.y > 189 && h.y < 197 && H.some((k) => k !== h && k.y > 176 && k.y < 184 && ov(k, h) > 200)) {
      h.dead = true;
      aliasH.push({ from: h.y, to: H.find((k) => k !== h && k.y > 176 && k.y < 184).y, a: h.a, z: h.z });
    }
    for (const l of [...V, ...H]) if (l.dead) set(l.e, "display", "none");
    V.splice(0, V.length, ...V.filter((l) => !l.dead));
    H.splice(0, H.length, ...H.filter((l) => !l.dead));
    // the left rule sits on 87 (centre 87.5), as on the Portfolio page
    for (const v of V) if (v.x > 88 && v.x < 94) {
      const d = 87.5 - v.x;
      set(v.e, "left", parseFloat(cs(v.e).left) + d);
      for (const al of aliasV) if (Math.abs(al.to - v.x) < 0.6) al.to = 87.5;
      v.x = 87.5;
    }
    const mapX = (x, y) => { for (const al of aliasV) if (Math.abs(x - al.from) <= 6 && y >= al.a - 8 && y <= al.z + 8) return al.to; return x; };
    const mapY = (y, x) => { for (const al of aliasH) if (Math.abs(y - al.from) <= 6 && x >= al.a - 8 && x <= al.z + 8) return al.to; return y; };
    for (const h of H) {
      const l = mapX(h.a, h.y), r = mapX(h.z, h.y);
      if (l !== h.a || r !== h.z) { set(h.e, "left", parseFloat(cs(h.e).left) + (l - h.a)); set(h.e, "width", r - l); set(h.e, "right", "auto"); h.a = l; h.z = r; }
    }
    for (const v of V) {
      const t = mapY(v.a, v.x), b = mapY(v.z, v.x);
      if (t !== v.a || b !== v.z) { set(v.e, "top", parseFloat(cs(v.e).top) + (t - v.a)); set(v.e, "height", b - t); set(v.e, "bottom", "auto"); v.a = t; v.z = b; }
    }
    window.__alias = { mapX, mapY };
  }
  const mapX = window.__alias ? window.__alias.mapX : (x) => x, mapY = window.__alias ? window.__alias.mapY : (y) => y;

  // 1. Line ends reach the perpendicular line.
  const near = (v, list, key, lo, hi, tol) => {
    let best = null;
    for (const l of list) {
      if (lo < l.a - 1 || lo > l.z + 1) continue;
      const d = l[key] - v;
      if (Math.abs(d) <= tol && (best === null || Math.abs(d) < Math.abs(best))) best = d;
    }
    return best;
  };
  for (const v of V) {
    const dt = near(v.a, H, "y", v.x, 0, LINE_END), db = near(v.z, H, "y", v.x, 0, LINE_END);
    const top = v.a + (dt !== null && Math.abs(dt) > 0.05 ? dt : 0), bot = v.z + (db !== null && Math.abs(db) > 0.05 ? db : 0);
    if (top !== v.a || bot !== v.z) {
      set(v.e, "top", parseFloat(cs(v.e).top) + (top - v.a));
      set(v.e, "height", bot - top);
      set(v.e, "bottom", "auto");
      v.a = top; v.z = bot;
    }
  }
  for (const h of H) {
    const dl = near(h.a, V, "x", h.y, 0, LINE_END), dr = near(h.z, V, "x", h.y, 0, LINE_END);
    const l = h.a + (dl !== null && Math.abs(dl) > 0.05 ? dl : 0), r = h.z + (dr !== null && Math.abs(dr) > 0.05 ? dr : 0);
    if (l !== h.a || r !== h.z) {
      set(h.e, "left", parseFloat(cs(h.e).left) + (l - h.a));
      set(h.e, "width", r - l);
      set(h.e, "right", "auto");
      h.a = l; h.z = r;
    }
  }

  // 2. Joints sit on the crossing.
  const stray = [];
  for (const j of ided.filter((e) => e.dataset.name === "Joint")) {
    const g = box(j), cx0 = g.x + g.w / 2, cy0 = g.y + g.h / 2, cx = mapX(cx0, cy0), cy = mapY(cy0, cx0);
    let bx = null, by = null;
    for (const v of V) if (cy >= v.a - JOINT && cy <= v.z + JOINT && Math.abs(v.x - cx) <= JOINT && (bx === null || Math.abs(v.x - cx) < Math.abs(bx))) bx = v.x - cx;
    for (const h of H) if (cx >= h.a - JOINT && cx <= h.z + JOINT && Math.abs(h.y - cy) <= JOINT && (by === null || Math.abs(h.y - cy) < Math.abs(by))) by = h.y - cy;
    // On the artwork pages Figma's joint layer sits ~43px right of the grid: a joint on a horizontal line but
    // beside its vertical moves left onto the nearest crossing (up to 50px). A joint with no crossing near is hidden.
    if (bx === null && by !== null) {
      let best = null;
      for (const v of V) if (cy >= v.a - JOINT && cy <= v.z + JOINT && v.x < cx && cx - v.x <= 50 && (best === null || cx - v.x < Math.abs(best))) best = v.x - cx;
      if (best !== null) bx = best;
    }
    if (bx === null || by === null) { set(j, "display", "none"); stray.push(j.dataset.nodeId); continue; }
    bx += cx - cx0; by += cy - cy0;
    if (Math.abs(bx) > 0.05) set(j, "left", parseFloat(cs(j).left) + bx);
    if (Math.abs(by) > 0.05) set(j, "top", parseFloat(cs(j).top) + by);
    set(j, "z-index", 3);
  }

  // 3. Image edges reach their framing line (its centre, so the line covers the seam).
  const frame = (pos, list, key, lo, hi) => {
    let best = null;
    for (const l of list) {
      const ov = Math.min(hi, l.z) - Math.max(lo, l.a);
      if (ov < (hi - lo) * 0.5) continue;
      const d = l[key] - pos;
      if (Math.abs(d) <= EDGE && (best === null || Math.abs(d) < Math.abs(best))) best = d;
    }
    return best;
  };
  for (const { e, g } of media) {
    const al = (v, m) => { const t = m(v); return t !== v ? t - v : null; };
    const dl = al(g.x, (x) => mapX(x, (g.y + g.b) / 2)) ?? frame(g.x, V, "x", g.y, g.b), dr = al(g.r, (x) => mapX(x, (g.y + g.b) / 2)) ?? frame(g.r, V, "x", g.y, g.b);
    const dt = al(g.y, (y) => mapY(y, (g.x + g.r) / 2)) ?? frame(g.y, H, "y", g.x, g.r), db = al(g.b, (y) => mapY(y, (g.x + g.r) / 2)) ?? frame(g.b, H, "y", g.x, g.r);
    const L = g.x + (dl ?? 0), R = g.r + (dr ?? 0), T = g.y + (dt ?? 0), B = g.b + (db ?? 0);
    if ([L - g.x, R - g.r, T - g.y, B - g.b].every((d) => Math.abs(d) <= 0.05)) continue;
    const c = cs(e);
    const left = parseFloat(c.left) + (L - g.x), top = parseFloat(c.top) + (T - g.y);
    // Apply, then correct for percentage translates that move with the new size.
    Object.assign(e.style, { left: left + "px", top: top + "px", width: R - L + "px", height: B - T + "px", right: "auto", bottom: "auto" });
    const n = box(e);
    set(e, "left", left + (L - n.x));
    set(e, "top", top + (T - n.y));
    set(e, "width", R - L);
    set(e, "height", B - T);
    set(e, "right", "auto");
    set(e, "bottom", "auto");
  }

  // 4. Lines draw above images, unless they would cut across the middle of one.
  const inside = (l, vertical) => media.some(({ g }) => vertical
    ? l.x > g.x + 2 && l.x < g.r - 2 && Math.min(l.z, g.b) - Math.max(l.a, g.y) > 4
    : l.y > g.y + 2 && l.y < g.b - 2 && Math.min(l.z, g.r) - Math.max(l.a, g.x) > 4);
  for (const v of V) if (!inside(v, true)) set(v.e, "z-index", 2);
  for (const h of H) if (!inside(h, false)) set(h.e, "z-index", 2);

  // 5. Draw lines as solid boxes instead of stretched SVGs, so the browser snaps them to whole
  // pixels the same way it snaps the joints. Stretched SVGs get blurred over two pixels at most
  // zoom levels and drift off the joints.
  const svgs = new Map();
  const solid = new Map();
  for (const l of [...H, ...V]) {
    const img = l.e.querySelector("img[src$='.svg']");
    if (!img) continue;
    const src = img.getAttribute("src");
    if (!svgs.has(src)) svgs.set(src, await fetch(src).then((x) => x.text()).catch(() => ""));
    const t = svgs.get(src);
    const paths = t.match(/<(path|line)\b[^>]*>/g) || [];
    if (paths.length !== 1 || /dasharray|<(rect|circle|g)\b/.test(t)) continue;
    if (paths[0].startsWith("<path")) {
      const d = (paths[0].match(/ d="([^"]+)"/) || [])[1] || "";
      if (!/^M[-\d.e\s,]+[LVH][-\d.e\s,]+$/i.test(d.trim())) continue;
    }
    const stroke = (paths[0].match(/stroke="([^"]+)"/) || [])[1];
    const sw = parseFloat((paths[0].match(/stroke-width="([^"]+)"/) || [])[1] || "1");
    const op = parseFloat((paths[0].match(/stroke-opacity="([^"]+)"/) || [])[1] || "1");
    if (!stroke) continue;
    solid.set(l.e, { vertical: V.includes(l), stroke, sw, op });
  }

  const r = (n) => (typeof n === "number" ? `${+n.toFixed(2)}px` : n);
  const rules = [];
  for (const [e, props] of fix) {
    const decl = Object.entries(props).filter(([, v]) => v !== null)
      .map(([k, v]) => `${k}:${k === "z-index" ? v : r(v)}`).join(";");
    rules.push(`[data-node-id="${e.dataset.nodeId}"]{${decl}}`);
  }
  for (const [e, { vertical, stroke, sw, op }] of solid) {
    const id = `[data-node-id="${e.dataset.nodeId}"]`;
    const geo = vertical
      ? `top:0;bottom:0;left:calc(50% - ${sw / 2}px);width:${sw}px`
      : `left:0;right:0;top:calc(50% - ${sw / 2}px);height:${sw}px`;
    rules.push(`${id}>*{visibility:hidden}`);
    rules.push(`${id}::after{content:"";position:absolute;${geo};background:${stroke}${op < 1 ? `;opacity:${op}` : ""}}`);
  }
  const missed = [...H, ...V].filter((l) => !solid.has(l.e)).map((l) => l.e.dataset.nodeId);
  return { missed, rules, counts: { H: H.length, V: V.length, solid: solid.size, media: media.length, fixed: fix.size, stray: stray.length } };
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1480, height: 900 } });
await page.route("**/snap.css*", (r) => r.fulfill({ status: 200, contentType: "text/css", body: "" }));
let css = "/* generated by tools/snap.mjs: do not edit */\n";
for (const p of PAGES) {
  await page.goto(`http://localhost:8123/${p}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const slug = await page.evaluate(() => document.body.className.match(/page-([\w-]+)/)[1]);
  const { rules, counts, missed } = await page.evaluate(measure);
  console.log(p, JSON.stringify(counts), missed.length ? "not redrawn: " + missed.join(" ") : "");
  css += rules.map((x) => `.page-${slug} ${x}`).join("\n") + "\n";
}
await browser.close();
fs.writeFileSync(OUT, css);
console.log("wrote", path.relative(ROOT, OUT));
