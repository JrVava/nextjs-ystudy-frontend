import { Banner } from "@/components/ui/Banner";
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
import { BackendCourse } from "@/types/course";

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
  console.log('apiCourses', apiCourses);

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
        {/* HERO SECTION DYNAMIZED WITH BANNER MODULE */}
        <Banner
          slug="degrees"
          fallbackTitle="Find a degree that fits your life."
          fallbackDescription="Set your filters, then search 200+ SFE-eligible courses built for working adults."
          fallbackBadgeText="Search all degrees"
          fallbackBgImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=85"
          fallbackRightCard={{
            layoutType: 'stats-highlight' as const,
            title: 'Snapshot',
            mainValue: `${courseCount}+`,
            items: [
              { value: 'SFE', subtitle: 'Eligible courses' },
              { value: '100%', subtitle: 'Free adviser support' }
            ]
          }}
        >
          <DegreeSearchConsole />
        </Banner>

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
    </div>
  );
}
