import CourseDetail from "@/pages/degrees/course/CourseDetail";
import { getCMSPageContent } from "@/services/cms.service";
import { getCourseBySlug } from "@/services/course.service";
import { getFAQBySlug } from "@/services/faq.service";
import { getBannerBySlug } from "@/services/banner.service";

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
  const cmsData = await getCMSPageContent(slug);
  const backendCourse = await getCourseBySlug(slug);
  const faqs = await getFAQBySlug(slug);
  const bannerData = await getBannerBySlug(slug);

  return (
    <CourseDetail
      slug={slug}
      cmsData={cmsData}
      backendCourse={backendCourse}
      faqs={faqs || undefined}
      bannerData={bannerData || undefined}
    />
  );
}

