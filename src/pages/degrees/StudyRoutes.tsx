import { getCMSPageContent } from "@/services/cms.service";
import "@/app/degrees/v735.css";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { RoutesTabsCarousel } from "@/components/degrees/RoutesTabsCarousel";
import { DegreesPageNav } from "@/components/layout/DegreesPageNav";
import Link from "next/link";
import React from "react";

export default async function StudyRoutes() {
  const data = await getCMSPageContent("study-routes");

  const s1 = data?.section_1;
  const s2 = data?.section_2;
  const s4 = data?.section_4;
  const s5 = data?.section_5;
  const s6 = data?.section_6;

  return (
    <div className="qualification-page study-routes-index-page">
      <DegreesPageNav activeTab="search" />

      {/* HERO SECTION WITH HERO BANNER */}
      <HeroBanner
        slug="study-routes"
        layoutType="overview"
        fallbackTitle={s1?.title || "Choose the right qualification route."}
        fallbackDescription={s1?.description || "Compare Foundation Year, CertHE, HNC, HND, Bachelor’s, Top-Up and Master’s routes, then view real course options."}
        fallbackBadgeText={s1?.badge || "Study Routes & Qualifications"}
        fallbackBgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2200&q=80"
      >
        <div className="v735-actions" style={{ marginTop: "24px" }}>
          <Link className="v735-btn blue" href="/degrees">
            Search degrees
          </Link>
          <Link className="v735-btn orange" href="/tools/eligibility-checker">
            Check eligibility
          </Link>
          <Link className="v735-btn white" href="/lead/adviser-call">
            Speak to adviser
          </Link>
        </div>
      </HeroBanner>

      {/* FLOAT GRID OVERLAY SECTION */}
      {s2?.status !== false && (
        <section className="v735-float">
          <div className="container">
            <div className="v735-float-grid">
              {(s2?.cards || [
                {
                  title: "Foundation Year",
                  subtitle: "Supported start into degree study →",
                  image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
                  href: "/degrees/qualifications/foundation-year"
                },
                {
                  title: "HNC / HND",
                  subtitle: "Practical Level 4/5 route →",
                  image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
                  href: "/degrees/qualifications/hnd"
                },
                {
                  title: "Master's Degree",
                  subtitle: "Postgraduate Level 7 →",
                  image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
                  href: "/degrees/qualifications/masters"
                }
              ]).map((card: any, idx: number) => (
                <Link
                  key={idx}
                  className="v735-float-card"
                  href={card.href || (card.title?.toLowerCase().includes("foundation") ? "/degrees/qualifications/foundation-year" : card.title?.toLowerCase().includes("master") ? "/degrees/qualifications/masters" : "/degrees/qualifications/hnd")}
                >
                  <img src={card.image} alt={card.title} />
                  <div>
                    <b>{card.title}</b>
                    <span>{card.subtitle || "Explore route →"}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TABS AND COURSE CAROUSEL CLIENT COMPONENT */}
      <section className="v735-section" id="qualification-courses" style={{ padding: "0 0 clamp(42px, 5vw, 72px) 0" }}>
        <div className="container">
          <RoutesTabsCarousel />
        </div>
      </section>

      {/* QUALIFICATIONS EXPLANATION DETAIL CARDS */}
      {s4?.status !== false && (
        <section className="v735-section soft" id="route-details">
          <div className="container" style={{ textAlign: "left" }}>
            <div className="v735-head">
              <div>
                <h2>Qualification types explained</h2>
                <p>Understand how long each route takes, what you'll study and what you receive.</p>
              </div>
            </div>
            <div className="v735-card-grid">
              {(s4?.cards || [
                { title: "Foundation Year", description: "An integrated 1-year start (Year 0) that prepares you for full degree study. Best if you don’t meet regular entry requirements.", badge: "Foundation", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80", link: "/degrees/qualifications/foundation-year" },
                { title: "CertHE", description: "Certificate of Higher Education. A 1-year Level 4 qualification equal to Year 1 of a degree. Great exit award or stepping stone.", badge: "CertHE", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80", link: "/degrees/qualifications/certhe" },
                { title: "HNC / HND", description: "Practical Level 4 (HNC) and Level 5 (HND) qualifications focused on work skills, with direct top-up routes to a full degree.", badge: "HND", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80", link: "/degrees/qualifications/hnd" },
                { title: "Master's Degree", description: "Level 7 postgraduate study for degree graduates or professionals wanting specialised skills or management promotion.", badge: "Master's", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80", link: "/degrees/qualifications/masters" }
              ]).map((c: any, idx: number) => (
                <article className="v735-card" key={idx}>
                  <div className="v734-photo">
                    <img src={c.image} alt={c.title} />
                    <span className="v734-badge">{c.badge || "Qualification"}</span>
                  </div>
                  <div className="v734-body">
                    <h3>{c.title}</h3>
                    <p>{c.description}</p>
                    <Link className="v734-link" href={c.link || "/degrees"}>
                      Explore route →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COMPARISON MATRIX TABLE */}
      {s5?.status !== false && (
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
                    {(s5?.comparison_table?.headers || ["Route", "Usually suits", "Typical duration", "Funding"]).map((h: string, idx: number) => (
                      <th key={idx}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(s5?.comparison_table?.rows || [
                    { route: "Foundation Year", suits: "Adults returning to study or missing entry requirements", duration: "4 years (with degree)", funding: "SFE Tuition & Maintenance ✓" },
                    { route: "CertHE", suits: "Students wanting a 1-year Level 4 recognised start", duration: "1 year", funding: "SFE Tuition & Maintenance ✓" },
                    { route: "Bachelor's Degree", suits: "Standard university route for professional careers", duration: "3 years", funding: "SFE Tuition & Maintenance ✓" },
                    { route: "Advanced Entry", suits: "Students with previous higher education or matching credits", duration: "1–2 years", funding: "Check remaining SFE years ✓" },
                    { route: "Master's Degree", suits: "Graduates or experienced managers aiming for promotion", duration: "1–2 years", funding: "Postgraduate Loan ✓" }
                  ]).map((row: any, idx: number) => (
                    <tr key={idx}>
                      <td>{row.route}</td>
                      <td>{row.suits}</td>
                      <td>{row.duration}</td>
                      <td>{row.funding}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* FINAL CALL TO ACTION */}
      {s6?.status !== false && (
        <section className="v735-section soft">
          <div className="container">
            <div className="v735-final">
              <div style={{ textAlign: "left" }}>
                <h2>{s6?.title || "Not sure which route fits your life?"}</h2>
                <p>{s6?.description || "Tell us your previous qualifications and work experience. We will help you select the most realistic path."}</p>
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
      )}

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
