"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

interface AutoScrollTrackProps {
  children: React.ReactNode;
  className?: string;
  autoScrollInterval?: number;
}

export function AutoScrollTrack({
  children,
  className = "jcards",
  autoScrollInterval = 3500,
}: AutoScrollTrackProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const amount = Math.max(260, Math.round(track.clientWidth * 0.86));
    const maxScroll = track.scrollWidth - track.clientWidth;

    if (track.scrollLeft >= maxScroll - 15) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollBy({ left: amount, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (isPaused || autoScrollInterval <= 0) return;

    const timer = setInterval(() => {
      scroll();
    }, autoScrollInterval);

    return () => clearInterval(timer);
  }, [isPaused, autoScrollInterval, scroll]);

  return (
    <div
      className={className}
      ref={trackRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      style={{
        display: "flex",
        flexWrap: "nowrap",
        gap: "16px",
        overflowX: "auto",
        scrollBehavior: "smooth",
        paddingBottom: "12px",
        scrollbarWidth: "none"
      }}
    >
      {children}
    </div>
  );
}
