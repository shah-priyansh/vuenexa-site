import { Head } from "vite-react-ssg";
import { PAGE_SEO } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

/**
 * Per-page <head> tags — the Vite/vite-react-ssg replacement for Next's
 * per-page `metadata` export. Emits title, description, canonical, Open Graph
 * and Twitter Card tags from the shared PAGE_SEO copy. Site-wide, invariant
 * tags (fonts, robots, JSON-LD) live in index.html.
 */
export function PageHead({ page }: { page: keyof typeof PAGE_SEO }) {
  const seo = PAGE_SEO[page];
  const url = absoluteUrl(seo.path);
  const ogImage = absoluteUrl("/og.png");
  const fullTitle = seo.absoluteTitle
    ? seo.title
    : `${seo.title} | ${siteConfig.name}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords ? (
        <meta name="keywords" content={seo.keywords.join(", ")} />
      ) : null}
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:locale" content={siteConfig.locale} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
}
