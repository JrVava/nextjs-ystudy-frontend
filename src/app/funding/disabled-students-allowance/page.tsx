import React from "react";
import DisabledStudentsAllowance from "@/pages/funding/DisabledStudentsAllowance";
import { getCMSPageContent } from "@/services/cms.service";
import { getFAQBySlug } from "@/services/faq.service";

export const metadata = {
  title: "YStudy — Could you get disability-related study support",
  description: "Learn about the Disabled Students' Allowance (DSA). Non-repayable help for equipment, software, support workers and travel.",
};

export default async function Page() {
  const [data, faqs] = await Promise.all([
    getCMSPageContent("dsa"),
    getFAQBySlug("disabled-students-allowance")
  ]);
  return <DisabledStudentsAllowance data={data} faqs={faqs} />;
}
