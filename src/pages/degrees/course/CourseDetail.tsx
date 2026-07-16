import { getCMSPageContent } from "@/services/cms.service";
import "@/app/degrees/qualifications/qualifications.css";
import { Banner } from "@/components/ui/Banner";

interface CourseDetailProps {
  slug: string;
}

export default async function CourseDetail({ slug }: CourseDetailProps) {
  const data = await getCMSPageContent(slug);

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Course Not Found</h2>
        <p>We couldn't retrieve the details for "{slug}".</p>
        <a href="/degrees" className="btn btn-blue" style={{ marginTop: "1rem" }}>Browse Degrees</a>
      </div>
    );
  }

  const title = data.title || (slug || "").replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="qualification-page course-detail-page">
      {/* 1. HERO BANNER WITH DYNAMIC API */}
      <Banner
        slug={slug}
        fallbackTitle={title}
        fallbackDescription="A flexible degree built for working adults — funding and outcomes mapped before you apply."
        fallbackBadgeText="Featured Course"
        fallbackBgImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2000&q=80"
        fallbackRightCard={{
          layoutType: 'grid-2x2',
          title: 'Course snapshot',
          description: 'Typical salary: £24k – £55k+',
          items: [
            { title: 'Duration', value: '3 yrs' },
            { title: 'Study mode', value: 'Blended' },
            { title: 'Maintenance', value: '£14k+' },
            { title: 'Funding', value: 'SFE' }
          ]
        }}
      >
        <div style={{ textAlign: "left", width: "100%" }}>
          <p className="bc" style={{ margin: "0 0 16px", color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>
            <a href="/" style={{ color: "#fff", textDecoration: "none" }}>Home</a> ›{" "}
            <a href="/degrees" style={{ color: "#fff", textDecoration: "none" }}>Degrees</a> › {title}
          </p>
          <div className="chbtns" style={{ marginTop: "24px" }}>
            <a className="btn orange lg" href="/apply">Apply with YStudy →</a>
            <a className="btn ghost lg" href="/lead/adviser-call">Book adviser</a>
          </div>
        </div>
      </Banner>

      {/* 2. STICKY SUBNAV */}
      <div className="subnav">
        <div className="wrap">
          <a href="#overview">Overview</a>
          <a href="#salary">Salary</a>
          <a href="#funding">Funding</a>
          <a href="#study">Study</a>
          <a href="#reviews">Reviews</a>
          <a href="#entry">Entry</a>
          <a href="#faq">FAQ</a>
        </div>
      </div>

      {/* 3. COURSE OVERVIEW */}
      {data.section_3 && data.section_3.status !== false && (
        <section className="qf-sec" id="overview">
          <div className="qf">
            <div className="qf-head" style={{ textAlign: "left" }}>
              <span className="kicker">{data.section_3.badge || "Overview"}</span>
              <h2>{data.section_3.title || "A practical degree, built around your life."}</h2>
              <p>{data.section_3.description}</p>
            </div>

            <div className="qf-grid3">
              {data.section_3.cards?.map((c: any, idx: number) => (
                <div className="rolecard" key={idx}>
                  <div style={{ fontSize: "28px", marginBottom: "10px" }}>{c.icon || "🎯"}</div>
                  <h4>{c.title}</h4>
                  <p>{c.description}</p>
                </div>
              ))}
            </div>

            {data.section_3.tiles && (
              <div className="qf-grid4" style={{ marginTop: "28px" }}>
                {data.section_3.tiles.map((t: any, idx: number) => (
                  <div className="snaptile" key={idx} style={{ background: "var(--soft)", border: "1px solid var(--line)", borderRadius: "16px", padding: "16px 18px", textAlign: "left" }}>
                    <b style={{ display: "block", color: "var(--b)", fontSize: "clamp(20px, 1.6vw, 26px)", fontWeight: 900 }}>{t.value}</b>
                    <span style={{ color: "var(--muted)", fontWeight: 700, fontSize: "13px" }}>{t.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. SALARY & CAREERS */}
      {data.section_4 && data.section_4.status !== false && (
        <section className="qf-sec" id="salary" style={{ background: "var(--soft)" }}>
          <div className="qf">
            <div className="qf-head" style={{ textAlign: "left" }}>
              <span className="kicker">{data.section_4.badge || "Outcomes"}</span>
              <h2>{data.section_4.title || "What jobs can this degree lead to?"}</h2>
              <p>{data.section_4.description}</p>
            </div>

            <div className="qf-courses">
              {data.section_4.cards?.map((c: any, idx: number) => (
                <a className="pstory routec" href={c.link || "/tools/salary-checker"} key={idx} style={{ minHeight: "300px" }}>
                  <img className="bg" src={c.image} alt={c.role} />
                  <div className="scrim"></div>
                  <div className="ps-inner" style={{ padding: "20px" }}>
                    <h4 style={{ fontSize: "20px", fontWeight: 900, color: "#fff", margin: "0 0 4px" }}>{c.role}</h4>
                    <div style={{ fontSize: "22px", fontWeight: 900, color: "#fff", marginBottom: "8px" }}>{c.pay}</div>
                    <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px", margin: "0 0 12px" }}>{c.description}</p>
                    <span style={{ color: "var(--o-amber)", fontWeight: 800, fontSize: "13px" }}>See this route →</span>
                  </div>
                </a>
              ))}
            </div>

            <div style={{ marginTop: "32px", textAlign: "left" }}>
              <a className="btn outline" href="/tools/salary-checker">Explore salaries →</a>
            </div>
          </div>
        </section>
      )}

      {/* 5. STUDENT FINANCE SUPPORT */}
      {data.section_5 && data.section_5.status !== false && (
        <section className="qf-sec" id="funding">
          <div className="qf">
            <div className="qf-compare" style={{ alignItems: "start", gap: "clamp(30px, 4vw, 60px)" }}>
              <div style={{ textAlign: "left" }}>
                <span className="kicker">{data.section_5.badge || "Support"}</span>
                <h2 style={{ fontSize: "clamp(30px, 3.2vw, 52px)", fontWeight: 900, margin: "8px 0 14px", lineHeight: 1.1 }}>{data.section_5.title || "Estimate support before applying."}</h2>
                <p style={{ color: "var(--muted)", fontWeight: 600, fontSize: "16px", marginBottom: "24px" }}>{data.section_5.description}</p>

                <div className="snapcard" style={{ boxShadow: "var(--shadow)", padding: "26px", border: "1px solid var(--line)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "14px" }}>
                    <span style={{ fontWeight: 800, color: "var(--muted)" }}>Total possible support</span>
                    <b style={{ color: "var(--b)", fontSize: "30px", fontWeight: 900 }}>{data.section_5.totalSupport || "£23,925"}</b>
                  </div>
                  <div className="snapgrid" style={{ margin: 0 }}>
                    {data.section_5.tiles?.map((tile: any, idx: number) => (
                      <div className="snaptile" key={idx}>
                        <b style={{ fontSize: "20px" }}>{tile.value}</b>
                        <span>{tile.label}</span>
                      </div>
                    ))}
                    <div className="snaptile" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <a className="btn blue sm" href="/tools/finance-calculator">Open full calculator</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estimate Widget */}
              <div className="widget" style={{ border: "1px solid var(--line)", borderRadius: "24px", padding: "26px", boxShadow: "var(--shadow-lg)" }}>
                <div style={{ fontWeight: 900, fontSize: "18px", marginBottom: "14px", textAlign: "left" }}>Quick estimate</div>
                <div className="field" style={{ textAlign: "left" }}>
                  <label style={{ fontSize: "13px", fontWeight: 900 }}>Location</label>
                  <div className="inp">London</div>
                </div>
                <div className="field" style={{ textAlign: "left" }}>
                  <label style={{ fontSize: "13px", fontWeight: 900 }}>Study mode</label>
                  <div className="inp">Blended / campus</div>
                </div>
                <div className="field" style={{ textAlign: "left" }}>
                  <label style={{ fontSize: "13px", fontWeight: 900 }}>Household income</label>
                  <div className="inp">Under £25k</div>
                </div>
                <button className="btn orange" style={{ width: "100%", marginTop: "10px" }} type="button">Check eligibility →</button>
                <div className="result" style={{ marginTop: "16px", borderRadius: "16px", padding: "20px", background: "linear-gradient(135deg, var(--b-deep), var(--b))", color: "#fff", textAlign: "left" }}>
                  <div className="lbl" style={{ fontSize: "13px", color: "#cdd9ec", fontWeight: 800 }}>Indicative total support</div>
                  <div className="big" style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 900 }}>{data.section_5.totalSupport || "£23,925"}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. WHY THIS COURSE */}
      {data.section_6 && data.section_6.status !== false && (
        <section className="qf-sec" style={{ background: "var(--soft)" }}>
          <div className="qf">
            <div className="qf-head" style={{ textAlign: "left" }}>
              <span className="kicker">{data.section_6.badge || "Features"}</span>
              <h2>{data.section_6.title}</h2>
              <p>{data.section_6.description}</p>
            </div>

            <div className="qf-grid3">
              {data.section_6.cards?.map((c: any, idx: number) => (
                <div className="rolecard" key={idx}>
                  <div style={{ fontSize: "28px", marginBottom: "10px" }}>{c.icon || "💼"}</div>
                  <h4>{c.title}</h4>
                  <p>{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. STUDY STRUCTURE */}
      {data.section_7 && data.section_7.status !== false && (
        <section className="qf-sec" id="study">
          <div className="qf">
            <div className="qf-head" style={{ textAlign: "left" }}>
              <span className="kicker">{data.section_7.badge || "Syllabus"}</span>
              <h2>{data.section_7.title || "What you could study."}</h2>
              <p>{data.section_7.description}</p>
            </div>

            <div className="qf-grid3">
              {data.section_7.cards?.map((c: any, idx: number) => (
                <div className="yearcard" key={idx}>
                  <div className="yn">{c.year}</div>
                  <h4>{c.title}</h4>
                  <p style={{ color: "var(--muted)", fontWeight: 600, fontSize: "14px" }}>{c.subtitle}</p>
                  <ul>
                    {c.modules?.map((mod: string, mIdx: number) => (
                      <li key={mIdx}>{mod}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. STUDY MODES */}
      {data.section_8 && data.section_8.status !== false && (
        <section className="qf-sec" style={{ background: "var(--soft)" }}>
          <div className="qf">
            <div className="qf-head" style={{ textAlign: "left" }}>
              <span className="kicker">{data.section_8.badge || "Flexibility"}</span>
              <h2>{data.section_8.title || "Choose the safest route for your life."}</h2>
              <p>{data.section_8.description}</p>
            </div>

            <div className="qf-grid3">
              {data.section_8.cards?.map((c: any, idx: number) => {
                const tagClass = idx === 0 ? "best" : idx === 1 ? "warn" : "remote";
                return (
                  <div className={`modecard ${tagClass}`} key={idx}>
                    <span className="tag">{c.tag}</span>
                    <h4>{c.title}</h4>
                    <p>{c.description}</p>
                    <div className="row">
                      <span>Attendance</span>
                      <span>{c.attendance}</span>
                    </div>
                    <div className="row">
                      <span>Maintenance</span>
                      <span>{c.maintenance}</span>
                    </div>
                    <div className="row">
                      <span>Networking</span>
                      <span>{c.networking}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 9. REVIEWS / STORIES */}
      {data.section_9 && data.section_9.status !== false && (
        <section className="qf-sec" id="reviews">
          <div className="qf">
            <div className="qf-head" style={{ textAlign: "left" }}>
              <span className="kicker">{data.section_9.badge || "Feedback"}</span>
              <h2>{data.section_9.title || "People like you choose this route."}</h2>
              <p>{data.section_9.description}</p>
            </div>

            <div className="qf-grid3">
              {data.section_9.cards?.map((c: any, idx: number) => (
                <div className="pstory" key={idx}>
                  <img className="bg" src={c.image} alt={c.name} />
                  <div className="scrim"></div>
                  <span className="pbadge">{c.badge}</span>
                  <div className="ps-inner">
                    <div className="stars">★★★★★</div>
                    <blockquote>"{c.quote}"</blockquote>
                    <div className="who">
                      <b>{c.name}</b>
                      <span>{c.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. ENTRY REQUIREMENTS */}
      {data.section_10 && data.section_10.status !== false && (
        <section className="qf-sec" id="entry" style={{ background: "var(--soft)" }}>
          <div className="qf">
            <div className="qf-compare" style={{ alignItems: "start", gap: "clamp(30px, 4vw, 60px)" }}>
              <div style={{ textAlign: "left" }}>
                <span className="kicker">{data.section_10.badge || "Criteria"}</span>
                <h2 style={{ fontSize: "clamp(30px, 3.2vw, 52px)", fontWeight: 900, margin: "8px 0 14px", lineHeight: 1.1 }}>{data.section_10.title || "Not sure if you qualify?"}</h2>
                <p style={{ color: "var(--muted)", fontWeight: 600, fontSize: "16px", marginBottom: "24px" }}>{data.section_10.description}</p>
                <a className="btn orange lg" href="/tools/eligibility-checker">Free eligibility check →</a>
              </div>

              <div>
                {data.section_10.rows?.map((row: any, idx: number) => (
                  <div className={`entryrow ${idx === data.section_10.rows.length - 1 ? 'q' : ''}`} key={idx}>
                    <div className="ic">{idx === data.section_10.rows.length - 1 ? '?' : '✓'}</div>
                    <div>
                      <b>{row.label}</b> &nbsp;<span>{row.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 11. INTAKES */}
      {data.section_11 && data.section_11.status !== false && (
        <section className="qf-sec">
          <div className="qf">
            <div className="qf-head" style={{ textAlign: "left" }}>
              <span className="kicker">{data.section_11.badge || "Start dates"}</span>
              <h2>{data.section_11.title || "Choose your start date."}</h2>
              <p>{data.section_11.description}</p>
            </div>

            <div className="qf-grid4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              {data.section_11.cards?.map((c: any, idx: number) => (
                <div className="intake" key={idx}>
                  <div className="mo">
                    <b>{c.month}</b>
                    <span>{c.year}</span>
                  </div>
                  <h4>{c.title}</h4>
                  <p>{c.desc}</p>
                  <a className={`btn ${idx % 2 === 0 ? 'orange' : 'outline'} sm`} href={c.link || "/apply"} style={{ width: "100%" }}>
                    {idx % 2 === 0 ? 'Apply →' : 'Ask adviser →'}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12. APPLICATION TOOLKIT */}
      {data.section_12 && data.section_12.status !== false && (
        <section className="qf-sec" style={{ background: "var(--soft)" }}>
          <div className="qf">
            <div className="qf-head" style={{ textAlign: "left" }}>
              <span className="kicker">{data.section_12.badge || "Toolkit"}</span>
              <h2>{data.section_12.title || "Need a CV and personal statement?"}</h2>
              <p>{data.section_12.description}</p>
            </div>

            <div className="qf-grid4">
              {data.section_12.cards?.map((c: any, idx: number) => (
                <div className="rolecard" key={idx} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: "26px", marginBottom: "10px" }}>{c.icon}</div>
                    <h4>{c.title}</h4>
                    <p style={{ marginBottom: "14px" }}>{c.desc}</p>
                  </div>
                  <a className="btn blue sm" href={c.link} style={{ width: "100%" }}>
                    Build →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 13. BOTTOM INFO BAND */}
      {data.section_13 && data.section_13.status !== false && (
        <section className="qf-sec">
          <div className="qf">
            <div className="cband">
              <div>
                <h3>{data.section_13.title || title}</h3>
                <div className="sub">{data.section_13.subtitle}</div>
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a className="btn orange lg" href="/apply">Apply now</a>
                <a className="btn white lg" href="/lead/adviser-call">Book adviser</a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 14. RELATED ALTERNATIVES */}
      {data.section_14 && data.section_14.status !== false && (
        <section className="qf-sec">
          <div className="qf">
            <div className="qf-head" style={{ textAlign: "left" }}>
              <span className="kicker">{data.section_14.badge || "Alternatives"}</span>
              <h2>{data.section_14.title || "Try a different direction."}</h2>
              <p>{data.section_14.description}</p>
            </div>

            <div className="qf-grid4">
              {data.section_14.cards?.map((c: any, idx: number) => (
                <div className="ptop" key={idx}>
                  <div className="ph">
                    <img src={c.image} alt={c.role} />
                    <span className="badge">Featured</span>
                  </div>
                  <div className="pb">
                    <h4>{c.role}</h4>
                    <p>{c.description}</p>
                    <div className="mrow">
                      <b>{c.pay}</b>
                      <a href={c.link || "/degrees"}>View →</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 15. FAQ */}
      {data.section_15 && data.section_15.status !== false && (
        <section className="qf-sec" id="faq" style={{ background: "var(--soft)" }}>
          <div className="qf">
            <div className="qf-head" style={{ textAlign: "left" }}>
              <span className="kicker">{data.section_15.badge || "FAQ"}</span>
              <h2>{data.section_15.title || "Questions before applying."}</h2>
              <p>{data.section_15.description}</p>
            </div>

            <div style={{ maxWidth: "820px", margin: "0 auto" }}>
              {data.section_15.faqs?.map((faq: any, idx: number) => (
                <div className="faqq" key={idx}>
                  <b>{faq.question}</b>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 16. FINAL full-bleed CTA */}
      <section className="sec ink" style={{ padding: "4rem 0" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="eyebrow glass" style={{ marginBottom: "18px" }}>Ready to apply?</span>
          <h2 className="h1" style={{ color: "#fff", marginBottom: "14px" }}>Get help before submitting anything important.</h2>
          <p className="lead" style={{ color: "#cdd9ec", maxWidth: "560px", margin: "0 auto 26px" }}>YStudy can help with course selection, Student Finance, documents and application steps.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a className="btn orange lg" href="/apply">Apply now</a>
            <a className="btn white lg" href="/lead/adviser-call">Book adviser call</a>
          </div>
        </div>
      </section>

      {/* CONVERSION BAR */}
      <section className="ys-conversion-system" aria-label="YStudy next steps" style={{ marginTop: "40px" }}>
        <div className="ys-conversion-wrap">
          <a className="ys-conversion-card blue" href="/tools/eligibility-checker">
            <div>
              <h2>Check if you can get funded.</h2>
              <p>Quickly understand if you may qualify for Student Finance, grants and flexible university routes.</p>
            </div>
            <span>Check eligibility</span>
          </a>
          <a className="ys-conversion-card orange" href="/apply">
            <div>
              <h2>Apply with YStudy.</h2>
              <p>Send us your details and we’ll help you choose the right course, prepare documents and move forward.</p>
            </div>
            <span>Start application</span>
          </a>
          <a className="ys-conversion-card dark" href="/lead/adviser-call">
            <div>
              <h2>Speak with an adviser.</h2>
              <p>Not sure what to study, what you can get or which documents you need? Book a free call.</p>
            </div>
            <span>Book free call</span>
          </a>
        </div>
      </section>
    </div>
  );
}
