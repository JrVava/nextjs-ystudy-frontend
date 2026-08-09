import Money from "@/pages/Money";
import { SiteLayout } from "@/components/layout";

export const metadata = {
  title: "YStudy — How much Student Finance could you receive",
  description: "Learn how much Student Finance you could receive. Compare course funding routes, Living cost support, student bank accounts, and broadband essentials.",
};

export default function Page() {
  return (
    <SiteLayout>
      <Money />
    </SiteLayout>
  );
}
