"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

export interface FinanceCalculatorWidgetProps {
  sectionData?: {
    status?: boolean;
    title?: string;
    description?: string;
  };
}

export function FinanceCalculatorWidget({ sectionData }: FinanceCalculatorWidgetProps) {
  if (sectionData?.status === false) {
    return null;
  }

  const [status, setStatus] = useState("british");
  const [living, setLiving] = useState("away");
  const [mode, setMode] = useState("full");
  const [income, setIncome] = useState<number>(25000);
  const [previous, setPrevious] = useState("no");
  const [age, setAge] = useState<number>(32);

  const calculations = useMemo(() => {
    let maint = living === "london" ? 13762 : living === "away" ? 10842 : 8610;

    if (income > 25000) {
      maint -= Math.min(maint * 0.42, (income - 25000) * 0.28);
    }

    if (mode === "part") maint *= 0.55;
    if (mode === "distance") maint = 0;
    if (mode === "weekend") maint *= 0.9;
    maint = Math.max(0, maint);

    const tuition = mode === "part" ? 7145 : 9535;
    const total = maint + tuition;

    let confidence = "Likely";
    const reasons: string[] = [];

    const statusMap: Record<string, string> = {
      british: "British citizen route",
      ilr: "ILR route",
      settled: "EU settled status route",
      presettled: "EU pre-settled status route requires review",
      refugee: "Refugee / protection route",
      other: "Status needs adviser review",
    };

    reasons.push(`Status: ${statusMap[status] || "Standard"}`);
    reasons.push(`Living: ${living === "london" ? "Away in London" : living === "away" ? "Away outside London" : "With parents"}`);
    reasons.push(`Study mode: ${mode === "full" ? "Full-time" : mode === "part" ? "Part-time" : mode}`);
    reasons.push(`Household income: £${income.toLocaleString()}`);

    if (status === "presettled" || status === "other") {
      confidence = "Check";
      reasons.push("Status requires additional document check.");
    }
    if (previous !== "no") {
      confidence = "Check";
      reasons.push("Previous UK higher education study may affect funding entitlement.");
    }
    if (age >= 60) {
      confidence = "Check";
      reasons.push("Age rule (60+) may restrict maintenance loan.");
    }

    return {
      maintFormatted: `£${Math.round(maint).toLocaleString()}`,
      tuitionFormatted: `£${Math.round(tuition).toLocaleString()}`,
      totalFormatted: `£${Math.round(total).toLocaleString()}`,
      confidence,
      reasons,
    };
  }, [status, living, mode, income, previous, age]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && (window as any).ystudySaveCurrentTool) {
        (window as any).ystudySaveCurrentTool();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [status, living, mode, income, previous, age]);

  return (
    <section className="thub-sec" id="calculator">
      <div className="thub" style={{ textAlign: "left" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "28px" }}>
          {/* Form panel */}
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: "24px",
              padding: "28px",
              boxShadow: "0 14px 40px rgba(15,23,42,.07)",
            }}
          >
            <span style={{ color: "var(--o-deep)", fontWeight: 800, fontSize: "12px", textTransform: "uppercase" }}>Funding Profile</span>
            <h2 style={{ fontFamily: "var(--df)", fontWeight: 900, fontSize: "28px", margin: "8px 0 20px" }}>
              {sectionData?.title || "Estimate student finance support"}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="field">
                <label>Residency / immigration status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="british">British citizen</option>
                  <option value="ilr">ILR / indefinite leave to remain</option>
                  <option value="settled">EU settled status</option>
                  <option value="presettled">EU pre-settled status</option>
                  <option value="refugee">Refugee / humanitarian protection</option>
                  <option value="other">Other / not sure</option>
                </select>
              </div>

              <div className="field">
                <label>Living situation</label>
                <select value={living} onChange={(e) => setLiving(e.target.value)}>
                  <option value="london">Living away from home in London</option>
                  <option value="away">Living away from home outside London</option>
                  <option value="home">Living with parents</option>
                </select>
              </div>

              <div className="field">
                <label>Study mode</label>
                <select value={mode} onChange={(e) => setMode(e.target.value)}>
                  <option value="full">Full-time campus/blended</option>
                  <option value="part">Part-time</option>
                  <option value="weekend">Weekend / compact timetable</option>
                  <option value="distance">Distance learning</option>
                </select>
              </div>

              <div className="field">
                <label>Household income estimate (£/year)</label>
                <input type="number" step="500" value={income} onChange={(e) => setIncome(Number(e.target.value))} placeholder="25000" />
              </div>

              <div className="field">
                <label>Previous university study?</label>
                <select value={previous} onChange={(e) => setPrevious(e.target.value)}>
                  <option value="no">No previous UK degree</option>
                  <option value="some">Some previous study</option>
                  <option value="degree">Already have a degree</option>
                </select>
              </div>

              <div className="field">
                <label>Age at course start</label>
                <input type="number" min="16" max="75" value={age} onChange={(e) => setAge(Number(e.target.value))} placeholder="32" />
              </div>
            </div>
          </div>

          {/* Results sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                background: "var(--b-navy)",
                color: "#fff",
                borderRadius: "24px",
                padding: "28px",
                boxShadow: "0 14px 40px rgba(15,23,42,.12)",
              }}
            >
              <span style={{ color: "#9cc0ff", fontSize: "12px", fontWeight: 800, textTransform: "uppercase" }}>
                Estimated Total Annual Support
              </span>
              <div id="totalSupport" style={{ fontFamily: "var(--df)", fontWeight: 900, fontSize: "42px", color: "#fff", margin: "8px 0" }}>
                {calculations.totalFormatted}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "16px" }}>
                <div style={{ background: "rgba(255,255,255,.12)", borderRadius: "12px", padding: "12px" }}>
                  <strong id="maintOut" style={{ display: "block", fontSize: "18px", color: "#fff" }}>{calculations.maintFormatted}</strong>
                  <span style={{ fontSize: "12px", color: "#aebed6" }}>Maintenance Loan</span>
                </div>
                <div style={{ background: "rgba(255,255,255,.12)", borderRadius: "12px", padding: "12px" }}>
                  <strong style={{ display: "block", fontSize: "18px", color: "#fff" }}>{calculations.tuitionFormatted}</strong>
                  <span style={{ fontSize: "12px", color: "#aebed6" }}>Tuition Fee Loan</span>
                </div>
              </div>
            </div>

            <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "20px", padding: "20px" }}>
              <h3 style={{ fontFamily: "var(--df)", fontWeight: 900, fontSize: "18px", margin: "0 0 12px", color: "var(--ink)" }}>
                Why you got this result
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {calculations.reasons.map((r, i) => (
                  <div key={i} style={{ fontSize: "13.5px", color: "var(--muted)", fontWeight: 600 }}>
                    ✓ {r}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinanceCalculatorWidget;
