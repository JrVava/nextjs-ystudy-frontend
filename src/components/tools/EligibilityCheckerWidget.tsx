"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Option {
  emoji: string;
  title: string;
  desc: string;
}

const statusOptions: Option[] = [
  { emoji: "🇬🇧", title: "British citizen", desc: "Born in the UK or naturalised" },
  { emoji: "✅", title: "EU Settled Status", desc: "Granted under the EU Settlement Scheme" },
  { emoji: "⏱️", title: "EU Pre-settled Status", desc: "Needs a careful funding review" },
  { emoji: "📋", title: "Indefinite Leave to Remain", desc: "Often eligible if residency rules are met" },
  { emoji: "🛟", title: "Refugee / protection route", desc: "Specific support route" },
  { emoji: "❓", title: "Something else / not sure", desc: "We'll help you figure it out" },
];

const previousOptions: Option[] = [
  { emoji: "🌱", title: "No previous higher education", desc: "Usually the simplest route" },
  { emoji: "↩️", title: "Started but did not finish", desc: "May need adviser review" },
  { emoji: "⭐", title: "HND, DipHE or equivalent", desc: "Top-up or previous study rules may apply" },
  { emoji: "🏆", title: "Bachelor's degree or higher", desc: "Funding may be limited for another undergraduate degree" },
  { emoji: "🤔", title: "Not sure", desc: "Adviser check recommended" },
];

const modeOptions: Option[] = [
  { emoji: "🏛️", title: "Full-time campus/blended", desc: "Most common undergraduate route" },
  { emoji: "⏰", title: "Part-time", desc: "Good for working adults" },
  { emoji: "💻", title: "Online / distance learning", desc: "Funding can differ — check carefully" },
  { emoji: "🤔", title: "Not sure yet", desc: "We'll show you the safest options" },
];

const incomeOptions: Option[] = [
  { emoji: "💷", title: "Under £25,000", desc: "Higher maintenance support likely" },
  { emoji: "💷", title: "£25,000–£45,000", desc: "Above-average maintenance support" },
  { emoji: "💷", title: "£45,000–£65,000", desc: "Reduced maintenance support" },
  { emoji: "💷", title: "Over £65,000", desc: "Minimum maintenance may apply" },
  { emoji: "🤐", title: "Prefer not to say", desc: "We'll show a broad range" },
];

export interface EligibilityCheckerWidgetProps {
  sectionData?: {
    status?: boolean;
    title?: string;
    description?: string;
  };
}

export function EligibilityCheckerWidget({ sectionData }: EligibilityCheckerWidgetProps) {
  if (sectionData?.status === false) {
    return null;
  }

  const [step, setStep] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [previous, setPrevious] = useState<string>("");
  const [mode, setMode] = useState<string>("");
  const [income, setIncome] = useState<string>("");

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleSelectOption = (category: string, value: string) => {
    if (category === "status") setStatus(value);
    if (category === "previous") setPrevious(value);
    if (category === "mode") setMode(value);
    if (category === "income") setIncome(value);

    if (step < 4) {
      setTimeout(() => setStep((prev) => prev + 1), 200);
    }
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
    setTimeout(() => {
      if (typeof window !== "undefined" && (window as any).ystudySaveCurrentTool) {
        (window as any).ystudySaveCurrentTool();
      }
    }, 120);
  };

  const isAdviserCheckNeeded =
    status === "EU Pre-settled Status" ||
    status === "Something else / not sure" ||
    previous === "Bachelor's degree or higher" ||
    previous === "Started but did not finish" ||
    mode === "Online / distance learning";

  return (
    <section className="thub-sec" id="checker">
      <div className="thub" style={{ textAlign: "left" }}>
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--line)",
            borderRadius: "24px",
            padding: "32px",
            boxShadow: "0 14px 40px rgba(15,23,42,.08)",
            maxWidth: "840px",
            margin: "0 auto",
          }}
        >
          {/* Progress bar */}
          <div style={{ height: "6px", background: "var(--line)", borderRadius: "999px", marginBottom: "28px", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${((step + 1) / 5) * 100}%`,
                background: "var(--b)",
                transition: "width .3s",
              }}
            />
          </div>

          {!showResult ? (
            <>
              {step === 0 && (
                <div>
                  <span style={{ color: "var(--o-deep)", fontWeight: 800, fontSize: "12px", textTransform: "uppercase" }}>Question 1 of 5</span>
                  <h2 style={{ fontFamily: "var(--df)", fontWeight: 900, fontSize: "28px", margin: "8px 0" }}>What's your residency status?</h2>
                  <p style={{ color: "var(--muted)", fontWeight: 600, marginBottom: "20px" }}>This helps us understand the likely funding route.</p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
                    {statusOptions.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectOption("status", opt.title)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "14px",
                          borderRadius: "14px",
                          border: `1.5px solid ${status === opt.title ? "var(--b)" : "var(--line)"}`,
                          background: status === opt.title ? "var(--soft)" : "#fff",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <span style={{ fontSize: "22px" }}>{opt.emoji}</span>
                        <div>
                          <b style={{ display: "block", color: "var(--ink)", fontSize: "14px" }}>{opt.title}</b>
                          <small style={{ color: "var(--muted)", fontSize: "12px" }}>{opt.desc}</small>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <span style={{ color: "var(--o-deep)", fontWeight: 800, fontSize: "12px", textTransform: "uppercase" }}>Question 2 of 5</span>
                  <h2 style={{ fontFamily: "var(--df)", fontWeight: 900, fontSize: "28px", margin: "8px 0" }}>Have you studied before?</h2>
                  <p style={{ color: "var(--muted)", fontWeight: 600, marginBottom: "20px" }}>Previous higher education can affect funding.</p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
                    {previousOptions.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectOption("previous", opt.title)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "14px",
                          borderRadius: "14px",
                          border: `1.5px solid ${previous === opt.title ? "var(--b)" : "var(--line)"}`,
                          background: previous === opt.title ? "var(--soft)" : "#fff",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <span style={{ fontSize: "22px" }}>{opt.emoji}</span>
                        <div>
                          <b style={{ display: "block", color: "var(--ink)", fontSize: "14px" }}>{opt.title}</b>
                          <small style={{ color: "var(--muted)", fontSize: "12px" }}>{opt.desc}</small>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <span style={{ color: "var(--o-deep)", fontWeight: 800, fontSize: "12px", textTransform: "uppercase" }}>Question 3 of 5</span>
                  <h2 style={{ fontFamily: "var(--df)", fontWeight: 900, fontSize: "28px", margin: "8px 0" }}>How would you like to study?</h2>
                  <p style={{ color: "var(--muted)", fontWeight: 600, marginBottom: "20px" }}>Study mode can affect funding and course choice.</p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
                    {modeOptions.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectOption("mode", opt.title)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "14px",
                          borderRadius: "14px",
                          border: `1.5px solid ${mode === opt.title ? "var(--b)" : "var(--line)"}`,
                          background: mode === opt.title ? "var(--soft)" : "#fff",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <span style={{ fontSize: "22px" }}>{opt.emoji}</span>
                        <div>
                          <b style={{ display: "block", color: "var(--ink)", fontSize: "14px" }}>{opt.title}</b>
                          <small style={{ color: "var(--muted)", fontSize: "12px" }}>{opt.desc}</small>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <span style={{ color: "var(--o-deep)", fontWeight: 800, fontSize: "12px", textTransform: "uppercase" }}>Question 4 of 5</span>
                  <h2 style={{ fontFamily: "var(--df)", fontWeight: 900, fontSize: "28px", margin: "8px 0" }}>Household income estimate?</h2>
                  <p style={{ color: "var(--muted)", fontWeight: 600, marginBottom: "20px" }}>Used only to estimate maintenance support.</p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
                    {incomeOptions.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectOption("income", opt.title)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "14px",
                          borderRadius: "14px",
                          border: `1.5px solid ${income === opt.title ? "var(--b)" : "var(--line)"}`,
                          background: income === opt.title ? "var(--soft)" : "#fff",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <span style={{ fontSize: "22px" }}>{opt.emoji}</span>
                        <div>
                          <b style={{ display: "block", color: "var(--ink)", fontSize: "14px" }}>{opt.title}</b>
                          <small style={{ color: "var(--muted)", fontSize: "12px" }}>{opt.desc}</small>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <form onSubmit={handleFinish}>
                  <span style={{ color: "var(--o-deep)", fontWeight: 800, fontSize: "12px", textTransform: "uppercase" }}>Final Step</span>
                  <h2 style={{ fontFamily: "var(--df)", fontWeight: 900, fontSize: "28px", margin: "8px 0" }}>Where should we send your report?</h2>
                  <p style={{ color: "var(--muted)", fontWeight: 600, marginBottom: "20px" }}>
                    Your funding snapshot is ready. Enter your details to see it and save it.
                  </p>

                  <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div className="field">
                      <label>First name</label>
                      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required placeholder="e.g. Sarah" />
                    </div>
                    <div className="field">
                      <label>Email</label>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="you@example.com" />
                    </div>
                    <div className="field full" style={{ gridColumn: "1/-1" }}>
                      <label>Phone / WhatsApp</label>
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07XXX XXX XXX" />
                    </div>
                  </div>

                  <div style={{ marginTop: "20px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <button type="button" className="ys-btn white" onClick={() => setStep(3)}>
                      ‹ Back
                    </button>
                    <button type="submit" className="ys-btn blue">
                      See my result →
                    </button>
                  </div>
                </form>
              )}

              {step < 4 && (
                <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
                  {step > 0 && (
                    <button type="button" className="ys-btn white" onClick={() => setStep((prev) => prev - 1)}>
                      ‹ Back
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            /* RESULT DISPLAY CARD */
            <div>
              <span className="kicker" style={{ color: "var(--o-deep)", fontWeight: 800, textTransform: "uppercase", fontSize: "12px" }}>
                Your Funding Snapshot
              </span>
              <h2 id="eligResultTitle" style={{ fontFamily: "var(--df)", fontWeight: 900, fontSize: "32px", margin: "8px 0" }}>
                {isAdviserCheckNeeded ? "Funding route needs adviser review" : "Likely standard funding route"}
              </h2>
              <p id="eligResultText" style={{ color: "var(--muted)", fontWeight: 600, fontSize: "16px" }}>
                Based on status: <strong>{status || "Selected"}</strong>, mode: <strong>{mode || "Full-time"}</strong>, and previous study:{" "}
                <strong>{previous || "None"}</strong>.
              </p>

              <div
                style={{
                  background: "var(--soft)",
                  border: "1px solid var(--line)",
                  borderRadius: "18px",
                  padding: "24px",
                  margin: "24px 0",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", textAlign: "center" }}>
                  <div style={{ background: "#fff", padding: "16px", borderRadius: "14px", border: "1px solid var(--line)" }}>
                    <strong style={{ display: "block", fontSize: "24px", fontFamily: "var(--df)", color: "var(--ink)" }}>£9,790</strong>
                    <span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 700 }}>Tuition Fee Loan</span>
                  </div>
                  <div style={{ background: "#fff", padding: "16px", borderRadius: "14px", border: "1px solid var(--line)" }}>
                    <strong style={{ display: "block", fontSize: "24px", fontFamily: "var(--df)", color: "var(--ink)" }}>Up to £14k</strong>
                    <span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 700 }}>Maintenance Loan</span>
                  </div>
                  <div style={{ background: "#fff", padding: "16px", borderRadius: "14px", border: "1px solid var(--line)" }}>
                    <strong style={{ display: "block", fontSize: "24px", fontFamily: "var(--df)", color: isAdviserCheckNeeded ? "#e05000" : "#16a34a" }}>
                      {isAdviserCheckNeeded ? "Check" : "High"}
                    </strong>
                    <span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 700 }}>Confidence</span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link className="ys-btn orange" href="/apply">
                  Apply with YStudy
                </Link>
                <Link className="ys-btn white" href="/lead/adviser-call">
                  Book Adviser Call
                </Link>
                <button type="button" className="ys-btn blue" onClick={() => setShowResult(false)}>
                  Start over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default EligibilityCheckerWidget;
