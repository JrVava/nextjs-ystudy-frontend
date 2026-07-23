"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import "./tools.css";

interface CareerData {
  base: [number, number, number, number];
  courses: string[];
}

const salData: Record<string, CareerData> = {
  business: {
    base: [29000, 36000, 45000, 62000],
    courses: ["Business Management", "Operations Management"],
  },
  project: {
    base: [32000, 42000, 55000, 76000],
    courses: ["Project Management", "Construction Management"],
  },
  computing: {
    base: [33000, 46000, 65000, 90000],
    courses: ["Cyber Security", "Computing"],
  },
  health: {
    base: [25000, 31000, 39000, 52000],
    courses: ["Health & Social Care", "Public Health"],
  },
  marketing: {
    base: [27000, 35000, 48000, 70000],
    courses: ["Marketing", "Business Management"],
  },
  law: {
    base: [28000, 42000, 60000, 95000],
    courses: ["Law", "Business Law"],
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

  // Format money to local currency string nicely
  const formatMoney = (n: number) => {
    const val = Math.round(n);
    return val < 0 ? `-£${Math.abs(val).toLocaleString()}` : `£${val.toLocaleString()}`;
  };

  const calculations = useMemo(() => {
    const data = salData[career] || salData.business;
    const vals = data.base.map((x) => (x + levelBonus) * locationMult);

    const y1 = `£${Math.round(vals[0] / 1000)}k`;
    const y3 = `£${Math.round(vals[1] / 1000)}k`;
    const y5 = formatMoney(vals[2]);
    const y10 = `£${Math.round(vals[3] / 1000)}k`;

    const gain = vals[2] - (currentSalary || 0);
    const gainFormatted = `Potential gain: ${formatMoney(gain)}`;

    return { y1, y3, y5, y10, gainFormatted, courses: data.courses };
  }, [career, currentSalary, levelBonus, locationMult]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && (window as any).ystudySaveCurrentTool) {
        (window as any).ystudySaveCurrentTool();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [career, currentSalary, levelBonus, locationMult]);

  return (
    <section className="tool-shell" id="checker">
      <div className="container tool-grid-2">
        <div className="tool-panel">
          <h2>Check salary route</h2>
          <form className="tool-form" style={{ display: 'block !important' }} onSubmit={(e) => e.preventDefault()}>
            <div className="tool-row">
              <div className="tool-field">
                <label htmlFor="salCareer">Career area</label>
                <select
                  id="salCareer"
                  value={career}
                  onChange={(e) => setCareer(e.target.value)}
                >
                  <option value="business">Business Management</option>
                  <option value="project">Project Management</option>
                  <option value="computing">Computing / Cyber Security</option>
                  <option value="health">Health &amp; Social Care</option>
                  <option value="marketing">Marketing</option>
                  <option value="law">Law</option>
                </select>
              </div>
              <div className="tool-field">
                <label htmlFor="salCurrent">Current salary</label>
                <input
                  id="salCurrent"
                  type="number"
                  value={currentSalary}
                  onChange={(e) => setCurrentSalary(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="tool-row">
              <div className="tool-field">
                <label htmlFor="salLevel">Experience level</label>
                <select
                  id="salLevel"
                  value={levelBonus}
                  onChange={(e) => setLevelBonus(Number(e.target.value))}
                >
                  <option value={0}>Starting / changing career</option>
                  <option value={3000}>Some relevant experience</option>
                  <option value={7000}>Supervisor / team lead</option>
                </select>
              </div>
              <div className="tool-field">
                <label htmlFor="salLoc">Location</label>
                <select
                  id="salLoc"
                  value={locationMult}
                  onChange={(e) => setLocationMult(Number(e.target.value))}
                >
                  <option value={1}>UK average</option>
                  <option value={1.12}>London / South East</option>
                  <option value={0.93}>Lower cost region</option>
                </select>
              </div>
            </div>
          </form>
          <div className="tool-actions">
            <button className="btn btn-orange" type="button">
              Calculate
            </button>
            <Link className="btn btn-white" href="/tools/degree-match">
              Match degree
            </Link>
          </div>
        </div>
        <aside className="tool-panel dark">
          <h3>Estimated 5-year salary</h3>
          <div className="result-card highlight">
            <strong id="salMain">{calculations.y5}</strong>
            <p id="salGain">{calculations.gainFormatted}</p>
          </div>
          <br />
          <div className="recommend-grid" id="salDegrees">
            {calculations.courses.map((course, idx) => (
              <div className="degree-mini" key={idx}>
                <b>{course}</b>
                <span>Useful route for this career area.</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
      <div className="container" style={{ marginTop: "24px" }}>
        <div className="tool-grid-3">
          <div className="result-card">
            <span>Year 1</span>
            <strong id="s1">{calculations.y1}</strong>
          </div>
          <div className="result-card">
            <span>Year 3</span>
            <strong id="s3">{calculations.y3}</strong>
          </div>
          <div className="result-card">
            <span>Year 10</span>
            <strong id="s10">{calculations.y10}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SalaryCheckerWidget;
