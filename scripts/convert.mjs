/**
 * convert.mjs — turns the design-tool HTML exports in _source/*.dc.html into
 * React-consumable content modules.
 *
 * Strategy (faithful port): each page's *middle* markup (everything between the
 * Site Nav and Site Footer imports) is kept as raw HTML and injected server-side
 * via dangerouslySetInnerHTML. This preserves the design byte-for-byte — every
 * inline style, oklch color, and clamp() rule — while React owns the shell
 * (nav, footer, interactions) and Next.js owns routing + SEO.
 *
 * Transforms applied to the middle HTML:
 *   1. style-hover="css"  -> class="vx-hN"  + a scoped `.vx-hN:hover{…!important}`
 *      rule (replicates the original support.js pseudo-sheet behavior exactly).
 *   2. href="Page.dc.html" -> clean route (e.g. /services).
 *   3. ref="{{ frameN }}"  -> data-scale-frame (hook for the scale-to-fit client).
 *
 * Run automatically on predev/prebuild. Output lands in src/generated/ (gitignored).
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "_source");
const OUT = join(ROOT, "src", "generated");
const PAGES_OUT = join(OUT, "pages");

/** Source file (without .dc.html) -> clean route path. */
const PAGE_MAP = {
  Home: "/",
  Services: "/services",
  Products: "/products",
  Work: "/work",
  Insights: "/insights",
  Contact: "/contact",
  Privacy: "/privacy",
  Terms: "/terms",
};

/** Internal link rewrites: X.dc.html -> route. */
const LINK_MAP = {
  "Home.dc.html": "/",
  "Services.dc.html": "/services",
  "Products.dc.html": "/products",
  "Work.dc.html": "/work",
  "Insights.dc.html": "/insights",
  "Contact.dc.html": "/contact",
  "Privacy.dc.html": "/privacy",
  "Terms.dc.html": "/terms",
};

// --- helpers ---------------------------------------------------------------

/** Mirror support.js importantify(): append !important to each declaration. */
function importantify(css) {
  return css
    .split(";")
    .map((d) => d.trim())
    .filter(Boolean)
    .map((d) => (/!\s*important$/i.test(d) ? d : `${d} !important`))
    .join("; ");
}

/** CSS "a:b; c:d" -> React style object { a: "b", c: "d" } with camelCase keys. */
function cssToStyleObject(css) {
  const obj = {};
  for (const decl of css.split(";")) {
    const t = decl.trim();
    if (!t) continue;
    const idx = t.indexOf(":");
    if (idx === -1) continue;
    const rawKey = t.slice(0, idx).trim();
    const value = t.slice(idx + 1).trim();
    // Preserve custom properties verbatim; camelCase the rest.
    const key = rawKey.startsWith("--")
      ? rawKey
      : rawKey.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    obj[key] = value;
  }
  return obj;
}

// Dedupe identical hover declarations across all pages into shared classes.
const hoverClasses = new Map(); // importantified css -> className
let hoverCounter = 0;
function hoverClassFor(rawCss) {
  const css = importantify(rawCss);
  let cls = hoverClasses.get(css);
  if (!cls) {
    cls = `vx-h${hoverCounter++}`;
    hoverClasses.set(css, cls);
  }
  return cls;
}

/** Extract the inner content of the single <x-dc> wrapper, minus helmet/scripts. */
function extractBody(raw) {
  const start = raw.indexOf("<x-dc>");
  const end = raw.lastIndexOf("</x-dc>");
  if (start === -1 || end === -1) throw new Error("no <x-dc> wrapper found");
  let body = raw.slice(start + "<x-dc>".length, end);
  body = body.replace(/<helmet>[\s\S]*?<\/helmet>/gi, "");
  body = body.replace(/<script[\s\S]*?<\/script>/gi, "");
  return body.trim();
}

function transformMiddle(html) {
  let out = html;

  // 1. style-hover="..." -> class="vx-hN"
  out = out.replace(/\sstyle-hover="([^"]*)"/g, (_, css) => {
    return ` class="${hoverClassFor(css)}"`;
  });

  // Guard: the source uses inline styles, never `class` — so a hover replacement
  // can never collide with an existing class attribute. Assert that stays true.
  const doubleClass = out.match(/class="[^"]*"[^>]*\sclass="/);
  if (doubleClass) {
    throw new Error(
      "element ended up with two class attributes — merge logic needed"
    );
  }

  // 2. internal links Page.dc.html -> clean route
  out = out.replace(/href="([A-Za-z ]+\.dc\.html)"/g, (m, file) => {
    const route = LINK_MAP[file];
    return route ? `href="${route}"` : m;
  });

  // 3. scale-to-fit frame refs -> data hook
  out = out.replace(/\sref="\{\{\s*frame[12]\s*\}\}"/g, " data-scale-frame");

  // Safety: no templating placeholders should survive.
  const leftover = out.match(/\{\{[^}]*\}\}/);
  if (leftover) throw new Error(`unresolved template placeholder: ${leftover[0]}`);

  return out;
}

/** Split a page body into { rootStyle, active, mid }. */
function splitPage(body) {
  // Root wrapper is the first div; capture its style so React can recreate it.
  const wrapMatch = body.match(/^<div style="([^"]*)">/);
  if (!wrapMatch) throw new Error("root wrapper <div style> not found at start");
  const rootStyle = wrapMatch[1];

  const navRe = /<dc-import\s+name="Site Nav"([^>]*)>\s*<\/dc-import>/;
  const footRe = /<dc-import\s+name="Site Footer"([^>]*)>\s*<\/dc-import>/;
  const nav = body.match(navRe);
  const foot = body.match(footRe);
  if (!nav) throw new Error("Site Nav import not found");
  if (!foot) throw new Error("Site Footer import not found");

  const activeMatch = nav[1].match(/active="([^"]*)"/);
  const active = activeMatch ? activeMatch[1] : "";

  const navEnd = nav.index + nav[0].length;
  const footStart = foot.index;

  // Content before the nav (inside wrapper) and after the footer must be empty.
  const beforeNav = body.slice(wrapMatch[0].length, nav.index).trim();
  const afterFoot = body
    .slice(footStart + foot[0].length)
    .replace(/<\/div>\s*$/, "")
    .trim();
  if (beforeNav) throw new Error(`unexpected content before Site Nav: ${beforeNav.slice(0, 80)}`);
  if (afterFoot) throw new Error(`unexpected content after Site Footer: ${afterFoot.slice(0, 80)}`);

  const mid = body.slice(navEnd, footStart).trim();
  return { rootStyle, active, mid };
}

// --- main ------------------------------------------------------------------

rmSync(OUT, { recursive: true, force: true });
mkdirSync(PAGES_OUT, { recursive: true });

const manifest = [];

for (const [name, route] of Object.entries(PAGE_MAP)) {
  const raw = readFileSync(join(SRC, `${name}.dc.html`), "utf8");
  const body = extractBody(raw);
  const { rootStyle, active, mid } = splitPage(body);
  const html = transformMiddle(mid);
  const styleObj = cssToStyleObject(rootStyle);

  const slug = route === "/" ? "home" : route.slice(1);
  const module = `// AUTO-GENERATED by scripts/convert.mjs — do not edit.
import type { CSSProperties } from "react";
export const rootStyle: CSSProperties = ${JSON.stringify(styleObj, null, 2)};
export const active = ${JSON.stringify(active)};
export const html = ${JSON.stringify(html)};
`;
  writeFileSync(join(PAGES_OUT, `${slug}.ts`), module);
  manifest.push({ name, route, slug, active, htmlBytes: html.length });
}

// Global hover stylesheet — one scoped :hover rule per unique declaration set.
let hoverCss =
  "/* AUTO-GENERATED by scripts/convert.mjs — scoped :hover rules ported from support.js */\n";
for (const [css, cls] of hoverClasses) {
  hoverCss += `.${cls}:hover { ${css}; }\n`;
}
writeFileSync(join(OUT, "hover.css"), hoverCss);

writeFileSync(
  join(OUT, "manifest.json"),
  JSON.stringify({ pages: manifest, hoverRules: hoverClasses.size }, null, 2)
);

console.log(
  `convert: ${manifest.length} pages, ${hoverClasses.size} hover rules ->`,
  "src/generated/"
);
for (const m of manifest) {
  console.log(`  ${m.route.padEnd(11)} active=${m.active || "-"} ${m.htmlBytes} bytes`);
}
