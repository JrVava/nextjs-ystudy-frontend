import { getCMSPageContent } from "@/services/cms.service";
import "@/app/degrees/v735.css";
import { QBanner } from "@/components/ui/QBanner";
import { RoutesTabsCarousel } from "@/components/degrees/RoutesTabsCarousel";
import Link from "next/link";
import React from "react";

import { DegreesPageNav } from "@/components/layout/DegreesPageNav";

export default async function StudyRoutes() {
  const data = await getCMSPageContent("study-routes");

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Study Routes Page Not Found</h2>
        <Link href="/degrees" className="btn btn-blue" style={{ marginTop: "1rem" }}>
          Browse Degrees
        </Link>
      </div>
    );
  }

  return (
    <div className="qualification-page study-routes-index-page">
      <DegreesPageNav activeTab="routes" />
      {/* HERO SECTION DYNAMIZED WITH QBANNER IN v735-hero LAYOUT */}
      <QBanner
        slug="study-routes"
        layoutType="v735-hero"
        fallbackTitle="Choose the right qualification route."
        fallbackDescription="Compare higher education qualification routes in the UK. Find the right option between Foundation Year, CertHE, HND, and Bachelor's degrees."
        fallbackBadgeText="Study Routes & Qualifications"
        fallbackBgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2200&q=80"
      />

      {/* FLOAT GRID OVERLAY SECTION */}
      <section className="v735-float">
        <div className="container">
          <div className="v735-float-grid">
            <Link className="v735-float-card" href="/degrees/qualifications/foundation-year">
              <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80" alt="" />
              <div>
                <b>Foundation Year</b>
                <span>Supported start (Year 0) →</span>
              </div>
            </Link>
            <Link className="v735-float-card" href="/degrees/qualifications/hnd">
              <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80" alt="" />
              <div>
                <b>HNC / HND</b>
                <span>Practical Level 4/5 route →</span>
              </div>
            </Link>
            <Link className="v735-float-card" href="/degrees/qualifications/masters">
              <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80" alt="" />
              <div>
                <b>Master's Degree</b>
                <span>Postgraduate Level 7 →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* TABS AND COURSE CAROUSEL CLIENT COMPONENT */}
      <section className="v735-section" id="qualification-courses" style={{ padding: "0 0 clamp(42px, 5vw, 72px) 0" }}>
        <div className="container">
          <RoutesTabsCarousel />
        </div>
      </section>

      {/* QUALIFICATIONS EXPLANATION DETAIL CARDS */}
      <section className="v735-section soft" id="route-details">
        <div className="container" style={{ textAlign: "left" }}>
          <div className="v735-head">
            <div>
              <h2>Qualification types explained</h2>
              <p>Understand how long each route takes, what you'll study and what you receive.</p>
            </div>
          </div>
          <div className="v735-card-grid">
            <article className="v735-card">
              <div className="v734-photo">
                <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80" alt="" />
                <span className="v734-badge">Foundation</span>
              </div>
              <div className="v734-body">
                <h3>Foundation Year</h3>
                <p>An integrated 1-year start (Year 0) that prepares you for full degree study. Best if you don’t meet regular entry requirements.</p>
                <Link className="v734-link" href="/degrees/qualifications/foundation-year">
                  Explore route →
                </Link>
              </div>
            </article>
            <article className="v735-card">
              <div className="v734-photo">
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80" alt="" />
                <span className="v734-badge">CertHE</span>
              </div>
              <div className="v734-body">
                <h3>CertHE</h3>
                <p>Certificate of Higher Education. A 1-year Level 4 qualification equal to Year 1 of a degree. Great exit award or stepping stone.</p>
                <Link className="v734-link" href="/degrees/qualifications/certhe">
                  Explore route →
                </Link>
              </div>
            </article>
            <article className="v735-card">
              <div className="v734-photo">
                <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80" alt="" />
                <span className="v734-badge">HND</span>
              </div>
              <div className="v734-body">
                <h3>HNC / HND</h3>
                <p>Practical Level 4 (HNC) and Level 5 (HND) qualifications focused on work skills, with direct top-up routes to a full degree.</p>
                <Link className="v734-link" href="/degrees/qualifications/hnd">
                  Explore route →
                </Link>
              </div>
            </article>
            <article className="v735-card">
              <div className="v734-photo">
                <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80" alt="" />
                <span className="v734-badge">Master's</span>
              </div>
              <div className="v734-body">
                <h3>Master's Degree</h3>
                <p>Level 7 postgraduate study for degree graduates or professionals wanting specialised skills or management promotion.</p>
                <Link className="v734-link" href="/degrees/qualifications/masters">
                  Explore route →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* COMPARISON MATRIX TABLE */}
      <section className="v735-section" id="route-matrix">
        <div className="container" style={{ textAlign: "left" }}>
          <div className="v735-head">
            <div>
              <h2>Route comparison at a glance</h2>
              <p>Check typical duration, entry levels and standard student funding options side by side.</p>
            </div>
          </div>
          <div className="v735-compare">
            <table>
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Usually suits</th>
                  <th>Typical duration</th>
                  <th>Funding</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Foundation Year</td>
                  <td>Adults returning to study or missing entry requirements</td>
                  <td>4 years (with degree)</td>
                  <td>SFE Tuition &amp; Maintenance <span className="v734-check">✓</span></td>
                </tr>
                <tr>
                  <td>CertHE</td>
                  <td>Students wanting a 1-year Level 4 recognised start</td>
                  <td>1 year</td>
                  <td>SFE Tuition &amp; Maintenance <span className="v734-check">✓</span></td>
                </tr>
                <tr>
                  <td>Bachelor's Degree</td>
                  <td>Standard university route for professional careers</td>
                  <td>3 years</td>
                  <td>SFE Tuition &amp; Maintenance <span className="v734-check">✓</span></td>
                </tr>
                <tr>
                  <td>Advanced Entry</td>
                  <td>Students with previous higher education or matching credits</td>
                  <td>1–2 years</td>
                  <td>Check remaining SFE years <span className="v734-check">✓</span></td>
                </tr>
                <tr>
                  <td>Master's Degree</td>
                  <td>Graduates or experienced managers aiming for promotion</td>
                  <td>1–2 years</td>
                  <td>Postgraduate Loan <span className="v734-check">✓</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="v735-section soft">
        <div className="container">
          <div className="v735-final">
            <div style={{ textAlign: "left" }}>
              <h2>Not sure which route fits your life?</h2>
              <p>Tell us your previous qualifications and work experience. We will help you select the most realistic path.</p>
            </div>
            <div className="v734-actions">
              <Link className="v734-btn orange" href="/tools/degree-match">
                Run Degree Match Finder
              </Link>
              <Link className="v734-btn white" href="/lead/adviser-call">
                Book free adviser call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONVERSION BAR */}
      <section className="ys-conversion-system" aria-label="YStudy next steps" style={{ marginTop: "40px" }}>
        <div className="ys-conversion-wrap">
          <Link className="ys-conversion-card blue" href="/tools/eligibility-checker">
            <div style={{ textAlign: "left" }}>
              <h2>Check if you can get funded.</h2>
              <p>Quickly understand if you may qualify for Student Finance, grants and flexible university routes.</p>
            </div>
            <span>Check eligibility</span>
          </Link>
          <Link className="ys-conversion-card orange" href="/apply">
            <div style={{ textAlign: "left" }}>
              <h2>Apply with YStudy.</h2>
              <p>Send us your details and we’ll help you choose the right course, prepare documents and move forward.</p>
            </div>
            <span>Start application</span>
          </Link>
          <Link className="ys-conversion-card dark" href="/lead/adviser-call">
            <div style={{ textAlign: "left" }}>
              <h2>Speak with an adviser.</h2>
              <p>Not sure what to study, what you can get or which documents you need? Book a free call.</p>
            </div>
            <span>Book free call</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
