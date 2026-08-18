import React from "react";
import { getCMSPageContent } from "@/services/cms.service";
import { Banner } from "@/components/ui/Banner";
import { QualificationConversionCards, QualificationCrosslinks } from "@/components/ui";

export default async function CareersSalaries() {
  const data = await getCMSPageContent("careers-salaries");

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Careers Page Not Found</h2>
        <p>We couldn't retrieve the careers & salaries guides at this time.</p>
        <a href="/" className="btn btn-blue" style={{ marginTop: "1rem" }}>Go to Home</a>
      </div>
    );
  }

  const s1 = data.section_1 || {};
  const s2 = data.section_2 || {};
  const s3 = data.section_3 || {};

  return (
    <div className="qualification-page careers-salaries-page">
      {/* HERO BANNER */}
      <Banner
        slug="careers-salaries"
        fallbackBadgeText={s1.badge || "Career Guides Hub"}
        fallbackTitle={s1.title || "Explore career guides."}
        fallbackDescription={s1.description || "Compare subject routes, salary ranges and career outcomes before choosing your degree."}
        fallbackBgImage={s1.bgImage || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1600&q=85"}
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

      {/* FEATURED GUIDES SECTION */}
      {s2.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s2.badge || "Featured guides"}</span>
              <h2>{s2.title || "Careers & Salaries"}</h2>
              <p>{s2.description || "Open a guide or speak to an adviser if you want a route checked."}</p>
            </div>
            <div className="guide-grid guide-carousel">
              {(s2.cards || []).map((card: any, idx: number) => (
                <a className="guide-card" href={card.link || "/lead/adviser-call"} key={idx}>
                  <span className="guide-media">
                    <img
                      alt={card.title}
                      src={card.image || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1600&q=85"}
                    />
                  </span>
                  <span className="guide-tags">
                    <span className="guide-tag">Guide</span>
                  </span>
                  <h3 className="guide-title">{card.title}</h3>
                  <p className="guide-sub">{card.description}</p>
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

      {/* CONVERSION CARDS */}
      <QualificationConversionCards />

      {/* CROSSLINKS */}
      <QualificationCrosslinks />
    </div>
  );
}
