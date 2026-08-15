import { getCMSPageContent } from "@/services/cms.service";
import { getToolsList } from "@/services/tool.service";
import "@/app/tools/tools.css";
import { Banner, QualificationConversionCards, QualificationCrosslinks, ToolAdviserBand, ToolCard } from "@/components/ui";
import Link from "next/link";
import React from "react";

const fallbackTools = [
  {
    link: "/tools/degree-match",
    imageSrc: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    title: "Degree Match",
    description: "Answer a few questions, get degrees that fit your background.",
    time: "5 min · no sign-up",
    mode: "free"
  },
  {
    link: "/tools/eligibility-checker",
    imageSrc: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    title: "Eligibility checker",
    description: "See if you qualify for Student Finance before choosing a course.",
    time: "2 min",
    mode: "free"
  },
  {
    link: "/tools/english-level-checker",
    imageSrc: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    title: "English level test",
    description: "Check your English against course entry levels in 5 minutes.",
    time: "5 min",
    mode: "free"
  },
  {
    link: "/tools/salary-checker",
    imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    title: "Salary checker",
    description: "Realistic salary ranges by subject and career stage.",
    time: "Instant",
    mode: "free"
  },
  {
    link: "/tools/cv-builder",
    imageSrc: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
    title: "CV builder",
    description: "A university-ready CV built for adult learners and changers.",
    time: "10 min",
    mode: "free"
  },
  {
    link: "/tools/personal-statement-calculator",
    imageSrc: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    title: "Personal statement",
    description: "Guided prompts shape your motivation into a confident draft.",
    time: "Guided",
    mode: "free"
  },
  {
    link: "/tools/finance-calculator",
    imageSrc: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
    title: "Finance calculator",
    description: "Estimate your tuition and maintenance support in minutes.",
    time: "2 min",
    mode: "free"
  },
  {
    link: "/tools/career-quiz",
    imageSrc: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    title: "Career quiz",
    description: "Find the career direction — and degrees — that fit how you work.",
    time: "5 min",
    mode: "free"
  }
];

const getChipText = (link: string, mode: string) => {
  const l = link.toLowerCase();
  if (l.includes("degree-match")) return "Discover";
  if (l.includes("eligibility-checker")) return "Approval";
  if (l.includes("english-level")) return "Assess";
  if (l.includes("salary-checker")) return "Earnings";
  if (l.includes("cv-builder")) return "Apply";
  if (l.includes("personal-statement")) return "Apply";
  if (l.includes("finance-calculator")) return "Funding";
  if (l.includes("career-quiz")) return "Direction";
  return mode ? mode.charAt(0).toUpperCase() + mode.slice(1) : "Free";
};

export default async function ToolsIndex() {
  const [data, dbTools] = await Promise.all([
    getCMSPageContent("tools"),
    getToolsList().catch(() => null)
  ]);

  const toolsList = (dbTools && dbTools.length > 0) ? dbTools : fallbackTools;

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
              {toolsList.map((t: any, idx: number) => (
                <ToolCard
                  key={t._id || idx}
                  href={t.link}
                  chipText={getChipText(t.link, t.mode || "free")}
                  imageSrc={t.fullImageUrl || t.imageSrc || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"}
                  title={t.title}
                  description={t.description}
                  metaText={t.time}
                />
              ))}
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
