"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteLayout } from "@/components/layout";

export default function DashboardPage() {
  const [tools, setTools] = useState<any[]>([]);
  const [funding, setFunding] = useState<any>(null);
  const [adviser, setAdviser] = useState<any>(null);

  useEffect(() => {
    try {
      const savedTools = JSON.parse(localStorage.getItem("ystudy_saved_tools") || "[]");
      setTools(savedTools);
    } catch (e) {}

    try {
      const savedFunding = JSON.parse(localStorage.getItem("ystudy_funding_profile") || "null");
      setFunding(savedFunding);
    } catch (e) {}

    try {
      const savedAdviser = JSON.parse(localStorage.getItem("ystudy_adviser_context") || "null");
      setAdviser(savedAdviser);
    } catch (e) {}
  }, []);

  return (
    <SiteLayout showBottomNav={true}>
      <main className="dash-shell">
        <div className="wrap">
          <span className="eyebrow o" style={{ marginBottom: "16px" }}>Student Dashboard</span>
          <h1 className="h1" style={{ marginBottom: "8px" }}>Your YStudy progress.</h1>
          <p className="lead" style={{ marginBottom: "28px" }}>
            This static version saves tool results locally in your browser. No database connection is required.
          </p>

          <div className="journey">
            <span>Explore</span>
            <span>Match</span>
            <span>Funding</span>
            <span>Apply</span>
            <span>Enrol</span>
            <span>Graduate</span>
          </div>

          <section className="dash-grid">
            <article className="dash-card">
              <h3>Saved tool results</h3>
              <div className="saved-list">
                {tools.length > 0 ? (
                  tools.slice(0, 8).map((i, index) => (
                    <div key={index} className="saved-item">
                      <b>{i.title}</b>
                      <small>
                        {i.type} · {new Date(i.savedAt).toLocaleString()}
                      </small>
                      <p style={{ margin: "8px 0" }}>{i.summary || "Saved result"}</p>
                      <Link href={i.url || "#"} className="btn blue sm" style={{ minHeight: "36px", padding: "0 14px", fontSize: "13px" }}>
                        Open tool
                      </Link>
                    </div>
                  ))
                ) : (
                  <p>No saved results yet. Complete a tool and press save.</p>
                )}
              </div>
            </article>

            <article className="dash-card">
              <h3>Funding Profile</h3>
              <div id="fundingProfile">
                {funding ? (
                  <div className="saved-item">
                    <b>Eligibility profile saved</b>
                    <p style={{ margin: "8px 0" }}>
                      {Object.values(funding.answers || {}).slice(0, 5).join(" · ")}
                    </p>
                  </div>
                ) : (
                  <p>Complete the Eligibility Checker to save your funding profile.</p>
                )}
              </div>
            </article>

            <article className="dash-card">
              <h3>Adviser Context</h3>
              <div id="adviserContext">
                {adviser ? (
                  <div className="saved-item">
                    <b>{adviser.title || adviser.from || "Adviser context"}</b>
                    <p style={{ margin: "8px 0" }}>{adviser.summary || "Tool result attached"}</p>
                  </div>
                ) : (
                  <p>Send a result to an adviser from any tool.</p>
                )}
              </div>
            </article>

            <article className="dash-card">
              <h3>CVs & Statements</h3>
              <p style={{ margin: "8px 0 16px" }}>Use the CV Builder and Personal Statement Builder to create and save drafts locally.</p>
              <Link className="btn blue sm" href="/tools/cv-builder">Open CV Builder</Link>
            </article>

            <article className="dash-card">
              <h3>Applications</h3>
              <p style={{ margin: "8px 0 16px" }}>Start or continue your YStudy application.</p>
              <Link className="btn orange sm" href="/apply">Apply with YStudy</Link>
            </article>

            <article className="dash-card">
              <h3>Appointments</h3>
              <p style={{ margin: "8px 0 16px" }}>Book a free adviser call.</p>
              <Link className="btn outline sm" href="/lead/adviser-call">Book Adviser Call</Link>
            </article>
          </section>
        </div>
      </main>
    </SiteLayout>
  );
}
