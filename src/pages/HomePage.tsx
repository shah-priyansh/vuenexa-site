import { PageShell } from "@/components/PageShell";
import { PageHead } from "@/components/PageHead";
import { html, rootStyle, active } from "@/generated/pages/home";

export default function HomePage() {
  return (
    <>
      <PageHead page="home" />
      <PageShell rootStyle={rootStyle} active={active} html={html} />
    </>
  );
}
