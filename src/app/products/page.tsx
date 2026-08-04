import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { buildMetadata } from "@/lib/seo";
import { html, rootStyle, active } from "@/generated/pages/products";

export const metadata: Metadata = buildMetadata("products");

export default function ProductsPage() {
  return <PageShell rootStyle={rootStyle} active={active} html={html} />;
}
