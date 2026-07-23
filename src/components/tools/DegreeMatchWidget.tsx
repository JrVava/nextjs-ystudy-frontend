"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./tools.css";

interface Option {
  emoji: string;
  title: string;
  desc: string;
}

const statusOpts: Option[] = [
  { emoji: "🇬🇧", title: "British citizen", desc: "Usually standard route" },
  { emoji: "✅", title: "Settled status", desc: "EU settlement route" },
  { emoji: "⏱️", title: "Pre-settled status", desc: "Needs careful review" },
  { emoji: "📋", title: "ILR", desc: "Permanent residence route" },
  { emoji: "🛟", title: "Refugee/protection", desc: "Specific support route" },
  { emoji: "❓", title: "Not sure", desc: "We will check" },
];

const qualificationOpts: Option[] = [
  { emoji: "🌱", title: "No formal qualifications", desc: "Foundation Year or Access route" },
  { emoji: "📝", title: "GCSEs / O-levels only", desc: "Foundation Year or Access route" },
  { emoji: "🎓", title: "A-levels / equivalent", desc: "Direct entry to many degrees" },
  { emoji: "📚", title: "Foundation Year / Access Diploma", desc: "Direct entry to many degrees" },
  { emoji: "⭐", title: "HNC, HND or DipHE", desc: "Often allows top-up" },
  { emoji: "🏆", title: "Bachelor's degree or higher", desc: "Postgraduate or conversion route" },
];

const subjectOpts: Option[] = [
  { emoji: "💼", title: "Business", desc: "Management, operations, HR" },
  { emoji: "💻", title: "Computing", desc: "IT, software, digital" },
  { emoji: "🏥", title: "Health & Care", desc: "Care, public health, leadership" },
  { emoji: "🧠", title: "Psychology", desc: "People, behaviour, research" },
  { emoji: "⚖️", title: "Law", desc: "Legal studies, compliance" },
  { emoji: "🏗️", title: "Construction", desc: "Project and site management" },
  { emoji: "📣", title: "Marketing", desc: "Digital, brand, content" },
  { emoji: "🌟", title: "Something else", desc: "Show me all options" },
];

const modeOpts: Option[] = [
  { emoji: "🏛️", title: "Full-time on campus", desc: "Quickest route" },
  { emoji: "⏰", title: "Part-time on campus", desc: "Typical for working adults" },
  { emoji: "💻", title: "Online", desc: "Maximum flexibility" },
  { emoji: "🔀", title: "Blended", desc: "Online + campus/weekends" },
  { emoji: "🤔", title: "Not sure yet", desc: "Show all options" },
];

const salaryOpts: Option[] = [
  { emoji: "🚀", title: "£25k–£35k", desc: "First professional step" },
  { emoji: "📈", title: "£35k–£50k", desc: "Management or specialist route" },
  { emoji: "🏆", title: "£50k+", desc: "Leadership, tech, project or professional route" },
  { emoji: "🤔", title: "Not sure", desc: "Show balanced options" },
];

const workOpts: Option[] = [
  { emoji: "💼", title: "Working full-time", desc: "Need flexible route" },
  { emoji: "🧾", title: "Working part-time", desc: "Study around work" },
  { emoji: "🔄", title: "Changing career", desc: "Need transition route" },
  { emoji: "🏠", title: "Parent/carer", desc: "Need flexible support" },
  { emoji: "🔍", title: "Not working right now", desc: "Need confidence and route advice" },
];

const ageOpts: Option[] = [
  { emoji: "🌱", title: "18–20", desc: "Early adult route" },
  { emoji: "🎯", title: "21–30", desc: "Mature student route" },
  { emoji: "💼", title: "31–40", desc: "Career progression route" },
  { emoji: "🚀", title: "41–50", desc: "Career change route" },
  { emoji: "⭐", title: "51+", desc: "Adviser review recommended" },
];

const englishOpts: Option[] = [
  { emoji: "🌱", title: "A1/A2", desc: "Speak to an adviser" },
  { emoji: "✅", title: "B1", desc: "Often enough for many foundation routes" },
  { emoji: "🎯", title: "B2", desc: "Likely interview confidence" },
  { emoji: "🏆", title: "C1/C2", desc: "Advanced confidence" },
  { emoji: "🤔", title: "Not sure", desc: "Take English checker" },
];

const incomeOpts: Option[] = [
  { emoji: "💷", title: "Under £25,000", desc: "Higher maintenance likely" },
  { emoji: "💷", title: "£25,000–£45,000", desc: "Above-average maintenance" },
  { emoji: "💷", title: "£45,000–£65,000", desc: "Reduced maintenance" },
  { emoji: "💷", title: "Over £65,000", desc: "Minimum maintenance" },
  { emoji: "🤐", title: "Prefer not to say", desc: "Show broad range" },
];

const careerchangeOpts: Option[] = [
  { emoji: "✅", title: "Yes", desc: "I want a different career" },
  { emoji: "📈", title: "Partly", desc: "I want progression" },
  { emoji: "❌", title: "No", desc: "I want qualification in current field" },
  { emoji: "🤔", title: "Not sure", desc: "Help me decide" },
];

const childrenOpts: Option[] = [
  { emoji: "👨👩👧", title: "Yes", desc: "Parent/carer support may matter" },
  { emoji: "❌", title: "No", desc: "Skip extra support" },
  { emoji: "🤔", title: "Prefer not to say", desc: "Keep it private" },
];

// Fallback / default stepper configuration matching degree-match.html structure
const defaultStepper = [
  {
    badge: "Question 1 of 12",
    title: "What is your residency status in the UK?",
    description: "This helps us include funding and route guidance.",
    step: statusOpts.map((o) => ({ title: o.title, description: o.desc, icon: o.emoji })),
  },
  {
    badge: "Question 2 of 12",
    title: "What is your highest qualification right now?",
    description: "Universities accept many entry routes — including none.",
    step: qualificationOpts.map((o) => ({ title: o.title, description: o.desc, icon: o.emoji })),
  },
  {
    badge: "Question 3 of 12",
    title: "Which subjects interest you most?",
    description: "Pick whatever feels right — you can change this later.",
    step: subjectOpts.map((o) => ({ title: o.title, description: o.desc, icon: o.emoji })),
  },
  {
    badge: "Question 4 of 12",
    title: "How would you like to study?",
    description: "Choose the pattern that fits work and family life.",
    step: modeOpts.map((o) => ({ title: o.title, description: o.desc, icon: o.emoji })),
  },
  {
    badge: "Question 5 of 12",
    title: "What salary level are you aiming for?",
    description: "This helps suggest degree routes linked to career progression.",
    step: salaryOpts.map((o) => ({ title: o.title, description: o.desc, icon: o.emoji })),
  },
  {
    badge: "Question 6 of 12",
    title: "What is your work situation?",
    description: "Work experience can strengthen applications.",
    step: workOpts.map((o) => ({ title: o.title, description: o.desc, icon: o.emoji })),
  },
  {
    badge: "Question 7 of 12",
    title: "What age range are you in?",
    description: "YStudy is built for mature students and adults returning to education.",
    step: ageOpts.map((o) => ({ title: o.title, description: o.desc, icon: o.emoji })),
  },
  {
    badge: "Question 8 of 12",
    title: "How confident is your English?",
    description: "This is about interview confidence, not perfection.",
    step: englishOpts.map((o) => ({ title: o.title, description: o.desc, icon: o.emoji })),
  },
  {
    badge: "Question 9 of 12",
    title: "Household income estimate?",
    description: "Used only to estimate maintenance support.",
    step: incomeOpts.map((o) => ({ title: o.title, description: o.desc, icon: o.emoji })),
  },
  {
    badge: "Question 10 of 12",
    title: "Are you changing career?",
    description: "This helps shape your recommended route.",
    step: careerchangeOpts.map((o) => ({ title: o.title, description: o.desc, icon: o.emoji })),
  },
  {
    badge: "Question 11 of 12",
    title: "Do you have children or caring responsibilities?",
    description: "Some grants and flexible routes may be relevant.",
    step: childrenOpts.map((o) => ({ title: o.title, description: o.desc, icon: o.emoji })),
  },
  {
    badge: "Final step",
    title: "Where should we send your degree match?",
    description: "Your result is ready. Enter your details to see the recommendation, save it to your dashboard and share it with an adviser.",
    step: [],
  },
];

const stepCategoryMap = [
  "status",
  "qualification",
  "subject",
  "mode",
  "salary",
  "work",
  "age",
  "english",
  "income",
  "careerchange",
  "children",
];

export interface DegreeMatchWidgetProps {
  sectionData?: {
    status?: boolean;
    title?: string;
    description?: string;
    stepper?: Array<{
      badge: string;
      title: string;
      description: string;
      step?: Array<{ title: string; description?: string; icon?: string }>;
      setp?: Array<{ title: string; description?: string; icon?: string }>;
    }>;
  };
}

export function DegreeMatchWidget({ sectionData }: DegreeMatchWidgetProps) {
  if (sectionData?.status === false) {
    return null;
  }

  // Quiz step & answers states
  const [step, setStep] = useState<number>(0);
  const [status, setStatus] = useState("");
  const [qualification, setQualification] = useState("");
  const [subject, setSubject] = useState("");
  const [mode, setMode] = useState("");
  const [salary, setSalary] = useState("");
  const [work, setWork] = useState("");
  const [age, setAge] = useState("");
  const [english, setEnglish] = useState("");
  const [income, setIncome] = useState("");
  const [careerchange, setCareerchange] = useState("");
  const [children, setChildren] = useState("");

  // Lead capture states
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [callTime, setCallTime] = useState("Anytime");
  const [agreeContact, setAgreeContact] = useState(false);

  // Result display state
  const [showResult, setShowResult] = useState(false);

  // Recommendations calculated values
  const [degreeResultTitle, setDegreeResultTitle] = useState("");
  const [degreeResultText, setDegreeResultText] = useState("");
  const [routeText, setRouteText] = useState("");
  const [fundingText, setFundingText] = useState("Likely");

  // Get active stepper data from props (CMS integration) or fallback
  const stepperData = sectionData?.stepper && sectionData.stepper.length > 0 ? sectionData.stepper : defaultStepper;
  const currentStepData = stepperData[step] || stepperData[stepperData.length - 1];

  // Safely extract options array handling step/setp key naming variants
  const options = currentStepData.step || (currentStepData as any).setp || [];

  const getSelectedValue = (stepIndex: number) => {
    switch (stepIndex) {
      case 0: return status;
      case 1: return qualification;
      case 2: return subject;
      case 3: return mode;
      case 4: return salary;
      case 5: return work;
      case 6: return age;
      case 7: return english;
      case 8: return income;
      case 9: return careerchange;
      case 10: return children;
      default: return "";
    }
  };

  const handleSelectOption = (category: string, value: string) => {
    if (category === "status") setStatus(value);
    if (category === "qualification") setQualification(value);
    if (category === "subject") setSubject(value);
    if (category === "mode") setMode(value);
    if (category === "salary") setSalary(value);
    if (category === "work") setWork(value);
    if (category === "age") setAge(value);
    if (category === "english") setEnglish(value);
    if (category === "income") setIncome(value);
    if (category === "careerchange") setCareerchange(value);
    if (category === "children") setChildren(value);

    // Auto progress after a short delay (200ms) to enhance UX
    if (step < 11) {
      setTimeout(() => {
        setStep((prev) => prev + 1);
      }, 200);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const pickDegree = (subj: string) => {
    const s = subj || "Business";
    if (s.includes("Computing")) {
      return ["Computing / IT Degree", "Direct or foundation route depending on qualifications"];
    }
    if (s.includes("Health")) {
      return ["Health & Social Care Degree", "Adult-friendly route with flexible study options"];
    }
    if (s.includes("Psychology")) {
      return ["Psychology Degree", "Good route for people-focused careers"];
    }
    if (s.includes("Law")) {
      return ["Law Degree", "Adviser review recommended for English and route fit"];
    }
    if (s.includes("Construction")) {
      return ["Construction Management Degree", "Strong route for site, project and QS careers"];
    }
    if (s.includes("Marketing")) {
      return ["Marketing Degree", "Digital and business-facing career route"];
    }
    return ["Business Management Degree", "Flexible route for management, operations and career progression"];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check validity of the form (handled by standard HTML5 validation on submit click)
    const form = e.currentTarget as HTMLFormElement;
    if (!form.checkValidity()) {
      return;
    }

    // Determine results
    const d = pickDegree(subject);
    const isFoundation = qualification.includes("No") || qualification.includes("GCSE");
    const routeSuffix = isFoundation ? "with Foundation Year" : "recommended route";

    const finalTitle = `${d[0]} ${routeSuffix}`;
    const finalDesc = d[1];
    const finalRouteText = isFoundation
      ? "Foundation Year route — built for students without Level 3 or who need a safer entry route."
      : "Direct / tailored entry route — adviser checks documents, provider fit and funding.";
    const finalFunding = status === "Pre-settled status" || status === "Not sure" ? "Review" : "Likely";

    setDegreeResultTitle(finalTitle);
    setDegreeResultText(finalDesc);
    setRouteText(finalRouteText);
    setFundingText(finalFunding);

    // Save to local storage matching prototype schema
    const answersObj = {
      status,
      qualification,
      subject,
      mode,
      salary,
      work,
      age,
      english,
      income,
      careerchange,
      children,
      firstName,
      email,
      phone,
      callTime,
      agreeContact,
    };

    localStorage.setItem(
      "ystudy_degree_match",
      JSON.stringify({
        savedAt: new Date().toISOString(),
        answers: answersObj,
        recommendation: finalTitle,
      })
    );

    // Transition to result screen
    setShowResult(true);

    // Trigger save callback if defined
    setTimeout(() => {
      if (typeof window !== "undefined" && (window as any).ystudySaveCurrentTool) {
        (window as any).ystudySaveCurrentTool();
      }
    }, 120);
  };

  // Calculate progress width (0% to 100%)
  const progressWidth = showResult ? 100 : (step / 12) * 100;

  return (
    <section className="section" id="match">
      <div className="container funnel-shell">
        <div className="wizard-wrap" id="degreeWizard">
          
          {/* Progress bar */}
          <div className="wizard-progress">
            <span style={{ width: `${progressWidth}%` }}></span>
          </div>

          {!showResult ? (
            <>
              {step < 11 ? (
                /* Dynamic quiz steps 0 to 10 */
                <div className="wizard-step active" data-step={step}>
                  <div className="wizard-kicker">{currentStepData.badge}</div>
                  <h2>{currentStepData.title}</h2>
                  <p>{currentStepData.description}</p>
                  
                  <div className={step === 2 ? "choice-grid" : "option-list"} data-name={stepCategoryMap[step]}>
                    {options.map((opt: any) => {
                      const isSelected = getSelectedValue(step) === opt.title;
                      return (
                        <button
                          key={opt.title}
                          type="button"
                          className={`option-card ${isSelected ? "selected" : ""}`}
                          onClick={() => handleSelectOption(stepCategoryMap[step], opt.title)}
                        >
                          {opt.icon && <span className="option-emoji">{opt.icon}</span>}
                          <span>
                            <b>{opt.title}</b>
                            {opt.description && <small>{opt.description}</small>}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Step 11: Lead capture Form */
                <div className="wizard-step active" data-step="11">
                  <div className="wizard-kicker">{currentStepData.badge}</div>
                  <h2>{currentStepData.title}</h2>
                  <p>{currentStepData.description}</p>
                  <form id="leadCaptureForm" onSubmit={handleSubmit} className="lead-mini-form">
                    <label>
                      First name
                      <input
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="e.g. Sarah"
                        required
                      />
                    </label>
                    <label>
                      Email
                      <input
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        type="email"
                      />
                    </label>
                    <label>
                      Phone / WhatsApp
                      <input
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="07XXX XXX XXX"
                      />
                    </label>
                    <label>
                      Best time to call
                      <select name="callTime" value={callTime} onChange={(e) => setCallTime(e.target.value)}>
                        <option>Anytime</option>
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>Evening</option>
                        <option>WhatsApp first</option>
                      </select>
                    </label>
                    <label className="full legal-note">
                      <input
                        required
                        type="checkbox"
                        checked={agreeContact}
                        onChange={(e) => setAgreeContact(e.target.checked)}
                      />{" "}
                      I agree to be contacted by YStudy about suitable course and funding options.
                    </label>
                  </form>
                </div>
              )}

              {/* Wizard Actions block */}
              <div className="wizard-actions">
                <button
                  type="button"
                  className="wizard-back"
                  onClick={handleBack}
                  style={{ visibility: step > 0 ? "visible" : "hidden" }}
                >
                  ‹ Back
                </button>
                
                {step === 11 ? (
                  <button
                    type="submit"
                    form="leadCaptureForm"
                    className="btn btn-blue wizard-next"
                  >
                    See my result →
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-blue wizard-next"
                    disabled
                  >
                    Continue →
                  </button>
                )}
              </div>
            </>
          ) : (
            
            /* RESULT SCREEN */
            <div className="result-screen show">
              <span className="kicker">Your degree match</span>
              <h2 id="degreeResultTitle">{degreeResultTitle}</h2>
              <p id="degreeResultText">{degreeResultText}</p>
              
              <div className="result-card-big">
                <h3>Recommended route</h3>
                <p id="routeText">{routeText}</p>
                <div className="result-grid">
                  <div className="result-mini">
                    <strong id="matchScore">92%</strong>
                    <span>Match score</span>
                  </div>
                  <div className="result-mini">
                    <strong>£24k–£55k+</strong>
                    <span>Typical salary range</span>
                  </div>
                  <div className="result-mini">
                    <strong id="fundingText">{fundingText}</strong>
                    <span>Funding route</span>
                  </div>
                </div>
                <div className="btnrow">
                  <Link className="btn btn-orange" href="/apply">
                    Apply with YStudy
                  </Link>
                  <Link className="btn btn-white" href="/lead/adviser-call">
                    Book Adviser Call
                  </Link>
                  <Link className="btn btn-blue" href="/dashboard">
                    Save to dashboard
                  </Link>
                </div>
              </div>

              <div className="command-centre">
                <h3>Useful next actions</h3>
                <div className="command-grid">
                  <Link className="command-card primary" href="/tools/eligibility-checker">
                    ✅ Check funding
                  </Link>
                  <Link className="command-card" href="/tools/english-level-checker">
                    🇬🇧 English interview check
                  </Link>
                  <Link className="command-card" href="/degrees">
                    🎓 Browse degrees
                  </Link>
                  <Link className="command-card" href="/guides">
                    📚 Read guides
                  </Link>
                </div>
              </div>

              {/* Optional start over button to enhance UX */}
              <div style={{ marginTop: "24px", textAlign: "center" }}>
                <button
                  type="button"
                  className="ys-btn white"
                  onClick={() => {
                    setShowResult(false);
                    setStep(0);
                    setStatus("");
                    setQualification("");
                    setSubject("");
                    setMode("");
                    setSalary("");
                    setWork("");
                    setAge("");
                    setEnglish("");
                    setIncome("");
                    setCareerchange("");
                    setChildren("");
                    setFirstName("");
                    setEmail("");
                    setPhone("");
                    setCallTime("Anytime");
                    setAgreeContact(false);
                  }}
                >
                  Start over
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default DegreeMatchWidget;
