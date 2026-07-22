"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

interface Question {
  q: string;
  opts: string[];
  correct: number;
}

const testsData: Record<string, { title: string; pill: string; questions: Question[] }> = {
  b1: {
    title: "B1 Intermediate Interview Check",
    pill: "B1 · Intermediate",
    questions: [
      { q: "I ___ interested in studying Business Management.", opts: ["am", "is", "are", "be"], correct: 0 },
      { q: "She ___ to college twice a week.", opts: ["go", "goes", "going", "gone"], correct: 1 },
      { q: "Choose the best sentence.", opts: ["I have five years of experience in retail.", "I has five years experience.", "I am five years experience.", "I experience five years."], correct: 0 },
      { q: "What does 'deadline' mean?", opts: ["A final date to complete something", "A place to study", "A type of loan", "A job title"], correct: 0 },
      { q: "Choose the correct question.", opts: ["Where you live?", "Where do you live?", "Where does you live?", "Where living you?"], correct: 1 },
      { q: "I worked there ___ 2020 to 2024.", opts: ["from", "at", "on", "by"], correct: 0 },
    ],
  },
  b2: {
    title: "B2 Upper-Intermediate Interview Check",
    pill: "B2 · Upper-intermediate",
    questions: [
      { q: "Choose the best sentence.", opts: ["Although I work full-time, I can organise my study schedule.", "Although I working full-time, I can organise.", "I can organise although full-time working.", "Although work full-time I organised."], correct: 0 },
      { q: "The word 'relevant' means ___.", opts: ["connected to the topic", "very expensive", "difficult to pronounce", "not allowed"], correct: 0 },
      { q: "Choose the most formal phrase.", opts: ["I would like to explain my motivation.", "I wanna say why.", "I tell you my reason.", "My reason is this yeah."], correct: 0 },
      { q: "I want to study business ___ it matches my management experience.", opts: ["because", "although", "unless", "despite"], correct: 0 },
    ],
  },
  adv: {
    title: "Advanced C1/C2 Confidence Check",
    pill: "Advanced · C1/C2",
    questions: [
      { q: "Choose the most precise sentence.", opts: ["My professional experience has strengthened my ability to evaluate problems and communicate solutions.", "My job made me better with things.", "I know problems and talking.", "Experience is good for me."], correct: 0 },
      { q: "'Nevertheless' is closest in meaning to ___.", opts: ["however", "therefore", "because", "for example"], correct: 0 },
      { q: "The phrase 'critically evaluate' means ___.", opts: ["judge strengths and weaknesses using evidence", "copy information exactly", "describe only personal opinion", "write a short list"], correct: 0 },
    ],
  },
};

export interface EnglishLevelWidgetProps {
  sectionData?: {
    status?: boolean;
    badge?: string;
    title?: string;
    description?: string;
  };
}

export function EnglishLevelWidget({ sectionData }: EnglishLevelWidgetProps) {
  if (sectionData?.status === false) {
    return null;
  }

  const [level, setLevel] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);

  const startTest = (lvlKey: string) => {
    setLevel(lvlKey);
    setCurrentIdx(0);
    setUserAnswers([]);
    setShowResult(false);
  };

  const handleAnswerSelect = (ansIdx: number) => {
    const updated = [...userAnswers];
    updated[currentIdx] = ansIdx;
    setUserAnswers(updated);
  };

  const activeTest = level ? testsData[level] : null;
  const currentQ = activeTest ? activeTest.questions[currentIdx] : null;

  const handleNext = () => {
    if (!activeTest) return;
    if (userAnswers[currentIdx] === undefined) {
      alert("Please select an answer to continue.");
      return;
    }
    if (currentIdx < activeTest.questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setShowResult(true);
      setTimeout(() => {
        if (typeof window !== "undefined" && (window as any).ystudySaveCurrentTool) {
          (window as any).ystudySaveCurrentTool();
        }
      }, 120);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx((prev) => prev - 1);
  };

  const score = useMemo(() => {
    if (!activeTest) return 0;
    let s = 0;
    activeTest.questions.forEach((q, i) => {
      if (userAnswers[i] === q.correct) s++;
    });
    return s;
  }, [activeTest, userAnswers]);

  const kicker = sectionData?.badge || "Built for mature students";
  const title = sectionData?.title || "Choose the right English check.";
  const description = sectionData?.description || "Select your starting level. The result helps decide whether to apply now or speak to an adviser.";

  return (
    <section className="thub-sec" id="test">
      <div className="thub" style={{ textAlign: "left" }}>
        {!level ? (
          /* LEVEL SELECT CARDS */
          <div>
            <div className="thub-head">
              <span className="kicker">{kicker}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              <button
                type="button"
                onClick={() => startTest("b1")}
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "20px",
                  padding: "24px",
                  textAlign: "left",
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(15,23,42,.06)",
                }}
              >
                <span
                  style={{
                    background: "var(--b-navy)",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontWeight: 900,
                    fontSize: "14px",
                  }}
                >
                  B1
                </span>
                <h3 style={{ fontFamily: "var(--df)", fontWeight: 900, fontSize: "22px", margin: "14px 0 8px" }}>
                  Intermediate interview check
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: "1.5" }}>
                  For students who can handle everyday English and want to check simple interview confidence.
                </p>
                <span style={{ color: "var(--o-deep)", fontWeight: 800, fontSize: "14px", display: "inline-block", marginTop: "12px" }}>
                  Start B1 test →
                </span>
              </button>

              <button
                type="button"
                onClick={() => startTest("b2")}
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "20px",
                  padding: "24px",
                  textAlign: "left",
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(15,23,42,.06)",
                }}
              >
                <span
                  style={{
                    background: "var(--b-navy)",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontWeight: 900,
                    fontSize: "14px",
                  }}
                >
                  B2
                </span>
                <h3 style={{ fontFamily: "var(--df)", fontWeight: 900, fontSize: "22px", margin: "14px 0 8px" }}>
                  Upper-intermediate check
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: "1.5" }}>
                  For students who can explain opinions, work experience and goals for degree entry.
                </p>
                <span style={{ color: "var(--o-deep)", fontWeight: 800, fontSize: "14px", display: "inline-block", marginTop: "12px" }}>
                  Start B2 test →
                </span>
              </button>

              <button
                type="button"
                onClick={() => startTest("adv")}
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "20px",
                  padding: "24px",
                  textAlign: "left",
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(15,23,42,.06)",
                }}
              >
                <span
                  style={{
                    background: "var(--b-navy)",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontWeight: 900,
                    fontSize: "14px",
                  }}
                >
                  C1
                </span>
                <h3 style={{ fontFamily: "var(--df)", fontWeight: 900, fontSize: "22px", margin: "14px 0 8px" }}>
                  Advanced confidence check
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: "1.5" }}>
                  For confident speakers checking advanced vocabulary and academic reading.
                </p>
                <span style={{ color: "var(--o-deep)", fontWeight: 800, fontSize: "14px", display: "inline-block", marginTop: "12px" }}>
                  Start C1 test →
                </span>
              </button>
            </div>
          </div>
        ) : !showResult ? (
          /* ACTIVE QUIZ SCREEN */
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: "24px",
              padding: "32px",
              maxWidth: "780px",
              margin: "0 auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ color: "var(--o-deep)", fontWeight: 800, fontSize: "13px" }}>{activeTest?.pill}</span>
              <button type="button" className="ys-btn white" onClick={() => setLevel(null)}>
                Change test
              </button>
            </div>

            <div style={{ height: "6px", background: "var(--line)", borderRadius: "999px", marginBottom: "24px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${((currentIdx + 1) / (activeTest?.questions.length || 1)) * 100}%`,
                  background: "var(--b)",
                  transition: "width .3s",
                }}
              />
            </div>

            {currentQ && (
              <div>
                <h3 style={{ fontFamily: "var(--df)", fontWeight: 900, fontSize: "24px", marginBottom: "20px" }}>{currentQ.q}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {currentQ.opts.map((optText, oIdx) => {
                    const isSelected = userAnswers[currentIdx] === oIdx;
                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleAnswerSelect(oIdx)}
                        style={{
                          padding: "14px 18px",
                          borderRadius: "14px",
                          border: `1.5px solid ${isSelected ? "var(--b)" : "var(--line)"}`,
                          background: isSelected ? "var(--soft)" : "#fff",
                          fontWeight: 700,
                          fontSize: "15px",
                          textAlign: "left",
                          cursor: "pointer",
                          color: "var(--ink)",
                        }}
                      >
                        {optText}
                      </button>
                    );
                  })}
                </div>

                <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
                  {currentIdx > 0 && (
                    <button type="button" className="ys-btn white" onClick={handlePrev}>
                      ← Previous
                    </button>
                  )}
                  <button type="button" className="ys-btn blue" onClick={handleNext}>
                    {currentIdx === (activeTest?.questions.length || 1) - 1 ? "See my result →" : "Next →"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* RESULT SCREEN */
          <div
            style={{
              background: "var(--b-navy)",
              color: "#fff",
              borderRadius: "24px",
              padding: "36px",
              maxWidth: "780px",
              margin: "0 auto",
            }}
          >
            <span style={{ color: "#ffd089", fontWeight: 800, fontSize: "12px", textTransform: "uppercase" }}>{activeTest?.pill} Result</span>
            <h2 id="scoreText" style={{ fontFamily: "var(--df)", fontWeight: 900, fontSize: "36px", color: "#fff", margin: "10px 0" }}>
              Score: {score} / {activeTest?.questions.length}
            </h2>
            <p id="levelText" style={{ color: "#aebed6", fontSize: "16px", lineHeight: "1.5" }}>
              {score >= (activeTest?.questions.length || 1) * 0.7
                ? "Great job! Your English confidence meets standard university interview expectations."
                : "Good effort! An adviser can help review flexible entry routes and interview preparation."}
            </p>

            <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
              <Link className="btn btn-orange" href="/lead/adviser-call">
                Talk to adviser
              </Link>
              <button type="button" className="btn btn-white" onClick={() => setLevel(null)}>
                Retake another test
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default EnglishLevelWidget;
