import { SiteLayout } from "@/components/layout";
import Apply from "@/pages/Apply";

export const metadata = {
  title: "YStudy — Apply with Confidence",
  description: "Complete one short form and a YStudy adviser will help you check suitable courses, documents and Student Finance before you commit.",
};

export default function Page() {
  return (
    <SiteLayout>
      <Apply />
    </SiteLayout>
  );
}

