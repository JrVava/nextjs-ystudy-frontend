import { getCMSPageContent } from "@/services/cms.service";
import "@/app/degrees/qualifications/qualifications.css";
import { Banner } from "@/components/ui/Banner";

interface QualificationDetailProps {
  slug: string;
}

export default async function QualificationDetail({ slug }: QualificationDetailProps) {
  const data = await getCMSPageContent(slug);

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Qualification Route Not Found</h2>
        <p>We couldn't retrieve the qualification details for "{slug}".</p>
        <a href="/degrees" className="btn btn-blue" style={{ marginTop: "1rem" }}>Browse Degrees</a>
      </div>
    );
  }

  // Format title for fallback
  const title = (slug || "").replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="qualification-page qualification-detail-page">
      {/* HERO SECTION DYNAMIZED WITH BANNER MODULE */}
      <Banner
        slug={slug}
        fallbackTitle={`${title} Qualification`}
        fallbackDescription={`Learn how an integrated ${title} works as a standard funding-supported entry route for mature students.`}
        fallbackBadgeText="Qualification Guide"
        fallbackBgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2200&q=80"
      >
        <div style={{ textAlign: "left", width: "100%" }}>
          <p className="bc" style={{ margin: "0 0 16px", color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>
            <a href="/" style={{ color: "#fff", textDecoration: "none" }}>Home</a> ›{" "}
            <a href="/degrees" style={{ color: "#fff", textDecoration: "none" }}>Degrees</a> ›{" "}
            <a href="/degrees" style={{ color: "#fff", textDecoration: "none" }}>Qualifications</a> › {title}
          </p>
          
          <div className="statrow" style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginTop: "16px" }}>
            {/* Support both hndTimeLine and foundationTimeLine */}
            {(data.section_2?.hndTimeLine || data.section_2?.foundationTimeLine)?.map((st: any, idx: number) => (
              <div className="st" key={idx}>
                <b style={{ fontSize: "1.75rem", color: "#fff", display: "block" }}>{st.title}</b>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>{st.description}</span>
              </div>
            ))}
          </div>

          <div className="btnrow" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}>
            <a className="btn orange" href="/tools/eligibility-checker">Check eligibility →</a>
            <a className="btn ghost" href="/degrees#results">Browse matching courses</a>
          </div>
        </div>
      </Banner>

      {/* WHAT IT IS SECTION */}
      {data.section_3?.status !== false && (
        <section className="qf-sec">
          <div className="qf" style={{ textAlign: "left" }}>
            <div className="qf-head">
              <span className="kicker">{data.section_3?.badge || "Quick explanation"}</span>
              <h2>{data.section_3?.title || `What is ${title}?`}</h2>
              <p>{data.section_3?.description}</p>
            </div>
            <div className="qf-grid4">
              {data.section_3?.cards?.map((card: any, idx: number) => (
                <div className="fcard" key={idx}>
                  {card.number && <div className="n">{card.number}</div>}
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COURSES OR REQUIREMENTS SECTION */}
      {data.section_4?.status !== false && (
        <section className="qf-sec" id="courses" style={{ background: "var(--soft)", textAlign: "left" }}>
          <div className="qf">
            <div className="qf-head">
              <span className="kicker">{data.section_4?.badge || "Before you apply"}</span>
              <h2>{data.section_4?.title || "Entry requirements and pathways"}</h2>
              <p>{data.section_4?.description}</p>
            </div>

            {/* If it's a course list (like Foundation Year) */}
            {data.section_4?.courses && (
              <div className="qf-courses">
                {data.section_4.courses.map((c: any, idx: number) => (
                  <article key={idx} className="qcard">
                    <div className="ph">
                      <div className="tags">
                        {c.tags?.map((t: string, tIdx: number) => (
                          <span key={tIdx}>{t}</span>
                        ))}
                      </div>
                      <img src={c.image} alt="" />
                    </div>
                    <div className="cb">
                      <h3>{c.title}</h3>
                      <p>{c.description}</p>
                      <div className="out">{c.outcome}</div>
                      <div className="row">
                        <a className="v" href={c.link}>View</a>
                        <a className="a" href="/apply">Apply</a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* If it's a card grid of requirements (like HND/CertHE) */}
            {data.section_4?.cards && (
              <div className="elig-routes">
                {data.section_4.cards.map((c: any, idx: number) => {
                  const isWarn = c.badge?.toLowerCase().includes("important") || c.badge?.toLowerCase().includes("plan");
                  return (
                    <div className={`eligc ${isWarn ? "warn" : ""}`} key={idx}>
                      <p className="tagline">{c.badge}</p>
                      <h3>{c.title}</h3>
                      <ul>
                        {c.points?.map((pt: string, pidx: number) => (
                          <li key={pidx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* STEPS OR FUNDING INFORMATION */}
      {data.section_5?.status !== false && (
        <>
          {/* Steps layout (like Foundation Year) */}
          {data.section_5?.cards && !data.section_5?.cards[0]?.description && (
            <section className="qf-fund">
              <div className="qf-fund-in" style={{ textAlign: "left" }}>
                <span className="kicker">{data.section_5?.badge || "Funding check"}</span>
                <h2>{data.section_5?.title || "Can Student Finance support this route?"}</h2>
                <div className="qf-fund-grid">
                  {data.section_5.cards.map((c: any, idx: number) => (
                    <div className="fundc" key={idx}>
                      <b>{c.title}</b>
                      <span>{c.description || "Details checked at application."}</span>
                    </div>
                  ))}
                </div>
                <a className="fbtn" href="/tools/finance-calculator">Estimate funding →</a>
              </div>
            </section>
          )}

          {/* Regular steps timeline (like Foundation Year section_5) */}
          {data.section_5?.cards && data.section_5?.cards[0]?.description && (
            <section className="qf-help">
              <div className="qf-help-in">
                <span className="kicker">{data.section_5.badge}</span>
                <h2>{data.section_5.title}</h2>
                <p className="sub">{data.section_5.description}</p>
                <div className="steps">
                  {data.section_5.cards.map((card: any, idx: number) => {
                    let href = "/apply";
                    let btnLabel = "Start applying →";
                    if (idx === 0) {
                      href = "/tools/eligibility-checker";
                      btnLabel = "Check eligibility →";
                    } else if (idx === 1) {
                      href = "#courses";
                      btnLabel = "Browse courses →";
                    } else if (idx === 2) {
                      href = "/tools/personal-statement-calculator";
                      btnLabel = "Open the tools →";
                    }
                    return (
                      <a className="stepc" href={href} key={idx}>
                        <div className="num">{card.numbers || (idx + 1)}</div>
                        {idx < 3 && <span className="line"></span>}
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                        <span className="go">{btnLabel}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* FAQS SECTION */}
      {data.section_6?.status !== false && data.section_6?.faqs && (
        <section className="qf-sec" style={{ background: "var(--soft)", textAlign: "left" }}>
          <div className="qf">
            <div className="qf-head">
              <span className="kicker">{data.section_6.badge || "FAQ"}</span>
              <h2>{data.section_6.title || `${title} FAQ.`}</h2>
            </div>
            <div className="qf-faq">
              {data.section_6.faqs.map((faq: any, idx: number) => (
                <details key={idx} className="faqi" open={idx === 0}>
                  <summary>{faq.question || faq.q}</summary>
                  <p>{faq.answer || faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CALL TO ACTION */}
      {data.section_7?.status !== false && (
        <section className="qf-sec">
          <div className="qf">
            <div className="cta-panel" style={{ textAlign: "center" }}>
              <h2>{data.section_7.title || "Not sure if this is your best route?"}</h2>
              <p>{data.section_7.description || `Speak with YStudy before applying. We can check your qualification, funding route and course options.`}</p>
              <div className="btnrow" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "24px" }}>
                <a className="btn btn-blue" href="/tools/degree-match">Find my route</a>
                <a className="btn btn-orange" href="/apply">Apply with YStudy</a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
