import SubjectDetail from "@/pages/degrees/SubjectDetail";

interface PageProps {
  params: Promise<{ subject: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { subject } = await params;
  const title = subject.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    title: `YStudy — ${title} Degrees`,
    description: `Explore flexible ${title} degree courses built for adult learners. Compare qualifications, funding, and career routes.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { subject } = await params;
  return <SubjectDetail subject={subject} />;
}
