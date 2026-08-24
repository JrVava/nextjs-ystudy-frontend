import React from "react";
import { SiteLayout } from "@/components/layout";
import Business from "@/pages/business/Business";

export const metadata = {
  title: "YStudy — Reach adult learners with YStudy",
  description: "Promote relevant products, services and opportunities to working adults planning study. Commercial partnerships without clutter.",
};

export default function Page() {
  return (
    <SiteLayout>
      <Business />
    </SiteLayout>
  );
}
