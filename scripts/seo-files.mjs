/**
 * seo-files.mjs — postbuild step. Writes dist/sitemap.xml and dist/robots.txt,
 * the Vite replacements for Next's app/sitemap.ts and app/robots.ts.
 *
 * Routes/priorities mirror src/lib/site.ts + the old app/sitemap.ts. Base URL
 * comes from VITE_SITE_URL (same env var the app reads), defaulting to the
 * production domain.
 */
import { writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");

if (!existsSync(DIST)) {
  console.error("seo-files: dist/ not found — run the build first.");
  process.exit(1);
}

const siteUrl = (process.env.VITE_SITE_URL || "https://vuenexa.com").replace(
  /\/$/,
  ""
);
const abs = (p) => `${siteUrl}${p}`;

// Keep in sync with src/lib/site.ts `routes`.
const routes = [
  "/",
  "/services",
  "/products",
  "/work",
  "/insights",
  "/contact",
  "/privacy",
  "/terms",
];

const priority = {
  "/": 1,
  "/products": 0.9,
  "/services": 0.9,
  "/work": 0.8,
  "/contact": 0.8,
  "/insights": 0.7,
  "/privacy": 0.3,
  "/terms": 0.3,
};

const now = new Date().toISOString();

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes
    .map(
      (p) =>
        `  <url>\n` +
        `    <loc>${abs(p)}</loc>\n` +
        `    <lastmod>${now}</lastmod>\n` +
        `    <changefreq>${p === "/insights" ? "weekly" : "monthly"}</changefreq>\n` +
        `    <priority>${priority[p] ?? 0.6}</priority>\n` +
        `  </url>`
    )
    .join("\n") +
  `\n</urlset>\n`;

const robots =
  `User-agent: *\n` + `Allow: /\n\n` + `Sitemap: ${abs("/sitemap.xml")}\n` + `Host: ${siteUrl}\n`;

writeFileSync(join(DIST, "sitemap.xml"), sitemap);
writeFileSync(join(DIST, "robots.txt"), robots);
console.log("seo-files: wrote dist/sitemap.xml and dist/robots.txt");
