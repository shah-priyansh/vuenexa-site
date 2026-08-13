/**
 * Central site configuration. Everything SEO-related (canonical URLs, sitemap,
 * robots, Open Graph) derives from `siteUrl`, so a domain change is one edit here
 * (or one env var).
 */
export const siteUrl = (
  import.meta.env.VITE_SITE_URL || "https://vuenexa.com"
).replace(/\/$/, "");

export const siteConfig = {
  name: "VueNexa Enterprise",
  shortName: "VueNexa",
  url: siteUrl,
  // Used as the default <title> and OG site name.
  title: "VueNexa Enterprise",
  tagline: "Software services & industrial products",
  description:
    "VueNexa Enterprise builds custom software for firms and ships its own products for the textile industry — starting with real-time loom and machine monitoring.",
  locale: "en_US",
  email: "tech@vuenexa.com",
  phone: "+91 72029 76525",
  address: {
    city: "Surat",
    region: "Gujarat",
    country: "IN",
  },
} as const;

/** Canonical, ordered navigation used by the sitemap and nav/footer. */
export const routes = [
  { path: "/", key: "Home" },
  { path: "/services", key: "Services" },
  { path: "/products", key: "Products" },
  { path: "/work", key: "Work" },
  { path: "/insights", key: "Insights" },
  { path: "/contact", key: "Contact" },
  { path: "/privacy", key: "Privacy" },
  { path: "/terms", key: "Terms" },
] as const;

export type RouteKey = (typeof routes)[number]["key"];

/** Absolute URL helper for canonical/OG tags. */
export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
