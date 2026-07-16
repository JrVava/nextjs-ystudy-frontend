import { getCMSPageContent } from "@/services/cms.service";
import "@/app/degrees/qualifications/qualifications.css";
import { Banner } from "@/components/ui/Banner";

export default async function StudyRoutes() {
  const data = await getCMSPageContent("study-routes");

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Study Routes Page Not Found</h2>
        <a href="/degrees" className="btn btn-blue" style={{ marginTop: "1rem" }}>Browse Degrees</a>
      </div>
    );
  }

  return (
    <div className="qualification-page study-routes-index-page">
      {/* HERO SECTION DYNAMIZED WITH BANNER MODULE */}
      <Banner
        slug="study-routes"
        fallbackTitle="Choose the right qualification route."
        fallbackDescription="Compare higher education qualification routes in the UK. Find the right option between Foundation Year, CertHE, HND, and Bachelor's degrees."
        fallbackBadgeText="Qualification Guide"
        fallbackBgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2200&q=80"
      >
        <div style={{ textAlign: "left", width: "100%" }}>
          <p className="bc" style={{ margin: "0 0 16px", color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>
            <a href="/" style={{ color: "#fff", textDecoration: "none" }}>Home</a> ›{" "}
            <a href="/degrees" style={{ color: "#fff", textDecoration: "none" }}>Degrees</a> › Study Routes
          </p>
          <div className="btnrow" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}>
            <a className="btn orange" href="#compare-routes">Compare routes ↓</a>
            <a className="btn ghost" href="/tools/degree-match">Match my degree</a>
          </div>
        </div>
      </Banner>

      {/* FLOAT GRID CARDS */}
      {data.section_2 && data.section_2.status !== false && data.section_2.cards && (
        <section className="qf-sec">
          <div className="qf">
            <div className="qf-grid3">
              {data.section_2.cards.map((c: any, idx: number) => {
                const routeLink = `/degrees/qualifications/${c.title.toLowerCase().replace(/ /g, '-')}`;
                return (
                  <a href={routeLink} className="routec" key={idx} style={{ textAlign: "left" }}>
                    <div className="rph" style={{ aspectRatio: "16/10" }}>
                      <img src={c.image} alt={c.title} />
                    </div>
                    <div className="rb">
                      <h3>{c.title}</h3>
                      <p>{c.subtitle}</p>
                      <span className="go">Explore route →</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* COMPARISON MATRIX TABLE */}
      {data.section_5 && data.section_5.status !== false && data.section_5.comparison_table && (
        <section className="qf-sec" id="compare-routes" style={{ background: "var(--soft)" }}>
          <div className="qf" style={{ textAlign: "left" }}>
            <div className="qf-head">
              <span className="kicker">Compare qualifications</span>
              <h2>Which route is right for you?</h2>
              <p>Duration, level and funding options at a glance.</p>
            </div>

            <table className="elig-table" style={{ marginTop: "20px" }}>
              <thead>
                <tr>
                  {data.section_5.comparison_table.headers?.map((header: string, idx: number) => (
                    <th key={idx}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.section_5.comparison_table.rows?.map((row: any, idx: number) => (
                  <tr key={idx}>
                    <td className="who">{row.route}</td>
                    <td>{row.suits}</td>
                    <td>{row.duration}</td>
                    <td>
                      <span className="pill check" style={{ marginTop: 0 }}>
                        {row.funding}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* QUALIFICATIONS EXPLANATION DETAIL CARDS */}
      {data.section_4 && data.section_4.status !== false && data.section_4.cards && (
        <section className="qf-sec">
          <div className="qf" style={{ textAlign: "left" }}>
            <div className="qf-head">
              <span className="kicker">Qualification types explained</span>
              <h2>Understand what you'll study.</h2>
            </div>

            <div className="qf-courses">
              {data.section_4.cards.map((c: any, idx: number) => {
                const routeLink = `/degrees/qualifications/${c.title.toLowerCase().replace(/ \/ /g, '-').replace(/ /g, '-')}`;
                return (
                  <article className="qcard" key={idx}>
                    <div className="ph" style={{ aspectRatio: "16/10" }}>
                      <img src={c.image} alt={c.title} />
                      <div className="tags">
                        <span>{c.badge}</span>
                      </div>
                    </div>
                    <div className="cb" style={{ display: "flex", flexDirection: "column", flex: 1, padding: "1.25rem" }}>
                      <h3 style={{ margin: "0 0 8px", fontSize: "19px", fontWeight: 900 }}>{c.title}</h3>
                      <p style={{ fontSize: "14px", color: "var(--muted)", flex: 1 }}>{c.description}</p>
                      <div className="row" style={{ marginTop: "14px" }}>
                        <a className="v" href={routeLink} style={{ width: "100%" }}>
                          Explore Route →
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

      {/* FINAL CALL TO ACTION */}
      {data.section_6 && data.section_6.status !== false && (
        <section className="qf-sec" style={{ background: "var(--soft)" }}>
          <div className="qf">
            <div className="cta-panel" style={{ textAlign: "center" }}>
              <h2>{data.section_6.title || "Not sure which route is right?"}</h2>
              <p>{data.section_6.description || "Tell us your previous study and career goal. We’ll help you choose a realistic route."}</p>
              <div className="btnrow" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "24px" }}>
                <a className="btn btn-blue" href="/tools/degree-match">Find my route</a>
                <a className="btn btn-orange" href="/apply">Apply with YStudy</a>
              </div>
            </div>
          </div>
        </section>
      )}

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
