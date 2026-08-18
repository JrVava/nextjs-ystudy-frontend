import React from "react";
import { SiteLayout } from "@/components/layout";
import HowGuidanceWorks from "@/pages/HowGuidanceWorks";

export const metadata = {
  title: "YStudy — How YStudy guidance works",
  description: "A simple route from eligibility check to degree match, funding review and application support.",
};

export default function Page() {
  return (
    <SiteLayout>
      <HowGuidanceWorks />
    </SiteLayout>
  );
}

