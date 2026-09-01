/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ApplyFormWidget from "@/components/widgets/ApplyFormWidget";
import "@/app/tools/tools.css";
import { QualificationConversionCards, QualificationCrosslinks } from "@/components/ui";
import { getCMSPageContent } from "@/services/cms.service";
import { getFAQBySlug } from "@/services/faq.service";
import { Banner } from "@/components/ui/Banner";
import Link from "next/link";

export default async function Apply() {
  const data = await getCMSPageContent("apply");

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Application Details Not Found</h2>
        <p>We couldn&apos;t retrieve the application guidance at this time.</p>
        <Link href="/" className="btn btn-blue" style={{ marginTop: "1rem" }}>Go to Home</Link>
      </div>
    );
  }

  const s2 = data?.section_2 || {};
  const s3 = data?.section_3 || {};
  const s4 = data?.section_4 || {};
  const s5 = data?.section_5 || {};
  const s6 = data?.section_6 || {};
  const s7 = data?.section_7 || {};
  const s8 = data?.section_8 || {};
  const s9 = data?.section_9 || {};

  const defaultFaqs = [
    { title: "Is YStudy guidance free?", description: "Yes. YStudy guidance is free for students." },
    { title: "Do I need to know the course already?", description: "No. Choose “not sure” in the form and an adviser can help you shortlist routes." },
    { title: "Can I apply as a mature student?", description: "Yes. Many YStudy users are working adults returning to education." },
    { title: "Is Student Finance guaranteed?", description: "No. Student Finance and admission decisions are made by the official provider or funding body." }
  ];

  const backendFaqs = await getFAQBySlug("apply");

  const faqs = (backendFaqs && backendFaqs.length > 0)
    ? backendFaqs
    : (s6.cards && s6.cards.length > 0 ? s6.cards : defaultFaqs);

  return (
    <div className="apply-page">
      {/* HERO SECTION */}
      <Banner
        slug="apply"
        fallbackBadgeText="★ Apply with YStudy"
        fallbackTitle="Apply with confidence — not confusion."
        fallbackDescription="Complete one short form and a YStudy adviser will help you check suitable courses, documents and Student Finance before you commit."
        fallbackBgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2200&q=85"
        fallbackRightCard={{
          layoutType: "guide-hero",
          title: "Your next step, organised",
          description: "Clear, practical support before the next decision.",
          items: [
            { title: "Free", subtitle: "guidance" },
            { title: "Docs", subtitle: "checked" },
            { title: "SFE", subtitle: "support" }
          ]
        }}
      >
        <div className="btnrow" style={{ marginTop: "18px" }}>
          <a className="btn btn-orange" href="#apply-form">
            Start application →
          </a>
          <Link className="btn btn-white" href="/lead/adviser-call">
            Book adviser call
          </Link>
        </div>
      </Banner>

      {/* HOW IT WORKS */}
      {s2.status !== false && (
        <section className="v705-sec">
          <div className="v705-wrap">
            <div className="v705-head">
              <span className="kicker">{s2.badge || "How it works"}</span>
              <h2>{s2.title || "From interest to application in four clear steps."}</h2>
              <p>{s2.description || "YStudy keeps the process practical. You do not need to know the perfect degree before you start — we help you choose, check and apply."}</p>
            </div>
            <div className="v705-grid four">
              {(s2.cards || []).map((step: any, idx: number) => (
                <div className="v705-card" key={idx}>
                  <div className="v705-num">{step.number || (idx + 1)}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STUDENT SUPPORT */}
      {s3.status !== false && (
        <section className="v705-sec v705-soft">
          <div className="v705-wrap">
            <div className="v705-head">
              <span className="kicker">{s3.badge || "Student support"}</span>
              <h2>{s3.title || "What YStudy can help you with."}</h2>
              <p>{s3.description || "Useful support for mature students, workers, parents and career changers who need a flexible university route."}</p>
            </div>
            <div className="v705-grid">
              {(s3.cards || []).map((card: any, idx: number) => (
                <div className="v705-card" key={idx}>
                  <div className="v705-icon" style={{ fontSize: "28px" }}>{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DOCUMENT CHECKLIST */}
      {s4.status !== false && (
        <section className="v705-sec">
          <div className="v705-wrap">
            <div className="v705-grid">
              <div className="v705-card dark">
                <span className="kicker">{s4.badge || "Checklist"}</span>
                <h2 style={{ color: "#fff" }}>{s4.title || "Documents usually needed."}</h2>
                <p>{s4.description || "Exact requirements depend on the university and your situation, but most applicants should prepare these."}</p>
              </div>
              <div className="v705-card" style={{ gridColumn: "span 2" }}>
                <div className="v705-checks">
                  {(s4.pointers || []).map((pt: string, idx: number) => (
                    <div key={idx}>{pt}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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
      {s5.status !== false && (
        <section className="v705-sec v705-soft">
          <div className="v705-wrap">
            <div className="v705-head">
              <span className="kicker">{s5.badge || "Why students use us"}</span>
              <h2>{s5.title || "A serious, practical application service."}</h2>
              <p>{s5.description || "The goal is not to push any course. The goal is to help you choose a route you can realistically start, fund and complete."}</p>
            </div>
            <div className="v705-grid">
              {(s5.cards || []).map((card: any, idx: number) => (
                <div className="v705-card v705-testimonial" key={idx}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQS */}
      {s6.status !== false && (
        <section className="v705-sec">
          <div className="v705-wrap v705-faq">
            <div className="v705-head">
              <span className="kicker">{s6.badge || "FAQ"}</span>
              <h2>{s6.title || "Common application questions."}</h2>
            </div>
            {faqs.map((faq: any, idx: number) => (
              <details key={idx} open={idx === 0}>
                <summary>{faq.question || faq.q || faq.title}</summary>
                <p>{faq.answer || faq.a || faq.description}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* FOOTER CTA */}
      {s7.status !== false && (
        <section className="v705-sec">
          <div className="v705-wrap">
            <div className="v705-band">
              <div>
                <h2>{s7.title || "Ready to check your route?"}</h2>
                <p>{s7.description || "Start with one form. We will help you understand your course, funding and documents."}</p>
              </div>
              <a className="btn btn-orange" href="#apply-form">
                Start application →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* THREE LINK CARDS CONVERSION SYSTEM */}
      <QualificationConversionCards sectionData={s8} />

      {/* CROSSLINKS SECTION */}
      <QualificationCrosslinks sectionData={s9} />
    </div>
  );
}
