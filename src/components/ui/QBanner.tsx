import { getBannerBySlug } from "@/services/banner.service";
import { getMediaUrl } from "@/lib/utils";
import React from "react";
import Link from "next/link";

interface QBannerProps {
  slug: string;
  layoutType: "qhero" | "v735-hero";
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackBadgeText?: string; // eyebrow badge text inside photo, e.g. "YStudy qualification guide"
  fallbackEyebrow?: string; // smaller text above h1 inside body, e.g. "Degree Year 1"
  fallbackBgImage?: string;
  fallbackDuration?: string; // e.g. "1 year"
  fallbackLevel?: string; // e.g. "Level 4"
  children?: React.ReactNode;
}

export async function QBanner({
  slug,
  layoutType,
  fallbackTitle,
  fallbackDescription,
  fallbackBadgeText,
  fallbackEyebrow,
  fallbackBgImage,
  fallbackDuration = "1 year",
  fallbackLevel = "Level 4",
  children,
}: QBannerProps) {
  // Fetch dynamic banner from CMS
  const banner = await getBannerBySlug(slug);

  // Set default values if CMS doesn't return data
  const title = banner?.leftContent?.title || fallbackTitle || `${slug.charAt(0).toUpperCase() + slug.slice(1)} Route`;
  const description = banner?.leftContent?.description || fallbackDescription || "Learn how this flexible higher education route works for mature students.";
  const badgeText = banner?.leftContent?.badgeText || fallbackBadgeText || "YStudy qualification guide";
  
  // Eyebrow label inside qualification body
  const bodyEyebrow = fallbackEyebrow || (slug === "hnd" ? "Degree Year 1 & 2" : "YStudy Route");

  // Retrieve bg image URL
  const bgImage = banner
    ? getMediaUrl(banner.background?.imageUrl, banner.fullImageUrl)
    : fallbackBgImage || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=85";

  // Check stats highlight from CMS rightCard items (duration and level)
  let duration = fallbackDuration;
  let level = fallbackLevel;
  if (banner?.rightCard?.items && banner.rightCard.items.length >= 2) {
    duration = banner.rightCard.items[0]?.value || banner.rightCard.items[0]?.title || duration;
    level = banner.rightCard.items[1]?.value || banner.rightCard.items[1]?.title || level;
  }

  if (layoutType === "v735-hero") {
    // Standard v735 single column dark layout for subjects/routes
    const eyebrow = banner?.leftContent?.badgeText || fallbackBadgeText || "Study Routes & Qualifications";
    
    return (
      <section className="v735-hero">
        {bgImage && <img src={bgImage} alt="" style={{ opacity: 0.15 }} />}
        <div className="container">
          <span className="v735-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="v735-actions">
            {slug === "study-subjects" ? (
              <a className="v735-btn blue" href="#browse-by-category">Browse subjects</a>
            ) : (
              <a className="v735-btn blue" href="#qualification-courses">View courses</a>
            )}
            <Link className="v735-btn orange" href="/apply">Apply with YStudy</Link>
            <Link className="v735-btn white" href="/lead/adviser-call">Book free call</Link>
          </div>
        </div>
      </section>
    );
  }

  // Dual-column qhero layout for qualification detail pages
  return (
    <section className="qhero">
      <div className="photo">
        {bgImage && <img src={bgImage} alt="Students planning study routes" />}
        <span className="badge">{badgeText}</span>
      </div>
      <div className="body">
        <p className="bc">
          <Link href="/">Home</Link> / <Link href="/degrees">Degrees</Link> / Qualifications
        </p>
        {bodyEyebrow && <span className="eyebrow">{bodyEyebrow}</span>}
        <h1>{title}</h1>
        <p className="lead">{description}</p>
        <div className="statrow">
          <div className="st">
            <b>{duration}</b>
            <span>Typical duration</span>
          </div>
          <div className="st">
            <b>{level}</b>
            <span>Qualification level</span>
          </div>
          <div className="st">
            <b>Funding</b>
            <span>Check SFE route</span>
          </div>
        </div>
        <div className="btnrow">
          <Link className="qbtn o" href="/apply">Apply with YStudy</Link>
          <Link className="qbtn out" href="/tools/eligibility-checker">Check eligibility</Link>
        </div>
      </div>
    </section>
  );
}

export default QBanner;
