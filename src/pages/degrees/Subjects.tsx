import { getCMSPageContent } from "@/services/cms.service";
import "@/app/degrees/v735.css";
import Link from "next/link";
import React from "react";
import {
  ConversionStrip,
  CrossLinks,
  ComparisonTable,
  FooterCta,
  PromoBand,
  TrustTestimonials,
  FinanceHubStrip,
  FinanceWarningBanner,
  FloatingAdviser
} from "@/components/sections";

export default async function Subjects() {
  const data = await getCMSPageContent("study-subjects");

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
  const s16 = data?.section_16;

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
              <h1>{s2?.title || "Study subjects."}</h1>
              <p>{s2?.description || "Explore popular subjects for adult learners and career changers."}</p>
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
                      <h1>{s3?.title || "Study Subjects"}</h1>
                      <p>{s3?.description || "Explore popular subjects for adult learners, including business, computing, psychology, law, construction and health."}</p>
                    </div>
                    <div className="card-grid three">
                      {(s3?.cards || [
                        { title: "Business", description: "Management, marketing, HR and operations.", link: "/degrees/business" },
                        { title: "Computing", description: "Digital, software, cybersecurity and data routes.", link: "/degrees/" },
                        { title: "Psychology", description: "People, behaviour, research and support roles.", link: "/degrees/" },
                        { title: "Construction", description: "Construction management, surveying and project routes.", link: "/degrees/" },
                        { title: "Health & Social Care", description: "Care, leadership and public health routes.", link: "/degrees/" },
                        { title: "Law", description: "Legal knowledge and professional pathways.", link: "/degrees/" }
                      ]).map((card: any, idx: number) => (
                        <article className="card" key={idx}>
                          <h3>{card.title}</h3>
                          <p>{card.description}</p>
                          <Link className="link" href={card.link || "/degrees/"}>
                            Open →
                          </Link>
                        </article>
                      ))}
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

              {/* MAIN SUBJECT GUIDES */}
              {s5?.status !== false && (
                <section className="v705-sec">
                  <div className="v705-wrap">
                    <div className="v705-head">
                      <div style={{ textAlign: "left" }}>
                        <span className="kicker">{s5?.badge || "Main subject guides"}</span>
                        <h2>{s5?.title || "Explore the subjects students ask about most."}</h2>
                      </div>
                    </div>
                    <div className="v705-grid">
                      {(s5?.cards || [
                        { title: "Business", description: "Management, marketing, operations and enterprise.", link: "/degrees/business" },
                        { title: "Computing", description: "IT, cyber security, software and data.", link: "/degrees/computing" },
                        { title: "Health & Social Care", description: "Care, wellbeing, public health and service leadership.", link: "/degrees/health" },
                        { title: "Construction", description: "Site management, project delivery and built environment.", link: "/degrees/construction" },
                        { title: "Psychology", description: "People, behaviour, wellbeing and support roles.", link: "/degrees/psychology" },
                        { title: "Law", description: "Legal knowledge, compliance and professional routes.", link: "/degrees/law" }
                      ]).map((card: any, idx: number) => (
                        <Link key={idx} className="v705-card" href={card.link || "/degrees/"}>
                          <h3>{card.title}</h3>
                          <p>{card.description}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* CONVERSION SYSTEM */}
              <ConversionStrip cards={s6?.cards} status={s6?.status} />

              {/* CROSSLINKS */}
              <CrossLinks title={s7?.title} description={s7?.description} cards={s7?.cards} status={s7?.status} />
            </main>
          </div>
        </div>
      </section>

      {/* RECOMMENDED ROUTES SECTION (COMP-TABLE) */}
      {s8?.status !== false && (
        <section className="section">
          <div className="container">
            <div className="title-row">
              <div style={{ textAlign: "left" }}>
                <span className="kicker">{s8?.badge || "Recommended routes"}</span>
                <h2>{s8?.title || "Clear course signals."}</h2>
              </div>
              <p style={{ textAlign: "left" }}>
                {s8?.description || "Use these signals to shortlist a realistic degree route, then ask an adviser to check funding and entry fit."}
              </p>
            </div>
            <ComparisonTable
              className="comp-table"
              headers={[
                s8?.headers?.degree_header || "Degree route",
                s8?.headers?.best_header || "Best for",
                s8?.headers?.funding_header || "Funding",
                s8?.headers?.flexible_header || "Flexible study",
                s8?.headers?.salary_header || "Salary potential",
                s8?.headers?.verdict_header || "Verdict"
              ]}
              rows={s8?.rows || [
                { degree: "Business Management", best: "Career changers", funding: "✓", flexible: "✓", salary: "Medium–High", verdict: "Best overall" },
                { degree: "Cybersecurity", best: "Digital careers", funding: "✓", flexible: "✓", salary: "High", verdict: "Highest salary" },
                { degree: "Psychology", best: "People-focused careers", funding: "✓", flexible: "×", salary: "Medium", verdict: "Popular route" },
                { degree: "Online MSc", best: "Working adults", funding: "✓", flexible: "✓", salary: "Medium–High", verdict: "Most flexible" }
              ]}
            />
          </div>
        </section>
      )}

      {/* TOP FLEXIBLE DEGREES RANKING LIST */}
      {s9?.status !== false && (
        <section className="section">
          <div className="container">
            <div className="title-row">
              <div style={{ textAlign: "left" }}>
                <span className="kicker">{s9?.badge || "Ranking"}</span>
                <h2>{s9?.title || "Top flexible degrees."}</h2>
              </div>
              <p style={{ textAlign: "left" }}>
                {s9?.description || "Ranking components help users quickly understand the best route."}
              </p>
            </div>
            <div className="rank-list">
              {(s9?.cards || [
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
      {s10?.status !== false && (
        <section className="section white ds-added-subjects">
          <div className="container">
            <div className="title-row">
              <div style={{ textAlign: "left" }}>
                <span className="kicker">{s10?.badge || "Subjects"}</span>
                <h2>{s10?.title || "What do you want to study?"}</h2>
              </div>
              <p style={{ textAlign: "left" }}>
                {s10?.description || "Explore the strongest subject routes for adult learners and check funding, salary and study mode before applying."}
              </p>
            </div>
            <div className="ds-subject-cards">
              {(s10?.cards || [
                { title: "Business", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85", link: "/degrees/business" },
                { title: "Computing", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=85", link: "/degrees/#results" },
                { title: "Health & Social Care", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=85", link: "/degrees/#results" },
                { title: "Psychology", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85", link: "/degrees/#results" },
                { title: "Law", image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=1200&q=85", link: "/degrees/#results" },
                { title: "Construction", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85", link: "/degrees/#results" },
                { title: "Marketing", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=85", link: "/degrees/#results" },
                { title: "Not sure?", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85", link: "/tools/degree-match" }
              ]).map((card: any, idx: number) => (
                <Link className="ds-subject-card" href={card.link || "/degrees/"} key={idx}>
                  <img src={card.image} alt={card.title} />
                  <h3>{card.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROMO BAND SECTION */}
      <PromoBand
        badge={s11?.badge}
        title={s11?.title}
        description={s11?.description}
        fullImageUrl={s11?.fullImageUrl}
        status={s11?.status}
      />

      {/* TRUST & TESTIMONIALS SECTION */}
      <TrustTestimonials
        badge={s12?.badge}
        title={s12?.title}
        description={s12?.description}
        status={s12?.status}
      />

      {/* FINANCE INTEGRATED SECTION 1: HUBS STRIP */}
      <FinanceHubStrip badge={s13?.badge} title={s13?.title} description={s13?.description} status={s13?.status} />

      {/* FINANCE INTEGRATED SECTION 2: WARNING BANNER */}
      <FinanceWarningBanner badge={s14?.badge} title={s14?.title} description={s14?.description} status={s14?.status} />

      {/* FINANCE INTEGRATED SECTION 3: COMPARISON TABLE */}
      {s15?.status !== false && (
        <section className="section white ds-finance-integrated">
          <div className="container">
            <div className="title-row">
              <div style={{ textAlign: "left" }}>
                <span className="kicker">{s15?.badge || "Comparison table"}</span>
                <h2>{s15?.title || "Check funding routes."}</h2>
              </div>
              <p style={{ textAlign: "left" }}>
                {s15?.description || "Clear decision signals for course shortlist, university comparison and funding guide pages."}
              </p>
            </div>
            <ComparisonTable
              className="finance-comparison-table"
              headers={[
                s15?.headers?.route_header || "Route",
                s15?.headers?.funding_header || "Funding type",
                s15?.headers?.maintenance_header || "Maintenance Loan",
                s15?.headers?.best_header || "Best for",
                s15?.headers?.verdict_header || "Verdict"
              ]}
              rows={s15?.rows || [
                { route: "Campus / blended undergraduate", funding: "Tuition + maintenance", maintenance: "Usually stronger", best: "Students needing living-cost support", verdict: "Best overall route" },
                { route: "Weekend-only", funding: "Needs careful check", maintenance: "Risk area", best: "Working adults with limited time", verdict: "Ask adviser first" },
                { route: "Online / distance learning", funding: "Tuition may apply", maintenance: "Usually no maintenance", best: "Remote learners", verdict: "Good flexibility, less living-cost support" },
                { route: "Postgraduate Master’s", funding: "Postgraduate Loan", maintenance: "Different system", best: "Graduates and career changers", verdict: "Check loan cap and tuition" }
              ]}
            />
          </div>
        </section>
      )}

      {/* FOOTER CTA */}
      <FooterCta badge={s16?.badge} title={s16?.title} description={s16?.description} status={s16?.status} />

      {/* FLOATING ADVISER */}
      <FloatingAdviser />
    </div>
  );
}
