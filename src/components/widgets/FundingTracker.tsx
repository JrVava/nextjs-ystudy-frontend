"use client";

import React, { useState, useEffect } from "react";

interface ChecklistStep {
  title: string;
  description: string;
}

interface TrackerState {
  tag: string;
  now: string;
  hint: string;
}

const STEPS: ChecklistStep[] = [
  { title: "Create your SFE account", description: "Register on your regional Student Finance service." },
  { title: "Submit your application", description: "Apply online — even before your place is confirmed." },
  { title: "Send your evidence", description: "Upload identity, residency and any income documents." },
  { title: "SFE assessment", description: "They check your details and confirm your entitlement." },
  { title: "Enrol and get paid", description: "Your provider confirms attendance; funding is released." }
];

const STATES: TrackerState[] = [
  { tag: "Not started", now: "Let's get your funding moving", hint: "Tap the first step when you've created your Student Finance account." },
  { tag: "Getting started", now: "Account created — keep going", hint: "Next: submit your application, even before your place is confirmed." },
  { tag: "Application in", now: "Application submitted", hint: "Next: send any evidence SFE asks for, all in one go." },
  { tag: "Evidence sent", now: "Evidence with SFE", hint: "Next: SFE assesses your application and confirms your amounts." },
  { tag: "Almost there", now: "Assessment complete", hint: "Final step: enrol so your provider can trigger payment." },
  { tag: "All done", now: "You're fully set up 🎉", hint: "Your funding is in motion. Keep your contact details current with SFE." }
];

const CIRCUMFERENCE = 326.7;

export function FundingTracker() {
  const [doneCount, setDoneCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ystudy_funding_tracker_done");
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= STEPS.length) {
        setDoneCount(parsed);
      }
    }
    setIsLoaded(true);
  }, []);

  const handleStepClick = (index: number) => {
    const newDone = index < doneCount ? index : index + 1;
    setDoneCount(newDone);
    localStorage.setItem("ystudy_funding_tracker_done", newDone.toString());
  };

  const handleReset = () => {
    setDoneCount(0);
    localStorage.setItem("ystudy_funding_tracker_done", "0");
  };

  const fraction = doneCount / STEPS.length;
  const strokeDashoffset = CIRCUMFERENCE * (1 - fraction);
  const percentage = Math.round(fraction * 100);
  const currentState = STATES[doneCount];

  // Prevent SSR mismatch by rendering a consistent structure before client-side hydration
  return (
    <div className="sft" id="sftracker">
      <div className="sft-head">
        <div className="sft-ring">
          <svg height="120" viewBox="0 0 120 120" width="120">
            <circle cx="60" cy="60" fill="none" r="52" stroke="rgba(255,255,255,0.12)" strokeWidth="12"></circle>
            <circle
              cx="60"
              cy="60"
              fill="none"
              r="52"
              stroke="url(#sftG)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={isLoaded ? strokeDashoffset : CIRCUMFERENCE}
              style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)" }}
              transform="rotate(-90 60 60)"
            ></circle>
            <defs>
              <linearGradient id="sftG" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#1263ff"></stop>
                <stop offset="1" stopColor="#ff7a1a"></stop>
              </linearGradient>
            </defs>
          </svg>
          <div className="sft-ring-num">
            <strong>
              {isLoaded ? `${percentage}%` : "0%"}
            </strong>
            <span>
              complete
            </span>
          </div>
        </div>
        <div className="sft-status">
          <span className="sft-stage-tag">
            {isLoaded ? currentState.tag : STATES[0].tag}
          </span>
          <h3>
            {isLoaded ? currentState.now : STATES[0].now}
          </h3>
          <p>
            {isLoaded ? currentState.hint : STATES[0].hint}
          </p>
        </div>
      </div>

      <div className="sft-list">
        {STEPS.map((step, idx) => {
          const isDone = isLoaded && idx < doneCount;
          const isNext = isLoaded && idx === doneCount;

          return (
            <button
              key={idx}
              className={`sft-item ${isDone ? "done" : ""} ${isNext ? "next" : ""}`}
              onClick={() => handleStepClick(idx)}
              type="button"

            >
              <span
                className="sft-check"

              >
                {isDone ? "✓" : idx + 1}
              </span>
              <span className="sft-body">
                <h4
                  style={{
                    fontSize: "16px",
                    margin: "0 0 3px",
                    fontWeight: 850,
                    color: "#fff",
                    textDecoration: isDone ? "line-through" : "none"
                  }}
                >
                  {step.title}
                </h4>
                <p >
                  {step.description}
                </p>
              </span>
            </button>
          );
        })}
      </div>

      <button
        className="sft-reset"
        onClick={handleReset}
        type="button"

        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.16)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")}
      >
        Reset tracker
      </button>
    </div>
  );
}

export default FundingTracker;
