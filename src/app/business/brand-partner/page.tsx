import React from "react";
import { SiteLayout } from "@/components/layout";
import BrandPartner from "@/pages/business/BrandPartner";
import { getCMSPageContent } from "@/services/cms.service";

export const metadata = {
  title: "YStudy — Build a student partnership with YStudy",
  description: "Connect useful offers with adult learners before and during their studies. Learn about YStudy brand partnerships, dedicated support, and transparent campaigns.",
};

export default async function Page() {
  const data = await getCMSPageContent("brand-partnerships");

  if (!data) {
    return (
      <SiteLayout>
        <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
          <h2>Brand Partnership Details Not Found</h2>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <BrandPartner data={data} />
    </SiteLayout>
  );
}
