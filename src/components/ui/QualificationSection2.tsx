import { QualificationStats } from "@/components/ui/QualificationStats";
import Link from "next/link";
import React from "react";

export interface QualificationSection2Props {
  section2Data?: any;
  fallbackBadge?: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackStats?: Array<{ title: string; description: string }>;
}

export function QualificationSection2({
  section2Data,
  fallbackBadge = "Qualification Guide",
  fallbackTitle = "Qualification Route",
  fallbackDescription = "Learn how this higher education route works for mature students.",
  fallbackStats = [
    { title: "1 year", description: "Typical duration" },
    { title: "Level 4", description: "Qualification level" },
    { title: "Funding", description: "Check SFE route" },
  ],
}: QualificationSection2Props) {
  if (section2Data?.status === false) {
    return null;
  }

  const badge = section2Data?.badge || fallbackBadge;
  const title = section2Data?.title || fallbackTitle;
  const description = section2Data?.description || fallbackDescription;
  const statItems = section2Data?.hndTimeLine || fallbackStats;

  return (
    <div className="body">
      <p className="bc">
        <Link href="/">Home</Link> / <Link href="/degrees">Degrees</Link> / Qualifications
      </p>
      {badge && <span className="eyebrow">{badge}</span>}
      {title && <h1>{title}</h1>}
      {description && <p className="lead">{description}</p>}

      <QualificationStats items={statItems} />

      <div className="btnrow">
        <Link className="btn btn-orange" href="/apply">Apply with YStudy</Link>
        <Link className="btn btn-blue" href="/tools/eligibility-checker">Check eligibility</Link>
      </div>
    </div>
  );
}

export default QualificationSection2;
