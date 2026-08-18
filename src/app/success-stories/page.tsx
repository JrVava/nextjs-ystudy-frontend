import React from "react";
import { SiteLayout } from "@/components/layout";
import SuccessStories from "@/pages/SuccessStories";

export const metadata = {
  title: "YStudy — Real student journeys",
  description: "See how adults move from work experience into degree routes and career progression.",
};

export default function Page() {
  return (
    <SiteLayout>
      <SuccessStories />
    </SiteLayout>
  );
}
