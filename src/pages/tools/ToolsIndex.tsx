import { getCMSPageContent } from "@/services/cms.service";
import "@/app/tools/tools.css";
import { Banner, QualificationConversionCards, QualificationCrosslinks, ToolAdviserBand, ToolCard } from "@/components/ui";
import Link from "next/link";
import React from "react";

export default async function ToolsIndex() {
  const data = await getCMSPageContent("tools");

  return (
    <div className="tools-page tools-index-page">
      {/* CMS BANNER COMPONENT */}
      <Banner
        slug="tools"
        fallbackBadgeText={data?.section_2?.badge || "Free tools · no sign-up"}
        fallbackTitle={data?.section_2?.title || "Plan your next step in minutes."}
        fallbackDescription={
          data?.section_2?.description ||
          "Eight free tools to check degree fit, funding, English level, salaries and applications — each ends with a useful result."
        }
        fallbackBgImage="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: "grid-2x2",
          title: "Popular Tools",
          items: [
            { title: "Degree Match", value: "5 min" },
            { title: "Eligibility", value: "2 min" },
            { title: "Finance Calc", value: "2 min" },
            { title: "Salary Check", value: "Instant" },
          ],
        }}
      >
        <div className="btnrow" style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <Link className="hubbtn white" href="/tools/degree-match">
            Find my degree →
          </Link>
          <Link className="hubbtn ghost" href="/tools/eligibility-checker">
            Check eligibility
          </Link>
        </div>

        <div className="chips"><span>🎯 Degree Match</span><span>✅ Eligibility</span><span>💷 Finance</span><span>📈 Salary</span></div>
      </Banner>

      {/* TOOLS CARDS GRID */}
      {data?.section_2?.status !== false && (
        <section className="thub-sec">
          <div className="thub" style={{ textAlign: "left" }}>
            <div className="thub-head">
              <span className="kicker">{data?.section_2?.badge || "Free tools"}</span>
              <h2>{data?.section_2?.title || "Pick the tool for your next step."}</h2>
              <p>{data?.section_2?.description || "Each one is free, takes minutes, and ends with a useful result — no sign-up needed."}</p>
            </div>
            <div className="thub-grid">
              <ToolCard
                href="/tools/degree-match"
                chipText="Discover"
                imageSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
                title="Degree Match"
                description="Answer a few questions, get degrees that fit your background."
                metaText="5 min · no sign-up"
              />

              <ToolCard
                href="/tools/eligibility-checker"
                chipText="Approval"
                imageSrc="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80"
                title="Eligibility checker"
                description="See if you qualify for Student Finance before choosing a course."
                metaText="2 min"
              />

              <ToolCard
                href="/tools/english-level-checker"
                chipText="Assess"
                imageSrc="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
                title="English level test"
                description="Check your English against course entry levels in 5 minutes."
                metaText="5 min"
              />

              <ToolCard
                href="/tools/salary-checker"
                chipText="Earnings"
                imageSrc="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
                title="Salary checker"
                description="Realistic salary ranges by subject and career stage."
                metaText="Instant"
              />

              <ToolCard
                href="/tools/cv-builder"
                chipText="Apply"
                imageSrc="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80"
                title="CV builder"
                description="A university-ready CV built for adult learners and changers."
                metaText="10 min"
              />

              <ToolCard
                href="/tools/personal-statement-calculator"
                chipText="Apply"
                imageSrc="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80"
                title="Personal statement"
                description="Guided prompts shape your motivation into a confident draft."
                metaText="Guided"
              />

              <ToolCard
                href="/tools/finance-calculator"
                chipText="Funding"
                imageSrc="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80"
                title="Finance calculator"
                description="Estimate your tuition and maintenance support in minutes."
                metaText="2 min"
              />

              <ToolCard
                href="/tools/career-quiz"
                chipText="Direction"
                imageSrc="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
                title="Career quiz"
                description="Find the career direction — and degrees — that fit how you work."
                metaText="5 min"
              />
            </div>
          </div>
        </section>
      )}

      {/* REUSABLE ADVISER HANDOFF BAND */}
      <ToolAdviserBand sectionData={data?.section_3} />


      {/* REUSABLE THREE LINK CARDS CONVERSION SYSTEM */}
      <QualificationConversionCards sectionData={data?.section_4} />

      {/* REUSABLE CROSSLINKS SECTION */}
      <QualificationCrosslinks sectionData={data?.section_5} />
    </div>
  );
}
