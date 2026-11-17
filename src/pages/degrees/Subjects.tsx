import { getCMSPageContent } from "@/services/cms.service";
import { StudySearchShell } from "@/components/degrees/StudySearchShell";
import "@/app/degrees/v735.css";
import Link from "next/link";
import React from "react";
import {
  ComparisonTable,
  FooterCta,
  PromoBand,
  FinanceHubStrip,
  FinanceWarningBanner,
  WhatSubject
} from "@/components/sections";
import { getStudentStoriesList } from "@/services";
import LocationStories from "@/components/locations/LocationStories";

export default async function Subjects() {
  const [data, stories] = await Promise.all([
    getCMSPageContent("study-subjects"),
    getStudentStoriesList().catch(() => null),
  ]);

  const s1 = data?.section_1 ?? data?.secion_1;
  const s2 = data?.section_2 ?? data?.secion_2;
  const s3 = data?.section_3 ?? data?.secion_3;
  const s4 = data?.section_4 ?? data?.secion_4;
  const s5 = data?.section_5 ?? data?.secion_5;
  const s6 = data?.section_6 ?? data?.secion_6;
  const s7 = data?.section_7 ?? data?.secion_7;
  const s8 = data?.section_8 ?? data?.secion_8;
  const s9 = data?.section_9 ?? data?.secion_9;
  const s10 = data?.section_10 ?? data?.secion_10;
  const s11 = data?.section_11 ?? data?.secion_11;
  const s12 = data?.section_12 ?? data?.secion_12;
  const s13 = data?.section_13 ?? data?.secion_13;
  const s14 = data?.section_14 ?? data?.secion_14;
  const s15 = data?.section_15 ?? data?.secion_15;
  const s16 = data?.section_16 ?? data?.secion_16;

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
      {s2 !== undefined && s2?.status !== false && (
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
          <StudySearchShell
            requireCollection="subjects"
            s3={s3}
            s4={s4}
            s5={s5}
            s6={s6}
            s7={s7}
          />
        </div>
      </section>

      {/* RECOMMENDED ROUTES SECTION (COMP-TABLE) */}
      {s8 !== undefined && s8?.status !== false && (
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
              rows={s8?.rows || []}
            />
          </div>
        </section>
      )}

      {/* TOP FLEXIBLE DEGREES RANKING LIST */}
      {s8 !== undefined && s9?.status !== false && (
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
              {(s9?.cards || []).map((card: any, idx: number) => (
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
      {s10 !== undefined && s10?.status !== false && (
        <WhatSubject data={s10} />
      )}

      {/* PROMO BAND SECTION */}
      {s11 && s11.status !== false && (
        <PromoBand
          badge={s11?.badge}
          title={s11?.title}
          description={s11?.description}
          fullImageUrl={s11?.fullImageUrl}
          status={s11?.status}
        />
      )}

      {/* TRUST & TESTIMONIALS SECTION */}
      {s12 !== undefined && s12.status !== false && (
        <LocationStories data={s11} stories={stories || []} />
      )}

      {/* FINANCE INTEGRATED SECTION 1: HUBS STRIP */}
      {s13 !== undefined && s13.status !== false && (
        <FinanceHubStrip badge={s13?.badge} title={s13?.title} description={s13?.description} status={s13?.status} />
      )}

      {/* FINANCE INTEGRATED SECTION 2: WARNING BANNER */}
      {s14 !== undefined && s14.status !== false && (
        <FinanceWarningBanner badge={s14?.badge} title={s14?.title} description={s14?.description} status={s14?.status} />
      )}

      {/* FINANCE INTEGRATED SECTION 3: COMPARISON TABLE */}
      {s15 !== undefined && s15?.status !== false && (
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
              rows={s15?.rows || []}
            />
          </div>
        </section>
      )}

      {/* FOOTER CTA */}
      {s16 && s16.status !== false && (
        <FooterCta badge={s16?.badge} title={s16?.title} description={s16?.description} status={s16?.status} />
      )}
    </div>
  );
}
