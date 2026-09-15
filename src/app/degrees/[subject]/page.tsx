import SubjectDetail from "@/pages/degrees/SubjectDetail";
import GeneralCourseDetail from "@/pages/degrees/GeneralCourseDetail";
import { getSubjectBySlug } from "@/services/subject.service";
import { getCourseBySlug, getCoursesByIds } from "@/services/course.service";
import { getCMSPageContent } from "@/services/cms.service";
import { getFAQBySlug } from "@/services/faq.service";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ subject: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { subject } = await params;

  // Check if subject exists
  const subjectData = await getSubjectBySlug(subject);
  if (subjectData && subjectData.isSubject === true) {
    const title = subjectData.title || subject.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return {
      title: `YStudy — ${title} Degrees`,
      description: `Explore flexible ${title} degree courses built for adult learners. Compare qualifications, funding, and career routes.`,
    };
  }
  
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

  // Fetch dbFaqs using dynamic subject slug with fallbacks
  const dbFaqs = (await getFAQBySlug(subject)) || (await getFAQBySlug("faqs")) || (await getFAQBySlug("faq")) || [];
  
  // 1. Check if this is a Subject by calling /api/frontend/subject/get-subject/{slug}
  const subjectData = await getSubjectBySlug(subject);

  if (subjectData && subjectData.isSubject === true) {
    const courseIds: string[] = Array.isArray(subjectData.courseIds) ? subjectData.courseIds : [];
    const courses = courseIds.length > 0 ? await getCoursesByIds(courseIds) : [];
    return <SubjectDetail subject={subject} subjectData={subjectData} courses={courses} dbFaqs={dbFaqs} />;
  }

  // 2. Otherwise fetch course details by slug
  const [backendCourse, cmsData] = await Promise.all([
    getCourseBySlug(subject),
    getCMSPageContent(subject)
  ]);

  // If this matches a Social course slug exactly, redirect to the social route
  if (backendCourse && backendCourse.slug === subject && backendCourse.courseType === "Social") {
    redirect(`/degrees/course/${subject}`);
  }

  // 3. Render GeneralCourseDetail component for General courses or fallback
  return <GeneralCourseDetail slug={subject} backendCourse={backendCourse} cmsData={cmsData} dbFaqs={dbFaqs} />;
}
