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
  const m = module.toLowerCase().trim();
  return m.charAt(0).toUpperCase() + m.slice(1);
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [defaultCourses, setDefaultCourses] = useState<SearchResultItem[]>([]);
  const [defaultLoading, setDefaultLoading] = useState(false);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load default courses on modal open if not yet loaded
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setHasSearched(false);
      setSubmittedQuery("");
      setResults([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    if (defaultCourses.length === 0) {
      setDefaultLoading(true);
      searchFrontend("")
        .then((data) => {
          setDefaultCourses(data);
        })
        .catch((err) => {
          console.error("Failed to load default courses", err);
        })
        .finally(() => {
          setDefaultLoading(false);
        });
    }

    return () => clearTimeout(timer);
  }, [isOpen, defaultCourses.length]);

  const handleClear = () => {
    setQuery("");
    setHasSearched(false);
    setSubmittedQuery("");
    setResults([]);
    setLoading(false);
    inputRef.current?.focus();
  };

  const handleSearchSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setHasSearched(false);
      setSubmittedQuery("");
      setResults([]);
      setLoading(false);
      return;
    }

    setHasSearched(true);
    setSubmittedQuery(trimmed);

    if (trimmed.length < 3) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = await searchFrontend(trimmed);
      setResults(data);
    } catch (err) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

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

        <form
          className="simple-search-box"
          onSubmit={handleSearchSubmit}
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
          <button type="submit" className="simple-search-submit">
            Search
          </button>
        </form>

        <div id="ysSmartSearchResults" className="ys-search-results">
          {!hasSearched ? (
            defaultLoading ? (
              <p style={{ margin: "14px 0", color: "#52637a" }}>
                Loading courses...
              </p>
            ) : defaultCourses.length === 0 ? (
              <p style={{ margin: "14px 0", color: "#52637a" }}>
                No courses available.
              </p>
            ) : (
              defaultCourses.map((item, index) => (
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
            )
          ) : submittedQuery.length < 3 ? (
            <p style={{ margin: "14px 0", color: "#52637a" }}>
              Please type at least 3 letters to search.
            </p>
          ) : loading ? (
            <p style={{ margin: "14px 0", color: "#52637a" }}>
              Searching...
            </p>
          ) : results.length === 0 ? (
            <p style={{ margin: "14px 0", color: "#52637a" }}>
              No results found for &ldquo;{submittedQuery}&rdquo;.
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
