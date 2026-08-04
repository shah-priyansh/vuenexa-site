import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

// Default social-share image for every route (1200x630).
// Satori (next/og) doesn't support oklch(), so this uses hex equivalents.
export const alt =
  "VueNexa Enterprise — Software services & industrial products";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const bars = [
    { h: 150, o: 0.5 },
    { h: 230, o: 0.72 },
    { h: 310, o: 1 },
    { h: 230, o: 0.72 },
    { h: 150, o: 0.5 },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #0b1f3a 0%, #163a63 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
          {bars.map((b, i) => (
            <div
              key={i}
              style={{
                width: 40,
                height: b.h,
                borderRadius: 20,
                background: "#ffffff",
                opacity: b.o,
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
            <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: -2 }}>
              VueNexa
            </div>
            <div
              style={{
                fontSize: 22,
                letterSpacing: 8,
                textTransform: "uppercase",
                color: "#8fb7e6",
              }}
            >
              Enterprise
            </div>
          </div>
          <div style={{ fontSize: 34, color: "#c7d7ec", maxWidth: 900 }}>
            {`${siteConfig.tagline} — custom software & real-time loom monitoring.`}
          </div>
          <div style={{ fontSize: 24, color: "#7fa8d8", letterSpacing: 1 }}>
            vuenexa.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
