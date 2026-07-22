import { getCMSPageContent } from "@/services/cms.service";
import "@/app/tools/tools.css";
import { Banner, QualificationConversionCards, QualificationCrosslinks, ToolAdviserBand } from "@/components/ui";
import EnglishLevelWidget from "@/components/tools/EnglishLevelWidget";
import Link from "next/link";
import React from "react";

export default async function EnglishLevelChecker() {
  const data = await getCMSPageContent("english-level-checker");

  return (
    <div className="tools-page english-checker-page">
      {/* HERO BANNER WITH CMS INTEGRATION */}
      <Banner
        slug="english-level-checker"
        fallbackBadgeText={data?.section_2?.badge || "★ Free · no sign-up"}
        fallbackTitle={data?.section_2?.title || "Check your English level in 5 minutes."}
        fallbackDescription={
          data?.section_2?.description ||
          "See if you meet course entry requirements and exactly where to improve — a confidence check before you apply."
        }
        fallbackBgImage="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: "stacked-cards",
          title: "Assessment Options",
          items: [
            { subtitle: "B1 Level", title: "Intermediate", description: "Everyday communication and foundation entry" },
            { subtitle: "B2 Level", title: "Upper-intermediate", description: "Degree entry & interview readiness" },
          ],
        }}
      >
        <div className="tlhrow" style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <a className="hubbtn white" href="#test">
            Take the test →
          </a>
          <Link className="hubbtn ghost" href="/lead/adviser-call">
            Talk to an adviser
          </Link>
        </div>
      </Banner>

      {/* ENGLISH LEVEL INTERACTIVE WIDGET */}
      <EnglishLevelWidget sectionData={data?.section_2} />

      {/* ADVISER BAND */}
      <ToolAdviserBand sectionData={data?.section_3} />

      {/* THREE LINK CARDS CONVERSION SYSTEM */}
      <QualificationConversionCards sectionData={data?.section_4} />

      {/* CROSSLINKS SECTION */}
      <QualificationCrosslinks sectionData={data?.section_5} />
    </div>
  );
}
