import React from "react";

export interface RiskCard {
  title?: string;
  description?: string;
}

export interface FundingRisksGridProps {
  sectionData?: {
    status?: boolean;
    cards?: RiskCard[];
  };
  fallbackCards?: RiskCard[];
}

const DEFAULT_CARDS: RiskCard[] = [
  {
    title: "Maintenance Loan",
    description: "Paid to you for living costs. Amount depends on location, income and living situation."
  },
  {
    title: "Tuition Fee Loan",
    description: "Usually paid directly to the university or provider, not to your bank account."
  },
  {
    title: "Funding risks",
    description: "Previous study, distance learning, residency and age can affect eligibility."
  }
];

export function FundingRisksGrid({
  sectionData,
  fallbackCards = DEFAULT_CARDS
}: FundingRisksGridProps) {
  if (sectionData?.status === false) {
    return null;
  }

  const cards = sectionData?.cards && sectionData.cards.length > 0 ? sectionData.cards : fallbackCards;

  return (
    <section className="section white">
      <div className="container">
        <div className="risk-grid">
          {cards.map((card, idx) => (
            <div className="risk-card" key={idx}>
              <b>{card.title}</b>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FundingRisksGrid;
