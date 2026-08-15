import React from "react";
import { SiteLayout } from "@/components/layout";
import WhyYStudy from "@/pages/WhyYStudy";

export const metadata = {
  title: "YStudy — Why use YStudy",
  description: "Independent education guidance for mature students. Learn how we help you find realistic routes, check funding and apply.",
};

export default function Page() {
  return (
    <SiteLayout>
      <WhyYStudy />
    </SiteLayout>
  );
}
