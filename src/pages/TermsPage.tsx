import { PageShell } from "@/components/PageShell";
import { PageHead } from "@/components/PageHead";
import { html, rootStyle, active } from "@/generated/pages/terms";

export default function TermsPage() {
  return (
    <>
      <PageHead page="terms" />
      <PageShell rootStyle={rootStyle} active={active} html={html} />
    </>
  );
}
