import React from "react";
import Link from "next/link";
import "@/app/degrees/subject.css";
import { Banner, QualificationConversionCards, QualificationFaqs, QualificationCrosslinks } from "@/components/ui";

interface SubjectDetailProps {
  subject: string;
  subjectData?: any;
  courses?: any[];
  dbFaqs?: any[];
}

export default function SubjectDetail({ subject, subjectData, courses, dbFaqs }: SubjectDetailProps) {
  const cms = subjectData?.cms || {};
  const title = subjectData?.title || subject.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const heroImage = subjectData?.fullImageUrl || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2000&q=85";

  // Section 2 - Popular Courses
  const sec2 = cms.section_2 || {};
  const sec2Badge = sec2.badge || "Popular courses";
  const sec2Title = sec2.title || `${title} courses adults often compare.`;
  const sec2Desc = sec2.description || "Use these as starting points. An adviser can help you choose the most realistic route.";

  const coursesList = (courses && courses.length > 0) ? courses : null;

  // Section 3 - Why Study
  const sec3 = cms.section_3 || {};
  const sec3Badge = sec3.badge || "Why study this subject?";
  const sec3Title = sec3.title || "Useful if you want a practical career direction.";
  const sec3Desc = sec3.description || "This subject can work well for mature students because it connects study with real job roles, progression and professional confidence.";
  const sec3Cards = Array.isArray(sec3.cards) && sec3.cards.length > 0 ? sec3.cards : [
    { title: "Career change", description: "Use the degree to move into a new sector with a recognised academic route." },
    { title: "Promotion route", description: "Formalise work experience and prepare for supervisor, manager or specialist roles." },
    { title: "Flexible study", description: "Compare blended, online and campus routes around work and family commitments." }
  ];

  // Section 4 - Career Outcomes
  const sec4 = cms.section_4 || {};
  const sec4Badge = sec4.badge || "Career outcomes";
  const sec4Title = sec4.title || "Roles this subject can lead towards.";
  const sec4Cards = Array.isArray(sec4.cards) && sec4.cards.length > 0 ? sec4.cards : [
    { title: "Care Coordinator", description: "Build relevant academic knowledge, transferable skills and practical confidence for this direction." },
    { title: "Support Manager", description: "Build relevant academic knowledge, transferable skills and practical confidence for this direction." },
    { title: "Public Health Officer", description: "Build relevant academic knowledge, transferable skills and practical confidence for this direction." },
    { title: "Safeguarding Lead", description: "Build relevant academic knowledge, transferable skills and practical confidence for this direction." },
    { title: "Service Manager", description: "Build relevant academic knowledge, transferable skills and practical confidence for this direction." }
  ];

  // Section 5 - Salary Progression
  const sec5 = cms.section_5 || {};
  const sec5Badge = sec5.badge || "Salary progression";
  const sec5Title = sec5.title || "Typical earning stages to compare.";
  const sec5Desc = sec5.description || "Figures vary by region, employer and experience, but students like to see the pathway clearly.";
  const sec5Cards = Array.isArray(sec5.cards) && sec5.cards.length > 0 ? sec5.cards : [
    { title: "Entry", price: "£23k", description: "First graduate or transition roles." },
    { title: "Progressed", price: "£38k", description: "Experienced specialist or manager roles." },
    { title: "Senior", price: "£55k+", description: "Leadership, consultancy or high-responsibility roles." }
  ];

  // Section 6 - Funding Snapshot
  const sec6 = cms.section_6 || {};
  const sec6Cards = Array.isArray(sec6.cards) && sec6.cards.length > 0 ? sec6.cards : [
    {
      className: "v705-card dark",
      badge: "Funding snapshot",
      title: "Check funding before you apply.",
      description: "Most full-time undergraduate routes can be supported by Tuition Fee Loan and Maintenance Loan if you meet eligibility rules."
    },
    {
      className: "v705-card",
      title: "Tuition Fee Loan",
      description: "Can cover eligible tuition fees so you do not usually pay upfront.",
      link: "/funding/tuition-fee-loan",
      linkName: "Learn more"
    },
    {
      className: "v705-card",
      title: "Maintenance Loan",
      description: "Can help with living costs while studying. Amount depends on your circumstances.",
      link: "/funding/maintenance-loan",
      linkName: "Estimate support"
    }
  ];

  // Section 7 - Related Subjects
  const sec7 = cms.section_7 || {};
  const sec7Badge = sec7.badge || "Related subjects";
  const sec7Title = sec7.title || "Compare nearby routes.";

  // Section 8 - FAQ
  const sec8 = cms.section_8 || {};
  const sec8Badge = sec8.badge || "FAQ";
  const sec8Title = sec8.title || `Questions before choosing ${title}.`;

  // Section 9 - Callout Band
  const sec9 = cms.section_9 || {};
  const sec9Title = sec9.title || `Want help choosing a ${title} course?`;
  const sec9Desc = sec9.description || "Check your eligibility or apply with adviser support.";

  return (
    <main>
      {/* CENTRAL BANNER COMPONENT MAPPED WITH SLUG & BACKEND */}
      <Banner
        slug={subject}
        fallbackTitle={`${title} degrees with purpose.`}
        fallbackDescription={subjectData?.description || "Build a route into care leadership, public health, safeguarding, community support or health service management."}
        fallbackBadgeText={`Subject area · ${title}`}
        fallbackBgImage={heroImage}
      >
        <div className="sfe" style={{ marginTop: "18px" }}>
          <span className="ck">✓</span>
          <span>
            Courses in this area may be eligible for <b>Tuition Fee Loan</b>, <b>Maintenance Loan</b> and grants depending on your circumstances.{" "}
            <Link href="/funding" style={{ color: "#fff", textDecoration: "underline" }}>Estimate your funding →</Link>
          </span>
        </div>
        <div className="btnrow" style={{ display: "flex", gap: "12px", marginTop: "22px", flexWrap: "wrap" }}>
          <a className="sbtn white" href="#courses">View courses ↓</a>
          <Link className="sbtn ghost" href="/tools/eligibility-checker">Check eligibility</Link>
        </div>
      </Banner>

      {/* SECTION 2: POPULAR COURSES */}
      {sec2.status !== false && (
        <section className="sbj-sec" id="courses">
          <div className="sbj">
            <div className="sbj-head">
              <span className="kicker">{sec2Badge}</span>
              <h2>{sec2Title}</h2>
              <p>{sec2Desc}</p>
            </div>
            <div className="sbj-courses">
              {coursesList ? (
                coursesList.map((c: any, idx: number) => {
                  const courseTitle = c.title || `${title} Degree`;
                  const courseImg = c.fullImageUrl || c.image || heroImage;
                  const tags = (c.tags && c.tags.length > 0) ? c.tags : ["Flexible", "SFE check", "Mature students"];
                  const courseDesc = c.description || c.shortDescription || "A practical course route for adults who want career progression, a recognised qualification and structured support.";
                  const courseLink = c.courseType === "Social" ? `/degrees/course/${c.slug}` : `/degrees/${c.slug}`;

                  return (
                    <article key={c._id || idx} className="ccard">
                      <div className="cph">
                        <img src={courseImg} alt={courseTitle} />
                        <div className="tags">
                          {tags.map((tag: string, tIdx: number) => (
                            <span key={tIdx}>{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className="cb">
                        <h3>{courseTitle}</h3>
                        <p>{courseDesc}</p>
                        <div className="out">✅ Funding and entry requirements depend on provider</div>
                        <div className="cbtn">
                          <Link className="v" href={courseLink}>View</Link>
                          <Link className="a" href={`/apply?course=${c.slug || ''}`}>Apply</Link>
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <>
                  <article className="ccard">
                    <div className="cph">
                      <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2000&q=85" alt="Health & Social Care" />
                      <div className="tags">
                        <span>Flexible</span>
                        <span>SFE check</span>
                        <span>Mature students</span>
                      </div>
                    </div>
                    <div className="cb">
                      <h3>BA Health &amp; Social Care</h3>
                      <p>A practical course route for adults who want career progression, a recognised qualification and structured support.</p>
                      <div className="out">✅ Funding and entry requirements depend on provider</div>
                      <div className="cbtn">
                        <Link className="v" href="/degrees">View</Link>
                        <Link className="a" href="/apply">Apply</Link>
                      </div>
                    </div>
                  </article>

                  <article className="ccard">
                    <div className="cph">
                      <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2000&q=85" alt="Public Health" />
                      <div className="tags">
                        <span>Flexible</span>
                        <span>SFE check</span>
                        <span>Mature students</span>
                      </div>
                    </div>
                    <div className="cb">
                      <h3>Public Health</h3>
                      <p>A practical course route for adults who want career progression, a recognised qualification and structured support.</p>
                      <div className="out">✅ Funding and entry requirements depend on provider</div>
                      <div className="cbtn">
                        <Link className="v" href="/degrees">View</Link>
                        <Link className="a" href="/apply">Apply</Link>
                      </div>
                    </div>
                  </article>

                  <article className="ccard">
                    <div className="cph">
                      <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2000&q=85" alt="Health Management Foundation Year" />
                      <div className="tags">
                        <span>Flexible</span>
                        <span>SFE check</span>
                        <span>Mature students</span>
                      </div>
                    </div>
                    <div className="cb">
                      <h3>Health Management Foundation Year</h3>
                      <p>A practical course route for adults who want career progression, a recognised qualification and structured support.</p>
                      <div className="out">✅ Funding and entry requirements depend on provider</div>
                      <div className="cbtn">
                        <Link className="v" href="/degrees">View</Link>
                        <Link className="a" href="/apply">Apply</Link>
                      </div>
                    </div>
                  </article>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: WHY STUDY THIS SUBJECT */}
      {sec3.status !== false && (
        <section className="v705-sec v705-soft">
          <div className="v705-wrap">
            <div className="v705-head">
              <span className="kicker">{sec3Badge}</span>
              <h2>{sec3Title}</h2>
              <p>{sec3Desc}</p>
            </div>
            <div className="v705-grid">
              {sec3Cards.map((card: any, idx: number) => (
                <div key={idx} className="v705-card">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: CAREER OUTCOMES */}
      {sec4.status !== false && (
        <section className="v705-sec">
          <div className="v705-wrap">
            <div className="v705-head">
              <span className="kicker">{sec4Badge}</span>
              <h2>{sec4Title}</h2>
            </div>
            <div className="v705-grid">
              {sec4Cards.map((card: any, idx: number) => (
                <div key={idx} className="v705-card">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: SALARY PROGRESSION */}
      {sec5.status !== false && (
        <section className="v705-sec v705-soft">
          <div className="v705-wrap">
            <div className="v705-head">
              <span className="kicker">{sec5Badge}</span>
              <h2>{sec5Title}</h2>
              <p>{sec5Desc}</p>
            </div>
            <div className="v705-salary">
              {sec5Cards.map((card: any, idx: number) => (
                <div key={idx} className="v705-card">
                  <span>{card.title}</span>
                  <strong>{card.price}</strong>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6: FUNDING SNAPSHOT */}
      {sec6.status !== false && (
        <section className="v705-sec">
          <div className="v705-wrap">
            <div className="v705-grid">
              {sec6Cards.map((card: any, idx: number) => (
                <div key={idx} className={card.className || "v705-card"}>
                  {card.badge && <span className="kicker" style={{ color: card.className?.includes("dark") ? "#9cc0ff" : "var(--o-deep)" }}>{card.badge}</span>}
                  <h3 style={{ color: card.className?.includes("dark") ? "#fff" : "var(--ink)" }}>{card.title}</h3>
                  <p>{card.description}</p>
                  {card.link && (
                    <Link className={card.linkName?.includes("Estimate") ? "btn btn-orange" : "btn btn-blue"} href={card.link}>
                      {card.linkName || "Learn more"}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 7: RELATED SUBJECTS */}
      {sec7.status !== false && (
        <section className="v705-sec v705-soft">
          <div className="v705-wrap">
            <div className="v705-head">
              <span className="kicker">{sec7Badge}</span>
              <h2>{sec7Title}</h2>
            </div>
            <div className="v705-chiprow">
              {(sec7.subjects || [
                { title: "Business", slug: "business" },
                { title: "Computing", slug: "computing" },
                { title: "Health", slug: "health" },
                { title: "Construction", slug: "construction" },
                { title: "Psychology", slug: "psychology" },
                { title: "Law", slug: "law" }
              ]).map((sub: any, idx: number) => (
                <Link key={idx} className="v705-chip" href={`/degrees/${sub.slug}`}>{sub.title}</Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 8: FAQ COMPONENT INTEGRATION */}
      {sec8.status !== false && (
        <QualificationFaqs
          slug={subject}
          sectionData={sec8}
          faqsToDisplay={dbFaqs}
          fallbackBadge={sec8Badge}
          fallbackTitle={sec8Title}
        />
      )}

      {/* SECTION 9: CALLOUT BAND */}
      {sec9.status !== false && (
        <section className="v705-sec">
          <div className="v705-wrap">
            <div className="v705-band">
              <div>
                <h2>{sec9Title}</h2>
                <p>{sec9Desc}</p>
              </div>
              <div className="btnrow">
                <Link className="btn btn-blue" href="/tools/eligibility-checker">Check eligibility</Link>
                <Link className="btn btn-orange" href="/apply">Apply with YStudy</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CONVERSION SYSTEM STRIP */}
      <QualificationConversionCards />

      {/* YS CROSSLINKS SECTION AT LAST */}
      <QualificationCrosslinks sectionData={subjectData?.cms?.section_11} />
    </main>
  );
}
