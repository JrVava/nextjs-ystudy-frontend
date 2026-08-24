import React from "react";
import { getCMSPageContent } from "@/services/cms.service";
import FinanceStepper from "@/components/widgets/FinanceStepper";
import { ComparisonTable, FooterCta, CtaPanel } from "@/components/sections";
import { Banner } from "@/components/ui/Banner";

const renderFundingCell = (val: any, colKey: string) => {
  if (colKey === "maintainance" || colKey === "maintenance") {
    return <span style={{ color: "var(--o)", fontWeight: 700 }}>{val}</span>;
  }
  if (colKey === "verdict") {
    return <span style={{ color: "var(--b)", fontWeight: 700 }}>{val}</span>;
  }
  if (colKey === "route" || colKey === "option" || colKey === "degree") {
    return <span style={{ fontWeight: 700 }}>{val}</span>;
  }
  return val;
};

export default async function Money() {
  const data = await getCMSPageContent("student-money-hub");

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Money Hub Not Found</h2>
        <p>We couldn't retrieve the money hub information at this time.</p>
        <a href="/" className="btn btn-blue" style={{ marginTop: "1rem" }}>Go to Home</a>
      </div>
    );
  }

  const hero = data.hero || {};
  const s2 = data.section_2 || {};
  const s3 = data.section_3 || {};
  const s4 = data.section_4 || {};
  const s5 = data.section_5 || {};
  const s6 = data.section_6 || {};
  const s7 = data.section_7 || {};
  const s8 = data.section_8 || {};
  const s9 = data.section_9 || {};
  const s10 = data.section_10 || {};

  return (
    <div className="qualification-page money-hub-page">
      {/* SECTION 1: HERO */}
      <Banner
        slug="student-money-hub"
        fallbackBadgeText={hero.kicker || "Student Money Hub"}
        fallbackTitle={hero.title || "Student money hub."}
        fallbackDescription={hero.description || "Understand funding, budgeting and student money decisions before you apply."}
        fallbackRightCard={{
          layoutType: "guide-hero",
          title: hero.snapshotTitle || "Snapshot",
          items: hero.snapshotItems || [
            { title: "£14k+", subtitle: "support" },
            { title: "£9k+", subtitle: "tuition" },
            { title: "SFE", subtitle: "route" },
            { title: "Free", subtitle: "guidance" }
          ]
        }}
        isGuideHero={true}
      >
        <div className="btnrow">
          <a className="btn btn-orange" href="/tools/finance-calculator">Open calculator</a>
          <a className="btn btn-white" href="/tools/eligibility-checker">Check eligibility</a>
        </div>
        <div className="hero-pills">
          <span>Plain English</span>
          <span>Adult learner route</span>
          <span>Funding-focused</span>
        </div>
      </Banner>

      {/* SECTION 2: FUNDING CARDS */}
      {s2.status !== false && (
        <section className="section white ds-finance-integrated">
          <div className="container">
            <div className="title-row">
              <div>
                <span className="kicker">{s2.badge || "Funding cards"}</span>
                <h2>{s2.title || "Student finance and support."}</h2>
              </div>
              <p>{s2.description || "Core funding routes explained visually: living costs, tuition, grants and extra support."}</p>
            </div>
            <div className="finance-visual-grid">
              {(s2.cards || []).map((card: any, idx: number) => (
                <article className="finance-visual-card" key={idx}>
                  <img
                    src={card.fullImageUrl || "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=85"}
                    alt={card.title}
                  />
                  <div className="finance-visual-card-body">
                    <h3>{card.title}</h3>
                    <strong>{card.subTitle}</strong>
                    <p>{card.description}</p>
                    {card.link && (
                      <a href={card.title === "Grants & bursaries" ? "/funding/maintenance-loan#grants" : card.link}>
                        {card.title === "Grants & bursaries"
                          ? "Check support →"
                          : card.title === "Parents / DSA"
                            ? "Ask adviser →"
                            : card.title === "Tuition Fee Loan"
                              ? "Read guide →"
                              : "View guide →"}
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: CALCULATOR ESTIMATE */}
      {s3.status !== false && (
        <section className="section white ds-finance-integrated" id="finance-estimate">
          <div className="container">
            <div className="ds-result">
              <div>
                <span className="kicker">{s3.badge || "Calculator result"}</span>
                <h2>{s3.title || "Your student finance estimate."}</h2>
                <p>{s3.description || "This is an indicative result. Final entitlement depends on SFE assessment, course intensity, household income, location and study mode."}</p>
                <div className="btnrow">
                  <a className="btn btn-orange" href="/tools/finance-calculator">Calculate properly</a>
                  <a className="btn btn-white" href="/tools/eligibility-checker">Check eligibility</a>
                </div>
              </div>
              <div>
                <div className="ds-total">
                  <span>Total possible support</span>
                  <strong>{s3.cardDescription || "£23,925"}</strong>
                </div>
                <div className="ds-mini-results" style={{ marginTop: "14px" }}>
                  {(s3.cards || []).map((card: any, idx: number) => (
                    <div className="ds-mini" key={idx}>
                      <span>{card.title}</span>
                      <strong>{card.description}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: STEPPER */}
      {s4.status !== false && (
        <section className="section white ds-finance-integrated">
          <div className="container">
            <FinanceStepper steppers={s4.steppers} />
          </div>
        </section>
      )}

      {/* SECTION 5: COMPARISON TABLE */}
      {s5.status !== false && (
        <section className="section white ds-finance-integrated">
          <div className="container">
            <div className="title-row">
              <div>
                <span className="kicker">{s5.badge || "Comparison table"}</span>
                <h2>{s5.title || "Check funding routes."}</h2>
              </div>
              <p>{s5.description || "Clear decision signals for course comparison, university comparison and funding guide pages."}</p>
            </div>
            <ComparisonTable
              className="finance-comparison-table"
              headers={[
                s5.headers?.route_header || "Route",
                s5.headers?.funding_header || "Funding type",
                s5.headers?.maintainance_header || "Maintenance Loan",
                s5.headers?.best_header || "Best for",
                s5.headers?.verdict_header || "Verdict"
              ]}
              rows={s5.rows || []}
              renderCell={renderFundingCell}
            />
          </div>
        </section>
      )}

      {/* SECTION 6: PROMO BAND */}
      {s6 && s6.title && (
        <section className="section tight">
          <section className="promo-band purple">
            <div className="promo-inner">
              <div className="promo-figure">
                <img
                  alt={s6.title}
                  src={s6.fullImageUrl || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1500&q=85"}
                />
              </div>
              <div className="promo-copy">
                <span className="promo-kicker">{s6.subTitle}</span>
                <h2 className="promo-title">{s6.title}</h2>
                <p className="promo-text">{s6.description}</p>
                <a className="btn promo-cta" href={s6.link || "/tools/finance-calculator"}>
                  Check funding support
                </a>
              </div>
            </div>
          </section>
        </section>
      )}

      {/* SECTION 7: YSTUDY MONEY */}
      {s7.status !== false && (
        <section className="section ds-finance-integrated">
          <div className="container">
            <div className="title-row">
              <div>
                <span className="kicker">{s7.badge || "YStudy Money"}</span>
                <h2>{s7.title || "Student money decisions after finance."}</h2>
              </div>
              <p>{s7.description || "MoneySavingExpert-style cards for bank accounts, broadband, phone plans and student essentials."}</p>
            </div>
            <div className="student-money-offers">
              {(s7.cards || []).map((card: any, idx: number) => (
                <article className="money-offer-card" key={idx}>
                  <span className="label">{card.badge}</span>
                  <h3>{card.title}</h3>
                  <p>{card.subTitle}</p>
                  <strong>{card.priceOrSpeed}</strong>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER CTA */}
      <FooterCta
        status={s8.status !== false}
        badge={s8.badge}
        title={s8.title}
        description={s8.description}
      />

      {/* STUDENT MONEY HUB BOTTOM SECTION */}
      {s9.status !== false && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">{s9.badge || "YStudy resource"}</span>
              <h1>{s9.title || "Student Money Hub"}</h1>
              <p>{s9.description || "Budgeting, student discounts and money guidance for adult learners."}</p>
            </div>
            <div className="card-grid three">
              {(s9.cards || []).map((card: any, idx: number) => {
                let href = "/";
                if (card.title === "Budget planning") href = "/funding";
                else if (card.title === "Student discounts") href = "/business";
                else if (card.title === "Repayments") href = "/tools/loan-repayment-calculator";
                if (card.link) href = card.link;
                return (
                  <article className="card" key={idx}>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <a className="link" href={href}>Open →</a>
                  </article>
                );
              })}
            </div>

            {s10.status !== false && (
              <CtaPanel
                title={s10.title || "Need help choosing the right route?"}
                description={s10.description || "Use Degree Match Finder or speak to a YStudy adviser before applying."}
                primaryBtnText="Find my degree"
                primaryBtnHref="/tools/degree-match"
                secondaryBtnText="Apply with YStudy"
                secondaryBtnHref="/apply"
                style={{ marginTop: "28px" }}
              />
            )}
          </div>
        </section>
      )}
    </div>
  );
}
