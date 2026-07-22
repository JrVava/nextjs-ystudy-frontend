"use client";

import React, { useState, useMemo } from "react";

interface CareerData {
  base: [number, number, number, number];
  courses: string[];
}

const salData: Record<string, CareerData> = {
  business: {
    base: [29000, 36000, 45000, 62000],
    courses: ["Business Management BA (Hons)", "Operations Management"],
  },
  project: {
    base: [32000, 42000, 55000, 76000],
    courses: ["Project Management BSc", "Construction Management"],
  },
  computing: {
    base: [33000, 46000, 65000, 90000],
    courses: ["Cyber Security BSc (Hons)", "Computing & IT"],
  },
  health: {
    base: [25000, 31000, 39000, 52000],
    courses: ["Health & Social Care BA", "Public Health BSc"],
  },
  marketing: {
    base: [27000, 35000, 48000, 70000],
    courses: ["Digital Marketing BA", "Business Management"],
  },
  law: {
    base: [28000, 42000, 60000, 95000],
    courses: ["Law LLB (Hons)", "Business Law"],
  },
};

export interface SalaryCheckerWidgetProps {
  sectionData?: {
    status?: boolean;
    badge?: string;
    title?: string;
    description?: string;
  };
}

export function SalaryCheckerWidget({ sectionData }: SalaryCheckerWidgetProps) {
  if (sectionData?.status === false) {
    return null;
  }

  const [career, setCareer] = useState<string>("business");
  const [currentSalary, setCurrentSalary] = useState<number>(24000);
  const [levelBonus, setLevelBonus] = useState<number>(0);
  const [locationMult, setLocationMult] = useState<number>(1);

  const calculations = useMemo(() => {
    const data = salData[career] || salData.business;
    const vals = data.base.map((x) => Math.round((x + levelBonus) * locationMult));

    const y1 = `£${Math.round(vals[0] / 1000)}k`;
    const y3 = `£${Math.round(vals[1] / 1000)}k`;
    const y5 = `£${vals[2].toLocaleString()}`;
    const y10 = `£${Math.round(vals[3] / 1000)}k`;

    const gain = vals[2] - (currentSalary || 0);
    const gainFormatted = `Potential gain: £${gain > 0 ? gain.toLocaleString() : 0}`;

    return { y1, y3, y5, y10, gainFormatted, courses: data.courses };
  }, [career, currentSalary, levelBonus, locationMult]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && (window as any).ystudySaveCurrentTool) {
        (window as any).ystudySaveCurrentTool();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [career, currentSalary, levelBonus, locationMult]);

  const kicker = sectionData?.badge || "Salary Projection";
  const title = sectionData?.title || "Select your career path and location.";
  const description = sectionData?.description || "Compare entry-level, mid-career, and senior salary expectations.";

  return (
    <section className="thub-sec" id="checker">
      <div className="thub" style={{ textAlign: "left" }}>
        <div className="thub-head">
          <span className="kicker">{kicker}</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
            background: "#fff",
            border: "1px solid var(--line)",
            borderRadius: "24px",
            padding: "32px",
            boxShadow: "0 14px 40px rgba(15,23,42,.07)",
          }}
        >
          {/* Form controls */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="field">
              <label>Career area</label>
              <select value={career} onChange={(e) => setCareer(e.target.value)}>
                <option value="business">Business Management</option>
                <option value="project">Project Management</option>
                <option value="computing">Computing / Cyber Security</option>
                <option value="health">Health &amp; Social Care</option>
                <option value="marketing">Marketing</option>
                <option value="law">Law</option>
              </select>
            </div>

            <div className="field">
              <label>Current salary (£/year)</label>
              <input
                type="number"
                value={currentSalary}
                onChange={(e) => setCurrentSalary(Number(e.target.value))}
                placeholder="24000"
              />
            </div>

            <div className="field">
              <label>Experience level</label>
              <select value={levelBonus} onChange={(e) => setLevelBonus(Number(e.target.value))}>
                <option value={0}>Starting / changing career</option>
                <option value={3000}>Some relevant experience (+£3k)</option>
                <option value={7000}>Supervisor / team lead (+£7k)</option>
              </select>
            </div>

            <div className="field">
              <label>Location</label>
              <select value={locationMult} onChange={(e) => setLocationMult(Number(e.target.value))}>
                <option value={1}>UK Average</option>
                <option value={1.12}>London / South East (+12%)</option>
                <option value={0.93}>Regional / Lower Cost (-7%)</option>
              </select>
            </div>
          </div>

          {/* Results display panel */}
          <div
            style={{
              background: "var(--b-navy)",
              color: "#fff",
              borderRadius: "20px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span style={{ color: "#9cc0ff", fontFamily: "var(--df)", fontWeight: 800, fontSize: "12px", textTransform: "uppercase" }}>
                Estimated 5-Year Mid-Career Salary
              </span>
              <div id="salMain" style={{ fontFamily: "var(--df)", fontWeight: 900, fontSize: "44px", letterSpacing: "-.03em", margin: "8px 0 4px", color: "#fff" }}>
                {calculations.y5}
              </div>
              <div id="salGain" style={{ color: "#ffd089", fontWeight: 800, fontSize: "15px" }}>{calculations.gainFormatted}</div>
            </div>

            <div style={{ marginTop: "24px" }}>
              <span style={{ color: "#aebed6", fontSize: "13px", fontWeight: 700, display: "block", marginBottom: "10px" }}>
                Recommended Degree Routes:
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {calculations.courses.map((courseName, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "rgba(255,255,255,.12)",
                      border: "1px solid rgba(255,255,255,.2)",
                      borderRadius: "12px",
                      padding: "10px 14px",
                      fontWeight: 800,
                      fontSize: "14px",
                    }}
                  >
                    🎓 {courseName}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3-STEP PROJECTION CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "18px",
            marginTop: "28px",
          }}
        >
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: "16px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(15,23,42,.05)",
            }}
          >
            <span style={{ color: "var(--muted)", fontWeight: 700, fontSize: "13px" }}>Year 1 Graduate</span>
            <strong style={{ display: "block", fontFamily: "var(--df)", fontWeight: 900, fontSize: "28px", color: "var(--ink)", marginTop: "4px" }}>
              {calculations.y1}
            </strong>
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: "16px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(15,23,42,.05)",
            }}
          >
            <span style={{ color: "var(--muted)", fontWeight: 700, fontSize: "13px" }}>Year 3 Specialist</span>
            <strong style={{ display: "block", fontFamily: "var(--df)", fontWeight: 900, fontSize: "28px", color: "var(--ink)", marginTop: "4px" }}>
              {calculations.y3}
            </strong>
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: "16px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(15,23,42,.05)",
            }}
          >
            <span style={{ color: "var(--muted)", fontWeight: 700, fontSize: "13px" }}>Year 10 Senior</span>
            <strong style={{ display: "block", fontFamily: "var(--df)", fontWeight: 900, fontSize: "28px", color: "var(--o-deep)", marginTop: "4px" }}>
              {calculations.y10}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SalaryCheckerWidget;
