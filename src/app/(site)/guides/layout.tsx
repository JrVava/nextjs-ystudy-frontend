import { GuideLayout } from "@/components/layout";

export default function GuidesSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GuideLayout>{children}</GuideLayout>;
}
