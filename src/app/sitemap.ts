import type { MetadataRoute } from "next";
import { absoluteUrl, routes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const priority: Record<string, number> = {
    "/": 1,
    "/products": 0.9,
    "/services": 0.9,
    "/work": 0.8,
    "/contact": 0.8,
    "/insights": 0.7,
    "/privacy": 0.3,
    "/terms": 0.3,
  };

  return routes.map(({ path }) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/insights" ? "weekly" : "monthly",
    priority: priority[path] ?? 0.6,
  }));
}
