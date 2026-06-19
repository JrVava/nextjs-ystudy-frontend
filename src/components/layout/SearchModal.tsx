"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { searchSite } from "@/services/search";
import { cn } from "@/lib/utils";

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(
    () => searchSite({ query, limit: 8 }),
    [query]
  );

  if (!isOpen) return null;

  return (
    <div
      className={cn("ystudy-search-modal", isOpen && "is-open")}
      aria-hidden={!isOpen}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        aria-label="Search YStudy"
        aria-modal="true"
        className="ystudy-search-panel simple-search-panel"
        role="dialog"
      >
        <div className="ystudy-search-head">
          <div>
            <strong>Search YStudy</strong>
            <p>Find degrees, funding, tools and resources.</p>
          </div>
          <button
            type="button"
            aria-label="Close search"
            className="ystudy-search-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="simple-search-box">
          <span aria-hidden>⌕</span>
          <input
            className="ystudy-search-input"
            placeholder="Search subject, funding, guide or tool..."
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoFocus
          />
        </div>

        <div className="simple-search-links">
          <div className="search-list-group">
            <h4>Results</h4>
            {results.length === 0 ? (
              <p>Type to search the YStudy site index.</p>
            ) : (
              results.map((result) => (
                <Link key={result.href} href={result.href} onClick={onClose}>
                  {result.title}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
