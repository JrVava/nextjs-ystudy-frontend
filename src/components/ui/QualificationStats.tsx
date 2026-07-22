import React from "react";

export interface QualificationStatItem {
  title: string;
  description: string;
}

export interface QualificationStatsProps {
  items?: QualificationStatItem[];
  fallbackItems?: QualificationStatItem[];
}

const DEFAULT_STATS: QualificationStatItem[] = [
  { title: "1 year", description: "Typical duration" },
  { title: "Level 4", description: "Qualification level" },
  { title: "Funding", description: "Check SFE route" },
];

export function QualificationStats({
  items,
  fallbackItems = DEFAULT_STATS,
}: QualificationStatsProps) {
  const statList = items && items.length > 0 ? items : fallbackItems;

  return (
    <div className="statrow">
      {statList.map((st, idx) => (
        <div className="st" key={idx}>
          <b>{st.title}</b>
          <span>{st.description}</span>
        </div>
      ))}
    </div>
  );
}

export default QualificationStats;
