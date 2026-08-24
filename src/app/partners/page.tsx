import React from "react";
import { SiteLayout } from "@/components/layout";
import Partners from "@/pages/partners/Partners";

export const metadata = {
  title: "YStudy — Partner with YStudy",
  description: "Work with YStudy as an adviser, creator, affiliate, university or business partner. Explore different ways to work with YStudy.",
};

export default function Page() {
  return (
    <SiteLayout>
      <Partners />
    </SiteLayout>
  );
}
