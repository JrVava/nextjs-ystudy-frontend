import Link from "next/link";
import React from "react";

export interface ConversionCard {
  title: string;
  description: string;
}

export interface QualificationConversionCardsProps {
  sectionData?: {
    status?: boolean;
    cards?: ConversionCard[];
  };
  fallbackCards?: ConversionCard[];
}

const DEFAULT_CARDS: ConversionCard[] = [
  {
    title: "Check if you can get funded.",
    description: "Quickly understand if you may qualify for Student Finance, grants and flexible university routes."
  },
  {
    title: "Apply with YStudy.",
    description: "Send us your details and we'll help you choose the right course, prepare documents and move forward."
  },
  {
    title: "Speak with an adviser.",
    description: "Not sure what to study, what you can get or which documents you need? Book a free call."
  }
];

export function QualificationConversionCards({
  sectionData,
  fallbackCards = DEFAULT_CARDS
}: QualificationConversionCardsProps) {
  if (sectionData?.status === false) {
    return null;
  }

  const cards = sectionData?.cards && sectionData.cards.length > 0 ? sectionData.cards : fallbackCards;

  return (
    <section className="ys-conversion-system" aria-label="YStudy next steps">
      <div className="ys-conversion-wrap">
        {cards.map((c, idx) => {
          let theme = "dark";
          let btnLabel = "Book free call";
          let href = "/lead/adviser-call";

          if (idx === 0) {
            theme = "blue";
            btnLabel = "Check eligibility";
            href = "/tools/eligibility-checker";
          } else if (idx === 1) {
            theme = "orange";
            btnLabel = "Start application";
            href = "/apply";
          }

          return (
            <Link className={`ys-conversion-card ${theme}`} href={href} key={idx}>
              <div style={{ textAlign: "left" }}>
                <h2>{c.title}</h2>
                <p>{c.description}</p>
              </div>
              <span>{btnLabel}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default QualificationConversionCards;
