import React from "react";
import ChildcareGrant from "@/pages/funding/ChildcareGrant";
import { getCMSPageContent } from "@/services/cms.service";

export const metadata = {
  title: "YStudy — Could childcare costs be supported",
  description: "Learn about the Childcare Grant. Covers up to 85% of registered childcare while you study, paid termly.",
};

export default async function Page() {
  const data = await getCMSPageContent("childcare-grant");
  return <ChildcareGrant data={data} />;
}
