"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import "./tools.css";

export interface FinanceCalculatorWidgetProps {
  sectionData?: {
    badge?: string;
    title?: string;
    description?: string;
    status?: boolean;
    card1?: {
      title?: string;
      description?: string;
    };
    card2?: {
      title?: string;
    };
    card3?: {
      description?: string;
    };
    card4?: {
      description1?: string;
      description2?: string;
    };
    card5?: {
      title?: string;
      description1?: string;
      description2?: string;
    };
    stepper?: {
      title?: string;
      steps?: {
        number?: string;
        title?: string;
        description?: string;
      }[];
    };
  };
}

const money = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

const maintenance: Record<string, [number, number]> = {
  home: [4013, 9118],
  away: [5048, 10830],
  london: [7039, 14135],
  overseas: [5996, 12403],
};

const fees: Record<string, number> = {
  undergrad: 9790,
  accelerated: 11750,
  parttime: 7335,
  foundation_classroom: 5760,
  foundation_practical: 9790,
};

export function FinanceCalculatorWidget({
  sectionData,
}: FinanceCalculatorWidgetProps) {
  if (sectionData?.status === false) {
    return null;
  }
  // Form State
  const [status, setStatus] = useState("british");
  const [living, setLiving] = useState("away");
  const [qualification, setQualification] = useState("undergrad");
  const [mode, setMode] = useState("full");
  const [income, setIncome] = useState<number | string>(25000);
  const [previous, setPrevious] = useState("no");
  const [age, setAge] = useState<number | string>(32);
  const [children, setChildren] = useState("no");
  const [dependant, setDependant] = useState("no");

  // Calculations corresponding to original jQuery update()
  const calculations = useMemo(() => {
    const q = qualification;
    const l = living;
    const cleanIncome = Math.max(0, Number(income) || 0);
    const hasChild = children === "yes";
    const hasAdult = dependant === "yes";

    const ft = mode === "full" || mode === "blended";
    const tuition = fees[q] ?? 9790;
    const range = maintenance[l] ?? [5048, 10830];
    let maintenanceEstimate: number | null = null;
    const notes: string[] = [];

    if (ft && q !== "parttime") {
      if (cleanIncome <= 25000) {
        maintenanceEstimate = range[1];
        notes.push(
          "Maximum standard maintenance rate shown for illustrative low-income profile; actual SFE award may differ."
        );
      } else {
        notes.push(
          "Household income exceeds £25,000: exact maintenance amount requires the official SFE assessment. Displaying the published minimum–maximum range instead of inventing a tapering formula."
        );
      }
    } else {
      notes.push(
        "Part-time or non-standard study: maintenance eligibility and amounts depend on course intensity, attendance and SFE rules; no standard full-time maintenance amount is assumed."
      );
    }

    if (mode === "distance") {
      notes.push("Distance learning can have different maintenance eligibility rules.");
    }
    if (q === "parttime" && ft) {
      notes.push("Part-time undergraduate course type and full-time study mode conflict; check your selections.");
    }
    if (q !== "parttime" && mode === "part") {
      notes.push(
        "The selected tuition cap assumes the qualification category shown; verify the actual fee and funding for part-time intensity."
      );
    }
    if (previous !== "no") {
      notes.push("Previous higher education may restrict funding; individual assessment required.");
    }
    if (status !== "british") {
      notes.push(
        "Residence status alone does not establish eligibility: residence history and course criteria must be checked."
      );
    }

    const cleanAge = Number(age) || 0;
    if (cleanAge >= 60) {
      notes.push("Maintenance support for students aged 60 or over may be assessed differently.");
    }

    const grantApplicable = ft && q !== "parttime";
    const grants: Array<{
      name: string;
      max: number;
      eligible: boolean;
      detail: string;
    }> = [];

    if (hasChild) {
      grants.push({
        name: "Parents’ Learning Allowance",
        max: 2024,
        eligible: grantApplicable,
        detail:
          "For eligible full-time undergraduate students with dependent children; household-income assessment required.",
      });
    }
    if (hasAdult) {
      grants.push({
        name: "Adult Dependants’ Grant",
        max: 3545,
        eligible: grantApplicable && l !== "overseas",
        detail:
          "For eligible full-time undergraduate students with a financially dependent adult. Additional restrictions apply, including overseas-resident adult dependants.",
      });
    }

    const potentialGrantMax = grants
      .filter((g) => g.eligible)
      .reduce((a, g) => a + g.max, 0);

    const potentialMaintenanceMax =
      ft && q !== "parttime" ? range[1] : null;

    const potentialCashMax =
      potentialMaintenanceMax === null
        ? null
        : potentialMaintenanceMax + potentialGrantMax;

    const tuitionOut = "Up to " + money(tuition);
    const maintOut =
      maintenanceEstimate === null
        ? ft
          ? money(range[0]) + "–" + money(range[1]) + " (possible range)"
          : "Check SFE"
        : "Up to " + money(maintenanceEstimate);
    const confidenceOut = "SFE check required";

    const totalSupport =
      maintenanceEstimate === null
        ? "Assessment required"
        : "Up to " + money(maintenanceEstimate + tuition);

    const totalSupportLabel =
      maintenanceEstimate === null
        ? "Annual support: official assessment required"
        : "Illustrative combined annual loans (not cash income)";

    const maintenanceBreakdown =
      maintenanceEstimate === null
        ? ft
          ? `${money(range[0])}–${money(range[1])} published standard range`
          : "Not estimated for this mode"
        : `Up to ${money(maintenanceEstimate)} illustrative maximum`;

    const potentialCashSupport =
      potentialCashMax === null
        ? "Official assessment needed"
        : "Up to " + money(potentialCashMax) + " per year";

    const potentialCashDetail =
      potentialCashMax === null || potentialMaintenanceMax === null
        ? "A standard full-time maintenance maximum cannot be assumed for this study mode."
        : `Up to ${money(potentialMaintenanceMax)} in maintenance loan${potentialGrantMax ? " plus up to " + money(potentialGrantMax) + " in potential dependant grants" : ""
        }. Illustrative annual maximum based on your selections; subject to individual Student Finance England assessment and separate grant eligibility. Tuition Fee Loan excluded.`;

    const whyList = notes.concat([
      "Published rates provided for 2026/27; confirm current amounts and eligibility on GOV.UK.",
    ]);

    return {
      tuition,
      tuitionOut,
      maintOut,
      confidenceOut,
      totalSupport,
      totalSupportLabel,
      maintenanceBreakdown,
      grants,
      potentialCashSupport,
      potentialCashDetail,
      whyList,
    };
  }, [qualification, living, mode, income, children, dependant, previous, status, age]);

  // Persist current tool state for advisers if hook is available
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && (window as any).ystudySaveCurrentTool) {
        (window as any).ystudySaveCurrentTool();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [qualification, living, mode, income, children, dependant, previous, status, age]);

  return (
    <section className="tool-wrap-v600" id="calculator">
      <div className="container tool-grid-v600">
        <div className="tool-card-v600">
          <span className="kicker">{sectionData?.badge}</span>
          <h2>{sectionData?.title}</h2>
          <div className="tool-form">
            {/* Status */}
            <div className="field">
              <label htmlFor="status">Residence / immigration status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="british">British citizen</option>
                <option value="ilr">ILR / indefinite leave</option>
                <option value="settled">EU settled status</option>
                <option value="presettled">EU pre-settled status</option>
                <option value="refugee">Refugee / humanitarian protection</option>
                <option value="other">Other / not sure</option>
              </select>
            </div>

            {/* Living */}
            <div className="field">
              <label htmlFor="living">Living situation</label>
              <select
                id="living"
                value={living}
                onChange={(e) => setLiving(e.target.value)}
              >
                <option value="home">Living with parents</option>
                <option value="away">Living away from home, outside London</option>
                <option value="london">Living away from home, in London</option>
                <option value="overseas">Studying overseas</option>
              </select>
            </div>

            {/* Qualification */}
            <div className="field">
              <label htmlFor="qualification">Qualification Type</label>
              <select
                id="qualification"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
              >
                <option value="undergrad">Full-time undergraduate</option>
                <option value="accelerated">Accelerated degree</option>
                <option value="parttime">Part-time undergraduate</option>
                <option value="foundation_classroom">Foundation Year (classroom-based)</option>
                <option value="foundation_practical">Foundation Year (practical subjects)</option>
              </select>
            </div>

            {/* Study Mode */}
            <div className="field">
              <label htmlFor="mode">Study mode</label>
              <select
                id="mode"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                <option value="full">Full-time campus</option>
                <option value="blended">Full-time blended</option>
                <option value="part">Part-time</option>
                <option value="distance">Distance learning</option>
              </select>
            </div>

            {/* Income */}
            <div className="field">
              <label htmlFor="income">Household income estimate</label>
              <input
                id="income"
                min="0"
                step="500"
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>

            {/* Previous Study */}
            <div className="field">
              <label htmlFor="previous">Previous university study?</label>
              <select
                id="previous"
                value={previous}
                onChange={(e) => setPrevious(e.target.value)}
              >
                <option value="no">No previous UK degree</option>
                <option value="some">Some previous study</option>
                <option value="degree">Already have a degree</option>
              </select>
            </div>

            {/* Age */}
            <div className="field">
              <label htmlFor="age">Age at course start</label>
              <input
                id="age"
                max="75"
                min="16"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* Dependent Children */}
            <div className="field">
              <label htmlFor="children">Do you have dependent children?</label>
              <select
                id="children"
                value={children}
                onChange={(e) => setChildren(e.target.value)}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            {/* Adult Dependant */}
            <div className="field">
              <label htmlFor="dependant">Do you have an adult dependant?</label>
              <select
                id="dependant"
                value={dependant}
                onChange={(e) => setDependant(e.target.value)}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>

          <div className="funding-v109-note" dangerouslySetInnerHTML={{
            __html: sectionData?.card3?.description || "",
          }} />

          <button className="tool-action" id="calcFinance" type="button">
            Show funding snapshot
          </button>

          <p className="tool-note">
            {sectionData?.description}
          </p>

          <div className="result-v600">
            <span className="label">{calculations.totalSupportLabel}</span>
            <strong className="big" id="totalSupport">
              {calculations.totalSupport}
            </strong>
          </div>

          <div aria-live="polite" className="funding-v109-breakdown" id="fundingBreakdown">
            <strong>Tuition fee loan ceiling:</strong> Up to {money(calculations.tuition)} (paid to provider where eligible)<br />
            <strong>Maintenance loan:</strong> {calculations.maintenanceBreakdown}<br />
            <small>These are different loans. Combined figures are not a cash payment to the student.</small>
          </div>

          <section aria-live="polite" className="funding-v110-potential">
            <span className="funding-v110-eyebrow">
              YOU COULD RECEIVE UP TO · ANNUAL LIVING SUPPORT · 2026/27
            </span>
            <strong id="potentialCashSupport">{calculations.potentialCashSupport}</strong>
            <p id="potentialCashDetail">{calculations.potentialCashDetail}</p>
            <small>
              Tuition Fee Loan is excluded because it is normally paid directly to the university. Grant awards are income-assessed
              and require separate eligibility checks.
            </small>
          </section>

          <div aria-live="polite" className="funding-v109-grants">
            <h3>{sectionData?.card5?.title}</h3>
            <div id="grantResults">
              {calculations.grants.length > 0 ? (
                calculations.grants.map((g, idx) => (
                  <div className="funding-v110-grant-card" key={idx}>
                    <div>
                      <strong>{g.name}</strong>
                      <small>{g.detail}</small>
                    </div>
                    <div className="funding-v110-grant-amount">
                      <strong>{g.eligible ? "Up to " + money(g.max) : "Check eligibility"}</strong>
                      <small>
                        {g.eligible
                          ? "Maximum per academic year, not an award"
                          : "No amount assumed for selected study circumstances"}
                      </small>
                    </div>
                  </div>
                ))
              ) : (
                <p>{sectionData?.card5?.description1}</p>
              )}
            </div>
            <p>
              <small>
                {sectionData?.card5?.description2}
              </small>
            </p>
          </div>

          <div className="result-cards">
            <div className="result-card-mini">
              <strong id="maintOut">{calculations.maintOut}</strong>
              <span>Maintenance Loan example</span>
            </div>
            <div className="result-card-mini">
              <strong id="tuitionOut">{calculations.tuitionOut}</strong>
              <span>Tuition Fee Loan max</span>
            </div>
            <div className="result-card-mini">
              <strong id="confidenceOut">{calculations.confidenceOut}</strong>
              <span>Eligibility confidence</span>
            </div>
          </div>
        </div>

        <div className="side-stack">
          <div className="dark-advice">
            <h3>{sectionData?.card1?.title}</h3>
            <p>
              {sectionData?.card1?.description}
            </p>
            <Link className="btn btn-orange" href="/tools/eligibility-checker">
              Get funding risk check
            </Link>
          </div>

          <div className="tool-card-v600">
            <h3>{sectionData?.card2?.title}</h3>
            <div className="doc-list" id="whyList">
              {calculations.whyList.map((t, idx) => (
                <div className="doc-row" key={idx}>
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="tool-card-v600">
            <h3>{sectionData?.stepper?.title || "Next steps"}</h3>
            <div className="timeline-v600">
              {sectionData?.stepper?.steps && sectionData.stepper.steps.length > 0 &&
                sectionData.stepper.steps.map((step, idx) => (
                  <div className="time-row" key={idx}>
                    <div className="time-num">{step.number}</div>
                    <div>
                      <b>{step.title}</b>
                      <p>{step.description}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}

export default FinanceCalculatorWidget;
