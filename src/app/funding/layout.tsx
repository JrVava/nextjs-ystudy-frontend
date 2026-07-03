import { SiteLayout } from "@/components/layout";
import type { SiteTheme } from "@/types";

export default function FundingSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme: SiteTheme = "sunset";
  return (
    <SiteLayout theme={theme}>
      <div className={`funding-shell ys-theme-${theme}`}>{children}</div>
    </SiteLayout>
  );
}
