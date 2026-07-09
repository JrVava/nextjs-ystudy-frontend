"use client";

import { useState } from "react";
import { Toast } from "@/components/ui/Toast";

export default function EligibilityWidget() {
  const [age, setAge] = useState("25-40");
  const [residency, setResidency] = useState("3plus");
  const [previous, setPrevious] = useState("none");

  // Output states
  const [lbl, setLbl] = useState("You're likely eligible for");
  const [big, setBig] = useState("£14,135 + tuition");
  const [note, setNote] = useState("Based on a London away-from-home example. Final entitlement depends on your full SFE assessment.");
  
  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

    if (previous === "complete") {
      maintenance = 0;
      label = "Previous study risk";
      miniNote = "Previous higher education can affect tuition and maintenance entitlement. Check this before applying.";
    }

    if (age === "50plus" && eligible) {
      maintenance = 10830;
      miniNote = "Age and course type can affect funding. Check the full eligibility tool before applying.";
    }

    const moneyStr = "£" + Number(maintenance || 0).toLocaleString("en-GB");
    const bigStr = eligible && maintenance ? moneyStr + " + tuition" : "Speak to adviser";

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
      <div className="field">
        <label htmlFor="ysf-age">Your age</label>
        <select
          id="ysf-age"
          className="ysf-quick-select"
          data-ysf="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        >
          <option value="25-40">25–40</option>
          <option value="41-50">41–50</option>
          <option value="50plus">50+</option>
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
          <option value="3plus">3+ years</option>
          <option value="settled">Settled / ILR</option>
          <option value="under3">Under 3 years</option>
          <option value="notsure">Not sure</option>
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
          <option value="none">None / incomplete</option>
          <option value="some">Some previous study</option>
          <option value="complete">Completed degree</option>
          <option value="notsure">Not sure</option>
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
        <div className="big">{big}</div>
      </div>
      <div className="ysf-mini-note" style={{ marginTop: "12px", fontSize: "12.5px", color: "var(--muted)", fontWeight: 600 }}>
        {note}
      </div>
      
      <Toast
        message={toastMessage}
        visible={toastMessage !== null}
        onDismiss={() => setToastMessage(null)}
      />
    </div>
  );
}
