/**
 * og.mjs — generates public/og.png, the static social-share image that replaces
 * Next's dynamic app/opengraph-image.tsx (next/og). Run once and commit the PNG:
 *
 *   npm run og
 *
 * Uses a hand-authored SVG rasterized by @resvg/resvg-js (system fonts), so it
 * has no satori/font-download dependency and is fully reproducible offline.
 */
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "og.png");

// Equalizer-bars mark (top-left), bottom-aligned to y=250.
const bars = [
  { h: 90, o: 0.5 },
  { h: 130, o: 0.72 },
  { h: 170, o: 1 },
  { h: 130, o: 0.72 },
  { h: 90, o: 0.5 },
];
const BAR_W = 44;
const BAR_GAP = 18;
const BAR_BASE = 250;
const BAR_X0 = 90;
const barsSvg = bars
  .map((b, i) => {
    const x = BAR_X0 + i * (BAR_W + BAR_GAP);
    const y = BAR_BASE - b.h;
    return `<rect x="${x}" y="${y}" width="${BAR_W}" height="${b.h}" rx="22" fill="#ffffff" opacity="${b.o}" />`;
  })
  .join("\n    ");

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b1f3a" />
      <stop offset="1" stop-color="#163a63" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <g font-family="Helvetica, Arial, sans-serif">
    ${barsSvg}
    <text x="1110" y="112" text-anchor="end" font-size="26" letter-spacing="2" fill="#7fa8d8">vuenexa.com</text>
    <text x="94" y="382" font-size="24" letter-spacing="10" fill="#8fb7e6">ENTERPRISE</text>
    <text x="90" y="466" font-size="94" font-weight="700" letter-spacing="-3" fill="#ffffff">VueNexa</text>
    <text x="92" y="524" font-size="32" fill="#c7d7ec">Custom software &amp; industrial products</text>
    <text x="92" y="568" font-size="32" fill="#c7d7ec">Real-time loom &amp; machine monitoring</text>
  </g>
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
  font: { loadSystemFonts: true, defaultFontFamily: "Helvetica" },
  background: "#0b1f3a",
});
const png = resvg.render().asPng();
writeFileSync(OUT, png);
console.log(`og: wrote ${OUT} (${png.length} bytes)`);
