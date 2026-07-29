"use client";

import React from "react";

export interface JourneyCardProps {
  href: string;
  image: string;
  title: string;
  description: string;
  ctaText?: string;
  icon?: string;
}

export function JourneyCard({
  href,
  image,
  title,
  description,
  ctaText = "Explore →",
  icon
}: JourneyCardProps) {
  return (
    <a className="jcard" href={href}>
      <div className="jcph">
        <img src={image} alt={title} />
        <div className="jcov"></div>
        {icon && <div className="jicon">{icon}</div>}
      </div>
      <div className="jcb">
        <b>{title}</b>
        <span>{description}</span>
        <span className="jgo">{ctaText}</span>
      </div>
    </a>
  );
}

export default JourneyCard;
