"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import "./tools.css";

// 8 career questions mapping to categories
const careerQs = [
  { text: "I like organising people or improving how work is done", category: "business" },
  { text: "I enjoy solving technical problems", category: "tech" },
  { text: "I want work where I help people directly", category: "health" },
  { text: "I like visual, creative or communication tasks", category: "creative" },
  { text: "I prefer practical projects with real-world outcomes", category: "construction" },
  { text: "I enjoy rules, arguments, evidence or justice", category: "law" },
  { text: "I would like to manage projects or teams", category: "business" },
  { text: "I like data, systems or computers", category: "tech" },
] as const;

// 6 personality questions mapping to traits and point adjustments
const persQs = [
  { text: "I prefer working with people", trait: "people", value: 12 },
  { text: "I like clear steps, detail and accuracy", trait: "detail", value: 12 },
  { text: "I naturally take responsibility in groups", trait: "leadership", value: 12 },
  { text: "I learn best by doing practical tasks", trait: "practical", value: 12 },
  { text: "I prefer independent deep work", trait: "people", value: -10 },
  { text: "I enjoy planning and organising", trait: "leadership", value: 10 },
] as const;

// Category name and degree suggestion mappings matching the HTML mockup
const categoryNames = {
  business: {
    title: "Business & leadership",
    degrees: "Business Management, Project Management, Marketing",
  },
  tech: {
    title: "Technology & systems",
    degrees: "Computing, Cyber Security, Data Analytics",
  },
  health: {
    title: "People & support",
    degrees: "Health & Social Care, Psychology, Public Health",
  },
  creative: {
    title: "Creative communication",
    degrees: "Marketing, Media, Business",
  },
  construction: {
    title: "Practical project work",
    degrees: "Construction Management, Project Management",
  },
  law: {
    title: "Law & justice",
    degrees: "Law, Criminology, Business Law",
  },
} as const;

export interface CareerQuizWidgetProps {
  sectionData?: {
    status?: boolean;
    badge?: string;
    title?: string;
    description?: string;
    cards?: Array<{
      title?: string;
      description?: string;
      link?: string;
    }>;
  };
}

export function CareerQuizWidget({ sectionData }: CareerQuizWidgetProps) {
  const [activeTab, setActiveTab] = useState<"career" | "personality">("career");
  const [selectedCareers, setSelectedCareers] = useState<number[]>([]);
  const [selectedPersonalities, setSelectedPersonalities] = useState<number[]>([]);

  // Auto-save tool results to dashboard on change
  React.useEffect(() => {
    if (selectedCareers.length > 0 || selectedPersonalities.length > 0) {
      const win = typeof window !== "undefined" ? (window as any) : null;
      if (win && win.ystudySaveCurrentTool) {
        win.ystudySaveCurrentTool();
      }
    }
  }, [selectedCareers, selectedPersonalities]);

  const toggleCareer = (index: number) => {
    setSelectedCareers((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const togglePersonality = (index: number) => {
    setSelectedPersonalities((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Career score calculations
  const careerScores = useMemo(() => {
    const scores = { business: 0, tech: 0, health: 0, creative: 0, construction: 0, law: 0 };
    selectedCareers.forEach((index) => {
      const category = careerQs[index].category;
      scores[category] += 1;
    });
    return scores;
  }, [selectedCareers]);

  const bestCategoryKey = useMemo(() => {
    const keys: (keyof typeof careerScores)[] = ["business", "tech", "health", "creative", "construction", "law"];
    let best = keys[0];
    let maxVal = careerScores[best];
    keys.forEach((key) => {
      if (careerScores[key] > maxVal) {
        maxVal = careerScores[key];
        best = key;
      }
    });
    return best;
  }, [careerScores]);

  const topResult = categoryNames[bestCategoryKey];

  // Personality traits calculation (base score 50 + sum of changes from selected options)
  const traitScores = useMemo(() => {
    const scores = { people: 50, detail: 50, leadership: 50, practical: 50 };
    persQs.forEach((q, index) => {
      const category = q.trait;
      const val = q.value;
      if (selectedPersonalities.includes(index)) {
        scores[category] += val;
      } else {
        scores[category] -= val;
      }
    });
    return scores;
  }, [selectedPersonalities]);

  const nextSteps = useMemo(() => {
    const staticSteps = [
      {
        title: "Explore matching degrees",
        desc: "Turn your career result into subjects",
        url: "/tools/degree-match",
      },
      {
        title: "Check pathway route",
        desc: "Qualification route and entry point",
        url: "/tools/degree-match",
      },
      {
        title: "Estimate student finance",
        desc: "Maintenance and tuition estimate",
        url: "/tools/finance-calculator",
      },
      {
        title: "Book Adviser Call",
        desc: "Get human help before applying",
        url: "/lead/adviser-call",
      },
    ];

    if (sectionData?.cards && Array.isArray(sectionData.cards)) {
      const getFallbackUrl = (index: number, title?: string) => {
        const lowerTitle = (title || "").toLowerCase();
        if (lowerTitle.includes("degree") || lowerTitle.includes("matching")) return "/tools/degree-match";
        if (lowerTitle.includes("pathway") || lowerTitle.includes("route")) return "/tools/degree-match";
        if (lowerTitle.includes("finance") || lowerTitle.includes("calculator")) return "/tools/finance-calculator";
        if (lowerTitle.includes("adviser") || lowerTitle.includes("call")) return "/lead/adviser-call";

        const staticUrls = [
          "/tools/degree-match",
          "/tools/degree-match",
          "/tools/finance-calculator",
          "/lead/adviser-call"
        ];
        return staticUrls[index] || "/tools/degree-match";
      };

      return sectionData.cards.map((card, i) => {
        const defaultStep = staticSteps[i] || {};
        return {
          title: card.title || defaultStep.title || "",
          desc: card.description || defaultStep.desc || "",
          url: card.link || getFallbackUrl(i, card.title)
        };
      });
    }

    return staticSteps;
  }, [sectionData]);

  return (
    <>
      <section className="tool-shell" id="careerQuiz">
        <div className="container">
          <div className="tool-tabs">
            <button
              type="button"
              className={`tool-tab ${activeTab === "career" ? "active" : ""}`}
              onClick={() => setActiveTab("career")}
            >
              Career quiz
            </button>
            <button
              type="button"
              className={`tool-tab ${activeTab === "personality" ? "active" : ""}`}
              onClick={() => setActiveTab("personality")}
            >
              Personality test
            </button>
          </div>
        </div>

        <div className="container tool-grid-2">
          {/* Career Panel */}
          <div
            className="tool-panel"
            id="careerPanel"
            style={{ display: activeTab === "career" ? "block" : "none" }}
          >
            <h2>What kind of work fits you?</h2>
            <p className="muted">Choose the statements that feel most like you.</p>
            <div className="answer-grid" id="careerAnswers">
              {careerQs.map((q, i) => {
                const isSelected = selectedCareers.includes(i);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggleCareer(i)}
                    className={`answer-card ${isSelected ? "selected" : ""}`}
                  >
                    <b>{q.text}</b>
                    <span>{isSelected ? "✓ Selected" : "Tap if this sounds like you"}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Personality Panel */}
          <div
            className="tool-panel"
            id="personalityPanel"
            style={{ display: activeTab === "personality" ? "block" : "none" }}
          >
            <h2>Personality style</h2>
            <p className="muted">This is a light self-reflection tool, not a clinical test.</p>
            <div className="answer-grid" id="personalityAnswers">
              {persQs.map((q, i) => {
                const isSelected = selectedPersonalities.includes(i);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => togglePersonality(i)}
                    className={`answer-card ${isSelected ? "selected" : ""}`}
                  >
                    <b>{q.text}</b>
                    <span>{isSelected ? "✓ Selected" : "Build your style profile"}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sidebar results display */}
          <aside className="tool-result-hero">
            <p className="tool-pill">Your current direction</p>
            <h2 id="careerTitle">{topResult.title}</h2>
            <p id="careerText" style={{ color: '#fff' }}>
              Suggested study areas: {topResult.degrees}. Use Degree Match next to check your actual university route.
            </p>
            <div className="personality-bars" id="traitBars">
              {Object.entries(traitScores).map(([k, v]) => {
                const displayVal = Math.max(10, Math.min(100, v));
                return (
                  <div key={k} className="trait-row">
                    <b style={{ textTransform: "capitalize" }}>{k}</b>
                    <div className="meter">
                      <span style={{ width: `${displayVal}%` }}></span>
                    </div>
                    <span>{displayVal}</span>
                  </div>
                );
              })}
            </div>
            <div className="tool-mini-nav">
              <Link className="btn btn-orange" href="/tools/degree-match">
                Find matching degree
              </Link>
              <Link className="btn btn-white" href="/lead/adviser-call">
                Talk to adviser
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Suggested next steps section */}
      {sectionData?.status !== false && (
        <section className="tool-shell" style={{ borderTop: "1px solid rgba(15, 23, 42, 0.08)" }}>
          <div className="container">
            <div className="tool-panel">
              <h2>{sectionData?.title || "Suggested next steps"}</h2>
              <div className="recommend-grid" id="careerNext">
                {nextSteps.map((step, i) => (
                  <div key={i} className="degree-card-row">
                    <div>
                      <b>{step.title}</b>
                      <span style={{ display: "block", fontSize: "13px", color: "var(--muted)", marginTop: "2px" }}>
                        {step.desc}
                      </span>
                    </div>
                    <Link className="btn btn-blue" href={step.url}>
                      Open
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default CareerQuizWidget;
