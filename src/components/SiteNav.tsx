import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

type NavItem = { label: string; href: string; key: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Services", href: "/services", key: "Services" },
  { label: "Products", href: "/products", key: "Products" },
  { label: "Work", href: "/work", key: "Work" },
  { label: "Insights", href: "/insights", key: "Insights" },
];

const ON = "oklch(0.45 0.16 250)";
const OFF = "oklch(0.38 0.02 250)";

/**
 * Sticky, responsive site navigation. Desktop links / mobile hamburger are
 * toggled purely by CSS media queries (see globals.css); React state only
 * controls whether the mobile dropdown panel is open.
 */
export function SiteNav({ active = "" }: { active?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "oklch(0.985 0.004 250 / 0.92)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid oklch(0.9 0.006 250)",
        fontFamily: "'Outfit',system-ui,sans-serif",
      }}
    >
      <nav
        aria-label="Primary"
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "14px clamp(20px,4vw,40px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 11,
            textDecoration: "none",
            flex: "none",
          }}
        >
          <Logo size={28} variant="brand" />
          <span style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
            <span
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 21,
                fontWeight: 600,
                letterSpacing: "-0.03em",
                color: "oklch(0.22 0.02 250)",
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
                color: "oklch(0.45 0.16 250)",
              }}
            >
              Enterprise
            </span>
          </span>
        </Link>

        <div
          className="vx-nav-links"
          style={{ alignItems: "center", gap: 26, fontSize: 15 }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.key;
            return (
              <Link
                key={item.key}
                to={item.href}
                aria-current={isActive ? "page" : undefined}
                className="vx-navlink"
                style={{
                  color: isActive ? ON : OFF,
                  fontWeight: isActive ? 500 : 400,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/contact"
            className="vx-cta"
            style={{
              fontSize: 14,
              fontWeight: 500,
              background: ON,
              color: "#fff",
              padding: "9px 18px",
              borderRadius: 8,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Talk to us
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          className="vx-nav-burger vx-burger"
          style={{
            flexDirection: "column",
            gap: 4,
            width: 40,
            height: 36,
            alignItems: "center",
            justifyContent: "center",
            background: "oklch(1 0 0)",
            border: "1px solid oklch(0.9 0.006 250)",
            borderRadius: 9,
            cursor: "pointer",
            padding: 0,
          }}
        >
          <span style={burgerBar} />
          <span style={burgerBar} />
          <span style={burgerBar} />
        </button>
      </nav>

      <div
        className="vx-nav-panel"
        data-open={open}
        style={{
          flexDirection: "column",
          borderTop: "1px solid oklch(0.92 0.006 250)",
          background: "oklch(0.99 0.003 250)",
          padding: "8px clamp(20px,4vw,40px) 18px",
        }}
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.key}
            to={item.href}
            onClick={() => setOpen(false)}
            style={{
              fontSize: 16,
              color: "oklch(0.3 0.02 250)",
              textDecoration: "none",
              padding: "13px 0",
              borderBottom: "1px solid oklch(0.94 0.006 250)",
            }}
          >
            {item.label}
          </Link>
        ))}
        <Link
          to="/contact"
          onClick={() => setOpen(false)}
          style={{
            marginTop: 14,
            textAlign: "center",
            fontSize: 15,
            fontWeight: 500,
            background: ON,
            color: "#fff",
            padding: "13px 18px",
            borderRadius: 9,
            textDecoration: "none",
          }}
        >
          Talk to us
        </Link>
      </div>
    </header>
  );
}

const burgerBar = {
  width: 16,
  height: 1.8,
  background: "oklch(0.35 0.02 250)",
  borderRadius: 2,
} as const;
