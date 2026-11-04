"use client";

import { useState, useEffect } from "react";
import { Toast } from "@/components/ui/Toast";

export default function EligibilityWidget() {
  const [mounted, setMounted] = useState(false);
  const [age, setAge] = useState("18 to 21");
  const [residency, setResidency] = useState("British");
  const [previous, setPrevious] = useState("No Previous Qualifications");

  // Defer render until after hydration to prevent browser-extension-caused mismatches.
  useEffect(() => {
    setMounted(true);
  }, []);

  const [lbl, setLbl] = useState("You're likely eligible for");
  const [big, setBig] = useState("Most Likely eligible for Student Finance");
  const [note, setNote] = useState("Based on a London away-from-home example. Final entitlement depends on your full SFE assessment.");

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const previousMessages: Record<string, string> = {
    "No Previous Qualifications": "Most Likely eligible for Student Finance",
    "School or College (Level 1–3)": "Most likely eligible for Student finance",
    "Higher Education – Not Completed":
      "May be eligible for Student finance - check with a student advisor for eligible courses",
    "Higher Education – Completed": "Check with a student advisor for eligible courses",
    "Not Sure": "Check with a student advisor for eligible courses",
  };

  const calculate = () => {
    let tuition = 9790;
    let maintenance = 14135;
    let eligible = true;
    let label = "You're likely eligible for";
    let miniNote = "Based on a London away-from-home example. Final entitlement depends on your full SFE assessment.";

    if (residency === "under3") {
      eligible = false;
      maintenance = 0;
      label = "Needs adviser check";
      miniNote = "Less than 3 years UK residence can be complex. Speak to an adviser before applying.";
    }

    if (age === "50plus" && eligible) {
      maintenance = 10830;
      miniNote = "Age and course type can affect funding. Check the full eligibility tool before applying.";
    }

    const bigStr = previousMessages[previous] ?? "Check with a student advisor for eligible courses";

    setLbl(label);
    setBig(bigStr);
    setNote(miniNote);

    // Save to localStorage
    try {
      localStorage.setItem(
        "ystudyFundingEstimate",
        JSON.stringify({
          savedAt: new Date().toISOString(),
          source: "home quick funding",
          age,
          residency,
          previous,
          tuition,
          maintenance,
          eligible,
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheck = () => {
    calculate();
    setToastMessage("Estimate updated and saved to your dashboard.");
  };

  return (
    <div className="widget" data-ysf-scope="home">
      {!mounted ? null : (
        <>
          <div className="field">
            <label htmlFor="ysf-age">Your age</label>
            <select
              id="ysf-age"
              className="ysf-quick-select"
              data-ysf="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            >
              <option value="18 to 21">18 to 21</option>
              <option value="21 to 25">21 to 25</option>
              <option value="25 to 59">25 to 59</option>
              <option value="60+">60+</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="ysf-residency">UK residency</label>
            <select
              id="ysf-residency"
              className="ysf-quick-select"
              data-ysf="residency"
              value={residency}
              onChange={(e) => setResidency(e.target.value)}
            >
              <option value="British">British</option>
              <option value="EU Settle">EU Settle</option>
              <option value="EU Pre Settled">EU Pre Settled</option>
              <option value="Indefinite Leave to Remain (ILR)">Indefinite Leave to Remain (ILR)</option>
              <option value="Refugee">Refugee</option>
              <option value="Other Status(usually temporary visas)">Other Status(usually temporary visas)</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="ysf-previous">Previous higher education</label>
            <select
              id="ysf-previous"
              className="ysf-quick-select"
              data-ysf="previous"
              value={previous}
              onChange={(e) => setPrevious(e.target.value)}
            >
              <option value="No Previous Qualifications">No Previous Qualifications</option>
              <option value="School or College (Level 1–3)">School or College (Level 1–3)</option>
              <option value="Higher Education – Not Completed">Higher Education – Not Completed</option>
              <option value="Higher Education – Completed">Higher Education – Completed</option>
              <option value="Not Sure">Not Sure</option>
            </select>
          </div>
          <button
            className="btn orange ysf-quick-button"
            style={{ width: "100%" }}
            type="button"
            onClick={handleCheck}
          >
            Check eligibility →
          </button>
          <div className="result">
            <div className="lbl">{lbl}</div>
            <div className="big" style={{ fontSize: "1.35rem", fontWeight: 700, lineHeight: 1.3 }}>{big}</div>
          </div>
          <div className="ysf-mini-note" style={{ marginTop: "12px", fontSize: "12.5px", color: "var(--muted)", fontWeight: 600 }}>
            {note}
          </div>

          <Toast
            message={toastMessage}
            visible={toastMessage !== null}
            onDismiss={() => setToastMessage(null)}
          />
        </>
      )}
    </div>
  );
}
