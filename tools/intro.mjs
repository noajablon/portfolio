// Lays out the opening section of the artwork pages in the NEW format (Figma "Maskit NEW Redesign"):
// label, logo, Field / Year / Place and the description centred in the 87-1390 box, the side picture gone.
// It measures each page (the Figma layout as built by tools/build.py) and writes assets/css/intro.css.
// Usage: node tools/intro.mjs   (after build.py, before snap.mjs; needs `python3 -m http.server 8123` running)
import { createRequire } from "module";
import fs from "fs";
import path from "path";
const require = createRequire(import.meta.url);
const { chromium } = require("/opt/node22/lib/node_modules/playwright");

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT = path.join(ROOT, "assets", "css", "intro.css");
// The logo of each artwork: the layer(s) between the label and the description.
const LOGO = {
  mazor: ["496:5510"], mnemo: ["462:2491", "462:2492"], stil: ["650:15095", "650:15096"], lifta: ["462:4911"],
  explainer: ["462:5220"], "unmask-qatar": ["462:2854"], "voices-from-the-desert": ["462:3409"],
  miansi: ["462:3866", "462:3874", "462:3877"], sorora: ["462:2473"],
};
// Where the logo's visible artwork sits, when the layer is larger than it (clipped or padded art).
const BOX = { sorora: { from: ["462:2474"] }, lifta: { box: { x: 205, y: 340, r: 700, b: 425 } } };
// Logo height in the opening section (Maskit's is 110); a few artworks read better a little larger.
const LOGO_H = { mazor: 76, lifta: 80, explainer: 100, "unmask-qatar": 140, "voices-from-the-desert": 80, miansi: 130, mnemo: 130, stil: 112, sorora: 86 };

// Noa's layout of each opening section, read from the "<Name> NEW" frames on the Figma NEW page (design px):
// label top-left, each logo layer's top-left and width (with its width before scaling), Field/Year/Place top,
// description left, top and width. A page listed here is placed exactly as in Figma.
const FIG = {
  mazor: { label: [417, 252], logos: { "496:5510": [417, 291, 644, 644] }, facts: 410, desc: [428, 486, 624] },
  mnemo: { label: [562, 250], logos: { "462:2491": [561, 274, 350, 366], "462:2492": [561, 370, 358, 374] }, facts: 451, desc: [464, 527, 552] },
  stil: { label: [565, 252], logos: { "650:15095": [683, 291, 228, 228], "650:15096": [574, 307, 80, 98] }, facts: 426, desc: [453, 502, 575] },
  lifta: { label: [506, 252], logos: { "462:4911": [494, 140, 476, 506] }, facts: 424, desc: [500, 510, 478], crop: { "462:4911": 0.2071 } },
  explainer: { label: [439, 252], logos: { "462:5220": [439, 291, 600, 630] }, facts: 444, desc: [500, 510, 478] },
  "unmask-qatar": { label: [576, 252], logos: { "462:2854": [573, 291, 331, 389] }, facts: 454, desc: [487, 522, 504] },
  "voices-from-the-desert": { label: [393, 262], logos: { "462:3409": [374, 301, 729, 902] }, facts: 404, desc: [442, 480, 596] },
  miansi: { label: [586, 242], logos: { "462:3866": [587, 281, 304, 322], "462:3874": [586, 375, 73, 77], "462:3877": [679, 387, 210, 223] },
    facts: 454, desc: [494, 529, 530] },
  sorora: { label: [510, 252], logos: { "462:2473": [510, 110, 456, 456] }, facts: 420, desc: [487, 496, 504] },
};

const measure = (cfg) => {
  const { logo, logoH, bx, fig } = cfg;
  const CX = 738.5, LOGO_TOP = 291, BOTTOM = 693;
  const stage = document.querySelector(".stage"), sb = stage.getBoundingClientRect();
  const box = (e) => { const b = e.getBoundingClientRect(); return { x: b.left - sb.left, y: b.top - sb.top, r: b.right - sb.left, b: b.bottom - sb.top, w: b.width, h: b.height }; };
  const frame = document.querySelector(".frame");
  const kids = [];
  const walk = (el) => { for (const c of el.children) { if (getComputedStyle(c).display === "contents") walk(c); else kids.push(c); } };
  walk(frame);
  const intro = kids.filter((e) => {
    if (e.matches(".fx, .marquee, .hdr, .ar-facts, .ar-mask")) return false;
    const g = box(e);
    return g.y + g.h / 2 > 182 && g.y + g.h / 2 < 690 && g.h < 560;
  });
  const id = (e) => `[data-node-id="${e.dataset.nodeId}"]`;
  const rules = [];
  const hidden = [];
  const hide = (e) => { if (!e.dataset.nodeId) return; hidden.push(e.dataset.nodeId); rules.push(`${id(e)}{display:none!important}`); };

  const label = intro.find((e) => /^\d\d\/\s/.test((e.innerText || "").trim()));
  const facts = intro.filter((e) => /^(FIELD|YEAR|PLACE)\b/.test((e.innerText || "").trim()));
  const desc = intro.filter((e) => e !== label && !facts.includes(e) && (e.innerText || "").trim().length > 80)
    .sort((a, b) => b.innerText.length - a.innerText.length)[0];
  const logos = logo.map((n) => document.querySelector(`[data-node-id="${n}"]`)).filter(Boolean);

  // Everything else in the opening section goes: the side picture and its column, the old facts and
  // their divider, the small mark beside the label.
  for (const e of intro) {
    if (e === label || e === desc || logos.some((l) => e.contains(l))) continue;
    const g = box(e);
    if (e.dataset.name === "Joint") continue;           // snap.mjs hides joints left without a crossing
    if (g.w <= 3 && g.h > 30 && g.x > 100 && g.x < 1380) { hide(e); continue; }   // inner verticals (side column, facts divider)
    if (g.h <= 3) continue;                              // horizontal rules stay
    if (g.x < 30 || g.x > 1395) continue;                // back / next arrows
    hide(e);
  }
  rules.push(`.side-clip{display:none!important}`);

  // Logo: scaled to its height and centred, top at 291.
  const boxOf = (ns) => ns.map(box).reduce((a, g) => ({ x: Math.min(a.x, g.x), y: Math.min(a.y, g.y), r: Math.max(a.r, g.r), b: Math.max(a.b, g.b) }),
    { x: 1e9, y: 1e9, r: -1e9, b: -1e9 });
  const u = bx && bx.box ? bx.box : bx && bx.from ? boxOf(bx.from.map((n) => document.querySelector(`[data-node-id="${n}"]`))) : logos.map(box).reduce((a, g) => ({ x: Math.min(a.x, g.x), y: Math.min(a.y, g.y), r: Math.max(a.r, g.r), b: Math.max(a.b, g.b) }),
    { x: 1e9, y: 1e9, r: -1e9, b: -1e9 });
  const s = Math.min(logoH / (u.b - u.y), 880 / (u.r - u.x));
  const W = (u.r - u.x) * s, H = (u.b - u.y) * s, X = CX - W / 2;
  const place = (e, ux, uy, x, y, sc) => {
    // Tailwind's -translate-* use the CSS translate property: keep it, and add our move to it.
    const c = getComputedStyle(e), m = new DOMMatrix(c.transform);
    const t0 = c.translate === "none" ? [0, 0] : c.translate.split(" ").map((v, i) =>
      v.endsWith("%") ? parseFloat(v) / 100 * (i ? e.offsetHeight : e.offsetWidth) : parseFloat(v));
    const tx = t0[0] || 0, ty = t0[1] || 0, g = box(e);
    // scale works about an origin in the element's own box (before translate and transform move it)
    rules.push(`${id(e)}{transform-origin:${(ux - g.x + m.e + tx).toFixed(2)}px ${(uy - g.y + m.f + ty).toFixed(2)}px;` +
      `translate:${(x - ux + tx).toFixed(2)}px ${(y - uy + ty).toFixed(2)}px;scale:${sc.toFixed(4)}}`);
  };
  let labelDx = 0;
  if (fig) {
    for (const e of logos) {
      const [x, y, w, w0] = fig.logos[e.dataset.nodeId], g = box(e), sc = w / w0;
      // A lone logo set in a web font runs a little narrower or wider than in Figma: keep it centred on its Figma box.
      const dx = logos.length === 1 ? (w - g.w * sc) / 2 : 0;
      place(e, g.x, g.y, x + dx, y, sc);
      labelDx = dx; // the label keeps to the logo's left edge, as in Figma
      if (fig.crop && fig.crop[e.dataset.nodeId]) rules.push(`${id(e)}{clip-path:inset(0 0 ${(fig.crop[e.dataset.nodeId] * 100).toFixed(2)}% 0)}`);
    }
  } else for (const e of logos) place(e, u.x, u.y, X, LOGO_TOP, s);
  // Label above the logo's left edge, faded like in Figma.
  const LABEL_TOP = 252;
  if (label) {
    const g = box(label);
    const [lx, ly] = fig ? [fig.label[0] + labelDx, fig.label[1]] : [X, LABEL_TOP];
    rules.push(`${id(label)}{translate:${(lx - g.x).toFixed(2)}px ${(ly - g.y).toFixed(2)}px;opacity:.37!important}`);
  }
  const factsTop = fig ? fig.facts : LOGO_TOP + H + 43;
  rules.push(`.ar-facts{top:${factsTop.toFixed(1)}px!important}`);
  const descTop = fig ? fig.desc[1] : factsTop + 76, descLeft = fig ? fig.desc[0] : CX - 301, descW = fig ? fig.desc[2] : 602;
  if (desc) {
    rules.push(`${id(desc)}{left:${descLeft}px!important;width:${descW}px!important;top:${descTop.toFixed(1)}px!important;height:auto!important;` +
      `right:auto!important;bottom:auto!important;text-align:center!important}`);
    rules.push(`${id(desc)} p{text-align:center!important}`);
  }
  const plan = { hidden, X, logoTop: LOGO_TOP, scale: s, union: u, logos: logo, label: label && label.dataset.nodeId, labelTop: LABEL_TOP,
    desc: desc && desc.dataset.nodeId, descLeft, descW, descTop, factsTop,
    facts: [...document.querySelectorAll(".ar-facts b")].map((b) => b.textContent) };
  return { rules, plan, logo: [W, H].map(Math.round), descTop: Math.round(descTop), label: !!label, desc: !!desc };
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1480, height: 900 } });
await page.route("**/intro.css*", (r) => r.fulfill({ status: 200, contentType: "text/css", body: "" }));
let css = "/* generated by tools/intro.mjs: do not edit */\n";
const plans = {};
for (const slug of Object.keys(LOGO)) {
  await page.goto(`http://localhost:8123/${slug}.html`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const r = await page.evaluate(measure, { logo: LOGO[slug], logoH: LOGO_H[slug] || 110, bx: BOX[slug], fig: FIG[slug] });
  console.log(slug, JSON.stringify({ logo: r.logo, descTop: r.descTop, label: r.label, desc: r.desc, rules: r.rules.length }));
  plans[slug] = r.plan;
  css += r.rules.map((x) => `.art-new.page-${slug} ${x}`).join("\n") + "\n";
}
await browser.close();
fs.writeFileSync(OUT, css);
// The same layout as data, for rebuilding the Figma frames on the NEW page.
fs.writeFileSync(path.join(ROOT, "tools", "intro-plan.json"), JSON.stringify(plans, null, 1));
console.log("wrote", path.relative(ROOT, OUT));
