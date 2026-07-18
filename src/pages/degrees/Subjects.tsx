import { getCMSPageContent } from "@/services/cms.service";
import "@/app/degrees/v735.css";
import { QBanner } from "@/components/ui/QBanner";
import { SubjectsTabsCarousel } from "@/components/degrees/SubjectsTabsCarousel";
import Link from "next/link";
import React from "react";

import { DegreesPageNav } from "@/components/layout/DegreesPageNav";

export default async function Subjects() {
  const data = await getCMSPageContent("study-subjects");

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Subjects Page Not Found</h2>
        <Link href="/degrees" className="btn btn-blue" style={{ marginTop: "1rem" }}>
          Browse Degrees
        </Link>
      </div>
    );
  }

  return (
    <div className="qualification-page subjects-index-page">
      <DegreesPageNav activeTab="subjects" />
      {/* HERO SECTION DYNAMIZED WITH QBANNER */}
      <QBanner
        slug="study-subjects"
        layoutType="v735-hero"
        fallbackTitle="Explore courses by subject."
        fallbackDescription="Start with the area you’re interested in, then compare real course options, check funding eligibility and speak to an adviser."
        fallbackBadgeText="Study Subjects"
        fallbackBgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2200&q=80"
      />

      {/* FLOAT GRID OVERLAY SECTION */}
      <section className="v735-float">
        <div className="container">
          <div className="v735-float-grid">
            <a className="v735-float-card" href="#browse-by-qualification">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80" alt="" />
              <div>
                <b>Business &amp; Management</b>
                <span>20+ SFE courses →</span>
              </div>
            </a>
            <a className="v735-float-card" href="#browse-by-qualification">
              <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80" alt="" />
              <div>
                <b>Health &amp; Social Care</b>
                <span>Supported community routes →</span>
              </div>
            </a>
            <a className="v735-float-card" href="#browse-by-qualification">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80" alt="" />
              <div>
                <b>Computing &amp; Data</b>
                <span>Cyber, AI &amp; programming →</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* TABS AND COURSE CAROUSEL CLIENT COMPONENT */}
      <section className="v735-section" id="subject-courses" style={{ padding: "0 0 clamp(42px, 5vw, 72px) 0" }}>
        <div className="container">
          <SubjectsTabsCarousel />
        </div>
      </section>

      {/* COURSES AVAILABLE BY QUALIFICATION */}
      <section className="v735-section soft" id="browse-by-qualification">
        <div className="container" style={{ textAlign: "left" }}>
          <div className="v735-head">
            <div>
              <h2>Courses available by qualification</h2>
              <p>Start with the level of study that suits your background, then browse specific courses.</p>
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
                <p>An integrated start (Year 0) that builds academic skills before you progress to Year 1. Ideal if you do not have traditional qualifications.</p>
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
                <h3>Certificate of HE</h3>
                <p>A 1-year Level 4 higher education certificate equal to Year 1 of a degree. Perfect for a quick, recognised exit award or step up.</p>
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
                <h3>HND / Advanced Entry</h3>
                <p>Practical 2-year Level 5 qualifications with top-up options. Move directly into the final year of a Bachelor's degree afterwards.</p>
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
                <p>Level 7 postgraduate programs (MA / MSc / MBA) for degree graduates or professionals wanting advanced leadership skills.</p>
                <Link className="v734-link" href="/degrees/qualifications/masters">
                  Explore route →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="v735-section">
        <div className="container">
          <div className="v735-final">
            <div style={{ textAlign: "left" }}>
              <h2>Not sure what you want to study?</h2>
              <p>Compare different subjects, career potential and SFE living-cost support with professional advice.</p>
            </div>
            <div className="v734-actions">
              <Link className="v734-btn orange" href="/tools/degree-match">
                Find My Degree Match
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
