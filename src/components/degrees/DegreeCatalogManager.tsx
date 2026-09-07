"use client";

import React, { useState, useMemo, useEffect, createContext, useContext } from "react";
import { CourseCard } from "@/components/degrees/CourseCard";
import { BackendCourse } from "@/types/course";
import { getAllCourses } from "@/services/course.service";

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
  const [apiCourses, setApiCourses] = useState<BackendCourse[]>(initialCourses);

  useEffect(() => {
    setApiCourses(initialCourses);
  }, [initialCourses]);

  useEffect(() => {
    let isSubscribed = true;
    const fetchFilteredCourses = async () => {
      try {
        const resolveId = (collection: any[], val: string, anyText: string) => 
          val === anyText ? undefined : collection.find(item => item.title === val)?._id || val;

        const results = await getAllCourses({
          subject: resolveId(subjects, selectedSubject, "Any subject"),
          qualification: resolveId(qualifications, selectedQualification, "Any qualification"),
          mode: resolveId(modes, selectedMode, "Any mode"),
          location: selectedLocation === "Any location" ? undefined : selectedLocation,
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
    fundings
  ]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const search = params.get("search") || params.get("q");
      if (search) setSearchQuery(search);
      const subject = params.get("subject");
      if (subject) setSelectedSubject(subject);
      const location = params.get("location");
      if (location) setSelectedLocation(location);
    }
  }, []);

  const filteredCourses = useMemo(() => {
    const getMatchScore = (course: any, query?: string) => {
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
          const subjList: any[] = [];
          if (course.subject) {
            if (Array.isArray(course.subject)) {
              subjList.push(...course.subject);
            } else {
              subjList.push(course.subject);
            }
          }
          if (course.subjects && Array.isArray(course.subjects)) {
            subjList.push(...course.subjects);
          }

          const hasSubjMatch = subjList.some((s) => {
            const name = typeof s === "string" ? s : s?.title || s?.name || "";
            return name.toLowerCase().includes(selectedSubject.toLowerCase());
          });

          if (!hasSubjMatch) {
            return false;
          }
        }

        // 3. Qualification Filter
        if (selectedQualification !== "Any qualification") {
          const qualList: any[] = [];
          if (course.qualification) {
            if (Array.isArray(course.qualification)) {
              qualList.push(...course.qualification);
            } else {
              qualList.push(course.qualification);
            }
          }
          if (course.qualifications && Array.isArray(course.qualifications)) {
            qualList.push(...course.qualifications);
          }

          const hasQualMatch = qualList.some((q) => {
            const name = typeof q === "string" ? q : q?.title || q?.name || "";
            return name.toLowerCase().includes(selectedQualification.toLowerCase());
          });

          if (!hasQualMatch) {
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
          if (!locMatch) {
            return false;
          }
        }

        // 5. Mode Filter
        if (selectedMode !== "Any mode") {
          const modeList: any[] = [];
          if (course.modeType && Array.isArray(course.modeType)) {
            modeList.push(...course.modeType);
          }
          const hasModeMatch = modeList.some((m) => {
            const name = typeof m === "string" ? m : m?.title || m?.name || m?.label || "";
            return name.toLowerCase().includes(selectedMode.toLowerCase());
          });
          if (!hasModeMatch) {
            return false;
          }
        }

        // 6. Duration Filter
        if (selectedDuration !== "Any duration") {
          const durList: any[] = [];
          if (course.duration) {
            if (Array.isArray(course.duration)) {
              durList.push(...course.duration);
            } else {
              durList.push(course.duration);
            }
          }
          if (course.durations && Array.isArray(course.durations)) {
            durList.push(...course.durations);
          }
          const hasDurMatch = durList.some((d) => {
            const name = typeof d === "string" ? d : d?.duration || d?.label || d?.title || d?.name || "";
            return name.toLowerCase().includes(selectedDuration.toLowerCase());
          });
          if (!hasDurMatch) {
            return false;
          }
        }

        // 7. Funding Filter
        if (selectedFunding !== "Any funding") {
          const fundList: any[] = [];
          if (course.funding) {
            if (Array.isArray(course.funding)) {
              fundList.push(...course.funding);
            } else {
              fundList.push(course.funding);
            }
          }
          if (course.fundings && Array.isArray(course.fundings)) {
            fundList.push(...course.fundings);
          }
          const hasFundMatch = fundList.some((f) => {
            const name = typeof f === "string" ? f : f?.name || f?.title || "";
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
    section3Data,
    searchQuery,
    selectedSubject,
    selectedQualification,
    selectedMode,
    selectedLocation,
    selectedDuration,
    selectedFunding
  } = useDegreeCatalog();

  const [showAll, setShowAll] = useState(false);

  // Collapse back to top 3 whenever search terms or filter constraints change
  React.useEffect(() => {
    setShowAll(false);
  }, [
    searchQuery,
    selectedSubject,
    selectedQualification,
    selectedMode,
    selectedLocation,
    selectedDuration,
    selectedFunding
  ]);

  const coursesToDisplay = showAll ? filteredCourses : filteredCourses.slice(0, 3);

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
                  {coursesToDisplay.map((c: any, idx: number) => (
                    <CourseCard key={c._id || idx} course={c} variant="grid" />
                  ))}
                </div>
              ) : (
                <div className="search-card-list">
                  {coursesToDisplay.map((c: any, idx: number) => (
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

              {filteredCourses.length > 3 && !showAll ? (
                <div className="dsx-viewall">
                  <button
                    className="btn btn-blue"
                    onClick={() => setShowAll(true)}
                    type="button"
                    style={{ border: "none", cursor: "pointer" }}
                  >
                    View all {courseCount} courses →
                  </button>
                  <span>Showing top 3 matches</span>
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
