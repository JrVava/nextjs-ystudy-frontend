"use client";

import React from "react";

export interface JourneyCardProps {
  href: string;
  image: string;
  title: string;
  description: string;
  ctaText?: string;
  icon?: string;
  badge?: string;
}

export function JourneyCard({
  href,
  image,
  title,
  description,
  ctaText = "Explore →",
  icon,
  badge
}: JourneyCardProps) {
  return (
    <a
      className="jcard"
      href={href}
      style={{
        flex: "0 0 280px",
        minWidth: "280px",
        boxSizing: "border-box"
      }}
    >
      <div className="jcph">
        <img src={image} alt={title} />
        <div className="jcov"></div>
        {icon && <div className="jicon">{icon}</div>}
        {badge && (
          <span
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "rgba(255, 255, 255, 0.95)",
              color: "#071126",
              fontWeight: 800,
              fontSize: "11px",
              padding: "4px 10px",
              borderRadius: "999px",
              zIndex: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)"
            }}
          >
            {badge}
          </span>
        )}
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

