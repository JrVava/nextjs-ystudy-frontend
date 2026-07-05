import { SiteLayout } from "@/components/layout";
import type { SiteTheme } from "@/types";

export default function DegreesSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme: SiteTheme = "wash";
  return (
    <SiteLayout theme={theme}>
      <div className={`degrees-shell ys-theme-${theme}`}>{children}</div>
    </SiteLayout>
  );
}
