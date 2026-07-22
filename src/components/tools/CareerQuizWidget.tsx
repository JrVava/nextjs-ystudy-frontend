"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

interface QuizQuestion {
  id: number;
  text: string;
  category: "business" | "tech" | "health" | "creative" | "construction" | "law";
}

const questions: QuizQuestion[] = [
  { id: 0, text: "I like organising people or improving how work is done", category: "business" },
  { id: 1, text: "I enjoy solving technical problems", category: "tech" },
  { id: 2, text: "I want work where I help people directly", category: "health" },
  { id: 3, text: "I like visual, creative or communication tasks", category: "creative" },
  { id: 4, text: "I prefer practical projects with real-world outcomes", category: "construction" },
  { id: 5, text: "I enjoy rules, arguments, evidence or justice", category: "law" },
  { id: 6, text: "I would like to manage projects or teams", category: "business" },
  { id: 7, text: "I like data, systems or computers", category: "tech" },
];

const categoryInfo: Record<string, { title: string; desc: string; degrees: string }> = {
  business: {
    title: "Business & Leadership",
    desc: "You may enjoy organising people, improving services and managing projects.",
    degrees: "Business Management, Project Management, Marketing",
  },
  tech: {
    title: "Technology & Systems",
    desc: "You may enjoy working with digital tools, data systems and technical solutions.",
    degrees: "Computing, Cyber Security, Data Analytics",
  },
  health: {
    title: "People & Support",
    desc: "You may enjoy healthcare, community work and supporting individual well-being.",
    degrees: "Health & Social Care, Psychology, Public Health",
  },
  creative: {
    title: "Creative Communication",
    desc: "You may enjoy branding, media, digital content and customer engagement.",
    degrees: "Marketing, Media, Business Management",
  },
  construction: {
    title: "Practical Project Work",
    desc: "You may enjoy managing physical developments, sites and operational tasks.",
    degrees: "Construction Management, Project Management",
  },
  law: {
    title: "Law & Justice",
    desc: "You may enjoy analytical thinking, legal frameworks, policy and advisory roles.",
    degrees: "Law LLB, Criminology, Business Law",
  },
};

export interface CareerQuizWidgetProps {
  sectionData?: {
    status?: boolean;
    badge?: string;
    title?: string;
    description?: string;
  };
}

export function CareerQuizWidget({ sectionData }: CareerQuizWidgetProps) {
  if (sectionData?.status === false) {
    return null;
  }

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  React.useEffect(() => {
    if (selectedIds.length > 0) {
      const timer = setTimeout(() => {
        if (typeof window !== "undefined" && (window as any).ystudySaveCurrentTool) {
          (window as any).ystudySaveCurrentTool();
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [selectedIds]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const topCategoryKey = useMemo(() => {
    const counts: Record<string, number> = {
      business: 0,
      tech: 0,
      health: 0,
      creative: 0,
      construction: 0,
      law: 0,
    };
    selectedIds.forEach((id) => {
      const q = questions.find((item) => item.id === id);
      if (q) counts[q.category] += 1;
    });

    let bestKey = "business";
    let maxVal = -1;
    Object.entries(counts).forEach(([k, v]) => {
      if (v > maxVal) {
        maxVal = v;
        bestKey = k;
      }
    });
    return bestKey;
  }, [selectedIds]);

  const topResult = categoryInfo[topCategoryKey] || categoryInfo.business;

  const kicker = sectionData?.badge || "Career Direction Assessment";
  const title = sectionData?.title || "What kind of work fits you?";
  const description = sectionData?.description || "Select the statements that sound most like your interests.";

  return (
    <section className="thub-sec" id="quiz">
      <div className="thub" style={{ textAlign: "left" }}>
        <div className="thub-head">
          <span className="kicker">{kicker}</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "28px" }}>
          {/* Questions list */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
            {questions.map((q) => {
              const isSelected = selectedIds.includes(q.id);
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => toggleSelect(q.id)}
                  style={{
                    background: isSelected ? "var(--soft)" : "#fff",
                    border: `1.5px solid ${isSelected ? "var(--o-deep)" : "var(--line)"}`,
                    borderRadius: "16px",
                    padding: "18px",
                    textAlign: "left",
                    cursor: "pointer",
                    boxShadow: isSelected ? "0 8px 24px rgba(224,80,0,.12)" : "0 4px 14px rgba(15,23,42,.05)",
                    transition: "all .18s ease",
                  }}
                >
                  <b style={{ display: "block", color: "var(--ink)", fontSize: "15px", marginBottom: "4px" }}>{q.text}</b>
                  <span style={{ fontSize: "12.5px", color: isSelected ? "var(--o-deep)" : "var(--muted)", fontWeight: 700 }}>
                    {isSelected ? "✓ Selected" : "Tap if this sounds like you"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Result summary sidebar */}
          <div
            style={{
              background: "var(--b-navy)",
              color: "#fff",
              borderRadius: "24px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span style={{ color: "#ffd089", fontFamily: "var(--df)", fontWeight: 800, fontSize: "12px", textTransform: "uppercase" }}>
                Your Matching Direction
              </span>
              <h2 id="careerTitle" style={{ fontFamily: "var(--df)", fontWeight: 900, fontSize: "32px", color: "#fff", margin: "10px 0" }}>
                {topResult.title}
              </h2>
              <p id="careerText" style={{ color: "#aebed6", fontSize: "15px", lineHeight: "1.5" }}>{topResult.desc}</p>

              <div style={{ marginTop: "20px", background: "rgba(255,255,255,.1)", borderRadius: "14px", padding: "16px" }}>
                <span style={{ fontSize: "12px", color: "#9cc0ff", fontWeight: 800, textTransform: "uppercase" }}>Suggested study areas:</span>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: "15px", marginTop: "4px" }}>{topResult.degrees}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "24px", flexWrap: "wrap" }}>
              <Link className="btn btn-orange" href="/tools/degree-match">
                Find matching degree
              </Link>
              <Link className="btn btn-white" href="/lead/adviser-call">
                Talk to adviser
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareerQuizWidget;
