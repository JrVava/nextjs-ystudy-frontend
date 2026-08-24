import React from "react";
import { getCMSPageContent } from "@/services/cms.service";
import Link from "next/link";
import { Banner } from "@/components/ui/Banner";
import { QualificationConversionCards, QualificationCrosslinks } from "@/components/ui";

export default async function Partners() {
  const data = await getCMSPageContent("partners");

  const hero = data?.hero || {};
  const routes = data?.routes || {};
  const cta = data?.cta || {};

  return (
    <div className="partners-page">
      {/* HERO SECTION */}
      <Banner
        slug="partners"
        fallbackBadgeText={hero.kicker || "Partners"}
        fallbackTitle={hero.title || "Partner with YStudy."}
        fallbackDescription={hero.description || "Work with YStudy as an adviser, creator, affiliate, university or business partner."}
        fallbackBgImage="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2200&q=85"
        fallbackRightCard={{
          layoutType: "list-items",
          title: hero.outcomePanelTitle || "Your next step, organised",
          description: hero.outcomePanelDesc || "Clear, practical support before the next decision.",
          items: [
            { "title": "Free", "description": "guidance" },
            { "title": "Docs", "description": "check" },
            { "title": "SFE", "description": "support" }
          ]
        }}
        isGuideHero={true}
      >
        <div className="btnrow" style={{ marginTop: "18px" }}>
          <a className="btn btn-orange" href={hero.btn1Href || "#enquiry-form"}>{hero.btn1Text || "Explore partners"}</a>
          <a className="btn btn-white" href={hero.btn2Href || "/lead/adviser-call"}>{hero.btn2Text || "Book adviser call"}</a>
        </div>
      </Banner>

      {/* CHOOSE ROUTE SECTION */}
      <section className="conv-section">
        <div className="container">
          <div className="conv-head">
            <span className="kicker">{routes.kicker || "Choose your partner route"}</span>
            <h2>{routes.title || "Different ways to work with YStudy"}</h2>
            <p>{routes.description || "Start with the path that best matches your audience and strengths."}</p>
          </div>
          <div className="conv-grid four ys-carousel-mobile">
            {(routes.cards || [
              {
                "ico": "🧭",
                "title": "Become an adviser",
                "description": "Guide students through degree, funding and application decisions.",
                "link": "/partners/become-an-adviser"
              },
              {
                "ico": "🔗",
                "title": "Affiliate partners",
                "description": "Promote YStudy with tracked links and performance rewards.",
                "link": "#"
              },
              {
                "ico": "📱",
                "title": "Creator & Influencer programme",
                "description": "Use content to help your audience access higher education.",
                "link": "/partners/influencers"
              },
              {
                "ico": "🎁",
                "title": "Refer a friend",
                "description": "Share YStudy with someone you know and help them apply.",
                "link": "#"
              }
            ]).map((card: any, idx: number) => (
              <article className="conv-card" key={idx}>
                <div className="ico">{card.ico}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <Link className="link" href={card.link || "#"}>Open →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="conv-section">
        <div className="container">
          <div className="conv-cta">
            <div>
              <h2>{cta.title || "Not sure which route fits?"}</h2>
              <p>{cta.description || "Speak to us and we will suggest the best partner route."}</p>
            </div>
            <a className="btn btn-orange" href={cta.btnHref || "/lead/adviser-call"}>{cta.btnText || "Talk to us"}</a>
          </div>
        </div>
      </section>

      {/* BOTTOM SECTIONS */}
      <QualificationConversionCards />
      <QualificationCrosslinks />
    </div>
  );
}
