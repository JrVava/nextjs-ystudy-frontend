import { getCMSPageContent } from "@/services/cms.service";
import "@/app/tools/tools.css";
import { Banner, DegreeMatchAdviserBand, QualificationConversionCards, QualificationCrosslinks, ToolAdviserBand } from "@/components/ui";
import EligibilityCheckerWidget from "@/components/tools/EligibilityCheckerWidget";
import Link from "next/link";
import React from "react";

export default async function EligibilityChecker() {
  const data = await getCMSPageContent("eligibility-checker");

  return (
    <div className="tools-page eligibility-checker-page">
      {/* HERO BANNER WITH CMS INTEGRATION */}
      <Banner
        slug="eligibility-checker"
        fallbackBadgeText="★ Free · no sign-up"
        fallbackTitle="Find out if you qualify — before you choose."
        fallbackDescription="Two minutes to check your Student Finance entitlement for tuition and living costs. Clear answer, no commitment."
        fallbackBgImage="https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: "list-items",
          title: "Sample result",
          mainValue: "✓ Likely eligible",
          description: "",
          items: [
            { value: "£9,535", subtitle: "Tuition loan" },
            { value: "£14k+", subtitle: "Maintenance" },
          ],
        }}
      >
        <div className="tlhrow" style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <a className="hubbtn white" href="#checker">
            Check eligibility →
          </a>
          <Link className="hubbtn ghost" href="/lead/adviser-call">
            Talk to an adviser
          </Link>
        </div>
      </Banner>

      {/* ELIGIBILITY CHECKER INTERACTIVE WIDGET */}
      <EligibilityCheckerWidget sectionData={data?.section_2} />

      {/* ADVISER BAND */}
      <DegreeMatchAdviserBand sectionData={data?.section_3} />

      {/* THREE LINK CARDS CONVERSION SYSTEM */}
      <QualificationConversionCards sectionData={data?.section_4} />

      {/* CROSSLINKS SECTION */}
      <QualificationCrosslinks sectionData={data?.section_5} />
    </div>
  );
}

