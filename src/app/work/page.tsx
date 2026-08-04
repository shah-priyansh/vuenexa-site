import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { buildMetadata } from "@/lib/seo";
import { html, rootStyle, active } from "@/generated/pages/work";

export const metadata: Metadata = buildMetadata("work");

export default function WorkPage() {
  return <PageShell rootStyle={rootStyle} active={active} html={html} />;
}
