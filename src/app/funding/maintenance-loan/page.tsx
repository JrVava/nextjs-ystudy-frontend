import React from "react";
import MaintenanceLoan from "@/pages/funding/MaintenanceLoan";
import { getCMSPageContent } from "@/services/cms.service";
import { getFAQBySlug } from "@/services/faq.service";
import { getGuidesList } from "@/services/guide.service";

export const metadata = {
  title: "YStudy — Could you get help with living costs",
  description: "Learn about the Student Maintenance Loan. Up to £14,135 a year paid into your bank to cover rent, bills, food, travel and childcare.",
};

export default async function Page() {
  const [data, faqs, guides] = await Promise.all([
    getCMSPageContent("maintenance-loan"),
    getFAQBySlug("maintenance-loan"),
    getGuidesList()
  ]);
  return <MaintenanceLoan data={data} faqs={faqs} guides={guides} />;
}
