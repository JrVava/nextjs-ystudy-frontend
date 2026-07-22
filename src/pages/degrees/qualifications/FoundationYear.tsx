import { getCMSPageContent } from "@/services/cms.service";
import "@/app/degrees/qualifications/qualifications.css";
import {
  HeroBanner,
  QualificationSection2,
  QualificationConversionCards,
  QualificationCrosslinks,
} from "@/components/ui";

export default async function FoundationYear() {
  const data = await getCMSPageContent("foundation-year");

  return (
    <div className="qualification-page foundation-year-page">
      <section className="qhero">
        <HeroBanner
          slug="foundation-year"
          layoutType="qualification"
          fallbackBadgeText="YStudy qualification guide"
          fallbackBgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=85"
        />
        <QualificationSection2
          section2Data={data?.section_2}
          fallbackBadge="Degree Year 0"
          fallbackTitle="Foundation Year — Year 0"
          fallbackDescription="Learn how an integrated Foundation Year (Year 0) works as a standard funding-supported entry route for mature students."
          fallbackStats={[
            { title: "1 year", description: "Typical duration" },
            { title: "Level 3 / Year 0", description: "Qualification level" },
            { title: "Funding", description: "Check SFE route" },
          ]}
        />
      </section>

      {/* WHAT IT IS SECTION */}
      {data?.section_3?.status !== false && (
        <section className="qf-sec">
          <div className="qf" style={{ textAlign: "left" }}>
            <div className="qf-head">
              <span className="kicker">{data?.section_3?.badge}</span>
              <h2>{data?.section_3?.title}</h2>
              <p>{data?.section_3?.description}</p>
            </div>
            <div className="qf-grid3">
              {data?.section_3?.cards && (
                data.section_3.cards.map((card: any, idx: number) => (
                  <div className="fcard" key={idx}>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* AVAILABLE COURSES LIST */}
      {data?.section_4?.status !== false && (
        <section className="qf-sec" id="courses" style={{ background: "var(--soft)", textAlign: "left" }}>
          <div className="qf">
            <div className="qf-head">
              <span className="kicker">{data?.section_4?.badge}</span>
              <h2>{data?.section_4?.title}</h2>
              <p>{data?.section_4?.description}</p>
            </div>
            <div className="qf-courses">
              {data?.section_4?.courses?.map((c: any, idx: number) => (
                <article key={idx} className="qcard">
                  <div className="ph">
                    <div className="tags">
                      {c.tags?.map((t: string, tIdx: number) => (
                        <span key={tIdx}>{t}</span>
                      ))}
                    </div>
                    <img src={c.image} alt="" />
                  </div>
                  <div className="cb">
                    <h3>{c.title}</h3>
                    <p>{c.description}</p>
                    <div className="out">{c.outcome}</div>
                    <div className="row">
                      <a className="v" href={c.link}>View</a>
                      <a className="a" href="/apply">Apply</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HOW YSTUDY GETS YOU THERE */}
      {data?.section_5?.status !== false && (
        <section className="qf-help">
          <div className="qf-help-in">
            <span className="kicker">{data?.section_5?.badge}</span>
            <h2>{data?.section_5?.title}</h2>
            <p className="sub">{data?.section_5?.description}</p>
            <div className="steps">
              {data?.section_5?.cards && (
                data.section_5.cards.map((card: any, idx: number) => {
                  let href = "/apply";
                  let btnLabel = "Start applying →";
                  if (idx === 0) {
                    href = "/tools/eligibility-checker";
                    btnLabel = "Check eligibility →";
                  } else if (idx === 1) {
                    href = "#courses";
                    btnLabel = "Browse courses →";
                  } else if (idx === 2) {
                    href = "/tools/personal-statement-calculator";
                    btnLabel = "Open the tools →";
                  }
                  return (
                    <a className="stepc" href={href} key={idx}>
                      <div className="num">{card.numbers}</div>
                      {idx < 3 && <span className="line"></span>}
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                      <span className="go">{btnLabel}</span>
                    </a>
                  );
                })
              )}
            </div>
          </div>
        </section>
      )}

      {/* WHAT YOU WALK AWAY WITH */}
      {data?.section_6?.status !== false && (
        <section className="qf-sec" style={{ textAlign: "left" }}>
          <div className="qf">
            <div className="qf-head">
              <span className="kicker">{data?.section_6?.badge}</span>
              <h2>{data?.section_6?.title}</h2>
              <p>{data?.section_6?.description}</p>
            </div>
            <div className="qf-grid4">
              {data?.section_6?.cards && (
                data.section_6.cards.map((card: any, idx: number) => (
                  <div className="fcard" key={idx}>
                    <div className="n">{card.numbers}</div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* ELIGIBILITY & ACADEMIC MATRIX */}
      {data?.section_7?.status !== false && (
        <section className="qf-sec" style={{ borderTop: "1px solid #dbe8f7", textAlign: "left" }}>
          <div className="qf">
            <div className="qf-head">
              <span className="kicker">{data?.section_7?.badge}</span>
              <h2>{data?.section_7?.title}</h2>
              <p>{data?.section_7?.description}</p>
            </div>

            <h3 style={{ fontFamily: "var(--df)", fontWeight: 900, letterSpacing: "-.02em", fontSize: "21px", color: "var(--ink)", margin: "0 0 16px" }}>
              {data?.section_7?.cardsTitle}
            </h3>

            <div className="elig-routes">
              {data?.section_7?.cards && (
                data.section_7.cards.map((card: any, idx: number) => {
                  const isWarn = card.badge === "Plan for these";
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

            <h3 style={{ fontFamily: "var(--df)", fontWeight: 900, letterSpacing: "-.02em", fontSize: "21px", color: "var(--ink)", margin: "34px 0 14px" }}>
              {data?.section_7?.tableTitle}
            </h3>

            <div className="elig-note">
              {data?.section_7?.tableBadge}
            </div>

            <table className="elig-table">
              <thead>
                <tr>
                  <th>{data?.section_7?.headers?.status_header}</th>
                  <th>{data?.section_7?.headers?.likely_header}</th>
                </tr>
              </thead>
              <tbody>
                {data?.section_7?.row && (
                  data.section_7.row.map((r: any, idx: number) => (
                    <tr key={idx}>
                      <td className="who">
                        {r.status?.title}
                        <span className={`pill ${r.status?.class?.replace("pill ", "") || "full"}`}>
                          {r.status?.badge}
                        </span>
                      </td>
                      <td>{r.likely}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* SFE ENTITLEMENT DETAILS BAND */}
      {data?.section_8?.status !== false && (
        <section className="qf-sec">
          <div className="qf-fund" style={{ textAlign: "left" }}>
            <div className="qf-fund-in">
              <span className="kicker">{data?.section_8?.badge}</span>
              <h2>{data?.section_8?.title}</h2>
              <div className="qf-fund-grid">
                {data?.section_8?.cards && (
                  data.section_8.cards.map((c: any, idx: number) => (
                    <div className="fundc" key={idx}>
                      <b>{c.cost}</b>
                      <span>{c.description}</span>
                    </div>
                  ))
                )}
              </div>
              <a className="fbtn" href="/funding">Estimate your funding →</a>
            </div>
          </div>
        </section>
      )}

      {/* COMPARE QUALIFICATIONS */}
      {data?.section_9?.status !== false && (
        <section className="qf-sec" style={{ background: "var(--soft)", textAlign: "left" }}>
          <div className="qf">
            <div className="qf-head">
              <span className="kicker">{data?.section_9?.badge}</span>
              <h2>{data?.section_9?.title}</h2>
              <p>{data?.section_9?.description}</p>
            </div>
            <div className="qf-compare">
              {data?.section_9?.cards && (
                data.section_9.cards.map((c: any, idx: number) => (
                  <div className="compc" key={idx}>
                    <h3>{c.title}</h3>
                    <dl>
                      {c.questionAnswer && (
                        c.questionAnswer.map((qa: any, qidx: number) => (
                          <div key={qidx}>
                            <dt>{qa.question}</dt>
                            <dd>{qa.answer}</dd>
                          </div>
                        ))
                      )}
                    </dl>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* SUCCESS STORIES */}
      {data?.section_10?.status !== false && (
        <section className="qf-sec" style={{ textAlign: "left" }}>
          <div className="qf">
            <div className="qf-head">
              <span className="kicker">{data?.section_10?.badge}</span>
              <h2>{data?.section_10?.title}</h2>
              <p>{data?.section_10?.description}</p>
            </div>
            <div className="qf-stories">
              {data?.section_10?.stories?.map((s: any, idx: number) => (
                <div key={idx} className="storyc">
                  <div className="sph">
                    <span className="tag">{s.tag}</span>
                    <img src={s.image} alt="" />
                  </div>
                  <div className="sb">
                    <p className="q">"{s.quote}"</p>
                    <div className="who">{s.author}<span>{s.courseInfo}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COMMON QUESTIONS / FAQS */}
      {data?.section_11?.status !== false && (
        <section className="qf-sec" style={{ background: "var(--soft)", textAlign: "left" }}>
          <div className="qf">
            <div className="qf-head">
              <span className="kicker">{data?.section_11?.badge}</span>
              <h2>{data?.section_11?.title}</h2>
            </div>
            <div className="qf-faq">
              {data?.section_11?.faqs?.map((faq: any, idx: number) => (
                <details key={idx} className="faqi" open={idx === 0}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OTHER QUALIFICATIONS NAVIGATION LIST */}
      {data?.section_12?.status !== false && (
        <section className="qf-sec" style={{ background: "var(--soft)", textAlign: "left" }}>
          <div className="qf">
            <div className="qf-head">
              <span className="kicker">{data?.section_12?.badge}</span>
              <h2>{data?.section_12?.title}</h2>
              <p>{data?.section_12?.description}</p>
            </div>
            <div className="qf-routes">
              {data?.section_12?.routes?.map((r: any, idx: number) => (
                <a key={idx} className="routec" href={r.link}>
                  <div className="rph">
                    <span className="lvl">{r.level}</span>
                    <img src={r.image} alt="" />
                  </div>
                  <div className="rb">
                    <h3>{r.title}</h3>
                    <p>{r.description}</p>
                    <span className="go">Explore {r.title} →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ADVISER SECTION */}
      {data?.section_13?.status !== false && (
        <section className="qf-adviser">
          <img
            className="bg"
            src="https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&amp;fit=crop&amp;w=2200&amp;q=80"
            alt=""
          />
          <div className="sc"></div>
          <div className="in" style={{ textAlign: "left" }}>
            <span className="eyebrow">{data?.section_13?.badge}</span>
            <h2>{data?.section_13?.title}</h2>
            <p>{data?.section_13?.description}</p>
            <div className="btnrow">
              <a className="qbtn o" href="/lead/adviser-call">Book a free call →</a>
              <a className="qbtn out" href="/lead/adviser-call">WhatsApp us</a>
            </div>
          </div>
        </section>
      )}

      {/* CONVERSION WIDGETS */}
      <QualificationConversionCards
        sectionData={data?.section_14}
      />

      {/* NEXT STEPS FOOTER */}
      <QualificationCrosslinks
        sectionData={data?.section_15}
      />
    </div>
  );
}
