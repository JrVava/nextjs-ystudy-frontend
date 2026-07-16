import CourseDetail from "@/pages/degrees/course/CourseDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    title: `YStudy — ${title} Course`,
    description: `Compare flexible routes, Student Finance support, and career salaries for the ${title} degree route.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <CourseDetail slug={slug} />;
}
