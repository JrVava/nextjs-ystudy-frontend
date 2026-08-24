import React from "react";
import { SiteLayout } from "@/components/layout";
import AdviserCall from "@/pages/lead/AdviserCall";
import { getCMSPageContent } from "@/services/cms.service";

export const metadata = {
  title: "YStudy — Speak with a student adviser",
  description: "Book a free call to discuss your degree options, funding eligibility, and application next steps with an expert YStudy adviser.",
};

export default async function Page() {
  const data = await getCMSPageContent("adviser-call");

  if (!data) {
    return (
      <SiteLayout>
        <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
          <h2>Adviser Call Details Not Found</h2>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <AdviserCall data={data} />
    </SiteLayout>
  );
}
