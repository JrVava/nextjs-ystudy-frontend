"use client";

import { useState } from "react";

interface LocationsBodyProps {
  data: any;
}

export default function LocationsBody({ data }: LocationsBodyProps) {
  const [activeTab, setActiveTab] = useState<string>("london");

  // Courses by location data matching the HTML audit template
  const coursesData: Record<string, any[]> = data?.courses_data || {};

  return (
    <>
      {/* FLOAT GRID SECTION */}
      <section className="loc-float">
        <div className="wrap loc-float-grid">
          {(data?.cities || []).map((city: any) => (
            <button
              key={city.id}
              className="loc-float-card"
              style={{ border: 0, padding: 0, width: "100%", textAlign: "left", cursor: "pointer" }}
              onClick={() => setActiveTab(city.id)}
            >
              <img src={city.image} alt={`${city.name} skyline`} />
              <div className="in">
                <b>{city.name}</b>
                <span>{city.floatDescription}</span>
                <em>View {city.name}</em>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CITIES EXPANSION CARDS */}
      {data?.section_2?.status !== false && (
        <section className="loc-section" id="cities">
          <div className="wrap">
            <div className="loc-head">
              <div>
                <span className="eyebrow">{data?.section_2?.badge}</span>
                <h2>{data?.section_2?.title}</h2>
              </div>
              <p>{data?.section_2?.description}</p>
            </div>
            <div className="city-grid">
              {(data?.cities || []).map((city: any) => (
                <article key={city.id} className="city-card" id={city.id}>
                  <img src={city.gridImage} alt={city.name} />
                  <div className="city-in">
                    <h3>{city.name}</h3>
                    <p>{city.gridDescription}</p>
                    <div className="loc-badges">
                      {city.badges?.map((badge: string, bIdx: number) => (
                        <span key={bIdx} className="loc-badge">{badge}</span>
                      ))}
                    </div>
                    <button
                      className="loc-btn orange"
                      onClick={() => {
                        setActiveTab(city.id);
                        document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {city.buttonText}
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
                <span className="eyebrow">{data?.section_3?.badge}</span>
                <h2>{data?.section_3?.title}</h2>
              </div>
              <p>{data?.section_3?.description}</p>
            </div>
            <div className="subject-grid ys-carousel-mobile">
              {data?.section_3?.subjects?.map((s: any, idx: number) => (
                <a key={idx} className="subject-card" href="#courses">
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

      {/* RESULTS TABS BY LOCATION */}
      {data?.section_4?.status !== false && (
        <section className="loc-section" id="courses">
          <div className="wrap">
            <div className="loc-head">
              <div>
                <span className="eyebrow">{data?.section_4?.badge}</span>
                <h2>{data?.section_4?.title}</h2>
              </div>
              <p>{data?.section_4?.description}</p>
            </div>
            <div className="location-results">
              <div className="location-tabs" role="tablist">
                {(data?.cities || []).map((city: any) => (
                  <button
                    key={city.id}
                    className={`location-tab ${activeTab === city.id ? "active" : ""}`}
                    type="button"
                    onClick={() => setActiveTab(city.id)}
                  >
                    {city.name}
                  </button>
                ))}
              </div>

              {(data?.cities || []).map((city: any) => (
                <div
                  key={city.id}
                  className={`location-course-panel ${activeTab === city.id ? "active" : ""}`}
                  role="tabpanel"
                >
                  <div className="location-title-row">
                    <div>
                      <h3 style={{ textTransform: "capitalize" }}>{city.name} courses</h3>
                      <p>Popular routes for mature students who can travel into {city.name} for flexible or blended study.</p>
                    </div>
                    <div className="carousel-controls">
                      <a className="loc-btn blue" href="/degrees#results">View all {city.name} courses →</a>
                    </div>
                  </div>
                  <div className="carousel-wrap">
                    <div className="medium-course-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px", overflow: "visible" }}>
                      {(coursesData[city.id] || []).map((course: any, idx: number) => (
                        <article className="mini-course-card" key={idx} style={{ textAlign: "left" }}>
                          <img src={course.img} alt="" />
                          <div className="mini-course-body">
                            <span className="course-chip">{course.subject}</span>
                            <h4>{course.title}</h4>
                            <p>{course.desc}</p>
                            <div className="mini-course-info">
                              <span>📍 {course.loc}</span>
                              <span>💷 {course.funding}</span>
                              <span>📅 {course.time}</span>
                              <span>💰 {course.salary}</span>
                            </div>
                            <div className="course-actions">
                              <a className="loc-btn blue" href={`/degrees/course/${course.title.toLowerCase().replace(/[\s\(\)]+/g, "-")}`}>View course</a>
                              <a className="loc-btn orange" href="/apply">Apply</a>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* QUICK LOCATION COMPARISON MATRIX */}
      {data?.section_5?.status !== false && (
        <section className="loc-section soft" id="compare">
          <div className="wrap">
            <div className="loc-head">
              <div>
                <span className="eyebrow">{data?.section_5?.badge}</span>
                <h2>{data?.section_5?.title}</h2>
              </div>
              <p>{data?.section_5?.description}</p>
            </div>
            <div className="compare-wrap">
              <table>
                <thead>
                  <tr>
                    {data?.section_5?.comparison_table?.headers?.map((h: string, idx: number) => (
                      <th key={idx}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data?.section_5?.comparison_table?.rows?.map((row: any, idx: number) => {
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
                <h2>{data?.section_6?.title}</h2>
                <p>{data?.section_6?.description}</p>
                <a className="loc-btn white" href="/tools/finance-calculator">Estimate your funding →</a>
              </div>
              <div className="funding-cards">
                {data?.section_6?.card && (
                  data.section_6.card.map((c: any, idx: number) => (
                    <div className="fund-card" key={idx}>
                      <small>{c.title}</small>
                      <b>{c.cost}</b>
                    </div>
                  ))
                )}
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
                <span className="eyebrow">{data?.section_7?.badge}</span>
                <h2>{data?.section_7?.title}</h2>
              </div>
              <p>{data?.section_7?.description}</p>
            </div>
            <div className="story-grid">
              {data?.section_7?.stories?.map((s: any, idx: number) => (
                <article key={idx} className="story-card" style={{ textAlign: "left" }}>
                  <img src={s.image} alt="" />
                  <div className="body">
                    <h3>"{s.quote}"</h3>
                    <p>"{s.text}"</p>
                    <b style={{ display: "block", marginTop: "12px", fontSize: "13.5px" }}>— {s.author}, {s.location}</b>
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
                <h2>{data?.section_8?.title}</h2>
                <p>{data?.section_8?.description}</p>
              </div>
              <div className="final-actions">
                <a className="loc-btn white" href="/lead/adviser-call">Book a free call →</a>
                <a className="loc-btn orange" href="/apply">Apply with YStudy</a>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
