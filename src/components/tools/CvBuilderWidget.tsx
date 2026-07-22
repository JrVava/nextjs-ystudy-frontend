"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

interface ExpItem {
  id: number;
  employer: string;
  title: string;
  city: string;
  country: string;
  start: string;
  end: string;
  tasks: string;
  achievements: string;
}

interface EduItem {
  id: number;
  institution: string;
  qual: string;
  status: string;
  city: string;
  country: string;
  start: string;
  end: string;
}

const skillsByArea: Record<string, string[]> = {
  "Business & Operations": ["Leadership", "Communication", "Problem solving", "Organisation", "Customer service", "Teamwork", "Administration", "Project coordination", "Time management"],
  "Logistics & Warehouse": ["Stock control", "Inventory management", "Health and safety", "Team leadership", "Picking and packing", "Delivery coordination", "Warehouse operations"],
  "Healthcare & Care": ["Safeguarding", "Care planning", "Patient support", "Confidentiality", "Empathy", "Medication support", "Record keeping", "Person-centred care"],
  "IT & Digital": ["Microsoft Office", "Data entry", "Troubleshooting", "Cyber awareness", "CRM systems", "Digital communication", "Spreadsheets", "Technical support"],
};

export interface CvBuilderWidgetProps {
  section2Data?: {
    status?: boolean;
    title?: string;
    description?: string;
  };
  section3Data?: {
    status?: boolean;
    cards?: Array<{
      title: string;
      description: string;
    }>;
  };
}

export function CvBuilderWidget({ section2Data, section3Data }: CvBuilderWidgetProps) {
  if (section2Data?.status === false) {
    return null;
  }

  const [tab, setTab] = useState<"personal" | "experience" | "education" | "skills">("personal");

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [summary, setSummary] = useState("");

  const [experiences, setExperiences] = useState<ExpItem[]>([
    { id: 1, employer: "", title: "", city: "", country: "", start: "", end: "", tasks: "", achievements: "" },
  ]);

  const [educations, setEducations] = useState<EduItem[]>([
    { id: 1, institution: "", qual: "BTEC Level 3", status: "Achieved", city: "", country: "", start: "", end: "" },
  ]);

  const [careerArea, setCareerArea] = useState<string>("Business & Operations");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [extraSkills, setExtraSkills] = useState<string>("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const addExp = () => {
    setExperiences((prev) => [
      ...prev,
      { id: Date.now(), employer: "", title: "", city: "", country: "", start: "", end: "", tasks: "", achievements: "" },
    ]);
  };

  const removeExp = (id: number) => {
    setExperiences((prev) => prev.filter((item) => item.id !== id));
  };

  const updateExp = (id: number, field: keyof ExpItem, val: string) => {
    setExperiences((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: val } : item)));
  };

  const addEdu = () => {
    setEducations((prev) => [
      ...prev,
      { id: Date.now(), institution: "", qual: "GCSE", status: "Achieved", city: "", country: "", start: "", end: "" },
    ]);
  };

  const removeEdu = (id: number) => {
    setEducations((prev) => prev.filter((item) => item.id !== id));
  };

  const updateEdu = (id: number, field: keyof EduItem, val: string) => {
    setEducations((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: val } : item)));
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));
  };

  const generateSummaryText = () => {
    const roleTitle = title.trim() || "working professional";
    const empName = experiences[0]?.employer.trim() ? " gained at " + experiences[0].employer.trim() : "";
    setSummary(
      `Reliable ${roleTitle} with practical experience${empName}. Strong background in ${careerArea.toLowerCase()}, communication, organisation and problem solving. Now seeking to build on professional experience through higher education and progress towards a stronger long-term career route.`
    );
    showToast("Summary generated!");
  };

  const score = useMemo(() => {
    let s = 0;
    if (name.trim() && email.trim()) s += 15;
    if (title.trim()) s += 10;
    if (summary.trim().length > 40) s += 20;
    if (experiences[0]?.employer.trim() && experiences[0]?.title.trim()) s += 20;
    if (educations[0]?.institution.trim()) s += 15;
    if (selectedSkills.length >= 3 || extraSkills.trim()) s += 20;
    return Math.min(100, s);
  }, [name, email, title, summary, experiences, educations, selectedSkills, extraSkills]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && (window as any).ystudySaveCurrentTool) {
        (window as any).ystudySaveCurrentTool();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [name, email, title, summary, experiences, educations, selectedSkills, extraSkills]);

  return (
    <section className="phase-shell" id="builder">
      <div className="container phase-layout cv-ps-split" style={{ textAlign: "left" }}>
        <div className="phase-card">
          <h2>{section2Data?.title || "Build your CV step by step."}</h2>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "16px" }}>
            <p className="phase-muted" style={{ margin: 0 }}>{section2Data?.description || "Complete the tabs. Your preview and score update automatically."}</p>
            <div style={{ background: "var(--soft)", padding: "4px 8px", borderRadius: "8px", fontWeight: 800, fontSize: "13px", color: "var(--ink)", whiteSpace: "nowrap" }}>
              Score: <span id="cvScore">{score}%</span>
            </div>
          </div>


          <div className="phase-tabs no-print">
            <button className={`phase-tab ${tab === "personal" ? "active" : ""}`} onClick={() => setTab("personal")}>
              Personal
            </button>
            <button className={`phase-tab ${tab === "experience" ? "active" : ""}`} onClick={() => setTab("experience")}>
              Experience
            </button>
            <button className={`phase-tab ${tab === "education" ? "active" : ""}`} onClick={() => setTab("education")}>
              Education
            </button>
            <button className={`phase-tab ${tab === "skills" ? "active" : ""}`} onClick={() => setTab("skills")}>
              Skills
            </button>
          </div>

          {tab === "personal" && (
            <div className="phase-pane active">
              <div className="form-grid">
                <div className="field">
                  <label>Full name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Maria Gonzalez" />
                </div>
                <div className="field">
                  <label>Professional title</label>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Warehouse Supervisor" />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@email.com" />
                </div>
                <div className="field">
                  <label>Phone</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07XXX XXXXXX" />
                </div>
                <div className="field">
                  <label>City</label>
                  <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="London" />
                </div>
                <div className="field">
                  <label>Country</label>
                  <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="United Kingdom" />
                </div>
                <div className="field full">
                  <label>Professional summary</label>
                  <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Write 3-4 lines about your background, strengths and study goals..."
                  />
                </div>
              </div>
              <div className="btnrow" style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
                <button type="button" className="ys-btn blue" onClick={generateSummaryText}>
                  Generate summary
                </button>
                <button type="button" className="ys-btn white" onClick={() => setTab("experience")}>
                  Next: experience →
                </button>
              </div>
            </div>
          )}

          {tab === "experience" && (
            <div className="phase-pane active">
              {experiences.map((exp, idx) => (
                <div key={exp.id} style={{ border: "1px solid var(--line)", borderRadius: "18px", padding: "18px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <strong>Employer #{idx + 1}</strong>
                    {experiences.length > 1 && (
                      <button type="button" className="ys-btn white" onClick={() => removeExp(exp.id)}>
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="form-grid">
                    <div className="field">
                      <label>Employer name</label>
                      <input value={exp.employer} onChange={(e) => updateExp(exp.id, "employer", e.target.value)} placeholder="e.g. Tesco / NHS" />
                    </div>
                    <div className="field">
                      <label>Job title</label>
                      <input value={exp.title} onChange={(e) => updateExp(exp.id, "title", e.target.value)} placeholder="e.g. Supervisor" />
                    </div>
                    <div className="field">
                      <label>Start date</label>
                      <input value={exp.start} onChange={(e) => updateExp(exp.id, "start", e.target.value)} placeholder="01/2021" />
                    </div>
                    <div className="field">
                      <label>End date</label>
                      <input value={exp.end} onChange={(e) => updateExp(exp.id, "end", e.target.value)} placeholder="Present" />
                    </div>
                    <div className="field full">
                      <label>Key tasks / duties</label>
                      <textarea
                        value={exp.tasks}
                        onChange={(e) => updateExp(exp.id, "tasks", e.target.value)}
                        placeholder="Supervised daily team shifts; managed stock inventory..."
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="btnrow" style={{ display: "flex", gap: "10px" }}>
                <button type="button" className="ys-btn blue" onClick={addExp}>
                  + Add employer
                </button>
                <button type="button" className="ys-btn white" onClick={() => setTab("education")}>
                  Next: education →
                </button>
              </div>
            </div>
          )}

          {tab === "education" && (
            <div className="phase-pane active">
              {educations.map((edu, idx) => (
                <div key={edu.id} style={{ border: "1px solid var(--line)", borderRadius: "18px", padding: "18px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <strong>Education #{idx + 1}</strong>
                    {educations.length > 1 && (
                      <button type="button" className="ys-btn white" onClick={() => removeEdu(edu.id)}>
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="form-grid">
                    <div className="field">
                      <label>Institution name</label>
                      <input value={edu.institution} onChange={(e) => updateEdu(edu.id, "institution", e.target.value)} placeholder="e.g. College" />
                    </div>
                    <div className="field">
                      <label>Qualification</label>
                      <input value={edu.qual} onChange={(e) => updateEdu(edu.id, "qual", e.target.value)} placeholder="e.g. High School Diploma" />
                    </div>
                    <div className="field">
                      <label>Status</label>
                      <select value={edu.status} onChange={(e) => updateEdu(edu.id, "status", e.target.value)}>
                        <option value="Achieved">Achieved</option>
                        <option value="In progress">In progress</option>
                      </select>
                    </div>
                    <div className="field">
                      <label>End date</label>
                      <input value={edu.end} onChange={(e) => updateEdu(edu.id, "end", e.target.value)} placeholder="2020" />
                    </div>
                  </div>
                </div>
              ))}
              <div className="btnrow" style={{ display: "flex", gap: "10px" }}>
                <button type="button" className="ys-btn blue" onClick={addEdu}>
                  + Add education
                </button>
                <button type="button" className="ys-btn white" onClick={() => setTab("skills")}>
                  Next: skills →
                </button>
              </div>
            </div>
          )}

          {tab === "skills" && (
            <div className="phase-pane active">
              <div className="field">
                <label>Career area library</label>
                <select value={careerArea} onChange={(e) => setCareerArea(e.target.value)}>
                  {Object.keys(skillsByArea).map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "16px 0" }}>
                {(skillsByArea[careerArea] || []).map((sk) => {
                  const isSelected = selectedSkills.includes(sk);
                  return (
                    <button
                      key={sk}
                      type="button"
                      onClick={() => toggleSkill(sk)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "999px",
                        border: "1px solid var(--b-navy)",
                        background: isSelected ? "var(--b-navy)" : "#fff",
                        color: isSelected ? "#fff" : "var(--b-navy)",
                        fontWeight: 800,
                        fontSize: "13px",
                        cursor: "pointer",
                      }}
                    >
                      {sk} {isSelected ? "✓" : "+"}
                    </button>
                  );
                })}
              </div>

              <div className="field full">
                <label>Extra skills (comma separated)</label>
                <textarea
                  value={extraSkills}
                  onChange={(e) => setExtraSkills(e.target.value)}
                  placeholder="Leadership, problem solving, customer focus..."
                />
              </div>
            </div>
          )}
        </div>

        {/* PREVIEW SIDEBAR */}
        <aside className="preview-card">
          <div
            style={{
              background: "#07142f",
              color: "#fff",
              borderRadius: "20px 20px 0 0",
              padding: "24px",
            }}
          >
            <h2 style={{ color: "#fff", margin: 0, fontSize: "26px" }}>{name || "Your Name"}</h2>
            <div style={{ color: "#8ec3ff", fontWeight: 800, marginTop: "4px" }}>{title || "Professional Title"}</div>
            <div style={{ color: "#cbd7e5", fontSize: "13px", marginTop: "8px" }}>
              {[email, phone, [city, country].filter(Boolean).join(", ")].filter(Boolean).join(" · ") || "email · phone · location"}
            </div>
          </div>

          <div style={{ background: "#fff", padding: "24px", borderRadius: "0 0 20px 20px", border: "1px solid var(--line)" }}>
            {summary && (
              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ color: "var(--b-navy)", fontSize: "13px", textTransform: "uppercase", letterSpacing: ".06em", margin: "0 0 8px" }}>
                  Profile Summary
                </h4>
                <p style={{ fontSize: "14px", color: "var(--muted)", margin: 0, lineHeight: "1.5" }}>{summary}</p>
              </div>
            )}

            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ color: "var(--b-navy)", fontSize: "13px", textTransform: "uppercase", letterSpacing: ".06em", margin: "0 0 8px" }}>
                Work Experience
              </h4>
              {experiences.map((exp, idx) => (
                <div key={idx} style={{ marginBottom: "12px" }}>
                  <strong style={{ color: "var(--ink)", display: "block" }}>
                    {exp.title || "Job Title"} · {exp.employer || "Employer"}
                  </strong>
                  <small style={{ color: "var(--muted)", fontWeight: 700 }}>
                    {[exp.city, exp.country].filter(Boolean).join(", ")} {exp.start ? `(${exp.start} – ${exp.end || "Present"})` : ""}
                  </small>
                  {exp.tasks && <p style={{ fontSize: "13px", color: "var(--muted)", margin: "4px 0 0" }}>{exp.tasks}</p>}
                </div>
              ))}
            </div>

            <div>
              <h4 style={{ color: "var(--b-navy)", fontSize: "13px", textTransform: "uppercase", letterSpacing: ".06em", margin: "0 0 8px" }}>
                Key Skills
              </h4>
              <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>
                {[...selectedSkills, ...extraSkills.split(",").filter(Boolean)].join(" · ") || "Selected skills will appear here."}
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* THREE LINK CARDS CONVERSION SYSTEM */}
      {section3Data?.status !== false && (
        <div className="container conversion-grid" style={{ marginTop: "32px", textAlign: "left" }}>
          <div className="conversion-card">
            <h3>{section3Data?.cards?.[0]?.title || "University application CV"}</h3>
            <p className="phase-muted">{section3Data?.cards?.[0]?.description || "Built for mature students. It highlights work history, responsibility and transferable skills."}</p>
          </div>
          <div className="conversion-card">
            <h3>{section3Data?.cards?.[1]?.title || "Send to adviser"}</h3>
            <p className="phase-muted">{section3Data?.cards?.[1]?.description || "Send your CV draft to an adviser so they can recommend suitable degree routes for your experience."}</p>
            <Link className="ys-btn orange" href="/lead/adviser-call">
              Book adviser review
            </Link>
          </div>
          <div className="conversion-card">
            <h3>{section3Data?.cards?.[2]?.title || "Next step"}</h3>
            <p className="phase-muted">{section3Data?.cards?.[2]?.description || "Use your CV to support your personal statement and course interview preparation."}</p>
            <Link className="ys-btn blue" href="/tools/personal-statement-calculator">
              Open Statement Builder
            </Link>
          </div>
        </div>
      )}

      {toastMsg && <div className="save-toast show">{toastMsg}</div>}
    </section>
  );
}

export default CvBuilderWidget;
