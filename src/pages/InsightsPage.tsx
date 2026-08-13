import { PageShell } from "@/components/PageShell";
import { PageHead } from "@/components/PageHead";
import { html, rootStyle, active } from "@/generated/pages/insights";

export default function InsightsPage() {
  return (
    <>
      <PageHead page="insights" />
      <PageShell rootStyle={rootStyle} active={active} html={html} />
    </>
  );
}
