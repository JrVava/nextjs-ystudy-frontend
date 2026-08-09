import React from "react";
import Banner from "@/components/ui/Banner";
import FundingBottomSections from "@/components/widgets/FundingBottomSections";

interface GrantsProps {
  data?: any;
}

export function Grants({ data }: GrantsProps) {
  const s8 = data?.section_8; // snapshot
  const s9 = data?.section_9; // journey
  const s10 = data?.section_10; // myths
  const s11 = data?.section_11; // certainty
  const s12 = data?.section_12; // stay in touch
  const s13 = data?.section_13; // Resource grid
  const s14 = data?.section_14; // Route choice CTA panel

  return (
    <div className="qualification-page funding-sub-page">
      {/* HERO BANNER */}
      <Banner
        slug="grants"
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
