import { getCMSPageContent } from "@/services/cms.service";
import "@/app/tools/tools.css";
import { Banner, QualificationConversionCards, QualificationCrosslinks, ToolAdviserBand } from "@/components/ui";
import CareerQuizWidget from "@/components/tools/CareerQuizWidget";
import Link from "next/link";
import React from "react";

export default async function CareerQuiz() {
  const data = await getCMSPageContent("career-quiz");

  return (
    <div className="tools-page career-quiz-page">
      {/* HERO BANNER WITH CMS INTEGRATION */}
      <Banner
        slug="career-quiz"
        fallbackBadgeText={data?.section_2?.badge || "★ Free · 3 minutes"}
        fallbackTitle={data?.section_2?.title || "Not sure which direction? Let's find out."}
        fallbackDescription={
          data?.section_2?.description ||
          "Three minutes on how you like to work, and we'll point you toward the careers — and degrees — that fit."
        }
        fallbackBgImage="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: "stacked-cards",
          title: "Career Assessment",
          items: [
            { subtitle: "Sample result", title: "Business & Leadership", description: "→ Business Management, Project Management" },
            { subtitle: "Time needed", title: "3 Minutes", description: "Quick & easy — no sign-up needed" },
          ],
        }}
      >
        <div className="tlhrow" style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <a className="hubbtn white" href="#quiz">
            Take the quiz →
          </a>
          <Link className="hubbtn ghost" href="/lead/adviser-call">
            Talk to an adviser
          </Link>
        </div>
      </Banner>

      {/* QUIZ INTERACTIVE WIDGET */}
      <CareerQuizWidget sectionData={data?.section_3} />

      {/* ADVISER BAND */}
      <ToolAdviserBand sectionData={data?.section_4} />

      {/* THREE LINK CARDS CONVERSION SYSTEM */}
      <QualificationConversionCards sectionData={data?.section_5} />

      {/* CROSSLINKS SECTION */}
      <QualificationCrosslinks sectionData={data?.section_6} />
    </div>
  );
}
