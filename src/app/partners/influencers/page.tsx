import React from "react";
import { SiteLayout } from "@/components/layout";
import Influencers from "@/pages/partners/Influencers";

export const metadata = {
  title: "YStudy — Creator & Influencer Programme",
  description: "Your audience trusts you. Help them study. Share genuinely useful guidance with adult learners and career changers, and earn rewards.",
};

export default function Page() {
  return (
    <SiteLayout>
      <Influencers />
    </SiteLayout>
  );
}
