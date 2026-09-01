import React from "react";
import { getCMSPageContent } from "@/services/cms.service";
import { Banner } from "@/components/ui/Banner";

export default async function HowGuidanceWorks() {
  const data = await getCMSPageContent("how-guidance-works");

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Page Not Found</h2>
        <p>We couldn't retrieve the guidance process details at this time.</p>
        <a href="/" className="btn btn-blue" style={{ marginTop: "1rem" }}>Go to Home</a>
      </div>
    );
  }

  const hero = data.hero || {};
  const convHero = data.convHero || {};
  const s2 = data?.section_2 || {
    badge: "Your route",
    title: "Six clear steps",
    cards: [
      {
        number: "1",
        title: "Check eligibility",
        description: "Understand status, funding and possible risks."
      },
      {
        number: "2",
        title: "Career Quiz",
        description: "Explore career direction and study interests."
      },
      {
        number: "3",
        title: "Degree Match Finder",
        description: "Get route and degree recommendations."
      },
      {
        number: "4",
        title: "Funding Check",
        description: "Estimate support and understand evidence."
      },
      {
        number: "5",
        title: "Apply",
        description: "Use the Application Hub and adviser support."
      },
      {
        number: "6",
        title: "Start University",
        description: "Prepare for interview, documents and enrolment."
      },
      {
        number: "7",
        title: "Track Progress",
        description: "Dashboard shows tasks, messages and next actions."
      },
      {
        number: "8",
        title: "Get Help",
        description: "Speak to an adviser when anything is unclear."
      }
    ],
    status: true
  };
  const s3 = data?.section_3 || {
    badge: "After you apply",
    title: "Dashboard and adviser support",
    cards: [
      {
        icon: "📊",
        title: "Dashboard preview",
        description: "Track applications, documents and messages."
      },
      {
        icon: "📎",
        title: "Document uploads",
        description: "Organise ID, residency evidence and qualifications."
      },
      {
        icon: "👤",
        title: "Adviser review",
        description: "Send tool results and application context."
      },
      {
        icon: "💷",
        title: "Funding checks",
        description: "Keep finance risks visible before deadlines."
      }
    ],
    status: true
  };
  const s4 = data?.section_4 || {
    title: "Start your route",
    description: "Begin with Degree Match Finder and check funding afterwards.",
    status: true
  };

  const cards = s2.cards || [];
  const firstRowSteps = cards.slice(0, 4);
  const secondRowSteps = cards.slice(4);

  return (
    <div className="how-guidance-works-page">
      {/* HERO BANNER */}
      <Banner
        slug="how-guidance-works"
        fallbackBadgeText={hero.kicker || "Guidance Process"}
        fallbackTitle={hero.title || "How YStudy guidance works."}
        fallbackDescription={hero.description || "A simple route from eligibility check to degree match, funding review and application support."}
        fallbackRightCard={{
          layoutType: "grid-2x2",
          title: hero.snapshotTitle || "Snapshot",
          items: hero.snapshotItems || [
            { title: "Free", subtitle: "guidance" },
            { title: "Funding", subtitle: "check" },
            { title: "Route", subtitle: "match" },
            { title: "Apply", subtitle: "support" }
          ]
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
            <span className="conv-kicker">{convHero.kicker || "How guidance works"}</span>
            <h1>{convHero.title || "Your route into university."}</h1>
            <p>{convHero.description || "A simple step-by-step process from eligibility to application and start date."}</p>
            <div className="btnrow">
              <a className="btn btn-orange" href="/tools/degree-match">Start Now</a>
              <a className="btn btn-white" href="/tools/eligibility-checker">Check funding</a>
            </div>
          </div>
          <div className="conv-hero-panel">
            <h3>{convHero.panelTitle || "Guided process"}</h3>
            <div className="conv-mini-grid">
              {(convHero.panelItems || [
                { title: "1", subtitle: "Check" },
                { title: "2", subtitle: "Match" },
                { title: "3", subtitle: "Apply" },
                { title: "4", subtitle: "Track" }
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

      {/* TIMELINE SECTION */}
      {s2.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s2.badge || "Your route"}</span>
              <h2>{s2.title || "Six clear steps"}</h2>
              <p>{s2.description}</p>
            </div>
            
            <div className="conv-timeline">
              {firstRowSteps.map((step: any, idx: number) => (
                <div className="conv-step" key={idx}>
                  <div className="num">{step.number || (idx + 1)}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>

            {secondRowSteps.length > 0 && (
              <>
                <div style={{ height: "18px" }}></div>
                <div className="conv-timeline">
                  {secondRowSteps.map((step: any, idx: number) => (
                    <div className="conv-step" key={idx}>
                      <div className="num">{step.number || (idx + 5)}</div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* AFTER YOU APPLY CARDS SECTION */}
      {s3.status !== false && (
        <section className="conv-section soft">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s3.badge || "After you apply"}</span>
              <h2>{s3.title || "Dashboard and adviser support"}</h2>
              <p>{s3.description}</p>
            </div>
            <div className="conv-grid four">
              {(s3.cards || []).map((card: any, idx: number) => (
                <article className="conv-card" key={idx}>
                  <div className="ico">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA START ROUTE */}
      {s4.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-cta">
              <div>
                <h2>{s4.title || "Start your route"}</h2>
                <p>{s4.description || "Begin with Degree Match Finder and check funding afterwards."}</p>
              </div>
              <a className="btn btn-orange" href={s4.btnHref || "/tools/degree-match"}>
                {s4.btnText || "Start now"}
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
