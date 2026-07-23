import Link from "next/link";
import React from "react";

export interface DegreeMatchAdviserBandProps {
  sectionData?: {
    status?: boolean;
    badge?: string;
    title?: string;
    description?: string;
  };
  fallbackBadge?: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export function DegreeMatchAdviserBand({
  sectionData,
  fallbackBadge = "YStudy",
  fallbackTitle = "Not sure what to do next?",
  fallbackDescription = "Start with a quick route check, then speak to a YStudy adviser before you apply.",
  primaryButtonText = "Degree Match Finder",
  primaryButtonLink = "/tools/degree-match",
  secondaryButtonText = "Book Adviser Call",
  secondaryButtonLink = "/lead/adviser-call",
}: DegreeMatchAdviserBandProps) {
  if (sectionData?.status === false) {
    return null;
  }

  const badge = sectionData?.badge || fallbackBadge;
  const title = sectionData?.title || fallbackTitle;
  const description = sectionData?.description || fallbackDescription;

  return (
    <footer className="section white">
      <div className="container">
        <div
          className="final-cta"
          style={{
            background:
              'linear-gradient(135deg, rgba(6, 17, 38, 0.94), rgba(6, 17, 38, 0.55)), url("https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=85") center/cover',
            padding: 'clamp(32px, 4.5vw, 64px)',
            borderRadius: '42px',
            gridTemplate: 'none',
            gap: 0,
          }}
        >
          {badge && <span className="kicker">{badge}</span>}
          {title && <h2>{title}</h2>}
          {description && (
            <p style={{ fontSize: 'var(--fs-body) !important' }}>
              {description}
            </p>
          )}
          <div className="btnrow">
            <Link className="btn btn-orange" href={primaryButtonLink}>
              {primaryButtonText}
            </Link>
            <Link className="btn btn-white" href={secondaryButtonLink}>
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default DegreeMatchAdviserBand;
