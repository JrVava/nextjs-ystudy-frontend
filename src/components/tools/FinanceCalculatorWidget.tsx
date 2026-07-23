"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import "./tools.css";

export interface FinanceCalculatorWidgetProps {
  sectionData?: {
    status?: boolean;
    badge?: string;
    title?: string;
    description?: string;
    card?: {
      title?: string;
      description?: string;
    };
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

    const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

    const sMap: Record<string, string> = {
      british: "British citizen route",
      ilr: "ILR route",
      settled: "EU settled status route",
      presettled: "EU pre-settled route requires careful review",
      refugee: "Refugee / protection route",
      other: "Status needs adviser review",
    };

    const livingMap: Record<string, string> = {
      london: "Living away from home in London",
      away: "Living away from home outside London",
      home: "Living with parents",
    };

    const modeMap: Record<string, string> = {
      full: "Full-time campus/blended",
      part: "Part-time",
      weekend: "Weekend / compact timetable",
      distance: "Distance learning",
    };

    const reasons: string[] = [];
    reasons.push("Status: " + (sMap[status] || "Standard"));
    reasons.push("Location/living: " + (livingMap[living] || ""));
    reasons.push("Study mode: " + (modeMap[mode] || ""));
    reasons.push("Income estimate: " + gbp(income));

    let confidence = "Likely";

    if (status === "presettled" || status === "other") {
      confidence = "Check";
    }
    if (mode === "weekend" || mode === "distance") {
      confidence = "Check";
      reasons.push("Study mode may need extra checks.");
    }
    if (previous !== "no") {
      confidence = "Check";
      reasons.push("Previous study can affect support.");
    }
    if (age >= 60) {
      confidence = "Check";
      reasons.push("Age can affect maintenance support.");
    }

    return {
      maintFormatted: gbp(maint),
      tuitionFormatted: gbp(tuition),
      totalFormatted: gbp(total),
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
    <section className="tool-wrap-v600" id="calculator">
      <div className="container tool-grid-v600">
        <div className="tool-card-v600">
          <span className="kicker">{sectionData?.badge || "Funding profile"}</span>
          <h2>{sectionData?.title || "Estimate student finance support"}</h2>
          <div className="tool-form">
            <div className="field">
              <label htmlFor="status">Residence / immigration status</label>
              <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="british">British citizen</option>
                <option value="ilr">ILR / indefinite leave</option>
                <option value="settled">EU settled status</option>
                <option value="presettled">EU pre-settled status</option>
                <option value="refugee">Refugee / humanitarian protection</option>
                <option value="other">Other / not sure</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="living">Living situation</label>
              <select id="living" value={living} onChange={(e) => setLiving(e.target.value)}>
                <option value="london">Living away from home in London</option>
                <option value="away">Living away from home outside London</option>
                <option value="home">Living with parents</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="mode">Study mode</label>
              <select id="mode" value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="full">Full-time campus/blended</option>
                <option value="part">Part-time</option>
                <option value="weekend">Weekend / compact timetable</option>
                <option value="distance">Distance learning</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="income">Household income estimate</label>
              <input
                id="income"
                type="number"
                min="0"
                step="500"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
              />
            </div>
            <div className="field">
              <label htmlFor="previous">Previous university study?</label>
              <select id="previous" value={previous} onChange={(e) => setPrevious(e.target.value)}>
                <option value="no">No previous UK degree</option>
                <option value="some">Some previous study</option>
                <option value="degree">Already have a degree</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="age">Age at course start</label>
              <input
                id="age"
                type="number"
                min="16"
                max="75"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
            </div>
          </div>
          <button className="tool-action" id="calcFinance" type="button">
            Show funding snapshot
          </button>
          <p className="tool-note">
            Guidance only. Student Finance England makes the final decision and rates can change by academic year.
          </p>
          <div className="result-v600">
            <span className="label">Estimated annual support</span>
            <strong className="big" id="totalSupport">
              {calculations.totalFormatted}
            </strong>
          </div>
          <div className="result-cards">
            <div className="result-card-mini">
              <strong id="maintOut">{calculations.maintFormatted}</strong>
              <span>Maintenance Loan example</span>
            </div>
            <div className="result-card-mini">
              <strong id="tuitionOut">{calculations.tuitionFormatted}</strong>
              <span>Tuition Fee Loan max</span>
            </div>
            <div className="result-card-mini">
              <strong id="confidenceOut">{calculations.confidence}</strong>
              <span>Eligibility confidence</span>
            </div>
          </div>
        </div>

        <div className="side-stack">
          <div className="dark-advice">
            <h3>{sectionData?.card?.title || "Important"}</h3>
            <p>
              {sectionData?.card?.description ||
                "Pre-settled status, weekend-only attendance, distance learning, previous study and age can change the outcome. Do not rely on a calculator only."}
            </p>
            <Link className="btn btn-orange" href="/tools/eligibility-checker">
              Get funding risk check
            </Link>
          </div>
          <div className="tool-card-v600">
            <h3>Why you got this result</h3>
            <div className="doc-list" id="whyList">
              {calculations.reasons.map((r, i) => (
                <div className="doc-item" key={i}>
                  ✓ <span>{r}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="tool-card-v600">
            <h3>Next steps</h3>
            <div className="timeline-v600">
              <div className="time-row">
                <div className="time-num">1</div>
                <div>
                  <b>Check eligibility</b>
                  <p>Confirm status, study mode and previous study.</p>
                </div>
              </div>
              <div className="time-row">
                <div className="time-num">2</div>
                <div>
                  <b>Choose course</b>
                  <p>Match funding to a realistic degree route.</p>
                </div>
              </div>
              <div className="time-row">
                <div className="time-num">3</div>
                <div>
                  <b>Apply to SFE</b>
                  <p>Prepare evidence before submitting forms.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinanceCalculatorWidget;
