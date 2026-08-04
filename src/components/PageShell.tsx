import type { CSSProperties } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { SiteInteractions } from "./SiteInteractions";

type PageShellProps = {
  /** Root wrapper style captured from the source page (background, overflow, etc.). */
  rootStyle: CSSProperties;
  /** Active nav key ("Services" | "Products" | "Work" | "Insights" | ""). */
  active?: string;
  /** Pre-converted middle HTML for the page, injected server-side (SSG). */
  html: string;
};

/**
 * Assembles a page: brand shell (nav + footer) around the faithfully-ported
 * page markup. The middle HTML is rendered on the server so crawlers receive
 * fully-formed content; client interactions layer on afterward.
 */
export function PageShell({ rootStyle, active = "", html }: PageShellProps) {
  return (
    <div style={rootStyle}>
      <SiteNav active={active} />
      {/* flexGrow keeps the footer pinned to the bottom on the flex-column
          Contact layout; it's inert on the default block-flow pages. */}
      <main
        style={{ flexGrow: 1 }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <SiteFooter />
      <SiteInteractions />
    </div>
  );
}
