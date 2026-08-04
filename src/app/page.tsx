import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { buildMetadata } from "@/lib/seo";
import { html, rootStyle, active } from "@/generated/pages/home";

export const metadata: Metadata = buildMetadata("home");

export default function HomePage() {
  return <PageShell rootStyle={rootStyle} active={active} html={html} />;
}
