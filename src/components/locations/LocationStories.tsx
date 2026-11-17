"use client";

import React, { useState, useEffect } from "react";
import { getStudentStoriesList, type StudentStoryItem } from "@/services/student-story.service";

export interface LocationStoriesProps {
  data?: {
    badge?: string;
    title?: string;
    description?: string;
    status?: boolean;
  };
  badge?: string;
  title?: string;
  description?: string;
  status?: boolean;
  stories?: StudentStoryItem[] | any[];
  initialStories?: StudentStoryItem[] | null;
}

export function LocationStories({
  data,
  badge,
  title,
  description,
  status,
  stories: propStories,
  initialStories,
}: LocationStoriesProps) {
  const [internalStories, setInternalStories] = useState<StudentStoryItem[]>(
    propStories || initialStories || []
  );

  useEffect(() => {
    if (propStories && propStories.length > 0) {
      setInternalStories(propStories);
      return;
    }

    if (!initialStories || initialStories.length === 0) {
      let isMounted = true;
      getStudentStoriesList()
        .then((res) => {
          if (isMounted && res && res.length > 0) {
            setInternalStories(res);
          }
        })
        .catch((err) => {
          console.error("[LocationStories] Error loading student stories:", err);
        });

      return () => {
        isMounted = false;
      };
    }
  }, [propStories, initialStories]);

  const sectionStatus = data !== undefined ? data.status : status;
  if (sectionStatus === false) return null;

  const finalBadge = data?.badge ?? badge ?? "Student stories";
  const finalTitle = data?.title ?? title ?? "Adult learners choose locations for real-life reasons.";
  const finalDescription =
    data?.description ??
    description ??
    "Short, location-based stories help students imagine how study could fit around work, family and travel.";

  const displayStories = propStories && propStories.length > 0 ? propStories : internalStories;

  if (!displayStories || displayStories.length === 0) {
    return null;
  }

  return (
    <section className="loc-section soft" id="stories">
      <div className="wrap">
        <div className="loc-head">
          <div>
            <span className="eyebrow">{finalBadge}</span>
            <h2>{finalTitle}</h2>
          </div>
          <p>{finalDescription}</p>
        </div>
        <div className="story-grid">
          {displayStories.map((s: any, idx: number) => {
            const authorName = s.name || "";
            const subtitle =
              s.location ||
              (s.subject && s.year
                ? `${s.subject} · ${s.year}`
                : s.subject || s.year || (s.age ? `${s.age} yrs` : ""));
            const storyText = s.description || "";
            const imageUrl = s.fullImageUrl || s.image || "";

            return (
              <article
                key={s._id || idx}
                className="story-card"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  textAlign: "left",
                  aspectRatio: "3 / 4",
                  minHeight: "480px",
                  display: "flex",
                  alignItems: "flex-end",
                  width: "100%",
                }}
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={authorName}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                )}
                <div className="body" style={{ position: "relative", zIndex: 2, width: "100%" }}>
                  <h3>
                    {authorName}
                    {subtitle ? `, ${subtitle}` : ""}
                  </h3>
                  <p>{storyText}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const StudentStories = LocationStories;
export default LocationStories;
