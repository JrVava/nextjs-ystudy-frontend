"use client";

import React, { useState } from "react";

interface Step {
  stepNumber: number;
  stepperName: string;
  tag: string;
  title: string;
  description: string;
  facts: Array<{ title: string; description: string }>;
}

const defaultSteps: Step[] = [
  {
    stepNumber: 1,
    stepperName: "Status",
    tag: "Stage 1 · Before you apply",
    title: "Confirm your status",
    description: "SFE first checks who you are: your residency, nationality and whether you've studied before. This decides what you can get.",
    facts: [
      { title: "Who qualifies", description: "Usually 3 years' UK residence + settled/eligible status" },
      { title: "Watch-out", description: "Previous study (ELQ) can reduce or block funding" },
      { title: "Do this:", description: "Have your passport/ID, residency history and any previous-study details ready before you start." }
    ]
  },
  {
    stepNumber: 2,
    stepperName: "Course",
    tag: "Stage 2 · Course check",
    title: "Your course must be designated",
    description: "The loan only flows if your course and provider are SFE-designated. Distance-only and some part-time intensities are treated differently.",
    facts: [
      { title: "Eligible", description: "Designated undergraduate courses at registered providers" },
      { title: "Not eligible", description: "Non-designated providers, most distance-only courses" },
      { title: "Do this:", description: "Confirm with the university that your specific course is SFE-designated for your start year." }
    ]
  },
  {
    stepNumber: 3,
    stepperName: "Provider",
    tag: "Stage 3 · Provider link",
    title: "SFE links to your provider",
    description: "Once your course is confirmed, SFE connects your application to the university so they can verify your enrolment later.",
    facts: [
      { title: "What SFE needs", description: "Provider name, course title and start date" },
      { title: "Timing", description: "Set up as soon as you have a firm offer" },
      { title: "Do this:", description: "Enter the exact provider and course as they appear on your offer letter." }
    ]
  },
  {
    stepNumber: 4,
    stepperName: "Apply",
    tag: "Stage 4 · Apply",
    title: "Submit your application",
    description: "You apply online through your regional Student Finance service. The Tuition Fee Loan is paid straight to the university — you never touch it.",
    facts: [
      { title: "When to apply", description: "Open ~6 months before term; apply early" },
      { title: "Paid to", description: "Your university, directly, in instalments" },
      { title: "Do this:", description: "Apply even before you have a confirmed place — you can update details later." }
    ]
  },
  {
    stepNumber: 5,
    stepperName: "Evidence",
    tag: "Stage 5 · Evidence",
    title: "Send your evidence",
    description: "SFE may ask for identity, residency or household-income evidence. Missing documents are the most common cause of delay.",
    facts: [
      { title: "Common asks", description: "Passport, residency proof, household income" },
      { title: "Risk", description: "Slow evidence = delayed first payment" },
      { title: "Do this:", description: "Upload everything SFE requests in one go, and keep copies." }
    ]
  },
  {
    stepNumber: 6,
    stepperName: "Approval",
    tag: "Stage 6 · Approval",
    title: "SFE approves your funding",
    description: "SFE assesses everything and confirms your entitlement. You'll get an entitlement letter showing your Tuition Fee Loan amount.",
    facts: [
      { title: "Outcome", description: "Entitlement letter confirming amounts" },
      { title: "If wrong", description: "You can request a reassessment" },
      { title: "Do this:", description: "Check the entitlement letter carefully and query anything that looks off." }
    ]
  },
  {
    stepNumber: 7,
    stepperName: "Payments",
    tag: "Stage 7 · Payments",
    title: "The loan is paid out",
    description: "After you enrol and the university confirms attendance, SFE releases the tuition payment directly to the provider, in instalments across the year.",
    facts: [
      { title: "Trigger", description: "University confirms your enrolment" },
      { title: "Schedule", description: "Usually three instalments per year" },
      { title: "Do this:", description: "Make sure you fully enrol — payment won't release until the provider confirms." }
    ]
  },
  {
    stepNumber: 8,
    stepperName: "Repay",
    tag: "Stage 8 · Repayment",
    title: "You repay only when earning",
    description: "Repayment is income-based and only starts above the Plan 5 threshold. Anything still owed after the term is written off — it's nothing like a commercial loan.",
    facts: [
      { title: "You repay", description: "9% of income above the threshold" },
      { title: "Write-off", description: "Remaining balance cleared after the set period" },
      { title: "Do this:", description: "You don't repay a penny while earning under the threshold — keep your contact details current with SLC." }
    ]
  }
];

interface FinanceStepperProps {
  steppers?: Step[];
}

export function FinanceStepper({ steppers }: FinanceStepperProps) {
  const stepsList = steppers && steppers.length > 0 ? steppers : defaultSteps;
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const activeStep = stepsList[activeIdx];
  const progressPercent = ((activeIdx + 1) / stepsList.length) * 100;

  // Split facts into normal facts and the "Do this:" action block
  const regularFacts = activeStep.facts.filter(f => f.title !== "Do this:");
  const actionFact = activeStep.facts.find(f => f.title === "Do this:");

  return (
    <div className="proc" id="procTFL" style={{ textAlign: "left" }}>
      {/* Pills rail */}
      <div className="proc-rail" role="tablist" style={{ display: "flex", overflowX: "auto", gap: "8px", paddingBottom: "12px" }}>
        {stepsList.map((step, idx) => {
          const isDone = idx < activeIdx;
          const isActive = idx === activeIdx;
          return (
            <button
              key={idx}
              className={`proc-pill ${isActive ? "is-active" : ""} ${isDone ? "is-done" : ""}`}
              onClick={() => setActiveIdx(idx)}
              role="tab"
              type="button"
            >
              <b>{step.stepNumber || (idx + 1)}</b>
              <span>{step.stepperName}</span>
            </button>
          );
        })}
      </div>

      {/* Progress track */}
      <div className="proc-track" style={{ height: "4px", background: "var(--border)", position: "relative", margin: "16px 0 24px" }}>
        <div
          className="proc-fill"
          style={{
            height: "100%",
            background: "var(--o)",
            width: `${progressPercent}%`,
            transition: "width 0.3s ease"
          }}
        ></div>
      </div>

      {/* Active step panel content */}
      <div className="proc-panel" role="tabpanel" style={{ minHeight: "220px" }}>
        <span className="pp-tag" style={{ display: "inline-block", background: "var(--soft)", padding: "4px 10px", borderRadius: "4px", fontSize: "12px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>
          {activeStep.tag}
        </span>
        <h3 style={{ fontSize: "24px", fontWeight: 900, margin: "12px 0 8px" }}>{activeStep.title}</h3>
        <p className="pp-lead" style={{ fontSize: "16px", color: "var(--muted)", marginBottom: "20px", lineHeight: 1.5 }}>
          {activeStep.description}
        </p>

        <div className="proc-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          {regularFacts.map((fact, idx) => (
            <div className="proc-fact" key={idx} style={{ background: "var(--soft)", padding: "12px 16px", borderRadius: "8px" }}>
              <b style={{ display: "block", fontSize: "13px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.03em" }}>{fact.title}</b>
              <span style={{ fontSize: "15px", fontWeight: 600 }}>{fact.description}</span>
            </div>
          ))}
        </div>

        {actionFact && (
          <div className="proc-do" style={{ borderLeft: "4px solid var(--o)", background: "var(--soft)", padding: "14px 18px", borderRadius: "0 8px 8px 0", fontSize: "14.5px" }}>
            <b style={{ color: "var(--o)", marginRight: "6px" }}>Do this:</b> {actionFact.description}
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="proc-nav" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px", borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
        <button
          className="proc-btn ghost btn"
          onClick={() => setActiveIdx((prev) => prev - 1)}
          disabled={activeIdx === 0}
          style={{ cursor: activeIdx === 0 ? "not-allowed" : "pointer" }}
        >
          ← Previous
        </button>
        <span className="proc-count" style={{ fontSize: "14px", fontWeight: 700, color: "var(--muted)" }}>
          Stage {activeIdx + 1} of {stepsList.length}
        </span>
        <button
          className="proc-btn btn"
          onClick={() => setActiveIdx((prev) => prev + 1)}
          disabled={activeIdx === stepsList.length - 1}
          style={{ cursor: activeIdx === stepsList.length - 1 ? "not-allowed" : "pointer" }}
        >
          Next stage →
        </button>
      </div>
    </div>
  );
}

export default FinanceStepper;
