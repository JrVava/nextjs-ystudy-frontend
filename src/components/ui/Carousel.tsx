"use client";

import {
  useCallback,
  useRef,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";
import { cn } from "@/lib/utils";

type CarouselProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    scrollAmount?: number;
  }
>;

export function Carousel({
  className,
  children,
  scrollAmount = 0.86,
  ...props
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByPage = useCallback(
    (direction: -1 | 1) => {
      const track = trackRef.current;
      if (!track) return;

      const amount = Math.max(260, Math.round(track.clientWidth * scrollAmount));
      track.scrollBy({ left: direction * amount, behavior: "smooth" });
    },
    [scrollAmount]
  );

  return (
    <div className={cn("carousel-section", className)} {...props}>
      <div className="sdx-row ys-carousel" ref={trackRef}>
        {children}
      </div>
      <div className="sdx-ctrl-group">
        <button
          type="button"
          className="sdx-ctrl carousel-btn"
          aria-label="Scroll carousel left"
          onClick={() => scrollByPage(-1)}
        >
          ‹
        </button>
        <button
          type="button"
          className="sdx-ctrl carousel-btn"
          aria-label="Scroll carousel right"
          onClick={() => scrollByPage(1)}
        >
          ›
        </button>
      </div>
    </div>
  );
}
