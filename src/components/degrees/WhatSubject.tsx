"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getSubjects, FilterItem } from "@/services/filters.service";

export interface WhatSubjectCard {
  _id?: string;
  title: string;
  image?: string;
  link?: string;
}

export interface WhatSubjectProps {
  badge?: string;
  title?: string;
  description?: string;
  cards?: WhatSubjectCard[];
  status?: boolean;
  data?: {
    badge?: string;
    title?: string;
    description?: string;
    cards?: WhatSubjectCard[];
    status?: boolean;
  };
}

export function WhatSubject({
  badge,
  title,
  description,
  cards,
  status,
  data,
}: WhatSubjectProps) {
  const [subjects, setSubjects] = useState<FilterItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    getSubjects()
      .then((res) => {
        if (isMounted) {
          setSubjects(res || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("[WhatSubject] Failed to fetch subjects from /frontend/subject:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const sectionStatus = data !== undefined ? data.status : status;
  if (sectionStatus === false) return null;

  const finalBadge = data?.badge ?? badge ?? "Subjects";
  const finalTitle = data?.title ?? title ?? "What do you want to study?";
  const finalDescription =
    data?.description ??
    description ??
    "Explore the strongest subject routes for adult learners and check funding, salary and study mode before applying.";

  const displayCards: WhatSubjectCard[] =
    data?.cards && data.cards.length > 0
      ? data.cards
      : cards && cards.length > 0
      ? cards
      : subjects.map((sub: any) => {
          const title = sub.title || sub.name || "";
          const slugVal = sub.slug || title.toLowerCase().trim().replace(/\s+/g, "-");
          return {
            _id: sub._id?.toString(),
            title,
            image: sub.fullImageUrl || sub.image || "",
            link: `/degrees/${slugVal.replace(/^\//, "")}`,
          };
        });

  return (
    <section className="section white ds-added-subjects">
      <div className="container">
        <div className="title-row">
          <div style={{ textAlign: "left" }}>
            <span className="kicker">{finalBadge}</span>
            <h2>{finalTitle}</h2>
          </div>
          <p style={{ textAlign: "left" }}>{finalDescription}</p>
        </div>
        {loading && displayCards.length === 0 ? (
          <div style={{ textAlign: "center", padding: "24px 0", color: "#667085" }}>
            <p>Loading subjects...</p>
          </div>
        ) : (
          <div className="ds-subject-cards">
            {displayCards.map((card, idx) => (
              <Link className="ds-subject-card" href={card.link || "/degrees/"} key={card._id || idx}>
                {card.image && <img src={card.image} alt={card.title} />}
                <h3>{card.title}</h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default WhatSubject;
