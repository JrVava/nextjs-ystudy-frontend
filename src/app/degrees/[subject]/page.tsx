import SubjectDetail from "@/pages/degrees/SubjectDetail";
import { getCourseBySlug } from "@/services/course.service";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ subject: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { subject } = await params;
  
  // Try to find if this is a general course slug to set correct metadata
  const backendCourse = await getCourseBySlug(subject);
  if (backendCourse && backendCourse.slug === subject && backendCourse.courseType === "General") {
    const title = backendCourse.title || subject.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return {
      title: `YStudy — ${title} Course`,
      description: `Compare flexible routes, Student Finance support, and career salaries for the ${title} degree route.`,
    };
  }

  const title = subject.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    title: `YStudy — ${title} Degrees`,
    description: `Explore flexible ${title} degree courses built for adult learners. Compare qualifications, funding, and career routes.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { subject } = await params;
  
  // 1. Fetch course details by slug
  const backendCourse = await getCourseBySlug(subject);

  // If this matches a Social course slug exactly, redirect to the social route
  if (backendCourse && backendCourse.slug === subject && backendCourse.courseType === "Social") {
    redirect(`/degrees/course/${subject}`);
  }

  // 2. Render SubjectDetail (which contains the General course page layout / subject guide layout)
  return <SubjectDetail subject={subject} />;
}
