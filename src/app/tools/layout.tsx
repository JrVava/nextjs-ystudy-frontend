import { SiteLayout, ToolLayout } from "@/components/layout";

export default function ToolsSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SiteLayout>
      <ToolLayout>{children}</ToolLayout>
    </SiteLayout>
  );
}
