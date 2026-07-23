"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import "./tools.css";

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

const qualificationOptions = [
  "GCSE",
  "A Level",
  "BTEC Level 2",
  "BTEC Level 3",
  "Access to Higher Education",
  "Foundation Year",
  "CertHE",
  "DipHE",
  "HNC",
  "HND",
  "Foundation Degree (FdA/FdSc)",
  "Bachelor's Degree",
  "Top-Up Degree",
  "Postgraduate Certificate",
  "Postgraduate Diploma",
  "Master's Degree",
  "MBA",
  "PhD",
  "Professional Qualification",
  "Romanian Baccalaureate",
  "Foreign high school diploma",
  "Foreign bachelor's degree",
  "Other"
];

const statusOptions = [
  "Achieved",
  "In progress",
  "Awaiting certificate",
  "Lost certificate",
  "Not completed"
];

const skillsByArea: Record<string, string[]> = {
  "Business & Operations": [
    "Leadership",
    "Communication",
    "Problem solving",
    "Organisation",
    "Customer service",
    "Teamwork",
    "Administration",
    "Project coordination",
    "Time management",
    "Reporting",
    "Stakeholder management",
    "Process improvement"
  ],
  "Logistics & Warehouse": [
    "Stock control",
    "Inventory management",
    "Health and safety",
    "Team leadership",
    "Picking and packing",
    "Delivery coordination",
    "Warehouse operations",
    "Quality checks",
    "KPI monitoring",
    "Shift supervision"
  ],
  "Healthcare & Care": [
    "Safeguarding",
    "Care planning",
    "Patient support",
    "Confidentiality",
    "Empathy",
    "Medication support",
    "Record keeping",
    "Team communication",
    "Person-centred care"
  ],
  "Construction": [
    "Site safety",
    "Risk assessment",
    "Project coordination",
    "Manual handling",
    "Blueprint awareness",
    "Quality control",
    "Team supervision",
    "Materials planning",
    "Client communication"
  ],
  "Hospitality & Retail": [
    "Customer service",
    "Complaint handling",
    "Cash handling",
    "Sales support",
    "Food safety",
    "Shift management",
    "Stock rotation",
    "Team training",
    "Upselling",
    "Front-of-house"
  ],
  "IT & Digital": [
    "Microsoft Office",
    "Data entry",
    "Troubleshooting",
    "Cyber awareness",
    "CRM systems",
    "Digital communication",
    "Basic networking",
    "Spreadsheets",
    "Technical support"
  ],
  "Education & Support": [
    "Learner support",
    "Mentoring",
    "Lesson support",
    "Behaviour management",
    "Communication",
    "Safeguarding",
    "Progress tracking",
    "Inclusive practice"
  ]
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
      link?: string;
    }>;
  };
}

export function CvBuilderWidget({ section2Data, section3Data }: CvBuilderWidgetProps) {
  if (section2Data?.status === false) {
    return null;
  }

  const [activeTab, setActiveTab] = useState<"personal" | "experience" | "education" | "skills">("personal");

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [summary, setSummary] = useState("");

  const [experiences, setExperiences] = useState<ExpItem[]>([
    { id: 1, employer: "", title: "", city: "", country: "", start: "", end: "", tasks: "", achievements: "" }
  ]);

  const [educations, setEducations] = useState<EduItem[]>([
    { id: 1, institution: "", qual: "GCSE", status: "Achieved", city: "", country: "", start: "", end: "" }
  ]);

  const [careerArea, setCareerArea] = useState<string>("Business & Operations");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [extraSkills, setExtraSkills] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("Save your CV before downloading.");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 1800);
  };

  const handleOpenTab = (tab: "personal" | "experience" | "education" | "skills") => {
    setActiveTab(tab);
    const el = document.getElementById("builder");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const addExperience = () => {
    setExperiences((prev) => [
      ...prev,
      { id: Date.now(), employer: "", title: "", city: "", country: "", start: "", end: "", tasks: "", achievements: "" }
    ]);
  };

  const removeExperience = (id: number) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  };

  const updateExperience = (id: number, field: keyof ExpItem, val: string) => {
    setExperiences((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: val } : e)));
  };

  const addEducation = () => {
    setEducations((prev) => [
      ...prev,
      { id: Date.now(), institution: "", qual: "GCSE", status: "Achieved", city: "", country: "", start: "", end: "" }
    ]);
  };

  const removeEducation = (id: number) => {
    setEducations((prev) => prev.filter((e) => e.id !== id));
  };

  const updateEducation = (id: number, field: keyof EduItem, val: string) => {
    setEducations((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: val } : e)));
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleGenerateSummary = () => {
    const roleTitle = title.trim() || "working professional";
    const area = careerArea || "Business & Operations";
    const employer = experiences[0]?.employer.trim() ? " gained at " + experiences[0].employer.trim() : "";
    setSummary(
      `Reliable ${roleTitle} with practical experience${employer}. Strong background in ${area.toLowerCase()}, communication, organisation and problem solving. Now seeking to build on professional experience through higher education and progress towards a stronger long-term career route.`
    );
    triggerToast("Summary generated!");
  };

  // Convert tasks and achievements to lists of lines
  const parseLines = (val: string) => {
    return val
      .split(/\n|;/)
      .map((x) => x.trim())
      .filter(Boolean);
  };

  // Calculate score checklist and value exactly matching mockup
  const scoreData = useMemo(() => {
    let s = 0;
    const checklist: Array<{ ok: boolean; label: string }> = [];

    const addCheck = (ok: boolean, label: string, pts: number) => {
      if (ok) s += pts;
      checklist.push({ ok, label });
    };

    const firstExp = experiences[0];
    const firstEdu = educations[0];
    const extraSkillsCount = extraSkills.split(",").map(x => x.trim()).filter(Boolean).length;
    const skillsCount = selectedSkills.length + extraSkillsCount;

    addCheck(!!(name.trim() && email.trim()), "Name and contact details added", 14);
    addCheck(!!title.trim(), "Professional title added", 10);
    addCheck(summary.trim().length > 60, "Strong professional summary", 16);
    addCheck(!!(firstExp && firstExp.employer.trim() && firstExp.title.trim()), "Employer and job title added", 14);
    addCheck(!!(firstExp && firstExp.start.trim() && firstExp.end.trim()), "Exact employment dates added", 10);
    addCheck(!!(firstExp && firstExp.tasks.trim().length > 40), "Activities/tasks described", 12);
    addCheck(!!(firstEdu && firstEdu.institution.trim()), "Education institution added", 10);
    addCheck(!!(firstEdu && firstEdu.qual.trim() && firstEdu.status.trim()), "Qualification and status added", 8);
    addCheck(skillsCount >= 5, "5+ relevant skills added", 6);

    return { score: Math.min(100, s), checklist };
  }, [name, email, title, summary, experiences, educations, selectedSkills, extraSkills]);

  const handleOpenModal = (titleStr: string) => {
    setModalTitle(titleStr);
    setShowModal(true);
  };

  const handlePrepareAdviser = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "ystudy_adviser_context",
        JSON.stringify({
          from: "CV Builder",
          summary: `CV score ${scoreData.score}/100`,
          savedAt: new Date().toISOString(),
        })
      );
      triggerToast("Saved for adviser");
    }
  };

  const kickerTitle = section2Data?.title || "Build your CV step by step.";
  const kickerDesc = section2Data?.description || "Complete the tabs. Your preview and score update automatically.";

  const bottomCards = section3Data?.cards || [
    { title: "University application CV", description: "Built for mature students, not just job applications. It highlights work history, responsibility and transferable skills." },
    { title: "Send to adviser", description: "When ready, send the CV context before a call so the adviser can recommend suitable degree routes." },
    { title: "Next step", description: "Use your CV to support your personal statement and course interview preparation." }
  ];

  return (
    <>
      <section className="phase-shell" id="builder">
        <div className="container phase-layout cv-ps-split" style={{ textAlign: "left" }}>
          
          {/* TAB FORMS SIDE CARD */}
          <div className="phase-card">
            <h2>{kickerTitle}</h2>
            <p className="phase-muted">{kickerDesc}</p>
            
            <div className="phase-tabs no-print">
              <button className={`phase-tab ${activeTab === "personal" ? "active" : ""}`} onClick={() => setActiveTab("personal")}>
                Personal
              </button>
              <button className={`phase-tab ${activeTab === "experience" ? "active" : ""}`} onClick={() => setActiveTab("experience")}>
                Experience
              </button>
              <button className={`phase-tab ${activeTab === "education" ? "active" : ""}`} onClick={() => setActiveTab("education")}>
                Education
              </button>
              <button className={`phase-tab ${activeTab === "skills" ? "active" : ""}`} onClick={() => setActiveTab("skills")}>
                Skills
              </button>
            </div>

            {/* Tab Pane: Personal */}
            {activeTab === "personal" && (
              <div className="phase-pane active" id="pane-personal">
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
                      placeholder="Write 3-4 lines, or use Generate Summary after adding experience."
                    />
                    <span className="mini-help">Tip: mention your experience, strengths and the course/career direction you want.</span>
                  </div>
                </div>
                <div className="btnrow" style={{ marginTop: "16px" }}>
                  <button className="ys-btn blue" onClick={handleGenerateSummary} type="button">
                    Generate summary
                  </button>
                  <button className="ys-btn white" onClick={() => handleOpenTab("experience")} type="button">
                    Next: experience
                  </button>
                </div>
              </div>
            )}

            {/* Tab Pane: Experience */}
            {activeTab === "experience" && (
              <div className="phase-pane active" id="pane-experience">
                <div className="section-title">
                  <h3>Professional experience</h3>
                </div>
                <p className="phase-muted">Add employer name, location and exact dates. Activities/tasks are the day-to-day duties; achievements are measurable wins.</p>
                
                <div className="dynamic-list" id="experienceList">
                  {experiences.map((exp, idx) => (
                    <div key={exp.id} className="dynamic-item exp">
                      <div className="item-head">
                        <b>Employer {idx + 1}</b>
                        {experiences.length > 1 && (
                          <button type="button" className="ys-btn white" onClick={() => removeExperience(exp.id)}>
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="form-grid">
                        <div className="field">
                          <label>Name of employer</label>
                          <input
                            value={exp.employer}
                            onChange={(e) => updateExperience(exp.id, "employer", e.target.value)}
                            placeholder="e.g. Tesco / NHS / ABC Logistics"
                          />
                        </div>
                        <div className="field">
                          <label>Job title</label>
                          <input
                            value={exp.title}
                            onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                            placeholder="e.g. Warehouse Supervisor"
                          />
                        </div>
                        <div className="field">
                          <label>City</label>
                          <input
                            value={exp.city}
                            onChange={(e) => updateExperience(exp.id, "city", e.target.value)}
                            placeholder="Birmingham"
                          />
                        </div>
                        <div className="field">
                          <label>Country</label>
                          <input
                            value={exp.country}
                            onChange={(e) => updateExperience(exp.id, "country", e.target.value)}
                            placeholder="United Kingdom"
                          />
                        </div>
                        <div className="field">
                          <label>Exact start date</label>
                          <input
                            value={exp.start}
                            onChange={(e) => updateExperience(exp.id, "start", e.target.value)}
                            placeholder="dd/mm/yyyy"
                          />
                        </div>
                        <div className="field">
                          <label>Exact end date</label>
                          <input
                            value={exp.end}
                            onChange={(e) => updateExperience(exp.id, "end", e.target.value)}
                            placeholder="dd/mm/yyyy or Present"
                          />
                        </div>
                        <div className="field full">
                          <label>Activities / tasks</label>
                          <textarea
                            value={exp.tasks}
                            onChange={(e) => updateExperience(exp.id, "tasks", e.target.value)}
                            placeholder="One per line: managed stock checks; supervised team; handled customer issues"
                          />
                        </div>
                        <div className="field full">
                          <label>Achievements</label>
                          <textarea
                            value={exp.achievements}
                            onChange={(e) => updateExperience(exp.id, "achievements", e.target.value)}
                            placeholder="One per line: trained 4 new staff; improved delivery accuracy; reduced waiting times"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="btnrow" style={{ marginTop: "16px" }}>
                  <button className="ys-btn blue" onClick={addExperience} type="button">
                    + Add another employer
                  </button>
                  <button className="ys-btn white" onClick={() => handleOpenTab("education")} type="button">
                    Next: education
                  </button>
                </div>
              </div>
            )}

            {/* Tab Pane: Education */}
            {activeTab === "education" && (
              <div className="phase-pane active" id="pane-education">
                <h3>Education and qualifications</h3>
                <p className="phase-muted">Add institution, city/country, qualification type, status and exact start/end dates where possible.</p>
                
                <div className="dynamic-list" id="educationList">
                  {educations.map((edu, idx) => (
                    <div key={edu.id} className="dynamic-item edu">
                      <div className="item-head">
                        <b>Education {idx + 1}</b>
                        {educations.length > 1 && (
                          <button type="button" className="ys-btn white" onClick={() => removeEducation(edu.id)}>
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="form-grid">
                        <div className="field">
                          <label>Name of institution</label>
                          <input
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                            placeholder="e.g. University of Arad / College name"
                          />
                        </div>
                        <div className="field">
                          <label>Qualification</label>
                          <select
                            value={edu.qual}
                            onChange={(e) => updateEducation(edu.id, "qual", e.target.value)}
                          >
                            {qualificationOptions.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="field">
                          <label>Status</label>
                          <select
                            value={edu.status}
                            onChange={(e) => updateEducation(edu.id, "status", e.target.value)}
                          >
                            {statusOptions.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="field">
                          <label>City</label>
                          <input
                            value={edu.city}
                            onChange={(e) => updateEducation(edu.id, "city", e.target.value)}
                            placeholder="e.g. Arad"
                          />
                        </div>
                        <div className="field">
                          <label>Country</label>
                          <input
                            value={edu.country}
                            onChange={(e) => updateEducation(edu.id, "country", e.target.value)}
                            placeholder="e.g. Romania"
                          />
                        </div>
                        <div className="field">
                          <label>Start date</label>
                          <input
                            value={edu.start}
                            onChange={(e) => updateEducation(edu.id, "start", e.target.value)}
                            placeholder="dd/mm/yyyy"
                          />
                        </div>
                        <div className="field">
                          <label>End date</label>
                          <input
                            value={edu.end}
                            onChange={(e) => updateEducation(edu.id, "end", e.target.value)}
                            placeholder="dd/mm/yyyy"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="btnrow" style={{ marginTop: "16px" }}>
                  <button className="ys-btn blue" onClick={addEducation} type="button">
                    + Add education
                  </button>
                  <button className="ys-btn white" onClick={() => handleOpenTab("skills")} type="button">
                    Next: skills
                  </button>
                </div>
              </div>
            )}

            {/* Tab Pane: Skills */}
            {activeTab === "skills" && (
              <div className="phase-pane active" id="pane-skills">
                <h3>Skills library</h3>
                <p className="phase-muted">Choose a career area, then click keywords to add them to your CV. You can also type extra skills.</p>
                <div className="field">
                  <label>Career area</label>
                  <select value={careerArea} onChange={(e) => setCareerArea(e.target.value)}>
                    {Object.keys(skillsByArea).map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="chip-grid" id="skillChips" style={{ margin: "14px 0" }}>
                  {(skillsByArea[careerArea] || []).map((s) => {
                    const isActive = selectedSkills.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        className={`skill-chip ${isActive ? "active" : ""}`}
                        onClick={() => toggleSkill(s)}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>

                <div className="field full">
                  <label>Extra skills, separated by commas</label>
                  <textarea
                    value={extraSkills}
                    onChange={(e) => setExtraSkills(e.target.value)}
                    placeholder="Leadership, communication, problem solving..."
                  />
                </div>

                <div className="divider"></div>
                <div className="btnrow">
                  <button className="ys-btn orange" onClick={() => handleOpenModal("Save your CV")} type="button">
                    Save CV
                  </button>
                  <button className="ys-btn blue" onClick={() => handleOpenModal("Download your CV")} type="button">
                    Print / Download PDF
                  </button>
                  <button className="ys-btn white" onClick={() => handleOpenModal("Copy your CV text")} type="button">
                    Copy CV text
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* PREVIEW SIDEBAR & CHECKLIST PANEL */}
          <aside className="preview-card">
            
            {/* Score band circle */}
            <div className="score-band">
              <div className="score-circle" id="scoreCircle" style={{ "--score": scoreData.score } as React.CSSProperties}>
                <b>
                  <span id="cvScore">{scoreData.score}</span>
                </b>
              </div>
              <div>
                <h3 style={{ color: "#fff", margin: 0 }}>CV Strength</h3>
                <p style={{ margin: "4px 0 10px", color: "#cdd8e8", fontWeight: 800 }}>Updates while you complete the form.</p>
                <div className="meter">
                  <span id="cvMeter" style={{ width: `${scoreData.score}%` }}></span>
                </div>
              </div>
            </div>

            {/* Paper Preview area */}
            <div className="cv-paper print-area" id="cvPreview">
              <div className="cv-top">
                <h2>{name || "Your Name"}</h2>
                <div className="cv-title">{title || "Professional title"}</div>
                <div className="cv-contact">
                  {[
                    email,
                    phone,
                    [city, country].filter(Boolean).join(", ")
                  ]
                    .filter(Boolean)
                    .join(" · ") || "email · phone · city, country"}
                </div>
              </div>
              
              <div className="cv-body">
                {summary.trim() && (
                  <div className="cv-section">
                    <h3>Professional Profile</h3>
                    <p>{summary}</p>
                  </div>
                )}
                
                <div className="cv-section">
                  <h3>Professional Experience</h3>
                  {experiences.some((exp) => exp.employer.trim() || exp.title.trim()) ? (
                    experiences.map((exp, idx) => {
                      const tasks = parseLines(exp.tasks);
                      const achievements = parseLines(exp.achievements);
                      return (
                        <div key={idx} className="cv-item">
                          <strong>
                            {exp.title || "Job title"} · {exp.employer || "Employer"}
                          </strong>
                          <div className="cv-date">
                            {[exp.city, exp.country].filter(Boolean).join(", ")}
                            {(exp.city || exp.country) && (exp.start || exp.end) ? " · " : ""}
                            {[exp.start, exp.end].filter(Boolean).join(" – ")}
                          </div>
                          {tasks.length > 0 && (
                            <ul>
                              {tasks.map((t, tIdx) => (
                                <li key={tIdx}>{t}</li>
                              ))}
                            </ul>
                          )}
                          {achievements.length > 0 && (
                            <ul>
                              {achievements.map((ac, acIdx) => (
                                <li key={acIdx}>
                                  <b>Achievement:</b> {ac}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="phase-muted">Add employer details, dates and tasks.</p>
                  )}
                </div>

                <div className="cv-section">
                  <h3>Education</h3>
                  {educations.some((edu) => edu.institution.trim()) ? (
                    educations.map((edu, idx) => (
                      <div key={idx} className="cv-item">
                        <strong>
                          {edu.qual} · {edu.institution}
                        </strong>
                        <div className="cv-date">
                          {edu.status}
                          {(edu.city || edu.country) ? " · " + [edu.city, edu.country].filter(Boolean).join(", ") : ""}
                          {(edu.start || edu.end) ? " · " + [edu.start, edu.end].filter(Boolean).join(" – ") : ""}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="phase-muted">Add institution, qualification and status.</p>
                  )}
                </div>

                <div className="cv-section">
                  <h3>Key Skills</h3>
                  <p>
                    {[
                      ...selectedSkills,
                      ...extraSkills
                        .split(",")
                        .map((x) => x.trim())
                        .filter(Boolean)
                    ]
                      .filter((v, i, self) => self.indexOf(v) === i)
                      .join(" · ") || "Choose skills from the library."}
                  </p>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="checklist no-print" id="cvChecklist">
              {scoreData.checklist.map((item, idx) => (
                <div key={idx} style={{ display: "flex", gap: "8px", color: item.ok ? "#16a34a" : "#5d6b80" }}>
                  <span>{item.ok ? "✅" : "○"}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

          </aside>
        </div>

        {/* THREE CONVERSION CARDS */}
        {section3Data?.status !== false && (
          <div className="container conversion-grid" style={{ textAlign: "left" }}>
            <div className="conversion-card">
              <h3>{bottomCards[0]?.title}</h3>
              <p className="phase-muted">{bottomCards[0]?.description}</p>
            </div>
            <div className="conversion-card">
              <h3>{bottomCards[1]?.title}</h3>
              <p className="phase-muted">{bottomCards[1]?.description}</p>
              <button className="ys-btn orange" onClick={handlePrepareAdviser} type="button">
                Send to adviser
              </button>
            </div>
            <div className="conversion-card">
              <h3>{bottomCards[2]?.title}</h3>
              <p className="phase-muted">{bottomCards[2]?.description}</p>
              <Link className="ys-btn blue" href="/tools/personal-statement-calculator">
                Open Statement Builder
              </Link>
            </div>
          </div>
        )}

      </section>

      {/* ACCOUNT MODAL */}
      <div className={`account-modal ${showModal ? "open" : ""}`} id="accountModal">
        <div className="account-card">
          <span className="phase-eyebrow">Free YStudy account</span>
          <h2 id="modalTitle">{modalTitle}</h2>
          <p>Create a free account to save, download, copy or send your CV to an adviser. You can continue editing without an account.</p>
          <div className="btnrow" style={{ marginTop: "20px" }}>
            <Link className="ys-btn orange" href="/login">
              Create free account
            </Link>
            <button className="ys-btn white" onClick={() => setShowModal(false)} type="button">
              Continue editing
            </button>
          </div>
        </div>
      </div>

      {/* SAVE TOAST */}
      {toastMsg && (
        <div className="save-toast show" id="saveToast">
          {toastMsg}
        </div>
      )}
    </>
  );
}

export default CvBuilderWidget;
