"use client";

import React, { useState } from "react";

interface CalcState {
  living: "away" | "london" | "home";
  level: "ug" | "foundation" | "pg";
  mode: "ft" | "weekend" | "online";
  deps: "no" | "yes";
  income: number;
}

const MAINT_MAX = { away: 10830, london: 14135, home: 9118 };
const MAINT_MIN = { away: 5048, london: 7039, home: 4013 };
const TUITION = 9790;
const PG_LOAN = 12858;

export function MaintenanceCalculator() {
  const [state, setState] = useState<CalcState>({
    living: "away",
    level: "ug",
    mode: "ft",
    deps: "no",
    income: 25000
  });

  const fmt = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

  const maintByIncome = (max: number, min: number, income: number) => {
    if (income <= 25000) return max;
    if (income >= 62410) return min;
    const t = (income - 25000) / (62410 - 25000);
    return max - (max - min) * t;
  };

  const compute = () => {
    const r = { tuition: 0, maint: 0, grant: 0, total: 0, sub: "", flag: "", pg: false };

    if (state.level === "pg") {
      r.tuition = 0;
      r.maint = 0;
      r.grant = 0;
      r.total = PG_LOAN;
      r.sub = "Postgraduate Master's Loan (combined)";
      r.flag = "Postgraduate funding is one combined loan of up to £12,858 — you allocate it yourself. Distance and part-time study are eligible.";
      r.pg = true;
      return r;
    }

    r.tuition = TUITION;

    let maintEligible = true;
    if (state.mode === "weekend") {
      maintEligible = false;
      r.flag = "Weekend-only cohorts are usually classed as part-time intensity — maintenance loan typically not available.";
    }
    if (state.mode === "online") {
      maintEligible = false;
      r.flag = "Distance / online undergraduate courses are not maintenance-eligible, except strict Disabled Students' Allowance cases.";
    }

    if (maintEligible) {
      const max = MAINT_MAX[state.living];
      const min = MAINT_MIN[state.living];
      r.maint = maintByIncome(max, min, state.income);
    } else {
      r.maint = 0;
    }

    if (state.deps === "yes" && maintEligible) {
      r.grant = 2925; // indicative Parents' Learning Allowance / Childcare Grant placeholder
    }

    r.total = r.tuition + r.maint + r.grant;
    r.sub = maintEligible ? "Tuition Fee Loan + Maintenance Loan" : "Tuition Fee Loan only (maintenance not available)";
    return r;
  };

  const result = compute();

  const handleLivingChange = (living: "away" | "london" | "home") => {
    setState((prev) => ({ ...prev, living }));
  };

  const handleLevelChange = (level: "ug" | "foundation" | "pg") => {
    setState((prev) => ({ ...prev, level }));
  };

  const handleModeChange = (mode: "ft" | "weekend" | "online") => {
    setState((prev) => ({ ...prev, mode }));
  };

  const handleDepsChange = (deps: "no" | "yes") => {
    setState((prev) => ({ ...prev, deps }));
  };

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, income: parseInt(e.target.value, 10) }));
  };

  return (
    <div className="calc2" style={{ textAlign: "left" }}>
      <div className="calc2-form">
        {/* Where will you live while studying */}
        <div className="calc2-row">
          <label>Where will you live while studying?</label>
          <div className="calc2-seg">
            <button
              className={state.living === "away" ? "on" : ""}
              onClick={() => handleLivingChange("away")}
              type="button"
            >
              Away from home
            </button>
            <button
              className={state.living === "london" ? "on" : ""}
              onClick={() => handleLivingChange("london")}
              type="button"
            >
              Away — in London
            </button>
            <button
              className={state.living === "home" ? "on" : ""}
              onClick={() => handleLivingChange("home")}
              type="button"
            >
              At home
            </button>
          </div>
        </div>

        {/* Course Level */}
        <div className="calc2-row">
          <label>Course level</label>
          <div className="calc2-seg">
            <button
              className={state.level === "ug" ? "on" : ""}
              onClick={() => handleLevelChange("ug")}
              type="button"
            >
              Undergraduate
            </button>
            <button
              className={state.level === "foundation" ? "on" : ""}
              onClick={() => handleLevelChange("foundation")}
              type="button"
            >
              With Foundation Year
            </button>
            <button
              className={state.level === "pg" ? "on" : ""}
              onClick={() => handleLevelChange("pg")}
              type="button"
            >
              Postgraduate Master's
            </button>
          </div>
        </div>

        {/* Study Mode */}
        <div className="calc2-row">
          <label>Study mode</label>
          <div className="calc2-seg">
            <button
              className={state.mode === "ft" ? "on" : ""}
              onClick={() => handleModeChange("ft")}
              type="button"
            >
              Full-time
            </button>
            <button
              className={state.mode === "weekend" ? "on" : ""}
              onClick={() => handleModeChange("weekend")}
              type="button"
            >
              Weekend-only
            </button>
            <button
              className={state.mode === "online" ? "on" : ""}
              onClick={() => handleModeChange("online")}
              type="button"
            >
              Online / distance
            </button>
          </div>
        </div>

        {/* Household Income Slider */}
        <div className="calc2-row">
          <label>Household income</label>
          <div className="calc2-slider" style={{ marginTop: "8px" }}>
            <input
              id="incomeRange"
              max="70000"
              min="15000"
              step="1000"
              type="range"
              value={state.income}
              onChange={handleIncomeChange}
              style={{ width: "100%", cursor: "pointer" }}
            />
            <div className="val" style={{ fontSize: "20px", fontWeight: 800, margin: "8px 0" }}>
              {fmt(state.income)}
              {state.income >= 70000 ? "+" : ""}
            </div>
            <div className="hint" style={{ fontSize: "13px", color: "var(--muted)" }}>
              Lower household income usually means more maintenance support.
            </div>
          </div>
        </div>

        {/* Do you have dependants */}
        <div className="calc2-row">
          <label>Do you have dependants?</label>
          <div className="calc2-seg">
            <button
              className={state.deps === "no" ? "on" : ""}
              onClick={() => handleDepsChange("no")}
              type="button"
            >
              No
            </button>
            <button
              className={state.deps === "yes" ? "on" : ""}
              onClick={() => handleDepsChange("yes")}
              type="button"
            >
              Yes — children or adult dependant
            </button>
          </div>
        </div>
      </div>

      {/* Results panel */}
      <div className="calc2-result" id="calcResult" >
        <div className="rlabel">
          Total possible support / year
        </div>
        <div className="rtotal" >
          {fmt(result.total)}
        </div>
        <div className="rsub">
          {result.sub}
        </div>
        <div className="calc2-bd">
          <div className="row" >
            <span>Tuition Fee Loan</span>
            <strong>{result.pg ? "—" : fmt(result.tuition)}</strong>
          </div>
          <div className="row" >
            <span>Maintenance Loan</span>
            <strong>{result.pg ? "—" : fmt(result.maint)}</strong>
          </div>
          <div className="row muted">
            <span>{result.pg ? "Combined Master's loan" : "Extra grants (est.)"}</span>
            <strong>{result.pg ? fmt(12858) : fmt(result.grant)}</strong>
          </div>
        </div>

        {result.flag && (
          <div className="calc2-flag show">
            {result.flag}
          </div>
        )}

        <div className="fine">
          Indicative only — not a guarantee. Your official assessment comes from Student Finance England, based on residency, previous study, course designation and household income.
        </div>
        <div className="btnrow">
          <a className="btn btn-orange" href="/apply">
            Apply with support →
          </a>
          <a className="btn btn-white" href="/tools/eligibility-checker">
            Check eligibility
          </a>
        </div>
      </div>
    </div>
  );
}

export default MaintenanceCalculator;
