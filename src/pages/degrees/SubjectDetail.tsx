import { getCMSPageContent } from "@/services/cms.service";
import "@/app/degrees/qualifications/qualifications.css";
import { Banner } from "@/components/ui/Banner";
import { QualificationConversionCards } from "@/components/ui";

interface SubjectDetailProps {
  subject: string;
}

export default async function SubjectDetail({ subject }: SubjectDetailProps) {
  const data = await getCMSPageContent(subject);

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Subject Guide Not Found</h2>
        <p>We couldn't retrieve the subject guide details for "{subject}".</p>
        <a href="/degrees/subjects" className="btn btn-blue" style={{ marginTop: "1rem" }}>All Subjects</a>
      </div>
    );
  }

  // Formatting subject title for display
  const title = (subject || "").replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="qualification-page subject-detail-page">
      {/* HERO SECTION DYNAMIZED WITH BANNER MODULE */}
      <Banner
        slug={subject}
        fallbackTitle={`${title} Degrees for Mature Students`}
        fallbackDescription={`Compare flexible ${title} degree routes, Student Finance eligibility, and career paths.`}
        fallbackBadgeText={`Subject area · ${title}`}
        fallbackBgImage="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2200&q=85"
      >
        <div style={{ textAlign: "left", width: "100%" }}>
          <p className="bc" style={{ margin: "0 0 16px", color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>
            <a href="/" style={{ color: "#fff", textDecoration: "none" }}>Home</a> ›{" "}
            <a href="/degrees" style={{ color: "#fff", textDecoration: "none" }}>Degrees</a> ›{" "}
            <a href="/degrees/subjects" style={{ color: "#fff", textDecoration: "none" }}>Subjects</a> › {title}
          </p>
          
          {data?.section_1?.sfe_highlight && (
            <div className="sfe" style={{ display: "inline-flex", alignItems: "center", gap: "11px", borderRadius: "14px", padding: "13px 18px", fontSize: "14px", background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.34)", color: "#fff", backdropFilter: "blur(6px)", margin: "16px 0 0" }}>
              <span>{data?.section_1.sfe_highlight}</span>
            </div>
          )}

          <div className="btnrow" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}>
            <a className="btn orange" href="#courses">View courses ↓</a>
            <a className="btn ghost" href="/degrees">Compare all degrees</a>
          </div>
        </div>
      </Banner>

      {/* DYNAMIC COURSE LISTINGS */}
      {data?.section_2?.status !== false && (
        <section className="qf-sec" id="courses">
          <div className="qf" style={{ textAlign: "left" }}>
            <div className="qf-head">
              <span className="kicker">{data?.section_2?.badge || "Available courses"}</span>
              <h2>{data?.section_2?.title || `${title} courses you can study flexibly.`}</h2>
              <p>{data?.section_2?.description || "Every route is built around work and family, with full Student Finance support."}</p>
            </div>

            <div className="qf-courses">
              {data?.section_2?.courses?.map((c: any, idx: number) => (
                <article key={idx} className="qcard">
                  <div className="ph" style={{ aspectRatio: "16/10" }}>
                    <img src={c.image} alt={c.title} />
                    <div className="tags">
                      {c.tags?.map((t: string, tIdx: number) => (
                        <span key={tIdx}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="cb" style={{ display: "flex", flexDirection: "column", flex: 1, padding: "1.25rem" }}>
                    <h3 style={{ margin: "0 0 8px", fontSize: "19px", fontWeight: 900 }}>{c.title}</h3>
                    <p style={{ fontSize: "14px", color: "var(--muted)", flex: 1 }}>{c.description}</p>
                    {c.outcome && (
                      <div className="out" style={{ background: "#fff7ee", border: "1px solid #ffe0b8", borderRadius: "11px", padding: "9px 12px", fontSize: "13px", color: "#9a4b00", marginBottom: "14px" }}>
                        {c.outcome}
                      </div>
                    )}
                    <div className="row" style={{ display: "flex", gap: "9px" }}>
                      <a className="v" href={c.link || "/degrees"}>View Course</a>
                      <a className="a" href="/apply">Apply</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHO APPLIES / MOTIVATION BLOCK */}
      {data?.section_3?.status !== false && data?.section_3?.cards && (
        <section className="qf-sec" style={{ background: "var(--soft)" }}>
          <div className="qf" style={{ textAlign: "left" }}>
            <div className="qf-head">
              <span className="kicker">{data?.section_3.badge || "Who applies"}</span>
              <h2>{data?.section_3.title || `${title} degrees suit you if...`}</h2>
              <p>{data?.section_3.description}</p>
            </div>

            <div className="elig-routes">
              {data?.section_3.cards.map((c: any, idx: number) => (
                <div className="eligc" key={idx}>
                  <h3>{c.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.5, margin: "8px 0 0" }}>{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CAREER OUTCOMES STATS */}
      {data?.section_4?.status !== false && data?.section_4?.stats && (
        <section className="qf-sec" style={{ background: "var(--b-navy)", color: "#fff", border: "none" }}>
          <div className="qf" style={{ textAlign: "left" }}>
            <div className="qf-head" style={{ marginBottom: "2rem" }}>
              <span className="kicker" style={{ color: "#9cc0ff" }}>{data?.section_4.badge || "Career outcomes"}</span>
              <h2 style={{ color: "#fff", fontSize: "clamp(26px, 3vw, 42px)", fontWeight: 900 }}>{data?.section_4.title || `Where a ${title} degree takes you.`}</h2>
            </div>

            <div className="qf-fund-grid">
              {data?.section_4.stats.map((s: any, idx: number) => (
                <div className="fundc" key={idx} style={{ textAlign: "center" }}>
                  <b style={{ fontSize: "clamp(24px, 2.5vw, 36px)" }}>{s.value}</b>
                  <span style={{ color: "#aebed6" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROGRESSION LADDER */}
      {data?.section_5?.status !== false && data?.section_5?.steps && (
        <section className="qf-sec" style={{ background: "var(--soft)" }}>
          <div className="qf" style={{ textAlign: "left" }}>
            <div className="qf-head">
              <span className="kicker">{data?.section_5.badge || "Progression ladder"}</span>
              <h2>{data?.section_5.title || `How a ${title} career builds over time.`}</h2>
              <p>{data?.section_5.description}</p>
            </div>

            <div className="qf-grid4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
              {data?.section_5.steps.map((step: any, idx: number) => (
                <div className="fcard" key={idx}>
                  <div className="n">{idx + 1}</div>
                  <h3>{step.title}</h3>
                  <div style={{ color: "#0f6e56", fontWeight: 800, margin: "4px 0 8px" }}>{step.salary}</div>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ENTRY ROUTES WITHOUT A-LEVELS */}
      {data?.section_6?.status !== false && data?.section_6?.cards && (
        <section className="qf-sec">
          <div className="qf" style={{ textAlign: "left" }}>
            <div className="qf-head">
              <span className="kicker">{data?.section_6.badge || "Entry routes"}</span>
              <h2>{data?.section_6.title || "How to qualify without A-levels."}</h2>
              <p>{data?.section_6.description}</p>
            </div>

            <div className="qf-grid3">
              {data?.section_6.cards.map((c: any, idx: number) => (
                <div className="entryc" key={idx} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "24px", boxShadow: "0 12px 30px rgba(15,23,42,0.06)" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 900, color: "var(--ink)", margin: "0 0 8px" }}>{c.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.5 }}>{c.description}</p>
                  {c.link && (
                    <a href={c.link} style={{ display: "inline-block", marginTop: "12px", color: "var(--b)", fontWeight: 800 }}>
                      Learn more →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EDITOR'S PICK SNAPSHOT */}
      {data?.section_7?.status !== false && data?.section_7?.editor_pick && (
        <section className="qf-sec" style={{ background: "var(--soft)" }}>
          <div className="qf" style={{ textAlign: "left" }}>
            <div className="qf-head">
              <span className="kicker">{data?.section_7.badge || "Featured this week"}</span>
              <h2>{data?.section_7.title || "Editor’s pick in this subject."}</h2>
              <p>{data?.section_7.description}</p>
            </div>

            <div className="sbj-editor" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", background: "#fff", borderRadius: "18px", border: "1px solid var(--line)", overflow: "hidden" }}>
              <div className="eph" style={{ minHeight: "260px" }}>
                <img src={data?.section_7.editor_pick.image || "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=85"} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div className="eb" style={{ padding: "2rem" }}>
                <span className="ek" style={{ background: "#fff4e0", color: "#9a4b00", border: "1px solid #ffd9a8", fontSize: "12px", padding: "6px 12px", borderRadius: "999px", display: "inline-block", fontWeight: 800, marginBottom: "1rem" }}>
                  ★ Editor's pick
                </span>
                <h3 style={{ fontSize: "24px", fontWeight: 900 }}>{data?.section_7.editor_pick.title}</h3>
                <p style={{ color: "var(--muted)", margin: "8px 0 1rem" }}>{data?.section_7.editor_pick.description}</p>
                
                {data?.section_7.editor_pick.pills && (
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                    {data?.section_7.editor_pick.pills.map((p: string, pIdx: number) => (
                      <span key={pIdx} style={{ fontSize: "12px", background: "rgba(10, 82, 214, 0.05)", color: "var(--b)", padding: "4px 10px", borderRadius: "999px", fontWeight: 700 }}>
                        {p}
                      </span>
                    ))}
                  </div>
                )}

                <div className="btnrow" style={{ display: "flex", gap: "10px" }}>
                  <a className="btn btn-blue" href={data?.section_7.editor_pick.link || "/apply"}>View Course →</a>
                  <a className="btn btn-orange" href="/apply">Apply Now</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CONVERSION PANEL */}
      <QualificationConversionCards />
    </div>
  );
}
