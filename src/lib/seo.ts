import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  /** When true, use `title` verbatim (no "| VueNexa Enterprise" suffix). */
  absoluteTitle?: boolean;
  keywords?: string[];
};

/** Per-page SEO copy, written from each page's real hero content. */
export const PAGE_SEO: Record<string, PageSeo> = {
  home: {
    path: "/",
    absoluteTitle: true,
    title: "VueNexa Enterprise — Software Services & Industrial Products",
    description: siteConfig.description,
    keywords: [
      "VueNexa",
      "custom software development",
      "loom monitoring",
      "textile machine monitoring",
      "industrial software",
      "Surat software company",
    ],
  },
  services: {
    path: "/services",
    title: "Software Services",
    description:
      "Engineering teams that stay with the system after launch. Most engagements start with one system and grow into a standing team — short cycles, on site where it matters.",
    keywords: [
      "software services",
      "custom software development",
      "dedicated engineering team",
      "software consulting",
    ],
  },
  products: {
    path: "/products",
    title: "Products — Loom & Machine Monitoring",
    description:
      "Loom monitoring and production reporting for textile mills. Each machine reports its status over WiFi — supervisors watch the floor in real time and owners get the numbers that matter every shift.",
    keywords: [
      "loom monitoring",
      "textile production dashboard",
      "machine monitoring",
      "real-time loom monitoring",
      "textile mill software",
    ],
  },
  work: {
    path: "/work",
    title: "Our Work",
    description:
      "Teams we've built and shipped software with — from advisory firms and telecoms to AI products and manufacturing floors.",
    keywords: ["case studies", "portfolio", "clients", "software projects"],
  },
  insights: {
    path: "/insights",
    title: "Insights",
    description:
      "Notes from the floor and from the codebase — field notes on building software and industrial products.",
    keywords: ["insights", "engineering blog", "field notes"],
  },
  contact: {
    path: "/contact",
    title: "Contact",
    description:
      "Tell us what you're trying to build. Send a short note about the problem and we'll reply with an honest view of whether we're the right team for it.",
    keywords: ["contact", "start a project", "request a demo"],
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy",
    description:
      "How VueNexa Enterprise collects, uses, and protects personal information across vuenexa.com and its services.",
  },
  terms: {
    path: "/terms",
    title: "Terms of Service",
    description:
      "The terms governing use of vuenexa.com and the services, software, and products supplied by VueNexa Enterprise.",
  },
};

/** Build a Next.js Metadata object (canonical + Open Graph + Twitter) for a page. */
export function buildMetadata(key: keyof typeof PAGE_SEO): Metadata {
  const seo = PAGE_SEO[key];
  const url = absoluteUrl(seo.path);
  return {
    title: seo.absoluteTitle ? { absolute: seo.title } : seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: seo.path },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title: seo.absoluteTitle ? seo.title : `${seo.title} | ${siteConfig.name}`,
      description: seo.description,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.absoluteTitle ? seo.title : `${seo.title} | ${siteConfig.name}`,
      description: seo.description,
    },
  };
}
