import React from "react";
import { getCMSPageContent } from "@/services/cms.service";
import { getFAQBySlug } from "@/services/faq.service";
import { ConversionStrip, CrossLinks } from "@/components/sections";
import Link from "next/link";

export default async function Faq() {
  const data = await getCMSPageContent("faqs");

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>FAQ Page Not Found</h2>
        <p>We couldn't retrieve the questions at this time.</p>
        <Link href="/" className="btn btn-blue" style={{ marginTop: "1rem" }}>Go to Home</Link>
      </div>
    );
  }

  // Fetch dynamic FAQs from DB
  const dbFaqs = (await getFAQBySlug("faqs")) || (await getFAQBySlug("faq"));

  const s2 = data.section_2 || {};
  const s3 = data.section_3 || {};
  const s4 = data.section_4 || {};
  const s5 = data.section_5 || {};

  // Combine dynamic FAQs and fallbacks
  const faqs = (dbFaqs && dbFaqs.length > 0) ? dbFaqs : (s2.faqs || []);

  return (
    <div className="faq-page">
      <main className="section">
        <div className="container" style={{ textAlign: "left" }}>
          {s2.status !== false && (
            <>
              <span className="kicker">{s2.badge || "Resource"}</span>
              <h1>{s2.title || "Common questions about studying with YStudy."}</h1>
              <p className="lead" style={{ marginTop: "12px", marginBottom: "32px", maxWidth: "800px" }}>
                {s2.description || "Find answers about courses, funding, eligibility, applications and adviser support."}
              </p>
            </>
          )}

          {s3.status !== false && (
            <div className="cards" style={{ marginBottom: "40px" }}>
              <article className="card" style={{ padding: "2rem", border: "1px solid var(--border)", borderRadius: "12px", background: "var(--soft)" }}>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#102033", marginBottom: "8px" }}>
                  {s3.title || "Need personal guidance?"}
                </h3>
                <p style={{ color: "var(--muted)", marginBottom: "16px", fontSize: "15px" }}>
                  {s3.description || "Speak to a YStudy adviser before you apply."}
                </p>
                <Link className="btn btn-orange" href="/lead/adviser-call">
                  Book adviser call
                </Link>
              </article>
            </div>
          )}

          {faqs.length > 0 && (
            <div className="faq-list" style={{ display: "grid", gap: "16px", maxWidth: "800px", marginTop: "32px", marginBottom: "48px" }}>
              {faqs.map((faq: any, idx: number) => (
                <details key={faq._id || idx} className="info-card" style={{ background: "var(--soft)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.25rem", cursor: "pointer" }}>
                  <summary style={{ fontWeight: 700, fontSize: "17px", color: "#102033", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{faq.question || faq.q}</span>
                    <span className="caret" style={{ fontSize: "14px", color: "var(--muted)" }}>⌄</span>
                  </summary>
                  <p style={{ marginTop: "12px", color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.6 }}>
                    {faq.answer || faq.a}
                  </p>
                </details>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* CONVERSION SYSTEM STRIP */}
      {s4.status !== false && (
        <ConversionStrip cards={s4.cards} />
      )}

      {/* CROSSLINKS */}
      {s5.status !== false && (
        <CrossLinks title={s5.title} description={s5.description} cards={s5.cards} />
      )}
    </div>
  );
}
