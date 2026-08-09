import React from "react";
import { getCMSPageContent } from "@/services/cms.service";
import { Banner } from "@/components/ui/Banner";
import FinanceStepper from "@/components/widgets/FinanceStepper";

export default async function Funding() {
  const data = await getCMSPageContent("funding");

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Funding Hub Not Found</h2>
        <p>We couldn't retrieve the funding information at this time.</p>
        <a href="/" className="btn btn-blue" style={{ marginTop: "1rem" }}>Go to Home</a>
      </div>
    );
  }

  const s2 = data.section_2 || {};
  const s3 = data.section_3 || {};
  const s4 = data.section_4 || {};
  const s5 = data.section_5 || {};
  const s6 = data.section_6 || {};
  const s7 = data.section_7 || {};
  const s8 = data.section_8 || {};
  const s9 = data.section_9 || {};
  const s10 = data.section_10 || {};
  const s11 = data.section_11 || {};

  return (
    <div className="qualification-page funding-hub-page">
      {/* HERO BANNER WITH CMS INTEGRATION */}
      <Banner
        slug="funding"
        fallbackBadgeText="Student Finance Guide · 2026/27"
        fallbackTitle="Student money hub."
        fallbackDescription="Understand funding, budgeting and student money decisions before you apply."
        fallbackBgImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2200&q=80"
        fallbackRightCard={{
          layoutType: "stats-highlight",
          title: "Total possible support",
          mainValue: s3.cardDescription || "£23,925",
          items: (s3.cards || []).map((c: any) => ({
            value: c.description,
            subtitle: c.title
          }))
        }}
      >
        <div className="btnrow" style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          <a className="btn btn-orange" href="/tools/finance-calculator">
            Open calculator
          </a>
          <a className="btn btn-white" href="/tools/eligibility-checker">
            Check eligibility
          </a>
        </div>
      </Banner>

      {/* SECTION 2: FUNDING CARDS */}
      {s2.status !== false && (
        <section className="section white ds-finance-integrated">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s2.badge || "Funding cards"}</span>
                <h2>{s2.title || "Student finance and support."}</h2>
              </div>
              <p style={{ color: "var(--muted)", maxWidth: "600px", margin: "8px 0 0" }}>
                {s2.description || "Core funding routes explained visually: living costs, tuition, grants and extra support."}
              </p>
            </div>
            <div className="finance-visual-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
              {(s2.cards || []).map((card: any, idx: number) => (
                <article className="finance-visual-card" key={idx} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  <img
                    src={card.fullImageUrl || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"}
                    alt={card.title}
                    style={{ height: "180px", width: "100%", objectFit: "cover" }}
                  />
                  <div className="finance-visual-card-body" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1, textAlign: "left" }}>
                    <h3 style={{ fontSize: "19px", fontWeight: 800, margin: "0 0 4px" }}>{card.title}</h3>
                    <strong style={{ fontSize: "22px", color: "var(--o)", margin: "4px 0 8px" }}>{card.subTitle}</strong>
                    <p style={{ fontSize: "14px", color: "var(--muted)", margin: "0 0 16px", flex: 1 }}>{card.description}</p>
                    {card.link && (
                      <a href={card.link} style={{ fontWeight: 700, color: "var(--b)", textDecoration: "none", fontSize: "14px", marginTop: "auto" }}>
                        View guide →
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: CALCULATOR ESTIMATE BOX */}
      {s3.status !== false && (
        <section className="section white ds-finance-integrated" id="finance-estimate">
          <div className="container">
            <div className="ds-result" >
              <div>
                <span className="kicker">{s3.badge || "Calculator result"}</span>
                <h2>{s3.title || "Your student finance estimate."}</h2>
                <p>
                  {s3.description || "This is an indicative result. Final entitlement depends on SFE assessment, course intensity, household income, location and study mode."}
                </p>
                <div className="btnrow">
                  <a className="btn btn-orange" href="/tools/finance-calculator">
                    Calculate properly
                  </a>
                  <a className="btn btn-white" href="/tools/eligibility-checker">
                    Check eligibility
                  </a>
                </div>
              </div>
              <div>
                <div className="ds-total">
                  <span>
                    {s3.cardTitle || "Total possible support"}
                  </span>
                  <strong>{s3.cardDescription || "£23,925"}</strong>
                </div>
                <div className="ds-mini-results" >
                  {(s3.cards || []).map((card: any, idx: number) => (
                    <div className="ds-mini" key={idx}>
                      <span>{card.title}</span>
                      <strong>{card.description}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: STEPPER */}
      {s4.status !== false && (
        <section className="section white ds-finance-integrated">
          <div className="container">
            <FinanceStepper steppers={s4.steppers} />
          </div>
        </section>
      )}

      {/* SECTION 5: COMPARISON TABLE */}
      {s5.status !== false && (
        <section className="section white ds-finance-integrated">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s5.badge || "Comparison table"}</span>
                <h2>{s5.title || "Check funding routes."}</h2>
              </div>
              <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>
                {s5.description || "Clear decision signals for course comparison, university comparison and funding guide pages."}
              </p>
            </div>
            <div className="finance-comparison-table" style={{ width: "100%", overflowX: "auto", border: "1px solid var(--border)", borderRadius: "12px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "15px" }}>
                <thead>
                  <tr style={{ background: "var(--soft)", borderBottom: "1px solid var(--border)" }}>
                    <th style={{ padding: "16px" }}>{s5.headers?.route_header || "Route"}</th>
                    <th style={{ padding: "16px" }}>{s5.headers?.funding_header || "Funding type"}</th>
                    <th style={{ padding: "16px" }}>{s5.headers?.maintainance_header || "Maintenance Loan"}</th>
                    <th style={{ padding: "16px" }}>{s5.headers?.best_header || "Best for"}</th>
                    <th style={{ padding: "16px" }}>{s5.headers?.verdict_header || "Verdict"}</th>
                  </tr>
                </thead>
                <tbody>
                  {(s5.rows || []).map((row: any, idx: number) => (
                    <tr key={idx} style={{ borderBottom: idx < s5.rows.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <td style={{ padding: "16px", fontWeight: 700 }}>{row.route}</td>
                      <td style={{ padding: "16px" }}>{row.funding}</td>
                      <td style={{ padding: "16px", color: "var(--o)", fontWeight: 700 }}>{row.maintainance}</td>
                      <td style={{ padding: "16px" }}>{row.best}</td>
                      <td style={{ padding: "16px", fontWeight: 700, color: "var(--b)" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6: PROMO BAND */}
      {s6 && s6.title && (
        <section className="section tight">
          <section className="promo-band purple" >
            <div className="promo-inner" >
              <div className="promo-figure" >
                <img
                  alt={s6.title}
                  src={s6.fullImageUrl || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1500&q=85"}
                />
              </div>
              <div className="promo-copy" >
                <span className="promo-kicker" >
                  {s6.subTitle}
                </span>
                <h2 className="promo-title" >
                  {s6.title}
                </h2>
                <p className="promo-text" >
                  {s6.description}
                </p>
                <a className="btn btn-orange promo-cta" href={s6.link || "/tools/finance-calculator"} >
                  Check funding support
                </a>
              </div>
            </div>
          </section>
        </section>
      )}

      {/* SECTION 7: YSTUDY MONEY OFFERS */}
      {s7.status !== false && (
        <section className="section ds-finance-integrated">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s7.badge || "YStudy Money"}</span>
                <h2>{s7.title || "Student money decisions after finance."}</h2>
              </div>
              <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>
                {s7.description || "MoneySavingExpert-style cards for bank accounts, broadband, phone plans and student essentials."}
              </p>
            </div>
            <div className="student-money-offers" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              {(s7.cards || []).map((card: any, idx: number) => (
                <article className="money-offer-card" key={idx} style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.5rem", textAlign: "left", position: "relative" }}>
                  <span className="label" style={{ display: "inline-block", background: "var(--b)", color: "#fff", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", marginBottom: "12px" }}>
                    {card.badge}
                  </span>
                  <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 4px" }}>{card.title}</h3>
                  <p style={{ fontSize: "13px", color: "var(--muted)", margin: "0 0 8px" }}>{card.subTitle}</p>
                  <strong style={{ fontSize: "32px", display: "block", margin: "8px 0" }}>{card.priceOrSpeed}</strong>
                  <p style={{ fontSize: "14px", color: "var(--muted)", margin: 0 }}>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 8: ELIGIBILITY SNAPSHOT */}
      {s8.status !== false && (
        <section className="section white ds-finance-integrated ystudy-phase4-funding">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s8.badge || "Eligibility snapshot"}</span>
                <h2>{s8.title || "Who usually needs a funding check?"}</h2>
              </div>
              <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>{s8.description}</p>
            </div>
            <div className="finance-visual-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
              {(s8.cards || []).map((card: any, idx: number) => (
                <article className="finance-visual-card" key={idx} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.5rem", textAlign: "left", display: "flex", flexDirection: "column" }}>
                  <div className="finance-visual-card-body" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3 style={{ fontSize: "19px", fontWeight: 800, margin: "0 0 4px" }}>{card.title}</h3>
                    <strong style={{ fontSize: "16px", color: "var(--o)", display: "block", margin: "4px 0 8px" }}>{card.subTitle}</strong>
                    <p style={{ fontSize: "14px", color: "var(--muted)", margin: "0 0 16px", flex: 1 }}>{card.description}</p>
                    <a href={card.link || "/tools/eligibility-checker"} style={{ fontWeight: 700, color: "var(--b)", textDecoration: "none", fontSize: "14px" }}>
                      {card.linkBtnName || "Check →"}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 9: FUNDING JOURNEY */}
      {s9.status !== false && (
        <section className="section white ds-finance-integrated">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s9.badge || "Funding journey"}</span>
                <h2>{s9.title || "From eligibility to repayment."}</h2>
              </div>
              <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>{s9.description}</p>
            </div>
            <div className="card-grid four" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
              {(s9.cards || []).map((card: any, idx: number) => (
                <article className="card" key={idx} style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.5rem", textAlign: "left" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 8px", color: "var(--b)" }}>{card.title}</h3>
                  <p style={{ fontSize: "14px", color: "var(--muted)", margin: 0, lineHeight: 1.4 }}>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 10: COMMON MYTHS */}
      {s10.status !== false && (
        <section className="section white ds-finance-integrated">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s10.badge || "Common myths"}</span>
                <h2>{s10.title || "Finance explained without panic."}</h2>
              </div>
              <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>{s10.description}</p>
            </div>
            <div className="finance-comparison-table" style={{ width: "100%", overflowX: "auto", border: "1px solid var(--border)", borderRadius: "12px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "15px" }}>
                <thead>
                  <tr style={{ background: "var(--soft)", borderBottom: "1px solid var(--border)" }}>
                    <th style={{ padding: "16px", width: "30%" }}>{s10.headers?.myth_header || "Myth"}</th>
                    <th style={{ padding: "16px", width: "50%" }}>{s10.headers?.reality_header || "Reality"}</th>
                    <th style={{ padding: "16px", width: "20%" }}>{s10.headers?.best_header || "Best next step"}</th>
                  </tr>
                </thead>
                <tbody>
                  {(s10.rows || []).map((row: any, idx: number) => (
                    <tr key={idx} style={{ borderBottom: idx < s10.rows.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <td style={{ padding: "16px", fontWeight: 700, color: "#d93838" }}>{row.myth}</td>
                      <td style={{ padding: "16px", lineHeight: 1.4 }}>{row.reality}</td>
                      <td style={{ padding: "16px", fontWeight: 700, color: "var(--b)" }}>{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ADVISER CTA PANEL */}
            <div className="cta-panel" style={{ marginTop: '28px' }}>
              <div>
                <h2 >{s11.title || "Need certainty before you apply?"}</h2>
                <p >
                  {s11.description || "YStudy can check your status, previous study and course type before you submit your application."}
                </p>
              </div>
              <div className="btnrow">
                <a className="btn btn-blue" href="/tools/eligibility-checker">
                  Check eligibility
                </a>
                <a className="btn btn-orange" href="/apply">
                  Apply with YStudy
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER CTA */}
      <section className="footer-cta" >
        <div className="container" >
          <span className="kicker">Stay in touch</span>
          <h2>Your next step should feel organised.</h2>
          <p >
            Create a free account to save progress, find your best degree and track applications.
          </p>
          <div className="btnrow" >
            <a className="btn btn-white" href="/dashboard">
              Create account
            </a>
            <a className="btn btn-orange" href="/apply">
              Apply now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
