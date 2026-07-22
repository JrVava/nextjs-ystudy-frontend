import { getCMSPageContent } from "@/services/cms.service";
import "@/app/tools/tools.css";
import { Banner, QualificationConversionCards, QualificationCrosslinks, ToolAdviserBand } from "@/components/ui";
import CvBuilderWidget from "@/components/tools/CvBuilderWidget";
import Link from "next/link";
import React from "react";

export default async function CvBuilder() {
  const data = await getCMSPageContent("cv-builder");

  return (
    <div className="tools-page cv-builder-page">
      {/* HERO BANNER WITH CMS INTEGRATION */}
      <Banner
        slug="cv-builder"
        fallbackBadgeText={data?.section_2?.badge || "★ Free for students"}
        fallbackTitle={data?.section_2?.title || "A CV that fits a non-traditional path."}
        fallbackDescription={
          data?.section_2?.description ||
          "Designed for adult learners, career changers and employment gaps — guided prompts, professional format, ready to download."
        }
        fallbackBgImage="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: "stats-highlight",
          title: "CV Tool Highlights",
          mainValue: "100%",
          items: [
            { value: "Free", subtitle: "University-ready format" },
            { value: "Instant", subtitle: "Auto summary generator" },
          ],
        }}
      >
        <div className="tlhrow" style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <a className="hubbtn white" href="#builder">
            Build my CV →
          </a>
          <Link className="hubbtn ghost" href="/lead/adviser-call">
            Talk to an adviser
          </Link>
        </div>
      </Banner>

      {/* CV BUILDER INTERACTIVE WIDGET */}
      <CvBuilderWidget section2Data={data?.section_2} section3Data={data?.section_3} />

      {/* ADVISER BAND */}
      <ToolAdviserBand sectionData={data?.section_4} />

      {/* THREE LINK CARDS CONVERSION SYSTEM */}
      <QualificationConversionCards sectionData={data?.section_5} />

      {/* CROSSLINKS SECTION */}
      <QualificationCrosslinks sectionData={data?.section_6} />
    </div>
  );
}
