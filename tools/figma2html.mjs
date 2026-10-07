// Converts a Figma MCP "design context" React+Tailwind export into a static HTML fragment.
// Usage: node tools/figma2html.mjs <input.tsx> <output.html> <assetsDir> <assetsUrlPrefix>
// Remote Figma asset URLs are downloaded once and renamed by content hash.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ts = require("/opt/node22/lib/node_modules/typescript");

const [, , input, output, assetsDir, assetsPrefix = "assets/img/"] = process.argv;
let src = fs.readFileSync(input, "utf8");
src = src.replace(/^import .*$/gm, "");

const js = ts.transpileModule(src, {
  compilerOptions: {
    jsx: ts.JsxEmit.React,
    jsxFactory: "h",
    jsxFragmentFactory: "Fragment",
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.CommonJS,
  },
}).outputText;

const Fragment = Symbol("Fragment");
const motion = new Proxy({}, { get: (_, tag) => tag });
const flat = (arr) => arr.flat(Infinity).filter((c) => c !== null && c !== undefined && c !== false && c !== true);
function h(type, props, ...children) {
  props = props || {};
  if (typeof type === "function") return type({ ...props, children: flat(children) });
  return { type, props, children: flat([props.children ?? [], children]) };
}

const mod = { exports: {} };
new Function("h", "Fragment", "motion", "module", "exports", "require", js)(h, Fragment, motion, mod, mod.exports, () => ({}));
const Root = mod.exports.default;
const tree = Root({});

// ---- assets ----
const cacheFile = path.join(assetsDir, ".url-cache.json");
fs.mkdirSync(assetsDir, { recursive: true });
const cache = fs.existsSync(cacheFile) ? JSON.parse(fs.readFileSync(cacheFile, "utf8")) : {};
function localAsset(url) {
  if (!/^https:\/\/www\.figma\.com\/api\/mcp\/asset\//.test(url)) return url;
  if (cache[url]) return assetsPrefix + cache[url];
  const ext = (url.match(/\.(png|svg|jpg|jpeg|gif|webp)$/i) || [, "png"])[1].toLowerCase();
  const tmp = path.join(assetsDir, ".dl.tmp");
  execFileSync("curl", ["-sSfL", "--retry", "3", "-o", tmp, url]);
  const buf = fs.readFileSync(tmp);
  const name = crypto.createHash("sha1").update(buf).digest("hex").slice(0, 14) + "." + ext;
  fs.renameSync(tmp, path.join(assetsDir, name));
  cache[url] = name;
  fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 1));
  return assetsPrefix + name;
}

// ---- class rewrites ----
const WEIGHTS = { Thin: 100, Light: 300, Regular: 400, Medium: 500, SemiBold: 600, Bold: 700, Black: 900 };
function fixClass(cls) {
  return cls
    .split(/\s+/)
    .filter(Boolean)
    .flatMap((c) => {
      const m = c.match(/^font-\['([^:]+):([^']+)'\]$/);
      if (m) {
        const fam = m[1].toLowerCase().replace(/[^a-z]+/g, "-").replace(/-+$/, "");
        const w = WEIGHTS[m[2]] ?? 400;
        return [`ff-${fam}`, `font-[${w}]`];
      }
      if (c === "content-stretch") return [];
      return [c];
    })
    .join(" ");
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = (s) => esc(s).replace(/"/g, "&quot;");
const VOID = new Set(["img", "br", "input", "hr", "meta", "link", "source"]);
const kebab = (k) => (k.startsWith("--") ? k : k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()));

function render(node) {
  if (typeof node === "string" || typeof node === "number") return esc(node);
  if (Array.isArray(node)) return node.map(render).join("");
  if (node.type === Fragment) return node.children.map(render).join("");
  const { type, props, children } = node;
  let attrs = "";
  for (let [k, v] of Object.entries(props)) {
    if (k === "children" || k === "key" || v === undefined || v === null || v === false) continue;
    if (k === "className") { k = "class"; v = fixClass(v); }
    if (k === "htmlFor") k = "for";
    if (k === "style") v = Object.entries(v).map(([sk, sv]) => `${kebab(sk)}:${sv}`).join(";");
    if (k === "src" || k === "href") v = localAsset(v);
    attrs += v === true ? ` ${k}` : ` ${k}="${escAttr(v)}"`;
  }
  if (VOID.has(type)) return `<${type}${attrs}>`;
  return `<${type}${attrs}>${children.map(render).join("")}</${type}>`;
}

fs.writeFileSync(output, render(tree) + "\n");
console.log("wrote", output);
