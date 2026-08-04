import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { buildMetadata } from "@/lib/seo";
import { html, rootStyle, active } from "@/generated/pages/terms";

export const metadata: Metadata = buildMetadata("terms");

export default function TermsPage() {
  return <PageShell rootStyle={rootStyle} active={active} html={html} />;
}
