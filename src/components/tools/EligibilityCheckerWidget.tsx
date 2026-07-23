"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import "./tools.css";

interface Option {
  title: string;
  icon: string;
  description: string;
}

interface Step {
  badge: string;
  title: string;
  description: string;
  name: string;
  options: Option[];
}

const fallbackSteps: Step[] = [
  {
    badge: "Question 1 of 5",
    title: "What's your residency status?",
    description: "This helps us understand the likely funding route.",
    name: "status",
    options: [
      { title: "British citizen", icon: "🇬🇧", description: "Born in the UK or naturalised" },
      { title: "EU Settled Status", icon: "✅", description: "Granted under the EU Settlement Scheme" },
      { title: "EU Pre-settled Status", icon: "⏱️", description: "Needs a careful funding review" },
      { title: "Indefinite Leave to Remain", icon: "📋", description: "Often eligible if residency rules are met" },
      { title: "Refugee / protection route", icon: "🛟", description: "Specific support route" },
      { title: "Something else / not sure", icon: "❓", description: "We'll help you figure it out" }
    ]
  },
  {
    badge: "Question 2 of 5",
    title: "Have you studied before?",
    description: "Previous higher education can affect funding.",
    name: "previous",
    options: [
      { title: "No previous higher education", icon: "🌱", description: "Usually the simplest route" },
      { title: "Started but did not finish", icon: "↩️", description: "May need adviser review" },
      { title: "HND, DipHE or equivalent", icon: "⭐", description: "Top-up or previous study rules may apply" },
      { title: "Bachelor's degree or higher", icon: "🏆", description: "Funding may be limited for another undergraduate degree" },
      { title: "Not sure", icon: "🤔", description: "Adviser check recommended" }
    ]
  },
  {
    badge: "Question 3 of 5",
    title: "How would you like to study?",
    description: "Study mode can affect funding and course choice.",
    name: "mode",
    options: [
      { title: "Full-time campus/blended", icon: "🏛️", description: "Most common undergraduate route" },
      { title: "Part-time", icon: "⏰", description: "Good for working adults" },
      { title: "Online", icon: "💻", description: "Flexible remote learning" }
    ]
  }
];

const incomeStep: Step = {
  badge: "Question 4 of 5",
  title: "Household income estimate?",
  description: "Used only to estimate maintenance support.",
  name: "income",
  options: [
    { title: "Under £25,000", icon: "💷", description: "Higher maintenance support likely" },
    { title: "£25,000–£45,000", icon: "💷", description: "Above-average maintenance support" },
    { title: "£45,000–£65,000", icon: "💷", description: "Reduced maintenance support" },
    { title: "Over £65,000", icon: "💷", description: "Minimum maintenance may apply" },
    { title: "Prefer not to say", icon: "🤐", description: "We'll show a broad range" }
  ]
};

export interface EligibilityCheckerWidgetProps {
  sectionData?: {
    status?: boolean;
    steps?: Array<{
      badge: string;
      title: string;
      description: string;
      name: string;
      options: Array<{
        title: string;
        icon: string;
        description: string;
      }>;
    }>;
  };
}

export function EligibilityCheckerWidget({ sectionData }: EligibilityCheckerWidgetProps) {
  if (sectionData?.status === false) {
    return null;
  }

  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  // Lead info
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [callTime, setCallTime] = useState("Anytime");
  const [agree, setAgree] = useState(false);

  const [showResult, setShowResult] = useState<boolean>(false);

  const stepsList = useMemo(() => {
    let cmsSteps: Step[] = [];
    if (sectionData?.steps && Array.isArray(sectionData.steps)) {
      cmsSteps = sectionData.steps.map((s) => ({
        badge: s.badge,
        title: s.title,
        description: s.description,
        name: s.name,
        options: (s.options || []).map((o) => ({
          title: o.title,
          icon: o.icon,
          description: o.description
        }))
      }));
    } else {
      cmsSteps = fallbackSteps;
    }
    // Append Question 4 (income) and Question 5 (lead mini form)
    return [...cmsSteps, incomeStep];
  }, [sectionData]);

  const handleSelectOption = (name: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [name]: value }));
    setTimeout(() => {
      if (step < stepsList.length) {
        setStep((prev) => prev + 1);
      }
    }, 220);
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (step === stepsList.length) {
      // Final form validation
      if (!firstName.trim() || !email.trim() || !agree) {
        alert("Please complete the required fields and accept the terms.");
        return;
      }
      
      const fullAnswers = {
        ...answers,
        firstName,
        email,
        phone,
        callTime
      };

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "ystudy_funding_profile",
          JSON.stringify({
            savedAt: new Date().toISOString(),
            answers: fullAnswers
          })
        );
      }

      setShowResult(true);
      setTimeout(() => {
        if (typeof window !== "undefined" && (window as any).ystudySaveCurrentTool) {
          (window as any).ystudySaveCurrentTool();
        }
      }, 120);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const isNextDisabled = useMemo(() => {
    if (step < stepsList.length) {
      const activeStepName = stepsList[step].name;
      return !answers[activeStepName];
    }
    // Step 5 (lead form) requires first name, email and checkbox agreement
    return !firstName.trim() || !email.trim() || !agree;
  }, [step, answers, firstName, email, agree, stepsList]);

  // Risk logic exactly matching mockup
  const riskType = useMemo(() => {
    const isCheck =
      answers.status === "EU Pre-settled Status" ||
      answers.status === "Something else / not sure" ||
      answers.previous === "Bachelor's degree or higher" ||
      answers.mode === "Online";
    return isCheck ? "Adviser check" : "Likely";
  }, [answers]);

  return (
    <section className="section" id="checker">
      <div className="container funnel-shell">
        <div className="wizard-wrap" id="eligibilityWizard" style={{ textAlign: "left" }}>
          
          {/* Progress bar */}
          <div className="wizard-progress">
            <span style={{ width: `${((step) / (stepsList.length + 1)) * 100}%` }}></span>
          </div>

          {!showResult ? (
            <>
              {/* STEPS 0 to 3 (Option selection steps) */}
              {step < stepsList.length && (
                <div className="wizard-step active" data-step={step}>
                  <div className="wizard-kicker">{stepsList[step].badge}</div>
                  <h2>{stepsList[step].title}</h2>
                  <p>{stepsList[step].description}</p>
                  
                  <div className="option-list" data-name={stepsList[step].name}>
                    {stepsList[step].options.map((opt, oIdx) => {
                      const isSelected = answers[stepsList[step].name] === opt.title;
                      return (
                        <button
                          key={oIdx}
                          className={`option-card ${isSelected ? "selected" : ""}`}
                          onClick={() => handleSelectOption(stepsList[step].name, opt.title)}
                          type="button"
                        >
                          <span className="option-emoji">{opt.icon}</span>
                          <span>
                            <b>{opt.title}</b>
                            <small>{opt.description}</small>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4 (Lead Form Step) */}
              {step === stepsList.length && (
                <div className="wizard-step active" data-step={step}>
                  <div className="wizard-kicker">Final step</div>
                  <h2>Where should we send your report?</h2>
                  <p>Your funding snapshot is ready. Enter your details to see it, save it and share it with an adviser.</p>
                  
                  <form className="lead-mini-form" onSubmit={(e) => e.preventDefault()}>
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
                      <select
                        name="callTime"
                        value={callTime}
                        onChange={(e) => setCallTime(e.target.value)}
                      >
                        <option value="Anytime">Anytime</option>
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                      </select>
                    </label>
                    <label className="full legal-note">
                      <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        required
                      />{" "}
                      I’d like YStudy to contact me about eligibility and university options.
                    </label>
                    <Link className="wa-card full" href="/lead/adviser-call">
                      💬 Prefer to chat? Message us on WhatsApp
                    </Link>
                  </form>
                </div>
              )}

              {/* Action Buttons */}
              <div className="wizard-actions">
                <button
                  className="wizard-back"
                  onClick={handleBack}
                  style={{ visibility: step > 0 ? "visible" : "hidden" }}
                >
                  ‹ Back
                </button>
                <button
                  className="btn btn-blue wizard-next"
                  disabled={isNextDisabled}
                  onClick={handleNext}
                >
                  {step === stepsList.length ? "See my result →" : "Continue →"}
                </button>
              </div>
            </>
          ) : (
            
            /* RESULTS SCREEN */
            <div className="result-screen show">
              <span className="kicker">Your funding snapshot</span>
              <h2>
                {riskType === "Likely" ? "Likely standard funding route" : "Funding route needs adviser review"}
              </h2>
              <p>
                Based on <strong>{answers.status || "your status"}</strong>, <strong>{answers.mode || "your study mode"}</strong> and <strong>{answers.previous || "previous study"}</strong>.
              </p>
              
              <div className="result-card-big">
                <h3 id="eligResultTitle">
                  {riskType === "Likely" ? "Likely standard funding route" : "Funding route needs adviser review"}
                </h3>
                <p id="eligResultText">
                  {riskType === "Likely"
                    ? "Your answers suggest tuition and maintenance funding may be possible, but an adviser should check the details."
                    : "Student Finance depends on detailed residency, course and previous study rules. Use this as a guide, not a guarantee."}
                </p>
                
                <div className="result-grid">
                  <div className="result-mini">
                    <strong>£9,535</strong>
                    <span>Tuition Fee Loan max</span>
                  </div>
                  <div className="result-mini">
                    <strong id="maintenanceMini">£13k+</strong>
                    <span>Maintenance estimate</span>
                  </div>
                  <div className="result-mini">
                    <strong id="riskMini">{riskType}</strong>
                    <span>Funding confidence</span>
                  </div>
                </div>

                <div className="btnrow" style={{ marginTop: "24px" }}>
                  <Link className="btn btn-orange" href="/apply">
                    Apply with YStudy
                  </Link>
                  <Link className="btn btn-white" href="/lead/adviser-call">
                    Book Adviser Call
                  </Link>
                  <button className="btn btn-blue" onClick={() => {
                    setShowResult(false);
                    setStep(0);
                    setAnswers({});
                    setFirstName("");
                    setEmail("");
                    setPhone("");
                    setAgree(false);
                  }}>
                    Start over
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

export default EligibilityCheckerWidget;
