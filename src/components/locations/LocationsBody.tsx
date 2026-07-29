"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LocationResultsCarousel } from "@/components/locations/LocationResultsCarousel";
import { getAllCourses } from "@/services/course.service";
import { getSubjects } from "@/services/filters.service";
import { BackendCourse } from "@/types/course";

interface LocationsBodyProps {
  data: any;
}

export default function LocationsBody({ data }: LocationsBodyProps) {
  const [activeTab, setActiveTab] = useState<string>("london");
  const [apiCourses, setApiCourses] = useState<BackendCourse[]>([]);
  const [dynamicSubjects, setDynamicSubjects] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      const courses = await getAllCourses();
      setApiCourses(courses);
    }
    fetchCourses();
  }, []);

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const subjects = await getSubjects(6);
        if (subjects && subjects.length > 0) {
          setDynamicSubjects(subjects);
        }
      } catch (error) {
        console.error("Error loading subjects:", error);
      }
    }
    fetchSubjects();
  }, []);

  const cities = data?.cities || [
    {
      id: "london",
      name: "London",
      floatDescription: "Largest choice · flexible routes · foundation year options",
      gridDescription: "Broad course choice, strong transport links and popular flexible study options.",
      carouselDescription: "Popular routes for mature students who can travel into London for flexible or blended study.",
      badges: ["20+ courses", "Foundation routes", "Funding available"],
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80",
      gridImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1100&q=82",
      buttonText: "Explore London courses"
    },
    {
      id: "birmingham",
      name: "Birmingham",
      floatDescription: "Central location · mature student friendly · practical courses",
      gridDescription: "A practical Midlands hub for adult learners looking for flexible degree routes.",
      carouselDescription: "Central England options for adults balancing work, family and study.",
      badges: ["15+ courses", "Evening/weekend", "Central England"],
      image: "https://images.unsplash.com/photo-1543946207-39bd91e70ca7?auto=format&fit=crop&w=900&q=80",
      gridImage: "https://images.unsplash.com/photo-1543946207-39bd91e70ca7?auto=format&fit=crop&w=1100&q=82",
      buttonText: "Explore Birmingham courses"
    },
    {
      id: "manchester",
      name: "Manchester",
      floatDescription: "Weekend & blended routes · career-focused subjects",
      gridDescription: "Popular with working adults interested in business, health and technology routes.",
      carouselDescription: "Career-focused routes for working adults in business, care, computing and technology.",
      badges: ["12+ courses", "Blended options", "Career-focused"],
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
      gridImage: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1100&q=82",
      buttonText: "Explore Manchester courses"
    },
    {
      id: "leeds",
      name: "Leeds",
      floatDescription: "Growing city · business and career routes · lower living costs",
      gridDescription: "A strong Northern city for business, finance, digital and career-focused study routes.",
      carouselDescription: "A growing Northern option for business, finance, digital and career-focused study planning.",
      badges: ["Growing hub", "Business routes", "Funding available"],
      image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=900&q=80",
      gridImage: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1100&q=82",
      buttonText: "Explore Leeds courses"
    }
  ];

  // Group dynamic API courses by city location
  const formattedCoursesData: Record<string, BackendCourse[]> = { ...(data?.courses_data || {}) };

  if (apiCourses && apiCourses.length > 0) {
    cities.forEach((city: any) => {
      const cityId = city.id;
      const matching = apiCourses.filter((c) => {
        if (!c.locations || c.locations.length === 0) return true; // Default show if unconstrained
        return c.locations.some((loc: any) => {
          const locName = typeof loc === "string" ? loc.toLowerCase() : (loc.name || loc.city || "").toLowerCase();
          return locName.includes(cityId) || locName.includes(city.name.toLowerCase());
        });
      });
      if (matching.length > 0) {
        formattedCoursesData[cityId] = matching;
      }
    });
  }

  const subjectsToRender = data?.section_3?.subjects || (dynamicSubjects.length > 0 ? dynamicSubjects : [
    { title: "Business", description: "Management, marketing, leadership", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=80" },
    { title: "Health & Care", description: "Care, wellbeing, leadership", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=80" },
    { title: "Construction", description: "Site, project and built environment", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=700&q=80" },
    { title: "Computing & Data", description: "Data, AI, cyber, digital", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=700&q=80" },
    { title: "Accounting", description: "Finance and business decisions", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=700&q=80" },
    { title: "Law", description: "Legal, compliance and business", image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=700&q=80" }
  ]);

  return (
    <>
      {/* FLOAT GRID SECTION */}
      <section className="loc-float">
        <div className="wrap loc-float-grid">
          {cities.map((city: any) => (
            <a
              key={city.id}
              className="loc-float-card"
              href={`#${city.id}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(city.id);
                document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <img src={city.image} alt={city.name} />
              <div className="in">
                <b>{city.name}</b>
                <span>{city.floatDescription}</span>
                <em>View {city.name}</em>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CITIES EXPANSION CARDS */}
      {data?.section_2?.status !== false && (
        <section className="loc-section" id="cities">
          <div className="wrap">
            <div className="loc-head">
              <div>
                <span className="eyebrow">{data?.section_2?.badge || "Study by city"}</span>
                <h2>{data?.section_2?.title || "Start with the place you can actually attend."}</h2>
              </div>
              <p>{data?.section_2?.description || "Location is not a detail for mature students. It decides your commute, timetable, costs and whether the course is realistic around work and family."}</p>
            </div>
            <div className="city-grid">
              {cities.map((city: any) => (
                <article key={city.id} className="city-card" id={city.id}>
                  <img src={city.gridImage || city.image} alt={city.name} />
                  <div className="city-in">
                    <h3>{city.name}</h3>
                    <p>{city.gridDescription}</p>
                    <div className="loc-badges">
                      {city.badges?.map((badge: string, bIdx: number) => (
                        <span key={bIdx} className="loc-badge">{badge}</span>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="loc-btn orange"
                      onClick={() => {
                        setActiveTab(city.id);
                        document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {city.buttonText || `Explore ${city.name} courses`}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CHOOSE SUBJECT ENTRY POINTS */}
      {data?.section_3?.status !== false && (
        <section className="loc-section soft" id="subjects">
          <div className="wrap">
            <div className="loc-head">
              <div>
                <span className="eyebrow">{data?.section_3?.badge || "Choose subject"}</span>
                <h2>{data?.section_3?.title || "Then choose the subject that fits your future."}</h2>
              </div>
              <p>{data?.section_3?.description || "Use these subject groups as simple entry points into course results. No extra submenu, no duplicated pathways — just city, subject and relevant courses."}</p>
            </div>
            <div className="subject-grid ys-carousel-mobile">
              {subjectsToRender.map((s: any, idx: number) => (
                <a key={idx} className="subject-card" href="#courses" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
                }}>
                  <img src={s.fullImageUrl || s.image} alt={s.title} />
                  <div className="in">
                    <b>{s.title}</b>
                    <span>{s.description}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RESULTS TABS & CAROUSEL */}
      {data?.section_4?.status !== false && (
        <section className="loc-section" id="courses">
          <div className="wrap">
            <div className="loc-head">
              <div>
                <span className="eyebrow">{data?.section_4?.badge || "Course results"}</span>
                <h2>{data?.section_4?.title || "Available courses by location."}</h2>
              </div>
              <p>{data?.section_4?.description || "Use these as quick entry points into the full Search Degrees page. Each card uses the same course-card logic: photo, location, timetable, funding, value and clear action buttons."}</p>
            </div>
            
            <LocationResultsCarousel
              cities={cities}
              coursesData={formattedCoursesData}
              initialTab={activeTab}
            />
          </div>
        </section>
      )}

      {/* QUICK LOCATION COMPARISON MATRIX */}
      {data?.section_5?.status !== false && (
        <section className="loc-section soft" id="compare-locations">
          <div className="wrap">
            <div className="loc-head">
              <div>
                <span className="eyebrow">{data?.section_5?.badge || "Compare"}</span>
                <h2>{data?.section_5?.title || "Compare locations quickly."}</h2>
              </div>
              <p>{data?.section_5?.description || "One clean comparison only — no repeated city content. This helps students decide where to focus before speaking to an adviser."}</p>
            </div>
            <div className="compare-wrap">
              <table>
                <thead>
                  <tr>
                    {(data?.section_5?.comparison_table?.headers || ["Location", "Popular subjects", "Foundation routes", "Evening / weekend", "Best for"]).map((h: string, idx: number) => (
                      <th key={idx}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(data?.section_5?.comparison_table?.rows || [
                    { location: "London", subjects: "Business, Health, Data, Construction", foundation: "Yes", weekend: "Yes", best: "Largest course choice" },
                    { location: "Birmingham", subjects: "Business, Health, Construction", foundation: "Yes", weekend: "Yes", best: "Central England learners" },
                    { location: "Manchester", subjects: "Business, Health, Data", foundation: "Yes", weekend: "Yes", best: "Northern working adults" },
                    { location: "Leeds", subjects: "Business, Finance, Digital", foundation: "Yes", weekend: "Check route", best: "Business and finance-focused learners" }
                  ]).map((row: any, idx: number) => {
                    const renderCell = (val: string, k: string) => {
                      if (val === "Yes" || val?.startsWith("✓")) {
                        return <td key={k} className="yes">{val}</td>;
                      }
                      return <td key={k}>{val}</td>;
                    };
                    const cells = [];
                    if (row.location !== undefined) {
                      cells.push(<td key="loc">{row.location}</td>);
                      cells.push(<td key="sub">{row.subjects}</td>);
                      cells.push(renderCell(row.foundation, "found"));
                      cells.push(renderCell(row.weekend, "week"));
                      cells.push(<td key="best">{row.best}</td>);
                    } else {
                      cells.push(<td key="matter">{row.matter}</td>);
                      cells.push(renderCell(row.london, "lon"));
                      cells.push(renderCell(row.birmingham, "bir"));
                      cells.push(renderCell(row.manchester, "man"));
                      cells.push(renderCell(row.leeds, "lee"));
                    }
                    return (
                      <tr key={idx}>
                        {cells}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* SFE ENTITLEMENT DETAILS BAND */}
      {data?.section_6?.status !== false && (
        <section className="loc-section" id="funding">
          <div className="wrap">
            <div className="funding-band" style={{ textAlign: "left" }}>
              <div>
                <h2>{data?.section_6?.title || "Funding may be available wherever you study."}</h2>
                <p>{data?.section_6?.description || "Eligible students may be able to access Tuition Fee Loan and Maintenance Loan support. YStudy can help you check your route before you apply."}</p>
                <div className="loc-actions">
                  <Link className="loc-btn orange" href="/tools/eligibility-checker">
                    Check eligibility
                  </Link>
                  <Link className="loc-btn white" href="/funding">
                    Funding guide
                  </Link>
                </div>
              </div>
              <div className="funding-cards">
                {(data?.section_6?.card || [
                  { title: "Tuition Fee Loan", cost: "£9,790" },
                  { title: "Maintenance Loan", cost: "Up to £14,135" }
                ]).map((c: any, idx: number) => (
                  <div className="fund-card" key={idx}>
                    <small>{c.title}</small>
                    <b>{c.cost}</b>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* STUDENT STORIES */}
      {data?.section_7?.status !== false && (
        <section className="loc-section soft" id="stories">
          <div className="wrap">
            <div className="loc-head">
              <div>
                <span className="eyebrow">{data?.section_7?.badge || "Student stories"}</span>
                <h2>{data?.section_7?.title || "Adult learners choose locations for real-life reasons."}</h2>
              </div>
              <p>{data?.section_7?.description || "Short, location-based stories help students imagine how study could fit around work, family and travel."}</p>
            </div>
            <div className="story-grid story-carousel">
              {(data?.section_7?.stories || [
                { author: "Maria", location: "London", text: "Chose Health & Social Care because the location and timetable fitted around childcare and part-time work.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80" },
                { author: "Ahmed", location: "Birmingham", text: "Used practical construction experience as a starting point for a more management-focused direction.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80" },
                { author: "David", location: "Manchester", text: "Started with Business Management after looking for a location and schedule he could realistically attend.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80" }
              ]).map((s: any, idx: number) => (
                <article key={idx} className="story-card" style={{ textAlign: "left" }}>
                  <img src={s.image} alt={s.author || s.name} />
                  <div className="body">
                    {s.quote ? (
                      <>
                        <h3>"{s.quote}"</h3>
                        <p>"{s.text || s.description}"</p>
                        <b style={{ display: "block", marginTop: "12px", fontSize: "13.5px" }}>
                          — {s.author || s.name}, {s.location || s.year}
                        </b>
                      </>
                    ) : (
                      <>
                        <h3>{s.author || s.name}, {s.location || s.year}</h3>
                        <p>{s.text || s.description}</p>
                      </>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CALL TO ACTION */}
      {data?.section_8?.status !== false && (
        <section className="loc-section">
          <div className="wrap">
            <div className="final-cta" style={{ textAlign: "left" }}>
              <div>
                <h2>{data?.section_8?.title || "Ready to choose your location?"}</h2>
                <p>{data?.section_8?.description || "Search degrees, check funding and apply with free YStudy guidance."}</p>
              </div>
              <div className="final-actions">
                <Link className="loc-btn blue" href="/degrees#results">
                  Search degrees
                </Link>
                <Link className="loc-btn orange" href="/apply">
                  Apply with YStudy
                </Link>
                <Link className="loc-btn navy" href="/lead/adviser-call">
                  Book adviser
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
