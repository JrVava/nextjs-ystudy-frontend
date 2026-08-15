import React from "react";
import Banner from "@/components/ui/Banner";
import FundingBottomSections from "@/components/widgets/FundingBottomSections";
import FundingTabs from "@/components/widgets/FundingTabs";
import { ComparisonTable } from "@/components/sections";
import FinanceStepper from "@/components/widgets/FinanceStepper";

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

interface GrantsProps {
  data?: any;
  faqs?: any[] | null;
}

export function Grants({ data, faqs }: GrantsProps) {
  const s2 = data?.section_2; // Funding cards
  const s3 = data?.section_3; // Calculator estimate
  const s4 = data?.section_4; // Stepper
  const s5 = data?.section_5; // Comparison table
  const s6 = data?.section_6; // Money & student life promo band
  const s7 = data?.section_7; // YStudy money offers
  const s8 = data?.section_8; // snapshot
  const s9 = data?.section_9; // journey
  const s10 = data?.section_10; // myths
  const s11 = data?.section_11; // certainty
  const s12 = data?.section_12; // stay in touch
  const s13 = data?.section_13; // Resource grid
  const s14 = data?.section_14; // Route choice CTA panel

  // Map stepper array from backend format to stepper component format
  const mappedSteps = s4?.steppers?.map((st: any) => {
    const factsList = Array.isArray(st.facts)
      ? st.facts.map((f: any) => {
        if (Array.isArray(f)) {
          return { title: f[0], description: f[1] };
        }
        return { title: f.title || "", description: f.description || "" };
      })
      : [];

    if (st.doit) {
      factsList.push({ title: "Do this:", description: st.doit });
    }

    return {
      stepNumber: st.stepNumber,
      stepperName: st.stepperName,
      tag: st.tag,
      title: st.title,
      description: st.description,
      facts: factsList
    };
  });

  return (
    <div className="qualification-page funding-sub-page">
      {/* PAGE TABS */}
      <FundingTabs />

      {/* HERO BANNER */}
      <Banner
        slug="grants-support"
        fallbackBadgeText="★ Grants & bursaries · 2026/27"
        fallbackTitle="Money you don't pay back."
        fallbackDescription="On top of your loans — for childcare, learning costs, dependants and disability. Each is claimed on your SFE application, not automatic."
        fallbackBgImage="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: "list-items",
          title: "You don't repay these",
          items: [
            { value: "£199.62", description: "Childcare /wk" },
            { value: "£2,024", description: "Learning /yr" },
            { value: "£3,545", description: "Adult dependant" },
            { value: "£27k+", description: "DSA support" }
          ]
        }}
      >
        <div className="btnrow" style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          <a className="btn btn-white" href="/tools/eligibility-checker">
            See what you qualify for →
          </a>
          <a className="btn btn-white" href="/tools/eligibility-checker">
            Check eligibility
          </a>
        </div>
      </Banner>

      {/* FUNDING CARDS */}
      {s2?.status !== false && (
        <section className="section white ds-finance-integrated">
          <div className="container" style={{ textAlign: "left" }}>
            <div className="title-row" style={{ marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s2?.badge || "Funding cards"}</span>
                <h2>{s2?.title || "Student finance and support."}</h2>
              </div>
              <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>
                {s2?.description || "Core funding routes explained visually: living costs, tuition, grants and extra support."}
              </p>
            </div>
            <div className="finance-visual-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
              {(s2?.cards || [
                { title: "Maintenance Loan", value: "Up to £14k+", description: "Living-cost support paid to you if eligible.", link: "/funding/maintenance-loan", linkName: "View guide →", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=85" },
                { title: "Tuition Fee Loan", value: "£9k+", description: "Course-fee support usually paid to provider.", link: "/funding/tuition-fee-loan", linkName: "Read guide →", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=85" },
                { title: "Grants & bursaries", value: "Check", description: "Extra help may be available depending on circumstances.", link: "/funding/maintenance-loan#grants", linkName: "Check support →", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=85" },
                { title: "Parents / DSA", value: "Extra help", description: "Support for parents, disabilities or specific needs.", link: "/tools/eligibility-checker", linkName: "Ask adviser →", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=85" }
              ]).map((card: any, idx: number) => (
                <article className="finance-visual-card" key={idx} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  <img src={card.fullImageUrl || "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=85"} alt="" style={{ height: "140px", width: "100%", objectFit: "cover" }} />
                  <div className="finance-visual-card-body" style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", textAlign: "left" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 4px" }}>{card.title}</h3>
                    <strong style={{ fontSize: "15px", color: "var(--o)", display: "block", marginBottom: "8px" }}>{card.value}</strong>
                    <p style={{ fontSize: "13.5px", color: "var(--muted)", margin: "0 0 16px", flex: 1 }}>{card.description}</p>
                    <a href={card.link || "/funding"} style={{ fontWeight: 700, color: "var(--b)", textDecoration: "none", fontSize: "13.5px" }}>
                      {card.linkName || "View guide →"}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CALCULATOR ESTIMATE BOX */}
      {s3?.status !== false && (
        <section className="section white ds-finance-integrated" id="finance-estimate">
          <div className="container">
            <div className="ds-result" >
              <div>
                <span className="kicker">{s3?.badge || "Calculator result"}</span>
                <h2>{s3?.title || "Your student finance estimate."}</h2>
                <p >
                  {s3?.description || "This is an indicative result. Final entitlement depends on SFE assessment, course intensity, household income, location and study mode."}
                </p>
                <div className="btnrow" >
                  <a className="btn btn-orange" href="/tools/finance-calculator">Calculate properly</a>
                  <a className="btn btn-white" href="/tools/eligibility-checker">Check eligibility</a>
                </div>
              </div>
              <div>
                <div className="ds-total" >
                  <span >Total possible support</span>
                  <strong >{s3?.total_support || "£23,925"}</strong>
                </div>
                <div className="ds-mini-results" >
                  {(s3?.items || [
                    { title: "Tuition Fee Loan", description: "£9,790" },
                    { title: "Maintenance Loan", description: "£14,135" },
                    { title: "Extra grants", description: "Check" }
                  ]).map((item: any, idx: number) => (
                    <div className="ds-mini" key={idx} >
                      <span>{item.title}</span>
                      <strong>{item.description || item.value || "Check"}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* STEPPER JOURNEY */}
      {s4?.status !== false && mappedSteps && (
        <section className="section white ds-finance-integrated">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s4?.badge || "Finance journey"}</span>
                <h2>{s4?.title || "From application to repayment."}</h2>
              </div>
              <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>
                {s4?.description || "The Tuition Fee Loan moves through stages."}
              </p>
            </div>
            <FinanceStepper steppers={mappedSteps} />
          </div>
        </section>
      )}

      {/* COMPARISON TABLE */}
      {s5?.status !== false && (
        <section className="section white ds-finance-integrated">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s5?.badge || "Comparison table"}</span>
                <h2>{s5?.title || "Check funding routes."}</h2>
              </div>
              <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>
                {s5?.description || "Clear decision signals for course comparison, university comparison and funding guide pages."}
              </p>
            </div>
            <ComparisonTable
              headers={Object.values(s5?.headers || {
                route: "Route",
                funding: "Funding type",
                maintenance: "Maintenance Loan",
                best: "Best for",
                verdict: "Verdict"
              })}
              rows={s5?.rows || []}
              renderCell={renderFundingCell}
            />
          </div>
        </section>
      )}

      {/* MONEY & STUDENT LIFE PROMO BAND */}
      {s6?.status !== false && (
        <section className="section tight">
          <div className="container">
            <section className="promo-band purple">
              <div className="promo-inner" >
                <div className="promo-figure" >
                  <img alt="Reviewing student finance on a laptop" src={s6?.fullImageUrl || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1500&q=85"} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div className="promo-copy" >
                  <span className="promo-kicker" >
                    {s6?.badge || "Money & student life"}
                  </span>
                  <h2 className="promo-title" >
                    {s6?.title || "Cost of living support while you study"}
                  </h2>
                  <p className="promo-text" >
                    {s6?.description || "From rent and travel to food, childcare and study materials, compare the support available and understand what could affect your student finance before you apply."}
                  </p>
                  <div>
                    <a className="btn promo-cta" href="/tools/finance-calculator">
                      Check funding support
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      )}

      {/* YSTUDY MONEY OFFERS */}
      {s7?.status !== false && (
        <section className="section ds-finance-integrated">
          <div className="container" style={{ textAlign: "left" }}>
            <div className="title-row" style={{ marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s7?.badge || "YStudy Money"}</span>
                <h2>{s7?.title || "Student money decisions after finance."}</h2>
              </div>
              <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>
                {s7?.description || "MoneySavingExpert-style cards for bank accounts, broadband, phone plans and student essentials."}
              </p>
            </div>
            <div className="student-money-offers" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              {(s7?.cards || [
                { badge: "Editor's choice", title: "Student bank account", subTitle: "Welcome reward", priceOrSpeed: "£100", description: "Overdraft up to £1,500. Check eligibility and terms before applying." },
                { badge: "Best value", title: "Student mobile SIM", subTitle: "Flexible monthly plan", priceOrSpeed: "100GB", description: "Useful for students who do not want a long contract." },
                { badge: "Fast setup", title: "Student broadband", subTitle: "Shared house option", priceOrSpeed: "150Mbps", description: "Check installation, cancellation and minimum term." }
              ]).map((card: any, idx: number) => (
                <article className="money-offer-card" key={idx} style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.75rem", display: "flex", flexDirection: "column", position: "relative" }}>
                  <span className="label" style={{ display: "inline-block", background: "var(--o)", color: "#fff", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", width: "fit-content", marginBottom: "12px" }}>
                    {card.badge}
                  </span>
                  <h3 style={{ fontSize: "19px", fontWeight: 800, margin: "0 0 4px" }}>{card.title}</h3>
                  <p style={{ fontSize: "13px", color: "var(--muted)", margin: "0 0 14px" }}>{card.subTitle}</p>
                  <strong style={{ fontSize: "28px", fontWeight: 900, color: "var(--b)", display: "block", marginBottom: "8px" }}>{card.priceOrSpeed}</strong>
                  <p style={{ fontSize: "13.5px", color: "var(--muted)", margin: 0, lineHeight: 1.45 }}>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GRANTS & SUPPORT RESOURCE GRID */}
      {s13?.status !== false && (
        <section className="section" style={{ textAlign: "left" }}>
          <div className="container">
            <div className="section-head" style={{ marginBottom: "2rem" }}>
              <span className="eyebrow" style={{ display: "inline-block", background: "var(--soft)", padding: "4px 10px", borderRadius: "4px", fontSize: "12px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", marginBottom: "8px" }}>
                {s13?.badge || "YStudy resource"}
              </span>
              <h1 style={{ fontSize: "32px", fontWeight: 900 }}>{s13?.title || "Grants & Support"}</h1>
              <p style={{ color: "var(--muted)", fontSize: "16px", marginTop: "4px" }}>
                {s13?.description || "Understand extra student support such as childcare, parents’ support and DSA."}
              </p>
            </div>
            <div className="card-grid three" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              {(s13?.cards || [
                { title: "Childcare Grant", description: "Support may be available for registered childcare.", link: "/funding/childcare-grant" },
                { title: "Parents’ Learning Allowance", description: "Extra support for students with children.", link: "/funding/maintenance-loan#grants" },
                { title: "Disabled Students’ Allowance", description: "Support for disability, health conditions or learning differences.", link: "/funding/disabled-students-allowance" }
              ]).map((card: any, idx: number) => {
                let hrefLink = card.link;
                if (!hrefLink) {
                  if (card.title.includes("Childcare")) hrefLink = "/funding/childcare-grant";
                  else if (card.title.includes("Parents")) hrefLink = "/funding/maintenance-loan#grants";
                  else if (card.title.includes("Disabled")) hrefLink = "/funding/disabled-students-allowance";
                  else hrefLink = "/funding";
                }

                return (
                  <article className="card" key={idx} style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.5rem" }}>
                    <h3 style={{ fontSize: "19px", fontWeight: 800, margin: "0 0 8px" }}>{card.title}</h3>
                    <p style={{ fontSize: "14px", color: "var(--muted)", margin: "0 0 16px" }}>{card.description}</p>
                    <a className="link" href={hrefLink} style={{ color: "var(--b)", fontWeight: 700, textDecoration: "none" }}>
                      Open →
                    </a>
                  </article>
                );
              })}
            </div>

            {/* ROUTE CHOICE CTA PANEL */}
            {s14?.status !== false && (
              <div className="cta-panel" style={{ marginTop: "40px", background: "var(--soft)", border: "1px solid var(--border)", padding: "2.5rem", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 900 }}>{s14?.title || "Need help choosing the right route?"}</h2>
                  <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: "15px" }}>
                    {s14?.description || "Use Degree Match Finder or speak to a YStudy adviser before applying."}
                  </p>
                </div>
                <div className="btnrow" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <a className="btn btn-blue" href="/tools/degree-match">
                    Find my degree
                  </a>
                  <a className="btn btn-orange" href="/apply">
                    Apply with YStudy
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FAQ SECTION */}
      {((faqs && faqs.length > 0) || data?.faqs) ? (
        <section className="section white">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">FAQ</span>
                <h2>Common grants & support questions.</h2>
              </div>
            </div>
            <div className="faq-list" style={{ maxWidth: "880px", display: "grid", gap: "14px", textAlign: "left" }}>
              {(faqs && faqs.length > 0 ? faqs : data?.faqs || []).map((faq: any, idx: number) => (
                <details key={faq._id || idx} className="info-card" style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.25rem", cursor: "pointer" }}>
                  <summary style={{ fontWeight: 950, fontSize: "17px", color: "#102033" }}>{faq.question || faq.q}</summary>
                  <p style={{ marginTop: "12px", color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.5 }}>
                    {faq.answer || faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="section white">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">FAQ</span>
                <h2>Common grants & support questions.</h2>
              </div>
            </div>
            <div className="faq-list" style={{ maxWidth: "880px", display: "grid", gap: "14px", textAlign: "left" }}>
              <details className="info-card" style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.25rem", cursor: "pointer" }}>
                <summary style={{ fontWeight: 950, fontSize: "17px", color: "#102033" }}>How do I claim these grants?</summary>
                <p style={{ marginTop: "12px", color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.5 }}>
                  You apply for them online through SFE at the same time as you apply for your main tuition and maintenance loans.
                </p>
              </details>
              <details className="info-card" style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.25rem", cursor: "pointer" }}>
                <summary style={{ fontWeight: 950, fontSize: "17px", color: "#102033" }}>Are they based on household income?</summary>
                <p style={{ marginTop: "12px", color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.5 }}>
                  Yes, most dependants' grants are assessed based on your partner's or household income.
                </p>
              </details>
            </div>
          </div>
        </section>
      )}

      {/* SHARED BOTTOM SECTIONS */}
      <FundingBottomSections
        snapshot={s8}
        journey={s9}
        myths={s10}
        certainty={s11}
        stayInTouch={s12}
      />
    </div>
  );
}

export default Grants;
