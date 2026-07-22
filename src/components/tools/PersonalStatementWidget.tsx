"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

export interface PersonalStatementWidgetProps {
  section2Data?: {
    status?: boolean;
    title?: string;
    description?: string;
    cards?: Array<{
      title: string;
      description: string;
    }>;
  };
  initialData?: any;
}

export function PersonalStatementWidget({ section2Data }: PersonalStatementWidgetProps) {

  const [activeTab, setActiveTab] = useState<"course" | "experience" | "motivation" | "finish">("course");

  const [course, setCourse] = useState("");
  const [career, setCareer] = useState("");
  const [whyCourse, setWhyCourse] = useState("");
  const [whyNow, setWhyNow] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [examples, setExamples] = useState("");
  const [challenges, setChallenges] = useState("");
  const [future, setFuture] = useState("");
  const [support, setSupport] = useState("");

  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const insertPhrase = (phrase: string) => {
    setSupport((prev) => (prev ? prev + " " + phrase : phrase));
    setActiveTab("motivation");
    showToast("Added phrase to motivation");
  };

  const { score, checklist } = useMemo(() => {
    let s = 0;
    const items = [
      { ok: !!course.trim(), label: "Course named", pts: 12 },
      { ok: !!career.trim(), label: "Career goal included", pts: 12 },
      { ok: whyCourse.trim().length > 40, label: "Course motivation explained", pts: 20 },
      { ok: experience.trim().length > 40, label: "Relevant experience included", pts: 18 },
      { ok: skills.trim().length > 20, label: "Skills described", pts: 12 },
      { ok: examples.trim().length > 25, label: "Example evidence added", pts: 10 },
      { ok: whyNow.trim().length > 30, label: "Why now explained", pts: 10 },
      { ok: future.trim().length > 20, label: "Future plan included", pts: 6 },
    ];
    items.forEach((item) => {
      if (item.ok) s += item.pts;
    });
    return { score: Math.min(100, s), checklist: items };
  }, [course, career, whyCourse, experience, skills, examples, whyNow, future]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && (window as any).ystudySaveCurrentTool) {
        (window as any).ystudySaveCurrentTool();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [course, career, whyCourse, experience, skills, examples, challenges, whyNow, future, support]);

  const statementParagraphs = useMemo(() => {
    const p: string[] = [];
    const targetCourse = course.trim() || "my chosen course";

    p.push(
      `I am applying to study ${targetCourse} because I want to develop my knowledge, confidence and long-term career opportunities${
        career.trim() ? " in " + career.trim() : ""
      }.`
    );

    if (whyCourse.trim()) p.push(whyCourse.trim());
    if (experience.trim()) {
      p.push(`My work and life experience has helped me build practical understanding that I can bring into my studies. ${experience.trim()}`);
    }
    if (skills.trim()) {
      p.push(`The skills I can bring to university include ${skills.trim()}. These strengths will help me manage independent study, assessments and group work.`);
    }
    if (examples.trim()) p.push(`For example, ${examples.trim()}`);
    if (challenges.trim()) p.push(`I have also developed resilience and determination through challenges and responsibilities. ${challenges.trim()}`);
    if (whyNow.trim()) p.push(`This is the right time for me to study because ${whyNow.trim()}`);
    if (future.trim()) p.push(`After completing the course, my goal is to ${future.trim()}`);
    if (support.trim()) p.push(support.trim());

    return p;
  }, [course, career, whyCourse, experience, skills, examples, challenges, whyNow, future, support]);

  const copyStatement = () => {
    const fullText = statementParagraphs.join("\n\n");
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    showToast("Statement copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const saveForAdviser = () => {
    try {
      const dataToSave = {
        title: "Personal Statement Draft",
        summary: `Statement strength: ${score}/100`,
        paragraphs: statementParagraphs,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem("ystudy_saved_ps", JSON.stringify(dataToSave));
      showToast("Saved for adviser review!");
    } catch (e) {
      showToast("Draft ready for review!");
    }
  };

  return (
    <section className="phase-shell" id="builder">
      <div className="container phase-layout cv-ps-split" style={{ textAlign: "left" }}>
        <div className="phase-card">
          <h2>{section2Data?.title || "Statement Builder"}</h2>
          <p className="phase-muted">{section2Data?.description || "Use simple prompts. The tool builds a first draft you can improve with an adviser."}</p>

          <div className="phase-tabs no-print">
            <button className={`phase-tab ${activeTab === "course" ? "active" : ""}`} onClick={() => setActiveTab("course")}>
              Course
            </button>
            <button className={`phase-tab ${activeTab === "experience" ? "active" : ""}`} onClick={() => setActiveTab("experience")}>
              Experience
            </button>
            <button className={`phase-tab ${activeTab === "motivation" ? "active" : ""}`} onClick={() => setActiveTab("motivation")}>
              Motivation
            </button>
            <button className={`phase-tab ${activeTab === "finish" ? "active" : ""}`} onClick={() => setActiveTab("finish")}>
              Finish
            </button>
          </div>

          {activeTab === "course" && (
            <div className="phase-pane active">
              <div className="form-grid">
                <div className="field">
                  <label>Course you want to study</label>
                  <input
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    placeholder="e.g. Business Management with Foundation Year"
                  />
                </div>
                <div className="field">
                  <label>Career goal</label>
                  <input
                    value={career}
                    onChange={(e) => setCareer(e.target.value)}
                    placeholder="e.g. project manager, business owner, social worker"
                  />
                </div>
                <div className="field full">
                  <label>Why this course?</label>
                  <textarea
                    value={whyCourse}
                    onChange={(e) => setWhyCourse(e.target.value)}
                    placeholder="Explain what attracts you to this subject and how it connects to your future."
                  />
                </div>
                <div className="field full">
                  <label>Why now?</label>
                  <textarea
                    value={whyNow}
                    onChange={(e) => setWhyNow(e.target.value)}
                    placeholder="Why is this the right time in your life to start university?"
                  />
                </div>
              </div>
              <div className="btnrow" style={{ marginTop: "16px" }}>
                <button className="ys-btn white" type="button" onClick={() => setActiveTab("experience")}>
                  Next: experience →
                </button>
              </div>
            </div>
          )}

          {activeTab === "experience" && (
            <div className="phase-pane active">
              <div className="form-grid">
                <div className="field full">
                  <label>Relevant work or life experience</label>
                  <textarea
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="Mention jobs, caring responsibilities, volunteering, business experience or challenges that built your skills."
                  />
                </div>
                <div className="field full">
                  <label>Skills you can bring to university</label>
                  <textarea
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="Communication, leadership, organisation, problem solving, resilience, teamwork..."
                  />
                </div>
                <div className="field full">
                  <label>Achievements or examples</label>
                  <textarea
                    value={examples}
                    onChange={(e) => setExamples(e.target.value)}
                    placeholder="Give 1-2 examples that prove your strengths."
                  />
                </div>
              </div>
              <div className="btnrow" style={{ marginTop: "16px" }}>
                <button className="ys-btn white" type="button" onClick={() => setActiveTab("motivation")}>
                  Next: motivation →
                </button>
              </div>
            </div>
          )}

          {activeTab === "motivation" && (
            <div className="phase-pane active">
              <div className="form-grid">
                <div className="field full">
                  <label>Challenges overcome</label>
                  <textarea
                    value={challenges}
                    onChange={(e) => setChallenges(e.target.value)}
                    placeholder="Optional: mention responsibilities, language barriers, returning to study, work/family balance or confidence."
                  />
                </div>
                <div className="field full">
                  <label>Future plans after the course</label>
                  <textarea
                    value={future}
                    onChange={(e) => setFuture(e.target.value)}
                    placeholder="What do you hope to do after the degree?"
                  />
                </div>
                <div className="field full">
                  <label>Why YStudy/adviser support may help</label>
                  <textarea
                    value={support}
                    onChange={(e) => setSupport(e.target.value)}
                    placeholder="Optional: mention that you are preparing carefully and choosing a realistic route."
                  />
                </div>
              </div>
              <div className="btnrow" style={{ marginTop: "16px" }}>
                <button className="ys-btn white" type="button" onClick={() => setActiveTab("finish")}>
                  Next: finish →
                </button>
              </div>
            </div>
          )}

          {activeTab === "finish" && (
            <div className="phase-pane active">
              <h3>Improve your draft</h3>
              <p className="phase-muted">Use these inserts to strengthen weak areas without making the statement sound fake.</p>
              <div className="chip-grid" style={{ display: "flex", flexWrap: "wrap", gap: "9px", marginBottom: "16px" }}>
                <button
                  type="button"
                  className="insert-chip"
                  onClick={() =>
                    insertPhrase(
                      "I understand that returning to study requires commitment, organisation and consistent effort, and I am prepared to manage my time carefully."
                    )
                  }
                >
                  + Add maturity sentence
                </button>
                <button
                  type="button"
                  className="insert-chip"
                  onClick={() =>
                    insertPhrase(
                      "My work experience has helped me develop communication, reliability and problem-solving skills that are relevant to university-level study."
                    )
                  }
                >
                  + Add transferable skills
                </button>
                <button
                  type="button"
                  className="insert-chip"
                  onClick={() =>
                    insertPhrase(
                      "I am particularly interested in applying what I learn to real workplace situations and building a stronger long-term career."
                    )
                  }
                >
                  + Add career link
                </button>
              </div>
              <div className="divider" />
              <div className="btnrow" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button type="button" className="ys-btn orange" onClick={saveForAdviser}>
                  Save statement
                </button>
                <button type="button" className="ys-btn blue" onClick={copyStatement}>
                  {copied ? "Copied!" : "Copy text"}
                </button>
                <Link className="ys-btn white" href="/lead/adviser-call">
                  Book adviser call
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* PREVIEW SIDEBAR */}
        <aside className="preview-card">
          <div className="score-band">
            <div className="score-circle" style={{ "--score": score } as React.CSSProperties}>
              <b id="psScore">{score}</b>
            </div>
            <div>
              <h3 style={{ color: "#fff", margin: 0 }}>Statement Strength</h3>
              <p style={{ margin: "4px 0 10px", color: "#cdd8e8", fontWeight: 800 }}>A guidance score, not an admissions decision.</p>
              <div className="meter">
                <span style={{ width: `${score}%` }}></span>
              </div>
            </div>
          </div>

          <div className="btnrow no-print" style={{ marginBottom: "14px", display: "flex", gap: "8px" }}>
            <button type="button" className="ys-btn white" onClick={copyStatement}>
              {copied ? "Copied!" : "Copy"}
            </button>
            <Link className="ys-btn orange" href="/lead/adviser-call">
              Send to adviser
            </Link>
          </div>

          <div className="ps-paper print-area">
            <h2>Personal Statement Draft</h2>
            {statementParagraphs.map((paraText, i) => (
              <p key={i}>{paraText}</p>
            ))}
          </div>

          <div className="checklist no-print" style={{ marginTop: "14px" }}>
            {checklist.map((item, idx) => (
              <div key={idx} style={{ display: "flex", gap: "8px", fontSize: "13px", fontWeight: 700, color: item.ok ? "#16a34a" : "#64758b" }}>
                <span>{item.ok ? "✓" : "○"}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* CONVERSION GRID */}
      {section2Data?.status !== false && (
        <div className="container conversion-grid" style={{ marginTop: "32px", textAlign: "left" }}>
          <div className="conversion-card">
            <h3>{section2Data?.cards?.[0]?.title || "Course choice first"}</h3>
            <p className="phase-muted">{section2Data?.cards?.[0]?.description || "A strong statement matches the course. Use Degree Match Finder if you are not sure yet."}</p>
            <Link className="ys-btn blue" href="/tools/degree-match">
              Open Degree Match
            </Link>
          </div>
          <div className="conversion-card">
            <h3>{section2Data?.cards?.[1]?.title || "Adviser review"}</h3>
            <p className="phase-muted">{section2Data?.cards?.[1]?.description || "Send the draft to an adviser before applying. They can check tone, structure and course fit."}</p>
            <Link className="ys-btn orange" href="/lead/adviser-call">
              Book review
            </Link>
          </div>
          <div className="conversion-card">
            <h3>{section2Data?.cards?.[2]?.title || "Build CV too"}</h3>
            <p className="phase-muted">{section2Data?.cards?.[2]?.description || "Your CV and statement should tell the same story about your experience and goals."}</p>
            <Link className="ys-btn blue" href="/tools/cv-builder">
              Open CV Builder
            </Link>
          </div>
        </div>
      )}

      {toastMessage && <div className="save-toast show">{toastMessage}</div>}
    </section>
  );
}

export default PersonalStatementWidget;
