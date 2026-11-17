"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FilterItem,
  filterStudyItems,
  FilteredStudyItem,
  StudyFilterPayload,
  getSubjects,
  getQualifications,
  getModes,
  getLocations,
  getDurations,
  getStudyRoutes,
  getFundings,
} from "@/services/filters.service";
import { ConversionStrip, CrossLinks } from "@/components/sections";

interface StudySearchShellProps {
  requireCollection?: "subjects" | "routes" | string;
  initialSubjects?: FilterItem[];
  initialQualifications?: FilterItem[];
  initialModes?: FilterItem[];
  initialLocations?: FilterItem[];
  initialDurations?: FilterItem[];
  initialStudyRoutes?: FilterItem[];
  initialFundings?: FilterItem[];
  s3?: any;
  s4?: any;
  s5?: any;
  s6?: any;
  s7?: any;
}

export function StudySearchShell({
  requireCollection = "subjects",
  initialSubjects = [],
  initialQualifications = [],
  initialModes = [],
  initialLocations = [],
  initialDurations = [],
  initialStudyRoutes = [],
  initialFundings = [],
  s3,
  s4,
  s5,
  s6,
  s7,
}: StudySearchShellProps) {
  const isRoutes = requireCollection === "routes" || requireCollection === "route";

  const [subjects, setSubjects] = useState<FilterItem[]>(initialSubjects);
  const [qualifications, setQualifications] = useState<FilterItem[]>(initialQualifications);
  const [modes, setModes] = useState<FilterItem[]>(initialModes);
  const [locations, setLocations] = useState<FilterItem[]>(initialLocations);
  const [durations, setDurations] = useState<FilterItem[]>(initialDurations);
  const [studyRoutes, setStudyRoutes] = useState<FilterItem[]>(initialStudyRoutes);
  const [fundings, setFundings] = useState<FilterItem[]>(initialFundings);

  const [selectedSubject, setSelectedSubject] = useState<string>("Any subject");
  const [selectedQualification, setSelectedQualification] = useState<string>("Any qualification");
  const [selectedMode, setSelectedMode] = useState<string>("Any mode");
  const [selectedLocation, setSelectedLocation] = useState<string>("Any location");
  const [selectedDuration, setSelectedDuration] = useState<string>("Any duration");
  const [selectedRoute, setSelectedRoute] = useState<string>("Any route");
  const [selectedFunding, setSelectedFunding] = useState<string>("Any");
  const [keyword, setKeyword] = useState<string>("");

  const [filteredCards, setFilteredCards] = useState<FilteredStudyItem[]>(() => {
    if (s3?.cards && s3.cards.length > 0) return s3.cards;
    const items = isRoutes ? initialStudyRoutes : initialSubjects;
    if (items && items.length > 0) {
      return items.map((item) => ({
        _id: item._id,
        title: item.title,
        description: item.description || "",
        link: isRoutes
          ? `/degrees/study-routes/${(item.slug || item.title.toLowerCase().replace(/\s+/g, "-")).replace(/^\//, "")}`
          : `/degrees/${(item.slug || item.title.toLowerCase().replace(/\s+/g, "-")).replace(/^\//, "")}`,
      }));
    }
    return [];
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [hasFiltered, setHasFiltered] = useState<boolean>(false);

  useEffect(() => {
    async function loadAllFilters() {
      try {
        const [
          subjRes,
          qualRes,
          modeRes,
          locRes,
          durRes,
          routeRes,
          fundRes,
        ] = await Promise.all([
          getSubjects().catch((err) => {
            console.error("[StudySearchShell] Failed to fetch subjects from /frontend/subject:", err);
            return [];
          }),
          getQualifications().catch((err) => {
            console.error("[StudySearchShell] Failed to fetch qualifications from /frontend/qualifications:", err);
            return [];
          }),
          getModes().catch((err) => {
            console.error("[StudySearchShell] Failed to fetch modes from /frontend/modes:", err);
            return [];
          }),
          getLocations().catch((err) => {
            console.error("[StudySearchShell] Failed to fetch locations from /frontend/locations:", err);
            return [];
          }),
          getDurations().catch((err) => {
            console.error("[StudySearchShell] Failed to fetch durations from /frontend/durations:", err);
            return [];
          }),
          getStudyRoutes().catch((err) => {
            console.error("[StudySearchShell] Failed to fetch study routes from /frontend/study-routes:", err);
            return [];
          }),
          getFundings().catch((err) => {
            console.error("[StudySearchShell] Failed to fetch fundings from /frontend/fundings:", err);
            return [];
          }),
        ]);

        if (subjRes.length > 0) setSubjects(subjRes);
        if (qualRes.length > 0) setQualifications(qualRes);
        if (modeRes.length > 0) setModes(modeRes);
        if (locRes.length > 0) setLocations(locRes);
        if (durRes.length > 0) setDurations(durRes);
        if (routeRes.length > 0) setStudyRoutes(routeRes);
        if (fundRes.length > 0) setFundings(fundRes);
      } catch (error) {
        console.error("[StudySearchShell] Error loading filter options:", error);
      }
    }

    loadAllFilters();
  }, []);

  // Update initial cards once items are fetched if not yet filtered and s3 cards not present
  useEffect(() => {
    if (!hasFiltered) {
      if (s3?.cards && s3.cards.length > 0) {
        setFilteredCards(s3.cards);
      } else {
        const items = isRoutes ? studyRoutes : subjects;
        if (items.length > 0) {
          setFilteredCards(
            items.map((item) => ({
              _id: item._id,
              title: item.title,
              description: item.description || "",
              link: isRoutes
                ? `/degrees/study-routes/${(item.slug || item.title.toLowerCase().replace(/\s+/g, "-")).replace(/^\//, "")}`
                : `/degrees/${(item.slug || item.title.toLowerCase().replace(/\s+/g, "-")).replace(/^\//, "")}`,
            }))
          );
        }
      }
    }
  }, [subjects, studyRoutes, s3?.cards, hasFiltered, isRoutes]);

  const handleApplyFilters = async () => {
    setLoading(true);
    try {
      const payload: StudyFilterPayload = {
        requireCollection,
        subject: selectedSubject !== "Any subject" ? selectedSubject : undefined,
        qualification: selectedQualification !== "Any qualification" ? selectedQualification : undefined,
        mode: selectedMode !== "Any mode" ? selectedMode : undefined,
        location: selectedLocation !== "Any location" ? selectedLocation : undefined,
        duration: selectedDuration !== "Any duration" ? selectedDuration : undefined,
        route: selectedRoute !== "Any route" ? selectedRoute : undefined,
        funding: selectedFunding !== "Any" ? selectedFunding : undefined,
        keyword: keyword.trim() || undefined,
      };

      const res = await filterStudyItems(payload);
      setFilteredCards(res);
      setHasFiltered(true);
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error("[StudySearchShell] Error filtering:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setSelectedSubject("Any subject");
    setSelectedQualification("Any qualification");
    setSelectedMode("Any mode");
    setSelectedLocation("Any location");
    setSelectedDuration("Any duration");
    setSelectedRoute("Any route");
    setSelectedFunding("Any");
    setKeyword("");
    setHasFiltered(false);

    if (s3?.cards && s3.cards.length > 0) {
      setFilteredCards(s3.cards);
    } else {
      const items = isRoutes ? studyRoutes : subjects;
      setFilteredCards(
        items.map((item) => ({
          _id: item._id,
          title: item.title,
          description: item.description || "",
          link: isRoutes
            ? `/degrees/study-routes/${(item.slug || item.title.toLowerCase().replace(/\s+/g, "-")).replace(/^\//, "")}`
            : `/degrees/${(item.slug || item.title.toLowerCase().replace(/\s+/g, "-")).replace(/^\//, "")}`,
        }))
      );
    }
  };

  return (
    <div className="search-shell">
      {/* ASIDE: ADVANCED FILTERS */}
      <aside className="advanced-filter-card">
        <div className="advanced-filter-head">
          <h2>Advanced filters</h2>
          <button
            type="button"
            className="clear-link"
            onClick={handleClearAll}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            Clear all
          </button>
        </div>

        {/* 1. SUBJECT AREA */}
        <div className="field-block">
          <label>Subject area</label>
          <select
            className="filter-select"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="Any subject">Any subject</option>
            {subjects && subjects.length > 0 ? (
              subjects.map((sub: any) => {
                const title = sub.title || sub.name || "";
                const id = sub._id?.toString() || sub.id?.toString() || "";
                return (
                  <option key={id || title} value={id}>
                    {title}
                  </option>
                );
              })
            ) : (
              <option value="" disabled>
                No subjects available
              </option>
            )}
          </select>
        </div>

        {/* 2. QUALIFICATION */}
        <div className="field-block">
          <label>Qualification</label>
          <select
            className="filter-select"
            value={selectedQualification}
            onChange={(e) => setSelectedQualification(e.target.value)}
          >
            <option value="Any qualification">Any qualification</option>
            {qualifications && qualifications.length > 0 ? (
              qualifications.map((qual: any) => {
                const title = qual.title || qual.name || "";
                const id = qual._id?.toString() || qual.id?.toString() || "";
                return (
                  <option key={id || title} value={id}>
                    {title}
                  </option>
                );
              })
            ) : (
              <option value="" disabled>
                No qualifications available
              </option>
            )}
          </select>
        </div>

        {/* 3. STUDY MODE */}
        <div className="field-block">
          <label>Study mode</label>
          <select
            className="filter-select"
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
          >
            <option value="Any mode">Any mode</option>
            {modes && modes.length > 0 ? (
              modes.map((m: any) => {
                const title = m.title || m.name || "";
                const id = m._id?.toString() || m.id?.toString() || "";
                return (
                  <option key={id || title} value={id}>
                    {title}
                  </option>
                );
              })
            ) : (
              <option value="" disabled>
                No study modes available
              </option>
            )}
          </select>
        </div>

        {/* 4. LOCATION */}
        <div className="field-block">
          <label>Location</label>
          <select
            className="filter-select"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="Any location">Any location</option>
            {locations && locations.length > 0 ? (
              locations.map((loc: any) => {
                const title = loc.title || loc.name || "";
                const id = loc._id?.toString() || loc.id?.toString() || "";
                return (
                  <option key={id || title} value={id}>
                    {title}
                  </option>
                );
              })
            ) : (
              <option value="" disabled>
                No locations available
              </option>
            )}
          </select>
        </div>

        {/* 5. DURATION */}
        <div className="field-block">
          <label>Duration</label>
          <select
            className="filter-select"
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
          >
            <option value="Any duration">Any duration</option>
            {durations && durations.length > 0 ? (
              durations.map((dur: any) => {
                const title = dur.title || dur.name || "";
                const id = dur._id?.toString() || dur.id?.toString() || "";
                return (
                  <option key={id || title} value={id}>
                    {title}
                  </option>
                );
              })
            ) : (
              <option value="" disabled>
                No durations available
              </option>
            )}
          </select>
        </div>

        {/* 6. ENTRY ROUTE */}
        <div className="field-block">
          <label>Entry route</label>
          <select
            className="filter-select"
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
          >
            <option value="Any route">Any route</option>
            {studyRoutes && studyRoutes.length > 0 ? (
              studyRoutes.map((rt: any) => {
                const title = rt.title || rt.name || "";
                const id = rt._id?.toString() || rt.id?.toString() || "";
                return (
                  <option key={id || title} value={id}>
                    {title}
                  </option>
                );
              })
            ) : (
              <option value="" disabled>
                No entry routes available
              </option>
            )}
          </select>
        </div>

        {/* 7. FUNDING */}
        <div className="field-block">
          <label>Funding</label>
          <select
            className="filter-select"
            value={selectedFunding}
            onChange={(e) => setSelectedFunding(e.target.value)}
          >
            <option value="Any">Any</option>
            {fundings && fundings.length > 0 ? (
              fundings.map((f: any) => {
                const title = f.title || f.name || "";
                const id = f._id?.toString() || f.id?.toString() || "";
                return (
                  <option key={id || title} value={id}>
                    {title}
                  </option>
                );
              })
            ) : (
              <option value="" disabled>
                No funding options available
              </option>
            )}
          </select>
        </div>

        {/* KEYWORD SEARCH */}
        <div className="field-block">
          <label>Keyword search</label>
          <input
            type="text"
            className="filter-input"
            placeholder="management, tech, care..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleApplyFilters();
              }
            }}
          />
        </div>

        <button
          type="button"
          className="btn btn-blue apply-filters-btn"
          onClick={handleApplyFilters}
          disabled={loading}
          style={{ width: "100%", cursor: loading ? "wait" : "pointer" }}
        >
          {loading ? "Filtering..." : "Apply filters"}
        </button>

        <div className="notice" style={{ marginTop: "18px", display: "block", padding: "18px", borderRadius: "22px" }}>
          <h3 style={{ fontSize: "20px" }}>Funding warning</h3>
          <p style={{ fontSize: "14px" }}>
            Online, distance-learning and weekend-only routes may affect Maintenance Loan eligibility. Ask adviser before applying.
          </p>
        </div>
      </aside>

      {/* MAIN CONTENT COLUMN */}
      <main>
        {s3?.status !== false && (
          <section className="section">
            <div className="container">
              <div className="section-head">
                <span className="eyebrow">{s3?.badge || "YStudy resource"}</span>
                <h1>{s3?.title || "Study Subjects"}</h1>
                <p>
                  {s3?.description ||
                    "Explore popular subjects for adult learners, including business, computing, psychology, law, construction and health."}
                </p>
              </div>

              {loading ? (
                <div style={{ textAlign: "center", padding: "48px 0", color: "#475467" }}>
                  <p style={{ fontSize: "16px", fontWeight: 600 }}>
                    {isRoutes ? "Filtering study routes..." : "Filtering subjects..."}
                  </p>
                </div>
              ) : filteredCards.length > 0 ? (
                <div className="card-grid three">
                  {filteredCards.map((card: any, idx: number) => (
                    <article className="card" key={card._id || idx}>
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                      <Link className="link" href={card.link || "/degrees/"}>
                        Open →
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "48px 0", color: "#475467" }}>
                  <p style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px" }}>
                    {isRoutes
                      ? "No study routes found matching your selected filters."
                      : "No subjects found matching your selected filters."}
                  </p>
                  <button
                    type="button"
                    className="btn btn-blue"
                    onClick={() => handleClearAll()}
                    style={{ display: "inline-block" }}
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {s4?.status !== false && (
                <div className="cta-panel" style={{ marginTop: "28px" }}>
                  <h2>{s4?.title || "Need help choosing the right route?"}</h2>
                  <p>{s4?.description || "Use Degree Match Finder or speak to a YStudy adviser before applying."}</p>
                  <div className="btnrow">
                    <Link className="btn btn-blue" href="/tools/degree-match">
                      Find my degree
                    </Link>
                    <Link className="btn btn-orange" href="/apply">
                      Apply with YStudy
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* MAIN SUBJECT GUIDES */}
        {!isRoutes && s5?.status !== false && (
          <section className="v705-sec">
            <div className="v705-wrap">
              <div className="v705-head">
                <div style={{ textAlign: "left" }}>
                  <span className="kicker">{s5?.badge || "Main subject guides"}</span>
                  <h2>{s5?.title || "Explore the subjects students ask about most."}</h2>
                </div>
              </div>
              <div className="v705-grid">
                {subjects && subjects.length > 0
                  ? subjects.map((sub: any, idx: number) => {
                    const slugVal = sub.slug || sub.title?.toLowerCase()?.trim().replace(/\s+/g, "-") || "";
                    return (
                      <Link key={sub._id || idx} className="v705-card" href={`/degrees/${slugVal.replace(/^\//, "")}`}>
                        <h3>{sub.title}</h3>
                        <p>{sub.description || sub.short_description || ""}</p>
                      </Link>
                    );
                  })
                  : (s5?.cards || []).map((card: any, idx: number) => (
                    <Link key={idx} className="v705-card" href={card.link || "/degrees/"}>
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                    </Link>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* CONVERSION SYSTEM */}
        <ConversionStrip
          cards={isRoutes ? s5?.cards : s6?.cards}
          status={isRoutes ? s5?.status : s6?.status}
        />

        {/* CROSSLINKS */}
        <CrossLinks
          title={isRoutes ? s6?.title : s7?.title}
          description={isRoutes ? s6?.description : s7?.description}
          cards={isRoutes ? s6?.cards : s7?.cards}
          status={isRoutes ? s6?.status : s7?.status}
        />
      </main>
    </div>
  );
}

export const SubjectsSearchShell = StudySearchShell;
export default StudySearchShell;
