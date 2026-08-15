import React from "react";
import { getCMSPageContent } from "@/services/cms.service";
import { QualificationConversionCards, QualificationCrosslinks } from "@/components/ui";

export default async function GuidesHub() {
  const data = await getCMSPageContent("guides-hub");

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Guides Hub Not Found</h2>
        <p>We couldn't retrieve the guides resources at this time.</p>
        <a href="/" className="btn btn-blue" style={{ marginTop: "1rem" }}>Go to Home</a>
      </div>
    );
  }

  const s1 = data.section_1 || {};
  const s2 = data.section_2 || {};
  const s3 = data.section_3 || {};
  const s4 = data.section_4 || {};

  return (
    <div className="guides-hub-page">
      {/* HUB HERO */}
      <section className="hubhero">
        <img
          alt=""
          className="bg"
          src={s1.bgImage || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=2000&q=85"}
        />
        <div
          className="sc"
          style={{
            background: "linear-gradient(110deg,rgba(120,40,0,.92),rgba(224,80,0,.7) 58%,rgba(7,17,38,.4))"
          }}
        ></div>
        <div className="in">
          <span className="eyebrow">{s1.badge || "Guides · plain English"}</span>
          <h1>{s1.title || "Guides that make the next step clear."}</h1>
          <p className="lead">{s1.description || "Funding, university routes, applications and careers — written without jargon, for adult learners and career changers."}</p>
          <div className="btnrow">
            <a className="hubbtn white" href="#allguides">Browse all guides ↓</a>
            <a className="hubbtn ghost" href="/guides/student-finance">Most popular</a>
          </div>
          {s1.chips && (
            <div className="chips">
              {s1.chips.map((chip: string, idx: number) => (
                <span key={idx}>{chip}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ALL GUIDES GRID */}
      {s2.status !== false && (
        <section className="ghub-sec" id="allguides">
          <div className="container">
            <div className="ghub-head">
              <span className="kicker">{s2.badge || "All guides"}</span>
              <h2>{s2.title || "Plain-English guides for adult learners."}</h2>
              <p>{s2.description || "Funding, university routes, applications and careers — explained without jargon. Pick the one that answers your question."}</p>
            </div>
            <div className="ghub-grid">
              {(s2.cards || []).map((card: any, idx: number) => (
                <a className="gcard" href={card.link} key={idx}>
                  <div className="gph">
                    <span className="gchip">{card.category}</span>
                    <img
                      src={card.image || "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"}
                      alt={card.title}
                    />
                  </div>
                  <b className="gtitle">{card.title}</b>
                  <p className="gdesc">{card.description}</p>
                  <div className="gfoot">
                    <span className="gmin">{card.readTime || "5 min read"}</span>
                    <span className="gread">Read →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA CONVERSION */}
      {s3.status !== false && (
        <section className="conv-section">
          <div className="container">
            <div className="conv-cta">
              <div>
                <h2>{s3.title || "Need help choosing where to start?"}</h2>
                <p>{s3.description || "Talk to a student adviser before choosing a course or submitting an application."}</p>
              </div>
              <a className="btn btn-orange" href={s3.btnHref || "/lead/adviser-call"}>
                {s3.btnText || "Talk to an adviser"}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* THREE-COLUMN CONVERSION CARDS */}
      <QualificationConversionCards />

      {/* CROSSLINKS SECTION */}
      <QualificationCrosslinks />

      {/* PHASE 8 AUTHORITY HUB */}
      {s4.status !== false && (
        <section className="v705-sec v705-soft" id="authority-hub">
          <div className="v705-wrap" style={{ maxWidth: "min(1680px, calc(100% - 44px))", margin: "0 auto", padding: "0 12px" }}>
            <div className="v705-head" style={{ marginBottom: "30px", textAlign: "left" }}>
              <span className="kicker" style={{ color: "#e05000", fontWeight: 800, textTransform: "uppercase", fontSize: "11.5px" }}>{s4.badge || "Phase 8 authority hub"}</span>
              <h2 style={{ fontFamily: "var(--display-font)", fontWeight: 900, fontSize: "clamp(26px, 2.5vw, 42px)", margin: "8px 0" }}>{s4.title || "High-value guides for students who are close to applying."}</h2>
              <p style={{ color: "#46566f", fontWeight: 600, fontSize: "clamp(16px, 1.2vw, 19px)" }}>{s4.description || "These guides answer the questions that usually stop students from moving forward: eligibility, funding, entry routes and flexible study."}</p>
            </div>
            <div className="ys-authority-grid">
              {(s4.cards || []).map((card: any, idx: number) => (
                <a className="ys-authority-card" href={card.link} key={idx}>
                  <h3>{card.title}</h3>
                  <p>{card.description} <b>Read guide →</b></p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
