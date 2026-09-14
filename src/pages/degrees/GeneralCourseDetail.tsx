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
  const title = backendCourse?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const subjectName = backendCourse?.subject?.name || "Business";
  const heroImage = backendCourse?.fullImageUrl || "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=85";

  return (
    <main>
      {/* CENTRAL BANNER COMPONENT MAPPED WITH SLUG & BACKEND */}
      <Banner
        slug={slug}
        fallbackTitle={`${title} for mature students.`}
        fallbackDescription={backendCourse?.description || "The most popular subject for working adults and career changers. From flexible degree management options to digital business — every option, who it suits, and what it leads to."}
        fallbackBadgeText={`Subject area · ${subjectName}`}
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
      <section className="sbj-sec" id="courses">
        <div className="sbj">
          <div className="sbj-head">
            <span className="kicker">Available courses</span>
            <h2>{subjectName} degrees you can study flexibly.</h2>
            <p>Every route is built around work and family, with full Student Finance support.</p>
          </div>
          <div className="sbj-courses">
            <article className="ccard">
              <div className="cph">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" alt="Business Management" />
                <div className="tags">
                  <span>3 years</span>
                  <span>Blended</span>
                  <span>No A-levels</span>
                </div>
              </div>
              <div className="cb">
                <h3>BA (Hons) Business Management</h3>
                <p>The flagship flexible business degree — strategy, people, finance, marketing and operations. CIPD &amp; APM-aligned.</p>
                <div className="out">🎓 2:1 → £35,000–£65,000 management career</div>
                <div className="cbtn">
                  <Link className="v" href="/degrees/course/business-management-ba">View</Link>
                  <Link className="a" href="/apply">Apply</Link>
                </div>
              </div>
            </article>

            <article className="ccard">
              <div className="cph">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" alt="Digital Business" />
                <div className="tags">
                  <span>3 years</span>
                  <span>Online / blended</span>
                  <span>Tech-focused</span>
                </div>
              </div>
              <div className="cb">
                <h3>BA (Hons) Digital Business</h3>
                <p>Business and technology combined — digital transformation, e-commerce, analytics and digital marketing. For moving into digital-first roles.</p>
                <div className="out">🎓 Strong demand — ongoing digital skills shortage</div>
                <div className="cbtn">
                  <Link className="v" href="/degrees">View</Link>
                  <Link className="a" href="/apply">Apply</Link>
                </div>
              </div>
            </article>

            <article className="ccard">
              <div className="cph">
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" alt="Foundation Year" />
                <div className="tags">
                  <span>1 year</span>
                  <span>Entry route</span>
                  <span>No Level 3</span>
                </div>
              </div>
              <div className="cb">
                <h3>Business Foundation Year (Year 0)</h3>
                <p>No A-levels or Access to HE? A structured one-year entry route into BA Business Management. Automatic progression on passing. SFE-funded.</p>
                <div className="out">✅ Best option if you have no Level 3 qualifications</div>
                <div className="cbtn">
                  <Link className="v" href="/degrees/qualifications/foundation-year">View</Link>
                  <Link className="a" href="/apply">Apply</Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* WHO APPLIES SECTION */}
      <section className="sbj-sec" style={{ background: "var(--soft)" }}>
        <div className="sbj">
          <div className="sbj-head">
            <span className="kicker">Who applies</span>
            <h2>{subjectName} degrees suit you if…</h2>
            <p>Four honest reasons adult learners choose this subject.</p>
          </div>
          <div className="sbj-who">
            <div className="whocard">
              <h3>You’re in management but lack the credential</h3>
              <p>Many experienced managers hit a ceiling at director level without a formal qualification. The degree formalises what you already know and adds strategic frameworks.</p>
            </div>
            <div className="whocard">
              <h3>You’re changing career into business/finance</h3>
              <p>Moving from trades, healthcare or the public sector into a business role typically requires a degree to enter at the appropriate level.</p>
            </div>
            <div className="whocard">
              <h3>You’re starting or growing your own business</h3>
              <p>Strategy, financial management, marketing and operations modules give self-employed people a structured framework they often learn piecemeal.</p>
            </div>
            <div className="whocard">
              <h3>You’re in tech and need the business layer</h3>
              <p>Technical professionals moving into product, leadership or consultancy roles often find a business degree the most direct route in.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CAREER OUTCOMES STATS */}
      <section className="sbj-sec">
        <div className="sbj-stats-wrap">
          <div className="sbj-head">
            <span className="kicker">Career outcomes</span>
            <h2>Where a {subjectName} degree takes you.</h2>
          </div>
          <div className="sbj-stats">
            <div className="statc">
              <b>£35k</b>
              <span>typical starting salary (management)</span>
            </div>
            <div className="statc">
              <b>£55k</b>
              <span>average 10 years post-grad</span>
            </div>
            <div className="statc">
              <b>92%</b>
              <span>graduate employment (15 months)</span>
            </div>
            <div className="statc">
              <b>Every</b>
              <span>sector employs business graduates</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRESSION LADDER */}
      <section className="sbj-sec" style={{ background: "var(--soft)" }}>
        <div className="sbj">
          <div className="sbj-head">
            <span className="kicker">Progression ladder</span>
            <h2>How a {subjectName} career builds over time.</h2>
            <p>A realistic path from first role to senior leadership, with typical UK salary at each step.</p>
          </div>
          <div className="sbj-ladder">
            <div className="lad">
              <div className="n">1</div>
              <h4>Coordinator / Assistant</h4>
              <div className="sal">£24k–£30k</div>
              <p>Support a team, learn the operation.</p>
            </div>
            <div className="lad">
              <div className="n">2</div>
              <h4>Officer / Executive</h4>
              <div className="sal">£30k–£40k</div>
              <p>Own a workstream or function area.</p>
            </div>
            <div className="lad">
              <div className="n">3</div>
              <h4>Manager</h4>
              <div className="sal">£40k–£60k</div>
              <p>Lead people, budgets and delivery.</p>
            </div>
            <div className="lad">
              <div className="n">4</div>
              <h4>Senior / Head of</h4>
              <div className="sal">£60k–£90k</div>
              <p>Set direction for a department.</p>
            </div>
            <div className="lad">
              <div className="n">5</div>
              <h4>Director</h4>
              <div className="sal">£90k+</div>
              <p>Accountable for strategy and P&amp;L.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ENTRY ROUTES */}
      <section className="sbj-sec">
        <div className="sbj">
          <div className="sbj-head">
            <span className="kicker">Entry routes</span>
            <h2>How to qualify without A-levels.</h2>
            <p>Most adult applicants get in through one of these — no recent qualifications required.</p>
          </div>
          <div className="sbj-entry">
            <div className="entryc">
              <h3>Access to HE Diploma (Business)</h3>
              <p>The standard route for adults without A-levels. One year at college. Doesn’t use SFE entitlement. Widely accepted by all universities.</p>
              <Link href="/degrees/qualifications/foundation-year">Access to HE guide →</Link>
            </div>
            <div className="entryc">
              <h3>Professional experience</h3>
              <p>Many flexible degrees accept significant management experience (typically 3+ years) as a non-standard entry qualification. Confirm with admissions.</p>
              <Link href="/tools/eligibility-checker">View entry requirements →</Link>
            </div>
            <div className="entryc">
              <h3>Foundation Year (Year 0)</h3>
              <p>University-based entry route. One year, SFE-funded. Automatic progression to BA Year 1 on passing. No prior qualifications needed.</p>
              <Link href="/degrees/qualifications/foundation-year">Foundation year guide →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED SUBJECTS */}
      <section className="sbj-sec" style={{ background: "var(--soft)" }}>
        <div className="sbj">
          <div className="sbj-head">
            <span className="kicker">Related subjects</span>
            <h2>Subjects that pair well with {subjectName}.</h2>
            <p>Many adult learners combine interests. These routes share skills and career overlap.</p>
          </div>
          <div className="sbj-related">
            <Link className="relc" href="/degrees">
              <div className="rph">
                <img src="https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=700&q=80" alt="Marketing" />
              </div>
              <h3>Marketing &amp; Digital</h3>
              <span>Explore marketing &amp; digital degrees →</span>
            </Link>
            <Link className="relc" href="/degrees">
              <div className="rph">
                <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=700&q=80" alt="Human Resources" />
              </div>
              <h3>Human Resources</h3>
              <span>Explore human resources degrees →</span>
            </Link>
            <Link className="relc" href="/degrees/course/computing-cybersecurity-bsc">
              <div className="rph">
                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80" alt="Computing" />
              </div>
              <h3>Computing &amp; Cybersecurity</h3>
              <span>Explore computing &amp; cybersecurity degrees →</span>
            </Link>
            <Link className="relc" href="/degrees">
              <div className="rph">
                <img src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=700&q=80" alt="Tourism" />
              </div>
              <h3>Tourism &amp; Events</h3>
              <span>Explore tourism &amp; events degrees →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <QualificationFaqs
        slug={slug}
        faqsToDisplay={dbFaqs}
        fallbackBadge="FAQ"
        fallbackTitle={`Questions before choosing ${subjectName}.`}
      />

      {/* CONVERSION SNAPSHOT */}
      <section className="v705-sec v705-soft">
        <div className="v705-wrap">
          <div className="v705-head">
            <span className="kicker">Conversion snapshot</span>
            <h2>Before you apply, compare funding, salary and fit.</h2>
          </div>
          <div className="v705-grid">
            <div className="v705-card">
              <h3>Funding snapshot</h3>
              <p>Business degrees are commonly eligible for Tuition Fee Loan and Maintenance Loan, subject to your circumstances.</p>
              <Link className="btn btn-blue" href="/tools/eligibility-checker">Check eligibility</Link>
            </div>
            <div className="v705-card">
              <h3>Best for</h3>
              <p>Managers, entrepreneurs, administrators, team leaders and career changers who want a broad degree.</p>
            </div>
            <div className="v705-card">
              <h3>Apply support</h3>
              <p>YStudy can help you choose the route, prepare documents and understand the application steps.</p>
              <Link className="btn btn-orange" href="/apply">Apply with YStudy</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONVERSION SYSTEM */}
      <QualificationConversionCards />

      {/* YS CROSSLINKS SECTION AT LAST */}
      <QualificationCrosslinks />
    </main>
  );
}
