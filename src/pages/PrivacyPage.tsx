import { PageShell } from "@/components/PageShell";
import { PageHead } from "@/components/PageHead";
import { html, rootStyle, active } from "@/generated/pages/privacy";

export default function PrivacyPage() {
  return (
    <>
      <PageHead page="privacy" />
      <PageShell rootStyle={rootStyle} active={active} html={html} />
    </>
  );
}
