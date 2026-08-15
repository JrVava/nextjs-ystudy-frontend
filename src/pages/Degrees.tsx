import { DegreesBanner } from "@/components/degrees/DegreesBanner";
import { getCMSPageContent } from "@/services/cms.service";
import { getAllCourses } from "@/services/course.service";
import {
  getDurations,
  getFundings,
  getModes,
  getQualifications,
  getSubjects
} from "@/services/filters.service";
import {
  DegreeCatalogProvider,
  DegreeSearchConsole,
  DegreeResultsView
} from "@/components/degrees/DegreeCatalogManager";
import { JourneyCard } from "@/components/degrees/JourneyCard";
import { GuideCard } from "@/components/degrees/GuideCard";
import { BackendCourse } from "@/types/course";
import { FloatingAdviser } from "@/components";

export default async function Degrees() {
  const [
    data,
    subjects,
    qualifications,
    modes,
    durations,
    fundings,
    apiCourses
  ] = await Promise.all([
    getCMSPageContent("degrees"),
    getSubjects(),
    getQualifications(),
    getModes(),
    getDurations(),
    getFundings(),
    getAllCourses()
  ]);

  const coursesToRender: BackendCourse[] = apiCourses && apiCourses.length > 0 ? apiCourses : (data?.featured_courses || []);
  const courseCount = coursesToRender.length;

  return (
    <div className="degrees-page-content">
      <DegreeCatalogProvider
        initialCourses={coursesToRender}
        subjects={subjects}
        qualifications={qualifications}
        modes={modes}
        durations={durations}
        fundings={fundings}
        section3Data={data?.section_3}
      >
        {/* HERO SECTION DYNAMIZED WITH CUSTOM DEGREES BANNER */}
        <DegreesBanner
          slug="degrees"
          fallbackTitle="Find a degree that fits your life."
          fallbackDescription="Set your filters, then search 200+ SFE-eligible courses built for working adults."
          fallbackBadgeText="Search all degrees"
          fallbackBgImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=85"
        >
          <DegreeSearchConsole />
        </DegreesBanner>

        <DegreeResultsView />
      </DegreeCatalogProvider>

      {/* BROWSE DISCOVERY CATEGORIES */}
      <section className="sdx-discovery" id="browse-by-category">
        <div className="wrap">
          {/* SUBJECTS BLOCK */}
          {data?.section_4?.status !== false && (
            <div className="sdx-block" id="courses-by-subject">
              <div className="sdx-head">
                <div>
                  <h2>{data?.section_4?.title || "Courses available by subject"}</h2>
                  <p>{data?.section_4?.description || "Start with what you want to study, then compare flexible routes, funding and locations."}</p>
                </div>
                <div className="sdx-controls">
                  <button className="sdx-ctrl" type="button">‹</button>
                  <button className="sdx-ctrl" type="button">›</button>
                </div>
              </div>
              <div className="sdx-row">
                {(data?.section_4?.subjects || [
                  { title: "Business & Management", description: "Leadership, operations, marketing and project management routes.", badge: "Business", link: "/degrees/business", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80", meta: ["20+ courses", "London", "Flexible"] },
                  { title: "Health & Social Care", description: "Care, wellbeing, public health and community-focused routes.", badge: "Health", link: "/degrees/health", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80", meta: ["Foundation", "Weekend", "SFE"] },
                  { title: "Construction", description: "Construction management, planning and built environment routes.", badge: "Construction", link: "/degrees/construction", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80", meta: ["Foundation", "Career change"] },
                  { title: "Computing & Data", description: "Data, cybersecurity, software and digital career pathways.", badge: "Tech", link: "/degrees/computing", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80", meta: ["Data", "AI", "Digital"] }
                ]).map((s: any, idx: number) => (
                  <a key={idx} className="sdx-card" href={s.link}>
                    <div className="sdx-photo">
                      <img src={s.image} alt={s.title} />
                      <span className="sdx-badge">{s.badge}</span>
                    </div>
                    <div className="sdx-body">
                      <h3>{s.title}</h3>
                      <p>{s.description}</p>
                      <div className="sdx-meta">
                        {s.meta?.map((m: string, mIdx: number) => (
                          <span key={mIdx}>{m}</span>
                        ))}
                      </div>
                      <span className="sdx-link">View courses →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* QUALIFICATIONS BLOCK */}
          {data?.section_5?.status !== false && (
            <div className="sdx-block" id="courses-by-qualification" style={{ marginTop: "34px" }}>
              <div className="sdx-head">
                <div>
                  <h2>{data?.section_5?.title || "Courses available by qualification"}</h2>
                  <p>{data?.section_5?.description || "Choose the right entry route: first year, foundation year, advanced entry or postgraduate."}</p>
                </div>
                <div className="sdx-controls">
                  <button className="sdx-ctrl" type="button">‹</button>
                  <button className="sdx-ctrl" type="button">›</button>
                </div>
              </div>
              <div className="sdx-row">
                {(data?.section_5?.qualifications || [
                  { title: "Foundation Year", description: "Best if you do not meet standard entry requirements.", badge: "Foundation", link: "/degrees/qualifications/foundation-year", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80", meta: ["4 years", "SFE route", "Mature students"] },
                  { title: "Certificate of HE", description: "A one-year Level 4 route that can lead to degree progression.", badge: "CertHE", link: "/degrees/qualifications/certhe", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80", meta: ["1 year", "Level 4"] },
                  { title: "HNC", description: "Practical higher education route with progression options.", badge: "HNC", link: "/degrees/qualifications/hnc", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80", meta: ["Level 4", "Practical"] },
                  { title: "HND", description: "Two-year higher education pathway with top-up options.", badge: "HND", link: "/degrees/qualifications/hnd", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80", meta: ["Level 5", "Top-up"] }
                ]).map((q: any, idx: number) => (
                  <a key={idx} className="sdx-card" href={q.link}>
                    <div className="sdx-photo">
                      <img src={q.image} alt={q.title} />
                      <span className="sdx-badge">{q.badge}</span>
                    </div>
                    <div className="sdx-body">
                      <h3>{q.title}</h3>
                      <p>{q.description}</p>
                      <div className="sdx-meta">
                        {q.meta?.map((m: string, mIdx: number) => (
                          <span key={mIdx}>{m}</span>
                        ))}
                      </div>
                      <span className="sdx-link">Explore route →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* LOCATIONS BLOCK */}
          {data?.section_6?.status !== false && (
            <div className="sdx-block" id="courses-by-location" style={{ marginTop: "34px" }}>
              <div className="sdx-head">
                <div>
                  <h2>{data?.section_6?.title || "Courses available by location"}</h2>
                  <p>{data?.section_6?.description || "Browse where you can realistically travel, then compare subjects and timetable options."}</p>
                </div>
                <div className="sdx-controls">
                  <button className="sdx-ctrl" type="button">‹</button>
                  <button className="sdx-ctrl" type="button">›</button>
                </div>
              </div>
              <div className="sdx-row">
                {(data?.section_6?.locations || [
                  { title: "Study in London", description: "Largest course choice with flexible study and strong transport links.", badge: "London", link: "/degrees/locations#london", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80", meta: ["20+ courses", "Evening/weekend"] },
                  { title: "Study in Birmingham", description: "Central England option popular with working adult learners.", badge: "Birmingham", link: "/degrees/locations#birmingham", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80", meta: ["Business", "Health", "Construction"] },
                  { title: "Study in Manchester", description: "Northern study hub with flexible and career-focused routes.", badge: "Manchester", link: "/degrees/locations#manchester", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80", meta: ["Blended", "Data", "Business"] },
                  { title: "Study in Leeds", description: "Growing Northern hub for business, finance and digital routes.", badge: "Leeds", link: "/degrees/locations#leeds", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80", meta: ["Finance", "Digital", "Lower costs"] }
                ]).map((l: any, idx: number) => (
                  <a key={idx} className="sdx-card" href={l.link}>
                    <div className="sdx-photo">
                      <img src={l.image} alt={l.title} />
                      <span className="sdx-badge">{l.badge}</span>
                    </div>
                    <div className="sdx-body">
                      <h3>{l.title}</h3>
                      <p>{l.description}</p>
                      <div className="sdx-meta">
                        {l.meta?.map((m: string, mIdx: number) => (
                          <span key={mIdx}>{m}</span>
                        ))}
                      </div>
                      <span className="sdx-link">View location →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* STUDENT JOURNEY METHODOLOGY */}
      {data?.section_7?.status !== false && (
        <section className="section" id="journey" style={{ borderTop: "1px solid #dbe8f7" }}>
          <div className="wrap">
            <div className="jrn-intro">
              <div>
                <span className="eyebrow o">{data?.section_7?.badge || "Not sure how to choose?"}</span>
                <h2 className="jt">{data?.section_7?.title || "Feeling unsure is normal. We'll guide you."}</h2>
                <p>{data?.section_7?.description || "Most adult learners don't know exactly what to study at first. That's fine — here's a simple, free path from 'I'm not sure' to 'I've applied'."}</p>
              </div>
              <div className="jph">
                <img
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&amp;fit=crop&amp;w=1200&amp;q=85"
                  alt="Adult learner thinking through options"
                />
              </div>
            </div>

            {/* SECTION 8: STEPS */}
            {data?.section_8?.status !== false && (
              <>
                {/* Step 1 */}
                <div className="jstep">
                  <div className="jl">
                    <span className="jnum">Step 1</span>
                    <h3>{data?.section_8?.steps?.[0]?.title || "Choose your subject"}</h3>
                    <p>{data?.section_8?.steps?.[0]?.description || "Start with what interests you. Browse the strongest routes for adult learners."}</p>
                  </div>
                  <div className="jcards">
                    <JourneyCard
                      href="/degrees/business"
                      image="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                      title="Business"
                      description="Management, operations, analyst routes."
                    />
                    <JourneyCard
                      href="/degrees#results"
                      image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
                      title="Computing"
                      description="Cybersecurity, software, networking."
                    />
                    <JourneyCard
                      href="/degrees#results"
                      image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
                      title="Health &amp; Social Care"
                      description="Care, social work, NHS routes."
                    />
                    <JourneyCard
                      href="/degrees#results"
                      image="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=800&q=80"
                      title="Law &amp; more"
                      description="Psychology, construction, marketing."
                    />
                    <JourneyCard
                      href="/tools/degree-match"
                      image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                      title="Still not sure?"
                      description="Take the 2-min Degree Match quiz."
                      ctaText="Take quiz →"
                      icon="🎯"
                    />
                    <JourneyCard
                      href="/degrees#results"
                      image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                      title="Browse all 200+"
                      description="Filter by mode, funding and location."
                      ctaText="Search →"
                    />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="jstep">
                  <div className="jl">
                    <span className="jnum">Step 2</span>
                    <h3>{data?.section_8?.steps?.[1]?.title || "Use our free tools"}</h3>
                    <p>{data?.section_8?.steps?.[1]?.description || "Make sure you're eligible for funding and see where each route could take your salary."}</p>
                  </div>
                  <div className="jcards">
                    <JourneyCard
                      href="/tools/eligibility-checker"
                      image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
                      title="Eligibility checker"
                      description="Confirm your Student Finance entitlement in 2 minutes."
                      ctaText="Check now →"
                      icon="✓"
                    />
                    <JourneyCard
                      href="/tools/finance-calculator"
                      image="https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=800&q=80"
                      title="Funding calculator"
                      description="Estimate your tuition and maintenance support."
                      ctaText="Calculate →"
                      icon="💷"
                    />
                    <JourneyCard
                      href="/tools/salary-checker"
                      image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                      title="Salary checker"
                      description="See realistic salary ranges for each career route."
                      ctaText="See salaries →"
                      icon="📈"
                    />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="jstep">
                  <div className="jl">
                    <span className="jnum">Step 3</span>
                    <h3>{data?.section_8?.steps?.[2]?.title || "Read our guides"}</h3>
                    <p>{data?.section_8?.steps?.[2]?.description || "Still have questions? Our plain-English guides often hold the answer — funding, applying and career routes explained."}</p>
                  </div>
                  <div className="jcards">
                    <GuideCard
                      href="/funding/maintenance-loan"
                      category="Funding"
                      image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
                      title="Maintenance Loan explained"
                      description="Plain-English guide to living-cost support."
                      readTime="5 min read"
                    />
                    <GuideCard
                      href="/tools/personal-statement-calculator"
                      category="Applying"
                      image="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80"
                      title="Personal statement structure"
                      description="Four sections that admissions teams expect."
                      readTime="7 min read"
                    />
                    <GuideCard
                      href="/guides/careers-salaries"
                      category="Careers"
                      image="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80"
                      title="Finance career routes"
                      description="Roles, salaries and the degrees behind them."
                      readTime="6 min read"
                    />
                    <GuideCard
                      href="/guides/student-finance"
                      category="Funding"
                      image="https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=800&q=80"
                      title="Student Finance, step by step"
                      description="How tuition and maintenance loans actually work."
                      readTime="8 min read"
                    />
                    <GuideCard
                      href="/guides/career-change"
                      category="Career change"
                      image="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80"
                      title="Going back to study as an adult"
                      description="Balancing work, family and a degree."
                      readTime="6 min read"
                    />
                    <GuideCard
                      href="/guides/university-routes"
                      category="Routes"
                      image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
                      title="Foundation, HND &amp; top-up routes"
                      description="No A-levels? Here's how adults get in."
                      readTime="7 min read"
                    />
                  </div>
                </div>

                {/* Step 4 */}
                <div className="jstep">
                  <div className="jl">
                    <span className="jnum">Step 4</span>
                    <h3>{data?.section_8?.steps?.[3]?.title || "Free application kit"}</h3>
                    <p>{data?.section_8?.steps?.[3]?.description || "Our students get free tools and adviser support to build a confident application."}</p>
                  </div>
                  <div className="jcards">
                    <JourneyCard
                      href="/tools/cv-builder"
                      image="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80"
                      title="CV builder"
                      description="A university-ready CV for mature students."
                      ctaText="Build CV →"
                      icon="📄"
                    />
                    <JourneyCard
                      href="/tools/personal-statement-calculator"
                      image="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80"
                      title="Personal statement"
                      description="Guided writing that admissions teams understand."
                      ctaText="Start draft →"
                      icon="✍️"
                    />
                    <JourneyCard
                      href="/dashboard"
                      image="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80"
                      title="Student dashboard"
                      description="Save courses and message your adviser in one place."
                      ctaText="Open dashboard →"
                      icon="📊"
                    />
                    <JourneyCard
                      href="/dashboard/applications"
                      image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80"
                      title="Application tracker"
                      description="Track deadlines and progress across applications."
                      ctaText="Track now →"
                      icon="🗂️"
                    />
                    <JourneyCard
                      href="/lead/adviser-call"
                      image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                      title="Free academic review"
                      description="An adviser checks your documents before you submit."
                      ctaText="Request review →"
                      icon="🤝"
                    />
                    <JourneyCard
                      href="/lead/adviser-call"
                      image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
                      title="Speak to an adviser"
                      description="Free call for course choice, funding and applying."
                      ctaText="Book call →"
                      icon="📞"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* HELP ADVISER BAND */}
      {data?.section_9?.status !== false && (
        <section className="helpband">
          <img
            className="hbbg"
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=85"
            alt=""
          />
          <div className="hbsc"></div>
          <div className="hbin">
            <span className="hbk">{data?.section_9?.badge || "Need guidance?"}</span>
            <h2>{data?.section_9?.title || "Ask an adviser before you apply."}</h2>
            <p>{data?.section_9?.description || "Get your entry route, funding eligibility and document readiness checked for free."}</p>
            <div className="hbrow">
              <a className="hbbtn dark" href="/lead/adviser-call">Book a free adviser →</a>
              <a className="hbbtn white" href="/apply">Apply with YStudy</a>
            </div>
          </div>
        </section>
      )}

      {/* SHORTLIST FOOTER CTA */}
      {data?.section_10?.status !== false && (
        <div className="footer-cta" style={{ marginTop: "34px" }}>
          <div>
            <span className="kicker">{data?.section_10?.badge || "Not ready to apply yet?"}</span>
            <h2>{data?.section_10?.title || "Save your shortlist for later."}</h2>
            <p>{data?.section_10?.description || "Create a free account to save the courses you liked, track applications and pick up where you left off — no pressure to apply."}</p>
          </div>
          <div className="btnrow">
            <a className="btn btn-white" href="/dashboard">Create account</a>
            <a className="btn btn-orange" href="/apply">Apply now</a>
          </div>
        </div>
      )}

      {/* FLOATING ADVISER */}
      <FloatingAdviser />
    </div>
  );
}
