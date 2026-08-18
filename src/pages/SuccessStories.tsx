import React from "react";
import { getCMSPageContent } from "@/services/cms.service";
import { Banner } from "@/components/ui/Banner";
import Link from "next/link";

export default async function SuccessStories() {
  const data = await getCMSPageContent("success-stories");

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Success Stories Page Not Found</h2>
        <p>We couldn't retrieve the student journeys at this time.</p>
        <Link href="/" className="btn btn-blue" style={{ marginTop: "1rem" }}>Go to Home</Link>
      </div>
    );
  }

  const hero = data.hero || {};
  const convHero = data.convHero || {};
  const s2 = data.section_2 || {};
  const s3 = data.section_3 || {};
  const s4 = data.section_4 || {};
  const s5 = data.section_5 || {};

  // Fallback for s2.cards if missing or empty in the database
  const s2Cards = (s2.cards && s2.cards.length > 0) ? s2.cards : [
    {
      tag: "Warehouse → Degree",
      title: "Warehouse Supervisor",
      description: "A practical route into Business Management.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85",
      link: "/tools/degree-match"
    },
    {
      tag: "Driver → Digital",
      title: "Driver",
      description: "A route into Computing and Cyber Security.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=85",
      link: "/tools/degree-match"
    },
    {
      tag: "Retail → People",
      title: "Retail Manager",
      description: "A route into Psychology or HR.",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85",
      link: "/tools/degree-match"
    },
    {
      tag: "Care → Progression",
      title: "Healthcare Assistant",
      description: "A route into Health & Social Care leadership.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=85",
      link: "/tools/degree-match"
    }
  ];

  // Robust parsing for Section 4 video placeholder card
  const s4Card = s4.card || (s4.cards && s4.cards.length > 0 ? s4.cards[0] : null);

  return (
    <div className="success-stories-page">
      {/* GUIDE HERO SECTION */}
      <Banner
        slug="success-stories"
        fallbackBadgeText={hero.kicker || "Success Stories"}
        fallbackTitle={hero.title || "Real student journeys."}
        fallbackDescription={hero.description || "See how adults move from work experience into degree routes and career progression."}
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
          <Link className="btn btn-orange" href="/tools/eligibility-checker">Check eligibility</Link>
          <Link className="btn btn-white" href="/lead/adviser-call">Book adviser</Link>
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
            <span className="conv-kicker">{convHero.kicker || "Success stories"}</span>
            <h1>{convHero.title || "Real student journeys."}</h1>
            <p>{convHero.description || "People who changed their future through education, funding guidance and flexible study routes."}</p>
            <div className="btnrow">
              <Link className="btn btn-orange" href="/tools/degree-match">Start Your Journey</Link>
              <Link className="btn btn-white" href="/lead/adviser-call">Book adviser</Link>
            </div>
          </div>
          <div className="conv-hero-panel">
            <h3>{convHero.panelTitle || "Before and after"}</h3>
            <div className="conv-mini-grid">
              {(convHero.panelItems || [
                { title: "Work", subtitle: "today" },
                { title: "Degree", subtitle: "route" },
                { title: "Funding", subtitle: "check" },
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

      {/* PERSONA CARDS SECTION */}
      {s2.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s2.badge || "Student journeys"}</span>
              <h2>{s2.title || "Stories students recognise"}</h2>
              <p>{s2.description || "Use these as inspiration, not promises."}</p>
            </div>
            <div className="conv-grid four ys-carousel-mobile">
              {s2Cards.map((card: any, idx: number) => (
                <Link key={idx} className="persona-card" href={card.link || "/tools/degree-match"}>
                  <img alt={card.title || "Persona"} src={card.image} />
                  <div className="body">
                    <span className="tag">{card.tag}</span>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BEFORE & AFTER CARDS SECTION */}
      {s3.status !== false && (
        <section className="conv-section soft">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s3.badge || "Before & after"}</span>
              <h2>{s3.title || "What changes after a clear plan"}</h2>
              <p>{s3.description || "Focus on route clarity, funding confidence and application progress."}</p>
            </div>
            <div className="conv-grid four ys-carousel-mobile">
              {(s3.cards || []).map((card: any, idx: number) => (
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

      {/* VIDEO TESTIMONIALS PLACEHOLDER */}
      {s4.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s4.badge || "Video testimonials"}</span>
              <h2>{s4.title || "Placeholder for future video stories"}</h2>
              <p>{s4.description || "Add student videos later without changing the page structure."}</p>
            </div>
            {s4Card && (
              <div className="conv-card">
                <div className="ico">{s4Card.ico || s4Card.icon}</div>
                <h3>{s4Card.title}</h3>
                <p>{s4Card.description}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FINAL CTA SECTION */}
      {s5.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-cta">
              <div>
                <h2>{s5.title || "Start your journey"}</h2>
                <p>{s5.description || "Find a degree route and check funding before applying."}</p>
              </div>
              <Link className="btn btn-orange" href={s5.btnHref || "/tools/degree-match"}>
                {s5.btnText || "Start now"}
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
