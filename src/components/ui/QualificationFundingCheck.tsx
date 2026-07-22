import Link from "next/link";
import React from "react";

export interface FundingCard {
  title?: string;
  cost?: string;
  description: string;
}

export interface QualificationFundingCheckProps {
  sectionData?: {
    status?: boolean;
    badge?: string;
    title?: string;
    cards?: FundingCard[];
  };
  fallbackBadge?: string;
  fallbackTitle?: string;
  fallbackCards?: FundingCard[];
  buttonText?: string;
  buttonHref?: string;
}

const DEFAULT_CARDS: FundingCard[] = [
  { title: "Tuition", description: "May be covered if the course is designated." },
  { title: "Living costs", description: "Depends on mode, intensity, residence and course type." },
  { title: "Previous study", description: "Must be checked before applying." },
  { title: "Adviser", description: "Free eligibility review before submission." }
];

export function QualificationFundingCheck({
  sectionData,
  fallbackBadge = "Funding check",
  fallbackTitle = "Can Student Finance support this route?",
  fallbackCards = DEFAULT_CARDS,
  buttonText = "Estimate funding →",
  buttonHref = "/tools/finance-calculator"
}: QualificationFundingCheckProps) {
  if (sectionData?.status === false) {
    return null;
  }

  const badge = sectionData?.badge || fallbackBadge;
  const title = sectionData?.title || fallbackTitle;
  const cards = sectionData?.cards && sectionData.cards.length > 0 ? sectionData.cards : fallbackCards;

  return (
    <section className="qf-sec">
      <div className="qf">
        <div className="qf-fund" style={{ textAlign: "left" }}>
          <div className="qf-fund-in">
            {badge && <span className="kicker">{badge}</span>}
            {title && <h2>{title}</h2>}
            {cards && cards.length > 0 && (
              <div className="qf-fund-grid">
                {cards.map((card, idx) => (
                  <div className="fundc" key={idx}>
                    <b>{card.title || card.cost}</b>
                    <span>{card.description}</span>
                  </div>
                ))}
              </div>
            )}
            <Link className="fbtn" href={buttonHref}>
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QualificationFundingCheck;
