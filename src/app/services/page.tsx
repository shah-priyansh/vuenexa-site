import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { buildMetadata } from "@/lib/seo";
import { html, rootStyle, active } from "@/generated/pages/services";

export const metadata: Metadata = buildMetadata("services");

export default function ServicesPage() {
  return <PageShell rootStyle={rootStyle} active={active} html={html} />;
}
