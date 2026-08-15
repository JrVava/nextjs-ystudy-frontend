import React from "react";
import Banner from "@/components/ui/Banner";
import FundingBottomSections from "@/components/widgets/FundingBottomSections";

interface DisabledStudentsAllowanceProps {
  data?: any;
  faqs?: any[] | null;
}

export function DisabledStudentsAllowance({ data, faqs }: DisabledStudentsAllowanceProps) {
  const s2 = data?.section_2; // snapshot
  const s3 = data?.section_3; // journey
  const s4 = data?.section_4; // myths
  const s5 = data?.section_5; // certainty

  return (
    <div className="qualification-page funding-sub-page">
      {/* HERO BANNER */}
      <Banner
        slug="disabled-students-allowance"
        fallbackBadgeText="★ DSA · 2026/27"
        fallbackTitle="Extra support, if a condition makes study harder."
        fallbackDescription="Non-repayable help for equipment, software, support workers and travel — it doesn't depend on your household income."
        fallbackBgImage="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: "list-items",
          title: "Up to £27,783 / year covers",
          items: [
            { value: "Tech", description: "Equipment & software" },
            { value: "People", description: "Support workers" },
            { value: "Travel", description: "Uncapped" },
            { value: "£0", description: "To repay" }
          ]
        }}
      >
        <div className="btnrow" style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          <a className="btn btn-orange" href="/tools/eligibility-checker">
            Check if you qualify →
          </a>
          <a className="btn btn-white" href="/lead/adviser-call">
            Book adviser
          </a>
        </div>
      </Banner>

      {/* FAQ SECTION */}
      {((faqs && faqs.length > 0) || data?.faqs) ? (
        <section className="section white">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">FAQ</span>
                <h2>Common DSA questions.</h2>
              </div>
            </div>
            <div className="faq-list" style={{ maxWidth: "880px", display: "grid", gap: "14px", textAlign: "left" }}>
              {(faqs && faqs.length > 0 ? faqs : data?.faqs || []).map((faq: any, idx: number) => (
                <details key={faq._id || idx} className="info-card" style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.25rem", cursor: "pointer" }}>
                  <summary style={{ fontWeight: 950, fontSize: "17px", color: "#102033" }}>{faq.question || faq.q}</summary>
                  <p style={{ marginTop: "12px", color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.5 }}>
                    {faq.answer || faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="section white">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">FAQ</span>
                <h2>Common DSA questions.</h2>
              </div>
            </div>
            <div className="faq-list" style={{ maxWidth: "880px", display: "grid", gap: "14px", textAlign: "left" }}>
              <details className="info-card" style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.25rem", cursor: "pointer" }}>
                <summary style={{ fontWeight: 950, fontSize: "17px", color: "#102033" }}>Do I get this money in cash?</summary>
                <p style={{ marginTop: "12px", color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.5 }}>
                  Usually no. SFE pays for the services, software, or equipment directly to the suppliers, or reimburses you with proof of purchase.
                </p>
              </details>
              <details className="info-card" style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.25rem", cursor: "pointer" }}>
                <summary style={{ fontWeight: 950, fontSize: "17px", color: "#102033" }}>Do I need a formal diagnosis?</summary>
                <p style={{ marginTop: "12px", color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.5 }}>
                  Yes, you will need a diagnostic assessment or medical evidence from a qualified doctor or educational psychologist.
                </p>
              </details>
            </div>
          </div>
        </section>
      )}

      {/* SHARED BOTTOM SECTIONS */}
      <FundingBottomSections
        snapshot={s2}
        journey={s3}
        myths={s4}
        certainty={s5}
      />
    </div>
  );
}

export default DisabledStudentsAllowance;
