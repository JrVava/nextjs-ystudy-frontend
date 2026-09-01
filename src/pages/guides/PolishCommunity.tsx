import React from "react";
import { getCMSPageContent } from "@/services/cms.service";
import { getFAQBySlug } from "@/services/faq.service";
import { Banner } from "@/components/ui/Banner";
import { QualificationConversionCards, QualificationCrosslinks } from "@/components/ui";
import Link from "next/link";

const DEFAULT_STORIES = [
  {
    name: "Tomasz, Birmingham",
    img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85",
    path: ["Trade work", "BSc Construction Management", "Project management route"]
  },
  {
    name: "Magda, London",
    img: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=85",
    path: ["Care assistant", "Health & Social Care", "Healthcare leadership"]
  },
  {
    name: "Kamil, Manchester",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    path: ["Warehouse work", "Computing route", "IT career change"]
  }
];

const DEFAULT_FAQS = [
  {
    q: "Can Polish citizens get Student Finance in England?",
    a: "Possibly, depending on status, residency, previous study and course rules. Settled status, eligible pre-settled status, ILR and British citizenship are common routes."
  },
  {
    q: "Is Polish Matura accepted by UK universities?",
    a: "Often yes, but requirements vary by provider, subject and grades. Some providers may request ENIC comparison evidence."
  },
  {
    q: "Can I study without A-levels?",
    a: "Yes, some adults use Foundation Year, CertHE or mature-entry routes where work experience and motivation are considered."
  },
  {
    q: "Can I apply with pre-settled status?",
    a: "Many students can, but the full funding and residency rules need checking. Prepare evidence of your UK residence."
  },
  {
    q: "Is Licencjat recognised in the UK?",
    a: "A Polish Licencjat can support UK postgraduate or career-change routes, but each provider assesses the qualification and subject relevance."
  },
  {
    q: "Can I work while studying?",
    a: "Many adult learners work while studying. The safest option is to look for flexible, blended, weekend or part-time-compatible routes."
  },
  {
    q: "Do I need IELTS?",
    a: "Not always. Some providers accept GCSE English, previous study evidence or their own interview/assessment. Requirements vary."
  },
  {
    q: "Can parents get extra support?",
    a: "Some eligible parents may access Childcare Grant or Parents’ Learning Allowance. Amounts depend on circumstances and official assessment."
  },
  {
    q: "What if I missed the EUSS deadline?",
    a: "Late applications may be possible in some situations, but this needs specialist advice. Without eligible status, international fees may apply."
  },
  {
    q: "What should I do first?",
    a: "Start with Eligibility Checker or book an adviser call. Do not assume you are not suitable before checking status, funding and course routes."
  }
];

const DEFAULT_GUIDES = [
  {
    title: "Foundation Year Guide",
    description: "Understand Year 0 routes for mature students.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85",
    link: "/degrees/qualifications/foundation-year"
  },
  {
    title: "Student Finance Guides",
    description: "Loans, grants and common funding risks.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=85",
    link: "/guides/student-finance"
  },
  {
    title: "Career Change Guide",
    description: "Study routes for adults changing direction.",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    link: "/guides/career-change"
  }
];

export default async function PolishCommunity() {
  const data = await getCMSPageContent("polish-community");
  const dynamicFaqs = await getFAQBySlug("polish-community");

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Guide Not Found</h2>
        <p>We couldn't retrieve the Polish community guide details at this time.</p>
        <a href="/" className="btn btn-blue" style={{ marginTop: "1rem" }}>Go to Home</a>
      </div>
    );
  }

  const s1 = data?.section_1 || {};
  const s2 = data?.section_2 || {};
  const s3 = data?.section_3 || {};
  const s4 = data?.section_4 || {};
  const s5 = data?.section_5 || {};
  const s6 = data?.section_6 || {};
  const s7 = data?.section_7 || {};
  const s8 = data?.section_8 || {};
  const s9 = data?.section_9 || {};
  const s10 = data?.section_10 || {};
  const s11 = data?.section_11 || {};
  const s12 = data?.section_12 || {};
  const s13 = data?.section_13 || {};
  const s14 = data?.section_14 || {};
  const s15 = data?.section_15 || {};
  const s16 = data?.section_16 || {};
  const s17 = data?.section_17 || {};

  return (
    <div className="qualification-page polish-community-page golden-page">
      {/* HERO BANNER */}
      <Banner
        slug="polish-community"
        fallbackBadgeText={s1.badge || "Polish Community Guide"}
        fallbackTitle={s1.title || "From Polish Matura to a UK degree."}
        fallbackDescription={s1.description || "Understand Student Finance, Matura recognition and flexible degree routes in plain English."}
        fallbackBgImage={s1.bgImage || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=85"}
        fallbackRightCard={{
          layoutType: "grid-2x2",
          title: "Snapshot",
          items: [
            { title: "Free", subtitle: "guidance" },
            { title: "Funding", subtitle: "check" },
            { title: "Route", subtitle: "match" },
            { title: "Apply", subtitle: "support" }
          ]
        }}
        childrenPosition="left"
        isGuideHero={true}
      >
        <div className="btnrow" style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          <a className="btn btn-orange" href="/tools/eligibility-checker">
            Check eligibility
          </a>
          <a className="btn btn-white" href="/lead/adviser-call">
            Book adviser
          </a>
        </div>
        <div className="hero-pills" style={{ display: "flex", gap: "12px", marginTop: "18px" }}>
          <span className="pill glass" style={{ background: "rgba(255,255,255,0.12)", color: "#fff", padding: "6px 12px", borderRadius: "100px", fontSize: "13px" }}>Plain English</span>
          <span className="pill glass" style={{ background: "rgba(255,255,255,0.12)", color: "#fff", padding: "6px 12px", borderRadius: "100px", fontSize: "13px" }}>Adult learner route</span>
          <span className="pill glass" style={{ background: "rgba(255,255,255,0.12)", color: "#fff", padding: "6px 12px", borderRadius: "100px", fontSize: "13px" }}>Funding-focused</span>
        </div>
      </Banner>

      {/* COMMUNITY SNAPSHOT (section_2) */}
      {s2.status !== false && (
        <section className="gg-section soft">
          <div className="container">
            <div className="gg-head">
              <div>
                <span className="kicker">{s2.badge || "Community snapshot"}</span>
                <h2>{s2.title || "What should Polish students know first?"}</h2>
              </div>
              <p>{s2.description || "Polish people are one of the largest European communities in the UK."}</p>
            </div>
            <div className="gg-grid four">
              {(s2.cards || [
                { icon: "🏙️", title: "Large UK community", description: "Major communities are in London, Birmingham, Manchester, Edinburgh, Glasgow, Southampton, Reading and Crewe." },
                { icon: "📄", title: "EUSS routes", description: "Many Polish residents hold settled or pre-settled status under the EU Settlement Scheme, which may support home-fee and funding routes." },
                { icon: "👷", title: "Work-based progression", description: "Construction, care, logistics, IT and business are common starting points for moving into professional roles." },
                { icon: "🎓", title: "Mature learner friendly", description: "Foundation Year, CertHE and flexible degrees may suit adults who have worked for years and do not hold UK A-levels." }
              ]).map((c: any, idx: number) => (
                <article className="gg-card" key={idx}>
                  <div className="gg-icon">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STUDENT FINANCE (section_3) */}
      {s3.status !== false && (
        <section className="gg-section">
          <div className="container">
            <div className="gg-head">
              <div>
                <span className="kicker">{s3.badge || "Student Finance"}</span>
                <h2>{s3.title || "Can you get Student Finance?"}</h2>
              </div>
              <p>{s3.description || "Eligibility depends mainly on immigration status, residency history, previous study and the course."}</p>
            </div>
            <div className="gg-grid five" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "18px" }}>
              {(s3.cards || [
                { badge: "Likely route", title: "Settled Status", description: "Usually treated like a UK citizen for home-fee and Student Finance purposes if other rules are met.", statusClass: "green" },
                { badge: "Often eligible", title: "Pre-Settled Status", description: "Many students qualify if they meet residency and course rules. Evidence matters.", statusClass: "green" },
                { badge: "Eligible route", title: "ILR", description: "Indefinite Leave to Remain is normally a strong route for home-fee and funding access.", statusClass: "green" },
                { badge: "Standard route", title: "British Citizen", description: "Apply through the standard Student Finance and admissions process.", statusClass: "green" },
                { badge: "Adviser review", title: "No EUSS / New arrival", description: "May be case-by-case. Without eligible status, international fees may apply.", statusClass: "amber" }
              ]).map((c: any, idx: number) => (
                <article className="gg-card" key={idx}>
                  <span className={`gg-status ${c.statusClass || c.class || "green"}`}>{c.badge}</span>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                </article>
              ))}
            </div>
            {(s3.important_box || s3.note) && (
              <div className="template-note">
                <strong>{s3.important_box?.title || "3-year residency rule"}:</strong> {s3.important_box?.text || "keep evidence such as council tax, tenancy documents, utility bills, GP/NHS records, payslips, P60s and official letters."}
              </div>
            )}
          </div>
        </section>
      )}

      {/* MYTHS BROKEN (section_4) */}
      {s4.status !== false && (
        <section className="gg-section cream">
          <div className="container">
            <div className="gg-head">
              <div>
                <span className="kicker">{s4.badge || "Myths broken"}</span>
                <h2>{s4.title || "Common myths — broken."}</h2>
              </div>
              <p>{s4.description || "These pages should build confidence, not scare people away."}</p>
            </div>
            <div className="myth-grid">
              {(s4.cards || [
                { myth: "❌ “I need A-levels.”", reality: "Foundation Year and mature-entry routes may allow adults to start without traditional A-levels, depending on the provider and course." },
                { myth: "❌ “Student Finance is only for British citizens.”", reality: "Settled status, pre-settled status and ILR holders may be eligible for funding if the full rules are met." },
                { myth: "❌ “My Matura will not count.”", reality: "Polish Matura is commonly understood by UK providers and may be accepted directly or through a qualification comparison route." },
                { myth: "❌ “I am too old to study.”", reality: "Many YStudy students are working adults, parents and career changers in their 30s, 40s and 50s." },
                { myth: "❌ “I cannot study because I work.”", reality: "Weekend, blended and flexible routes are designed for adults balancing work, bills and family commitments." },
                { myth: "❌ “My English must be perfect.”", reality: "Interview requirements vary. Some foundation and flexible routes include academic support. The safest step is adviser matching." }
              ]).map((c: any, idx: number) => (
                <div className="myth-card" key={idx}>
                  <div className="myth">{c.myth || c.title}</div>
                  <div className="reality">
                    <strong>Reality</strong>
                    <p>{c.reality || c.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* QUALIFICATION CONVERSION (section_5) */}
      {s5.status !== false && (
        <section className="gg-section">
          <div className="container">
            <div className="gg-head">
              <div>
                <span className="kicker">{s5.badge || "Qualification conversion"}</span>
                <h2>{s5.title || "How do Polish qualifications translate?"}</h2>
              </div>
              <p>{s5.description || "Students may start from Matura, UK qualifications, Polish higher education or no formal qualifications."}</p>
            </div>
            <div className="path-grid">
              {(s5.cards || [
                { title: "Polish Matura", description: "Świadectwo dojrzałości can support university entry and may be compared to UK A-level study." },
                { title: "UK route check", description: "Provider checks grades, subjects, English evidence and whether ENIC evidence is needed." },
                { title: "Degree entry", description: "Direct entry, Foundation Year or CertHE route depending on course and profile." },
                { title: "Apply with support", description: "Documents, funding, English confidence and interview preparation." }
              ]).map((step: any, idx: number) => (
                <div className="path-card" key={idx}>
                  <b>{step.title}</b>
                  <span>{step.description}</span>
                </div>
              ))}
            </div>
            <div className="gg-grid three" style={{ marginTop: "18px" }}>
              {(s5.cards2 || [
                { title: "Licencjat", description: "A Polish 3-year bachelor route may support postgraduate study or a career-change route. Check case by case." },
                { title: "Magister", description: "Often a strong academic background for UK postgraduate or professional progression routes." },
                { title: "No formal qualifications", description: "Mature applicants may still have options through Foundation Year, CertHE or work-experience routes." }
              ]).map((c: any, idx: number) => (
                <article className="gg-card" key={idx}>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FUNDING SNAPSHOT (section_6) */}
      {s6.status !== false && (
        <section className="gg-section soft">
          <div className="container">
            <div className="gg-head">
              <div>
                <span className="kicker">{s6.badge || "Funding snapshot"}</span>
                <h2>{s6.title || "How much funding could you receive?"}</h2>
              </div>
              <p>{s6.description || "Figures used here follow the source content you provided for the Polish guide."}</p>
            </div>
            <div className="funding-grid">
              {(s6.cards || [
                { title: "Tuition Fee Loan", amount: "£9,790", description: "Paid to provider if approved." },
                { title: "Maintenance Loan", amount: "£14,135", description: "London, away-from-home maximum used in the source guide." },
                { title: "Childcare Grant", amount: "£199.62/wk", description: "For eligible students using registered childcare." },
                { title: "Parents’ Learning Allowance", amount: "£1,963", description: "Extra support for some parents." }
              ]).map((c: any, idx: number) => (
                <div className="funding-card" key={idx}>
                  <span>{c.title}</span>
                  <strong>{c.amount}</strong>
                  <p>{c.description}</p>
                </div>
              ))}
            </div>
            <div className="gg-hero-actions" style={{ marginTop: "22px" }}>
              <a className="gg-btn blue" href="/tools/finance-calculator">Estimate my funding</a>
              <a className="gg-btn white" href="/funding">Open funding hub</a>
            </div>
          </div>
        </section>
      )}

      {/* POPULAR DEGREE ROUTES (section_7) */}
      {s7.status !== false && (
        <section className="gg-section">
          <div className="container">
            <div className="gg-head">
              <div>
                <span className="kicker">{s7.badge || "Popular degree routes"}</span>
                <h2>{s7.title || "What degrees do Polish students often choose?"}</h2>
              </div>
              <p>{s7.description || "These are observational patterns based on common work backgrounds."}</p>
            </div>
            <div className="image-route-grid">
              <a className="image-route" href="/degrees"><img alt="Health and social care students" src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=85"/><div className="content"><h3>Health &amp; Social Care</h3><p>Care assistant → nursing, leadership or health management routes.</p></div></a>
              <a className="image-route" href="/degrees"><img alt="Construction management route" src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85"/><div className="content"><h3>Construction Management</h3><p>Trade experience → site supervision and project management.</p></div></a>
              <a className="image-route" href="/degrees"><img alt="Business students" src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85"/><div className="content"><h3>Business &amp; Management</h3><p>Useful for entrepreneurs, managers and career changers.</p></div></a>
              <a className="image-route" href="/degrees"><img alt="Computing route" src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=85"/><div className="content"><h3>Computing / IT</h3><p>IT support, software, cloud and cyber career routes.</p></div></a>
              <a className="image-route" href="/degrees"><img alt="Accounting and finance" src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=85"/><div className="content"><h3>Accounting &amp; Finance</h3><p>Bookkeeping, ACCA, CIMA and finance progression.</p></div></a>
              <a className="image-route" href="/degrees"><img alt="Teaching route" src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=85"/><div className="content"><h3>Education / Teaching</h3><p>Teaching assistant → QTS, education or language support roles.</p></div></a>
            </div>

          </div>
        </section>
      )}

      {/* CAREER OUTCOMES (section_8) */}
      {s8.status !== false && (
        <section className="gg-section cream">
          <div className="container">
            <div className="gg-head">
              <div>
                <span className="kicker">{s8.badge || "Career outcomes"}</span>
                <h2>{s8.title || "What could your career progression look like?"}</h2>
              </div>
              <p>{s8.description || "Salary depends on employer, region, experience and sector."}</p>
            </div>
            <div className="salary-grid">
              {(s8.cards || [
                { title: "Care → Nursing", salary: "£24k → £45k", description: "Health & Social Care or nursing pathways." },
                { title: "Site work → Construction PM", salary: "£32k → £65k+", description: "Construction management, QS and project roles." },
                { title: "IT support → Developer", salary: "£28k → £70k", description: "Computing, software and cyber progression." },
                { title: "Bookkeeper → Accountant", salary: "£26k → £55k", description: "Accounting, finance and professional qualification paths." }
              ]).map((c: any, idx: number) => (
                <div className="salary-card" key={idx}>
                  <span>{c.title}</span>
                  <strong>{c.salary}</strong>
                  <p>{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STUDY LOCATIONS (section_9) */}
      {s9.status !== false && (
        <section className="gg-section">
          <div className="container">
            <div className="gg-head">
              <div>
                <span className="kicker">{s9.badge || "Study locations"}</span>
                <h2>{s9.title || "Where could you study?"}</h2>
              </div>
              <p>{s9.description || "No logos, no ranking claims — just useful location and study-mode information."}</p>
            </div>
            <div className="uni-grid">
              <article className="uni-card"><h3>London providers</h3><p>Largest course choice and highest maintenance-loan location, but higher living costs.</p><div className="uni-tags"><span>London</span><span>Blended</span><span>Business</span></div></article>
              <article className="uni-card"><h3>Birmingham providers</h3><p>Strong adult learner demand, lower costs than London and good transport links.</p><div className="uni-tags"><span>Midlands</span><span>Health</span><span>Construction</span></div></article>
              <article className="uni-card"><h3>Manchester providers</h3><p>Popular for technology, business, health and creative industries.</p><div className="uni-tags"><span>North West</span><span>Computing</span><span>Flexible</span></div></article>
              <article className="uni-card"><h3>Leeds providers</h3><p>Financial services, healthcare and digital routes with a lower cost of living.</p><div className="uni-tags"><span>Yorkshire</span><span>Finance</span><span>Health</span></div></article>
              <article className="uni-card"><h3>Newcastle providers</h3><p>Affordable major student city with healthcare, engineering and business options.</p><div className="uni-tags"><span>North East</span><span>Affordable</span><span>Student city</span></div></article>
              <article className="uni-card"><h3>Cardiff providers</h3><p>Wales uses a different funding body, so check before applying.</p><div className="uni-tags"><span>Wales</span><span>Funding check</span><span>City campus</span></div></article>
            </div>

          </div>
        </section>
      )}

      {/* CHALLENGES & SOLUTIONS (section_10) */}
      {s10.status !== false && (
        <section className="gg-section soft">
          <div className="container">
            <div className="gg-head">
              <div>
                <span className="kicker">{s10.badge || "Challenges & solutions"}</span>
                <h2>{s10.title || "What challenges should you prepare for?"}</h2>
              </div>
              <p>{s10.description || "These are based on the practical issues highlighted in the Polish community content."}</p>
            </div>
            <div className="challenge-list">
              {(s10.cards || [
                { number: "1", title: "Residency documentation", description: "Gather official UK evidence early: council tax, bills, GP records, payslips, P60s and Home Office status evidence." },
                { number: "2", title: "Academic English", description: "Everyday English and academic writing are different. The best route depends on provider, course and interview expectations." },
                { number: "3", title: "Polish qualification recognition", description: "Matura, Licencjat and Magister routes may be understood differently depending on course level. Get evidence early." },
                { number: "4", title: "Work and family balance", description: "Many adults need flexible study patterns around shifts, childcare, rent and family responsibilities." },
                { number: "5", title: "Pre-settled to settled timing", description: "If you can upgrade, plan early. It may help reduce uncertainty before starting the course." }
              ]).map((c: any, idx: number) => (
                <div className="challenge" key={idx}>
                  <div className="num">{c.number || (idx + 1)}</div>
                  <div>
                    <h3>{c.title}</h3>
                    <p>{c.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STUDENT STORIES (section_11) */}
      {s11.status !== false && (
        <section className="gg-section">
          <div className="container">
            <div className="gg-head">
              <div>
                <span className="kicker">{s11.badge || "Student stories"}</span>
                <h2>{s11.title || "What could your story look like?"}</h2>
              </div>
              <p>{s11.description || "Use these as realistic journey examples. Replace with real testimonials when available."}</p>
            </div>
            <div className="story-grid story-carousel">
              {(s11.cards || DEFAULT_STORIES).map((story: any, idx: number) => (
                <article className="story-card" key={idx}>
                  <img alt={story.name || story.title} src={story.img || story.imageUrl || story.image} />
                  <div className="body">
                    <h3>{story.name || story.title}</h3>
                    <div className="story-path">
                      {(story.path || []).map((step: string, sIdx: number) => (
                        <React.Fragment key={sIdx}>
                          {sIdx > 0 && <span>↓</span>}
                          <span>{step}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ SECTION (section_12) */}
      {s12.status !== false && (
        <section className="gg-section cream">
          <div className="container">
            <div className="gg-head">
              <div>
                <span className="kicker">{s12.badge || "FAQ"}</span>
                <h2>{s12.title || "Common questions from Polish students"}</h2>
              </div>
              <p>{s12.description || "This section is designed for SEO and reassurance. Keep answers clear and practical."}</p>
            </div>
            <div className="faq-list">
              {(dynamicFaqs || s12.faqs || DEFAULT_FAQS).map((faq: any, idx: number) => (
                <details key={idx}>
                  <summary>{faq.question || faq.q}</summary>
                  <p>{faq.answer || faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED TOOLS (section_13) */}
      {s13.status !== false && (
        <section className="gg-section">
          <div className="container">
            <div className="gg-head">
              <div>
                <span className="kicker">{s13.badge || "Related tools"}</span>
                <h2>{s13.title || "Plan your next step with YStudy."}</h2>
              </div>
              <p>{s13.description || "These tools move the guide reader into a real application journey."}</p>
            </div>
            <div className="tool-glass-grid">
              {(s13.cards || [
                { badge: "Decision tool", title: "Degree Match Finder", description: "Match your goals, qualifications and study style to realistic routes." },
                { badge: "Funding tool", title: "Eligibility Checker", description: "Check status, residence and funding risk before applying." },
                { badge: "Interview tool", title: "English Test", description: "Choose B1, B2 or Advanced and check interview confidence." }
              ]).map((c: any, idx: number) => (
                <Link className="tool-glass" href={c.link || (idx === 0 ? "/tools/degree-match" : idx === 1 ? "/tools/eligibility-checker" : "/tools/english-level-checker")} key={idx}>
                  <span>{c.badge}</span>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED GUIDES (section_14) */}
      {s14.status !== false && (
        <section className="gg-section soft">
          <div className="container">
            <div className="gg-head">
              <div>
                <span className="kicker">{s14.badge || "Related guides"}</span>
                <h2>{s14.title || "Keep learning before you apply."}</h2>
              </div>
              <p>{s14.description || "Use article cards to connect the Polish guide to the wider Resources section."}</p>
            </div>
            <div className="related-grid course-carousel">
              {(s14.cards || DEFAULT_GUIDES).map((guide: any, idx: number) => (
                <Link className="article-card" href={guide.link || guide.href} key={idx}>
                  <img alt={guide.title} src={guide.img || guide.imageUrl || guide.image} />
                  <div className="body">
                    <h3>{guide.title}</h3>
                    <p>{guide.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROMISE CHECKLIST / FINAL CTA (section_15) */}
      {s15.status !== false && (
        <section className="gg-section">
          <div className="container">
            <div className="gg-final">
              <div>
                <h2>{s15.title || "Ready to check your options?"}</h2>
                <p>{s15.description || "YStudy can help you understand Student Finance, Polish qualification evidence, flexible degree options and the application process."}</p>
                <div className="gg-ticks">
                  {(s15.pointers || [
                    "✓ Student Finance",
                    "✓ Matura / qualification route",
                    "✓ Flexible degrees",
                    "✓ Application support"
                  ]).map((tick: string, idx: number) => (
                    <span key={idx}>{tick}</span>
                  ))}
                </div>
              </div>
              <div className="gg-hero-actions">
                <a className="gg-btn orange" href="/tools/eligibility-checker">
                  Eligibility
                </a>
                <a className="gg-btn white" href="/apply">
                  Apply
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CONVERSION SYSTEM */}
      <QualificationConversionCards sectionData={s16} />

      {/* CROSSLINKS */}
      <QualificationCrosslinks sectionData={s17} />
    </div>
  );
}
