"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import "./tools.css";

export interface PersonalStatementWidgetProps {
  section2Data?: {
    status?: boolean;
    cards?: Array<{
      title: string;
      description: string;
      link?: string;
    }>;
  };
}

export function PersonalStatementWidget({ section2Data }: PersonalStatementWidgetProps) {
  if (section2Data?.status === false) {
    return null;
  }

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

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("Create an account first.");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<{ id?: string; _id?: string; name?: string; email?: string; role?: string } | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ystudy_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && (parsed.id || parsed._id)) {
          setCurrentUser(parsed);
        }
      }
    } catch (e) {
      console.error("Error reading ystudy_user from localStorage:", e);
    }
  }, []);

  const isLoggedIn = !!(currentUser?.id || currentUser?._id);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 1800);
  };

  const handleDownloadPdf = () => {
    setShowModal(false);
    if (typeof window === "undefined") return;

    const previewEl = document.getElementById("psPreview");
    if (!previewEl) {
      window.print();
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.title = "Print Statement";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      window.print();
      return;
    }

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${course ? `${course} - Personal Statement` : "Personal Statement - YStudy"}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
          <style>
            @page {
              size: A4 portrait;
              margin: 20mm;
            }
            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            html, body {
              margin: 0;
              padding: 0;
              background: #ffffff;
              font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              color: #152033;
              font-size: 14px;
              line-height: 1.7;
              width: 100%;
            }
            .ps-paper {
              background: #ffffff;
              width: 100%;
              max-width: 100%;
              margin: 0;
              padding: 0;
              border: none !important;
              border-radius: 0 !important;
              box-shadow: none !important;
              color: #152033;
            }
            .ps-paper h2 {
              color: #0b2d57;
              font-size: 26px;
              font-weight: 800;
              margin: 0 0 18px 0;
            }
            .ps-paper p {
              margin: 0 0 16px 0;
              font-size: 14px;
              line-height: 1.7;
              color: #152033;
            }
          </style>
        </head>
        <body>
          <div class="ps-paper">
            ${previewEl.innerHTML}
          </div>
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }, 350);
  };

  const handleOpenTab = (tab: "course" | "experience" | "motivation" | "finish") => {
    setActiveTab(tab);
    const el = document.getElementById("builder");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleInsertPhrase = (phrase: string) => {
    setSupport((prev) => (prev ? prev + " " + phrase : phrase));
    handleOpenTab("motivation");
  };

  // Score calculation matching mockup logic
  const scoreData = useMemo(() => {
    let s = 0;
    const checklist: Array<{ ok: boolean; label: string }> = [];

    const addCheck = (ok: boolean, label: string, pts: number) => {
      if (ok) s += pts;
      checklist.push({ ok, label });
    };

    addCheck(!!course.trim(), "Course named", 12);
    addCheck(!!career.trim(), "Career goal included", 12);
    addCheck(whyCourse.trim().length > 50, "Course motivation explained", 20);
    addCheck(experience.trim().length > 50, "Relevant experience included", 18);
    addCheck(skills.trim().length > 25, "Skills described", 12);
    addCheck(examples.trim().length > 30, "Example evidence added", 10);
    addCheck(whyNow.trim().length > 35, "Why now explained", 10);
    addCheck(future.trim().length > 25, "Future plan included", 6);

    return { score: Math.min(100, s), checklist };
  }, [course, career, whyCourse, experience, skills, examples, whyNow, future]);

  // Generate paragraphs matching mockup logic
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
      p.push(
        `My work and life experience has helped me build practical understanding that I can bring into my studies. ${experience.trim()}`
      );
    }
    if (skills.trim()) {
      p.push(
        `The skills I can bring to university include ${skills.trim()}. These strengths will help me manage independent study, assessments and group work.`
      );
    }
    if (examples.trim()) p.push(`For example, ${examples.trim()}`);
    if (challenges.trim()) {
      p.push(
        `I have also developed resilience and determination through challenges and responsibilities. ${challenges.trim()}`
      );
    }
    if (whyNow.trim()) p.push(`This is the right time for me to study because ${whyNow.trim()}`);
    if (future.trim()) p.push(`After completing the course, my goal is to ${future.trim()}`);
    if (support.trim()) p.push(support.trim());

    return p;
  }, [course, career, whyCourse, experience, skills, examples, challenges, whyNow, future, support]);

  const handleCopyText = () => {
    const text = statementParagraphs.join("\n\n");
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      triggerToast("Copied to clipboard!");
      handleOpenModal("Copy statement text");
    }
  };

  const handleOpenModal = (titleStr: string) => {
    setModalTitle(titleStr);
    setShowModal(true);
  };

  const handlePrepareAdviser = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "ystudy_adviser_context",
        JSON.stringify({
          from: "Personal Statement Builder",
          summary: `Statement strength ${scoreData.score}/100`,
          savedAt: new Date().toISOString(),
        })
      );
      triggerToast("Saved for adviser");
      handleOpenModal("Send your statement to adviser");
    }
  };

  const bottomCards = section2Data?.cards || [
    { title: "Course choice first", description: "A strong statement matches the course. Use Degree Match Finder if you are not sure yet." },
    { title: "Adviser review", description: "Send the draft to an adviser before applying. They can check tone, structure and course fit." },
    { title: "Build CV too", description: "Your CV and statement should tell the same story about your experience and goals." }
  ];

  return (
    <>
      <section className="phase-shell" id="builder">
        <div className="container phase-layout cv-ps-split" style={{ textAlign: "left" }}>
          
          {/* TAB FORMS SIDE CARD */}
          <div className="phase-card">
            <h2>Statement Builder</h2>
            <p className="phase-muted">Use simple prompts. The tool builds a first draft you can improve with an adviser.</p>
            
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

            {/* Tab Pane: Course */}
            {activeTab === "course" && (
              <div className="phase-pane active" id="pane-course">
                <div className="form-grid">
                  <div className="field">
                    <label>Course you want to study</label>
                    <input
                      id="psCourse"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      placeholder="e.g. Business Management with Foundation Year"
                    />
                  </div>
                  <div className="field">
                    <label>Career goal</label>
                    <input
                      id="psCareer"
                      value={career}
                      onChange={(e) => setCareer(e.target.value)}
                      placeholder="e.g. project manager, business owner, social worker"
                    />
                  </div>
                  <div className="field full">
                    <label>Why this course?</label>
                    <textarea
                      id="psWhyCourse"
                      value={whyCourse}
                      onChange={(e) => setWhyCourse(e.target.value)}
                      placeholder="Explain what attracts you to this subject and how it connects to your future."
                    />
                  </div>
                  <div className="field full">
                    <label>Why now?</label>
                    <textarea
                      id="psWhyNow"
                      value={whyNow}
                      onChange={(e) => setWhyNow(e.target.value)}
                      placeholder="Why is this the right time in your life to start university?"
                    />
                  </div>
                </div>
                <div className="btnrow" style={{ marginTop: "16px" }}>
                  <button className="ys-btn white" onClick={() => handleOpenTab("experience")} type="button">
                    Next: experience
                  </button>
                </div>
              </div>
            )}

            {/* Tab Pane: Experience */}
            {activeTab === "experience" && (
              <div className="phase-pane active" id="pane-experience">
                <div className="form-grid">
                  <div className="field full">
                    <label>Relevant work or life experience</label>
                    <textarea
                      id="psExperience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="Mention jobs, caring responsibilities, volunteering, business experience or challenges that built your skills."
                    />
                  </div>
                  <div className="field full">
                    <label>Skills you can bring to university</label>
                    <textarea
                      id="psSkills"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="Communication, leadership, organisation, problem solving, resilience, teamwork..."
                    />
                  </div>
                  <div className="field full">
                    <label>Achievements or examples</label>
                    <textarea
                      id="psExamples"
                      value={examples}
                      onChange={(e) => setExamples(e.target.value)}
                      placeholder="Give 1-2 examples that prove your strengths."
                    />
                  </div>
                </div>
                <div className="btnrow" style={{ marginTop: "16px" }}>
                  <button className="ys-btn white" onClick={() => handleOpenTab("motivation")} type="button">
                    Next: motivation
                  </button>
                </div>
              </div>
            )}

            {/* Tab Pane: Motivation */}
            {activeTab === "motivation" && (
              <div className="phase-pane active" id="pane-motivation">
                <div className="form-grid">
                  <div className="field full">
                    <label>Challenges overcome</label>
                    <textarea
                      id="psChallenges"
                      value={challenges}
                      onChange={(e) => setChallenges(e.target.value)}
                      placeholder="Optional: mention responsibilities, language barriers, returning to study, work/family balance or confidence."
                    />
                  </div>
                  <div className="field full">
                    <label>Future plans after the course</label>
                    <textarea
                      id="psFuture"
                      value={future}
                      onChange={(e) => setFuture(e.target.value)}
                      placeholder="What do you hope to do after the degree?"
                    />
                  </div>
                  <div className="field full">
                    <label>Why YStudy/adviser support may help</label>
                    <textarea
                      id="psSupport"
                      value={support}
                      onChange={(e) => setSupport(e.target.value)}
                      placeholder="Optional: mention that you are preparing carefully and choosing a realistic route."
                    />
                  </div>
                </div>
                <div className="btnrow" style={{ marginTop: "16px" }}>
                  <button className="ys-btn white" onClick={() => handleOpenTab("finish")} type="button">
                    Next: finish
                  </button>
                </div>
              </div>
            )}

            {/* Tab Pane: Finish */}
            {activeTab === "finish" && (
              <div className="phase-pane active" id="pane-finish">
                <h3>Improve your draft</h3>
                <p className="phase-muted">Use these inserts to strengthen weak areas without making the statement sound fake.</p>
                
                <div className="chip-grid">
                  <button
                    className="insert-chip"
                    onClick={() =>
                      handleInsertPhrase(
                        "I understand that returning to study requires commitment, organisation and consistent effort, and I am prepared to manage my time carefully."
                      )
                    }
                    type="button"
                  >
                    Add maturity sentence
                  </button>
                  <button
                    className="insert-chip"
                    onClick={() =>
                      handleInsertPhrase(
                        "My work experience has helped me develop communication, reliability and problem-solving skills that are relevant to university-level study."
                      )
                    }
                    type="button"
                  >
                    Add transferable skills
                  </button>
                  <button
                    className="insert-chip"
                    onClick={() =>
                      handleInsertPhrase(
                        "I am particularly interested in applying what I learn to real workplace situations and building a stronger long-term career."
                      )
                    }
                    type="button"
                  >
                    Add career link
                  </button>
                </div>

                <div className="divider"></div>
                <div className="btnrow">
                  <button
                    className="ys-btn orange"
                    onClick={() => {
                      if (isLoggedIn) {
                        triggerToast("Statement saved successfully!");
                      } else {
                        handleOpenModal("Save your statement");
                      }
                    }}
                    type="button"
                  >
                    Save statement
                  </button>
                  <button
                    className="ys-btn blue"
                    onClick={() => {
                      if (isLoggedIn) {
                        handleDownloadPdf();
                      } else {
                        handleOpenModal("Download your statement");
                      }
                    }}
                    type="button"
                  >
                    Print / Download PDF
                  </button>
                  <button className="ys-btn white" onClick={handleCopyText} type="button">
                    Copy text
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* PREVIEW SIDEBAR & CHECKLIST PANEL */}
          <aside className="preview-card">
            
            {/* Score band circle */}
            <div className="score-band">
              <div className="score-circle" id="scoreCircle" style={{ "--score": scoreData.score } as React.CSSProperties}>
                <b>
                  <span id="psScore">{scoreData.score}</span>
                </b>
              </div>
              <div>
                <h3 style={{ color: "#fff", margin: 0 }}>Statement Strength</h3>
                <p style={{ margin: "4px 0 10px", color: "#cdd8e8", fontWeight: 800 }}>A guidance score, not an admissions decision.</p>
                <div className="meter">
                  <span id="psMeter" style={{ width: `${scoreData.score}%` }}></span>
                </div>
              </div>
            </div>

            <div className="btnrow no-print" style={{ marginBottom: "14px" }}>
              <button className="ys-btn white" onClick={handleCopyText} type="button">
                Copy
              </button>
              <button className="ys-btn orange" onClick={handlePrepareAdviser} type="button">
                Send to adviser
              </button>
            </div>

            {/* Paper Preview area */}
            <div className="ps-paper print-area" id="psPreview">
              <h2>Personal Statement Draft</h2>
              {statementParagraphs.map((paraText, i) => (
                <p key={i}>{paraText}</p>
              ))}
            </div>

            {/* Checklist */}
            <div className="checklist no-print" id="psChecklist">
              {scoreData.checklist.map((item, idx) => (
                <div key={idx} style={{ display: "flex", gap: "8px", color: item.ok ? "#16a34a" : "#5d6b80" }}>
                  <span>{item.ok ? "✅" : "○"}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

          </aside>
        </div>

        {/* THREE CONVERSION CARDS */}
        {section2Data?.cards && (
          <div className="container conversion-grid" style={{ textAlign: "left" }}>
            <div className="conversion-card">
              <h3>{bottomCards[0]?.title}</h3>
              <p className="phase-muted">{bottomCards[0]?.description}</p>
              <Link className="ys-btn blue" href="/tools/degree-match">
                Open Degree Match
              </Link>
            </div>
            <div className="conversion-card">
              <h3>{bottomCards[1]?.title}</h3>
              <p className="phase-muted">{bottomCards[1]?.description}</p>
              <Link className="ys-btn orange" href="/lead/adviser-call">
                Book review
              </Link>
            </div>
            <div className="conversion-card">
              <h3>{bottomCards[2]?.title}</h3>
              <p className="phase-muted">{bottomCards[2]?.description}</p>
              <Link className="ys-btn blue" href="/tools/cv-builder">
                Open CV Builder
              </Link>
            </div>
          </div>
        )}

      </section>

      {/* ACCOUNT MODAL */}
      <div className={`account-modal ${showModal ? "open" : ""}`} id="accountModal">
        <div className="account-card">
          <span className="phase-eyebrow">
            {isLoggedIn ? `Logged in: ${currentUser?.name || currentUser?.email || "Student"}` : "Free YStudy account"}
          </span>
          <h2 id="modalTitle">{modalTitle}</h2>
          <p>
            {isLoggedIn
              ? "Your account is active. Click below to download your statement as a PDF or continue editing."
              : "Create a free account to save, download, copy or send your statement to an adviser. You can keep editing without an account."}
          </p>
          <div className="btnrow" style={{ marginTop: "20px" }}>
            {isLoggedIn ? (
              <button className="ys-btn orange" onClick={handleDownloadPdf} type="button">
                Download PDF
              </button>
            ) : (
              <Link className="ys-btn orange" href="/login">
                Create free account
              </Link>
            )}
            <button className="ys-btn white" onClick={() => setShowModal(false)} type="button">
              Continue editing
            </button>
          </div>
        </div>
      </div>

      {/* SAVE TOAST */}
      {toastMsg && (
        <div className="save-toast show" id="saveToast">
          {toastMsg}
        </div>
      )}
    </>
  );
}

export default PersonalStatementWidget;
