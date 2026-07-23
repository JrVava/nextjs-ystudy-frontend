import Link from "next/link";
import React from "react";

export interface ToolAdviserStripProps {
  sectionData?: {
    status?: boolean;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
  };
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackButtonText?: string;
  fallbackButtonLink?: string;
}

export function ToolAdviserStrip({
  sectionData,
  fallbackTitle = "Want an adviser to review your CV?",
  fallbackDescription = "Save your CV and book a call. YStudy can help connect your experience to a realistic course, funding route and application plan.",
  fallbackButtonText = "Book free adviser call →",
  fallbackButtonLink = "/lead/adviser-call",
}: ToolAdviserStripProps) {
  if (sectionData?.status === false) {
    return null;
  }

  const title = sectionData?.title || fallbackTitle;
  const description = sectionData?.description || fallbackDescription;
  const buttonText = sectionData?.buttonText || fallbackButtonText;
  const buttonLink = sectionData?.buttonLink || fallbackButtonLink;

  return (
    <div className="container adviser-strip">
      <div>
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
      </div>
      <Link className="ys-btn orange" href={buttonLink}>
        {buttonText}
      </Link>
    </div>
  );
}

export default ToolAdviserStrip;
