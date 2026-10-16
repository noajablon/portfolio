// The end of each artwork page (after build.py, intro.mjs and snap.mjs): a full-width rule under the last
// picture with a joint on every line that meets it, then Maskit's previous / to top / next buttons below it,
// and the page ends 80px under them. Edits the built pages in place.
// Usage: node tools/ends.mjs   (needs `python3 -m http.server 8123` running)
import { createRequire } from "module";
import fs from "fs";
import path from "path";
const require = createRequire(import.meta.url);
const { chromium } = require("/opt/node22/lib/node_modules/playwright");

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const PAGES = ["mazor", "mnemo", "stil", "lifta", "explainer", "unmask-qatar", "voices-from-the-desert", "miansi", "sorora"];

const measure = () => {
  const stage = document.querySelector(".stage"), sb = stage.getBoundingClientRect();
  const box = (e) => { const b = e.getBoundingClientRect(); return { x: b.left - sb.left, y: b.top - sb.top, r: b.right - sb.left, b: b.bottom - sb.top, w: b.width, h: b.height }; };
  const shown = (e) => { for (let p = e; p && p !== stage; p = p.parentElement) { const c = getComputedStyle(p); if (c.display === "none" || c.visibility === "hidden") return false; } return true; };
  const skip = ".fx, .ar-mask, .ar-end, .sc-pop, .sc-fab, .hdr, .marquee, .ar-btn";
  let bottom = 0;
  for (const m of document.querySelectorAll(".frame img, .frame video")) {
    if (m.closest(skip) || /\.svg/.test(m.currentSrc || m.src) || !shown(m)) continue;
    // the visible part: clipped by the nearest box that hides overflow
    let g = box(m);
    for (let p = m.parentElement; p && !p.matches(".frame"); p = p.parentElement) {
      if (getComputedStyle(p).overflow !== "visible") { const k = box(p); g = { ...g, b: Math.min(g.b, k.b), w: Math.min(g.r, k.r) - Math.max(g.x, k.x) }; }
    }
    if (g.w < 300 || g.b - g.y < 60) continue;   // pictures, not the small phones or stickers laid over them
    bottom = Math.max(bottom, g.b);
  }
  // Panels drawn as a fill (a gradient or a colour) count as pictures too.
  for (const e of document.querySelectorAll(".frame [data-node-id]")) {
    if (e.closest(skip) || !shown(e)) continue;
    const c = getComputedStyle(e);
    const fill = c.backgroundImage !== "none" || !/^(rgba\(0, 0, 0, 0\)|transparent|rgb\(245, 243, 241\))$/.test(c.backgroundColor);
    const g = box(e);
    if (fill && g.w >= 300 && g.h >= 120) bottom = Math.max(bottom, g.b);
  }
  bottom = Math.round(bottom);
  // Vertical lines reaching that point (Figma lines and the added ones).
  const xs = new Set(), clip = [];
  for (const e of document.querySelectorAll(".frame [data-node-id], .frame .xl-v")) {
    if (e.closest(skip) || !shown(e) || e.dataset.name === "Joint") continue;
    const g = box(e);
    if (!(g.w <= 3 && g.h > 30)) continue;
    if (!e.matches(".xl-v") && !e.querySelector("img[src$='.svg']")) continue;
    if (g.y <= bottom + 1 && g.b >= bottom - 1) xs.add(Math.round((g.x + g.w / 2) * 2) / 2);
    // a line that runs just past the end rule stops on it
    if (e.dataset.nodeId && g.y < bottom && g.b > bottom + 1 && g.b < bottom + 60) clip.push([e.dataset.nodeId, g.b - bottom]);
  }
  // Figma's own rules and joints around that point give way to the one end rule.
  const hide = [];
  for (const e of document.querySelectorAll(".frame [data-node-id]")) {
    if (e.closest(skip) || !shown(e)) continue;
    const g = box(e), cy = g.y + g.h / 2;
    if (cy < bottom - 25 || cy > bottom + 40) continue;
    const line = g.h <= 20 && g.w > 600 && (e.querySelector("img[src$='.svg']") || e.matches("[class*='bg-[#363636]']"));
    const joint = e.dataset.name === "Joint" && g.w < 9;
    if (line || joint) hide.push(e.dataset.nodeId);
  }
  return { bottom, xs: [...xs].sort((a, b) => a - b), hide, clip };
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1480, height: 900 } });
for (const slug of PAGES) {
  const file = path.join(ROOT, slug + ".html");
  let html = fs.readFileSync(file, "utf8").replace(/<i class="end-[^"]*"[^>]*><\/i>/g, "").replace(/<style class="end-css">[^<]*<\/style>/g, "");
  fs.writeFileSync(file, html);
  await page.goto(`http://localhost:8123/${slug}.html`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: ".reveal{transform:none!important;transition:none!important}" });
  const { bottom, xs, hide, clip } = await page.evaluate(measure);
  const top = bottom + 66, H = top + 115 + 80;
  const css = (hide.length ? hide.map((n) => `.page-${slug} [data-node-id="${n}"]`).join(",") + "{display:none!important}" : "") +
    clip.map(([n, d]) => `.page-${slug} [data-node-id="${n}"]{clip-path:inset(-5px -5px ${d.toFixed(1)}px -5px)}`).join("");
  const add = (css ? `<style class="end-css">${css}</style>` : "") + `<i class="end-h xl-h" style="top:${bottom - 0.5}px"></i>` +
    xs.map((x) => `<i class="end-j xl-j" style="left:${x - 2.5}px;top:${bottom - 2.5}px"></i>`).join("");
  html = html.replace(/<nav([^>]*class="ar-end"[^>]*style="left:[\d.]+px;)top:[\d.]+px/, `${add}<nav$1top:${top}px`);
  // The page (stage) ends there; the frame keeps its Figma height, which its % positions refer to.
  html = html.replace(/<div id="stage" class="stage"[^>]*>/, `<div id="stage" class="stage" style="height:${H}px">`);
  fs.writeFileSync(file, html);
  console.log(slug, { bottom, xs, H, hidden: hide.length });
}
await browser.close();
