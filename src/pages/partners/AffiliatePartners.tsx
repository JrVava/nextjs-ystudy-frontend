/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Banner } from "@/components/ui/Banner";
import PartnershipFormWidget from "@/components/widgets/PartnershipFormWidget";
import { QualificationConversionCards, QualificationCrosslinks } from "@/components/ui";
import { CMSPageData } from "@/types/cms";
import Link from "next/link";

interface AffiliatePartnersProps {
  data: CMSPageData;
}

export default function AffiliatePartners({ data }: AffiliatePartnersProps) {
  const s2 = data.section_2 || {};
  const s3 = data.section_3 || {};
  const s4 = data.section_4 || {};
  const s5 = data.section_5 || {};
  const s6 = data.section_6 || {};
  const s7 = data.section_7 || {};
  const s8 = data.section_8 || {};

  const formCard = s8.cards?.[0] || {};
  const reviewCard = s8.cards?.[1] || {};

  // Default details for layout if CMS cards aren't fully resolved
  const trackingCard = s4.cards?.[0] || {};
  const commissionCard = s4.cards?.[1] || {};

  return (
    <div className="affiliate-partners-page">
      {/* HERO HERO HERO */}
      <Banner
        slug="affiliate-programme"
        fallbackBadgeText="★ Affiliate programme"
        fallbackTitle="Earn for every learner you send."
        fallbackDescription="Transparent tracking, reliable payouts, and a product people actually trust. Built for content, comparison and community sites."
        fallbackBgImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: "list-items",
          title: "★ Affiliate programme",
          description: "Earn for every learner you send.",
          items: [
            { "title": "£", "description": "Per enrolment" },
            { "title": "30d", "description": "Cookie window" },
            { "title": "✓", "description": "Real-time dashboard" }
          ]
        }}
      >
        <div className="btnrow" style={{ marginTop: "18px" }}>
          <a className="btn btn-orange" href="#enquiry-form">Join the programme →</a>
          <a className="btn btn-white" href="#enquiry-form">See commission</a>
        </div>
      </Banner>

      {/* SUITABLE PERSONAS */}
      {s2.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s2.badge || "Suitable for"}</span>
              <h2>{s2.title || "Built for people with student traffic"}</h2>
              <p>{s2.description || "If your audience includes working adults, parents, EU residents or career changers, YStudy can fit naturally."}</p>
            </div>
            <div className="conv-grid five">
              {(s2.cards || []).map((card: any, idx: number) => (
                <a className="persona-card" href="#enquiry-form" key={idx}>
                  <img
                    alt={card.title}
                    src={card.fullImageUrl || [
                      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
                      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
                      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
                      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80",
                      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
                    ][idx % 5]}
                  />
                  <div className="body">
                    <span className="tag">{card.badge}</span>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS TIMELINE */}
      {s3.status !== false && (
        <section className="conv-section soft" id="how">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s3.badge || "How it works"}</span>
              <h2>{s3.title || "From click to commission"}</h2>
              <p>{s3.description || "A simple partner journey that does not require you to handle applications yourself."}</p>
            </div>
            <div className="conv-timeline">
              {(s3.cards || []).map((step: any, idx: number) => (
                <div className="conv-step" key={idx}>
                  <div className="num">{step.number || (idx + 1)}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DASHBOARD AND COMMISSION INFO */}
      {s4.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-grid two">
              {trackingCard.title && (
                <article className="conv-card">
                  <div className="ico">{trackingCard.icon || "📊"}</div>
                  <h3>{trackingCard.title}</h3>
                  <p>{trackingCard.description}</p>
                  <div className="stats-band">
                    {(trackingCard.cards || []).map((stat: any, idx: number) => (
                      <div className="stat-block" key={idx}>
                        <strong>{stat.number}</strong>
                        <span>{stat.title}</span>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {commissionCard.title && (
                <article className="conv-card">
                  <div className="ico">{commissionCard.icon || "💷"}</div>
                  <h3>{commissionCard.title}</h3>
                  <p>{commissionCard.description}</p>
                  <ul>
                    {(commissionCard.pointers || []).map((pt: string, idx: number) => (
                      <li key={idx}>{pt}</li>
                    ))}
                  </ul>
                </article>
              )}
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
                <h2>{s5.title || "Join the affiliate programme"}</h2>
                <p>{s5.description || "Start with a partner review and we will suggest the best route."}</p>
              </div>
              <a className="btn btn-orange" href="#enquiry-form">Join now</a>
            </div>
          </div>
        </section>
      )}

      {/* CONVERSION SYSTEM */}
      <QualificationConversionCards sectionData={s6} />

      {/* CROSSLINKS SECTION */}
      <QualificationCrosslinks sectionData={s7} />

      {/* WORKFLOW FORM */}
      <PartnershipFormWidget
        workflow="affiliate-enquiry"
        kicker={formCard.badge || "Affiliate enquiry"}
        title={formCard.title || "Join the YStudy affiliate programme."}
        description={formCard.description || "Share YStudy tools and guidance with your website, blog or community."}
        submitText="Join affiliate programme"
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
