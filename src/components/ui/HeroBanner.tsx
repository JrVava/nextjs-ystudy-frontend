import { getBannerBySlug } from "@/services/banner.service";
import { getMediaUrl } from "@/lib/utils";
import React from "react";

export interface HeroBannerProps {
  slug?: string;
  layoutType: "qualification" | "overview";
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackBadgeText?: string;
  fallbackBgImage?: string;
  children?: React.ReactNode;
}

export async function HeroBanner({
  slug,
  layoutType = "qualification",
  fallbackTitle,
  fallbackDescription,
  fallbackBadgeText,
  fallbackBgImage,
  children,
}: HeroBannerProps) {
  // Fetch dynamic banner from CMS if slug is provided
  const banner = slug ? await getBannerBySlug(slug) : null;

  const title = banner?.leftContent?.title || fallbackTitle;
  const description = banner?.leftContent?.description || fallbackDescription;
  const badgeText = banner?.leftContent?.badgeText || fallbackBadgeText;

  const bgImage = banner
    ? getMediaUrl(banner.background?.imageUrl, banner.fullImageUrl)
    : fallbackBgImage || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=85";

  if (layoutType === "overview") {
    return (
      <section className="v735-hero">
        {bgImage && <img src={bgImage} alt="" style={{ opacity: 0.15 }} />}
        <div className="container">
          {badgeText && <span className="v735-eyebrow">{badgeText}</span>}
          {title && <h1>{title}</h1>}
          {description && <p>{description}</p>}
          {children}
        </div>
      </section>
    );
  }

  // Pure qualification banner media/photo UI
  return (
    <div className="photo">
      {bgImage && <img src={bgImage} alt={title || "Qualification banner"} />}
      {badgeText && <span className="badge">{badgeText}</span>}
    </div>
  );
}

export default HeroBanner;
