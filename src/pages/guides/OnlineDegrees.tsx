import React from "react";
import { getCMSPageContent } from "@/services/cms.service";
import { Banner } from "@/components/ui/Banner";
import { QualificationConversionCards, QualificationCrosslinks } from "@/components/ui";

export default async function OnlineDegrees() {
  const data = await getCMSPageContent("online-degrees");

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Guide Not Found</h2>
        <p>We couldn't retrieve the online and blended degrees guide details at this time.</p>
        <a href="/" className="btn btn-blue" style={{ marginTop: "1rem" }}>Go to Home</a>
      </div>
    );
  }

  const s1 = data.section_1 || {};
  const s2 = data.section_2 || {};
  const s3 = data.section_3 || {};

  return (
    <div className="qualification-page online-degrees-page">
      {/* HERO BANNER */}
      <Banner
        slug="online-degrees"
        fallbackBadgeText={s1.badge || "Guide · Flexible study"}
        fallbackTitle={s1.title || "Online and blended degrees"}
        fallbackDescription={s1.description || "Compare online, blended, weekend and campus study patterns before choosing your route."}
        fallbackBgImage={s1.bgImage || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=85"}
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
          <a className="btn btn-white" href="/apply">
            Apply with YStudy
          </a>
        </div>
      </Banner>

      {/* PRACTICAL GUIDE SECTION (v705 Grid) */}
      {s2.status !== false && (
        <section className="v705-sec">
          <div className="v705-wrap">
            <div className="v705-head">
              <span className="kicker">{s2.badge || "Practical guide"}</span>
              <h2>{s2.title || "What students usually need to know."}</h2>
              <p>{s2.description || "Clear, useful guidance designed for mature students who want a realistic route into university."}</p>
            </div>
            <div className="v705-grid">
              {(s2.cards || []).map((card: any, idx: number) => (
                <article className="v705-card" key={idx}>
                  <div className="v705-icon">{card.icon || "📚"}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* YSTUDY SUPPORT BAND */}
      {s3.status !== false && (
        <section className="v705-sec v705-soft">
          <div className="v705-wrap">
            <div className="v705-head">
              <span className="kicker">{s3.badge || "YStudy support"}</span>
              <h2>{s3.title || "Turn this guide into a plan."}</h2>
              <p>{s3.description || "We can help you compare routes, understand funding and prepare your application documents."}</p>
            </div>
            <div className="v705-band">
              <div>
                <h2>{s3.ctaTitle || "Ready to check your options?"}</h2>
                <p>{s3.ctaDescription || "Start with eligibility, then speak to an adviser if you want human support."}</p>
              </div>
              <a className="btn btn-orange" href="/lead/adviser-call">
                Book free call
              </a>
            </div>
          </div>
        </section>
      )}

      {/* CONVERSION SYSTEM */}
      <QualificationConversionCards />

      {/* CROSSLINKS */}
      <QualificationCrosslinks />
    </div>
  );
}
