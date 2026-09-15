import { DegreesBanner } from "@/components/degrees/DegreesBanner";
import { getCMSPageContent } from "@/services/cms.service";
import { getAllCourses } from "@/services/course.service";
import {
  getDurations,
  getFundings,
  getModes,
  getQualifications,
  getSubjects,
  getLocations
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
import { AutoScrollSlider } from "@/components/ui/AutoScrollSlider";
import { AutoScrollTrack } from "@/components/ui/AutoScrollTrack";

export default async function Degrees() {
  const [
    data,
    subjects,
    qualifications,
    modes,
    durations,
    fundings,
    locations,
    apiCourses
  ] = await Promise.all([
    getCMSPageContent("degrees"),
    getSubjects(),
    getQualifications(),
    getModes(),
    getDurations(),
    getFundings(),
    getLocations(),
    getAllCourses()
  ]);

  const coursesToRender: BackendCourse[] = apiCourses && apiCourses.length > 0 ? apiCourses : ([]);

  // Map backend subjects or CMS data
  const subjectsData = (subjects && subjects.length > 0)
    ? subjects.map((s: any) => ({
        title: s.title,
        description: s.description,
        badge: s.badge || s.title,
        link: `/degrees/${s.slug || s.title.toLowerCase()}`,
        image: s.fullImageUrl || s.image,
        meta: s.tags
      }))
    : (data?.section_4?.subjects || []);

  // Map backend qualifications or CMS data
  const qualificationsData = (qualifications && qualifications.length > 0)
    ? qualifications.map((q: any) => ({
        title: q.title,
        description: q.description,
        badge: q.badge || q.title,
        link: `/degrees/qualifications/${q.slug || q.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        image: q.fullImageUrl || q.image,
        meta: q.tags
      }))
    : (data?.section_5?.qualifications || []);

  // Map backend locations or CMS data
  const locationsData = (locations && locations.length > 0)
    ? locations.map((l: any) => ({
        title: l.title?.toLowerCase().startsWith("study in") ? l.title : `Study in ${l.title}`,
        description: l.description || l.short_description,
        badge: l.badge || l.title,
        link: `/degrees/locations#${l.slug || l.title.toLowerCase().replace(/\s+/g, '-')}`,
        image: l.fullImageUrl || l.image,
        meta: l.tags
      }))
    : (data?.section_6?.locations || []);

  return (
    <div className="degrees-page-content">
      <DegreeCatalogProvider
        initialCourses={coursesToRender}
        subjects={subjects}
        qualifications={qualifications}
        modes={modes}
        durations={durations}
        fundings={fundings}
        locations={locations}
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
            <AutoScrollSlider
              title={data?.section_4?.title}
              description={data?.section_4?.description}
              id="courses-by-subject"
            >
              {subjectsData.map((s: any, idx: number) => (
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
            </AutoScrollSlider>
          )}

          {/* QUALIFICATIONS BLOCK */}
          {data?.section_5?.status !== false && (
            <AutoScrollSlider
              title={data?.section_5?.title}
              description={data?.section_5?.description}
              id="courses-by-qualification"
            >
              {qualificationsData.map((q: any, idx: number) => (
                <a key={idx} className="sdx-card" href={q.link}>
                  <div className="sdx-photo">
                    {q.image && <img src={q.image} alt={q.title} />}
                    {q.badge && <span className="sdx-badge">{q.badge}</span>}
                  </div>
                  <div className="sdx-body">
                    <h3>{q.title}</h3>
                    {q.description && <p>{q.description}</p>}
                    {q.meta && q.meta.length > 0 && (
                      <div className="sdx-meta">
                        {q.meta.map((m: string, mIdx: number) => (
                          <span key={mIdx}>{m}</span>
                        ))}
                      </div>
                    )}
                    <span className="sdx-link">Explore route →</span>
                  </div>
                </a>
              ))}
            </AutoScrollSlider>
          )}

          {/* LOCATIONS BLOCK */}
          {data?.section_6?.status !== false && (
            <AutoScrollSlider
              title={data?.section_6?.title}
              description={data?.section_6?.description}
              id="courses-by-location"
            >
              {locationsData.map((l: any, idx: number) => (
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
            </AutoScrollSlider>
          )}
        </div>
      </section>

      {/* STUDENT JOURNEY METHODOLOGY */}
      {data?.section_7?.status !== false && (
        <section className="section" id="journey" style={{ borderTop: "1px solid #dbe8f7" }}>
          <div className="wrap">
            <div className="jrn-intro">
              <div>
                <span className="eyebrow o">{data?.section_7?.badge}</span>
                <h2 className="jt">{data?.section_7?.title}</h2>
                <p>{data?.section_7?.description}</p>
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
                    <h3>{data?.section_8?.steps?.[0]?.title}</h3>
                    <p>{data?.section_8?.steps?.[0]?.description}</p>
                  </div>
                  <AutoScrollTrack className="jcards">
                    {(subjects && subjects.length > 0 ? subjects : []).map((s: any, idx: number) => (
                      <JourneyCard
                        key={s._id || idx}
                        href={`/degrees/${s.slug || s.title?.toLowerCase()}`}
                        image={s.fullImageUrl || s.image}
                        title={s.title}
                        description={s.description}
                      />
                    ))}
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
                  </AutoScrollTrack>
                </div>

                {/* Step 2 */}
                <div className="jstep">
                  <div className="jl">
                    <span className="jnum">Step 2</span>
                    <h3>{data?.section_8?.steps?.[1]?.title}</h3>
                    <p>{data?.section_8?.steps?.[1]?.description}</p>
                  </div>
                  <AutoScrollTrack className="jcards">
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
                  </AutoScrollTrack>
                </div>

                {/* Step 3 */}
                <div className="jstep">
                  <div className="jl">
                    <span className="jnum">Step 3</span>
                    <h3>{data?.section_8?.steps?.[2]?.title}</h3>
                    <p>{data?.section_8?.steps?.[2]?.description}</p>
                  </div>
                  <AutoScrollTrack className="jcards">
                    <JourneyCard
                      href="/funding/maintenance-loan"
                      image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
                      title="Maintenance Loan explained"
                      description="Plain-English guide to living-cost support."
                      ctaText="5 min read →"
                      icon="📖"
                      badge="Funding"
                    />
                    <JourneyCard
                      href="/tools/personal-statement-calculator"
                      image="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80"
                      title="Personal statement structure"
                      description="Four sections that admissions teams expect."
                      ctaText="7 min read →"
                      icon="✍️"
                      badge="Applying"
                    />
                    <JourneyCard
                      href="/guides/careers-salaries"
                      image="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80"
                      title="Finance career routes"
                      description="Roles, salaries and the degrees behind them."
                      ctaText="6 min read →"
                      icon="💼"
                      badge="Careers"
                    />
                    <JourneyCard
                      href="/guides/student-finance"
                      image="https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=800&q=80"
                      title="Student Finance, step by step"
                      description="How tuition and maintenance loans actually work."
                      ctaText="8 min read →"
                      icon="💷"
                      badge="Funding"
                    />
                    <JourneyCard
                      href="/guides/career-change"
                      image="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80"
                      title="Going back to study as an adult"
                      description="Balancing work, family and a degree."
                      ctaText="6 min read →"
                      icon="🎓"
                      badge="Career change"
                    />
                    <JourneyCard
                      href="/guides/university-routes"
                      image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
                      title="Foundation, HND &amp; top-up routes"
                      description="No A-levels? Here's how adults get in."
                      ctaText="7 min read →"
                      icon="🚀"
                      badge="Routes"
                    />
                  </AutoScrollTrack>
                </div>

                {/* Step 4 */}
                <div className="jstep">
                  <div className="jl">
                    <span className="jnum">Step 4</span>
                    <h3>{data?.section_8?.steps?.[3]?.title}</h3>
                    <p>{data?.section_8?.steps?.[3]?.description}</p>
                  </div>
                  <AutoScrollTrack className="jcards">
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
                  </AutoScrollTrack>
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
            <span className="hbk">{data?.section_9?.badge}</span>
            <h2>{data?.section_9?.title}</h2>
            <p>{data?.section_9?.description}</p>
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
            <span className="kicker">{data?.section_10?.badge}</span>
            <h2>{data?.section_10?.title}</h2>
            <p>{data?.section_10?.description}</p>
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

