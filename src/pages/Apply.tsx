import React from "react";
import ApplyFormWidget from "@/components/widgets/ApplyFormWidget";
import "@/app/tools/tools.css";
import { QualificationConversionCards, QualificationCrosslinks } from "@/components/ui";

export default function Apply() {
  return (
    <div className="apply-page">
      {/* HERO SECTION */}
      <section className="apply-tlh" style={{ position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <img
          className="apply-tlhbg"
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2200&q=85"
          alt="Students planning their next step with an adviser"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        />
        <div className="apply-tlhsc" style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg, rgba(7, 17, 38, 0.95), rgba(7, 17, 38, 0.75) 58%, rgba(7, 17, 38, 0.42))", zIndex: 1 }}></div>
        <div className="apply-tlhin" style={{ position: "relative", zIndex: 2, width: "min(1680px, calc(100% - 44px))", margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "28px", alignItems: "center", padding: "60px 0", color: "#fff" }}>
          <div>
            <span className="apply-tlhk" style={{ display: "inline-block", background: "rgba(255,255,255,0.18)", padding: "6px 14px", borderRadius: "999px", fontSize: "12px", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.05em", border: "1px solid rgba(255,255,255,0.3)" }}>
              ★ Apply with YStudy
            </span>
            <h1 style={{ color: "#fff", marginTop: "16px", marginBottom: "14px", fontWeight: 900, lineHeight: 1.05 }}>
              Apply with confidence — not confusion.
            </h1>
            <p className="apply-tlhlead" style={{ fontSize: "18px", lineHeight: 1.5, color: "rgba(255,255,255,0.92)" }}>
              Complete one short form and a YStudy adviser will help you check suitable courses, documents and Student Finance before you commit.
            </p>
            <div className="apply-tlhrow" style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <a className="apply-tlhbtn orange btn btn-orange" href="#apply-form">
                Start application →
              </a>
              <a className="apply-tlhbtn ghost btn" href="/lead/adviser-call" style={{ border: "2px solid rgba(255,255,255,0.4)", color: "#fff", background: "rgba(255,255,255,0.1)" }}>
                Book adviser call
              </a>
            </div>
          </div>

          <div className="apply-tlpanel" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.24)", borderRadius: "16px", padding: "22px" }}>
            <div className="tph" style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.04em", opacity: 0.8, marginBottom: "8px", fontWeight: 800 }}>
              Your next step
            </div>
            <div className="big" style={{ fontSize: "28px", fontWeight: 900, lineHeight: 1.2 }}>
              Organised adviser support
            </div>
            <div className="sub" style={{ fontSize: "13px", opacity: 0.85, marginTop: "8px", marginBottom: "16px" }}>
              A serious, practical route check before you send documents or choose a course.
            </div>
            <div className="apply-tlgrid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
              <div className="c" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", padding: "10px" }}>
                <b style={{ display: "block", fontSize: "18px", fontWeight: 900 }}>Free</b>
                <span style={{ fontSize: "11px", opacity: 0.8 }}>guidance</span>
              </div>
              <div className="c" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", padding: "10px" }}>
                <b style={{ display: "block", fontSize: "18px", fontWeight: 900 }}>Docs</b>
                <span style={{ fontSize: "11px", opacity: 0.8 }}>checked</span>
              </div>
              <div className="c" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", padding: "10px" }}>
                <b style={{ display: "block", fontSize: "18px", fontWeight: 900 }}>SFE</b>
                <span style={{ fontSize: "11px", opacity: 0.8 }}>support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="v705-sec">
        <div className="v705-wrap">
          <div className="v705-head">
            <span className="kicker">How it works</span>
            <h2>From interest to application in four clear steps.</h2>
            <p>
              YStudy keeps the process practical. You do not need to know the perfect degree before you start — we help you choose, check and apply.
            </p>
          </div>
          <div className="v705-grid four">
            <div className="v705-card">
              <div className="v705-num">1</div>
              <h3>Choose a direction</h3>
              <p>Tell us your goals, work background and subject interests. We shortlist realistic degree routes.</p>
            </div>
            <div className="v705-card">
              <div className="v705-num">2</div>
              <h3>Check eligibility</h3>
              <p>We look at residency, previous study, qualifications and Student Finance questions before you waste time.</p>
            </div>
            <div className="v705-card">
              <div className="v705-num">3</div>
              <h3>Prepare documents</h3>
              <p>You receive a clear checklist for ID, status, qualifications, CV or personal statement.</p>
            </div>
            <div className="v705-card">
              <div className="v705-num">4</div>
              <h3>Submit and enrol</h3>
              <p>We support your application steps, interview preparation and enrolment communication.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STUDENT SUPPORT */}
      <section className="v705-sec v705-soft">
        <div className="v705-wrap">
          <div className="v705-head">
            <span className="kicker">Student support</span>
            <h2>What YStudy can help you with.</h2>
            <p>Useful support for mature students, workers, parents and career changers who need a flexible university route.</p>
          </div>
          <div className="v705-grid">
            <div className="v705-card">
              <div className="v705-icon">🎓</div>
              <h3>Course selection</h3>
              <p>Business, health, computing, psychology, law, construction and other practical degree routes.</p>
            </div>
            <div className="v705-card">
              <div className="v705-icon">£</div>
              <h3>Student Finance guidance</h3>
              <p>Tuition Fee Loan, Maintenance Loan, grants and common questions about previous study.</p>
            </div>
            <div className="v705-card">
              <div className="v705-icon">🧾</div>
              <h3>Document checks</h3>
              <p>We help you understand what documents are normally requested and how to prepare them.</p>
            </div>
            <div className="v705-card">
              <div className="v705-icon">✍️</div>
              <h3>Personal statement</h3>
              <p>Structure your motivation, experience and career plan clearly for admissions teams.</p>
            </div>
            <div className="v705-card">
              <div className="v705-icon">💬</div>
              <h3>Interview confidence</h3>
              <p>Practice explaining why you want the course and how you will manage study.</p>
            </div>
            <div className="v705-card">
              <div className="v705-icon">✅</div>
              <h3>Application tracking</h3>
              <p>Know what has been submitted, what is pending and what your next step is.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENT CHECKLIST */}
      <section className="v705-sec">
        <div className="v705-wrap">
          <div className="v705-grid">
            <div className="v705-card dark">
              <span className="kicker">Checklist</span>
              <h2 style={{ color: "#fff" }}>Documents usually needed.</h2>
              <p>Exact requirements depend on the university and your situation, but most applicants should prepare these.</p>
            </div>
            <div className="v705-card" style={{ gridColumn: "span 2" }}>
              <div className="v705-checks">
                <div>Passport or national ID</div>
                <div>Share code / residency evidence</div>
                <div>Proof of address</div>
                <div>Qualification certificates</div>
                <div>CV if you apply with experience</div>
                <div>Personal statement or motivation notes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLY FORM SECTION */}
      <section className="form-first" id="apply-form">
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="form-card" style={{ background: "transparent", padding: 0, border: "none" }}>
            <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>Complete one short form.</h2>
            <p className="intro" style={{ textAlign: "center", marginBottom: "2rem", color: "var(--muted)" }}>
              Complete this form and we will contact you within one working day. You do not need to know the perfect course yet.
            </p>
            <ApplyFormWidget />
          </div>
        </div>
      </section>

      {/* WHY STUDENTS USE US */}
      <section className="v705-sec v705-soft">
        <div className="v705-wrap">
          <div className="v705-head">
            <span className="kicker">Why students use us</span>
            <h2>A serious, practical application service.</h2>
            <p>The goal is not to push any course. The goal is to help you choose a route you can realistically start, fund and complete.</p>
          </div>
          <div className="v705-grid">
            <div className="v705-card v705-testimonial">
              <h3>“I finally understood my options.”</h3>
              <p>Many students come to us unsure about funding, entry routes or flexible study. We turn that into a clear next step.</p>
            </div>
            <div className="v705-card v705-testimonial">
              <h3>“The checklist helped me move faster.”</h3>
              <p>Applications often slow down because documents are missing. A clear list helps you prepare early.</p>
            </div>
            <div className="v705-card v705-testimonial">
              <h3>“I needed someone to explain it simply.”</h3>
              <p>Especially for mature students, practical guidance can make university feel possible again.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="v705-sec">
        <div className="v705-wrap v705-faq">
          <div className="v705-head">
            <span className="kicker">FAQ</span>
            <h2>Common application questions.</h2>
          </div>
          <details open>
            <summary>Is YStudy guidance free?</summary>
            <p>Yes. YStudy guidance is free for students.</p>
          </details>
          <details>
            <summary>Do I need to know the course already?</summary>
            <p>No. Choose “not sure” in the form and an adviser can help you shortlist routes.</p>
          </details>
          <details>
            <summary>Can I apply as a mature student?</summary>
            <p>Yes. Many YStudy users are working adults returning to education.</p>
          </details>
          <details>
            <summary>Is Student Finance guaranteed?</summary>
            <p>No. Student Finance and admission decisions are made by the official provider or funding body.</p>
          </details>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="v705-sec">
        <div className="v705-wrap">
          <div className="v705-band">
            <div>
              <h2>Ready to check your route?</h2>
              <p>Start with one form. We will help you understand your course, funding and documents.</p>
            </div>
            <a className="btn btn-orange" href="#apply-form">
              Start application →
            </a>
          </div>
        </div>
      </section>

      {/* THREE LINK CARDS CONVERSION SYSTEM */}
      <QualificationConversionCards />

      {/* CROSSLINKS SECTION */}
      <QualificationCrosslinks />
    </div>
  );
}
