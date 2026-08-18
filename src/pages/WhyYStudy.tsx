import React from "react";
import { getCMSPageContent } from "@/services/cms.service";
import { Banner } from "@/components/ui/Banner";

export default async function WhyYStudy() {
  const data = await getCMSPageContent("why-ystudy");

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Why YStudy Page Not Found</h2>
        <p>We couldn't retrieve the details at this time.</p>
        <a href="/" className="btn btn-blue" style={{ marginTop: "1rem" }}>Go to Home</a>
      </div>
    );
  }

  const hero = data.hero || {};
  const convHero = data.convHero || {};
  const s2 = data.section_2 || {};
  const s3 = data.section_3 || {};
  const s4 = data.section_4 || {};

  return (
    <div className="why-ystudy-page">
      {/* GUIDE HERO SECTION */}
      <Banner
        slug="why-ystudy"
        fallbackBadgeText={hero.kicker || "Why YStudy"}
        fallbackTitle={hero.title || "Why use YStudy?"}
        fallbackDescription={hero.description || "Independent guidance for adults comparing courses, funding and flexible routes."}
        fallbackRightCard={{
          layoutType: "guide-hero",
          title: hero.snapshotTitle || "Snapshot",
          items: (hero.snapshotItems || [
            { title: "Free", subtitle: "guidance" },
            { title: "Funding", subtitle: "check" },
            { title: "Route", subtitle: "match" },
            { title: "Apply", subtitle: "support" }
          ])
        }}
        isGuideHero={true}
      >
        <div className="btnrow">
          <a className="btn btn-orange" href="/tools/eligibility-checker">Check eligibility</a>
          <a className="btn btn-white" href="/lead/adviser-call">Book adviser</a>
        </div>
        <div className="hero-pills">
          <span>Plain English</span>
          <span>Adult learner route</span>
          <span>Funding-focused</span>
        </div>
      </Banner>

      {/* CONV HERO SECTION */}
      <section className="conv-hero">
        <div className="container">
          <div>
            <span className="conv-kicker">{convHero.kicker || "Why YStudy"}</span>
            <h1>{convHero.title || "Independent education guidance."}</h1>
            <p>{convHero.description || "We help adults find realistic study routes, understand funding and apply with more confidence."}</p>
            <div className="btnrow">
              <a className="btn btn-orange" href="/tools/eligibility-checker">Check eligibility</a>
              <a className="btn btn-white" href="/how-guidance-works">How guidance works</a>
            </div>
          </div>
          <div className="conv-hero-panel">
            <h3>{convHero.panelTitle || "Trust signals"}</h3>
            <div className="conv-mini-grid">
              {(convHero.panelItems || [
                { title: "Free", subtitle: "guidance" },
                { title: "Adult", subtitle: "focused" },
                { title: "Funding", subtitle: "first" },
                { title: "Apply", subtitle: "support" }
              ]).map((item: any, idx: number) => (
                <div className="conv-mini" key={idx}>
                  <strong>{item.title}</strong>
                  <span>{item.subtitle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES CARDS SECTION */}
      {s2.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s2.badge || "Why students use YStudy"}</span>
              <h2>{s2.title || "Built for mature students, not generic applicants"}</h2>
              <p>{s2.description || "YStudy focuses on the decisions adults actually worry about."}</p>
            </div>
            <div className="conv-grid five">
              {(s2.cards || []).map((card: any, idx: number) => (
                <article className="conv-card" key={idx}>
                  <div className="ico">{card.ico || card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TIMELINE SECTION */}
      {s3.status !== false && (
        <section className="conv-section soft">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s3.badge || "What can we help with?"}</span>
              <h2>{s3.title || "One journey from unsure to applied"}</h2>
              <p></p>
            </div>
            <div className="conv-timeline">
              {(s3.steps || s3.cards || []).map((step: any, idx: number) => (
                <div className="conv-step" key={idx}>
                  <div className="num">{step.num || step.number || (idx + 1)}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA ELIGIBILITY */}
      {s4.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-cta">
              <div>
                <h2>{s4.title || "Check your eligibility"}</h2>
                <p>{s4.description || "Start with funding and route confidence."}</p>
              </div>
              <a className="btn btn-orange" href={s4.btnHref || "/tools/eligibility-checker"}>
                {s4.btnText || "Check now"}
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
