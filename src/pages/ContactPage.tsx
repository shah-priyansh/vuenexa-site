import { PageShell } from "@/components/PageShell";
import { PageHead } from "@/components/PageHead";
import { html, rootStyle, active } from "@/generated/pages/contact";

export default function ContactPage() {
  return (
    <>
      <PageHead page="contact" />
      <PageShell rootStyle={rootStyle} active={active} html={html} />
    </>
  );
}
