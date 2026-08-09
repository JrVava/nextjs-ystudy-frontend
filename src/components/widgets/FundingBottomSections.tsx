import React from "react";

interface Card {
  title: string;
  subTitle?: string;
  description: string;
  link?: string;
  linkBtnName?: string;
}

interface MythRow {
  myth: string;
  reality: string;
  best: string;
}

interface FundingBottomSectionsProps {
  snapshot?: {
    badge?: string;
    title?: string;
    description?: string;
    cards?: Card[];
  };
  journey?: {
    badge?: string;
    title?: string;
    description?: string;
    cards?: Array<{ title: string; description: string }>;
  };
  myths?: {
    badge?: string;
    title?: string;
    description?: string;
    headers?: {
      myth_header?: string;
      reality_header?: string;
      best_header?: string;
    };
    rows?: MythRow[];
  };
  certainty?: {
    title?: string;
    description?: string;
  };
  stayInTouch?: {
    badge?: string;
    title?: string;
    description?: string;
  };
}

export function FundingBottomSections({ snapshot, journey, myths, certainty, stayInTouch }: FundingBottomSectionsProps) {
  // Default values to preserve beautiful hardcoded designs when no CMS data is passed
  const sharedSnapshot = {
    title: snapshot?.title || "Who usually needs a funding check?",
    description: snapshot?.description || "A quick student-first view before they start an application.",
    cards: snapshot?.cards && snapshot.cards.length > 0 ? snapshot.cards : [
      {
        title: "British / Irish",
        subTitle: "Usually strong route",
        description: "Typically checked for England residence, course designation and previous study.",
        link: "/tools/eligibility-checker",
        linkBtnName: "Check eligibility →"
      },
      {
        title: "Settled / ILR",
        subTitle: "Full support route",
        description: "Often eligible for tuition and maintenance support if residence rules are met.",
        link: "/tools/eligibility-checker",
        linkBtnName: "Check status →"
      },
      {
        title: "Pre-settled",
        subTitle: "Needs review",
        description: "Can be possible, but residence history and category matter. Do not guess.",
        link: "/lead/adviser-call",
        linkBtnName: "Ask adviser →"
      },
      {
        title: "Refugee / protection",
        subTitle: "Protected route",
        description: "Often eligible for strong support, but documents and dates must be checked.",
        link: "/apply",
        linkBtnName: "Start review →"
      }
    ]
  };

  const sharedJourney = {
    title: journey?.title || "From eligibility to repayment.",
    description: journey?.description || "Students understand finance faster when the process is shown as a journey, not a wall of rules.",
    cards: journey?.cards && journey.cards.length > 0 ? journey.cards : [
      {
        title: "1. Eligibility",
        description: "Check nationality, immigration status, ordinary residence, age and previous study."
      },
      {
        title: "2. Application",
        description: "Submit SFE details, evidence and course information early to avoid delayed payments."
      },
      {
        title: "3. Payments",
        description: "Tuition goes to the provider. Maintenance is paid to the student after enrolment confirmation."
      },
      {
        title: "4. Repayment",
        description: "Repay only when earning above the threshold. It is income-based, not a normal bank loan."
      }
    ]
  };

  const sharedMyths = {
    title: myths?.title || "Finance explained without panic.",
    description: myths?.description || "These blocks should reduce fear and increase adviser enquiries.",
    rows: myths?.rows && myths.rows.length > 0 ? myths.rows : [
      {
        myth: "“Student Finance is like a bank loan.”",
        reality: "Repayment is based on income, not a fixed monthly instalment.",
        best: "Use the repayment calculator."
      },
      {
        myth: "“I must repay while I study.”",
        reality: "No. Repayment starts only after the course and only above the income threshold.",
        best: "Check Plan 5 estimate."
      },
      {
        myth: "“If I studied before, I cannot get anything.”",
        reality: "Previous study matters, but rules vary by route and qualification.",
        best: "Book an adviser review."
      },
      {
        myth: "“Online and weekend courses are always the same.”",
        reality: "Mode and attendance can affect maintenance support.",
        best: "Check before choosing the course."
      }
    ]
  };

  return (
    <>
      {/* ELIGIBILITY SNAPSHOT */}
      <section className="section white ds-finance-integrated ystudy-phase4-funding" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
            <div>
              <span className="kicker">{snapshot?.badge || "Eligibility snapshot"}</span>
              <h2>{sharedSnapshot.title}</h2>
            </div>
            <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>{sharedSnapshot.description}</p>
          </div>
          <div className="finance-visual-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {sharedSnapshot.cards.map((card, idx) => (
              <article className="finance-visual-card" key={idx} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.5rem", textAlign: "left", display: "flex", flexDirection: "column" }}>
                <div className="finance-visual-card-body" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ fontSize: "19px", fontWeight: 800, margin: "0 0 4px" }}>{card.title}</h3>
                  <strong style={{ fontSize: "16px", color: "var(--o)", display: "block", margin: "4px 0 8px" }}>{card.subTitle}</strong>
                  <p style={{ fontSize: "14px", color: "var(--muted)", margin: "0 0 16px", flex: 1 }}>{card.description}</p>
                  <a href={card.link || "/tools/eligibility-checker"} style={{ fontWeight: 700, color: "var(--b)", textDecoration: "none", fontSize: "14px" }}>
                    {card.linkBtnName || "Open →"}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="section white ds-finance-integrated" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
            <div>
              <span className="kicker">{journey?.badge || "Funding journey"}</span>
              <h2>{sharedJourney.title}</h2>
            </div>
            <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>{sharedJourney.description}</p>
          </div>
          <div className="card-grid four" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {sharedJourney.cards.map((card, idx) => (
              <article className="card" key={idx} style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.5rem", textAlign: "left" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 8px", color: "var(--b)" }}>{card.title}</h3>
                <p style={{ fontSize: "14px", color: "var(--muted)", margin: 0, lineHeight: 1.4 }}>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MYTHS */}
      <section className="section white ds-finance-integrated" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
            <div>
              <span className="kicker">{myths?.badge || "Common myths"}</span>
              <h2>{sharedMyths.title}</h2>
            </div>
            <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>{sharedMyths.description}</p>
          </div>
          <div className="finance-comparison-table" style={{ width: "100%", overflowX: "auto", border: "1px solid var(--border)", borderRadius: "12px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "15px" }}>
              <thead>
                <tr style={{ background: "var(--soft)", borderBottom: "1px solid var(--border)" }}>
                  <th style={{ padding: "16px", width: "30%" }}>{myths?.headers?.myth_header || "Myth"}</th>
                  <th style={{ padding: "16px", width: "50%" }}>{myths?.headers?.reality_header || "Reality"}</th>
                  <th style={{ padding: "16px", width: "20%" }}>{myths?.headers?.best_header || "Best next step"}</th>
                </tr>
              </thead>
              <tbody>
                {sharedMyths.rows.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: idx < sharedMyths.rows.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <td style={{ padding: "16px", fontWeight: 700, color: "#d93838" }}>{row.myth}</td>
                    <td style={{ padding: "16px", lineHeight: 1.4 }}>{row.reality}</td>
                    <td style={{ padding: "16px", fontWeight: 700, color: "var(--b)" }}>{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ADVISER CTA PANEL */}
          <div className="cta-panel" style={{ marginTop: '28PX' }} >
            <div>
              <h2>
                {certainty?.title || "Need certainty before you apply?"}
              </h2>
              <p>
                {certainty?.description || "YStudy can check your status, previous study and course type before you submit your application."}
              </p>
            </div>
            <div className="btnrow" >
              <a className="btn btn-blue" href="/tools/eligibility-checker">
                Check eligibility
              </a>
              <a className="btn btn-orange" href="/apply">
                Apply with YStudy
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="footer-cta" >
        <div className="container" >
          <span className="kicker">{stayInTouch?.badge || "Stay in touch"}</span>
          <h2 >
            {stayInTouch?.title || "Your next step should feel organised."}
          </h2>
          <p>
            {stayInTouch?.description || "Create a free account to save progress, find your best degree and track applications."}
          </p>
          <div className="btnrow">
            <a className="btn btn-white" href="/dashboard">
              Create account
            </a>
            <a className="btn btn-orange" href="/apply">
              Apply now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default FundingBottomSections;
