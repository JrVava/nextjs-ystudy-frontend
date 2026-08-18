import React from "react";
import { getCMSPageContent } from "@/services/cms.service";
import { getFAQBySlug } from "@/services/faq.service";
import { getGuidesList } from "@/services/guide.service";
import { Banner } from "@/components/ui/Banner";
import { QualificationConversionCards, QualificationCrosslinks } from "@/components/ui";

export default async function StudentFinance() {
  const [data, faqs, guides] = await Promise.all([
    getCMSPageContent("student-finance-guides"),
    getFAQBySlug("student-finance-guides"),
    getGuidesList()
  ]);

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Guide Not Found</h2>
        <p>We couldn't retrieve the student finance guide details at this time.</p>
        <a href="/" className="btn btn-blue" style={{ marginTop: "1rem" }}>Go to Home</a>
      </div>
    );
  }

  const s1 = data.section_1 || {};
  const s2 = data.section_2 || {};
  const s3 = data.section_3 || {};
  const s4 = data.section_4 || {};
  const s5 = data.section_5 || {};

  return (
    <div className="qualification-page student-finance-page">
      {/* HERO BANNER VIA COMMON BANNER COMPONENT */}
      <Banner
        slug="student-finance-guides"
        fallbackBadgeText={s1.badge || "★ Student Finance Guide · 2026/27"}
        fallbackTitle={s1.title || "Student Finance explained clearly."}
        fallbackDescription={s1.description || "Understand funding rules, previous study, documents and next steps before applying."}
        fallbackBgImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: "grid-2x2",
          title: "Snapshot",
          items: [
            { title: "Free", subtitle: "guidance" },
            { title: "Funding", subtitle: "check" },
            { title: "Route", subtitle: "match" },
            { title: "Apply", subtitle: "support" }
          ]
        }}
        childrenPosition="left"
        isGuideHero={true}
      >
        <div className="btnrow" style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          <a className="btn btn-orange" href="/tools/eligibility-checker">
            Check eligibility
          </a>
          <a className="btn btn-white" href="/lead/adviser-call">
            Book adviser
          </a>
        </div>
        <div className="hero-pills" style={{ display: "flex", gap: "12px", marginTop: "18px" }}>
          <span className="pill glass" style={{ background: "rgba(255,255,255,0.12)", color: "#fff", padding: "6px 12px", borderRadius: "100px", fontSize: "13px" }}>Plain English</span>
          <span className="pill glass" style={{ background: "rgba(255,255,255,0.12)", color: "#fff", padding: "6px 12px", borderRadius: "100px", fontSize: "13px" }}>Adult learner route</span>
          <span className="pill glass" style={{ background: "rgba(255,255,255,0.12)", color: "#fff", padding: "6px 12px", borderRadius: "100px", fontSize: "13px" }}>Funding-focused</span>
        </div>
      </Banner>

      {/* FEATURED GUIDES SECTION DYNAMIZED FROM API */}
      {s2.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s2.badge || "Featured guides"}</span>
              <h2>{s2.title || "Student Finance Guides"}</h2>
              <p>{s2.description || "Open a guide or speak to an adviser if you want a route checked."}</p>
            </div>
            <div className="guide-grid guide-carousel">
              {(guides && guides.length > 0 ? guides : (s2.cards || [
                {
                  title: "Maintenance Loan",
                  subTitle: "Living cost support and what affects it.",
                  link: "/funding/maintenance-loan",
                  image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1600&q=85"
                },
                {
                  title: "Tuition Fee Loan",
                  subTitle: "How course fee support works.",
                  link: "/funding/tuition-fee-loan",
                  image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1600&q=85"
                },
                {
                  title: "Previous Study",
                  subTitle: "Why previous university study can affect funding.",
                  link: "/guides/student-finance",
                  image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1600&q=85"
                },
                {
                  title: "EU Settled Status",
                  subTitle: "Residency routes students often ask about.",
                  link: "/guides/polish-community",
                  image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1600&q=85"
                }
              ])).map((card: any, idx: number) => (
                <a className="guide-card" href={card.link} key={idx}>
                  <span className="guide-media">
                    <img
                      alt={card.title}
                      src={card.fullImageUrl || card.image || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1600&q=85"}
                    />
                  </span>
                  <span className="guide-tags">
                    <span className="guide-tag">Guide</span>
                  </span>
                  <h3 className="guide-title">{card.title}</h3>
                  <p className="guide-sub">{card.subTitle || card.description}</p>
                  <span className="guide-cta">Read guide →</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ADVISER CALL CTA */}
      {s3.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-cta">
              <div>
                <h2>{s3.title || "Want a personalised route?"}</h2>
                <p>{s3.description || "A YStudy adviser can check your funding, qualifications and course options."}</p>
              </div>
              <a className="btn btn-orange" href="/lead/adviser-call">
                Book Adviser Call
              </a>
            </div>
          </div>
        </section>
      )}

      {/* FAQ SECTION */}
      {((faqs && faqs.length > 0) || data?.faqs) && (
        <section className="section white">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">FAQ</span>
                <h2>Frequently Asked Questions</h2>
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
      )}

      {/* CONVERSION SYSTEM */}
      <QualificationConversionCards sectionData={s4} />

      {/* CROSSLINKS */}
      <QualificationCrosslinks sectionData={s5} />
    </div>
  );
}
