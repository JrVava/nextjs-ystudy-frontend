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
  if (!subject) return null;
  const cms = subjectData?.cms || {};
  const title = subjectData?.title || subject.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const heroImage = subjectData?.fullImageUrl;

  // Section 2 - Popular Courses
  const sec2 = cms.section_2 || {};
  const sec2Badge = sec2.badge;
  const sec2Title = sec2.title;
  const sec2Desc = sec2.description;

  const coursesList = (courses && courses.length > 0) ? courses : (sec2.courses || null);

  // Section 3 - Why Study
  const sec3 = cms.section_3 || {};
  const sec3Badge = sec3.badge;
  const sec3Title = sec3.title;
  const sec3Desc = sec3.description;
  const sec3Cards = Array.isArray(sec3.cards) ? sec3.cards : [];

  // Section 4 - Career Outcomes
  const sec4 = cms.section_4 || {};
  const sec4Badge = sec4.badge;
  const sec4Title = sec4.title;
  const sec4Cards = Array.isArray(sec4.cards) ? sec4.cards : [];

  // Section 5 - Salary Progression
  const sec5 = cms.section_5 || {};
  const sec5Badge = sec5.badge;
  const sec5Title = sec5.title;
  const sec5Desc = sec5.description;
  const sec5Cards = Array.isArray(sec5.cards) ? sec5.cards : [];

  // Section 6 - Funding Snapshot
  const sec6 = cms.section_6 || {};
  const sec6Cards = Array.isArray(sec6.cards) ? sec6.cards : [];

  // Section 7 - Related Subjects
  const sec7 = cms.section_7 || {};
  const sec7Badge = sec7.badge;
  const sec7Title = sec7.title;
  const sec7Subjects = Array.isArray(sec7.subjects) ? sec7.subjects : [];
  console.log("cms.section_8", cms.section_8);

  // Section 8 - FAQ
  const sec8 = cms.section_8 || {};
  const sec8Badge = sec8.badge;
  const sec8Title = sec8.title;

  // Section 9 - Callout Band
  const sec9 = cms.section_9 || {};
  const sec9Title = sec9.title;
  const sec9Desc = sec9.description;

  return (
    <main>
      {/* CENTRAL BANNER COMPONENT MAPPED WITH SLUG & BACKEND */}
      <Banner
        slug={subject}
        fallbackTitle={title ? `${title} degrees with purpose.` : undefined}
        fallbackDescription={subjectData?.description}
        fallbackBadgeText={title ? `Subject area · ${title}` : undefined}
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
              {sec2Badge && <span className="kicker">{sec2Badge}</span>}
              {sec2Title && <h2>{sec2Title}</h2>}
              {sec2Desc && <p>{sec2Desc}</p>}
            </div>
            {coursesList && coursesList.length > 0 && (
              <div className="sbj-courses">
                {coursesList.map((c: any, idx: number) => {
                  const courseTitle = c.title || `${title} Degree`;
                  const courseImg = c.fullImageUrl || c.image || heroImage;
                  const tags = (c.tags && c.tags.length > 0) ? c.tags : [];
                  const courseDesc = c.description || c.shortDescription;
                  const courseLink = c.courseType === "Social" ? `/degrees/course/${c.slug}` : `/degrees/${c.slug}`;

                  return (
                    <article key={c._id || idx} className="ccard">
                      <div className="cph">
                        {courseImg && <img src={courseImg} alt={courseTitle} />}
                        {tags.length > 0 && (
                          <div className="tags">
                            {tags.map((tag: string, tIdx: number) => (
                              <span key={tIdx}>{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="cb">
                        <h3>{courseTitle}</h3>
                        {courseDesc && <p>{courseDesc}</p>}
                        <div className="out">✅ Funding and entry requirements depend on provider</div>
                        <div className="cbtn">
                          <Link className="v" href={courseLink}>View</Link>
                          <Link className="a" href={`/apply?course=${c.slug || ''}`}>Apply</Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* SECTION 3: WHY STUDY THIS SUBJECT */}
      {sec3.status !== false && (
        <section className="v705-sec v705-soft">
          <div className="v705-wrap">
            <div className="v705-head">
              {sec3Badge && <span className="kicker">{sec3Badge}</span>}
              {sec3Title && <h2>{sec3Title}</h2>}
              {sec3Desc && <p>{sec3Desc}</p>}
            </div>
            {sec3Cards.length > 0 && (
              <div className="v705-grid">
                {sec3Cards.map((card: any, idx: number) => (
                  <div key={idx} className="v705-card">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* SECTION 4: CAREER OUTCOMES */}
      {sec4.status !== false && (
        <section className="v705-sec">
          <div className="v705-wrap">
            <div className="v705-head">
              {sec4Badge && <span className="kicker">{sec4Badge}</span>}
              {sec4Title && <h2>{sec4Title}</h2>}
            </div>
            {sec4Cards.length > 0 && (
              <div className="v705-grid">
                {sec4Cards.map((card: any, idx: number) => (
                  <div key={idx} className="v705-card">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* SECTION 5: SALARY PROGRESSION */}
      {sec5.status !== false && (
        <section className="v705-sec v705-soft">
          <div className="v705-wrap">
            <div className="v705-head">
              {sec5Badge && <span className="kicker">{sec5Badge}</span>}
              {sec5Title && <h2>{sec5Title}</h2>}
              {sec5Desc && <p>{sec5Desc}</p>}
            </div>
            {sec5Cards.length > 0 && (
              <div className="v705-salary">
                {sec5Cards.map((card: any, idx: number) => (
                  <div key={idx} className="v705-card">
                    <span>{card.title}</span>
                    <strong>{card.price}</strong>
                    <p>{card.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* SECTION 6: FUNDING SNAPSHOT */}
      {sec6.status !== false && sec6Cards.length > 0 && (
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
              {sec7Badge && <span className="kicker">{sec7Badge}</span>}
              {sec7Title && <h2>{sec7Title}</h2>}
            </div>
            {sec7Subjects.length > 0 && (
              <div className="v705-chiprow">
                {sec7Subjects.map((sub: any, idx: number) => (
                  <Link key={idx} className="v705-chip" href={`/degrees/${sub.slug}`}>{sub.title}</Link>
                ))}
              </div>
            )}
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
      {sec9.status !== false && (sec9Title || sec9Desc) && (
        <section className="v705-sec">
          <div className="v705-wrap">
            <div className="v705-band">
              <div>
                {sec9Title && <h2>{sec9Title}</h2>}
                {sec9Desc && <p>{sec9Desc}</p>}
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
      <QualificationConversionCards sectionData={cms.section_10} />

      {/* YS CROSSLINKS SECTION AT LAST */}
      <QualificationCrosslinks sectionData={subjectData?.cms?.section_11} />
    </main>
  );
}
