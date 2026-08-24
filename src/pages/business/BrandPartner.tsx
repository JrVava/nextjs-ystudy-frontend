/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Banner } from "@/components/ui/Banner";
import { QualificationConversionCards, QualificationCrosslinks } from "@/components/ui";
import { CMSPageData } from "@/types/cms";
import Link from "next/link";

interface BrandPartnerProps {
  data: CMSPageData;
}

export default function BrandPartner({ data }: BrandPartnerProps) {
  const s2 = data.section_2 || {};
  const s3 = data.section_3 || {};
  const s4 = data.section_4 || {};
  const s5 = data.section_5 || {};
  const s6 = data.section_6 || {};

  return (
    <div className="brand-partner-page">
      {/* HERO SECTION */}
      <Banner
        slug="brand-partnerships"
        fallbackBadgeText="Brand Partners"
        fallbackTitle="Build student-facing partnerships."
        fallbackDescription="Connect useful offers with adult learners before and during their studies."
        fallbackBgImage="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2200&q=85"
        isGuideHero={true}
        fallbackRightCard={{
          layoutType: "guide-hero",
          title: "Your next step, organised",
          description: "Clear, practical support before the next decision.",
          items: [
            { title: "Free", subtitle: "guidance" },
            { title: "Docs", subtitle: "check" },
            { title: "SFE", subtitle: "support" }
          ]
        }}
      >
        <div className="btnrow" style={{ marginTop: "18px" }}>
          <a className="btn btn-orange" href="#contact">Become a partner</a>
          <Link className="btn btn-white" href="/lead/adviser-call">Book adviser call</Link>
        </div>
      </Banner>

      {/* WHY PARTNER */}
      {s2.status !== false && (
        <section className="pl-wrap" id="how">
          <div className="pl-sec-head">
            <span className="pl-kick2">{s2.badge || "Why partner"}</span>
            <h2>{s2.title || "A simple, transparent way to reach students"}</h2>
            <p>{s2.description || "One point of contact, clear pricing and brand-safe placements. We handle the campaign so you can focus on your product."}</p>
          </div>
          <div className="pl-grid">
            {(s2.cards || []).map((card: any, idx: number) => (
              <div className="pl-card" key={idx} >
                <div className="pl-ico" >{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* HOW IT WORKS TIMELINE */}
      {s3.status !== false && (
        <section className="pl-band" style={{ background: "var(--light)", padding: "80px 0" }}>
          <div className="pl-wrap" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 22px" }}>
            <div className="pl-sec-head" style={{ textAlign: "center", marginBottom: "50px" }}>
              <span className="pl-kick2" style={{ color: "#ff8b3d", fontSize: "12px", textTransform: "uppercase", fontWeight: 800 }}>{s3.badge || "How it works"}</span>
              <h2 style={{ fontSize: "36px", fontWeight: 900, marginTop: "12px" }}>{s3.title || "How to get started"}</h2>
            </div>
            <div className="pl-steps" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }}>
              {(s3.cards || []).map((step: any, idx: number) => (
                <div className="pl-step" key={idx} style={{ textAlign: "center" }}>
                  <div className="pl-num" style={{ width: "40px", height: "40px", background: "var(--b)", color: "#fff", borderRadius: "50%", display: "grid", placeItems: "center", margin: "0 auto 16px", fontWeight: "bold" }}>
                    {step.number || (idx + 1)}
                  </div>
                  <h4 style={{ fontSize: "16px", fontWeight: 800, marginBottom: "8px" }}>{step.title}</h4>
                  <p style={{ fontSize: "14px", color: "var(--muted)", margin: 0 }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      {s4.status !== false && (
        <span className="anchor-target" id="contact"></span>
        /* Custom styled CTA to match pl-final */
      )}
      <section className="pl-final" style={{ textAlign: "center", padding: "80px 0", background: "linear-gradient(135deg, #071126, #122a57)", color: "#fff" }}>
        <h2 style={{ fontSize: "36px", fontWeight: 900, marginBottom: "12px", color: "#fff" }}>{s4.title || "Become a brand partner"}</h2>
        <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "28px" }}>{s4.description || "Tell us about your brand and we'll build a plan."}</p>
        <Link className="btn btn-orange" href="/lead/adviser-call" style={{ padding: "14px 32px", fontSize: "16px", fontWeight: "bold" }}>
          Start a partnership
        </Link>
      </section>

      {/* CONVERSION SYSTEM */}
      <QualificationConversionCards sectionData={s5} />

      {/* CROSSLINKS SECTION */}
      <QualificationCrosslinks sectionData={s6} />
    </div>
  );
}
