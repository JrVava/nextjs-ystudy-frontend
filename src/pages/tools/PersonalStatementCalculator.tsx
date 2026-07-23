import { getCMSPageContent } from "@/services/cms.service";
import "@/app/tools/tools.css";
import { Banner, QualificationConversionCards, QualificationCrosslinks, ToolAdviserStrip } from "@/components/ui";
import PersonalStatementWidget from "@/components/tools/PersonalStatementWidget";
import Link from "next/link";
import React from "react";

export default async function PersonalStatementCalculator() {
  const data = await getCMSPageContent("personal-statement");

  return (
    <div className="tools-page ps-calculator-page">
      {/* HERO BANNER WITH CMS INTEGRATION */}
      <Banner
        slug="personal-statement-calculator"
        fallbackBadgeText="★ Free · guided"
        fallbackTitle="Say why you, in your own words."
        fallbackDescription="Answer simple guided questions and we’ll shape them into a clear, confident personal statement admissions teams get."
        fallbackBgImage="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: "list-items",
          title: "Draft progress",
          mainValue: "4 of 5 done",
          description: "Motivation · experience · goals",
          items: [
            { value: "80%", subtitle: "Progress" }
          ],
        }}
      >
        <div className="tlhrow" style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <a className="hubbtn white" href="#builder">
            Start writing →
          </a>
          <Link className="hubbtn ghost" href="/lead/adviser-call">
            Talk to an adviser
          </Link>
        </div>
      </Banner>

      {/* PERSONAL STATEMENT INTERACTIVE WIDGET */}
      <PersonalStatementWidget section2Data={data?.section_2} />

      {/* ADVISER BAND */}
      <ToolAdviserStrip sectionData={data?.section_3} />

      {/* THREE LINK CARDS CONVERSION SYSTEM */}
      <QualificationConversionCards sectionData={data?.section_4} />

      {/* CROSSLINKS SECTION */}
      <QualificationCrosslinks sectionData={data?.section_5} />
    </div>
  );
}

