import Link from "next/link";
import React from "react";

export interface ToolCardProps {
  href: string;
  chipText: string;
  imageSrc: string;
  title: string;
  description: string;
  metaText: string;
  goText?: string;
}

export function ToolCard({
  href,
  chipText,
  imageSrc,
  title,
  description,
  metaText,
  goText = "Open →",
}: ToolCardProps) {
  return (
    <Link className="tcard" href={href}>
      <div className="ph">
        <span className="chip">{chipText}</span>
        <img src={imageSrc} alt={title} />
      </div>
      <div className="b">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="foot">
          <span className="meta">{metaText}</span>
          <span className="go">{goText}</span>
        </div>
      </div>
    </Link>
  );
}

export default ToolCard;
