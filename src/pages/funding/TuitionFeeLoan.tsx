import React from "react";
import Banner from "@/components/ui/Banner";
import FundingTabs from "@/components/widgets/FundingTabs";
import FinanceStepper from "@/components/widgets/FinanceStepper";
import FundingTracker from "@/components/widgets/FundingTracker";
import FundingBottomSections from "@/components/widgets/FundingBottomSections";
import { getCMSPageContent } from "@/services/cms.service";

export async function TuitionFeeLoan() {
  const data = await getCMSPageContent("tuition-fee-loan");

  const s2 = data?.section_2; // Stepper
  const s3 = data?.section_3; // Estimate
  const s4 = data?.section_4; // Notice rule
  const s5 = data?.section_5; // Overview
  const s6 = data?.section_6; // What is maintenance loan
  const s7 = data?.section_7; // Maximum amounts overview
  const s8 = data?.section_8; // Which qualifications
  const s9 = data?.section_9; // Household income affects
  const s10 = data?.section_10; // Comparison table
  const s11 = data?.section_11; // Funding cards list
  const s12 = data?.section_12; // Process steps
  const s13 = data?.section_13; // Calculator estimate second box
  const s14 = data?.section_14; // Secondary warning mode
  const s15 = data?.section_15; // Comparison table check routes
  const s16 = data?.section_16; // Tracker title
  const s17 = data?.section_17;
  const s18 = data?.section_18;
  const s19 = data?.section_19;
  const s20 = data?.section_20;
  const s21 = data?.section_21;
  const s22 = data?.section_22;
  const s23 = data?.section_23;
  const s24 = data?.section_24;

  // Map stepper array from backend format to stepper component format
  const mappedSteps = s2?.steppers?.map((st: any) => {
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
        slug="tuition-fee-loan"
        fallbackBadgeText="★ Tuition Fee Loan · 2026/27"
        fallbackTitle="Can your course fees be covered?"
        fallbackDescription="Up to £9,790 a year paid directly to your university. You never handle the money — no upfront cost."
        fallbackBgImage="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: "list-items",
          title: "Maximum / year",
          mainValue: "£9,790",
          description: "Paid direct to your university",
          items: []
        }}
      >
        <div className="btnrow" style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          <a className="btn btn-orange" href="/tools/eligibility-checker">
            Check eligibility →
          </a>
          <a className="btn btn-white" href="#how">
            How it works
          </a>
        </div>
      </Banner>

      {/* FINANCE JOURNEY STEPPER */}
      {s2?.status !== false && (
        <section className="section" id="how">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker" style={{ color: "#ff8b3d" }}>{s2?.badge || "Finance journey"}</span>
                <h2>{s2?.title || "From application to repayment."}</h2>
              </div>
              <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>
                {s2?.description || "The Tuition Fee Loan moves through eight stages — from confirming your status to the day it's written off. Click any stage to see exactly what happens, what you need to do, and how long it takes."}
              </p>
            </div>
            <FinanceStepper steppers={mappedSteps} />
          </div>
        </section>
      )}

      {/* CALCULATOR ESTIMATE */}
      {s3?.status !== false && (
        <section className="section white" id="calculator">
          <div className="container">
            <div className="ds-result">
              <div>
                <span className="kicker">{s3?.badge || "Calculator result"}</span>
                <h2>{s3?.title || "Your student finance estimate."}</h2>
                <p>
                  {s3?.description || "This is an indicative result. Final entitlement depends on SFE assessment, course intensity, household income and study location."}
                </p>
                <div className="btnrow">
                  <a className="btn btn-orange" href="/apply">
                    Apply with support
                  </a>
                  <a className="btn btn-white" href="/tools/eligibility-checker">
                    Check eligibility
                  </a>
                </div>
              </div>
              <div className="ds-result-content">
                <div className="ds-total">
                  <span>
                    {s3?.cardTitle || "Total possible support"}
                  </span>
                  <strong className="ds-result-total">
                    {s3?.cardDescription || "£23,925"}
                  </strong>
                </div>
                <div className="ds-mini-results">
                  {(s3?.cards || [
                    { title: "Tuition Fee Loan", description: "£9,790" },
                    { title: "Maintenance Loan", description: "£14,135" },
                    { title: "Extra grants", description: "Check" }
                  ]).map((card: any, idx: number) => (
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

      {/* NOTICE */}
      {s4?.status !== false && (
        <section className="section white">
          <div className="container">
            <div className="notice" style={{ background: "#fff8f2", borderLeft: "4px solid var(--o)", padding: "2rem", borderRadius: "0 12px 12px 0", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
              <div>
                <span className="kicker" style={{ color: "var(--o)", textTransform: "uppercase", fontWeight: 700, fontSize: "12px" }}>
                  {s4?.badge || "Important funding rule"}
                </span>
                <h2 style={{ fontSize: "32px", fontWeight: 900, margin: "8px 0" }}>
                  {s4?.title || "Maintenance Loan is not usually available for online/distance learning."}
                </h2>
                <p style={{ color: "var(--muted)", margin: 0 }}>
                  {s4?.description || "Weekend-only routes can also be risky. Ask an adviser before choosing a course."}
                </p>
              </div>
              <a className="btn btn-orange" href="/tools/eligibility-checker">Check now</a>
            </div>
          </div>
        </section>
      )}

      {/* OVERVIEW */}
      {s5?.status !== false && (
        <section className="section">
          <div className="container">
            <div className="info-card" style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "2rem", textAlign: "left" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 900, marginBottom: "12px" }}>
                {s5?.title || "Overview"}
              </h2>
              <p style={{ color: "var(--muted)", margin: 0, fontSize: "15px", lineHeight: 1.5 }}>
                {s5?.description || "Up to £14,135 a year paid directly into your bank account. Here's exactly how much you could get, how it's calculated, and when it arrives."}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* WHAT IS MAINTENANCE LOAN */}
      {s6?.status !== false && (
        <section className="section white">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s6?.badge || "Rich content"}</span>
                <h2>{s6?.title || "What is the maintenance loan?"}</h2>
              </div>
              <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>
                {s6?.description || "Unlike the tuition fee loan — which goes straight to your university — the maintenance loan is paid into your bank account to help you cover living costs while studying. You can spend it on whatever you need: rent, bills, food, travel, childcare, or course materials."}
              </p>
            </div>
            <div className="card-grid">
              {(s6?.cards || [
                { icon: "✓", title: "Key fact", description: "The maintenance loan is income-assessed. This means the amount you receive depends on your household income — not just your own. Lower household income = higher maintenance support." }
              ]).map((card: any, idx: number) => (
                <article className="info-card" key={idx}>
                  <div className="icon">{card.icon}</div>
                  <h3> {card.title}</h3>
                  <p>
                    {card.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2026/27 MAXIMUM AMOUNTS */}
      {s7?.status !== false && (
        <section className="section">
          <div className="container" style={{ textAlign: "left" }}>
            <div className="info-card" style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "2rem" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 900, marginBottom: "12px" }}>
                {s7?.title || "2026/27 maximum amounts"}
              </h2>
              <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.5, marginBottom: "16px" }}>
                {s7?.description1 || "The maximums below apply to full-time students. Part-time students receive reduced amounts. These are the highest possible figures — most students receive less based on their household income."}
              </p>
              <p style={{ fontSize: "13px", color: "var(--muted)", fontWeight: 700, margin: 0 }}>
                {s7?.description2 || "2026/27 SFE published maximums. Actual entitlement varies by household income. Verify at gov.uk/student-finance."}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* WHICH QUALIFICATIONS */}
      {s8?.status !== false && (
        <section className="section white">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s8?.badge || "Rich content"}</span>
                <h2>{s8?.title || "Which qualifications does the maintenance loan cover?"}</h2>
              </div>
              <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>
                {s8?.description || "The maintenance loan covers full-time undergraduate study at designated UK providers. Coverage depends on qualification level and study intensity — not subject."}
              </p>
            </div>
            <div className="card-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", textAlign: "left" }}>
              {(s8?.cards || [
                { title: "✓ Eligible — full maintenance loan available", description: "Full-time Bachelor's degrees (BA, BSc, BEng) at designated UK providers" },
                { title: "✗ Not eligible for the maintenance loan", description: "Distance-learning / fully-online undergraduate courses, except DSA cases" }
              ]).map((card: any, idx: number) => (
                <article className="info-card" key={idx} style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.5rem" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 800, color: card.title.startsWith("✓") ? "#10b981" : "#ef4444", marginBottom: "12px" }}>
                    {card.title}
                  </h3>
                  <p style={{ color: "var(--muted)", fontSize: "14px", margin: 0 }}>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HOUSEHOLD INCOME AFFECTS LOAN */}
      {s9?.status !== false && (
        <section className="section">
          <div className="container" style={{ textAlign: "left" }}>
            <div className="info-card" style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "2rem" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 900, marginBottom: "12px" }}>
                {s9?.title || "How household income affects your loan"}
              </h2>
              <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.5, marginBottom: "16px" }}>
                {s9?.description1 || "SFE uses a sliding scale. Here's how household income affects the outside-London away-from-home rate."}
              </p>
              <p style={{ fontSize: "13px", color: "var(--muted)", fontWeight: 700, margin: 0 }}>
                {s9?.description2 || "Estimates only. Actual figures depend on SFE's current assessment."}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CLEAR DECISION SIGNALS COMPARISON TABLE */}
      {s10?.status !== false && (
        <section className="section">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s10?.badge || "Comparison table"}</span>
                <h2>{s10?.title || "Clear decision signals."}</h2>
              </div>
              <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>{s10?.description || "Use for course comparison, funding routes and university choices."}</p>
            </div>
            <div className="comp-table" style={{ width: "100%", overflowX: "auto", border: "1px solid var(--border)", borderRadius: "12px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "15px" }}>
                <thead>
                  <tr style={{ background: "var(--soft)", borderBottom: "1px solid var(--border)" }}>
                    <th style={{ padding: "16px" }}>{s10?.headers?.option_header || "Option"}</th>
                    <th style={{ padding: "16px" }}>{s10?.headers?.best_header || "Best for"}</th>
                    <th style={{ padding: "16px" }}>{s10?.headers?.funding_header || "Funding"}</th>
                    <th style={{ padding: "16px" }}>{s10?.headers?.flexible_header || "Flexible study"}</th>
                    <th style={{ padding: "16px" }}>{s10?.headers?.salary_header || "Salary potential"}</th>
                    <th style={{ padding: "16px" }}>{s10?.headers?.verdict_header || "Verdict"}</th>
                  </tr>
                </thead>
                <tbody>
                  {(s10?.rows || [
                    { option: "Business Management", best: "Career changers", funding: "✓", flexible: "✓", salary: "Medium–High", verdict: "Best overall" },
                    { option: "Cybersecurity", best: "Digital careers", funding: "✓", flexible: "✓", salary: "High", verdict: "Highest salary" },
                    { option: "Psychology", best: "People-focused careers", funding: "✓", flexible: "×", salary: "Medium", verdict: "Popular route" },
                    { option: "Online MSc", best: "Working adults", funding: "✓", flexible: "✓", salary: "Medium–High", verdict: "Most flexible" }
                  ]).map((row: any, idx: number) => (
                    <tr key={idx} style={{ borderBottom: idx < (s10?.rows || []).length - 1 ? "1px solid var(--border)" : "none" }}>
                      <td style={{ padding: "16px", fontWeight: 700 }}>{row.option}</td>
                      <td style={{ padding: "16px" }}>{row.best}</td>
                      <td style={{ padding: "16px" }}>{row.funding}</td>
                      <td style={{ padding: "16px" }}>{row.flexible}</td>
                      <td style={{ padding: "16px" }}>{row.salary}</td>
                      <td style={{ padding: "16px", fontWeight: 700, color: "var(--b)" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ADDED FUNDING CARDS */}
      {s11?.status !== false && (
        <section className="section white ds-added-funding">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s11?.badge || "Funding cards"}</span>
                <h2>{s11?.title || "Student finance and support cards."}</h2>
              </div>
              <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>{s11?.description || "Use on Funding Hub, Maintenance Loan, grants, student finance guides and calculator results."}</p>
            </div>
            <div className="funding-card-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
              {(s11?.cards || [
                { title: "Maintenance Loan", subTitle: "Up to £14k+", description: "Help with living costs.", link: "/funding/maintenance-loan", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=85", linkBtnName: "View guide →" },
                { title: "Childcare Grant", subTitle: "Extra support", description: "Support for student parents.", link: "/tools/eligibility-checker", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85", linkBtnName: "Check support →" },
                { title: "DSA", subTitle: "Study support", description: "Disability-related support.", link: "/tools/eligibility-checker", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=85", linkBtnName: "Learn more →" },
                { title: "Parents' Allowance", subTitle: "Extra help", description: "Help for student parents.", link: "/tools/eligibility-checker", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85", linkBtnName: "View guide →" }
              ]).map((card: any, idx: number) => (
                <article className="funding-visual-card" key={idx} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden", display: "flex", flexDirection: "column", textAlign: "left" }}>
                  <img src={card.fullImageUrl || "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=85"} alt={card.title} style={{ height: "160px", width: "100%", objectFit: "cover" }} />
                  <div className="funding-visual-body" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 4px" }}>{card.title}</h3>
                    <strong style={{ fontSize: "20px", color: "var(--o)", margin: "4px 0 8px" }}>{card.subTitle}</strong>
                    <p style={{ fontSize: "13.5px", color: "var(--muted)", margin: "0 0 16px", flex: 1 }}>{card.description}</p>
                    <a href={card.link || "/tools/eligibility-checker"} style={{ fontWeight: 700, color: "var(--b)", textDecoration: "none", fontSize: "13.5px" }}>
                      {card.linkBtnName || "Open →"}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINANCE PROCESS FROM ELIGIBILITY TO PAYMENTS */}
      {s12?.status !== false && (
        <section className="section white ds-finance-integrated">
          <div className="container">
            <div className="finance-process" style={{ textAlign: "left" }}>
              <span className="kicker">{s12?.badge || "Finance journey"}</span>
              <h2>{s12?.title || "From eligibility to payments."}</h2>
              <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>{s12?.description || "Explains student finance as a process instead of a wall of text."}</p>
              <div className="finance-process-steps" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px" }}>
                {(s12?.cards || [
                  { number: "1", title: "Status", description: "Confirm residency and previous study." },
                  { number: "2", title: "Course", description: "Check course designation and attendance." },
                  { number: "3", title: "Bank", description: "Prepare payment details." },
                  { number: "4", title: "Apply", description: "Submit Student Finance application." },
                  { number: "5", title: "Evidence", description: "Upload documents if requested." }
                ]).map((step: any, idx: number) => (
                  <article className="finance-process-step" key={idx} style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.25rem", position: "relative" }}>
                    <b style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", background: "var(--o)", color: "#fff", borderRadius: "50%", width: "26px", height: "26px", fontSize: "13px", fontWeight: "bold", marginBottom: "10px" }}>{step.number}</b>
                    <h3 style={{ fontSize: "17px", fontWeight: 800, margin: "0 0 6px" }}>{step.title}</h3>
                    <p style={{ fontSize: "13.5px", color: "var(--muted)", margin: 0, lineHeight: 1.45 }}>{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CALCULATOR ESTIMATE SECOND BOX */}
      <section className="section white ds-finance-integrated" id="finance-estimate">
        <div className="container">
          <div className="ds-result" >
            <div>
              <span className="kicker">Calculator result</span>
              <h2>Your student finance estimate.</h2>
              <p >
                This is an indicative result. Final entitlement depends on SFE assessment, course intensity, household income, location and study mode.
              </p>
              <div className="btnrow" >
                <a className="btn btn-orange" href="/tools/finance-calculator">Calculate properly</a>
                <a className="btn btn-white" href="/tools/eligibility-checker">Check eligibility</a>
              </div>
            </div>
            <div className="ds-estimate-right">
              <div className="ds-total" >
                <span >
                  Total possible support
                </span>
                <strong>
                  £23,925
                </strong>
              </div>
              <div className="ds-mini-results">
                {[
                  { title: "Tuition Fee Loan", description: "£9,790" },
                  { title: "Maintenance Loan", description: "£14,135" },
                  { title: "Extra grants", description: "Check" }
                ].map((card: any, idx: number) => (
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

      {/* STUDENT FINANCE AND SUPPORT GRID (SECONDARY VISUAL GRID) */}
      {s13?.status !== false && (
        <section className="section white ds-finance-integrated">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s13?.badge || "Funding cards"}</span>
                <h2>{s13?.title || "Student finance and support."}</h2>
              </div>
              <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>{s13?.description || "Core funding routes explained visually: living costs, tuition, grants and extra support."}</p>
            </div>
            <div className="finance-visual-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
              {(s13?.cards || [
                { title: "Maintenance Loan", subTitle: "Up to £14k+", description: "Living-cost support paid to you if eligible.", link: "/funding/maintenance-loan", fullImageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=85" },
                { title: "Tuition Fee Loan", subTitle: "£9k+", description: "Course-fee support usually paid to provider.", link: "/funding/tuition-fee-loan", fullImageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=85" },
                { title: "Grants & bursaries", subTitle: "Check", description: "Extra help may be available depending on circumstances.", link: "/funding/maintenance-loan#grants", fullImageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=85" },
                { title: "Parents / DSA", subTitle: "Extra help", description: "Support for parents, disabilities or specific needs.", link: "/tools/eligibility-checker", fullImageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=85" }
              ]).map((card: any, idx: number) => (
                <article className="finance-visual-card" key={idx} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden", display: "flex", flexDirection: "column", textAlign: "left" }}>
                  <img src={card.fullImageUrl} alt={card.title} style={{ height: "180px", width: "100%", objectFit: "cover" }} />
                  <div className="finance-visual-card-body" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3 style={{ fontSize: "19px", fontWeight: 800, margin: "0 0 4px" }}>{card.title}</h3>
                    <strong style={{ fontSize: "22px", color: "var(--o)", margin: "4px 0 8px" }}>{card.subTitle}</strong>
                    <p style={{ fontSize: "14px", color: "var(--muted)", margin: "0 0 16px", flex: 1 }}>{card.description}</p>
                    <a href={card.link || "/tools/eligibility-checker"} style={{ fontWeight: 700, color: "var(--b)", textDecoration: "none", fontSize: "14px" }}>View guide →</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WARNING BANNER */}
      {s14?.status !== false && (
        <section className="section tight ds-finance-integrated">
          <div className="container">
            <div className="finance-warning-banner" style={{ background: "#fff8f2", borderLeft: "4px solid var(--o)", padding: "1.5rem 2rem", borderRadius: "0 12px 12px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", textAlign: "left" }}>
              <div>
                <span className="kicker" style={{ color: "var(--o)", fontWeight: 700, textTransform: "uppercase", fontSize: "11px" }}>
                  {s14?.badge || "Important funding rule"}
                </span>
                <h2 style={{ fontSize: "22px", fontWeight: 900, margin: "6px 0" }}>
                  {s14?.title || "Study mode can affect Maintenance Loan."}
                </h2>
                <p style={{ color: "var(--muted)", margin: 0, fontSize: "14px" }}>
                  {s14?.description || "Online, distance-learning and weekend-only routes may not qualify for Maintenance Loan. Ask an adviser before choosing the course."}
                </p>
              </div>
              <a className="btn btn-orange" href="/tools/eligibility-checker">Check study mode risk</a>
            </div>
          </div>
        </section>
      )}

      {/* COMPARISON TABLE */}
      {s15?.status !== false && (
        <section className="section white ds-finance-integrated">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s15?.badge || "Comparison table"}</span>
                <h2>{s15?.title || "Check funding routes."}</h2>
              </div>
              <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>{s15?.description || "Clear decision signals for course comparison, university comparison and funding guide pages."}</p>
            </div>
            <div className="finance-comparison-table" style={{ width: "100%", overflowX: "auto", border: "1px solid var(--border)", borderRadius: "12px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "15px" }}>
                <thead>
                  <tr style={{ background: "var(--soft)", borderBottom: "1px solid var(--border)" }}>
                    <th style={{ padding: "16px" }}>{s15?.headers?.route_header || "Route"}</th>
                    <th style={{ padding: "16px" }}>{s15?.headers?.funding_header || "Funding type"}</th>
                    <th style={{ padding: "16px" }}>{s15?.headers?.maintainance_header || "Maintenance Loan"}</th>
                    <th style={{ padding: "16px" }}>{s15?.headers?.best_header || "Best for"}</th>
                    <th style={{ padding: "16px" }}>{s15?.headers?.verdict_header || "Verdict"}</th>
                  </tr>
                </thead>
                <tbody>
                  {(s15?.rows || [
                    { route: "Campus / blended undergraduate", funding: "Tuition + maintenance", maintainance: "Usually stronger", best: "Students needing living-cost support", verdict: "Best overall route" },
                    { route: "Weekend-only", funding: "Needs careful check", maintainance: "Risk area", best: "Working adults with limited time", verdict: "Ask adviser first" },
                    { route: "Online / distance learning", funding: "Tuition may apply", maintainance: "Usually no maintenance", best: "Remote learners", verdict: "Good flexibility, less living-cost support" },
                    { route: "Postgraduate Master’s", funding: "Postgraduate Loan", maintainance: "Different system", best: "Graduates and career changers", verdict: "Check loan cap and tuition" }
                  ]).map((row: any, idx: number) => (
                    <tr key={idx} style={{ borderBottom: idx < (s15?.rows || []).length - 1 ? "1px solid var(--border)" : "none" }}>
                      <td style={{ padding: "16px", fontWeight: 700 }}>{row.route}</td>
                      <td style={{ padding: "16px" }}>{row.funding}</td>
                      <td style={{ padding: "16px", color: "var(--o)", fontWeight: 700 }}>{row.maintainance}</td>
                      <td style={{ padding: "16px" }}>{row.best}</td>
                      <td style={{ padding: "16px", fontWeight: 700, color: "var(--b)" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* TRACKER */}
      {s16?.status !== false && (
        <section className="section">
          <div className="container">
            <div className="title-row" >
              <div>
                <span className="kicker" >{s16?.badge || "Funding tracker"}</span>
                <h2>{s16?.title || "Track your Student Finance steps."}</h2>
              </div>
              <p>
                {s16?.description || "A live checklist of your Student Finance journey. Tap each stage as you complete it — the tracker updates your progress and tells you what to do next."}
              </p>
            </div>
            <FundingTracker />
          </div>
        </section>
      )}

      {/* SHARED BOTTOM SECTIONS */}
      <FundingBottomSections
        snapshot={s17}
        journey={s18}
        myths={s19}
        certainty={s20}
        stayInTouch={s21}
      />

      {/* TUITION FEE LOAN SECTION */}
      {s22?.status !== false && (
        <section className="section tight" id="tuition">
          <div className="container">
            <div className="info-card">
              <span className="kicker">{s22?.badge || "Tuition Fee Loan"}</span>
              <h2>{s22?.title || "Tuition Fee Loan"}</h2>
              <p>{s22?.description || "This section is ready for detailed content in the next content pass."}</p>
            </div>
          </div>
        </section>
      )}

      {/* GRANTS SECTION */}
      {s23?.status !== false && (
        <section className="section tight" id="grants">
          <div className="container">
            <div className="info-card">
              <span className="kicker">{s23?.badge || "Grants"}</span>
              <h2>{s23?.title || "Grants"}</h2>
              <p>{s23?.description || "This section is ready for detailed content in the next content pass."}</p>
            </div>
          </div>
        </section>
      )}

      {/* REPAYMENT SECTION */}
      {s24?.status !== false && (
        <section className="section tight" id="repayment">
          <div className="container">
            <div className="info-card">
              <span className="kicker">{s24?.badge || "Repayment"}</span>
              <h2>{s24?.title || "Repayment"}</h2>
              <p>{s24?.description || "This section is ready for detailed content in the next content pass."}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default TuitionFeeLoan;
