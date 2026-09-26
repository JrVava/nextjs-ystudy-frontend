"use client";

import React, { useState, useMemo, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import { CourseCard } from "@/components/degrees/CourseCard";
import { BackendCourse } from "@/types/course";
import { getAllCourses } from "@/services/course.service";
import { FilterItem } from "@/services/filters.service";

interface CompareSectionData {
  title?: string;
  description?: string;
  status?: boolean;
  compare_tags?: string[];
}

// Course relations arrive either as plain strings or as populated objects
type NamedRef = string | { title?: string; name?: string; label?: string; city?: string; duration?: string } | null | undefined;

const refName = (ref: NamedRef, keys: Array<"title" | "name" | "label" | "city" | "duration">): string => {
  if (typeof ref === "string") return ref;
  if (!ref) return "";
  for (const key of keys) {
    if (ref[key]) return ref[key] as string;
  }
  return "";
};

const toRefList = (...values: unknown[]): NamedRef[] =>
  values.flatMap((v) => (Array.isArray(v) ? v : v ? [v] : [])) as NamedRef[];

interface DegreeCatalogContextType {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedSubject: string;
  setSelectedSubject: (s: string) => void;
  selectedQualification: string;
  setSelectedQualification: (q: string) => void;
  selectedMode: string;
  setSelectedMode: (m: string) => void;
  selectedLocation: string;
  setSelectedLocation: (l: string) => void;
  selectedDuration: string;
  setSelectedDuration: (d: string) => void;
  selectedFunding: string;
  setSelectedFunding: (f: string) => void;
  sortBy: "match" | "title";
  setSortBy: (s: "match" | "title") => void;
  filteredCourses: BackendCourse[];
  courseCount: number;
  subjects: FilterItem[];
  qualifications: FilterItem[];
  modes: FilterItem[];
  durations: FilterItem[];
  fundings: FilterItem[];
  locations: FilterItem[];
  section3Data?: CompareSectionData;
}

const DegreeCatalogContext = createContext<DegreeCatalogContextType | null>(null);

export function DegreeCatalogProvider({
  initialCourses,
  subjects,
  qualifications,
  modes,
  durations,
  fundings,
  locations,
  section3Data,
  children
}: {
  initialCourses: BackendCourse[];
  subjects: FilterItem[];
  qualifications: FilterItem[];
  modes: FilterItem[];
  durations: FilterItem[];
  fundings: FilterItem[];
  locations: FilterItem[];
  section3Data?: CompareSectionData;
  children: React.ReactNode;
}) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Any subject");
  const [selectedQualification, setSelectedQualification] = useState("Any qualification");
  const [selectedMode, setSelectedMode] = useState("Any mode");
  const [selectedLocation, setSelectedLocation] = useState("Any location");
  const [selectedDuration, setSelectedDuration] = useState("Any duration");
  const [selectedFunding, setSelectedFunding] = useState("Any funding");
  const [sortBy, setSortBy] = useState<"match" | "title">("match");
  const [apiCourses, setApiCourses] = useState<BackendCourse[]>(initialCourses);

  // Reset to fresh server data when the page re-renders with new initial courses
  const [prevInitialCourses, setPrevInitialCourses] = useState(initialCourses);
  if (prevInitialCourses !== initialCourses) {
    setPrevInitialCourses(initialCourses);
    setApiCourses(initialCourses);
  }

  useEffect(() => {
    let isSubscribed = true;
    const fetchFilteredCourses = async () => {
      try {
        setApiCourses([]);
        const resolveId = (collection: FilterItem[], val: string, anyText: string) =>
          val === anyText ? undefined : collection.find(item => item.title === val)?._id || val;

        const results = await getAllCourses({
          subject: resolveId(subjects, selectedSubject, "Any subject"),
          qualification: resolveId(qualifications, selectedQualification, "Any qualification"),
          mode: resolveId(modes, selectedMode, "Any mode"),
          location: resolveId(locations, selectedLocation, "Any location"),
          duration: resolveId(durations, selectedDuration, "Any duration"),
          funding: resolveId(fundings, selectedFunding, "Any funding"),
          keyword_search: searchQuery
        });
        if (isSubscribed && Array.isArray(results)) {
          setApiCourses(results);
        }
      } catch (err) {
        console.error("Failed to fetch filtered courses", err);
      }
    };

    const timeoutId = setTimeout(fetchFilteredCourses, 300);
    return () => {
      isSubscribed = false;
      clearTimeout(timeoutId);
    };
  }, [
    searchQuery,
    selectedSubject,
    selectedQualification,
    selectedMode,
    selectedLocation,
    selectedDuration,
    selectedFunding,
    subjects,
    qualifications,
    modes,
    durations,
    fundings,
    locations
  ]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // The page is pre-rendered, so URL filters can only be read after hydration.
      // This runs once on mount; reading them during render would cause a hydration mismatch.
      const params = new URLSearchParams(window.location.search);
      const search = params.get("search") || params.get("q");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (search) setSearchQuery(search);
      const subject = params.get("subject");
      if (subject) setSelectedSubject(subject);
      const location = params.get("location");
      if (location) setSelectedLocation(location);
    }
  }, []);

  const filteredCourses = useMemo(() => {
    const getMatchScore = (course: BackendCourse, query?: string) => {
      if (course.matchScore) return course.matchScore;
      let score = 85;
      if (course._id) {
        const hash = String(course._id).split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
        score = 85 + (hash % 15);
      }
      if (query && query.trim()) {
        const q = query.toLowerCase();
        if (course.title?.toLowerCase().includes(q)) score += 5;
        if ((course.shortDescription || course.description || "").toLowerCase().includes(q)) score += 3;
      }
      return Math.min(score, 99);
    };

    return apiCourses
      .filter((course) => {
        // 1. Text Search Query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const titleMatch = course.title?.toLowerCase().includes(query);
          const descMatch = (course.shortDescription || course.description || "").toLowerCase().includes(query);
          const tagMatch = course.tags?.some((t: string) => t.toLowerCase().includes(query));
          const badgeMatch = course.badges?.some((b: string) => b.toLowerCase().includes(query));
          if (!titleMatch && !descMatch && !tagMatch && !badgeMatch) {
            return false;
          }
        }

        // 2. Subject Filter
        if (selectedSubject !== "Any subject") {
          const subjList = toRefList(course.subject, course.subjects);

          const hasSubjMatch = subjList.some((s) => {
            const name = refName(s, ["title", "name"]);
            return name.toLowerCase().includes(selectedSubject.toLowerCase());
          });

          if (!hasSubjMatch) {
            return false;
          }
        }

        // 3. Qualification Filter
        if (selectedQualification !== "Any qualification") {
          const qualList = toRefList(course.qualification, course.qualifications);

          const hasQualMatch = qualList.some((q) => {
            const name = refName(q, ["title", "name"]);
            return name.toLowerCase().includes(selectedQualification.toLowerCase());
          });

          if (!hasQualMatch) {
            return false;
          }
        }

        // 4. Location Filter
        if (selectedLocation !== "Any location") {
          const locs = toRefList(course.locations);
          const locMatch = locs.some((l) => {
            const lName = refName(l, ["name", "title", "city"]);
            return lName.toLowerCase().includes(selectedLocation.toLowerCase());
          });
          if (!locMatch) {
            return false;
          }
        }

        // 5. Mode Filter
        if (selectedMode !== "Any mode") {
          const modeList = Array.isArray(course.modeType) ? toRefList(course.modeType) : [];
          const hasModeMatch = modeList.some((m) => {
            const name = refName(m, ["title", "name", "label"]);
            return name.toLowerCase().includes(selectedMode.toLowerCase());
          });
          if (!hasModeMatch) {
            return false;
          }
        }

        // 6. Duration Filter
        if (selectedDuration !== "Any duration") {
          const durList = toRefList(course.duration, course.durations);
          const hasDurMatch = durList.some((d) => {
            const name = refName(d, ["duration", "label", "title", "name"]);
            return name.toLowerCase().includes(selectedDuration.toLowerCase());
          });
          if (!hasDurMatch) {
            return false;
          }
        }

        // 7. Funding Filter
        if (selectedFunding !== "Any funding") {
          const fundList = toRefList(course.funding, course.fundings);
          const hasFundMatch = fundList.some((f) => {
            const name = refName(f, ["name", "title"]);
            return name.toLowerCase().includes(selectedFunding.toLowerCase());
          });
          if (!hasFundMatch) {
            return false;
          }
        }

        return true;
      })
      .map((course) => ({
        ...course,
        matchScore: getMatchScore(course, searchQuery)
      }))
      .sort((a, b) => {
        if (sortBy === "title") {
          return (a.title || "").localeCompare(b.title || "");
        }
        return (b.matchScore || 0) - (a.matchScore || 0);
      });
  }, [
    apiCourses,
    searchQuery,
    selectedSubject,
    selectedQualification,
    selectedMode,
    selectedLocation,
    selectedDuration,
    selectedFunding,
    sortBy
  ]);

  return (
    <DegreeCatalogContext.Provider
      value={{
        viewMode,
        setViewMode,
        searchQuery,
        setSearchQuery,
        selectedSubject,
        setSelectedSubject,
        selectedQualification,
        setSelectedQualification,
        selectedMode,
        setSelectedMode,
        selectedLocation,
        setSelectedLocation,
        selectedDuration,
        setSelectedDuration,
        selectedFunding,
        setSelectedFunding,
        sortBy,
        setSortBy,
        filteredCourses,
        courseCount: filteredCourses.length,
        subjects,
        qualifications,
        modes,
        durations,
        fundings,
        locations,
        section3Data
      }}
    >
      {children}
    </DegreeCatalogContext.Provider>
  );
}

export function useDegreeCatalog() {
  const ctx = useContext(DegreeCatalogContext);
  if (!ctx) throw new Error("useDegreeCatalog must be used within DegreeCatalogProvider");
  return ctx;
}

export function DegreeSearchConsole() {
  const {
    subjects,
    qualifications,
    modes,
    durations,
    fundings,
    locations,
    searchQuery,
    setSearchQuery,
    selectedSubject,
    setSelectedSubject,
    selectedQualification,
    setSelectedQualification,
    selectedMode,
    setSelectedMode,
    selectedLocation,
    setSelectedLocation,
    selectedDuration,
    setSelectedDuration,
    selectedFunding,
    setSelectedFunding
  } = useDegreeCatalog();

  return (
    <form className="dsx-console" onSubmit={(e) => e.preventDefault()} style={{ width: "100%", margin: "24px 0 0 0" }}>
      <div className="dsx-frow">
        <div className="dsx-fsel">
          <label>Subject</label>
          <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
            <option>Any subject</option>
            {subjects.map((item) => (
              <option key={item._id} value={item.title}>{item.title}</option>
            ))}
          </select>
        </div>
        <div className="dsx-fsel">
          <label>Qualification</label>
          <select value={selectedQualification} onChange={(e) => setSelectedQualification(e.target.value)}>
            <option>Any qualification</option>
            {qualifications.map((item) => (
              <option key={item._id} value={item.title}>{item.title}</option>
            ))}
          </select>
        </div>
        <div className="dsx-fsel">
          <label>Mode</label>
          <select value={selectedMode} onChange={(e) => setSelectedMode(e.target.value)}>
            <option>Any mode</option>
            {modes.map((item) => (
              <option key={item._id} value={item.title}>{item.title}</option>
            ))}
          </select>
        </div>
        <div className="dsx-fsel">
          <label>Location</label>
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
            <option>Any location</option>
            {locations.map((item) => (
              <option key={item._id} value={item.title}>{item.title}</option>
            ))}
          </select>
        </div>
        <div className="dsx-fsel">
          <label>Duration</label>
          <select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
            <option>Any duration</option>
            {durations.map((item) => (
              <option key={item._id} value={item.title}>{item.title}</option>
            ))}
          </select>
        </div>
        <div className="dsx-fsel">
          <label>Funding</label>
          <select value={selectedFunding} onChange={(e) => setSelectedFunding(e.target.value)}>
            <option>Any funding</option>
            {fundings.map((item) => (
              <option key={item._id} value={item.title}>{item.title}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="dsx-srow">
        <span className="dsx-iwrap">
          <svg className="dsx-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2.6" />
            <line x1="15.6" y1="15.6" x2="21" y2="21" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
          <input
            aria-label="Search degrees"
            placeholder="Type subject, career or keyword…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </span>
        <a className="dsx-search" href="#results">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ width: "19px", height: "19px", marginRight: "9px" }}>
            <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2.8" />
            <line x1="15.6" y1="15.6" x2="21" y2="21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          Search
        </a>
      </div>
    </form>
  );
}

export function DegreeResultsView() {
  const {
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    filteredCourses,
    courseCount,
    section3Data,
    searchQuery,
    selectedSubject,
    selectedQualification,
    selectedMode,
    selectedLocation,
    selectedDuration,
    selectedFunding
  } = useDegreeCatalog();

  // "View all" is tied to the filter set it was clicked for, so changing any
  // search term or filter collapses back to the top 4 without an effect.
  const filterKey = JSON.stringify([
    searchQuery,
    selectedSubject,
    selectedQualification,
    selectedMode,
    selectedLocation,
    selectedDuration,
    selectedFunding
  ]);
  const [showAllKey, setShowAllKey] = useState<string | null>(null);
  const showAll = showAllKey === filterKey;

  const coursesToDisplay = showAll ? filteredCourses : filteredCourses.slice(0, 4);

  return (
    <>
      {/* FILTER RESULT COUNTS BAR WITH INTERACTIVE DSX-VIEW */}
      <div className="dsx-bar" id="results">
        <div className="dsx-in2">
          <span className="dsx-count">Showing <em>{courseCount}</em> courses</span>
          <div className="dsx-sp"></div>
          <div
            className="dsx-sort"
            onClick={() => setSortBy(sortBy === "match" ? "title" : "match")}
            role="button"
            tabIndex={0}
            style={{ cursor: "pointer" }}
          >
            <span>Sort:</span> {sortBy === "match" ? "Best match ▾" : "Title A-Z ▾"}
          </div>
          <div className="dsx-view">
            <button
              type="button"
              className={viewMode === "grid" ? "on" : ""}
              onClick={() => setViewMode("grid")}
            >
              ▦ Grid
            </button>
            <button
              type="button"
              className={viewMode === "list" ? "on" : ""}
              onClick={() => setViewMode("list")}
            >
              ☰ List
            </button>
          </div>
        </div>
      </div>

      {/* RESULT CARDS CONTAINER */}
      <section className="sec white results-section-compact" id="results">
        <div className="wrap">
          <div className="search-shell degree-results-main">
            <main style={{ float: "none", width: "100%", padding: 0 }}>
              {viewMode === "grid" ? (
                <div className="search-card-grid course-carousel" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "18px" }}>
                  {coursesToDisplay.map((c, idx) => (
                    <CourseCard key={c._id || idx} course={c} variant="grid" />
                  ))}
                </div>
              ) : (
                <div className="search-card-list">
                  {coursesToDisplay.map((c, idx) => (
                    <CourseCard key={c._id || idx} course={c} variant="list" />
                  ))}
                </div>
              )}

              {filteredCourses.length === 0 && (
                <div style={{ textAlign: "center", padding: "48px 20px", color: "#46566f" }}>
                  <h3>No courses found</h3>
                  <p>Try clearing filters or adjusting your search term.</p>
                </div>
              )}

              {filteredCourses.length > 4 && !showAll ? (
                <div className="dsx-viewall">
                  <button
                    className="btn btn-blue"
                    onClick={() => setShowAllKey(filterKey)}
                    type="button"
                    style={{ border: "none", cursor: "pointer" }}
                  >
                    View all {courseCount} courses →
                  </button>
                  <span>Showing top 4 matches</span>
                </div>
              ) : filteredCourses.length > 0 ? (
                <div className="dsx-viewall">
                  <span>Showing all matches</span>
                </div>
              ) : null}

              {/* SHORTLIST COMPARE BAR */}
              {section3Data?.status !== false && (
                <div className="compare-bar" style={{ marginTop: "34px" }}>
                  <div>
                    <h3>{section3Data?.title || "Ready to shortlist?"}</h3>
                    <p>{section3Data?.description || "Save the strongest degree routes, then ask an adviser to check funding, entry route and interview fit before you apply."}</p>
                    <div className="compare-tags">
                      {(section3Data?.compare_tags || ["Business Management", "Computing & Cybersecurity"]).map((tag: string, idx: number) => (
                        <span key={idx}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <Link className="btn btn-orange" href="/tools/degree-match">Run Degree Match Finder →</Link>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </>
  );
}
