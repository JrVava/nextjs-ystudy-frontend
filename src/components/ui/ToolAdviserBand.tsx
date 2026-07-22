"use client";

import Link from "next/link";
import React from "react";

export interface ToolAdviserBandProps {
  sectionData?: {
    status?: boolean;
    badge?: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
  };
  fallbackBadge?: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackButtonText?: string;
  fallbackButtonLink?: string;
}

export function ToolAdviserBand({
  sectionData,
  fallbackBadge = "Free adviser review · No commitment",
  fallbackTitle = "Need help choosing the right route?",
  fallbackDescription = "Book a free adviser call. We can review your answers and help you choose the best step forward.",
  fallbackButtonText = "Book Adviser Call →",
  fallbackButtonLink = "/lead/adviser-call",
}: ToolAdviserBandProps) {
  if (sectionData?.status === false) {
    return null;
  }

  const badge = sectionData?.badge || fallbackBadge;
  const title = sectionData?.title || fallbackTitle;
  const description = sectionData?.description || fallbackDescription;
  const buttonText = sectionData?.buttonText || fallbackButtonText;
  const buttonLink = sectionData?.buttonLink || fallbackButtonLink;

  const handleSave = (e: React.MouseEvent) => {
    if (typeof window !== "undefined") {
      const win = window as any;
      if (win.ystudySaveCurrentTool) {
        win.ystudySaveCurrentTool();
      }
    }
  };

  const handlePrepareAdviser = (e: React.MouseEvent) => {
    if (typeof window !== "undefined") {
      const win = window as any;
      if (win.ystudyPrepareAdviser) {
        win.ystudyPrepareAdviser();
      }
    }
  };

  return (
    <section className="tool-adviser-system">
      <div className="thub">
        <div className="adviser-band" style={{ textAlign: "left" }}>
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
            {badge && <div className="adviser-data">{badge}</div>}
          </div>
          <div className="btnrow" style={{ display: "flex", gap: "12px" }}>
            <button className="btn btn-white" onClick={handleSave}>
              Save to dashboard
            </button>
            <Link className="btn btn-orange" href={buttonLink} onClick={handlePrepareAdviser}>
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ToolAdviserBand;

