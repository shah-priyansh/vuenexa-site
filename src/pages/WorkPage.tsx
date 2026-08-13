import { PageShell } from "@/components/PageShell";
import { PageHead } from "@/components/PageHead";
import { html, rootStyle, active } from "@/generated/pages/work";

export default function WorkPage() {
  return (
    <>
      <PageHead page="work" />
      <PageShell rootStyle={rootStyle} active={active} html={html} />
    </>
  );
}
