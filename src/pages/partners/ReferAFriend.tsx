/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Banner } from "@/components/ui/Banner";
import PartnershipFormWidget from "@/components/widgets/PartnershipFormWidget";
import { QualificationConversionCards, QualificationCrosslinks } from "@/components/ui";
import { CMSPageData } from "@/types/cms";
import Link from "next/link";

interface ReferAFriendProps {
  data: CMSPageData;
}

export default function ReferAFriend({ data }: ReferAFriendProps) {
  const s2 = data?.section_2 || {};
  const s3 = data?.section_3 || {};
  const s4 = data?.section_4 || {};
  const s5 = data?.section_5 || {};
  const s6 = data?.section_6 || {};
  const s7 = data?.section_7 || {};

  const formCard = s7.cards?.[0] || {};
  const reviewCard = s7.cards?.[1] || {};

  return (
    <div className="refer-a-friend-page">
      {/* HERO SECTION */}
      <Banner
        slug="refer-a-friend"
        fallbackBadgeText="★ Refer a friend"
        fallbackTitle="Know someone who’d thrive at university?"
        fallbackDescription="Pass on their details, with permission. We’ll guide them for free — and we’ll thank you when they enrol."
        fallbackBgImage="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: "none"
        }}
      >
        <div className="btnrow" style={{ marginTop: "18px" }}>
          <a className="btn btn-orange" href="#enquiry-form">Refer someone →</a>
          <a className="btn btn-white" href="#how">Check the details</a>
        </div>
      </Banner>

      {/* HOW IT WORKS */}
      {s2.status !== false && (
        <section className="conv-section soft" id="how">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s2.badge || "How it works"}</span>
              <h2>{s2.title || "Four simple steps"}</h2>
              <p>{s2.description || "Your friend gets guidance. You help them move forward."}</p>
            </div>
            <div className="conv-timeline">
              {(s2.cards || []).map((step: any, idx: number) => (
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

      {/* WHY REFER */}
      {s3.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s3.badge || "Why students refer"}</span>
              <h2>{s3.title || "Helping friends should be simple"}</h2>
              <p>{s3.description || "Referral pages should be clear, fast and confidence-building."}</p>
            </div>
            <div className="conv-grid three">
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

      {/* CTA SECTION */}
      {s4.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-cta">
              <div>
                <h2>{s4.title || "Ready to refer?"}</h2>
                <p>{s4.description || "Start referring friends who may want to study in the UK."}</p>
              </div>
              <a className="btn btn-orange" href="#enquiry-form">Start now</a>
            </div>
          </div>
        </section>
      )}

      {/* CONVERSION SYSTEM */}
      <QualificationConversionCards sectionData={s5} />

      {/* CROSSLINKS SECTION */}
      <QualificationCrosslinks sectionData={s6} />

      {/* WORKFLOW FORM */}
      <PartnershipFormWidget
        workflow="referral-form"
        kicker={formCard.badge || "Referral form"}
        title={formCard.title || "Refer a friend to YStudy."}
        description={formCard.description || "Share your details and your friend’s contact information so the team can follow up."}
        submitText="Start referral"
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
