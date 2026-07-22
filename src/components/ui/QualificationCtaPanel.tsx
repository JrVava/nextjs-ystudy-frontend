import Link from "next/link";
import React from "react";

export interface QualificationCtaPanelProps {
  sectionData?: {
    status?: boolean;
    title?: string;
    description?: string;
  };
  fallbackTitle?: string;
  fallbackDescription?: string;
  primaryBtnText?: string;
  primaryBtnHref?: string;
  secondaryBtnText?: string;
  secondaryBtnHref?: string;
}

export function QualificationCtaPanel({
  sectionData,
  fallbackTitle = "Not sure if this is your best route?",
  fallbackDescription = "Speak with YStudy before applying. We can check your qualification, funding route and course options.",
  primaryBtnText = "Find my route",
  primaryBtnHref = "/tools/degree-match",
  secondaryBtnText = "Apply with YStudy",
  secondaryBtnHref = "/apply"
}: QualificationCtaPanelProps) {
  if (sectionData?.status === false) {
    return null;
  }

  const title = sectionData?.title || fallbackTitle;
  const description = sectionData?.description || fallbackDescription;

  return (
    <section className="qf-sec">
      <div className="qf">
        <div className="cta-panel" style={{ textAlign: "left" }}>
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
          <div className="btnrow">
            <Link className="btn btn-blue" href={primaryBtnHref}>
              {primaryBtnText}
            </Link>
            <Link className="btn btn-orange" href={secondaryBtnHref}>
              {secondaryBtnText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QualificationCtaPanel;
