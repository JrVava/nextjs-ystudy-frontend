import { getCMSPageContent } from "@/services/cms.service";
import "@/app/tools/tools.css";
import { Banner, QualificationConversionCards, QualificationCrosslinks, ToolAdviserBand } from "@/components/ui";
import SalaryCheckerWidget from "@/components/tools/SalaryCheckerWidget";
import Link from "next/link";
import React from "react";

export default async function SalaryChecker() {
  const data = await getCMSPageContent("salary-checker");

  return (
    <div className="tools-page salary-checker-page">
      {/* HERO BANNER WITH CMS INTEGRATION */}
      <Banner
        slug="salary-checker"
        fallbackBadgeText={data?.section_2?.badge || "★ Free · Instant"}
        fallbackTitle={data?.section_2?.title || "See where each degree could take your salary."}
        fallbackDescription={
          data?.section_2?.description ||
          "Realistic earning ranges for every course and career route — the numbers that make a decision easier."
        }
        fallbackBgImage="https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: "list-items",
          title: "Sample route",
          mainValue: "£24k → £55k+",
          description: "",
          items: [
            { value: "£28k", subtitle: "Computing start" },
            { value: "£75k+", subtitle: "Senior cyber" },
          ],
        }}
      >
        <div className="tlhrow" style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <a className="hubbtn white" href="#checker">
            Check salaries →
          </a>
          <Link className="hubbtn ghost" href="/lead/adviser-call">
            Talk to an adviser
          </Link>
        </div>
      </Banner>

      {/* SALARY CHECKER INTERACTIVE WIDGET */}
      <SalaryCheckerWidget sectionData={data?.section_2} />

      {/* ADVISER BAND */}
      <ToolAdviserBand sectionData={data?.section_3} />

      {/* THREE LINK CARDS CONVERSION SYSTEM */}
      <QualificationConversionCards sectionData={data?.section_4} />

      {/* CROSSLINKS SECTION */}
      <QualificationCrosslinks sectionData={data?.section_5} />
    </div>
  );
}
