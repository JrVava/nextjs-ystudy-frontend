import React from "react";
import { getCMSPageContent } from "@/services/cms.service";
import { Banner } from "@/components/ui/Banner";

interface FundingSubPageProps {
  slug: string;
}

export default async function FundingSubPage({ slug }: FundingSubPageProps) {
  const data = await getCMSPageContent(slug);

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Page Not Found</h2>
        <p>We couldn't retrieve the funding guide for "{slug}".</p>
        <a href="/funding" className="btn btn-blue" style={{ marginTop: "1rem" }}>Back to Funding Hub</a>
      </div>
    );
  }

  // Common shared sections (Eligibility, Journey, Myths) - matching main /funding page definitions
  const sharedSnapshot = {
    title: "Who usually needs a funding check?",
    description: "A quick student-first view before they start an application.",
    cards: [
      {
        title: "British / Irish",
        subTitle: "Usually strong route",
        description: "Typically checked for England residence, course designation and previous study.",
        link: "/tools/eligibility-checker",
        linkBtnName: "Check eligibility →"
      },
      {
        title: "Settled / ILR",
        subTitle: "Full support route",
        description: "Often eligible for tuition and maintenance support if residence rules are met.",
        link: "/tools/eligibility-checker",
        linkBtnName: "Check status →"
      },
      {
        title: "Pre-settled",
        subTitle: "Needs review",
        description: "Can be possible, but residence history and category matter. Do not guess.",
        link: "/lead/adviser-call",
        linkBtnName: "Ask adviser →"
      },
      {
        title: "Refugee / protection",
        subTitle: "Protected route",
        description: "Often eligible for strong support, but documents and dates must be checked.",
        link: "/apply",
        linkBtnName: "Start review →"
      }
    ]
  };

  const sharedJourney = {
    title: "From eligibility to repayment.",
    description: "Students understand finance faster when the process is shown as a journey, not a wall of rules.",
    cards: [
      {
        title: "1. Eligibility",
        description: "Check nationality, immigration status, ordinary residence, age and previous study."
      },
      {
        title: "2. Application",
        description: "Submit SFE details, evidence and course information early to avoid delayed payments."
      },
      {
        title: "3. Payments",
        description: "Tuition goes to the provider. Maintenance is paid to the student after enrolment confirmation."
      },
      {
        title: "4. Repayment",
        description: "Repay only when earning above the threshold. It is income-based, not a normal bank loan."
      }
    ]
  };

  const sharedMyths = {
    title: "Finance explained without panic.",
    description: "These blocks should reduce fear and increase adviser enquiries.",
    rows: [
      {
        myth: "“Student Finance is like a bank loan.”",
        reality: "Repayment is based on income, not a fixed monthly instalment.",
        best: "Use the repayment calculator."
      },
      {
        myth: "“I must repay while I study.”",
        reality: "No. Repayment starts only after the course and only above the income threshold.",
        best: "Check Plan 5 estimate."
      },
      {
        myth: "“If I studied before, I cannot get anything.”",
        reality: "Previous study matters, but rules vary by route and qualification.",
        best: "Book an adviser review."
      },
      {
        myth: "“Online and weekend courses are always the same.”",
        reality: "Mode and attendance can affect maintenance support.",
        best: "Check before choosing the course."
      }
    ]
  };

  const s1 = data.section_1 || {};
  const s2 = data.section_2 || {};
  const faqs = data.faqs || [];

  return (
    <div className="qualification-page funding-sub-page">
      {/* HERO BANNER WITH CMS INTEGRATION */}
      <Banner
        slug={slug}
        fallbackBadgeText={s1.badge || "Student Finance Guide · 2026/27"}
        fallbackTitle={s1.title || `${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}`}
        fallbackDescription={s1.description}
        fallbackBgImage={s1.bgImage || "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2200&q=80"}
        fallbackRightCard={s1.rightCard}
      >
        <div className="btnrow" style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          <a className="btn btn-orange" href="/tools/eligibility-checker">
            Check what you can claim →
          </a>
          <a className="btn btn-white" href="/lead/adviser-call">
            Book adviser
          </a>
        </div>
      </Banner>

      {/* SECTION 2: SPECIFIC LOAN/GRANT DETAILS */}
      {s2.status !== false && s2.cards && (
        <section className="section white ds-finance-integrated">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">Overview</span>
                <h2>{s2.title || "How it works & key rules"}</h2>
              </div>
              {s2.description && (
                <p style={{ color: "var(--muted)", maxWidth: "600px", margin: "8px 0 0" }}>{s2.description}</p>
              )}
            </div>
            <div className="qf-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", textAlign: "left" }}>
              {s2.cards.map((card: any, idx: number) => (
                <div className="fcard" key={idx} style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.5rem" }}>
                  <div className="n" style={{ background: "var(--o)", color: "#fff", display: "inline-flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", width: "28px", height: "28px", fontSize: "14px", fontWeight: "bold", marginBottom: "12px" }}>
                    {idx + 1}
                  </div>
                  <h3 style={{ fontSize: "19px", fontWeight: 800, margin: "0 0 8px" }}>{card.title}</h3>
                  <p style={{ fontSize: "14px", color: "var(--muted)", margin: 0, lineHeight: 1.4 }}>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ SECTION */}
      {faqs && faqs.length > 0 && (
        <section className="section white ds-finance-integrated" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="container" style={{ textAlign: "left" }}>
            <div className="qf-head" style={{ marginBottom: "2rem" }}>
              <span className="kicker">Frequently Asked Questions</span>
              <h2>Common questions answered.</h2>
            </div>
            <div className="qf-faq" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {faqs.map((faq: any, idx: number) => (
                <details key={idx} className="faqi" open={idx === 0} style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1rem" }}>
                  <summary style={{ fontWeight: 800, fontSize: "16px", cursor: "pointer", listStyle: "none" }}>{faq.q || faq.question}</summary>
                  <p style={{ marginTop: "8px", color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.5 }}>{faq.a || faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SHARED BOTTOM SECTION: ELIGIBILITY SNAPSHOT */}
      <section className="section white ds-finance-integrated ystudy-phase4-funding" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
            <div>
              <span className="kicker">Eligibility snapshot</span>
              <h2>{sharedSnapshot.title}</h2>
            </div>
            <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>{sharedSnapshot.description}</p>
          </div>
          <div className="finance-visual-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {sharedSnapshot.cards.map((card, idx) => (
              <article className="finance-visual-card" key={idx} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.5rem", textAlign: "left", display: "flex", flexDirection: "column" }}>
                <div className="finance-visual-card-body" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ fontSize: "19px", fontWeight: 800, margin: "0 0 4px" }}>{card.title}</h3>
                  <strong style={{ fontSize: "16px", color: "var(--o)", display: "block", margin: "4px 0 8px" }}>{card.subTitle}</strong>
                  <p style={{ fontSize: "14px", color: "var(--muted)", margin: "0 0 16px", flex: 1 }}>{card.description}</p>
                  <a href={card.link} style={{ fontWeight: 700, color: "var(--b)", textDecoration: "none", fontSize: "14px" }}>
                    {card.linkBtnName}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SHARED BOTTOM SECTION: JOURNEY */}
      <section className="section white ds-finance-integrated" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
            <div>
              <span className="kicker">Funding journey</span>
              <h2>{sharedJourney.title}</h2>
            </div>
            <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>{sharedJourney.description}</p>
          </div>
          <div className="card-grid four" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {sharedJourney.cards.map((card, idx) => (
              <article className="card" key={idx} style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.5rem", textAlign: "left" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 8px", color: "var(--b)" }}>{card.title}</h3>
                <p style={{ fontSize: "14px", color: "var(--muted)", margin: 0, lineHeight: 1.4 }}>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SHARED BOTTOM SECTION: MYTHS */}
      <section className="section white ds-finance-integrated" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
            <div>
              <span className="kicker">Common myths</span>
              <h2>{sharedMyths.title}</h2>
            </div>
            <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>{sharedMyths.description}</p>
          </div>
          <div className="finance-comparison-table" style={{ width: "100%", overflowX: "auto", border: "1px solid var(--border)", borderRadius: "12px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "15px" }}>
              <thead>
                <tr style={{ background: "var(--soft)", borderBottom: "1px solid var(--border)" }}>
                  <th style={{ padding: "16px", width: "30%" }}>Myth</th>
                  <th style={{ padding: "16px", width: "50%" }}>Reality</th>
                  <th style={{ padding: "16px", width: "20%" }}>Best next step</th>
                </tr>
              </thead>
              <tbody>
                {sharedMyths.rows.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: idx < sharedMyths.rows.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <td style={{ padding: "16px", fontWeight: 700, color: "#d93838" }}>{row.myth}</td>
                    <td style={{ padding: "16px", lineHeight: 1.4 }}>{row.reality}</td>
                    <td style={{ padding: "16px", fontWeight: 700, color: "var(--b)" }}>{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ADVISER CTA PANEL */}
          <div className="cta-panel" style={{ marginTop: "40px", background: "var(--b-dark)", color: "#fff", padding: "2.5rem", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", textAlign: "left" }}>
            <div style={{ flex: "1 1 500px" }}>
              <h2 style={{ color: "#fff", margin: 0, fontSize: "26px", fontWeight: 900 }}>Need certainty before you apply?</h2>
              <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,0.85)", fontSize: "15px" }}>
                YStudy can check your status, previous study and course type before you submit your application.
              </p>
            </div>
            <div className="btnrow" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
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

      {/* FOOTER CTA */}
      <section className="footer-cta" style={{ background: "var(--soft)", padding: "3rem 1.5rem", textAlign: "center", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span className="kicker">Stay in touch</span>
          <h2 style={{ fontSize: "28px", fontWeight: 900, margin: "8px 0" }}>Your next step should feel organised.</h2>
          <p style={{ color: "var(--muted)", maxWidth: "500px", marginBottom: "24px" }}>
            Create a free account to save progress, find your best degree and track applications.
          </p>
          <div className="btnrow" style={{ display: "flex", gap: "12px" }}>
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
