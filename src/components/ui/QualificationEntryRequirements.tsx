import React from "react";

export interface EntryRequirementCard {
  badge: string;
  title: string;
  points: string[];
}

export interface QualificationEntryRequirementsProps {
  sectionData?: {
    status?: boolean;
    badge?: string;
    title?: string;
    description?: string;
    cards?: EntryRequirementCard[];
  };
  fallbackBadge?: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackCards?: EntryRequirementCard[];
}

const DEFAULT_CARDS: EntryRequirementCard[] = [
  {
    badge: "Entry requirements",
    title: "What universities usually check",
    points: [
      "Usually Level 3 or relevant work experience",
      "English and maths may be checked",
      "Mature students can often apply with CV experience"
    ]
  },
  {
    badge: "Progression",
    title: "Where this route can lead",
    points: [
      "Move into next level of higher education",
      "Apply for relevant degree options",
      "Use it for career progression"
    ]
  },
  {
    badge: "Career options",
    title: "Possible outcomes",
    points: [
      "Specialist roles in your field",
      "Administrator or coordinator roles",
      "Technical or supervisory positions"
    ]
  },
  {
    badge: "Important",
    title: "Check before committing",
    points: [
      "Previous higher education study can affect funding.",
      "Part-time, online and weekend routes may be assessed differently.",
      "Use the eligibility checker before applying."
    ]
  }
];

export function QualificationEntryRequirements({
  sectionData,
  fallbackBadge = "Before you apply",
  fallbackTitle = "Entry requirements and progression.",
  fallbackDescription = "Most adult learners need a simple answer: can I enter, can I fund it, and where can it take me?",
  fallbackCards = DEFAULT_CARDS
}: QualificationEntryRequirementsProps) {
  if (sectionData?.status === false) {
    return null;
  }

  const badge = sectionData?.badge || fallbackBadge;
  const title = sectionData?.title || fallbackTitle;
  const description = sectionData?.description || fallbackDescription;
  const cards = sectionData?.cards && sectionData.cards.length > 0 ? sectionData.cards : fallbackCards;

  return (
    <section className="qf-sec" style={{ background: "var(--soft)", textAlign: "left" }}>
      <div className="qf">
        <div className="qf-head">
          {badge && <span className="kicker">{badge}</span>}
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>

        {cards && cards.length > 0 && (
          <div className="elig-routes">
            {cards.map((c, idx) => {
              const badgeLower = (c.badge || "").toLowerCase();
              const isWarn = badgeLower.includes("important") || badgeLower.includes("plan");
              return (
                <div className={`eligc ${isWarn ? "warn" : ""}`} key={idx}>
                  <p className="tagline">{c.badge}</p>
                  <h3>{c.title}</h3>
                  {c.points && c.points.length > 0 && (
                    <ul>
                      {c.points.map((pt, pidx) => (
                        <li key={pidx}>{pt}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default QualificationEntryRequirements;
