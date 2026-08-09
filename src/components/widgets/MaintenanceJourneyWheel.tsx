"use client";

import React, { useState, useEffect } from "react";

interface WheelStep {
  title: string;
  text: string;
  label: string;
  color: string;
}

const STEPS: WheelStep[] = [
  { label: "Residency", title: "Confirm your residency status", text: "Check immigration status, home address and 3-year residence before anything else.", color: "#1263ff" },
  { label: "Course", title: "Check the course qualifies", text: "Full-time, designated provider and the right study intensity for maintenance support.", color: "#42c5bd" },
  { label: "Estimate", title: "Estimate your amount", text: "Use living situation and household income to estimate your maintenance loan.", color: "#37d486" },
  { label: "Evidence", title: "Gather your evidence", text: "Identity, residency and household income documents ready before you apply.", color: "#ff7a1a" },
  { label: "Apply", title: "Apply to Student Finance", text: "Submit your SFE application early — Tuition Fee Loan and Maintenance Loan together.", color: "#b13ab8" },
  { label: "Assessed", title: "Household income assessment", text: "SFE assesses household income on a sliding scale to set your final amount.", color: "#07549d" },
  { label: "Approved", title: "Approval & entitlement letter", text: "You receive confirmation of your maintenance loan amount for the year.", color: "#ef476f" },
  { label: "Paid", title: "Paid into your bank", text: "Three instalments across the year — usually September, January and April.", color: "#f6c845" }
];

interface MaintenanceJourneyWheelProps {
  steps?: Array<{ title: string; description: string }>;
}

export function MaintenanceJourneyWheel({ steps }: MaintenanceJourneyWheelProps) {
  const DEFAULT_LABELS = ["Residency", "Course", "Estimate", "Evidence", "Apply", "Assessed", "Approved", "Paid"];
  const DEFAULT_COLORS = ["#1263ff", "#42c5bd", "#37d486", "#ff7a1a", "#b13ab8", "#07549d", "#ef476f", "#f6c845"];

  const stepsList = steps && steps.length > 0
    ? steps.map((s, idx) => ({
        title: s.title,
        text: s.description,
        label: DEFAULT_LABELS[idx] || `Step ${idx + 1}`,
        color: DEFAULT_COLORS[idx] || "#ff7a1a"
      }))
    : STEPS;

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % stepsList.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [isPlaying, stepsList.length]);

  const activeStep = stepsList[activeIdx];

  const handleStepHover = (index: number) => {
    setActiveIdx(index);
    setIsPlaying(false);
  };

  const handleStepClick = (index: number) => {
    setActiveIdx(index);
    setIsPlaying(false);
  };

  return (
    <div className="fb navy" style={{ background: "linear-gradient(135deg,#061126,#071e3d)", padding: "3rem 1.5rem", borderRadius: "24px", color: "#fff", textAlign: "left" }}>
      <div className="fb-inner" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="fb-wheel-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "40px", alignItems: "center" }}>
          {/* Copy section */}
          <div className="fb-wheel-copy">
            <span className="eyebrow" style={{ color: "#ff7a1a", fontWeight: 950, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: "13px" }}>
              SFE journey
            </span>
            <h2 style={{ color: "#fff", marginTop: "14px", fontSize: "32px", fontWeight: 900, letterSpacing: "-0.03em" }}>
              From eligibility to money in your bank.
            </h2>
            <p style={{ color: "#cdd9ee", fontSize: "16px", lineHeight: 1.5, margin: "12px 0 24px" }}>
              Student Finance as one guided path — not a wall of forms. Hover any step to see what happens and what we help you with.
            </p>

            {/* Active Step Details */}
            {activeStep && (
              <div className="wheel-detail" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "16px", padding: "20px", marginBottom: "28px" }}>
                <div className="detail-num" style={{ fontSize: "12px", fontWeight: 950, textTransform: "uppercase", letterSpacing: "0.06em", color: "#ff7a1a", marginBottom: "4px" }}>
                  Step {activeIdx + 1}
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 8px", color: "#fff" }}>
                  {activeStep.title}
                </h3>
                <p style={{ fontSize: "14.5px", color: "#c4d4ee", lineHeight: 1.5, margin: 0 }}>
                  {activeStep.text}
                </p>
              </div>
            )}

            <div className="btnrow" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a className="btn btn-orange" href="#calculator">
                Estimate my maintenance →
              </a>
              <a className="btn btn-white" href="/lead/adviser-call">
                Talk to adviser
              </a>
            </div>
          </div>

          {/* Wheel visual */}
          <div className="wheel-stage" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div
              className="wheel"
              style={{
                width: "min(460px,82vw)",
                height: "min(460px,82vw)",
                position: "relative",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.02)",
                border: "2px dashed rgba(255,255,255,0.12)"
              }}
              onMouseEnter={() => setIsPlaying(false)}
              onMouseLeave={() => setIsPlaying(true)}
            >
              {stepsList.map((step, idx) => {
                const isActive = idx === activeIdx;
                const isAlternativeTextCol = step.color === "#ff7a1a" || step.color === "#f6c845";

                return (
                  <button
                    key={idx}
                    className={`step ${isActive ? "active" : ""}`}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      width: "100px",
                      height: "100px",
                      margin: "-50px",
                      padding: "12px",
                      borderRadius: "50%",
                      border: isActive ? "4px solid #fff" : "2px solid rgba(255,255,255,0.3)",
                      background: isActive ? step.color : "rgba(10,30,60,0.85)",
                      color: isActive && isAlternativeTextCol ? "#071126" : "#fff",
                      boxShadow: isActive ? "0 18px 40px rgba(0,0,0,0.35)" : "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      cursor: "pointer",
                      transform: `rotate(${idx * 45}deg) translate(170px) rotate(-${idx * 45}deg)`,
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={() => handleStepHover(idx)}
                    onClick={() => handleStepClick(idx)}
                    type="button"
                  >
                    <small style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", opacity: 0.85 }}>Step {idx + 1}</small>
                    <span style={{ fontSize: "13px", fontWeight: 900, marginTop: "2px" }}>{step.label}</span>
                  </button>
                );
              })}
              <div className="center" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "160px", height: "160px", borderRadius: "50%", background: "#fff", color: "#071126", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", boxShadow: "0 20px 50px rgba(0,0,0,0.35)", padding: "18px" }}>
                <div className="eyebrow" style={{ fontSize: "12px", color: "#f08000", fontWeight: 950, letterSpacing: "0.08em", marginBottom: "4px" }}>YStudy</div>
                <strong style={{ fontSize: "18px", lineHeight: 1.1, fontWeight: 900 }}>Your Finance Journey</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaintenanceJourneyWheel;
