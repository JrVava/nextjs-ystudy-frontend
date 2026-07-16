import { getCMSPageContent } from "@/services/cms.service";
import "@/app/degrees/qualifications/qualifications.css";
import { Banner } from "@/components/ui/Banner";

export default async function FoundationYear() {
  const data = await getCMSPageContent("foundation-year");

  return (
    <div className="qualification-page foundation-year-page">
      {/* HERO SECTION DYNAMIZED WITH BANNER MODULE */}
      <Banner
        slug="foundation-year"
        fallbackTitle="Foundation Year (Year 0) Route"
        fallbackDescription="Learn how an integrated Foundation Year (Year 0) works as a standard funding-supported entry route for mature students."
        fallbackBadgeText="Foundation Year · Year 0 · 2026/27"
        fallbackBgImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2200&q=80"
      >
        <div style={{ textAlign: "left", width: "100%" }}>
          <p className="bc" style={{ margin: "0 0 16px", color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>
            <a href="/" style={{ color: "#fff", textDecoration: "none" }}>Home</a> ›{" "}
            <a href="/degrees" style={{ color: "#fff", textDecoration: "none" }}>Degrees</a> ›{" "}
            <a href="/degrees" style={{ color: "#fff", textDecoration: "none" }}>Qualifications</a> › Foundation Year
          </p>
          
          <div className="statrow" style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginTop: "16px" }}>
            {data?.section_2?.foundationTimeLine && (
              data.section_2.foundationTimeLine.map((st: any, idx: number) => (
                <div className="st" key={idx}>
                  <b style={{ fontSize: "1.75rem", color: "#fff", display: "block" }}>{st.title}</b>
                  <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>{st.description}</span>
                </div>
              ))
            )}
          </div>

          <div className="btnrow" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}>
            <a className="btn orange" href="/tools/eligibility-checker">Check eligibility →</a>
            <a className="btn ghost" href="/degrees#results">Browse matching courses</a>
          </div>
        </div>
      </Banner>

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
      {data?.section_14?.status !== false && (
        <section className="ys-conversion-system" aria-label="YStudy next steps">
          <div className="ys-conversion-wrap">
            {data?.section_14?.cards && (
              data.section_14.cards.map((c: any, idx: number) => {
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

      {/* NEXT STEPS FOOTER */}
      {data?.section_15?.status !== false && (
        <section className="ys-crosslinks" aria-label="Useful links">
          <div className="inner" style={{ textAlign: "left" }}>
            <div>
              <h2>{data?.section_15?.title}</h2>
              <p>{data?.section_15?.description}</p>
            </div>
            <div className="ys-link-grid">
              {data?.section_15?.cards && (
                data.section_15.cards.map((c: any, idx: number) => {
                  let href = "/degrees";
                  if (idx === 1) href = "/funding";
                  else if (idx === 2) href = "/careers";
                  else if (idx === 3) href = "/tools/degree-match";
                  else if (idx === 4) href = "/tools/salary-checker";
                  else if (idx === 5) href = "/guides";

                  return (
                    <a href={href} key={idx}>
                      {c.title}
                    </a>
                  );
                })
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
