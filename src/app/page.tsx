import { SiteLayout } from "@/components/layout";
import { getCMSPageContent } from "@/services/cms.service";

export default async function Home() {
  const data = await getCMSPageContent("home");

  const renderCell = (val: string) => {
    if (val === "check" || val === "✓") return <span className="yes">✓</span>;
    if (val === "cross" || val === "✕") return <span className="no">✕</span>;
    if (val === "dash" || val === "—") return <span>—</span>;
    return <span>{val}</span>;
  };

  return (
    <SiteLayout>
      {/* SECTION 1: HERO */}
      <section className="hhero">
        <img className="hbg" src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=85" alt="" />
        <div className="hscrim"></div>
        <div className="hinner">
          <div className="hcopy">
            <span className="eyebrow glass" style={{ marginBottom: "24px" }}>Free guidance for working adults</span>
            <h1>Find a degree that builds your bright future.</h1>
            <p className="lead">Compare courses, Student Finance and flexible study routes before you apply — built for mature students and career changers.</p>
            <div className="hsearch">
              <input placeholder="Search subject, course or career…" />
              <a className="btn black" href="/degrees">Search →</a>
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "18px" }}>
              <a className="btn white lg" href="/tools/eligibility-checker">Check funding eligibility →</a>
              <a className="btn ghost lg" href="/tools">Try the free tools</a>
            </div>
            <div className="hstats">
              <div><b>2,400+</b><span>courses compared</span></div>
              <div><b>£0</b><span>always free</span></div>
              <div><b>9 tools</b><span>to plan your route</span></div>
            </div>
          </div>
          <div className="hcards">
            <a className="hcard light" href="/tools/english-level-checker">
              <span className="hk">English check</span>
              <b>Take the English test</b>
              <p>2-min level check — see if you meet course requirements.</p>
              <span className="go">Start test →</span>
            </a>
            <div className="hcard dark">
              <span className="hk">Free adviser support</span>
              <b>Not sure what to choose?</b>
              <p>Book a free adviser call before applying.</p>
              <div style={{ display: "flex", gap: "8px" }}>
                <a className="btn orange sm" href="/lead/adviser-call">Book call</a>
                <a className="btn white sm" href="/lead/contact-adviser">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FUNDING ELIGIBILITY CHECK */}
      {data?.section_2?.status !== false && (
        <section className="sec soft">
          <div className="wrap">
            <div className="g2" style={{ alignItems: "center", gap: "clamp(30px,4vw,60px)" }}>
              <div>
                <span className="eyebrow o" style={{ marginBottom: "16px" }}>{data?.section_2?.badge || "⚡ 10-second check"}</span>
                <h2 className="h1" style={{ marginBottom: "14px" }}>{data?.section_2?.title || "Could you get funding?"}</h2>
                <p className="lead">{data?.section_2?.description || "Answer three quick questions..."}</p>
              </div>
              <div className="widget" data-ysf-scope="home">
                <div className="field">
                  <label>Your age</label>
                  <select className="ysf-quick-select" data-ysf="age">
                    <option value="25-40">25–40</option>
                    <option value="41-50">41–50</option>
                    <option value="50plus">50+</option>
                  </select>
                </div>
                <div className="field">
                  <label>UK residency</label>
                  <select className="ysf-quick-select" data-ysf="residency">
                    <option value="3plus">3+ years</option>
                    <option value="settled">Settled / ILR</option>
                    <option value="under3">Under 3 years</option>
                    <option value="notsure">Not sure</option>
                  </select>
                </div>
                <div className="field">
                  <label>Previous higher education</label>
                  <select className="ysf-quick-select" data-ysf="previous">
                    <option value="none">None / incomplete</option>
                    <option value="some">Some previous study</option>
                    <option value="complete">Completed degree</option>
                    <option value="notsure">Not sure</option>
                  </select>
                </div>
                <button className="btn orange ysf-quick-button" style={{ width: "100%" }} type="button">Check eligibility →</button>
                <div className="result">
                  <div className="lbl">You're likely eligible for</div>
                  <div className="big">£14,135 + tuition</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TRUST STRIP (Section 2 sub-elements / Dot Points) */}
      <section className="sec tight">
        <div className="wrap">
          <div className="trust">
            {data?.section_2?.dot_points ? (
              data.section_2.dot_points.map((pt: string, idx: number) => (
                <span key={idx}>
                  {idx > 0 && <span className="d"></span>}
                  {pt}
                </span>
              ))
            ) : (
              <>
                <span>Trusted by adult learners across the UK</span>
                <span className="d"></span><span>✓ SFE eligible courses</span>
                <span className="d"></span><span>✓ Free adviser guidance</span>
                <span className="d"></span><span>✓ Flexible &amp; blended study</span>
                <span className="d"></span><span>✓ UCAS-style search</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: IMPACT & STATISTICS */}
      {data?.section_3?.status !== false && (
        <section className="sec">
          <div className="wrap">
            <div className="povl bleed">
              <img className="bg" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=85" alt="" />
              <div className="sc sc-blue"></div>
              <div className="inner wide">
                <span className="eyebrow glass" style={{ marginBottom: "18px" }}>{data?.section_3?.badge || "Why YStudy works"}</span>
                <h2 className="h1" style={{ color: "#fff", marginBottom: "8px" }}>{data?.section_3?.title || "Thousands have found their route."}</h2>
                <div className="impact" style={{ gridTemplateColumns: "repeat(4,auto)", justifyContent: "start", textAlign: "left", gap: "clamp(20px,3vw,48px)", marginTop: "28px" }}>
                  {data?.section_3?.statistics ? (
                    data.section_3.statistics.map((stat: any, idx: number) => (
                      <div key={idx} className="it"><b>{stat.value}</b><span>{stat.label}</span></div>
                    ))
                  ) : (
                    <>
                      <div className="it"><b>2,400+</b><span>courses compared</span></div>
                      <div className="it"><b>12,000+</b><span>learners helped</span></div>
                      <div className="it"><b>£14k+</b><span>avg support</span></div>
                      <div className="it"><b>£0</b><span>always free</span></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: POPULAR DEGREES */}
      {data?.section_4?.status !== false && (
        <section className="sec">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow o">{data?.section_4?.badge || "Popular degrees"}</span>
                <h2 className="h1" style={{ marginTop: "16px" }}>{data?.section_4?.title || "Degrees that fit real life."}</h2>
              </div>
              <a className="btn outline" href="/degrees">Browse all degrees →</a>
            </div>
            <div className="g3 ys-carousel-mobile">
              <article className="c-wrap">
                <div className="img">
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" alt="" />
                  <button className="csave" type="button" aria-pressed="false" aria-label="Save course" title="Save">
                    <span className="ho">♡</span><span className="hi">♥</span>
                  </button>
                  <span className="tag">Business</span>
                </div>
                <div className="body">
                  <h3 className="h3">BA (Hons) Business Management</h3>
                  <p className="desc">Flexible degree for management, operations and analyst roles.</p>
                  <div className="pills">
                    <span className="pill">Blended</span><span className="pill o">SFE eligible</span>
                  </div>
                  <div className="metric">
                    <span>Salary range</span><b>£24k–£55k+</b>
                  </div>
                  <div className="pills" style={{ marginTop: "16px" }}>
                    <a className="btn blue sm" href="/degrees/business">View course</a>
                    <a className="btn orange sm" href="/apply">Apply</a>
                  </div>
                </div>
              </article>
              <article className="c-wrap">
                <div className="img">
                  <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" alt="" />
                  <button className="csave" type="button" aria-pressed="false" aria-label="Save course" title="Save">
                    <span className="ho">♡</span><span className="hi">♥</span>
                  </button>
                  <span className="tag">Computing</span>
                </div>
                <div className="body">
                  <h3 className="h3">BSc Computing &amp; Cybersecurity</h3>
                  <p className="desc">Technical skills for cyber, data and digital careers.</p>
                  <div className="pills">
                    <span className="pill">Blended</span><span className="pill o">SFE eligible</span>
                  </div>
                  <div className="metric">
                    <span>Salary range</span><b>£28k–£65k+</b>
                  </div>
                  <div className="pills" style={{ marginTop: "16px" }}>
                    <a className="btn blue sm" href="/degrees/computing">View course</a>
                    <a className="btn orange sm" href="/apply">Apply</a>
                  </div>
                </div>
              </article>
              <article className="c-wrap">
                <div className="img">
                  <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80" alt="" />
                  <button className="csave" type="button" aria-pressed="false" aria-label="Save course" title="Save">
                    <span className="ho">♡</span><span className="hi">♥</span>
                  </button>
                  <span className="tag">Health</span>
                </div>
                <div className="body">
                  <h3 className="h3">BA Health &amp; Social Care</h3>
                  <p className="desc">Care, support and health-sector leadership routes.</p>
                  <div className="pills">
                    <span className="pill">Blended</span><span className="pill o">SFE eligible</span>
                  </div>
                  <div className="metric">
                    <span>Salary range</span><b>£23k–£48k+</b>
                  </div>
                  <div className="pills" style={{ marginTop: "16px" }}>
                    <a className="btn blue sm" href="/degrees/health">View course</a>
                    <a className="btn orange sm" href="/apply">Apply</a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: QUIZ WIDGET */}
      {data?.section_5?.status !== false && (
        <section className="sec soft">
          <div className="wrap">
            <div className="g2" style={{ alignItems: "center", gap: "clamp(30px,4vw,60px)" }}>
              <div>
                <span className="eyebrow b" style={{ marginBottom: "16px" }}>{data?.section_5?.badge || "🎯 Find your match in 60 seconds"}</span>
                <h2 className="h1" style={{ marginBottom: "14px" }}>{data?.section_5?.title || "Not sure which degree?"}</h2>
                <p className="lead" style={{ marginBottom: "22px" }}>{data?.section_5?.description || "Start the quiz..."}</p>
                <div className="pills">
                  {data?.section_5?.badges ? (
                    data.section_5.badges.map((b: any, idx: number) => (
                      <span key={idx} className={b.class}>{b.value}</span>
                    ))
                  ) : (
                    <>
                      <span className="pill">5 min</span>
                      <span className="pill o">Free</span>
                      <span className="pill">Personalised</span>
                    </>
                  )}
                </div>
              </div>
              <div className="widget">
                <div className="small" style={{ color: "var(--muted)", marginBottom: "14px" }}>QUESTION 1 OF 5</div>
                <h3 className="h3" style={{ marginBottom: "16px" }}>What's your main goal?</h3>
                <div style={{ display: "grid", gap: "10px" }}>
                  <div style={{ border: "2px solid var(--b)", borderRadius: "16px", padding: "16px", fontWeight: 800, background: "var(--soft)" }}>💼 Career change into a new field</div>
                  <div style={{ border: "1.5px solid var(--line)", borderRadius: "16px", padding: "16px", fontWeight: 800 }}>📈 Progress in my current career</div>
                  <div style={{ border: "1.5px solid var(--line)", borderRadius: "16px", padding: "16px", fontWeight: 800 }}>🎓 Finally get my degree</div>
                </div>
                <a className="btn black" style={{ width: "100%", marginTop: "16px" }} href="/apply">Continue →</a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6: SUBJECT LIST */}
      {data?.section_6?.status !== false && (
        <section className="sec">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow b">{data?.section_6?.badge || "Browse by subject"}</span>
                <h2 className="h1" style={{ marginTop: "16px" }}>{data?.section_6?.title || "Find your field."}</h2>
              </div>
              <a className="btn outline" href="/degrees/subjects">All subjects →</a>
            </div>
            <div className="g3 ys-carousel-mobile">
              <article className="subj"><img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="" /><div className="lab"><b>Business &amp; Management</b><span>18 courses</span></div></article>
              <article className="subj"><img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80" alt="" /><div className="lab"><b>Health &amp; Social Care</b><span>12 courses</span></div></article>
              <article className="subj"><img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" alt="" /><div className="lab"><b>Computing &amp; IT</b><span>15 courses</span></div></article>
              <article className="subj"><img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80" alt="" /><div className="lab"><b>Psychology</b><span>9 courses</span></div></article>
              <article className="subj"><img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80" alt="" /><div className="lab"><b>Construction</b><span>7 courses</span></div></article>
              <article className="subj"><img src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=800&q=80" alt="" /><div className="lab"><b>Law</b><span>6 courses</span></div></article>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 7: FREE TOOLS SYSTEM */}
      {data?.section_7?.status !== false && (
        <section className="sec soft">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow o">{data?.section_7?.badge || "Free tools"}</span>
                <h2 className="h1" style={{ marginTop: "16px" }}>{data?.section_7?.title || "Plan your route with free tools."}</h2>
              </div>
              <a className="btn outline" href="/tools">All tools →</a>
            </div>
            <div className="g4 ys-carousel-mobile">
              <article className="c-wrap tool">
                <div className="img"><img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=80" alt="" /><span className="tag">Quiz</span></div>
                <div className="body"><h3 className="h3">Degree Match</h3><p className="desc">Answer a few questions, get one recommended route.</p><a className="btn orange sm" href="/tools/degree-match">Start quiz →</a></div>
              </article>
              <article className="c-wrap tool">
                <div className="img"><img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=700&q=80" alt="" /><span className="tag">Calculator</span></div>
                <div className="body"><h3 className="h3">Finance Calculator</h3><p className="desc">Estimate tuition and maintenance support fast.</p><a className="btn orange sm" href="/tools/finance-calculator">Calculate →</a></div>
              </article>
              <article className="c-wrap tool">
                <div className="img"><img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=80" alt="" /><span className="tag">Checker</span></div>
                <div className="body"><h3 className="h3">Salary Checker</h3><p className="desc">Compare salary ranges by subject and stage.</p><a className="btn orange sm" href="/tools/eligibility-checker">Check →</a></div>
              </article>
              <article className="c-wrap tool">
                <div className="img"><img src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=700&q=80" alt="" /><span className="tag">English</span></div>
                <div className="body"><h3 className="h3">English Checker</h3><p className="desc">Check your English level before you apply.</p><a className="btn orange sm" href="/tools/english-level-checker">Start test →</a></div>
              </article>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 8: COMPARISON TABLE */}
      {data?.section_8?.status !== false && (
        <section className="sec">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow o">Why YStudy</span>
                <h2 className="h1" style={{ marginTop: "16px" }}>Why apply through us?</h2>
              </div>
              <p className="lead">Free guidance and funding clarity you don't get going direct.</p>
            </div>
            <div className="why">
              <div className="r h">
                <div>{data?.section_8?.headers?.feature_header || "What you get"}</div>
                <div>{data?.section_8?.headers?.ystudy_header || "With YStudy"}</div>
                <div>{data?.section_8?.headers?.direct_header || "Going direct"}</div>
              </div>
              {data?.section_8?.rows ? (
                data.section_8.rows.map((row: any, idx: number) => (
                  <div key={idx} className="r">
                    <div>{row.feature}</div>
                    <div>{renderCell(row.with_ystudy)}</div>
                    <div>{renderCell(row.going_direct)}</div>
                  </div>
                ))
              ) : (
                <>
                  <div className="r"><div>Free adviser guidance</div><div className="yes">✓</div><div className="no">✕</div></div>
                  <div className="r"><div>Funding &amp; eligibility check</div><div className="yes">✓</div><div className="no">✕</div></div>
                  <div className="r"><div>Compare flexible routes</div><div className="yes">✓</div><div className="no">Limited</div></div>
                  <div className="r"><div>Application support</div><div className="yes">✓</div><div className="no">✕</div></div>
                  <div className="r"><div>Always free</div><div className="yes">✓</div><div className="no">—</div></div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 9: STUDENT FINANCE BANNER & CALCULATOR */}
      {data?.section_9?.status !== false && (
        <section className="sec soft">
          <div className="wrap">
            <div className="povl bleed">
              <img className="bg" src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2000&q=85" alt="" />
              <div className="sc sc-orange"></div>
              <div className="inner wide" style={{ maxWidth: "100%", display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: "clamp(28px,3.5vw,56px)", alignItems: "center", width: "100%" }}>
                <div>
                  <span className="eyebrow glass" style={{ marginBottom: "16px" }}>{data?.section_9?.badge || "Student Finance Hub"}</span>
                  <h2 className="h2" style={{ color: "#fff", marginBottom: "14px" }}>{data?.section_9?.title || "How much could you get?"}</h2>
                  <p className="lead" style={{ color: "#fff", opacity: 0.92, marginBottom: "24px", maxWidth: "460px" }}>{data?.section_9?.description || "Understand tuition loans..."}</p>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <a className="btn black lg" href="/tools/finance-calculator">Open calculator →</a>
                    <a className="btn white lg" href="/funding">Read funding guide</a>
                  </div>
                </div>
                <div className="widget">
                  <h3 className="h3" style={{ marginBottom: "16px" }}>Finance calculator</h3>
                  <div className="g2" style={{ gap: "12px" }}>
                    <div className="field"><label>Household income</label><div className="inp">£25k–£30k</div></div>
                    <div className="field"><label>Location</label><div className="inp">London</div></div>
                  </div>
                  <a className="btn orange" style={{ width: "100%" }} href="/tools/finance-calculator">Calculate →</a>
                  <div className="result"><div className="lbl">Total support</div><div className="big">£23,925</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 10: IMMIGRATION STATUS CHECK */}
      {data?.section_10?.status !== false && (
        <section className="sec ink">
          <div className="wrap">
            <div className="g2" style={{ alignItems: "start", gap: "clamp(28px,3.5vw,56px)" }}>
              <div>
                <span className="eyebrow gold" style={{ marginBottom: "16px" }}>{data?.section_10?.badge || "Residency status check"}</span>
                <h2 className="h1" style={{ color: "#fff", marginBottom: "14px" }}>{data?.section_10?.title || "Student finance eligibility by immigration status."}</h2>
                <p className="lead" style={{ color: "#aebed6", marginBottom: "20px" }}>{data?.section_10?.description || "Use this before you choose..."}</p>
                <div className="note-box">
                  <b>{data?.section_10?.important_box?.title || "Important"}</b>
                  <p>{data?.section_10?.important_box?.text || "Eligibility still depends on..."}</p>
                </div>
              </div>
              <div className="imm-grid">
                {data?.section_10?.status_cards ? (
                  data.section_10.status_cards.map((card: any, idx: number) => (
                    <article key={idx} className="imm">
                      <div className="top">
                        <span className="code">{card.code}</span>
                        <span className="badge full">{card.badge}</span>
                      </div>
                      <p className="desc">{card.description}</p>
                    </article>
                  ))
                ) : (
                  <>
                    <article className="imm"><div className="top"><span className="code">UK</span><span className="badge full">Full support route</span></div><p className="desc">Usually able to apply for Tuition Fee Loan and Maintenance Loan if England residence and course rules are met.</p></article>
                    <article className="imm"><div className="top"><span className="code">ILR</span><span className="badge full">Full support route</span></div><p className="desc">Usually treated as settled. Check England home address and continuous residence before the course starts.</p></article>
                    <article className="imm"><div className="top"><span className="code">EU</span><span className="badge full">Full support route</span></div><p className="desc">Can be a strong full-support route where the student meets residence, course and age requirements.</p></article>
                    <article className="imm"><div className="top"><span className="code">RF</span><span className="badge prot">Protected status</span></div><p className="desc">Often eligible under protected-status rules, but evidence and exact status wording must be checked carefully.</p></article>
                  </>
                )}
                {data?.section_10?.ps_box && (
                  <article className="imm dark" style={{ gridColumn: "1/-1" }}>
                    <div className="top">
                      <span className="code">{data.section_10.ps_box.code}</span>
                      <span className="badge part">{data.section_10.ps_box.badge}</span>
                    </div>
                    <h4>{data.section_10.ps_box.title}</h4>
                    <p className="desc">{data.section_10.ps_box.description}</p>
                  </article>
                )}
              </div>
            </div>
            <p className="small" style={{ color: "#7e90ad", marginTop: "24px" }}>{data?.section_10?.disclaimer || "Guidance based on GOV.UK..."}</p>
          </div>
        </section>
      )}

      {/* SECTION 11: SALARY PROJECTION */}
      {data?.section_11?.status !== false && (
        <section className="sec">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow o">{data?.section_11?.badge || "Salary projection"}</span>
                <h2 className="h1" style={{ marginTop: "16px" }}>{data?.section_11?.title || "What could your route look like?"}</h2>
              </div>
              <p className="lead">{data?.section_11?.description || "Salary cards create a stronger decision signal..."}</p>
            </div>
            <div className="sal-grid" style={{ marginBottom: "30px" }}>
              {data?.section_11?.projection_cards ? (
                data.section_11.projection_cards.map((c: any, idx: number) => (
                  <article key={idx} className="sal">
                    <div className="stage">{c.level}</div>
                    <div className="yr">{c.years}</div>
                    <div className="amt">{c.salary}</div>
                    <div className="role">{c.description}</div>
                  </article>
                ))
              ) : (
                <>
                  <article className="sal"><div className="stage">Entry</div><div className="yr">Year 1</div><div className="amt">£28k</div><div className="role">Graduate or junior role.</div></article>
                  <article className="sal"><div className="stage">Junior</div><div className="yr">Year 2–3</div><div className="amt">£36k</div><div className="role">Specialist or team role.</div></article>
                  <article className="sal"><div className="stage">Mid-career</div><div className="yr">Year 4–6</div><div className="amt">£47k</div><div className="role">Manager or analyst role.</div></article>
                  <article className="sal"><div className="stage">Senior</div><div className="yr">Year 7+</div><div className="amt">£75k+</div><div className="role">Senior management path.</div></article>
                </>
              )}
            </div>
            {data?.section_11?.cta_banner && (
              <div className="sal-band">
                <div>
                  <h3 className="h2" style={{ marginBottom: "8px", color: "#fff" }}>{data.section_11.cta_banner.title}</h3>
                  <p style={{ color: "#cdd9ec", fontWeight: 600 }}>{data.section_11.cta_banner.subtitle}</p>
                </div>
                <a className="btn orange lg" href="/tools/salary-checker">Open Salary Checker →</a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* SECTION 12: HONEST TRUTH ABOUT STUDENT FINANCE */}
      {data?.section_12?.status !== false && (
        <section className="sec ink">
          <div className="wrap">
            <div className="g2" style={{ alignItems: "center", gap: "clamp(28px,3.5vw,56px)" }}>
              <div>
                <span className="eyebrow gold" style={{ marginBottom: "16px" }}>{data?.section_12?.badge || "The honest truth about Student Finance"}</span>
                <h2 className="h1" style={{ color: "#fff", marginBottom: "14px" }}>{data?.section_12?.title || "It's a loan — but a fair one."}</h2>
                <p className="lead" style={{ color: "#aebed6", marginBottom: "24px" }}>{data?.section_12?.description || "Student Finance is often misunderstood..."}</p>
                <a className="btn white lg" href="/funding/maintenance-loan">See full repayment details →</a>
              </div>
              <div style={{ display: "grid", gap: "14px" }}>
                {data?.section_12?.truth_cards ? (
                  data.section_12.truth_cards.map((c: any, idx: number) => (
                    <div key={idx} className="note-box">
                      <b>{c.title}</b>
                      <p>{c.description}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="note-box"><b>It's a loan, not a grant</b><p>Tuition is paid to university. Maintenance is paid to you.</p></div>
                    <div className="note-box"><b>You only repay above £25,000</b><p>Repayment is based on income, not the balance.</p></div>
                    <div className="note-box"><b>Wiped after 30 / 40 years</b><p>Many graduates do not repay the full amount.</p></div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* INTAKE STRIP */}
      {data?.section_12?.next_intake && (
        <section className="sec tight">
          <div className="wrap">
            <div style={{ background: "linear-gradient(135deg,var(--b-deep),var(--b))", color: "#fff", borderRadius: "20px", padding: "22px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "18px", flexWrap: "wrap" }}>
              <div>
                <b style={{ fontSize: "21px", fontWeight: 900 }}>{data.section_12.next_intake.title}</b>
                <div style={{ color: "#cdd9ec", fontWeight: 700 }}>{data.section_12.next_intake.description}</div>
              </div>
              <a className="btn white" href="/apply">Start your application →</a>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 13: SUCCESS STORIES */}
      {data?.section_13?.status !== false && (
        <section className="sec">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow o">{data?.section_13?.badge || "Success stories"}</span>
                <h2 className="h1" style={{ marginTop: "16px" }}>{data?.section_13?.title || "Real people. Real routes."}</h2>
              </div>
              <a className="btn outline" href="/success-stories">More stories →</a>
            </div>
            <div className="g3 ys-carousel-mobile">
              {data?.section_13?.card ? (
                data.section_13.card.map((c: any, idx: number) => {
                  const fallbackImages = [
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80",
                    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=700&q=80"
                  ];
                  return (
                    <article key={idx} className="c-full" style={{ minHeight: "clamp(340px,30vw,420px)" }}>
                      <img src={c.fullImageUrl || c.image || fallbackImages[idx % 3]} alt="" />
                      <div className="sc"></div>
                      <div className="inner">
                        <div style={{ color: "var(--o-gold)", fontWeight: 900, letterSpacing: "2px", marginBottom: "8px" }}>★★★★★</div>
                        <h3 className="h3" style={{ marginBottom: "14px", color: "#fff" }}>"{c.title}"</h3>
                        <b style={{ fontWeight: 900 }}>{c.name}</b>
                        <span style={{ display: "block", color: "#cdd9ec", fontSize: "13px", fontWeight: 700 }}>{c.year}</span>
                      </div>
                    </article>
                  );
                })
              ) : (
                <>
                  <article className="c-full" style={{ minHeight: "clamp(340px,30vw,420px)" }}>
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80" alt="" />
                    <div className="sc"></div>
                    <div className="inner">
                      <div style={{ color: "var(--o-gold)", fontWeight: 900, letterSpacing: "2px", marginBottom: "8px" }}>★★★★★</div>
                      <h3 className="h3" style={{ marginBottom: "14px", color: "#fff" }}>"A degree that fits around my kids."</h3>
                      <b style={{ fontWeight: 900 }}>Aisha M.</b>
                      <span style={{ display: "block", color: "#cdd9ec", fontSize: "13px", fontWeight: 700 }}>Year 2 · Business Management</span>
                    </div>
                  </article>
                  <article className="c-full" style={{ minHeight: "clamp(340px,30vw,420px)" }}>
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80" alt="" />
                    <div className="sc"></div>
                    <div className="inner">
                      <div style={{ color: "var(--o-gold)", fontWeight: 900, letterSpacing: "2px", marginBottom: "8px" }}>★★★★★</div>
                      <h3 className="h3" style={{ marginBottom: "14px", color: "#fff" }}>"The adviser showed me a route."</h3>
                      <b style={{ fontWeight: 900 }}>James T.</b>
                      <span style={{ display: "block", color: "#cdd9ec", fontSize: "13px", fontWeight: 700 }}>Year 1 · Computing</span>
                    </div>
                  </article>
                  <article className="c-full" style={{ minHeight: "clamp(340px,30vw,420px)" }}>
                    <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=700&q=80" alt="" />
                    <div className="sc"></div>
                    <div className="inner">
                      <div style={{ color: "var(--o-gold)", fontWeight: 900, letterSpacing: "2px", marginBottom: "8px" }}>★★★★★</div>
                      <h3 className="h3" style={{ marginBottom: "14px", color: "#fff" }}>"Best decision I've made."</h3>
                      <b style={{ fontWeight: 900 }}>Priya K.</b>
                      <span style={{ display: "block", color: "#cdd9ec", fontSize: "13px", fontWeight: 700 }}>Year 2 · Health &amp; Social Care</span>
                    </div>
                  </article>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 14: GUIDES & NEWS */}
      {data?.section_14?.status !== false && (
        <section className="sec soft">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow o">{data?.section_14?.badge || "Guides & news"}</span>
                <h2 className="h1" style={{ marginTop: "16px" }}>{data?.section_14?.title || "Read before you decide."}</h2>
              </div>
              <a className="btn outline" href="/guides">All guides →</a>
            </div>
            <div className="g3 ys-carousel-mobile">
              {data?.section_14?.card ? (
                data.section_14.card.map((c: any, idx: number) => {
                  const fallbackImages = [
                    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80"
                  ];
                  return (
                    <article key={idx} className="c-wrap">
                      <div className="img" style={{ height: "170px" }}>
                        <img src={c.fullImageUrl || c.image || fallbackImages[idx % 3]} alt="" />
                        <span className="tag">{c.badge}</span>
                      </div>
                      <div className="body">
                        <h3 className="h3">{c.title}</h3>
                        <p className="desc">{c.description}</p>
                        <div className="metric"><span>{c.time}</span><b style={{ color: "var(--b)", fontSize: "15px" }}>Read →</b></div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <>
                  <article className="c-wrap">
                    <div className="img" style={{ height: "170px" }}>
                      <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80" alt="" />
                      <span className="tag">Funding</span>
                    </div>
                    <div className="body">
                      <h3 className="h3">Maintenance Loan explained</h3>
                      <p className="desc">What affects your amount and how it's paid termly.</p>
                      <div className="metric"><span>5 min read</span><b style={{ color: "var(--b)", fontSize: "15px" }}>Read →</b></div>
                    </div>
                  </article>
                  <article className="c-wrap">
                    <div className="img" style={{ height: "170px" }}>
                      <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="" />
                      <span className="tag">Applying</span>
                    </div>
                    <div className="body">
                      <h3 className="h3">Personal statement structure</h3>
                      <p className="desc">The four sections admissions teams expect.</p>
                      <div className="metric"><span>7 min read</span><b style={{ color: "var(--b)", fontSize: "15px" }}>Read →</b></div>
                    </div>
                  </article>
                  <article className="c-wrap">
                    <div className="img" style={{ height: "170px" }}>
                      <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80" alt="" />
                      <span className="tag">Careers</span>
                    </div>
                    <div className="body">
                      <h3 className="h3">Which degree pays off?</h3>
                      <p className="desc">Salary outcomes by subject and route.</p>
                      <div className="metric"><span>8 min read</span><b style={{ color: "var(--b)", fontSize: "15px" }}>Read →</b></div>
                    </div>
                  </article>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 15: STUDENT JOURNEY / ORBIT DECO */}
      {data?.section_15?.status !== false && (
        <section className="sec ink">
          <div className="wrap">
            <div className="g2" style={{ alignItems: "center", gap: "clamp(28px,3.5vw,56px)" }}>
              <div>
                <span className="eyebrow gold" style={{ marginBottom: "16px" }}>{data?.section_15?.badge || "Student journey"}</span>
                <h2 className="h1" style={{ color: "#fff", marginBottom: "14px" }}>{data?.section_15?.title || "How YStudy supports you."}</h2>
                <p className="lead" style={{ color: "#aebed6", marginBottom: "24px" }}>{data?.section_15?.description || "One guided path — not a maze..."}</p>
                <div className="note-box home-journey-note" style={{ marginBottom: "22px" }}>
                  <b style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span className="home-journey-num" style={{ width: "30px", height: "30px", borderRadius: "9px", background: "var(--b)", display: "grid", placeItems: "center", fontSize: "14px" }}>1</span>
                    <span className="home-journey-title">Check if university fits your life</span>
                  </b>
                  <p className="home-journey-text">Start with your work pattern, family time, travel and study confidence.</p>
                </div>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <a className="btn orange lg" href="/apply">Start my journey →</a>
                  <a className="btn white lg" href="/lead/adviser-call">Talk to adviser</a>
                </div>
              </div>
              <div className="orbit-deco" style={{ position: "relative", width: "600px", height: "600px", maxWidth: "100%", margin: "0 auto", background: "radial-gradient(circle at 50% 50%,rgba(255,255,255,.04),transparent 70%)", borderRadius: "30px", border: "1px solid rgba(255,255,255,.1)", transform: "scale(min(1,calc(100% / 600)))" }}>
                <div style={{ position: "absolute", left: "300.0px", top: "60.0px", transform: "translate(-50%,-50%)", width: "108px", height: "108px", borderRadius: "24px", background: "#2f6fe0", boxShadow: "0 14px 34px rgba(0,0,0,.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <span style={{ fontSize: "10px", fontWeight: 900, opacity: 0.85, textTransform: "uppercase", letterSpacing: ".05em" }}>Step 1</span><b style={{ fontSize: "16px", fontWeight: 900 }}>Life fit</b>
                </div>
                <div style={{ position: "absolute", left: "469.7056274847714px", top: "130.29437251522862px", transform: "translate(-50%,-50%)", width: "108px", height: "108px", borderRadius: "24px", background: "#2ec4b6", boxShadow: "0 14px 34px rgba(0,0,0,.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <span style={{ fontSize: "10px", fontWeight: 900, opacity: 0.85, textTransform: "uppercase", letterSpacing: ".05em" }}>Step 2</span><b style={{ fontSize: "16px", fontWeight: 900 }}>Course</b>
                </div>
                <div style={{ position: "absolute", left: "540.0px", top: "300.0px", transform: "translate(-50%,-50%)", width: "108px", height: "108px", borderRadius: "24px", background: "#2ecc71", boxShadow: "0 14px 34px rgba(0,0,0,.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <span style={{ fontSize: "10px", fontWeight: 900, opacity: 0.85, textTransform: "uppercase", letterSpacing: ".05em" }}>Step 3</span><b style={{ fontSize: "16px", fontWeight: 900 }}>English</b>
                </div>
                <div style={{ position: "absolute", left: "469.7056274847714px", top: "469.7056274847714px", transform: "translate(-50%,-50%)", width: "108px", height: "108px", borderRadius: "24px", background: "#f08000", boxShadow: "0 14px 34px rgba(0,0,0,.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <span style={{ fontSize: "10px", fontWeight: 900, opacity: 0.85, textTransform: "uppercase", letterSpacing: ".05em" }}>Step 4</span><b style={{ fontSize: "16px", fontWeight: 900 }}>Interview</b>
                </div>
                <div style={{ position: "absolute", left: "300.0px", top: "540.0px", transform: "translate(-50%,-50%)", width: "108px", height: "108px", borderRadius: "24px", background: "#a64ac9", boxShadow: "0 14px 34px rgba(0,0,0,.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <span style={{ fontSize: "10px", fontWeight: 900, opacity: 0.85, textTransform: "uppercase", letterSpacing: ".05em" }}>Step 5</span><b style={{ fontSize: "16px", fontWeight: 900 }}>Apply</b>
                </div>
                <div style={{ position: "absolute", left: "130.29437251522862px", top: "469.7056274847714px", transform: "translate(-50%,-50%)", width: "108px", height: "108px", borderRadius: "24px", background: "#0a52d6", boxShadow: "0 14px 34px rgba(0,0,0,.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <span style={{ fontSize: "10px", fontWeight: 900, opacity: 0.85, textTransform: "uppercase", letterSpacing: ".05em" }}>Step 6</span><b style={{ fontSize: "16px", fontWeight: 900 }}>SFE</b>
                </div>
                <div style={{ position: "absolute", left: "60.0px", top: "300.00000000000006px", transform: "translate(-50%,-50%)", width: "108px", height: "108px", borderRadius: "24px", background: "#e85d75", boxShadow: "0 14px 34px rgba(0,0,0,.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <span style={{ fontSize: "10px", fontWeight: 900, opacity: 0.85, textTransform: "uppercase", letterSpacing: ".05em" }}>Step 7</span><b style={{ fontSize: "16px", fontWeight: 900 }}>Enrol</b>
                </div>
                <div style={{ position: "absolute", left: "130.29437251522856px", top: "130.29437251522862px", transform: "translate(-50%,-50%)", width: "108px", height: "108px", borderRadius: "24px", background: "#f0c040", boxShadow: "0 14px 34px rgba(0,0,0,.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <span style={{ fontSize: "10px", fontWeight: 900, opacity: 0.85, textTransform: "uppercase", letterSpacing: ".05em" }}>Step 8</span><b style={{ fontSize: "16px", fontWeight: 900 }}>Support</b>
                </div>
                <div style={{ position: "absolute", left: "300px", top: "300px", transform: "translate(-50%,-50%)", width: "200px", height: "200px", borderRadius: "50%", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", boxShadow: "0 20px 50px rgba(0,0,0,.4)" }}>
                  <span style={{ color: "var(--o)", fontWeight: 900, fontSize: "13px", letterSpacing: ".05em" }}>YSTUDY</span>
                  <b style={{ fontSize: "20px", fontWeight: 900, color: "var(--ink)", lineHeight: 1.05, marginTop: "4px" }}>Your University Journey</b>
                  <span style={{ color: "var(--muted)", fontWeight: 700, fontSize: "13px", marginTop: "6px" }}>Clear next step</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 16: BREAKER QUOTE */}
      {data?.section_16?.status !== false && (
        <section className="sec">
          <div className="wrap">
            <div className="breaker">
              <div className="mark">“</div>
              <blockquote>{data?.section_16?.title || "You're not behind. You're exactly where..."}</blockquote>
              <div className="by">{data?.section_16?.description || "— The YStudy promise to every adult learner"}</div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 17: HOW IT WORKS / FAQ */}
      {data?.section_17?.status !== false && (
        <>
          <section className="sec">
            <div className="wrap">
              <div className="shead">
                <span className="eyebrow b">{data?.section_17?.badge || "How it works"}</span>
                <h2 className="h1" style={{ marginTop: "16px" }}>{data?.section_17?.title || "From unsure to enrolled, in four steps."}</h2>
              </div>
              <div className="steps">
                <div className="step"><div className="n">1</div><h3 className="h3">Find your route</h3><p className="desc">Use the match finder or search to shortlist degrees that fit your life.</p></div>
                <div className="step"><div className="n">2</div><h3 className="h3">Check funding</h3><p className="desc">See your Student Finance support with the free calculator.</p></div>
                <div className="step"><div className="n">3</div><h3 className="h3">Apply with support</h3><p className="desc">A free adviser helps with documents, choices and your application.</p></div>
                <div className="step"><div className="n">4</div><h3 className="h3">Start studying</h3><p className="desc">Begin a flexible degree built around work and family.</p></div>
              </div>
            </div>
          </section>

          <section className="sec soft">
            <div className="wrap">
              <div className="shead" style={{ textAlign: "center" }}>
                <span className="eyebrow o">{data?.section_17?.faq?.[0]?.badge || "FAQ"}</span>
                <h2 className="h1" style={{ marginTop: "16px" }}>{data?.section_17?.faq?.[0]?.title || "Quick answers."}</h2>
              </div>
              <div className="faq">
                {data?.section_17?.faq?.[0]?.faq_card ? (
                  data.section_17.faq[0].faq_card.map((item: any, idx: number) => (
                    <div key={idx} className="q">
                      <h3 className="h3">{item.title}</h3>
                      <p className="desc">{item.description}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="q"><h3 className="h3">Is YStudy really free?</h3><p className="desc">Yes — guidance, tools and adviser support are always free. We're funded by partner universities, not by you.</p></div>
                    <div className="q"><h3 className="h3">Am I too old to study?</h3><p className="desc">No. Our courses are built for adult learners and career changers — many students are 25, 35, 45+.</p></div>
                    <div className="q"><h3 className="h3">Do I need existing qualifications?</h3><p className="desc">Not always. Foundation years and Access routes exist for people without traditional A-levels.</p></div>
                    <div className="q"><h3 className="h3">Will I get funding?</h3><p className="desc">Most eligible UK residents can access tuition and maintenance loans. Use the eligibility check to see your likely support.</p></div>
                  </>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* SECTION 18: REFER A FRIEND */}
      {data?.section_18?.status !== false && (
        <section className="sec soft">
          <div className="wrap">
            <div className="g2" style={{ alignItems: "center", gap: "clamp(28px,3.5vw,56px)" }}>
              <div>
                <span className="eyebrow o" style={{ marginBottom: "16px" }}>{data?.section_18?.badge || "Refer a friend"}</span>
                <h2 className="h1" style={{ marginBottom: "14px" }}>{data?.section_18?.title || "Know someone who'd thrive at university?"}</h2>
                <p className="lead" style={{ marginBottom: "24px" }}>{data?.section_18?.description || "Pass on their details, with permission..."}</p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <a className="btn blue lg" href="/partners/refer-a-friend">Read more &amp; refer someone →</a>
                  <a className="btn outline lg" href="/lead/adviser-call">Check adviser details →</a>
                </div>
              </div>
              <div className="refer-grid">
                {data?.section_18?.card ? (
                  data.section_18.card.map((c: any, idx: number) => {
                    const fallbackImages = [
                      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=700&q=80",
                      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80",
                      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80",
                      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=700&q=80"
                    ];
                    return (
                      <article key={idx} className="refer">
                        <img src={c.fullImageUrl || c.image || fallbackImages[idx % 4]} alt="" />
                        <div className="sc"></div>
                        <div className="in">
                          <span className="tg">{c.badge}</span>
                          <h4>{c.title}</h4>
                          <p>{c.description}</p>
                        </div>
                      </article>
                    );
                  })
                ) : (
                  <>
                    <article className="refer"><img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=700&q=80" alt="" /><div className="sc"></div><div className="in"><span className="tg">Most common</span><h4>Content creators</h4><p>TikTok, Instagram, YouTube — for UK adults thinking about study or career change.</p></div></article>
                    <article className="refer"><img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80" alt="" /><div className="sc"></div><div className="in"><span className="tg">Highest trust</span><h4>Community voices</h4><p>Facebook groups, WhatsApp communities and local networks.</p></div></article>
                    <article className="refer"><img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80" alt="" /><div className="sc"></div><div className="in"><span className="tg">Real stories</span><h4>Peer mentors</h4><p>You went back to university and want to help others.</p></div></article>
                    <article className="refer"><img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=700&q=80" alt="" /><div className="sc"></div><div className="in"><span className="tg">Long-form</span><h4>Bloggers &amp; podcasters</h4><p>Education, careers, mature study or money content.</p></div></article>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 19: ADVISER CALL BANNER */}
      {data?.section_19?.status !== false && (
        <section className="sec">
          <div className="wrap">
            <div className="povl bleed" style={{ minHeight: "clamp(360px,32vw,460px)" }}>
              <img className="bg" src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=85" alt="" />
              <div className="sc sc-blue"></div>
              <div className="inner">
                <span className="eyebrow gold" style={{ marginBottom: "16px" }}>{data?.section_19?.badge || "Free adviser support"}</span>
                <h2 className="h1" style={{ color: "#fff", marginBottom: "14px" }}>{data?.section_19?.title || "Not sure what to choose?"}</h2>
                <p className="lead" style={{ color: "#fff", opacity: 0.92, marginBottom: "26px", maxWidth: "480px" }}>{data?.section_19?.description || "Book a free call with a real adviser..."}</p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <a className="btn orange lg" href="/lead/adviser-call">Book a free call →</a>
                  <a className="btn white lg" href="/lead/contact-adviser">WhatsApp us</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 20: FINAL CTA */}
      {data?.section_20?.status !== false && (
        <section className="sec">
          <div className="wrap">
            <div className="finalcta">
              <h2 className="display" style={{ color: "#fff" }}>{data?.section_20?.title || "Your future starts with one step."}</h2>
              <p className="lead">{data?.section_20?.description || "Find your degree, check your funding and apply..."}</p>
              <div className="row">
                <a className="btn black lg" href="/apply">Start your application →</a>
                <a className="btn white lg" href="/lead/adviser-call">Book adviser call</a>
              </div>
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
