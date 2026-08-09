import React from "react";
import Banner from "@/components/ui/Banner";
import FundingTabs from "@/components/widgets/FundingTabs";
import MaintenanceJourneyWheel from "@/components/widgets/MaintenanceJourneyWheel";
import MaintenanceCalculator from "@/components/widgets/MaintenanceCalculator";
import FundingBottomSections from "@/components/widgets/FundingBottomSections";
import { ComparisonTable } from "@/components/sections";

const renderMaintenanceCell = (val: any, colKey: string) => {
  if (colKey === "maximum") {
    return <span style={{ color: "var(--o)", fontWeight: 700 }}>{val}</span>;
  }
  if (colKey === "living") {
    return <span style={{ fontWeight: 600 }}>{val}</span>;
  }
  return val;
};

interface MaintenanceLoanProps {
  data?: any;
}

export function MaintenanceLoan({ data }: MaintenanceLoanProps) {
  const s2 = data?.section_2; // What is maintenance loan
  const s3 = data?.section_3; // 2026/27 maximum amounts table
  const s4 = data?.section_4; // Journey wheel steps
  const s5 = data?.section_5; // Calculator section text
  const s6 = data?.section_6; // Which qualifications covered list
  const s7 = data?.section_7; // Important exclusions cards
  const s8 = data?.section_8; // Payments & assessment cards
  const s9 = data?.section_9; // Universal credit info card
  const s10 = data?.section_10; // Postgraduate warning comparison
  const s11 = data?.section_11; // Related guides
  const s12 = data?.section_12; // FAQ title
  const s13 = data?.section_13; // Final CTA estimate

  // Fallback defaults if database tables are not loaded
  const defaultMaximums = [
    { living: "Living away — outside London", maximum: "£10,830", minimum: "£5,048" },
    { living: "Living away — in London", maximum: "£14,135", minimum: "£7,039" },
    { living: "Living at home", maximum: "£9,118", minimum: "£4,013" },
    { living: "Studying — year abroad", maximum: "£12,953", minimum: "£6,533" }
  ];

  return (
    <div className="qualification-page funding-sub-page">
      {/* PAGE TABS */}
      <FundingTabs />

      {/* HERO BANNER */}
      <Banner
        slug="maintenance-loan"
        fallbackBadgeText="★ Maintenance Loan · 2026/27"
        fallbackTitle="Your living costs, paid into your bank."
        fallbackDescription="Three instalments a year for rent, food and travel. The amount depends on where you live and your household income."
        fallbackBgImage="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: "list-items",
          title: "Maximum / year",
          items: [
            { value: "£14,135", description: "London, away" },
            { value: "£10,830", description: "Outside London" },
            { value: "£9,118", description: "Living at home" },
            { value: "3×", description: "Instalments" }
          ]
        }}
      >
        <div className="btnrow" style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          <a className="btn btn-orange" href="#calculator">
            Calculate mine →
          </a>
          <a className="btn btn-white" href="/tools/eligibility-checker">
            Check eligibility
          </a>
        </div>
      </Banner>

      {/* WHAT IS MAINTENANCE LOAN */}
      {s2?.status !== false && (
        <section className="section white">
          <div className="container">
            <div className="info-card" style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "2rem", textAlign: "left" }}>
              <span className="kicker" style={{ color: "var(--o)", textTransform: "uppercase", fontSize: "11px", fontWeight: 800 }}>
                {s2?.badge || "Plain English"}
              </span>
              <h2 style={{ fontSize: "24px", fontWeight: 900, margin: "8px 0 16px" }}>
                {s2?.title || "What is the maintenance loan?"}
              </h2>
              <div className="key-fact" style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "8px", padding: "1.25rem", marginBottom: "16px" }}>
                <strong style={{ display: "block", color: "var(--o)", marginBottom: "4px" }}>
                  {s2?.subTitle || "Key fact"}
                </strong>
                <p style={{ margin: 0, fontSize: "14.5px", color: "var(--muted)", lineHeight: 1.45 }}>
                  {s2?.description1 || "The maintenance loan is income-assessed. The amount you receive depends on your household income — not just your own. Lower household income = higher maintenance support."}
                </p>
              </div>
              <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.5, marginBottom: "12px" }}>
                {s2?.description2 || "Unlike the tuition fee loan — which goes straight to your university — the maintenance loan is paid into your bank account to help you cover living costs while studying."}
              </p>
              <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.5, margin: 0 }}>
                {s2?.description3 || "You can spend it on whatever you need: rent, bills, food, travel, childcare or course materials."}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* MAXIMUM AMOUNTS TABLE */}
      {s3?.status !== false && (
        <section className="section">
          <div className="container" style={{ textAlign: "left" }}>
            <div className="info-card" style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "2rem" }}>
              <span className="kicker" style={{ color: "var(--o)", textTransform: "uppercase", fontSize: "11px", fontWeight: 800 }}>
                {s3?.badge || "Maximum amounts"}
              </span>
              <h2 style={{ fontSize: "24px", fontWeight: 900, margin: "8px 0 16px" }}>
                {s3?.title || "2026/27 maximum amounts"}
              </h2>
              <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.5, marginBottom: "20px" }}>
                {s3?.description || "The maximums below apply to full-time students. Part-time students receive reduced amounts. These are the highest possible figures — most students receive less based on their household income."}
              </p>
              <ComparisonTable
                className="comp-table"
                headers={[
                  s3?.headers?.living_header || "Living situation",
                  s3?.headers?.maximum_header || "Maximum 2026/27",
                  s3?.headers?.minimum_header || "Minimum (high income)"
                ]}
                rows={s3?.rows || defaultMaximums}
                renderCell={renderMaintenanceCell}
              />
              <p style={{ marginTop: "14px", fontSize: "13px", color: "var(--muted)", fontWeight: 700, margin: "14px 0 0" }}>
                {s3?.tableDescription || "2026/27 SFE published maximums. Actual entitlement varies by household income. Verify at gov.uk/student-finance."}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* INTERACTIVE JOURNEY WHEEL */}
      {s4?.status !== false && (
        <section className="section">
          <div className="container">
            <MaintenanceJourneyWheel steps={s4?.stepper} />
          </div>
        </section>
      )}

      {/* CALCULATOR */}
      {s5?.status !== false && (
        <section className="section white" id="calculator">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s5?.badge || "Try the calculator"}</span>
                <h2>{s5?.title || "Estimate your maintenance loan."}</h2>
              </div>
              <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>{s5?.description || "A live estimate that updates as you choose — income, living situation and study mode. 2026/27 figures."}</p>
            </div>
            <MaintenanceCalculator />
          </div>
        </section>
      )}

      {/* WHICH QUALIFICATIONS COVERED */}
      {s6?.status !== false && (
        <section className="section white">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s6?.badge || "Qualification rules"}</span>
                <h2>{s6?.title || "Which qualifications does it cover?"}</h2>
              </div>
              <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>{s6?.description || "Full-time undergraduate study at designated UK providers. Coverage depends on qualification level and study intensity — not subject."}</p>
            </div>
            <div className="funding-card-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {(s6?.cards || [
                {
                  title: "✓ Eligible — full maintenance loan available",
                  pointers: [
                    "Full-time Bachelor's degrees (BA, BSc, BEng) at designated UK providers",
                    "Bachelor's with Foundation Year — Year 0 funded the same as Years 1–3",
                    "Foundation Degree (FdA, FdSc) — Level 5, 2 years full-time",
                    "HND (Higher National Diploma) — Level 5",
                    "HNC when delivered full-time",
                    "Certificate of Higher Education (CertHE) — Level 4",
                    "Top-Up Degree after FdA/FdSc/HND to a full Bachelor's"
                  ]
                },
                {
                  title: "✗ Not eligible for the maintenance loan",
                  pointers: [
                    "Distance-learning / fully-online undergraduate courses, except DSA cases",
                    "Weekend-only cohorts (Sat & Sun) — usually classed as part-time intensity",
                    "Part-time undergrad under 25% intensity",
                    "Master's degrees — different Postgraduate Master's Loan system",
                    "PhDs / Doctoral research — see the Doctoral Loan",
                    "Access to HE Diplomas — Level 3 Advanced Learner Loan",
                    "Apprenticeships — paid by your employer"
                  ]
                }
              ]).map((group: any, idx: number) => (
                <div className="info-card" key={idx} style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.75rem", textAlign: "left" }}>
                  <h3 style={{ color: group.title.startsWith("✓") ? "#0f8f6b" : "#dc2626", fontSize: "18px", fontWeight: 800, marginBottom: "16px" }}>
                    {group.title}
                  </h3>
                  <ul style={{ listStyle: "disc", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px", color: "var(--muted)", fontSize: "14.5px" }}>
                    {group.pointers?.map((p: string, pIdx: number) => (
                      <li key={pIdx}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* IMPORTANT EXCLUSIONS CAROUSEL/GRID */}
      {s7?.status !== false && (
        <section className="section">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s7?.badge || "Important exclusions"}</span>
                <h2>{s7?.title || "Which courses do NOT qualify?"}</h2>
              </div>
              <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>{s7?.description1 || "A course can be eligible for tuition funding but not for maintenance support — this trips up many adult learners."}</p>
            </div>
            <div className="guide-grid guide-carousel" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", textAlign: "left" }}>
              {(s7?.cards || [
                { icon: "🚫", title: "Distance-learning courses", description: "Fully online undergraduate courses are not eligible for maintenance loan or grants, except strict DSA cases." },
                { icon: "📅", title: "Weekend-only cohorts", description: "Saturday–Sunday-only programmes are often classed as part-time intensity even when marketed as full-time." },
                { icon: "⏰", title: "Part-time study", description: "Part-time courses may qualify for tuition support above 25% intensity, but not maintenance loan." },
                { icon: "📜", title: "Non-designated providers", description: "If the provider is not designated by SFE, you usually cannot access tuition or maintenance loans." },
                { icon: "🌍", title: "Courses overseas", description: "A UK degree with a year abroad can be fine; a full overseas course is not maintenance-eligible." },
                { icon: "🎓", title: "Previous-degree ELQ cases", description: "Equivalent or Lower Qualification rules can block new funding, with some exceptions." }
              ]).map((card: any, idx: number) => (
                <div className="info-card" key={idx} style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.5rem" }}>
                  <div className="icon" style={{ fontSize: "28px", marginBottom: "8px" }}>{card.icon}</div>
                  <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 8px" }}>{card.title}</h3>
                  <p style={{ fontSize: "14px", color: "var(--muted)", margin: 0, lineHeight: 1.45 }}>{card.description}</p>
                </div>
              ))}
            </div>
            <div className="key-fact" style={{ background: "var(--soft)", borderLeft: "4px solid var(--b)", borderRadius: "0 12px 12px 0", padding: "1.5rem", marginTop: "24px", textAlign: "left" }}>
              <strong style={{ display: "block", color: "var(--b)", marginBottom: "4px" }}>
                {s7?.subTitle || "The main exception: disabled students on distance learning"}
              </strong>
              <p style={{ margin: 0, fontSize: "14.5px", color: "var(--muted)" }}>
                {s7?.description2 || "If you qualify for Disabled Students' Allowance and your disability means you cannot reasonably study in person, SFE can grant maintenance support for a distance-learning course. This is a strict test, not a workaround."}
                {" "}<a href="/funding/disabled-students-allowance" style={{ color: "#1263ff", fontWeight: 950 }}>{s7?.linkname || "Disabled Students' Allowance →"}</a>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* PAYMENTS & ASSESSMENT */}
      {s8?.status !== false && (
        <section className="section white">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s8?.badge || "Payments & assessment"}</span>
                <h2>{s8?.title || "When is it paid — and whose income counts?"}</h2>
              </div>
            </div>
            <div className="guide-grid guide-carousel" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", textAlign: "left" }}>
              {(s8?.cards || [
                { icon: "📅", title: "Paid in three instalments", description: "For a September start, payments typically arrive in September, January and April. Exact dates vary by university." },
                { icon: "👪", title: "Whose income counts", description: "Under 25 and dependent usually means parents' income. If you're 25+ or independent, your own and partner's income may count." },
                { icon: "💡", title: "Budget tip", description: "Divide your annual loan by 12 and budget monthly — term payments need to last through holidays too." }
              ]).map((card: any, idx: number) => (
                <div className="info-card" key={idx} style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.5rem" }}>
                  <div className="icon" style={{ fontSize: "28px", marginBottom: "8px" }}>{card.icon}</div>
                  <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 8px" }}>{card.title}</h3>
                  <p style={{ fontSize: "14px", color: "var(--muted)", margin: 0, lineHeight: 1.45 }}>{card.description}</p>
                </div>
              ))}
            </div>
            {s9?.status !== false && (
              <div className="info-card" style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "2rem", marginTop: "22px", display: "grid", gridTemplateColumns: "1fr auto", gap: "24px", alignItems: "center", textAlign: "left" }}>
                <div>
                  <h3 style={{ fontSize: "19px", fontWeight: 800, margin: "0 0 4px" }}>
                    {s9?.title || "Does the maintenance loan affect benefits?"}
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--muted)", margin: 0 }}>
                    {s9?.description || "It can affect means-tested benefits like Universal Credit — it's often counted as income. If you currently receive benefits, speak to an adviser before applying."}
                  </p>
                </div>
                <a className="btn btn-orange" href="/lead/adviser-call">Speak to an adviser</a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* POSTGRADUATE WARNING */}
      {s10?.status !== false && (
        <div className="fb dark" style={{ background: "linear-gradient(135deg,#07172b,#0e2a4a)", padding: "3rem 1.5rem", color: "#fff", textAlign: "left" }}>
          <div className="fb-inner" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="title-row" style={{ marginBottom: "2rem" }}>
              <div>
                <span className="kicker" style={{ color: "#ff7a1a", textTransform: "uppercase", fontSize: "12px", fontWeight: 800 }}>
                  {s10?.badge || "Postgraduate warning"}
                </span>
                <h2 style={{ color: "#fff", fontSize: "28px", fontWeight: 900 }}>
                  {s10?.title || "Postgraduate Master's — different rules entirely."}
                </h2>
              </div>
              <p style={{ color: "#cdd9ee", margin: "8px 0 0" }}>
                {s10?.description || "Everything above is for undergraduate Student Finance. The postgraduate system works differently — and the distance-learning rule does not apply the same way."}
              </p>
            </div>
            <div className="funding-card-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {(s10?.cards || [
                {
                  title: "Undergraduate",
                  subTitle: "Two separate loans",
                  subTitleTextColor: "#1263ff",
                  pointers: [
                    "Tuition Fee Loan to university",
                    "Maintenance Loan to your bank",
                    "Distance/online courses: no maintenance",
                    "Weekend-only: usually no maintenance"
                  ]
                },
                {
                  title: "Postgraduate Master's",
                  subTitle: "One combined loan",
                  subTitleTextColor: "#ff7a1a",
                  pointers: [
                    "Up to £12,858 in 2026/27",
                    "You allocate it however you choose",
                    "Distance / online: still eligible",
                    "Part-time: eligible over up to 4 years"
                  ]
                }
              ]).map((group: any, idx: number) => (
                <div className="info-card" key={idx} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", padding: "1.75rem" }}>
                  <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 6px" }}>{group.title}</h3>
                  <p style={{ color: group.subTitleTextColor || "#1263ff", fontWeight: 950, marginBottom: "12px", fontSize: "14px" }}>
                    {group.subTitle}
                  </p>
                  <ul style={{ listStyle: "disc", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", color: "#cdd9ee", fontSize: "14px" }}>
                    {group.pointers?.map((p: string, pIdx: number) => (
                      <li key={pIdx}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RELATED GUIDES */}
      {s11?.status !== false && (
        <section className="section">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s11?.badge || "Related guides"}</span>
                <h2>{s11?.title || "Useful finance guides."}</h2>
              </div>
            </div>
            <div className="guide-grid guide-carousel" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", textAlign: "left" }}>
              {(s11?.cards || [
                { title: "Tuition fee loan explained", description: "Understand the loan paid directly to your university.", link: "/funding/tuition-fee-loan", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80" },
                { title: "Check your eligibility", description: "Residency, previous study and course rules explained.", link: "/tools/eligibility-checker", image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=900&q=80" },
                { title: "How repayments work", description: "Income-based repayment, thresholds and write-off rules.", link: "/funding", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80" }
              ]).slice(0, 3).map((card: any, idx: number) => (
                <a className="guide-card" href={card.link} key={idx} style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden", display: "flex", flexDirection: "column", textDecoration: "none", color: "inherit" }}>
                  <span className="guide-media">
                    <img alt={card.title} src={card.image || "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80"} style={{ height: "150px", width: "100%", objectFit: "cover" }} />
                  </span>
                  <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 className="guide-title" style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 4px" }}>{card.title}</h3>
                    <p className="guide-sub" style={{ fontSize: "13px", color: "var(--muted)", margin: "0 0 12px", flex: 1 }}>{card.description}</p>
                    <span className="guide-cta" style={{ fontWeight: 700, color: "var(--b)", fontSize: "13px" }}>Open guide →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {s12?.status !== false && (
        <section className="section white">
          <div className="container">
            <div className="title-row" style={{ textAlign: "left", marginBottom: "2rem" }}>
              <div>
                <span className="kicker">{s12?.badge || "FAQ"}</span>
                <h2>{s12?.title || "Common maintenance loan questions."}</h2>
              </div>
            </div>
            <div className="faq-list" style={{ maxWidth: "880px", display: "grid", gap: "14px", textAlign: "left" }}>
              <details className="info-card" style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.25rem", cursor: "pointer" }}>
                <summary style={{ fontWeight: 950, fontSize: "17px", color: "#102033" }}>How does household income affect how much I get?</summary>
                <p style={{ marginTop: "12px", color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.5 }}>
                  SFE uses a sliding scale. You get the full maintenance maximum at a household income at or below about £25,000, and it gradually reduces to the minimum rate once income reaches roughly £62,410. The exact amount depends on SFE's current assessment — use the calculator for an indicative figure.
                </p>
              </details>
              <details className="info-card" style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.25rem", cursor: "pointer" }}>
                <summary style={{ fontWeight: 950, fontSize: "17px", color: "#102033" }}>Can I get more maintenance if I have dependants?</summary>
                <p style={{ marginTop: "12px", color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.5 }}>
                  Yes — there are additional grants if you have dependent children or an adult dependant. These are grants, not loans.
                </p>
              </details>
              <details className="info-card" style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.25rem", cursor: "pointer" }}>
                <summary style={{ fontWeight: 950, fontSize: "17px", color: "#102033" }}>What if I live at home — is it still worth it?</summary>
                <p style={{ marginTop: "12px", color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.5 }}>
                  The at-home rate is lower (up to £9,118) but still substantial support for living costs, and it reduces what you need from other sources.
                </p>
              </details>
              <details className="info-card" style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.25rem", cursor: "pointer" }}>
                <summary style={{ fontWeight: 950, fontSize: "17px", color: "#102033" }}>Does studying part-time affect my maintenance loan?</summary>
                <p style={{ marginTop: "12px", color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.5 }}>
                  Part-time undergraduate courses generally do not qualify for the maintenance loan, though tuition support may be available above 25% intensity.
                </p>
              </details>
              <details className="info-card" style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.25rem", cursor: "pointer" }}>
                <summary style={{ fontWeight: 950, fontSize: "17px", color: "#102033" }}>What happens if I take a leave of absence?</summary>
                <p style={{ marginTop: "12px", color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.5 }}>
                  Your maintenance payments usually pause during a leave of absence. Contact SFE and your university as the impact depends on timing and circumstances.
                </p>
              </details>
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      {s13?.status !== false && (
        <section className="section">
          <div className="container" style={{ textAlign: "left" }}>
            <div className="final-cta" style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "16px", padding: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
              <div>
                <span className="kicker" style={{ color: "var(--o)", textTransform: "uppercase", fontSize: "11px", fontWeight: 800 }}>
                  {s13?.badge || "Want a personal estimate?"}
                </span>
                <h2 style={{ fontSize: "24px", fontWeight: 900, margin: "6px 0" }}>
                  {s13?.title || "See your maintenance loan based on your actual situation."}
                </h2>
                <p style={{ color: "var(--muted)", margin: 0 }}>
                  {s13?.description || "Use the calculator to estimate your loan based on your income, location and living situation."}
                </p>
              </div>
              <div className="btnrow" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a className="btn btn-orange" href="#calculator">Open Finance Calculator →</a>
                <a className="btn btn-white" href="/lead/adviser-call">Speak to an adviser</a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SHARED BOTTOM SECTIONS */}
      <FundingBottomSections />
    </div>
  );
}

export default MaintenanceLoan;
