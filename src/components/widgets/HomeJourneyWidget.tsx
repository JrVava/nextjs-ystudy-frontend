"use client";

import { useEffect, useState } from "react";

interface Step {
  number: string;
  title: string;
  description: string;
}

interface HomeJourneyWidgetProps {
  changingCard?: Step[];
}

export default function HomeJourneyWidget({ changingCard }: HomeJourneyWidgetProps) {
  const defaultSteps: Step[] = [
    { number: "1", title: "Check if university fits your life", description: "Start with your work pattern, family time, travel and study confidence." },
    { number: "2", title: "Find the right course route", description: "Match subject, qualification level, study mode and location." },
    { number: "3", title: "Check your English level", description: "Understand whether you are ready for interview, study and assignments." },
    { number: "4", title: "Prepare for interview", description: "Know what universities usually ask and how to explain your goals." },
    { number: "5", title: "Apply with YStudy", description: "Send one short form and we help you move to the right next step." },
    { number: "6", title: "Plan Student Finance", description: "Check tuition, maintenance, evidence and likely payment route." },
    { number: "7", title: "Enrol with confidence", description: "Complete the final checks before your course starts." },
    { number: "8", title: "Get support while studying", description: "Use adviser support, tools and guidance when you need it." }
  ];

  const steps = changingCard && changingCard.length > 0 ? changingCard : defaultSteps;
  const [index, setIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % steps.length);
        setIsChanging(false);
      }, 180);
    }, 2600);

    return () => clearInterval(timer);
  }, [steps.length]);

  const currentStep = steps[index];

  return (
    <div className={`note-box home-journey-note ${isChanging ? "is-changing" : ""}`} style={{ marginBottom: "22px" }}>
      <b style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span
          className="home-journey-num"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "9px",
            background: "var(--b)",
            display: "grid",
            placeItems: "center",
            fontSize: "14px",
            color: "#fff"
          }}
        >
          {currentStep.number}
        </span>
        <span className="home-journey-title">{currentStep.title}</span>
      </b>
      <p className="home-journey-text">{currentStep.description}</p>
    </div>
  );
}
