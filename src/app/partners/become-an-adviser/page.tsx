import React from "react";
import { SiteLayout } from "@/components/layout";
import BecomeAnAdviser from "@/pages/partners/BecomeAnAdviser";

export const metadata = {
  title: "YStudy — Become a YStudy student adviser",
  description: "Turn your experience into someone's first step. Guide adult learners through course choices and funding. Flexible, remote, and rewarded.",
};

export default function Page() {
  return (
    <SiteLayout>
      <BecomeAnAdviser />
    </SiteLayout>
  );
}
