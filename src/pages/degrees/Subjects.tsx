import { getCMSPageContent } from "@/services/cms.service";
import { getSubjects } from "@/services/filters.service";
import "@/app/degrees/qualifications/qualifications.css";
import { Banner } from "@/components/ui/Banner";

export default async function Subjects() {
  const [data, subjects] = await Promise.all([
    getCMSPageContent("study-subjects"),
    getSubjects()
  ]);

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Subjects Page Not Found</h2>
        <a href="/degrees" className="btn btn-blue" style={{ marginTop: "1rem" }}>Browse Degrees</a>
      </div>
    );
  }
  console.log('subjects', subjects);

  return (
    <div className="qualification-page subjects-index-page">
      {/* HERO SECTION DYNAMIZED WITH BANNER MODULE */}
      <Banner
        slug="study-subjects"
        fallbackTitle="Study Subjects"
        fallbackDescription="Explore flexible degree subjects for adult learners. Compare business, computing, health, law and construction routes."
        fallbackBadgeText="YStudy Resource"
        fallbackBgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2200&q=80"
      >
        <div style={{ textAlign: "left", width: "100%" }}>
          <p className="bc" style={{ margin: "0 0 16px", color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>
            <a href="/" style={{ color: "#fff", textDecoration: "none" }}>Home</a> ›{" "}
            <a href="/degrees" style={{ color: "#fff", textDecoration: "none" }}>Degrees</a> › Subjects
          </p>
          <div className="btnrow" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}>
            <a className="btn orange" href="#browse-subjects">Explore subjects ↓</a>
            <a className="btn ghost" href="/tools/degree-match">Find matching degree</a>
          </div>
        </div>
      </Banner>

      {/* NEED HELP BANNER */}
      {data.section_4?.status !== false && (
        <section className="qf-sec" style={{ background: "var(--soft)", padding: "2rem 0" }}>
          <div className="qf" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ textAlign: "left" }}>
              <h3 style={{ margin: 0, fontSize: "19px", color: "var(--ink)", fontWeight: 800 }}>{data.section_4.title}</h3>
              <p style={{ margin: "4px 0 0", color: "var(--muted)", fontWeight: 600 }}>{data.section_4.description}</p>
            </div>
            <a className="btn btn-orange" href="/tools/degree-match">Degree Match Finder →</a>
          </div>
        </section>
      )}

      {/* MATRIX TABLE OF RECOMMENDED ROUTES */}
      {data.section_8?.status !== false && (
        <section className="qf-sec">
          <div className="qf" style={{ textAlign: "left" }}>
            <div className="qf-head">
              <span className="kicker">{data.section_8.badge}</span>
              <h2>{data.section_8.title}</h2>
              <p>{data.section_8.description}</p>
            </div>

            <table className="elig-table" style={{ marginTop: "20px" }}>
              <thead>
                <tr>
                  <th>{data.section_8.headers?.degree_header}</th>
                  <th>{data.section_8.headers?.best_header}</th>
                  <th>{data.section_8.headers?.funding_header}</th>
                  <th>{data.section_8.headers?.flexible_header}</th>
                  <th>{data.section_8.headers?.salary_header}</th>
                  <th>{data.section_8.headers?.verdict_header}</th>
                </tr>
              </thead>
              <tbody>
                {data.section_8.rows?.map((row: any, idx: number) => (
                  <tr key={idx}>
                    <td className="who">{row.degree}</td>
                    <td>{row.best}</td>
                    <td style={{ color: row.funding === "✓" ? "#1d9e75" : "inherit", fontWeight: 800 }}>{row.funding}</td>
                    <td style={{ color: row.flexible === "✓" ? "#1d9e75" : "#e05000", fontWeight: 800 }}>{row.flexible}</td>
                    <td>{row.salary}</td>
                    <td>
                      <span className="pill" style={{ background: "rgba(10, 82, 214, 0.1)", color: "var(--b)", marginTop: 0 }}>
                        {row.verdict}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* RANKINGS PANEL */}
      {data.section_9?.status !== false && (
        <section className="qf-sec" style={{ background: "var(--soft)" }}>
          <div className="qf" style={{ textAlign: "left" }}>
            <div className="qf-head">
              <span className="kicker">{data.section_9.badge}</span>
              <h2>{data.section_9.title}</h2>
              <p>{data.section_9.description}</p>
            </div>

            <div className="qf-grid4">
              {data.section_9.cards?.map((card: any, idx: number) => (
                <div className="fcard" key={idx}>
                  <div className="n" style={{ background: "var(--o)", color: "#fff" }}>{card.position_number}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <div style={{ marginTop: "12px", fontSize: "12px", color: "var(--muted)", fontWeight: 700 }}>
                    Score: <span style={{ color: "var(--b)", fontSize: "16px", fontWeight: 900 }}>{card.top_number}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EXPLORE SUBJECTS GRID (DYNAMIC COVERS) */}
      {data.section_10?.status !== false && (
        <section className="qf-sec" id="browse-subjects">
          <div className="qf" style={{ textAlign: "left" }}>
            <div className="qf-head">
              <span className="kicker">{data.section_10.badge}</span>
              <h2>{data.section_10.title}</h2>
              <p>{data.section_10.description}</p>
            </div>

            <div className="qf-courses">
              {subjects.map((sub: any, idx: number) => {
                // Determine clean link slug matching nextjs subjects route config
                const linkSlug = sub.title?.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                return (
                  <article className="qcard" key={idx}>
                    <div className="ph" style={{ aspectRatio: "16/10" }}>
                      {sub.fullImageUrl ? (
                        <img src={sub.fullImageUrl} alt={sub.title} />
                      ) : (
                        <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=80" alt={sub.title} />
                      )}
                      {sub.badge && (
                        <div className="tags" style={{ bottom: "unset", top: "12px" }}>
                          <span style={{ background: "rgba(240, 128, 0, 0.9)" }}>{sub.badge}</span>
                        </div>
                      )}
                    </div>
                    <div className="cb" style={{ display: "flex", flexDirection: "column", flex: 1, padding: "1.25rem" }}>
                      <h3 style={{ margin: "0 0 8px", fontSize: "19px", fontWeight: 900 }}>{sub.title}</h3>
                      <p style={{ fontSize: "14px", color: "var(--muted)", flex: 1 }}>{sub.description || "Explore study requirements, career outcomes, and SFE funding options in this subject area."}</p>

                      {/* Render Repeater tags array if present */}
                      {sub.tags && sub.tags.length > 0 && (
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", margin: "10px 0" }}>
                          {sub.tags.map((tagStr: string, tIdx: number) => (
                            <span key={tIdx} style={{ fontSize: "11px", background: "rgba(7, 17, 38, 0.05)", color: "var(--ink)", padding: "4px 8px", borderRadius: "4px", fontWeight: 600 }}>
                              #{tagStr}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="row" style={{ marginTop: "14px" }}>
                        <a className="v" href={`/degrees/${linkSlug}`} style={{ width: "100%" }}>
                          Explore {sub.title} Degrees →
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* IMPORTANT FUNDING RULE WARNING BAND */}
      {data.section_14?.status !== false && (
        <section className="qf-sec" style={{ background: "rgba(240, 80, 0, 0.05)", borderTop: "1px solid rgba(240, 80, 0, 0.15)", borderBottom: "1px solid rgba(240, 80, 0, 0.15)" }}>
          <div className="qf" style={{ textAlign: "left" }}>
            <span className="kicker" style={{ color: "var(--o-deep)" }}>⚠️ {data.section_14.badge}</span>
            <h2 style={{ fontSize: "24px", fontWeight: 900, margin: "8px 0" }}>{data.section_14.title}</h2>
            <p style={{ color: "var(--muted)", fontWeight: 600, margin: 0 }}>{data.section_14.description}</p>
          </div>
        </section>
      )}

      {/* COMPARISON OF FUNDING ROUTES */}
      {data.section_15?.status !== false && (
        <section className="qf-sec">
          <div className="qf" style={{ textAlign: "left" }}>
            <div className="qf-head">
              <span className="kicker">{data.section_15.badge}</span>
              <h2>{data.section_15.title}</h2>
              <p>{data.section_15.description}</p>
            </div>

            <table className="elig-table" style={{ marginTop: "20px" }}>
              <thead>
                <tr>
                  <th>{data.section_15.headers?.route_header}</th>
                  <th>{data.section_15.headers?.funding_header}</th>
                  <th>{data.section_15.headers?.maintenance_header}</th>
                  <th>{data.section_15.headers?.best_header}</th>
                  <th>{data.section_15.headers?.verdict_header}</th>
                </tr>
              </thead>
              <tbody>
                {data.section_15.rows?.map((row: any, idx: number) => (
                  <tr key={idx}>
                    <td className="who">{row.route}</td>
                    <td>{row.funding}</td>
                    <td>{row.maintenance}</td>
                    <td>{row.best}</td>
                    <td>
                      <span className="pill check" style={{ marginTop: 0 }}>
                        {row.verdict}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* USEFUL NEXT STEPS FOOTER WIDGET */}
      {data.section_7?.status !== false && (
        <section className="ys-crosslinks" aria-label="Useful links">
          <div className="inner" style={{ textAlign: "left" }}>
            <div>
              <h2>{data.section_7.title}</h2>
              <p>{data.section_7.description}</p>
            </div>
            <div className="ys-link-grid">
              {data.section_7.cards?.map((c: any, idx: number) => {
                let href = "/degrees";
                if (idx === 1) href = "/funding";
                else if (idx === 2) href = "/careers";
                else if (idx === 3) href = "/tools/degree-match";
                else if (idx === 4) href = "/tools/salary-checker";
                else if (idx === 5) href = "/guides";

                return (
                  <a href={href} key={idx}>
                    {c.title}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
