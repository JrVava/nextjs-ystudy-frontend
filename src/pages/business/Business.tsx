import React from "react";
import { getCMSPageContent } from "@/services/cms.service";
import Link from "next/link";
import { Banner } from "@/components/ui/Banner";
import PartnershipFormWidget from "@/components/widgets/PartnershipFormWidget";
import { QualificationConversionCards, QualificationCrosslinks } from "@/components/ui";

export default async function Business() {
  const data = await getCMSPageContent("business-opportunities");

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Business Content Not Found</h2>
        <p>We couldn't retrieve the business details at this time.</p>
        <Link href="/" className="btn btn-blue" style={{ marginTop: "1rem" }}>Go to Home</Link>
      </div>
    );
  }

  const s2 = data?.section_2 || {};
  const s3 = data?.section_3 || {};
  const s4 = data?.section_4 || {};
  const s5 = data?.section_5 || {};
  const s8 = data?.section_8 || {};

  const formCard = s8.cards?.[0] || {};
  const reviewCard = s8.cards?.[1] || {};

  return (
    <div className="business-page">
      {/* HERO SECTION */}
      <Banner
        slug="business-opportunities"
        fallbackBadgeText="Business Partners"
        fallbackTitle="Reach adult learners with YStudy."
        fallbackDescription="Promote relevant products, services and opportunities to working adults planning study."
        fallbackBgImage="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2200&q=85"
        fallbackRightCard={{
          layoutType: "list-items",
          title: "Your next step, organised",
          description: "Clear, practical support before the next decision.",
          items: [
            { "title": "Free", "description": "guidance" },
            { "title": "Docs", "description": "check" },
            { "title": "SFE", "description": "support" }
          ]
        }}
        isGuideHero={true}
      >
        <div className="btnrow" style={{ marginTop: "18px" }}>
          <a className="btn btn-orange" href="#enquiry-form">Talk to partnerships</a>
          <a className="btn btn-white" href="/lead/adviser-call">Book adviser call</a>
        </div>
      </Banner>

      {/* OPPORTUNITIES */}
      {s2.status !== false && (
        <section className="conv-section" id="opportunities">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s2.badge || "Opportunities"}</span>
              <h2>{s2.title || "Commercial partnerships without clutter"}</h2>
              <p>{s2.description || "Build relevant campaigns around real student needs."}</p>
            </div>
            <div className="conv-grid five">
              {(s2.cards || []).map((card: any, idx: number) => (
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

      {/* AUDIENCE STATISTICS */}
      {s3.status !== false && (
        <section className="conv-section soft">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s3.badge || "Audience statistics"}</span>
              <h2>{s3.title || "Who YStudy reaches"}</h2>
              <p>{s3.description || "These are the audiences your partnership can support."}</p>
            </div>
            <div className="stats-band" style={{ display: "flex", justifyContent: "space-around", gap: "20px", flexWrap: "wrap", marginTop: "32px" }}>
              {(s3.cards || []).map((item: any, idx: number) => (
                <div className="stat-block" key={idx} style={{ textAlign: "center", flex: "1 1 200px" }}>
                  <strong style={{ display: "block", fontSize: "3rem", fontWeight: 900, color: "var(--orange)" }}>{item.title}</strong>
                  <span style={{ fontSize: "14px", fontWeight: "bold", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.description}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PARTNERSHIP TYPES */}
      {s4.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s4.badge || "Partnership types"}</span>
              <h2>{s4.title || "Choose the right commercial route"}</h2>
              <p>{s4.description || "Keep every partnership useful, relevant and transparent."}</p>
            </div>
            <div className="conv-grid four ys-carousel-mobile">
              {(s4.cards || []).map((card: any, idx: number) => (
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

      {/* CTA SECTION */}
      {s5.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-cta">
              <div>
                <h2>{s5.title || "Talk to partnerships"}</h2>
                <p>{s5.description || "Tell us what you offer and who you want to reach."}</p>
              </div>
              <a className="btn btn-orange" href="#enquiry-form">Contact team</a>
            </div>
          </div>
        </section>
      )}

      {/* BOTTOM SECTIONS */}
      <QualificationConversionCards sectionData={data?.section_6} />
      <QualificationCrosslinks sectionData={data?.section_7} />

      {/* WORKFLOW FORM */}
      <PartnershipFormWidget
        workflow="business-partnership"
        kicker={formCard.badge || "Business partnership"}
        title={formCard.title || "Talk to us about reaching adult learners."}
        description={formCard.description || "Advertising, discounts, sponsored content, email campaigns or student offers."}
        submitText="Talk to partnerships"
        sideKicker={reviewCard.badge || "What we review"}
        sideTitle={reviewCard.title || "Simple, practical partnership checks."}
        sideItems={(reviewCard.cards || []).map((c: any) => ({
          title: c.title,
          description: c.description
        }))}
      />
    </div>
  );
}
