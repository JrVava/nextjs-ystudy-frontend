import React from "react";

export interface QuickExplanationCard {
  number?: string;
  numbers?: string;
  title: string;
  description: string;
}

export interface QualificationQuickExplanationProps {
  sectionData?: {
    status?: boolean;
    badge?: string;
    title?: string;
    description?: string;
    cards?: QuickExplanationCard[];
  };
  fallbackBadge?: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackCards?: QuickExplanationCard[];
}

const DEFAULT_CARDS: QuickExplanationCard[] = [
  {
    number: "1",
    title: "What you study",
    description: "Subject-focused modules that build academic knowledge, practical skills and confidence for your next step."
  },
  {
    number: "2",
    title: "Who it suits",
    description: "Mature students, career changers and learners who want a recognised route without overcomplicating the decision."
  },
  {
    number: "3",
    title: "What you receive",
    description: "Recognised qualification when you complete the course, depending on provider rules and successful completion."
  },
  {
    number: "4",
    title: "Next step",
    description: "Use the qualification to progress academically, apply for work or top up where the route allows."
  }
];

export function QualificationQuickExplanation({
  sectionData,
  fallbackBadge = "Quick explanation",
  fallbackTitle,
  fallbackDescription = "Clear, practical and focused on what students need before applying.",
  fallbackCards = DEFAULT_CARDS
}: QualificationQuickExplanationProps) {
  if (sectionData?.status === false) {
    return null;
  }

  const badge = sectionData?.badge || fallbackBadge;
  const title = sectionData?.title || fallbackTitle || "What is this qualification?";
  const description = sectionData?.description || fallbackDescription;
  const cards = sectionData?.cards && sectionData.cards.length > 0 ? sectionData.cards : fallbackCards;

  return (
    <section className="qf-sec">
      <div className="qf" style={{ textAlign: "left" }}>
        <div className="qf-head">
          {badge && <span className="kicker">{badge}</span>}
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>
        <div className="qf-grid4">
          {cards.map((card, idx) => (
            <div className="fcard" key={idx}>
              <div className="n">{card.number || card.numbers || (idx + 1)}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default QualificationQuickExplanation;
