"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { searchFrontend, type SearchResultItem } from "@/services/search";
import { cn } from "@/lib/utils";

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const formatSearchHref = (link?: string) => {
  if (!link) return "#";
  if (link.startsWith("http://") || link.startsWith("https://")) {
    return link;
  }
  let cleaned = link.replace(/^(\.\.\/|\.\/)+/, "").replace(/\.html$/, "");
  if (!cleaned.startsWith("/")) {
    cleaned = "/" + cleaned;
  }
  return cleaned;
};

const getModuleLabel = (module?: string) => {
  if (!module) return "Degrees";
  const lower = module.toUpperCase();
  // if (lower === "course" || lower === "subject") {
  //   return "Degrees";
  // }
  return lower;
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const trimmedQuery = query.trim();

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setLoading(false);
      return;
    }
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 3) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    let active = true;

    const timer = setTimeout(async () => {
      try {
        const data = await searchFrontend(trimmed);
        if (active) {
          setResults(data);
          setLoading(false);
        }
      } catch (err) {
        if (active) {
          setResults([]);
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query]);

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

        <div
          className="simple-search-box"
          onClick={(e) => {
            if ((e.target as HTMLElement).tagName !== "BUTTON") {
              inputRef.current?.focus();
            }
          }}
        >
          <span aria-hidden>⌕</span>
          <input
            ref={inputRef}
            className="ystudy-search-input"
            placeholder="Search subject, funding, guide or tool..."
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoFocus
          />
          {query ? (
            <button
              type="button"
              aria-label="Clear search"
              className="simple-search-clear"
              onClick={handleClear}
            >
              ×
            </button>
          ) : null}
        </div>

        <div id="ysSmartSearchResults" className="ys-search-results">
          {!trimmedQuery ? (
            <p style={{ margin: "14px 0", color: "#52637a" }}>
              Type to search the YStudy site index.
            </p>
          ) : trimmedQuery.length < 3 ? (
            <p style={{ margin: "14px 0", color: "#52637a" }}>
              Please type at least 3 letters to search.
            </p>
          ) : loading ? (
            <p style={{ margin: "14px 0", color: "#52637a" }}>
              Searching...
            </p>
          ) : results.length === 0 ? (
            <p style={{ margin: "14px 0", color: "#52637a" }}>
              No results found for &ldquo;{query}&rdquo;.
            </p>
          ) : (
            results.map((item, index) => (
              <Link
                key={`${item.link}-${index}`}
                className="ys-search-result"
                href={formatSearchHref(item.link)}
                onClick={onClose}
              >
                <span>{getModuleLabel(item.module)}</span>
                <strong>{item.title}</strong>
                {item.description ? <small>{item.description}</small> : null}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
