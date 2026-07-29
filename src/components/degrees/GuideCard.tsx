"use client";

import React from "react";

export interface GuideCardProps {
  href: string;
  category: string;
  image: string;
  title: string;
  description: string;
  readTime: string;
  ctaText?: string;
}

export function GuideCard({
  href,
  category,
  image,
  title,
  description,
  readTime,
  ctaText = "Read →"
}: GuideCardProps) {
  return (
    <a className="gcard" href={href}>
      <div className="gph">
        <span className="gchip">{category}</span>
        <img src={image} alt={title} />
      </div>
      <b className="gtitle">{title}</b>
      <p className="gdesc">{description}</p>
      <div className="gfoot">
        <span className="gmin">{readTime}</span>
        <span className="gread">{ctaText}</span>
      </div>
    </a>
  );
}

export default GuideCard;
