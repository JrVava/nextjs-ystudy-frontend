import { getCMSPageContent } from "@/services/cms.service";
import { Banner } from "@/components/ui/Banner";
import {
  getSubjects,
  getQualifications,
  getModes,
  getDurations,
  getFundings
} from "@/services/filters.service";

import { DegreesPageNav } from "@/components/layout/DegreesPageNav";

export default async function Degrees() {
  const [
    data,
    subjects,
    qualifications,
    modes,
    durations,
    fundings
  ] = await Promise.all([
    getCMSPageContent("degrees"),
    getSubjects(),
    getQualifications(),
    getModes(),
    getDurations(),
    getFundings()
  ]);

  return (
    <div className="degrees-page-content">
      <DegreesPageNav activeTab="search" />
      {/* HERO SECTION DYNAMIZED WITH BANNER MODULE */}
      <Banner
        slug="degrees"
        fallbackTitle="Find a degree that fits your life."
        fallbackDescription="Set your filters, then search 200+ SFE-eligible courses built for working adults."
        fallbackBadgeText="Search all degrees"
        fallbackBgImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: 'stats-highlight' as const,
          title: 'Snapshot',
          mainValue: '200+',
          items: [
            { value: 'SFE', subtitle: 'Eligible courses' },
            { value: '100%', subtitle: 'Free adviser support' }
          ]
        }}
      >
        <form className="dsx-console" action="#results" style={{ width: "100%", margin: "24px 0 0 0" }}>
          <div className="dsx-frow">
            <div className="dsx-fsel">
              <label>Subject</label>
              <select>
                <option>Any subject</option>
                {subjects.map((item) => (
                  <option key={item._id} value={item.title}>{item.title}</option>
                ))}
              </select>
            </div>
            <div className="dsx-fsel">
              <label>Qualification</label>
              <select>
                <option>Any qualification</option>
                {qualifications.map((item) => (
                  <option key={item._id} value={item.title}>{item.title}</option>
                ))}
              </select>
            </div>
            <div className="dsx-fsel">
              <label>Mode</label>
              <select>
                <option>Any mode</option>
                {modes.map((item) => (
                  <option key={item._id} value={item.title}>{item.title}</option>
                ))}
              </select>
            </div>
            <div className="dsx-fsel">
              <label>Location</label>
              <select>
                <option>Any location</option>
                <option>London</option>
                <option>Birmingham</option>
                <option>Manchester</option>
                <option>Online</option>
                <option>Multiple locations</option>
              </select>
            </div>
            <div className="dsx-fsel">
              <label>Duration</label>
              <select>
                <option>Any duration</option>
                {durations.map((item) => (
                  <option key={item._id} value={item.title}>{item.title}</option>
                ))}
              </select>
            </div>
            <div className="dsx-fsel">
              <label>Funding</label>
              <select>
                <option>Any funding</option>
                {fundings.map((item) => (
                  <option key={item._id} value={item.title}>{item.title}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="dsx-srow">
            <span className="dsx-iwrap">
              <svg className="dsx-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2.6" />
                <line x1="15.6" y1="15.6" x2="21" y2="21" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
              </svg>
              <input aria-label="Search degrees" placeholder="Type subject, career or keyword…" />
            </span>
            <a className="dsx-search" href="#results">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ width: "19px", height: "19px", marginRight: "9px" }}>
                <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2.8" />
                <line x1="15.6" y1="15.6" x2="21" y2="21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Search
            </a>
          </div>
        </form>
      </Banner>

      {/* FILTER RESULT COUNTS BAR */}
      <div className="dsx-bar">
        <div className="dsx-in2">
          <span className="dsx-count">Showing <em>28</em> courses</span>
          <div className="dsx-sp"></div>
          <div className="dsx-sort"><span>Sort:</span> Best match ▾</div>
          <div className="dsx-view">
            <button type="button" className="on">▦ Grid</button>
            <button type="button">☰ List</button>
          </div>
        </div>
      </div>

      {/* RESULT CARDS CONTAINER */}
      <section className="sec white results-section-compact" id="results">
        <div className="wrap">
          <div className="search-shell degree-results-main">
            <main style={{ float: "none", width: "100%", padding: 0 }}>
              <div className="search-card-grid course-carousel" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "18px" }}>
                {(data?.featured_courses || []).map((c: any, idx: number) => (
                  <article key={idx} className="grid-result-card">
                    <div className="grid-result-img">
                      <img alt="" src={c.image} />
                      <div className="grid-match"><div><strong>{c.match}</strong><small>Match</small></div></div>
                      <div className="grid-save">♡</div>
                      <div className="grid-label">{c.tag}</div>
                    </div>
                    <div className="grid-result-body">
                      <h3>{c.title}</h3>
                      <p>{c.description}</p>
                      <div className="pills">
                        {c.pills?.map((p: string, pIdx: number) => (
                          <span key={pIdx} className="pill">{p}</span>
                        ))}
                      </div>
                      <div className="two-metrics">
                        {c.metrics?.map((m: any, mIdx: number) => (
                          <div key={mIdx} className="small-metric">
                            <span>{m.label}</span>
                            <strong>{m.value}</strong>
                          </div>
                        ))}
                      </div>
                      <div className="btnrow">
                        <a className="btn btn-blue" href={c.link}>View course</a>
                        <a className="btn btn-orange" href="/apply">Apply</a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="dsx-viewall"><a className="btn btn-blue" href="#results">View all 28 courses →</a><span>Showing top 3 matches</span></div>

              {/* SHORTLIST COMPARE BAR */}
              {data?.section_3?.status !== false && (
                <div className="compare-bar" style={{ marginTop: "34px" }}>
                  <div>
                    <h3>{data?.section_3?.title}</h3>
                    <p>{data?.section_3?.description}</p>
                    <div className="compare-tags">
                      {data?.section_3?.compare_tags?.map((tag: string, idx: number) => (
                        <span key={idx}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <a className="btn btn-orange" href="/tools/degree-match">Run Degree Match Finder →</a>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* BROWSE DISCOVERY CATEGORIES */}
      <section className="sdx-discovery" id="browse-by-category">
        <div className="wrap">
          {/* SUBJECTS BLOCK */}
          {data?.section_4?.status !== false && (
            <div className="sdx-block" id="courses-by-subject">
              <div className="sdx-head">
                <div>
                  <h2>{data?.section_4?.title}</h2>
                  <p>{data?.section_4?.description}</p>
                </div>
                <div className="sdx-controls">
                  <button className="sdx-ctrl" type="button">‹</button>
                  <button className="sdx-ctrl" type="button">›</button>
                </div>
              </div>
              <div className="sdx-row">
                {data?.section_4?.subjects?.map((s: any, idx: number) => (
                  <a key={idx} className="sdx-card" href={s.link}>
                    <div className="sdx-photo">
                      <img src={s.image} alt="" />
                      <span className="sdx-badge">{s.badge}</span>
                    </div>
                    <div className="sdx-body">
                      <h3>{s.title}</h3>
                      <p>{s.description}</p>
                      <div className="sdx-meta">
                        {s.meta?.map((m: string, mIdx: number) => (
                          <span key={mIdx}>{m}</span>
                        ))}
                      </div>
                      <span className="sdx-link">View courses →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* QUALIFICATIONS BLOCK */}
          {data?.section_5?.status !== false && (
            <div className="sdx-block" id="courses-by-qualification" style={{ marginTop: "34px" }}>
              <div className="sdx-head">
                <div>
                  <h2>{data?.section_5?.title}</h2>
                  <p>{data?.section_5?.description}</p>
                </div>
                <div className="sdx-controls">
                  <button className="sdx-ctrl" type="button">‹</button>
                  <button className="sdx-ctrl" type="button">›</button>
                </div>
              </div>
              <div className="sdx-row">
                {data?.section_5?.qualifications?.map((q: any, idx: number) => (
                  <a key={idx} className="sdx-card" href={q.link}>
                    <div className="sdx-photo">
                      <img src={q.image} alt="" />
                      <span className="sdx-badge">{q.badge}</span>
                    </div>
                    <div className="sdx-body">
                      <h3>{q.title}</h3>
                      <p>{q.description}</p>
                      <div className="sdx-meta">
                        {q.meta?.map((m: string, mIdx: number) => (
                          <span key={mIdx}>{m}</span>
                        ))}
                      </div>
                      <span className="sdx-link">Explore route →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* LOCATIONS BLOCK */}
          {data?.section_6?.status !== false && (
            <div className="sdx-block" id="courses-by-location" style={{ marginTop: "34px" }}>
              <div className="sdx-head">
                <div>
                  <h2>{data?.section_6?.title}</h2>
                  <p>{data?.section_6?.description}</p>
                </div>
                <div className="sdx-controls">
                  <button className="sdx-ctrl" type="button">‹</button>
                  <button className="sdx-ctrl" type="button">›</button>
                </div>
              </div>
              <div className="sdx-row">
                {data?.section_6?.locations?.map((l: any, idx: number) => (
                  <a key={idx} className="sdx-card" href={l.link}>
                    <div className="sdx-photo">
                      <img src={l.image} alt="" />
                      <span className="sdx-badge">{l.badge}</span>
                    </div>
                    <div className="sdx-body">
                      <h3>{l.title}</h3>
                      <p>{l.description}</p>
                      <div className="sdx-meta">
                        {l.meta?.map((m: string, mIdx: number) => (
                          <span key={mIdx}>{m}</span>
                        ))}
                      </div>
                      <span className="sdx-link">View location →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* STUDENT JOURNEY METHODOLOGY */}
      {data?.section_7?.status !== false && (
        <section className="section" id="journey" style={{ borderTop: "1px solid #dbe8f7" }}>
          <div className="wrap">
            <div className="jrn-intro">
              <div>
                <span className="eyebrow o">{data?.section_7?.badge}</span>
                <h2 className="jt">{data?.section_7?.title}</h2>
                <p>{data?.section_7?.description}</p>
              </div>
              <div className="jph">
                <img
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&amp;fit=crop&amp;w=1200&amp;q=85"
                  alt="Adult learner thinking through their options"
                />
              </div>
            </div>

            {data?.section_8?.status !== false && (
              <div style={{ marginTop: "44px" }}>
                {data?.section_8?.steps && (
                  data.section_8.steps.map((step: any, idx: number) => {
                    const stepTitle = step.title;
                    const stepDesc = step.description;
                    const stepNum = idx + 1;
                    const cardList = step.cards || [];

                    return (
                      <div className="jstep" key={idx}>
                        <div className="jl">
                          <span className="jnum">Step {stepNum}</span>
                          <h3>{stepTitle}</h3>
                          <p>{stepDesc}</p>
                        </div>
                        <div className="jcards">
                          {cardList.map((card: any, cidx: number) => {
                            if (card.isGuide) {
                              return (
                                <a className="gcard" href={card.href} key={cidx}>
                                  <div className="gph">
                                    <span className="gchip">{card.tag}</span>
                                    <img src={card.img} alt="" />
                                  </div>
                                  <b className="gtitle">{card.title}</b>
                                  <p className="gdesc">{card.desc}</p>
                                  <div className="gfoot">
                                    <span className="gmin">{card.readTime}</span>
                                    <span className="gread">Read →</span>
                                  </div>
                                </a>
                              );
                            }
                            return (
                              <a className="jcard" href={card.href} key={cidx}>
                                <div className="jcph">
                                  {card.icon && <div className="jicon">{card.icon}</div>}
                                  <img src={card.img} alt="" />
                                  <div className="jcov"></div>
                                </div>
                                <div className="jcb">
                                  <b>{card.title}</b>
                                  <span>{card.desc}</span>
                                  <span className="jgo">Explore →</span>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* HELP ADVISER BAND */}
      {data?.section_9?.status !== false && (
        <section className="helpband">
          <img
            className="hbbg"
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=85"
            alt=""
          />
          <div className="hbsc"></div>
          <div className="hbin">
            <span className="hbk">{data?.section_9?.badge}</span>
            <h2>{data?.section_9?.title}</h2>
            <p>{data?.section_9?.description}</p>
            <div className="hbrow">
              <a className="hbbtn dark" href="/lead/adviser-call">Book a free adviser →</a>
              <a className="hbbtn white" href="/apply">Apply with YStudy</a>
            </div>
          </div>
        </section>
      )}

      {/* SHORTLIST CONVERSION PANEL */}
      {data?.section_10?.status !== false && (
        <div className="footer-cta">
          <div className="wrap" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", alignItems: "center", width: "100%", gap: "18px" }}>
            <div style={{ textAlign: "left" }}>
              <span className="kicker">{data?.section_10?.badge}</span>
              <h2 style={{ fontSize: "clamp(24px, 2.5vw, 36px)", margin: "8px 0" }}>{data?.section_10?.title}</h2>
              <p style={{ color: "#46566f", fontWeight: 600 }}>{data?.section_10?.description}</p>
            </div>
            <div className="btnrow" style={{ display: "flex", gap: "12px" }}>
              <a className="btn btn-white" href="/dashboard">Create account</a>
              <a className="btn btn-orange" href="/apply">Apply now</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
