import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { buildMetadata } from "@/lib/seo";
import { html, rootStyle, active } from "@/generated/pages/contact";

export const metadata: Metadata = buildMetadata("contact");

export default function ContactPage() {
  return <PageShell rootStyle={rootStyle} active={active} html={html} />;
}
