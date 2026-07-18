import { getCMSPageContent } from "@/services/cms.service";
import "@/app/degrees/qualifications/qualifications.css";
import { QBanner } from "@/components/ui/QBanner";
import Link from "next/link";
import React from "react";

interface QualificationDetailProps {
  slug: string;
}

export default async function QualificationDetail({ slug }: QualificationDetailProps) {
  const data = await getCMSPageContent(slug);

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Qualification Route Not Found</h2>
        <p>We couldn't retrieve the qualification details for "{slug}".</p>
        <Link href="/degrees" className="btn btn-blue" style={{ marginTop: "1rem" }}>
          Browse Degrees
        </Link>
      </div>
    );
  }

  // Format title for fallback
  const title = (slug || "").replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  // Determine fallback statistics based on slug
  let fallbackDuration = "1 year";
  let fallbackLevel = "Level 4";
  if (slug === "hnd" || slug === "foundation-degree") {
    fallbackDuration = "2 years";
    fallbackLevel = "Level 5";
  } else if (slug === "masters-degree" || slug === "masters") {
    fallbackDuration = "1 yr FT / 2 yr PT";
    fallbackLevel = "Level 7";
  } else if (slug === "top-up-degree") {
    fallbackDuration = "1 year";
    fallbackLevel = "Level 6";
  }

  return (
    <div className="qualification-page qualification-detail-page">
      {/* HERO SECTION DYNAMIZED WITH QBANNER */}
      <QBanner
        slug={slug}
        layoutType="qhero"
        fallbackTitle={data.section_2?.title || `${title} Qualification`}
        fallbackDescription={data.section_2?.description || `Learn how an integrated ${title} works as a standard funding-supported entry route for mature students.`}
        fallbackBadgeText="YStudy qualification guide"
        fallbackEyebrow={data.section_2?.badge || "Qualification Guide"}
        fallbackBgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=85"
        fallbackDuration={fallbackDuration}
        fallbackLevel={fallbackLevel}
      />

      {/* QUICK EXPLANATION / STEP CARDS */}
      {data.section_3?.status !== false && (
        <section className="qf-sec">
          <div className="qf" style={{ textAlign: "left" }}>
            <div className="qf-head">
              <span className="kicker">{data.section_3?.badge || "Quick explanation"}</span>
              <h2>{data.section_3?.title || `What is ${title}?`}</h2>
              <p>{data.section_3?.description}</p>
            </div>
            <div className="qf-grid4">
              {data.section_3?.cards?.map((card: any, idx: number) => (
                <div className="fcard" key={idx}>
                  <div className="n">{card.number || (idx + 1)}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ENTRY REQUIREMENTS AND PROGRESSION */}
      {data.section_4?.status !== false && (
        <section className="qf-sec" style={{ background: "var(--soft)", textAlign: "left" }}>
          <div className="qf">
            <div className="qf-head">
              <span className="kicker">{data.section_4?.badge || "Before you apply"}</span>
              <h2>{data.section_4?.title || "Entry requirements and pathways"}</h2>
              <p>{data.section_4?.description}</p>
            </div>

            {/* Render a card grid of requirements */}
            {data.section_4?.cards && (
              <div className="elig-routes">
                {data.section_4.cards.map((c: any, idx: number) => {
                  const isWarn = c.badge?.toLowerCase().includes("important") || c.badge?.toLowerCase().includes("plan");
                  return (
                    <div className={`eligc ${isWarn ? "warn" : ""}`} key={idx}>
                      <p className="tagline">{c.badge}</p>
                      <h3>{c.title}</h3>
                      <ul>
                        {c.points?.map((pt: string, pidx: number) => (
                          <li key={pidx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* SFE FUNDING CHECK */}
      {data.section_5?.status !== false && (
        <section className="qf-sec">
          <div className="qf">
            <div className="qf-fund" style={{ textAlign: "left" }}>
              <div className="qf-fund-in">
                <span className="kicker">{data.section_5?.badge || "Funding check"}</span>
                <h2>{data.section_5?.title || "Can Student Finance support this route?"}</h2>
                <div className="qf-fund-grid">
                  {data.section_5?.cards?.map((card: any, idx: number) => (
                    <div className="fundc" key={idx}>
                      <b>{card.title}</b>
                      <span>{card.description}</span>
                    </div>
                  ))}
                </div>
                <Link className="fbtn" href="/tools/finance-calculator">
                  Estimate funding →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQS SECTION */}
      {data.section_6?.status !== false && data.section_6?.faqs && (
        <section className="qf-sec" style={{ background: "var(--soft)", textAlign: "left" }}>
          <div className="qf">
            <div className="qf-head">
              <span className="kicker">{data.section_6.badge || "FAQ"}</span>
              <h2>{data.section_6.title || `${title} FAQ.`}</h2>
            </div>
            <div className="qf-faq">
              {data.section_6.faqs.map((faq: any, idx: number) => (
                <details key={idx} className="faqi" open={idx === 0}>
                  <summary>{faq.question || faq.q}</summary>
                  <p>{faq.answer || faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CALL TO ACTION / CTA PANEL */}
      {data.section_7?.status !== false && (
        <section className="qf-sec">
          <div className="qf">
            <div className="cta-panel" style={{ textAlign: "center" }}>
              <h2>{data.section_7.title || "Not sure if this is your best route?"}</h2>
              <p>{data.section_7.description || `Speak with YStudy before applying. We can check your qualification, funding route and course options.`}</p>
              <div className="btnrow" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "24px" }}>
                <Link className="btn btn-blue" href="/tools/degree-match">
                  Find my route
                </Link>
                <Link className="btn btn-orange" href="/apply">
                  Apply with YStudy
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* THREE LINK CARDS CONVERSION SYSTEM */}
      {data.section_8?.status !== false && (
        <section className="ys-conversion-system" aria-label="YStudy next steps">
          <div className="ys-conversion-wrap">
            {(data.section_8?.cards || [
              {
                title: "Check if you can get funded.",
                description: "Quickly understand if you may qualify for Student Finance, grants and flexible university routes."
              },
              {
                title: "Apply with YStudy.",
                description: "Send us your details and we’ll help you choose the right course, prepare documents and move forward."
              },
              {
                title: "Speak with an adviser.",
                description: "Not sure what to study, what you can get or which documents you need? Book a free call."
              }
            ]).map((c: any, idx: number) => {
              let theme = "dark";
              let btnLabel = "Book free call";
              let href = "/lead/adviser-call";
              if (idx === 0) {
                theme = "blue";
                btnLabel = "Check eligibility";
                href = "/tools/eligibility-checker";
              } else if (idx === 1) {
                theme = "orange";
                btnLabel = "Start application";
                href = "/apply";
              }
              return (
                <Link className={`ys-conversion-card ${theme}`} href={href} key={idx}>
                  <div style={{ textAlign: "left" }}>
                    <h2>{c.title}</h2>
                    <p>{c.description}</p>
                  </div>
                  <span>{btnLabel}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* CROSSLINKS SECTION */}
      {data.section_9?.status !== false && (
        <section className="ys-crosslinks" aria-label="Useful links">
          <div className="inner" style={{ textAlign: "left" }}>
            <div>
              <h2>{data.section_9?.title || "Useful next steps"}</h2>
              <p>{data.section_9?.description || "Move from information to action. Compare degrees, check funding, explore careers and apply with support."}</p>
            </div>
            <div className="ys-link-grid">
              <Link href="/degrees">Find degrees</Link>
              <Link href="/funding">Funding hub</Link>
              <Link href="/careers">Careers &amp; salaries</Link>
              <Link href="/tools/degree-match">Degree Match</Link>
              <Link href="/tools/salary-checker">Salary Checker</Link>
              <Link href="/guides">Student guides</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
