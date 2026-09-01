import React from "react";
import { getCMSPageContent } from "@/services/cms.service";
import Link from "next/link";
import { Banner } from "@/components/ui/Banner";
import PartnershipFormWidget from "@/components/widgets/PartnershipFormWidget";
import { QualificationConversionCards, QualificationCrosslinks } from "@/components/ui";

export default async function Influencers() {
  const data = await getCMSPageContent("creator-programme");

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Content Not Found</h2>
        <p>We couldn't retrieve the creator details at this time.</p>
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
    <div className="influencers-page">
      {/* HERO SECTION */}
      <Banner
        slug="creator-programme"
        fallbackBadgeText="★ Creator programme"
        fallbackTitle="Your audience trusts you. Help them study."
        fallbackDescription="Share genuinely useful guidance with adult learners and career changers — your style, our free tools, real commission."
        fallbackBgImage="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=2000&q=85"
      >
        <div className="btnrow" style={{ marginTop: "18px" }}>
          <a className="btn btn-orange" href="#enquiry-form">Become a creator →</a>
          <a className="btn btn-white" href="#enquiry-form">See the perks</a>
        </div>
      </Banner>

      {/* PERFECT FOR */}
      {s2.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s2.badge || "Perfect for"}</span>
              <h2>{s2.title || "Creator channels with community trust"}</h2>
              <p>{s2.description || "YStudy works best with creators who can explain education, funding and career change simply."}</p>
            </div>
            <div className="conv-grid five">
              {(s2.cards || []).map((card: any, idx: number) => (
                <a className="persona-card" href="#enquiry-form" key={idx}>
                  <img alt={card.title} src={card.fullImageUrl || "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80"} />
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

      {/* CONTENT IDEAS */}
      {s3.status !== false && (
        <section className="conv-section soft">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s3.badge || "Content ideas"}</span>
              <h2>{s3.title || "Useful topics your audience will actually watch"}</h2>
              <p>{s3.description || "Focus on decisions, funding myths and real journeys — not generic university marketing."}</p>
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

      {/* PERKS */}
      {s4.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s4.badge || "What you get"}</span>
              <h2>{s4.title || "Support that makes content easier"}</h2>
              <p>{s4.description || "We provide the partner structure so you can focus on creating."}</p>
            </div>
            <div className="conv-grid five">
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
                <h2>{s5.title || "Apply as a creator partner"}</h2>
                <p>{s5.description || "Tell us about your audience and we will suggest the best partnership route."}</p>
              </div>
              <a className="btn btn-orange" href="#enquiry-form">Apply now</a>
            </div>
          </div>
        </section>
      )}

      {/* BOTTOM SECTIONS */}
      <QualificationConversionCards sectionData={data?.section_6} />
      <QualificationCrosslinks sectionData={data?.section_7} />

      {/* WORKFLOW FORM */}
      <PartnershipFormWidget
        workflow="creator-enquiry"
        kicker={formCard.badge || "Creator enquiry"}
        title={formCard.title || "Apply as a Creator & Influencer Partner."}
        description={formCard.description || "Tell us where your audience is and how you want to promote education opportunities."}
        submitText="Apply as creator"
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
