"use client";

import React, { useState, useMemo, createContext, useContext } from "react";
import { CourseCard } from "@/components/degrees/CourseCard";
import { BackendCourse } from "@/types/course";

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
  subjects: any[];
  qualifications: any[];
  modes: any[];
  durations: any[];
  fundings: any[];
  section3Data?: any;
}

const DegreeCatalogContext = createContext<DegreeCatalogContextType | null>(null);

export function DegreeCatalogProvider({
  initialCourses,
  subjects,
  qualifications,
  modes,
  durations,
  fundings,
  section3Data,
  children
}: {
  initialCourses: BackendCourse[];
  subjects: any[];
  qualifications: any[];
  modes: any[];
  durations: any[];
  fundings: any[];
  section3Data?: any;
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

  const filteredCourses = useMemo(() => {
    return initialCourses
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
          const sName = typeof course.subject === "string" ? course.subject : course.subject?.title || course.subject?.name || "";
          if (!sName.toLowerCase().includes(selectedSubject.toLowerCase())) {
            return false;
          }
        }

        // 3. Qualification Filter
        if (selectedQualification !== "Any qualification") {
          const qName = typeof course.qualification === "string" ? course.qualification : course.qualification?.title || course.qualification?.name || "";
          if (!qName.toLowerCase().includes(selectedQualification.toLowerCase())) {
            return false;
          }
        }

        // 4. Location Filter
        if (selectedLocation !== "Any location") {
          const locs = Array.isArray(course.locations) ? course.locations : [];
          const locMatch = locs.some((l: any) => {
            const lName = typeof l === "string" ? l : l?.name || l?.title || l?.city || "";
            return lName.toLowerCase().includes(selectedLocation.toLowerCase());
          });
          if (locs.length > 0 && !locMatch) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "title") {
          return (a.title || "").localeCompare(b.title || "");
        }
        return 0;
      });
  }, [
    initialCourses,
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
            <option>London</option>
            <option>Birmingham</option>
            <option>Manchester</option>
            <option>Online</option>
            <option>Multiple locations</option>
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
    section3Data
  } = useDegreeCatalog();

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
                  {filteredCourses.map((c: any, idx: number) => (
                    <CourseCard key={c._id || idx} course={c} variant="grid" />
                  ))}
                </div>
              ) : (
                <div className="search-card-list">
                  {filteredCourses.map((c: any, idx: number) => (
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

              <div className="dsx-viewall">
                <a className="btn btn-blue" href="#results">View all {courseCount} courses →</a>
                <span>Showing top matches</span>
              </div>

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
                  <a className="btn btn-orange" href="/tools/degree-match">Run Degree Match Finder →</a>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </>
  );
}
