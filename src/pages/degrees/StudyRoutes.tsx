import { getCMSPageContent } from "@/services/cms.service";
import "@/app/degrees/v735.css";
import Link from "next/link";
import React from "react";

export default async function StudyRoutes() {
  const data = await getCMSPageContent("study-routes");

  const s1 = data?.secion_1;
  const s2 = data?.secion_2;
  const s3 = data?.section_3;
  const s4 = data?.section_4;
  const s5 = data?.section_5;
  const s6 = data?.section_6;
  const s7 = data?.section_7;
  const s8 = data?.section_8;
  const s9 = data?.section_9;
  const s10 = data?.section_10;
  const s11 = data?.section_11;
  const s12 = data?.section_12;
  const s13 = data?.section_13;
  const s14 = data?.section_14;
  const s15 = data?.section_15;

  return (
    <div className="qualification-page study-routes-index-page">
      <style dangerouslySetInnerHTML={{
        __html: `
        .study-routes-index-page .search-shell {
          display: grid !important;
        }
        .study-routes-index-page .search-shell main {
          width: auto !important;
        }
        @media(max-width: 1100px) {
          .study-routes-index-page .search-shell {
            display: block !important;
          }
          .study-routes-index-page .search-shell main {
            width: 100% !important;
          }
        }
      `}} />
      {/* PAGE NAVIGATION HEADER */}
      {s1?.status !== false && (
        <div className="page-nav-wrap">
          <div className="page-nav-head">
            <div style={{ textAlign: "left" }}>
              <h2>{s1?.title || "Degrees"}</h2>
              <p>{s1?.description || "Search, shortlist and choose a realistic route."}</p>
            </div>
            <Link className="btn btn-orange" href="/tools/degree-match">
              Degree Match Finder
            </Link>
          </div>
          <div className="page-nav-tabs">
            <Link className="active" href="/degrees/">
              Search degrees
            </Link>
            <Link href="/degrees/business">Business</Link>
            <Link href="/degrees/#results">Computing</Link>
            <Link href="/degrees/#results">Psychology</Link>
            <Link href="/degrees/#results">Health &amp; Social Care</Link>
            <Link href="/degrees/#results">Construction</Link>
            <Link href="/degrees/#results">Law</Link>
            <Link href="/degrees/#results">Check courses</Link>
          </div>
        </div>
      )}

      {/* HERO SECTION WITH HERO BANNER */}
      {s2?.status !== false && (
        <section className="section search-degree-focus">
          <div className="container">
            <div className="degree-search-hero">
              <span className="kicker">{s2?.badge || "Find degrees"}</span>
              <h1>{s2?.title || "Study routes."}</h1>
              <p>{s2?.description || "Compare foundation, HND, top-up, online and blended routes."}</p>
              <form action="#results" className="degree-search-bar">
                <input aria-label="Search" placeholder="Search subject, degree, location or career..." />
                <button className="btn btn-blue" type="submit">
                  Search →
                </button>
              </form>
              <div className="degree-quick-group">
                <strong>Popular subjects</strong>
                <div className="degree-chip-row degree-chip-row-light">
                  <Link href="/degrees/">💼 Business</Link>
                  <Link href="/degrees/subjects">💻 Computing</Link>
                  <Link href="/degrees/subjects">🧠 Psychology</Link>
                  <Link href="/degrees/subjects">🏗️ Construction</Link>
                  <Link href="/degrees/subjects">🏥 Health &amp; Care</Link>
                  <Link href="/degrees/subjects">⚖️ Law</Link>
                </div>
              </div>
              <div className="degree-quick-group">
                <strong>Study mode</strong>
                <div className="degree-chip-row degree-chip-row-light">
                  <Link href="/degrees/study-routes">📅 2 days/week</Link>
                  <Link href="/degrees/study-routes">🔀 Blended</Link>
                  <Link href="/degrees/study-routes">💻 Online</Link>
                  <Link href="/degrees/study-routes">⏱️ Part-time</Link>
                  <Link href="/degrees/study-routes">🌙 Evening</Link>
                </div>
              </div>
              <div className="degree-results-line">
                <span>Explore routes before you apply</span>
                <a className="smallbtn" href="#results">
                  View options ↓
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SEARCH SHELL: ADVANCED FILTERS & RESULTS */}
      <section className="section white" id="results">
        <div className="container">
          <div className="search-shell">
            {/* ASIDE: ADVANCED FILTERS */}
            <aside className="advanced-filter-card">
              <div className="advanced-filter-head">
                <h2>Advanced filters</h2>
                <Link className="clear-link" href="/degrees/">
                  Clear all
                </Link>
              </div>
              <div className="field-block">
                <label>Subject area</label>
                <select className="filter-select" defaultValue="Any subject">
                  <option>Any subject</option>
                  <option>Business</option>
                  <option>Computing</option>
                  <option>Health &amp; Social Care</option>
                  <option>Psychology</option>
                  <option>Construction</option>
                  <option>Law</option>
                  <option>Marketing</option>
                  <option>Project Management</option>
                </select>
              </div>
              <div className="field-block">
                <label>Qualification</label>
                <select className="filter-select" defaultValue="Any qualification">
                  <option>Any qualification</option>
                  <option>BA</option>
                  <option>BSc</option>
                  <option>HND</option>
                  <option>HNC</option>
                  <option>CertHE</option>
                  <option>Foundation Year</option>
                  <option>Top-Up</option>
                  <option>MBA</option>
                  <option>MSc</option>
                </select>
              </div>
              <div className="field-block">
                <label>Study mode</label>
                <select className="filter-select" defaultValue="Any mode">
                  <option>Any mode</option>
                  <option>Blended</option>
                  <option>Campus</option>
                  <option>2 days/week</option>
                  <option>Part-time</option>
                  <option>Weekend — funding check needed</option>
                  <option>Online — no maintenance loan</option>
                  <option>Distance learning — no maintenance loan</option>
                </select>
              </div>
              <div className="field-block">
                <label>Location</label>
                <select className="filter-select" defaultValue="Any location">
                  <option>Any location</option>
                  <option>London</option>
                  <option>Birmingham</option>
                  <option>Manchester</option>
                  <option>Online</option>
                  <option>Multiple locations</option>
                </select>
              </div>
              <div className="field-block">
                <label>Duration</label>
                <select className="filter-select" defaultValue="Any duration">
                  <option>Any duration</option>
                  <option>1 year</option>
                  <option>1–2 years</option>
                  <option>2 years</option>
                  <option>3 years</option>
                  <option>4 years with foundation</option>
                </select>
              </div>
              <div className="field-block">
                <label>Entry route</label>
                <select className="filter-select" defaultValue="Any route">
                  <option>Any route</option>
                  <option>Foundation / no A-levels</option>
                  <option>Top-Up</option>
                  <option>HND route</option>
                  <option>HNC route</option>
                  <option>Postgraduate</option>
                  <option>Not sure — ask adviser</option>
                </select>
              </div>
              <div className="field-block">
                <label>Funding</label>
                <select className="filter-select" defaultValue="Any">
                  <option>Any</option>
                  <option>SFE eligible</option>
                  <option>Maintenance Loan likely</option>
                  <option>Tuition Fee Loan</option>
                  <option>Funding check needed</option>
                  <option>No maintenance loan risk</option>
                </select>
              </div>
              <div className="field-block">
                <label>Career keyword</label>
                <input className="filter-input" placeholder="management, tech, care..." />
              </div>
              <Link className="btn btn-blue apply-filters-btn" href="#results">
                Apply filters
              </Link>
              <div className="notice" style={{ marginTop: "18px", display: "block", padding: "18px", borderRadius: "22px" }}>
                <h3 style={{ fontSize: "20px" }}>Funding warning</h3>
                <p style={{ fontSize: "14px" }}>
                  Online, distance-learning and weekend-only routes may affect Maintenance Loan eligibility. Ask adviser before applying.
                </p>
              </div>
            </aside>

            {/* MAIN CONTENT COLUMN */}
            <main>
              {s3?.status !== false && (
                <section className="section">
                  <div className="container">
                    <div className="section-head">
                      <span className="eyebrow">{s3?.badge || "YStudy resource"}</span>
                      <h1>{s3?.title || "Study Routes"}</h1>
                      <p>{s3?.description || "Understand the route that fits your qualifications: foundation year, HND, top-up or master’s."}</p>
                    </div>
                    <div className="card-grid three">
                      <article className="card">
                        <h3>Foundation Year</h3>
                        <p>A supported start before degree-level study.</p>
                        <Link className="link" href="/degrees/qualifications/foundation-year">
                          Open →
                        </Link>
                      </article>
                      <article className="card">
                        <h3>HND</h3>
                        <p>Practical higher national route.</p>
                        <Link className="link" href="/degrees/qualifications/hnd">
                          Open →
                        </Link>
                      </article>
                      <article className="card">
                        <h3>Top-Up Degree</h3>
                        <p>Convert previous study into a full degree.</p>
                        <Link className="link" href="/degrees/qualifications/top-up-degree">
                          Open →
                        </Link>
                      </article>
                      <article className="card">
                        <h3>Master’s Degree</h3>
                        <p>Postgraduate routes for progression.</p>
                        <Link className="link" href="/degrees/qualifications/masters">
                          Open →
                        </Link>
                      </article>
                    </div>

                    {s4?.status !== false && (
                      <div className="cta-panel" style={{ marginTop: "28px" }}>
                        <h2>{s4?.title || "Need help choosing the right route?"}</h2>
                        <p>{s4?.description || "Use Degree Match Finder or speak to a YStudy adviser before applying."}</p>
                        <div className="btnrow">
                          <Link className="btn btn-blue" href="/tools/degree-match">
                            Find my degree
                          </Link>
                          <Link className="btn btn-orange" href="/apply">
                            Apply with YStudy
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* CONVERSION SYSTEM */}
              {s5?.status !== false && (
                <section className="ys-conversion-system" aria-label="YStudy next steps">
                  <div className="ys-conversion-wrap">
                    <Link className="ys-conversion-card blue" href="/tools/eligibility-checker">
                      <div>
                        <h2>{s5?.cards?.[0]?.title || "Check if you can get funded."}</h2>
                        <p>{s5?.cards?.[0]?.description || "Quickly understand if you may qualify for Student Finance, grants and flexible university routes."}</p>
                      </div>
                      <span>Check eligibility</span>
                    </Link>
                    <Link className="ys-conversion-card orange" href="/apply">
                      <div>
                        <h2>{s5?.cards?.[1]?.title || "Apply with YStudy."}</h2>
                        <p>{s5?.cards?.[1]?.description || "Send us your details and we’ll help you choose the right course, prepare documents and move forward."}</p>
                      </div>
                      <span>Start application</span>
                    </Link>
                    <Link className="ys-conversion-card dark" href="/lead/adviser-call">
                      <div>
                        <h2>{s5?.cards?.[2]?.title || "Speak with an adviser."}</h2>
                        <p>{s5?.cards?.[2]?.description || "Not sure what to study, what you can get or which documents you need? Book a free call."}</p>
                      </div>
                      <span>Book free call</span>
                    </Link>
                  </div>
                </section>
              )}

              {/* CROSSLINKS */}
              {s6?.status !== false && (
                <section className="ys-crosslinks" aria-label="Useful links">
                  <div className="inner">
                    <div>
                      <h2>{s6?.title || "Useful next steps"}</h2>
                      <p>{s6?.description || "Move from information to action. Compare degrees, check funding, explore careers and apply with support."}</p>
                    </div>
                    <div className="ys-link-grid">
                      {(s6?.cards || [
                        { title: "Find degrees", link: "/degrees/" },
                        { title: "Funding hub", link: "/funding/" },
                        { title: "Careers & salaries", link: "/careers/" },
                        { title: "Degree Match", link: "/tools/degree-match" },
                        { title: "Salary Checker", link: "/tools/salary-checker" },
                        { title: "Student guides", link: "/guides/" }
                      ]).map((item: any, idx: number) => {
                        const href =
                          item.title === "Find degrees" ? "/degrees/" :
                            item.title === "Funding hub" ? "/funding/" :
                              item.title === "Careers & salaries" ? "/careers/" :
                                item.title === "Degree Match" ? "/tools/degree-match" :
                                  item.title === "Salary Checker" ? "/tools/salary-checker" :
                                    item.title === "Student guides" ? "/guides/" : "/degrees/";
                        return (
                          <Link key={idx} href={href}>
                            {item.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </section>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* RECOMMENDED ROUTES SECTION (COMP-TABLE) */}
      {s7?.status !== false && (
        <section className="section">
          <div className="container">
            <div className="title-row">
              <div style={{ textAlign: "left" }}>
                <span className="kicker">{s7?.badge || "Recommended routes"}</span>
                <h2>{s7?.title || "Clear course signals."}</h2>
              </div>
              <p style={{ textAlign: "left" }}>
                {s7?.description || "Use these signals to shortlist a realistic degree route, then ask an adviser to check funding and entry fit."}
              </p>
            </div>
            <div className="comp-table">
              <table>
                <thead>
                  <tr>
                    <th>{s7?.headers?.degree_header || "Degree route"}</th>
                    <th>{s7?.headers?.best_header || "Best for"}</th>
                    <th>{s7?.headers?.funding_header || "Funding"}</th>
                    <th>{s7?.headers?.flexible_header || "Flexible study"}</th>
                    <th>{s7?.headers?.salary_header || "Salary potential"}</th>
                    <th>{s7?.headers?.verdict_header || "Verdict"}</th>
                  </tr>
                </thead>
                <tbody>
                  {(s7?.rows || [
                    { degree: "Business Management", best: "Career changers", funding: "✓", flexible: "✓", salary: "Medium–High", verdict: "Best overall" },
                    { degree: "Cybersecurity", best: "Digital careers", funding: "✓", flexible: "✓", salary: "High", verdict: "Highest salary" },
                    { degree: "Psychology", best: "People-focused careers", funding: "✓", flexible: "×", salary: "Medium", verdict: "Popular route" },
                    { degree: "Online MSc", best: "Working adults", funding: "✓", flexible: "✓", salary: "Medium–High", verdict: "Most flexible" }
                  ]).map((row: any, idx: number) => (
                    <tr key={idx}>
                      <td>{row.degree}</td>
                      <td>{row.best}</td>
                      <td>{row.funding}</td>
                      <td>{row.flexible}</td>
                      <td>{row.salary}</td>
                      <td>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* TOP FLEXIBLE DEGREES RANKING LIST */}
      {s8?.status !== false && (
        <section className="section">
          <div className="container">
            <div className="title-row">
              <div style={{ textAlign: "left" }}>
                <span className="kicker">{s8?.badge || "Ranking"}</span>
                <h2>{s8?.title || "Top flexible degrees."}</h2>
              </div>
              <p style={{ textAlign: "left" }}>
                {s8?.description || "Ranking components help users quickly understand the best route."}
              </p>
            </div>
            <div className="rank-list">
              {(s8?.cards || [
                { position_number: "1", title: "Business Management", description: "Most flexible route for adults", top_number: "92" },
                { position_number: "2", title: "Computing & Cybersecurity", description: "Strong salary and demand", top_number: "88" },
                { position_number: "3", title: "Health & Social Care", description: "Good for community careers", top_number: "84" },
                { position_number: "4", title: "Psychology", description: "Popular career-changing subject", top_number: "82" }
              ]).map((card: any, idx: number) => (
                <div className="rank-row" key={idx}>
                  <div className="rank-num">{card.position_number}</div>
                  <div style={{ textAlign: "left" }}>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                  <div className="rank-score">{card.top_number}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SUBJECTS SECTION */}
      {s9?.status !== false && (
        <section className="section white ds-added-subjects">
          <div className="container">
            <div className="title-row">
              <div style={{ textAlign: "left" }}>
                <span className="kicker">{s9?.badge || "Subjects"}</span>
                <h2>{s9?.title || "What do you want to study?"}</h2>
              </div>
              <p style={{ textAlign: "left" }}>
                {s9?.description || "Explore the strongest subject routes for adult learners and check funding, salary and study mode before applying."}
              </p>
            </div>
            <div className="ds-subject-cards">
              <Link className="ds-subject-card" href="/degrees/business">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85" alt="Business" />
                <h3>Business</h3>
              </Link>
              <Link className="ds-subject-card" href="/degrees/#results">
                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=85" alt="Computing" />
                <h3>Computing</h3>
              </Link>
              <Link className="ds-subject-card" href="/degrees/#results">
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=85" alt="Health & Social Care" />
                <h3>Health &amp; Social Care</h3>
              </Link>
              <Link className="ds-subject-card" href="/degrees/#results">
                <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85" alt="Psychology" />
                <h3>Psychology</h3>
              </Link>
              <Link className="ds-subject-card" href="/degrees/#results">
                <img src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=1200&q=85" alt="Law" />
                <h3>Law</h3>
              </Link>
              <Link className="ds-subject-card" href="/degrees/#results">
                <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85" alt="Construction" />
                <h3>Construction</h3>
              </Link>
              <Link className="ds-subject-card" href="/degrees/#results">
                <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=85" alt="Marketing" />
                <h3>Marketing</h3>
              </Link>
              <Link className="ds-subject-card" href="/tools/degree-match">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85" alt="Not sure?" />
                <h3>Not sure?</h3>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* PROMO BAND SECTION */}
      {s10?.status !== false && (
        <section className="section tight">
          <section className="promo-band orange reverse">
            <div className="promo-inner">
              <div className="promo-figure">
                <img
                  alt="Starting university promo"
                  src={s10?.fullImageUrl || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1500&q=85"}
                />
              </div>
              <div className="promo-copy">
                <span className="promo-kicker">{s10?.badge || "Starting university"}</span>
                <h2 className="promo-title">{s10?.title || "What to prepare before your course starts"}</h2>
                <p className="promo-text">
                  {s10?.description || "Not sure what you'll need for student life? Use a simple checklist to plan the essentials, avoid last-minute stress and feel ready before your first week."}
                </p>
                <Link className="btn promo-cta" href="/tools/degree-match">
                  Build my preparation list
                </Link>
              </div>
            </div>
          </section>
        </section>
      )}

      {/* TRUST & TESTIMONIALS SECTION */}
      {s11?.status !== false && (
        <section className="section blue ds-added-trust">
          <div className="container">
            <div className="title-row">
              <div style={{ textAlign: "left" }}>
                <span className="kicker">{s11?.badge || "Student and community"}</span>
                <h2>{s11?.title || "Trust and SEO card families."}</h2>
              </div>
              <p style={{ textAlign: "left" }}>
                {s11?.description || "Use these for community guides, student stories, adviser trust and testimonials."}
              </p>
            </div>
            <div className="story-grid story-carousel">
              <article className="story-card">
                <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=85" alt="Maria" />
                <div className="body" style={{ textAlign: "left" }}>
                  <h3>Maria, 38</h3>
                  <p>“I needed to know if university could fit around my children and full-time work.”</p>
                  <div className="stars">★★★★★</div>
                  <div className="pills">
                    <span className="pill">Mature student</span>
                    <span className="pill">Health &amp; Social Care</span>
                  </div>
                </div>
              </article>
              <article className="story-card">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85" alt="Andrei" />
                <div className="body" style={{ textAlign: "left" }}>
                  <h3>Andrei, 34</h3>
                  <p>“The adviser helped me shortlist the right business route and check finance before applying.”</p>
                  <div className="stars">★★★★★</div>
                  <div className="pills">
                    <span className="pill">Career changer</span>
                    <span className="pill">Business</span>
                  </div>
                </div>
              </article>
              <article className="story-card">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=85" alt="Samira" />
                <div className="body" style={{ textAlign: "left" }}>
                  <h3>Samira, 29</h3>
                  <p>“The career comparison showed exactly what roles I could target.”</p>
                  <div className="stars">★★★★★</div>
                  <div className="pills">
                    <span className="pill">Computing</span>
                    <span className="pill">Now studying</span>
                  </div>
                </div>
              </article>
            </div>
            <div className="adviser-grid" style={{ marginTop: "22px" }}>
              <article className="adviser-card">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85" alt="Student Adviser" />
                <div style={{ textAlign: "left" }}>
                  <h3>Student Adviser</h3>
                  <p>Course and funding guidance.</p>
                  <Link href="/lead/adviser-call">Book callback →</Link>
                </div>
              </article>
              <article className="adviser-card">
                <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=85" alt="Application Support" />
                <div style={{ textAlign: "left" }}>
                  <h3>Application Support</h3>
                  <p>Documents, interview and next steps.</p>
                  <Link href="/lead/adviser-call">Ask a question →</Link>
                </div>
              </article>
              <article className="adviser-card">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=85" alt="Finance Guidance" />
                <div style={{ textAlign: "left" }}>
                  <h3>Finance Guidance</h3>
                  <p>SFE steps explained clearly.</p>
                  <Link href="/tools/eligibility-checker">Check funding →</Link>
                </div>
              </article>
            </div>
          </div>
        </section>
      )}

      {/* FINANCE INTEGRATED SECTION 1: HUBS STRIP */}
      {s12?.status !== false && (
        <section className="section tight ds-finance-integrated">
          <div className="container">
            <div className="finance-hub-strip" style={{ textAlign: "left" }}>
              <div>
                <span className="kicker">{s12?.badge || "Student Finance"}</span>
                <h2>{s12?.title || "Check funding before you choose a course."}</h2>
                <p>{s12?.description || "Check Maintenance Loan, Tuition Fee Loan, grants, study mode risk and repayment basics before applying."}</p>
              </div>
              <div className="finance-strip-actions">
                <Link className="btn btn-orange" href="/tools/student-finance-calculator">
                  Open calculator
                </Link>
                <Link className="btn btn-white" href="/tools/eligibility-checker">
                  Check eligibility
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FINANCE INTEGRATED SECTION 2: WARNING BANNER */}
      {s13?.status !== false && (
        <section className="section tight ds-finance-integrated">
          <div className="container">
            <div className="finance-warning-banner" style={{ textAlign: "left" }}>
              <div>
                <span className="kicker">{s13?.badge || "Important funding rule"}</span>
                <h2>{s13?.title || "Study mode can affect Maintenance Loan."}</h2>
                <p>
                  {s13?.description || "Online, distance-learning and weekend-only routes may not qualify for Maintenance Loan. Ask an adviser before choosing the course."}
                </p>
              </div>
              <Link className="btn btn-orange" href="/tools/eligibility-checker">
                Check study mode risk
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FINANCE INTEGRATED SECTION 3: COMPARISON TABLE */}
      {s14?.status !== false && (
        <section className="section white ds-finance-integrated">
          <div className="container">
            <div className="title-row">
              <div style={{ textAlign: "left" }}>
                <span className="kicker">{s14?.badge || "Comparison table"}</span>
                <h2>{s14?.title || "Check funding routes."}</h2>
              </div>
              <p style={{ textAlign: "left" }}>
                {s14?.description || "Clear decision signals for course shortlist, university comparison and funding guide pages."}
              </p>
            </div>
            <div className="finance-comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>{s14?.headers?.route_header || "Route"}</th>
                    <th>{s14?.headers?.funding_header || "Funding type"}</th>
                    <th>{s14?.headers?.maintenance_header || "Maintenance Loan"}</th>
                    <th>{s14?.headers?.best_header || "Best for"}</th>
                    <th>{s14?.headers?.verdict_header || "Verdict"}</th>
                  </tr>
                </thead>
                <tbody>
                  {(s14?.rows || [
                    { route: "Campus / blended undergraduate", funding: "Tuition + maintenance", maintenance: "Usually stronger", best: "Students needing living-cost support", verdict: "Best overall route" },
                    { route: "Weekend-only", funding: "Needs careful check", maintenance: "Risk area", best: "Working adults with limited time", verdict: "Ask adviser first" },
                    { route: "Online / distance learning", funding: "Tuition may apply", maintenance: "Usually no maintenance", best: "Remote learners", verdict: "Good flexibility, less living-cost support" },
                    { route: "Postgraduate Master’s", funding: "Postgraduate Loan", maintenance: "Different system", best: "Graduates and career changers", verdict: "Check loan cap and tuition" }
                  ]).map((row: any, idx: number) => (
                    <tr key={idx}>
                      <td>{row.route}</td>
                      <td>{row.funding}</td>
                      <td>{row.maintenance}</td>
                      <td>{row.best}</td>
                      <td>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER CTA */}
      {s15?.status !== false && (
        <div className="footer-cta" style={{ textAlign: "left" }}>
          <div>
            <span className="kicker">{s15?.badge || "Stay in touch"}</span>
            <h2>{s15?.title || "Your next step should feel organised."}</h2>
            <p>{s15?.description || "Create a free account to save progress, find your best degree and track applications."}</p>
          </div>
          <div className="btnrow">
            <Link className="btn btn-white" href="/dashboard/">
              Create account
            </Link>
            <Link className="btn btn-orange" href="/apply/">
              Apply now
            </Link>
          </div>
        </div>
      )}

      {/* FLOATING ADVISER */}
      <div className="floating-adviser" style={{ textAlign: "left" }}>
        <span className="pill" style={{ background: "rgba(255,255,255,.12)", color: "#fff", borderColor: "rgba(255,255,255,.18)" }}>
          Free adviser support
        </span>
        <h3>Not sure what to choose?</h3>
        <p>Book a free adviser call before applying.</p>
        <div className="btnrow">
          <Link className="btn btn-orange" href="/lead/adviser-call">
            Book call
          </Link>
          <Link className="btn btn-white" href="/lead/adviser-call">
            WhatsApp
          </Link>
        </div>
      </div>
    </div>
  );
}
