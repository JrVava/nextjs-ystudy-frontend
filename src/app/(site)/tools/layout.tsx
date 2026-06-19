import { ToolLayout } from "@/components/layout";

export default function ToolsSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ToolLayout>{children}</ToolLayout>;
}
