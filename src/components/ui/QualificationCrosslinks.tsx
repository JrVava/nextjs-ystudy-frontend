import Link from "next/link";
import React from "react";

export interface CrosslinkItem {
  title?: string;
  text?: string;
  href: string;
}

export interface QualificationCrosslinksProps {
  sectionData?: {
    status?: boolean;
    title?: string;
    description?: string;
    cards?: Array<{ title?: string }>;
    links?: CrosslinkItem[];
  };
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackLinks?: CrosslinkItem[];
}

const DEFAULT_LINKS: CrosslinkItem[] = [
  { text: "Find degrees", href: "/degrees" },
  { text: "Funding hub", href: "/funding" },
  { text: "Careers & salaries", href: "/careers" },
  { text: "Degree Match", href: "/tools/degree-match" },
  { text: "Salary Checker", href: "/tools/salary-checker" },
  { text: "Student guides", href: "/guides" }
];

export function QualificationCrosslinks({
  sectionData,
  fallbackTitle = "Useful next steps",
  fallbackDescription = "Move from information to action. Compare degrees, check funding, explore careers and apply with support.",
  fallbackLinks = DEFAULT_LINKS
}: QualificationCrosslinksProps) {
  if (sectionData?.status === false) {
    return null;
  }

  const title = sectionData?.title || fallbackTitle;
  const description = sectionData?.description || fallbackDescription;

  // Derive links if sectionData provided cards or custom links
  let links = fallbackLinks;
  if (sectionData?.links && sectionData.links.length > 0) {
    links = sectionData.links;
  } else if (sectionData?.cards && sectionData.cards.length > 0) {
    links = sectionData.cards.map((c, idx) => {
      let href = "/degrees";
      if (idx === 1) href = "/funding";
      else if (idx === 2) href = "/careers";
      else if (idx === 3) href = "/tools/degree-match";
      else if (idx === 4) href = "/tools/salary-checker";
      else if (idx === 5) href = "/guides";
      return {
        text: c.title || "Link",
        href
      };
    });
  }

  return (
    <section className="ys-crosslinks" aria-label="Useful links">
      <div className="inner" style={{ textAlign: "left" }}>
        <div>
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>
        <div className="ys-link-grid">
          {links.map((link, idx) => (
            <Link href={link.href} key={idx}>
              {link.text || link.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default QualificationCrosslinks;
