import { getBannerBySlug } from "@/services/banner.service";
import { getMediaUrl } from "@/lib/utils";
import "@/app/degrees/degrees.css";
import React from "react";

interface DegreesBannerProps {
  slug: string;
  fallbackTitle: string;
  fallbackDescription: string;
  fallbackBadgeText: string;
  fallbackBgImage: string;
  children?: React.ReactNode;
}

export async function DegreesBanner({
  slug,
  fallbackTitle,
  fallbackDescription,
  fallbackBadgeText,
  fallbackBgImage,
  children
}: DegreesBannerProps) {
  const banner = await getBannerBySlug(slug);

  let title = fallbackTitle;
  let description = fallbackDescription;
  let eyebrow = fallbackBadgeText;
  let bgImage = fallbackBgImage;
  let bgColor = "";

  if (banner && banner.isActive) {
    if (banner.leftContent) {
      if (banner.leftContent.title) title = banner.leftContent.title;
      if (banner.leftContent.description) description = banner.leftContent.description;
      if (banner.leftContent.badgeText) eyebrow = banner.leftContent.badgeText;
    }
    const bgUrl = getMediaUrl(banner.background?.imageUrl, banner.fullImageUrl);
    if (bgUrl) bgImage = bgUrl;
    if (banner.background?.bgColor) bgColor = banner.background.bgColor;
  }

  return (
    <section className="dsx-hero">
      <img className="dsx-bg" src={bgImage} alt="" />
      <div className="dsx-sc" style={bgColor ? { background: bgColor } : undefined}></div>
      <div className="dsx-in">
        {eyebrow && <span className="dsx-eyebrow">{eyebrow}</span>}
        {title && <h1>{title}</h1>}
        {description && <p className="dsx-sub">{description}</p>}
        {children}
      </div>
    </section>
  );
}

export default DegreesBanner;
