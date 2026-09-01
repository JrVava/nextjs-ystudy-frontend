import React from "react";
import { getCMSPageContent } from "@/services/cms.service";
import Link from "next/link";
import { Banner } from "@/components/ui/Banner";
import PartnershipFormWidget from "@/components/widgets/PartnershipFormWidget";
import { QualificationConversionCards, QualificationCrosslinks, QualificationFaqs } from "@/components/ui";

export default async function BecomeAnAdviser() {
  const data = await getCMSPageContent("become-a-student-adviser");

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Content Not Found</h2>
        <p>We couldn't retrieve the adviser details at this time.</p>
        <Link href="/" className="btn btn-blue" style={{ marginTop: "1rem" }}>Go to Home</Link>
      </div>
    );
  }

  const s2 = data?.section_2 || {};
  const s3 = data?.section_3 || {};
  const s4 = data?.section_4 || {};
  const s5 = data?.section_5 || {};
  const s6 = data?.section_6 || {};
  const s7 = data?.section_7 || {};
  const s10 = data?.section_10 || {};

  const formCard = s10.cards?.[0] || {};
  const reviewCard = s10.cards?.[1] || {};

  const fallbackFaqs = [
    { q: "Who can become a YStudy Student Adviser?", a: "We welcome anyone with a strong community connection, education background, or creator audience. You should have a passion for helping mature students navigate their next steps." },
    { q: "How does the training program work?", a: "Once accepted, you receive free online training covering UK student finance, degree routes, entry criteria, and how to use the YStudy platform." },
    { q: "Is there a monthly target or minimum hours?", a: "No. You can refer and guide students entirely on your own schedule. There are no minimum targets or fixed working hours." },
    { q: "How is commission paid?", a: "Rewards are processed and paid out based on successful student enrolments and outcome milestones." },
    { q: "Can I do this alongside my full-time job?", a: "Yes, many of our advisers operate this as a flexible side role that complements their main community or teaching activities." }
  ];

  return (
    <div className="become-an-adviser-page">
      {/* HERO SECTION */}
      <Banner
        slug="become-a-student-adviser"
        fallbackBadgeText="★ Become an adviser"
        fallbackTitle="Turn your experience into someone’s first step."
        fallbackDescription="Guide adult learners through course choice and funding. Flexible, remote, and paid for every learner you help."
        fallbackBgImage="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: "list-items",
          title: "★ Become an adviser",
          description: "Turn your experience into someone’s first step.",
          items: [
            { "title": "1", "description": "Apply & train free" },
            { "title": "2", "description": "Guide on your hours" },
            { "title": "3", "description": "Earn per learner" }
          ]
        }}
      >
        <div className="btnrow" style={{ marginTop: "18px" }}>
          <a className="btn btn-orange" href="#enquiry-form">Apply to advise →</a>
          <a className="btn btn-white" href="#how">What’s involved</a>
        </div>
      </Banner>

      {/* WHO THIS IS FOR */}
      {s2.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s2.badge || "Who this is for"}</span>
              <h2>{s2.title || "Advisers come from different backgrounds"}</h2>
              <p>{s2.description || "If people already ask you for education, career or funding advice, this could fit you."}</p>
            </div>
            <div className="conv-grid three">
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

      {/* HOW IT WORKS */}
      {s3.status !== false && (
        <section className="conv-section soft" id="how">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s3.badge || "How it works"}</span>
              <h2>{s3.title || "A simple referral and support process"}</h2>
              <p>{s3.description || "You refer students. YStudy supports the application journey."}</p>
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

      {/* EARNINGS EXAMPLES */}
      {s4.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s4.badge || "Earnings examples"}</span>
              <h2>{s4.title || "Performance-based opportunity"}</h2>
              <p>{s4.description || "These cards show the type of earning scenarios a serious adviser may target."}</p>
            </div>
            <div className="conv-grid four">
              {(s4.cards || []).map((card: any, idx: number) => (
                <div className="earn-card" key={idx}>
                  <span>{card.title}</span>
                  <strong>{card.number}</strong>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY JOIN */}
      {s5.status !== false && (
        <section className="conv-section soft">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s5.badge || "Why advisers join"}</span>
              <h2>{s5.title || "Meaningful work with clear support"}</h2>
              <p>{s5.description || "YStudy gives advisers the tools, student journey and conversion system."}</p>
            </div>
            <div className="conv-grid four">
              {(s5.cards || []).map((card: any, idx: number) => (
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

      {/* FAQ SECTION */}
      {s6.status !== false && (
        <QualificationFaqs
          slug="become-a-student-adviser"
          sectionData={s6}
          fallbackBadge="FAQ"
          fallbackTitle="Common questions"
          faqsToDisplay={fallbackFaqs}
        />
      )}

      {/* CTA SECTION */}
      {s7.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-cta">
              <div>
                <h2>{s7.title || "Apply to become an adviser"}</h2>
                <p>{s7.description || "Start the adviser application and we will review your background."}</p>
              </div>
              <a className="btn btn-orange" href="#enquiry-form">Apply now</a>
            </div>
          </div>
        </section>
      )}

      {/* WORKFLOW FORM */}
      <PartnershipFormWidget
        workflow="adviser-application"
        kicker={formCard.badge || "Adviser application"}
        title={formCard.title || "Apply to become a YStudy Student Adviser."}
        description={formCard.description || "Tell us about your background, audience and how you would support students."}
        submitText="Apply as adviser"
        sideKicker={reviewCard.badge || "What we review"}
        sideTitle={reviewCard.title || "Simple, practical partnership checks."}
        sideItems={(reviewCard.cards || []).map((c: any) => ({
          title: c.title,
          description: c.description
        }))}
      />

      {/* BOTTOM SECTIONS */}
      <QualificationConversionCards sectionData={data?.section_8} />
      <QualificationCrosslinks sectionData={data?.section_9} />
    </div>
  );
}
