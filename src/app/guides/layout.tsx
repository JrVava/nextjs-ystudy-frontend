import { SiteLayout, GuideLayout } from "@/components/layout";
import "./guides.css";

export default function GuidesSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SiteLayout>
      <GuideLayout>{children}</GuideLayout>
    </SiteLayout>
  );
}
