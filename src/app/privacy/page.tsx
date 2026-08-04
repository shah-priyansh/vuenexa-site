import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { buildMetadata } from "@/lib/seo";
import { html, rootStyle, active } from "@/generated/pages/privacy";

export const metadata: Metadata = buildMetadata("privacy");

export default function PrivacyPage() {
  return <PageShell rootStyle={rootStyle} active={active} html={html} />;
}
