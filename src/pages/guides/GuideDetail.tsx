import { getCMSPageContent } from "@/services/cms.service";
import { getFAQBySlug } from "@/services/faq.service";
import "@/app/degrees/qualifications/qualifications.css";
import { Banner } from "@/components/ui/Banner";
import { QualificationConversionCards } from "@/components/ui";

interface GuideDetailProps {
  slug: string;
}

export default async function GuideDetail({ slug }: GuideDetailProps) {
  const [data, faqs] = await Promise.all([
    getCMSPageContent(slug),
    getFAQBySlug(slug)
  ]);

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Guide Not Found</h2>
        <p>We couldn't retrieve the guide details for "{slug}".</p>
        <a href="/guides" className="btn btn-blue" style={{ marginTop: "1rem" }}>All Resources</a>
      </div>
    );
  }

  // Format title for fallback headers
  const title = (slug || "").replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="qualification-page guide-detail-page">
      {/* HERO SECTION DYNAMIZED WITH BANNER MODULE */}
      <Banner
        slug={slug}
        fallbackTitle={title}
        fallbackDescription="Read our professional guide for mature students and adult learners."
        fallbackBadgeText="YStudy Student Guide"
        fallbackBgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2200&q=80"
      >
        <div style={{ textAlign: "left", width: "100%" }}>
          <p className="bc" style={{ margin: "0 0 16px", color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>
            <a href="/" style={{ color: "#fff", textDecoration: "none" }}>Home</a> ›{" "}
            <a href="/guides" style={{ color: "#fff", textDecoration: "none" }}>Guides</a> › {title}
          </p>
          <div className="btnrow" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}>
            <a className="btn orange" href="#read-guide">Read guide ↓</a>
            <a className="btn ghost" href="/lead/adviser-call">Speak with an adviser</a>
          </div>
        </div>
      </Banner>

      {/* CHALLENGES CHECKLIST (like Polish Community) */}
      {data.challenges && (
        <section className="qf-sec" id="read-guide">
          <div className="qf" style={{ textAlign: "left" }}>
            <div className="qf-head">
              <span className="kicker">Important requirements</span>
              <h2>Key challenges and solutions.</h2>
              <p>Understanding these steps early helps avoid common student finance delays.</p>
            </div>
            
            <div className="qf-grid3">
              {data.challenges.map((c: any, idx: number) => (
                <div className="fcard" key={idx} style={{ position: "relative" }}>
                  <div className="n" style={{ background: "var(--o)" }}>{c.num || (idx + 1)}</div>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DYNAMIC STORIES / TESTIMONIALS */}
      {data.stories && (
        <section className="qf-sec" style={{ background: "var(--soft)" }}>
          <div className="qf" style={{ textAlign: "left" }}>
            <div className="qf-head">
              <span className="kicker">Student journeys</span>
              <h2>Real stories from the community.</h2>
              <p>How other mature learners managed qualification recognition and residency pathways.</p>
            </div>

            <div className="qf-courses">
              {data.stories.map((s: any, idx: number) => (
                <article className="qcard" key={idx}>
                  <div className="ph" style={{ aspectRatio: "16/10" }}>
                    <img src={s.image || "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"} alt={s.author} />
                    <div className="tags">
                      <span style={{ background: "rgba(10, 82, 214, 0.9)" }}>{s.location}</span>
                    </div>
                  </div>
                  <div className="cb" style={{ display: "flex", flexDirection: "column", flex: 1, padding: "1.25rem" }}>
                    <h3 style={{ margin: "0 0 8px", fontSize: "19px", fontWeight: 900 }}>{s.author}</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", margin: "4px 0 12px" }}>
                      {s.path?.map((p: string, pIdx: number) => (
                        <span key={pIdx} style={{ fontSize: "11px", background: "rgba(7, 17, 38, 0.05)", padding: "3px 8px", borderRadius: "4px" }}>
                          {pIdx > 0 ? "→ " : ""}{p}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STANDARD ACCORDION Q&A / FAQS */}
      {((faqs && faqs.length > 0) || data.faqs) && (
        <section className="qf-sec">
          <div className="qf" style={{ textAlign: "left" }}>
            <div className="qf-head" style={{ marginBottom: "2rem" }}>
              <span className="kicker">Frequently Asked Questions</span>
              <h2>Common questions answered.</h2>
            </div>
            
            <div className="qf-faq">
              {(faqs && faqs.length > 0 ? faqs : data.faqs).map((faq: any, idx: number) => (
                <details key={idx} className="faqi" open={idx === 0}>
                  <summary>{faq.question || faq.q}</summary>
                  <p>{faq.answer || faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RENDER FALLBACK SECTIONS IF PRESENT (like section_2, section_3, etc.) */}
      {Object.keys(data).map((key) => {
        if (!key.startsWith("section_") || key === "section_1") return null;
        const section = data[key];
        if (section?.status === false) return null;

        return (
          <section className="qf-sec" key={key} style={{ background: key.match(/\d+/) && parseInt(key.match(/\d+/)![0]) % 2 === 0 ? "var(--soft)" : "transparent" }}>
            <div className="qf" style={{ textAlign: "left" }}>
              <div className="qf-head">
                {section.badge && <span className="kicker">{section.badge}</span>}
                {section.title && <h2>{section.title}</h2>}
                {section.description && <p>{section.description}</p>}
              </div>

              {section.cards && (
                <div className="qf-grid3">
                  {section.cards.map((c: any, idx: number) => (
                    <div className="fcard" key={idx}>
                      <h3>{c.title}</h3>
                      <p>{c.description || c.link}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* CONVERSION PANEL */}
      <QualificationConversionCards />
    </div>
  );
}
