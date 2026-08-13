import { PageShell } from "@/components/PageShell";
import { PageHead } from "@/components/PageHead";
import { html, rootStyle, active } from "@/generated/pages/services";

export default function ServicesPage() {
  return (
    <>
      <PageHead page="services" />
      <PageShell rootStyle={rootStyle} active={active} html={html} />
    </>
  );
}
