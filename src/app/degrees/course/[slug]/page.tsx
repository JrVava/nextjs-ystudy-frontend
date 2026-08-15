import CourseDetail from "@/pages/degrees/course/CourseDetail";
import { getCMSPageContent } from "@/services/cms.service";
import { getCourseBySlug } from "@/services/course.service";
import { getFAQBySlug } from "@/services/faq.service";
import { getBannerBySlug } from "@/services/banner.service";
import { getUpcomingIntakesList } from "@/services/upcoming-intake.service";
import { getStudentStoriesList } from "@/services/student-story.service";
import { redirect } from "next/navigation";

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
  const [cmsData, backendCourse, faqs, bannerData, dbIntakes, dbStories] = await Promise.all([
    getCMSPageContent(slug),
    getCourseBySlug(slug),
    getFAQBySlug(slug),
    getBannerBySlug(slug),
    getUpcomingIntakesList().catch(() => null),
    getStudentStoriesList().catch(() => null)
  ]);

  if (backendCourse && backendCourse.slug === slug && backendCourse.courseType === "General") {
    // General course details open under /degrees/[name]
    redirect(`/degrees/${slug}`);
  }

  return (
    <CourseDetail
      slug={slug}
      cmsData={cmsData}
      backendCourse={backendCourse}
      faqs={faqs || undefined}
      bannerData={bannerData || undefined}
      dbIntakes={dbIntakes || undefined}
      dbStories={dbStories || undefined}
    />
  );
}

