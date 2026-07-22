"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LocationResultsCarousel } from "@/components/locations/LocationResultsCarousel";
import { getAllCourses } from "@/services/course.service";
import { BackendCourse } from "@/types/course";

interface LocationsBodyProps {
  data: any;
}

export default function LocationsBody({ data }: LocationsBodyProps) {
  const [activeTab, setActiveTab] = useState<string>("london");
  const [apiCourses, setApiCourses] = useState<BackendCourse[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      const courses = await getAllCourses();
      setApiCourses(courses);
    }
    fetchCourses();
  }, []);

  const cities = data?.cities || [
    {
      id: "london",
      name: "London",
      floatDescription: "Largest choice · flexible routes · foundation year options",
      gridDescription: "Broad course choice, strong transport links and popular flexible study options.",
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
      badges: ["Growing hub", "Business routes", "Funding available"],
      image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=900&q=80",
      gridImage: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1100&q=82",
      buttonText: "Explore Leeds courses"
    }
  ];

  // Group dynamic API courses by city location
  const formattedCoursesData: Record<string, BackendCourse[]> = { ... (data?.courses_data || {}) };

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
              {(data?.section_3?.subjects || [
                { title: "Business", description: "Management, marketing, leadership", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=80" },
                { title: "Health & Care", description: "Care, wellbeing, leadership", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=80" },
                { title: "Construction", description: "Site, project and built environment", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=700&q=80" },
                { title: "Computing & Data", description: "Data, AI, cyber, digital", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=700&q=80" },
                { title: "Accounting", description: "Finance and business decisions", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=700&q=80" },
                { title: "Law", description: "Legal, compliance and business", image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=700&q=80" }
              ]).map((s: any, idx: number) => (
                <a key={idx} className="subject-card" href="#courses" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
                }}>
                  <img src={s.image} alt={s.title} />
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
        <section className="loc-section soft" id="compare">
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
                    {(data?.section_5?.comparison_table?.headers || ["What matters", "London", "Birmingham", "Manchester", "Leeds"]).map((h: string, idx: number) => (
                      <th key={idx}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(data?.section_5?.comparison_table?.rows || [
                    { matter: "Daytime / blended options", london: "✓ Broad choice", birmingham: "✓ Available", manchester: "✓ Available", leeds: "✓ Available" },
                    { matter: "Evening / weekend options", london: "✓ High", birmingham: "Limited", manchester: "Limited", leeds: "Adviser check" },
                    { matter: "Average commute stress", london: "Medium–High", birmingham: "Low–Medium", manchester: "Low–Medium", leeds: "Low" },
                    { matter: "Living support loan weight", london: "✓ Up to £14,135", birmingham: "Up to £10,830", manchester: "Up to £10,830", leeds: "Up to £10,830" },
                    { matter: "Local employment density", london: "✓ Maximum", birmingham: "High", manchester: "High", leeds: "Medium–High" }
                  ]).map((row: any, idx: number) => {
                    const renderCell = (val: string) => {
                      if (val?.startsWith("✓")) {
                        return <td key={val} className="yes">{val}</td>;
                      }
                      return <td key={val}>{val}</td>;
                    };
                    return (
                      <tr key={idx}>
                        <td>{row.matter}</td>
                        {renderCell(row.london)}
                        {renderCell(row.birmingham)}
                        {renderCell(row.manchester)}
                        {renderCell(row.leeds)}
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
        <section className="loc-section">
          <div className="wrap">
            <div className="funding-band" style={{ textAlign: "left" }}>
              <div>
                <h2>{data?.section_6?.title || "Funding may be available wherever you study."}</h2>
                <p>{data?.section_6?.description || "Eligible students may be able to access Tuition Fee Loan and Maintenance Loan support. YStudy can help you check your route before you apply."}</p>
                <Link className="loc-btn white" href="/tools/finance-calculator">
                  Estimate your funding →
                </Link>
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
            <div className="story-grid">
              {(data?.section_7?.stories || [
                { quote: "I study in London after school runs.", text: "Travelling in twice a week was tough at first, but blending it with online modules let me study Business Management while looking after my three kids.", author: "Priya K.", location: "London", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80" },
                { quote: "Birmingham weekend study changed everything.", text: "I couldn't leave my full-time factory job, so the Saturday timetable option for Computing let me gain skills without missing a single shift's pay.", author: "Marcus T.", location: "Birmingham", image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=800&q=80" },
                { quote: "Manchester blended learning fits my health career.", text: "As a clinical assistant, my shifts change every month. Having course materials available termly let me map lectures around my work plan.", author: "Amina R.", location: "Manchester", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80" }
              ]).map((s: any, idx: number) => (
                <article key={idx} className="story-card" style={{ textAlign: "left" }}>
                  <img src={s.image} alt={s.author} />
                  <div className="body">
                    <h3>"{s.quote}"</h3>
                    <p>"{s.text}"</p>
                    <b style={{ display: "block", marginTop: "12px", fontSize: "13.5px" }}>
                      — {s.author}, {s.location}
                    </b>
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
                <Link className="loc-btn white" href="/lead/adviser-call">
                  Book a free call →
                </Link>
                <Link className="loc-btn orange" href="/apply">
                  Apply with YStudy
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
