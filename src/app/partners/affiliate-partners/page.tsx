import React from "react";
import { SiteLayout } from "@/components/layout";
import AffiliatePartners from "@/pages/partners/AffiliatePartners";
import { getCMSPageContent } from "@/services/cms.service";

export const metadata = {
  title: "YStudy — YStudy Affiliate Programme",
  description: "Join the YStudy affiliate programme to earn commission on every successful student enrolment. Transparent tracking, real-time dashboard, and cookie window.",
};

export default async function Page() {
  const data = await getCMSPageContent("affiliate-programme");

  if (!data) {
    return (
      <SiteLayout>
        <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
          <h2>Affiliate Programme Details Not Found</h2>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <AffiliatePartners data={data} />
    </SiteLayout>
  );
}
