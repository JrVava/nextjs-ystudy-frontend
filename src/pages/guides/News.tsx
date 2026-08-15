import React from "react";
import { getCMSPageContent } from "@/services/cms.service";
import { Banner } from "@/components/ui/Banner";
import { QualificationConversionCards, QualificationCrosslinks } from "@/components/ui";

export default async function News() {
  const data = await getCMSPageContent("news");

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>News Page Not Found</h2>
        <p>We couldn't retrieve the news and updates at this time.</p>
        <a href="/" className="btn btn-blue" style={{ marginTop: "1rem" }}>Go to Home</a>
      </div>
    );
  }

  const s1 = data.section_1 || {};
  const s2 = data.section_2 || {};

  return (
    <div className="qualification-page news-page">
      {/* HERO BANNER */}
      <Banner
        slug="news"
        fallbackBadgeText={s1.badge || "News & Updates"}
        fallbackTitle={s1.title || "YStudy updates and student guides."}
        fallbackDescription={s1.description || "Read practical updates about funding, courses and adult learning."}
        fallbackBgImage={s1.bgImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=2200&q=80"}
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

      {/* LATEST UPDATES LISTING (IF ANY CARDS EXIST) */}
      {s2.status !== false && s2.cards && s2.cards.length > 0 && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s2.badge || "Latest updates"}</span>
              <h2>{s2.title || "News & updates"}</h2>
              <p>{s2.description || "Practical updates for adult learners comparing courses, funding and entry routes."}</p>
            </div>
            <div className="guide-grid guide-carousel">
              {s2.cards.map((card: any, idx: number) => (
                <a className="guide-card" href={card.link} key={idx}>
                  <span className="guide-media">
                    <img
                      alt={card.title}
                      src={card.image || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1600&q=85"}
                    />
                  </span>
                  <span className="guide-tags">
                    <span className="guide-tag">Update</span>
                  </span>
                  <h3 className="guide-title">{card.title}</h3>
                  <p className="guide-sub">{card.description}</p>
                  <span className="guide-cta">Read update →</span>
                </a>
              ))}
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
