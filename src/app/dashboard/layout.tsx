import { DashboardLayout } from "@/components/layout";

export default function DashboardSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
