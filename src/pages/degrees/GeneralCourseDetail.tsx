import React from "react";
import Link from "next/link";
import "@/app/degrees/subject.css";
import { Banner, QualificationConversionCards, QualificationFaqs, QualificationCrosslinks } from "@/components/ui";

interface GeneralCourseDetailProps {
  slug: string;
  backendCourse?: any;
  cmsData?: any;
  dbFaqs?: any[];
}

export default function GeneralCourseDetail({ slug, backendCourse, cmsData, dbFaqs }: GeneralCourseDetailProps) {
  if (!slug) return null;
  const title = backendCourse?.title || cmsData?.title || (slug || "").replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const subjectName = backendCourse?.subject?.name || cmsData?.subjectName;
  const heroImage = backendCourse?.fullImageUrl || cmsData?.image;

  const sec2 = cmsData?.section_2 || {};
  const sec3 = cmsData?.section_3 || {};
  const sec4 = cmsData?.section_4 || {};
  const sec5 = cmsData?.section_5 || {};
  const sec6 = cmsData?.section_6 || {};
  const sec7 = cmsData?.section_7 || {};
  const sec8 = cmsData?.section_8 || {};
  const sec9 = cmsData?.section_9 || {};
  const sec10 = cmsData?.section_10 || {};

  const coursesList = sec2.availableCourses || sec2.courses || cmsData?.courses || backendCourse?.courses || [];
  const whoAppliesCards = sec3.cards || backendCourse?.whoApplies || [];
  const statsList = sec4.stats || sec4.cards || backendCourse?.stats || [];
  const ladderList = sec5.ladder || sec5.cards || backendCourse?.ladder || [];
  const entryCards = sec6.cards || sec6.entryRoutes || backendCourse?.entryRoutes || [];
  const relatedSubjects = sec7.subject || sec7.subjects || sec7.cards || sec7.relatedSubjects || [];
  const conversionSnapshotCards = sec8.cards || [];
  const nextStepsCards = sec9.cards || [];
  const featuredCourse = sec10.featured_course || null;

  return (
    <main>
      {/* CENTRAL BANNER COMPONENT MAPPED WITH SLUG & BACKEND */}
      <Banner
        slug={slug}
        fallbackTitle={title ? `${title} for mature students.` : undefined}
        fallbackDescription={backendCourse?.description || cmsData?.description}
        fallbackBadgeText={subjectName ? `Subject area · ${subjectName}` : undefined}
        fallbackBgImage={heroImage}
      >
        <div className="sfe" style={{ marginTop: "18px" }}>
          <span className="ck">✓</span>
          <span>
            Every course on YStudy is <b>Student Finance eligible</b> — Tuition &amp; Maintenance Loans plus non-repayable grants.{" "}
            <Link href="/funding" style={{ color: "#fff", textDecoration: "underline" }}>Estimate your funding →</Link>
          </span>
        </div>
        <div className="btnrow" style={{ display: "flex", gap: "12px", marginTop: "22px", flexWrap: "wrap" }}>
          <a className="sbtn white" href="#courses">View courses ↓</a>
          <Link className="sbtn ghost" href="/degrees">Compare all degrees</Link>
        </div>
      </Banner>

      {/* AVAILABLE COURSES SECTION */}
      {sec2.status !== false && (
        <section className="sbj-sec" id="courses">
          <div className="sbj">
            <div className="sbj-head">
              {sec2.badge && <span className="kicker">{sec2.badge}</span>}
              {sec2.title && <h2>{sec2.title}</h2>}
              {sec2.description && <p>{sec2.description}</p>}
            </div>
            {coursesList.length > 0 && (
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
                        {c.careerOutcomeBadge && <div className="out">{c.careerOutcomeBadge}</div>}
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

      {/* WHO APPLIES SECTION */}
      {sec3.status !== false && (
        <section className="sbj-sec" style={{ background: "var(--soft)" }}>
          <div className="sbj">
            <div className="sbj-head">
              {sec3.badge && <span className="kicker">{sec3.badge}</span>}
              {sec3.title && <h2>{sec3.title}</h2>}
              {sec3.description && <p>{sec3.description}</p>}
            </div>
            {whoAppliesCards.length > 0 && (
              <div className="sbj-who">
                {whoAppliesCards.map((card: any, idx: number) => (
                  <div key={idx} className="whocard">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CAREER OUTCOMES STATS */}
      {sec4.status !== false && (
        <section className="sbj-sec">
          <div className="sbj-stats-wrap">
            <div className="sbj-head">
              {sec4.badge && <span className="kicker">{sec4.badge}</span>}
              {sec4.title && <h2>{sec4.title}</h2>}
            </div>
            {statsList.length > 0 && (
              <div className="sbj-stats">
                {statsList.map((stat: any, idx: number) => (
                  <div key={idx} className="statc">
                    <b>{stat.value || stat.stat || stat.title}</b>
                    <span>{stat.label || stat.description}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* PROGRESSION LADDER */}
      {sec5.status !== false && (
        <section className="sbj-sec" style={{ background: "var(--soft)" }}>
          <div className="sbj">
            <div className="sbj-head">
              {sec5.badge && <span className="kicker">{sec5.badge}</span>}
              {sec5.title && <h2>{sec5.title}</h2>}
              {sec5.description && <p>{sec5.description}</p>}
            </div>
            {ladderList.length > 0 && (
              <div className="sbj-ladder">
                {ladderList.map((lad: any, idx: number) => (
                  <div key={idx} className="lad">
                    <div className="n">{lad.badge || lad.step || lad.n || idx + 1}</div>
                    <h4>{lad.title || lad.role}</h4>
                    {lad.salary && <div className="sal">{lad.salary}</div>}
                    {lad.description && <p>{lad.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ENTRY ROUTES */}
      {sec6.status !== false && (
        <section className="sbj-sec">
          <div className="sbj">
            <div className="sbj-head">
              {sec6.badge && <span className="kicker">{sec6.badge}</span>}
              {sec6.title && <h2>{sec6.title}</h2>}
              {sec6.description && <p>{sec6.description}</p>}
            </div>
            {entryCards.length > 0 && (
              <div className="sbj-entry">
                {entryCards.map((entry: any, idx: number) => (
                  <div key={idx} className="entryc">
                    <h3>{entry.title}</h3>
                    <p>{entry.description}</p>
                    {entry.link && <Link href={entry.link}>{entry.linkText || "Learn more →"}</Link>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* RELATED SUBJECTS */}
      {sec7.status !== false && (
        <section className="sbj-sec" style={{ background: "var(--soft)" }}>
          <div className="sbj">
            <div className="sbj-head">
              {sec7.badge && <span className="kicker">{sec7.badge}</span>}
              {sec7.title && <h2>{sec7.title}</h2>}
              {sec7.description && <p>{sec7.description}</p>}
            </div>
            {relatedSubjects.length > 0 && (
              <div className="sbj-related">
                {relatedSubjects.map((sub: any, idx: number) => (
                  <Link key={idx} className="relc" href={sub.link || `/degrees/${sub.slug || ''}`}>
                    {(sub.fullImageUrl || sub.image) && (
                      <div className="rph">
                        <img src={sub.fullImageUrl || sub.image} alt={sub.title} />
                      </div>
                    )}
                    <h3>{sub.title}</h3>
                    <span>{sub.linkText || `Explore ${sub.title} →`}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* FAQ SECTION */}
      <QualificationFaqs
        slug={slug}
        faqsToDisplay={dbFaqs}
      />

      {/* CONVERSION SNAPSHOT */}
      {sec8.status !== false && (sec8.title || conversionSnapshotCards.length > 0) && (
        <section className="v705-sec v705-soft">
          <div className="v705-wrap">
            <div className="v705-head">
              {sec8.badge && <span className="kicker">{sec8.badge}</span>}
              {sec8.title && <h2>{sec8.title}</h2>}
            </div>
            {conversionSnapshotCards.length > 0 && (
              <div className="v705-grid">
                {conversionSnapshotCards.map((card: any, idx: number) => (
                  <div key={idx} className="v705-card">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    {card.link && (
                      <Link className="btn btn-blue" href={card.link}>{card.linkText || "Learn more"}</Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* NEXT STEPS CTA */}
      {sec9.status !== false && (sec9.title || nextStepsCards.length > 0) && (
        <section className="sbj-sec">
          <div className="sbj">
            <div className="sbj-head">
              {sec9.badge && <span className="kicker">{sec9.badge}</span>}
              {sec9.title && <h2>{sec9.title}</h2>}
              {sec9.description && <p>{sec9.description}</p>}
            </div>
            {nextStepsCards.length > 0 && (
              <div className="sbj-next">
                {nextStepsCards.map((card: any, idx: number) => (
                  <div key={idx} className="nextc">
                    <div className="ic">{card.icon}</div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    {card.link && <Link href={card.link}>{card.linkText || "Learn more →"}</Link>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* FEATURED COURSE PICK */}
      {sec10.status !== false && featuredCourse && (
        <section className="sbj-sec" style={{ background: "var(--soft)" }}>
          <div className="sbj">
            <div className="sbj-head">
              {sec10.badge && <span className="kicker">{sec10.badge}</span>}
              {sec10.title && <h2>{sec10.title}</h2>}
              {sec10.description && <p>{sec10.description}</p>}
            </div>
            <div className="sbj-editor">
              <div className="eph">
                {(featuredCourse.fullImageUrl || featuredCourse.image) && (
                  <img src={featuredCourse.fullImageUrl || featuredCourse.image} alt={featuredCourse.title} />
                )}
              </div>
              <div className="eb">
                <span className="ek">★ Editor's pick{subjectName ? ` · Best ${subjectName} route` : ""}</span>
                <h3>{featuredCourse.title}</h3>
                {(featuredCourse.shortDescription || featuredCourse.description) && (
                  <p>{featuredCourse.shortDescription || featuredCourse.description}</p>
                )}
                <div className="epills">
                  {featuredCourse.salaryRange?.from && featuredCourse.salaryRange?.to && (
                    <span>£{featuredCourse.salaryRange.from.toLocaleString()}–£{featuredCourse.salaryRange.to.toLocaleString()}</span>
                  )}
                  {(featuredCourse.badges || []).slice(0, 3).map((badge: string, bIdx: number) => (
                    <span key={bIdx}>{badge}</span>
                  ))}
                </div>
                <div className="btnrow">
                  <Link
                    className="sbtn dark"
                    href={featuredCourse.courseType === "Social" ? `/degrees/course/${featuredCourse.slug}` : `/degrees/${featuredCourse.slug}`}
                  >
                    View course →
                  </Link>
                  <Link className="sbtn out" href={`/apply?course=${featuredCourse.slug || ""}`}>
                    Start application
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CONVERSION SYSTEM */}
      <QualificationConversionCards sectionData={cmsData?.section_11} />

      {/* YS CROSSLINKS SECTION AT LAST */}
      <QualificationCrosslinks sectionData={cmsData?.section_12} />
    </main>
  );
}
