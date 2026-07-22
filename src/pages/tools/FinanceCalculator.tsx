import { getCMSPageContent } from "@/services/cms.service";
import "@/app/tools/tools.css";
import { Banner, QualificationConversionCards, QualificationCrosslinks, ToolAdviserBand } from "@/components/ui";
import FinanceCalculatorWidget from "@/components/tools/FinanceCalculatorWidget";
import Link from "next/link";
import React from "react";

export default async function FinanceCalculator() {
  const data = await getCMSPageContent("finance-calculator");

  return (
    <div className="tools-page finance-calculator-page">
      {/* HERO BANNER WITH CMS INTEGRATION */}
      <Banner
        slug="finance-calculator"
        fallbackBadgeText={data?.section_2?.badge || "★ Free · no sign-up"}
        fallbackTitle={data?.section_2?.title || "See your funding before you commit."}
        fallbackDescription={
          data?.section_2?.description ||
          "A quick estimate of tuition and maintenance support, based on current Student Finance rules — the number that makes it real."
        }
        fallbackBgImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: "stats-highlight",
          title: "Funding Breakdown",
          mainValue: "Up to £24,377",
          items: [
            { value: "£9,790", subtitle: "Tuition fee loan" },
            { value: "£14,587", subtitle: "Max maintenance (London)" },
          ],
        }}
      >
        <div className="tlhrow" style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <a className="hubbtn white" href="#calculator">
            Open calculator →
          </a>
          <Link className="hubbtn ghost" href="/lead/adviser-call">
            Talk to an adviser
          </Link>
        </div>
      </Banner>

      {/* FINANCE CALCULATOR INTERACTIVE WIDGET */}
      <FinanceCalculatorWidget sectionData={data?.section_2} />

      {/* ADVISER BAND */}
      <ToolAdviserBand sectionData={data?.section_5} />

      {/* THREE LINK CARDS CONVERSION SYSTEM */}
      <QualificationConversionCards sectionData={data?.section_6} />

      {/* CROSSLINKS SECTION */}
      <QualificationCrosslinks sectionData={data?.section_7} />
    </div>
  );
}
