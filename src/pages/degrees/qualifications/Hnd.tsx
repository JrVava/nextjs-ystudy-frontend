import { getCMSPageContent } from "@/services/cms.service";
import "@/app/degrees/qualifications/qualifications.css";
import { QBanner } from "@/components/ui/QBanner";
import Link from "next/link";

export default async function Hnd() {
  const data = await getCMSPageContent("hnd");

  return (
    <div className="qualification-page hnd-page">
      <QBanner
        slug="hnd"
        layoutType="qhero"
        fallbackTitle="HND — Higher National Diploma"
        fallbackDescription="A two-year Level 5 qualification focused on practical higher education, often used as a stepping stone into the final year of a degree."
        fallbackBadgeText="YStudy qualification guide"
        fallbackEyebrow="Degree Year 1 & 2"
        fallbackBgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=85"
        fallbackDuration="2 years"
        fallbackLevel="Level 5"
      />

      {/* QUICK EXPLANATION / STEP CARDS */}
      {data?.section_3?.status !== false && (
        <section className="qf-sec">
          <div className="qf" style={{ textAlign: "left" }}>
            <div className="qf-head">
              <span className="kicker">{data?.section_3?.badge}</span>
              <h2>{data?.section_3?.title}</h2>
              <p>{data?.section_3?.description}</p>
            </div>
            <div className="qf-grid4">
              {data?.section_3?.cards && (
                data.section_3.cards.map((card: any, idx: number) => (
                  <div className="fcard" key={idx}>
                    <div className="n">{card.number || (idx + 1)}</div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* ENTRY REQUIREMENTS AND PROGRESSION */}
      {data?.section_4?.status !== false && (
        <section className="qf-sec" style={{ background: "var(--soft)", textAlign: "left" }}>
          <div className="qf">
            <div className="qf-head">
              <span className="kicker">{data?.section_4?.badge}</span>
              <h2>{data?.section_4?.title}</h2>
              <p>{data?.section_4?.description}</p>
            </div>
            <div className="elig-routes">
              {data?.section_4?.cards && (
                data.section_4.cards.map((card: any, idx: number) => {
                  const isWarn = card.badge === "Important";
                  return (
                    <div className={`eligc ${isWarn ? "warn" : ""}`} key={idx}>
                      <p className="tagline">{card.badge}</p>
                      <h3>{card.title}</h3>
                      <ul>
                        {card.points && (
                          card.points.map((pt: string, pidx: number) => (
                            <li key={pidx}>{pt}</li>
                          ))
                        )}
                      </ul>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>
      )}

      {/* SFE FUNDING CHECK */}
      {data?.section_5?.status !== false && (
        <section className="qf-sec">
          <div className="qf">
            <div className="qf-fund" style={{ textAlign: "left" }}>
              <div className="qf-fund-in">
                <span className="kicker">{data?.section_5?.badge}</span>
                <h2>{data?.section_5?.title}</h2>
                <div className="qf-fund-grid">
                  {data?.section_5?.cards && (
                    data.section_5.cards.map((card: any, idx: number) => (
                      <div className="fundc" key={idx}>
                        <b>{card.title}</b>
                        <span>{card.description}</span>
                      </div>
                    ))
                  )}
                </div>
                <a className="fbtn" href="/tools/finance-calculator">Estimate funding →</a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQS */}
      {data?.section_6?.status !== false && (
        <section className="qf-sec" style={{ background: "var(--soft)", textAlign: "left" }}>
          <div className="qf">
            <div className="qf-head">
              <span className="kicker">{data?.section_6?.badge}</span>
              <h2>{data?.section_6?.title}</h2>
            </div>
            <div className="qf-faq">
              {data?.section_6?.faqs?.map((faq: any, idx: number) => (
                <details key={idx} className="faqi" open={idx === 0}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA CONVERSION PANEL */}
      {data?.section_7?.status !== false && (
        <section className="qf-sec">
          <div className="qf">
            <div className="cta-panel">
              <h2>{data?.section_7?.title}</h2>
              <p>{data?.section_7?.description}</p>
              <div className="btnrow">
                <a className="btn btn-blue" href="/tools/degree-match">Find my route</a>
                <a className="btn btn-orange" href="/apply">Apply with YStudy</a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* THREE LINK CARDS CONVERSION SYSTEM */}
      {data?.section_8?.status !== false && (
        <section className="ys-conversion-system" aria-label="YStudy next steps">
          <div className="ys-conversion-wrap">
            {data?.section_8?.cards && (
              data.section_8.cards.map((c: any, idx: number) => {
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
                  <a className={`ys-conversion-card ${theme}`} href={href} key={idx}>
                    <div style={{ textAlign: "left" }}>
                      <h2>{c.title}</h2>
                      <p>{c.description}</p>
                    </div>
                    <span>{btnLabel}</span>
                  </a>
                );
              })
            )}
          </div>
        </section>
      )}

      {/* CROSSLINKS SECTION */}
      {data?.section_9?.status !== false && (
        <section className="ys-crosslinks" aria-label="Useful links">
          <div className="inner" style={{ textAlign: "left" }}>
            <div>
              <h2>{data?.section_9?.title}</h2>
              <p>{data?.section_9?.description}</p>
            </div>
            <div className="ys-link-grid">
              <a href="/degrees">Find degrees</a>
              <a href="/funding">Funding hub</a>
              <a href="/careers">Careers &amp; salaries</a>
              <a href="/tools/degree-match">Degree Match</a>
              <a href="/tools/salary-checker">Salary Checker</a>
              <a href="/guides">Student guides</a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
