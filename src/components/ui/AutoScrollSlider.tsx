"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

interface AutoScrollSliderProps {
  children: React.ReactNode;
  className?: string;
  autoScrollInterval?: number; // ms, default 3500
  title?: string;
  description?: string;
  id?: string;
  showControls?: boolean;
}

export function AutoScrollSlider({
  children,
  className = "",
  autoScrollInterval = 3500,
  title,
  description,
  id,
  showControls = true,
}: AutoScrollSliderProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = useCallback((direction: -1 | 1) => {
    const row = rowRef.current;
    if (!row) return;
    const amount = Math.max(260, Math.round(row.clientWidth * 0.86));
    const maxScroll = row.scrollWidth - row.clientWidth;

    if (direction === 1 && row.scrollLeft >= maxScroll - 15) {
      row.scrollTo({ left: 0, behavior: "smooth" });
    } else if (direction === -1 && row.scrollLeft <= 15) {
      row.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      row.scrollBy({ left: direction * amount, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (isPaused || autoScrollInterval <= 0) return;

    const timer = setInterval(() => {
      scroll(1);
    }, autoScrollInterval);

    return () => clearInterval(timer);
  }, [isPaused, autoScrollInterval, scroll]);

  return (
    <div
      className={`sdx-block ${className}`}
      id={id}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {(title || description || showControls) && (
        <div className="sdx-head">
          <div>
            {title && <h2>{title}</h2>}
            {description && <p>{description}</p>}
          </div>
          {showControls && (
            <div className="sdx-controls">
              <button
                className="sdx-ctrl"
                type="button"
                aria-label="Scroll left"
                onClick={() => scroll(-1)}
              >
                ‹
              </button>
              <button
                className="sdx-ctrl"
                type="button"
                aria-label="Scroll right"
                onClick={() => scroll(1)}
              >
                ›
              </button>
            </div>
          )}
        </div>
      )}
      <div className="sdx-row ys-carousel" ref={rowRef}>
        {children}
      </div>
    </div>
  );
}
