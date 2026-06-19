import { CourseDetailLayout } from "@/components/layout";

export default function CourseDetailSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CourseDetailLayout>{children}</CourseDetailLayout>;
}
