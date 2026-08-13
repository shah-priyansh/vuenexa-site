import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { Logo } from "./Logo";
import { siteConfig } from "@/lib/site";

const colStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 11,
  fontSize: 14.5,
  color: "oklch(0.75 0.012 250)",
};

const headStyle: CSSProperties = {
  fontFamily: "'JetBrains Mono',monospace",
  fontSize: 10,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "oklch(0.58 0.015 250)",
  marginBottom: 4,
};

const linkStyle: CSSProperties = { color: "inherit", textDecoration: "none" };

/** Dark site footer, ported 1:1 from Site Footer.dc.html. */
export function SiteFooter() {
  return (
    <footer
      style={{
        background: "oklch(0.21 0.025 250)",
        color: "oklch(0.9 0.01 250)",
        fontFamily: "'Outfit',system-ui,sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "56px clamp(20px,4vw,40px) 32px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 40,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <Logo size={28} variant="mono" />
            <span style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: 20,
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  color: "oklch(0.98 0.003 250)",
                }}
              >
                VueNexa
              </span>
              <span
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: 8.5,
                  fontWeight: 400,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "oklch(0.72 0.09 220)",
                }}
              >
                Enterprise
              </span>
            </span>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 14.5,
              lineHeight: 1.7,
              color: "oklch(0.7 0.012 250)",
              maxWidth: 280,
            }}
          >
            Software services and industrial products for firms that make things.
          </p>
        </div>

        <div style={colStyle}>
          <div style={headStyle}>Company</div>
          <Link className="vx-footlink" to="/services" style={linkStyle}>
            Services
          </Link>
          <Link className="vx-footlink" to="/products" style={linkStyle}>
            Products
          </Link>
          <Link className="vx-footlink" to="/work" style={linkStyle}>
            Work
          </Link>
          <Link className="vx-footlink" to="/insights" style={linkStyle}>
            Insights
          </Link>
        </div>

        <div style={colStyle}>
          <div style={headStyle}>Product</div>
          <Link className="vx-footlink" to="/products" style={linkStyle}>
            Loom monitoring
          </Link>
          <Link className="vx-footlink" to="/products" style={linkStyle}>
            Production dashboard
          </Link>
          <Link className="vx-footlink" to="/products" style={linkStyle}>
            Mobile app
          </Link>
          <Link className="vx-footlink" to="/contact" style={linkStyle}>
            Request a demo
          </Link>
        </div>

        <div style={colStyle}>
          <div style={headStyle}>Contact</div>
          <a
            className="vx-footlink"
            href={`mailto:${siteConfig.email}`}
            style={linkStyle}
          >
            {siteConfig.email}
          </a>
          <a
            className="vx-footlink"
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            style={linkStyle}
          >
            {siteConfig.phone}
          </a>
          <span>
            {siteConfig.address.city}, {siteConfig.address.region}
          </span>
          <Link className="vx-footlink" to="/terms" style={linkStyle}>
            Terms of Service
          </Link>
          <Link className="vx-footlink" to="/privacy" style={linkStyle}>
            Privacy Policy
          </Link>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 clamp(20px,4vw,40px) 40px",
        }}
      >
        <div
          style={{
            borderTop: "1px solid oklch(0.3 0.02 250)",
            paddingTop: 20,
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "space-between",
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 11,
            color: "oklch(0.58 0.015 250)",
          }}
        >
          <span>© 2026 VueNexa Enterprise</span>
          <span>We build with care and deliver with pride.</span>
        </div>
      </div>
    </footer>
  );
}
