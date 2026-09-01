import React from "react";
import { getCMSPageContent } from "@/services/cms.service";
import { Banner } from "@/components/ui/Banner";
import FundingBottomSections from "@/components/widgets/FundingBottomSections";

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

  const s1 = data?.section_1 || {};
  const s2 = data?.section_2 || {};
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

      {/* SHARED BOTTOM SECTIONS */}
      <FundingBottomSections />
    </div>
  );
}
