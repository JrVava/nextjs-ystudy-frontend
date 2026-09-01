import { QualificationConversionCards, QualificationCrosslinks } from "@/components/ui";
import { Banner } from "@/components/ui/Banner";
import { getCMSPageContent } from "@/services/cms.service";
import Link from "next/link";

export default async function Advertise() {
  const data = await getCMSPageContent("advertise-to-students");

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Advertising Content Not Found</h2>
        <p>We couldn't retrieve the advertising details at this time.</p>
        <Link href="/" className="btn btn-blue" style={{ marginTop: "1rem" }}>Go to Home</Link>
      </div>
    );
  }

  const s2 = data?.section_2 || {};
  const s3 = data?.section_3 || {};
  const s4 = data?.section_4 || {};

  const defaultReviewItems = [
    { title: "Audience fit", description: "Mature students, career changers, UK residents or adult learners." },
    { title: "Promotion method", description: "Referral, content, community, adviser support or paid partnership." },
    { title: "Next step", description: "Call, tracking link, adviser onboarding or campaign plan." }
  ];

  return (
    <div className="advertise-page">
      {/* HERO SECTION */}
      <Banner
        slug="advertise-to-students"
        fallbackBadgeText="★ For businesses"
        fallbackTitle="Reach learners at the moment of decision."
        fallbackDescription="Adult learners and career changers, actively comparing courses and funding. High intent, UK-wide, brand-safe."
        fallbackBgImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: "list-items",
          title: "★ For businesses",
          description: "Reach learners at the moment of decision.",
          items: [
            { "title": "50k+", "description": "Monthly learners" },
            { "title": "UK", "description": "Nationwide reach" },
            { "title": "High", "description": "Purchase intent" }
          ]
        }}
      >
        <div className="btnrow" style={{ marginTop: "18px" }}>
          <a className="btn btn-orange" href="#enquiry-form">Get the media pack →</a>
          <a className="btn btn-white" href="#enquiry-form">Talk to us</a>
        </div>
      </Banner>

      {/* WHY ADVERTISE */}
      {s2.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s2.badge || "Why advertise"}</span>
              <h2>{s2.title || "An engaged, intent-driven audience"}</h2>
              <p>{s2.description || "Students come to YStudy to plan their future — that means high intent and genuine attention for the right brands."}</p>
            </div>
            <div className="conv-grid four">
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

      {/* HOW A CAMPAIGN WORKS */}
      {s3.status !== false && (
        <section className="conv-section soft">
          <div className="container">
            <div className="conv-head">
              <span className="kicker">{s3.badge || "How it works"}</span>
              <h2>{s3.title || "How a campaign works"}</h2>
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

      {/* CTA SECTION */}
      {s4.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-cta">
              <div>
                <h2>{s4.title || "Promote your brand to students"}</h2>
                <p>{s4.description || "Tell us what you'd like to achieve and we'll build a plan."}</p>
              </div>
              <a className="btn btn-orange" href="#enquiry-form">Contact team</a>
            </div>
          </div>
        </section>
      )}

      {/* BOTTOM SECTIONS */}
      <QualificationConversionCards sectionData={data?.section_5} />
      <QualificationCrosslinks sectionData={data?.section_6} />
    </div>
  );
}
