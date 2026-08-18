import React from "react";
import { SiteLayout } from "@/components/layout";
import Faq from "@/pages/Faq";

export const metadata = {
  title: "YStudy — Common questions about studying with YStudy",
  description: "Find answers about courses, funding, eligibility, applications and adviser support.",
};

export default function Page() {
  return (
    <SiteLayout>
      <Faq />
    </SiteLayout>
  );
}
