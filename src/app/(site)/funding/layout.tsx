import type { SiteTheme } from "@/types";

export default function FundingSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme: SiteTheme = "sunset";
  return <div className={`funding-shell ys-theme-${theme}`}>{children}</div>;
}
