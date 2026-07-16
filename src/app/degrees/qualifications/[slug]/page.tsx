import QualificationDetail from "@/pages/degrees/qualifications/QualificationDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    title: `YStudy — ${title} Route`,
    description: `Learn how the flexible ${title} higher education route works for mature students, including funding, structure and options.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <QualificationDetail slug={slug} />;
}
