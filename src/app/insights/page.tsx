import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { buildMetadata } from "@/lib/seo";
import { html, rootStyle, active } from "@/generated/pages/insights";

export const metadata: Metadata = buildMetadata("insights");

export default function InsightsPage() {
  return <PageShell rootStyle={rootStyle} active={active} html={html} />;
}
