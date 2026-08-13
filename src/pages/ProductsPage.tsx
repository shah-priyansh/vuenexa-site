import { PageShell } from "@/components/PageShell";
import { PageHead } from "@/components/PageHead";
import { html, rootStyle, active } from "@/generated/pages/products";

export default function ProductsPage() {
  return (
    <>
      <PageHead page="products" />
      <PageShell rootStyle={rootStyle} active={active} html={html} />
    </>
  );
}
