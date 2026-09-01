import React from "react";
import { getCMSPageContent } from "@/services/cms.service";
import { Banner } from "@/components/ui/Banner";
import { QualificationConversionCards, QualificationCrosslinks } from "@/components/ui";

export default async function News() {
  const data = await getCMSPageContent("news-updates");

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>News Page Not Found</h2>
        <p>We couldn't retrieve the news and updates at this time.</p>
        <a href="/" className="btn btn-blue" style={{ marginTop: "1rem" }}>Go to Home</a>
      </div>
    );
  }

  const s1 = data?.section_1 || {};
  const s2 = data?.section_2 || {};
  const s3 = data?.section_3 || {};

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

      {/* CONVERSION CARDS */}
      <QualificationConversionCards sectionData={s2} />

      {/* CROSSLINKS */}
      <QualificationCrosslinks sectionData={s3} />
    </div>
  );
}
