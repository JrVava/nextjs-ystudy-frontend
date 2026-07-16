import GuideDetail from "@/pages/guides/GuideDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    title: `YStudy — ${title} Guide`,
    description: `Read our comprehensive guide: ${title}. Learn about qualification requirements, residency pathways and student finance rules.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <GuideDetail slug={slug} />;
}
