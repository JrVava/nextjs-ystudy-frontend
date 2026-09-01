import { SiteLayout } from "@/components/layout";
import { getCMSPageContent } from "@/services/cms.service";
import { Banner } from "@/components/ui/Banner";
import EligibilityWidget from "@/components/widgets/EligibilityWidget";
import { getAllCourses } from "@/services/course.service";
import { getSubjects } from "@/services/filters.service";
import { getFAQBySlug } from "@/services/faq.service";
import HomeJourneyWidget from "@/components/widgets/HomeJourneyWidget";
import { TrustBar, PhotoOverlayBand, ComparisonTable, FinalCta } from "@/components/sections";
import { CourseCard } from "@/components/degrees/CourseCard";

const getBadgeClass = (badge: string, code: string) => {
  const b = badge.toLowerCase();
  if (b.includes("full")) return "full";
  if (b.includes("prot")) return "prot";
  if (b.includes("part") || b.includes("adviser")) return "part";
  if (code === "RF") return "prot";
  return "full";
};

import { getStudentStoriesList } from "@/services/student-story.service";

export default async function Home() {
  const [data, allCourses, subjects, faqs, dbStories] = await Promise.all([
    getCMSPageContent("home"),
    getAllCourses(3),
    getSubjects(6),
    getFAQBySlug("home"),
    getStudentStoriesList().catch(() => null)
  ]);

  const renderCell = (val: string) => {
    if (val === "check" || val === "✓") return <span className="yes">✓</span>;
    if (val === "cross" || val === "✕") return <span className="no">✕</span>;
    if (val === "dash" || val === "—") return <span>—</span>;
    return <span>{val}</span>;
  };

  return (
    <SiteLayout>
      {/* SECTION 1: HERO (DYNAMIZED WITH BANNER MODULE) */}
      <Banner slug="home">
        <form action="/degrees" method="GET" className="hsearch">
          <input name="search" placeholder="Search subject, course or career…" />
          <button type="submit" className="btn black">Search →</button>
        </form>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "18px" }}>
          <a className="btn white lg" href="/tools/eligibility-checker">Check funding eligibility →</a>
          <a className="btn ghost lg" href="/tools">Try the free tools</a>
        </div>
        <div className="hstats">
          <div><b>2,400+</b><span>courses compared</span></div>
          <div><b>£0</b><span>always free</span></div>
          <div><b>9 tools</b><span>to plan your route</span></div>
        </div>
      </Banner>

      {/* SECTION 2: FUNDING ELIGIBILITY CHECK */}
      {data?.section_2?.status !== false && (
        <section className="sec soft">
          <div className="wrap">
            <div className="g2" style={{ alignItems: "center", gap: "clamp(30px,4vw,60px)" }}>
              <div>
                <span className="eyebrow o" style={{ marginBottom: "16px" }}>{data?.section_2?.badge}</span>
                <h2 className="h1" style={{ marginBottom: "14px" }}>{data?.section_2?.title}</h2>
                <p className="lead">{data?.section_2?.description}</p>
              </div>
              <EligibilityWidget />
            </div>
          </div>
        </section>
      )}

      {/* TRUST STRIP (Section 2 sub-elements / Dot Points) */}
      <TrustBar dotPoints={data?.section_2?.dot_points} status={data?.section_2?.status} />

      {/* SECTION 3: IMPACT & STATISTICS */}
      {data?.section_3?.status !== false && (
        <PhotoOverlayBand bgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=85" scrimColor="blue">
          <div className="inner wide">
            <span className="eyebrow glass" style={{ marginBottom: "18px" }}>{data?.section_3?.badge}</span>
            <h2 className="h1" style={{ color: "#fff", marginBottom: "8px" }}>{data?.section_3?.title}</h2>
            <div className="impact" style={{ gridTemplateColumns: "repeat(4,auto)", justifyContent: "start", textAlign: "left", gap: "clamp(20px,3vw,48px)", marginTop: "28px" }}>
              {data?.section_3?.statistics ? (
                data?.section_3.statistics.map((stat: any, idx: number) => (
                  <div key={idx} className="it"><b>{stat.value}</b><span>{stat.label}</span></div>
                ))
              ) : (
                <>
                  <div className="it"><b>2,400+</b><span>courses compared</span></div>
                  <div className="it"><b>12,000+</b><span>learners helped</span></div>
                  <div className="it"><b>£14k+</b><span>avg support</span></div>
                  <div className="it"><b>£0</b><span>always free</span></div>
                </>
              )}
            </div>
          </div>
        </PhotoOverlayBand>
      )}

      {/* SECTION 4: POPULAR DEGREES */}
      {data?.section_4?.status !== false && (
        <section className="sec">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow o">{data?.section_4?.badge}</span>
                <h2 className="h1" style={{ marginTop: "16px" }}>{data?.section_4?.title}</h2>
              </div>
              <a className="btn outline" href="/degrees">Browse all degrees →</a>
            </div>
            <div className="g3 ys-carousel-mobile">
              {(() => {
                const popularCourseSlugs = ["business-management-ba", "computing-cybersecurity-bsc", "health-social-care-ba"];
                const popularCourses = allCourses.filter(c => popularCourseSlugs.includes(c.slug));
                const displayCourses = (popularCourses.length > 0 ? popularCourses : allCourses).slice(0, 3);
                return displayCourses.map((c) => (
                  <CourseCard key={c._id} course={c} variant="grid" />
                ));
              })()}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: QUIZ WIDGET */}
      {data?.section_5?.status !== false && (
        <section className="sec soft">
          <div className="wrap">
            <div className="g2" style={{ alignItems: "center", gap: "clamp(30px,4vw,60px)" }}>
              <div>
                <span className="eyebrow b" style={{ marginBottom: "16px" }}>{data?.section_5?.badge}</span>
                <h2 className="h1" style={{ marginBottom: "14px" }}>{data?.section_5?.title}</h2>
                <p className="lead" style={{ marginBottom: "22px" }}>{data?.section_5?.description}</p>
                <div className="pills">
                  {data?.section_5?.badges ? (
                    data?.section_5.badges.map((b: any, idx: number) => (
                      <span key={idx} className={b.class}>{b.value}</span>
                    ))
                  ) : (
                    <>
                      <span className="pill">5 min</span>
                      <span className="pill o">Free</span>
                      <span className="pill">Personalised</span>
                    </>
                  )}
                </div>
              </div>
              <div className="widget">
                <div className="small" style={{ color: "var(--muted)", marginBottom: "14px" }}>QUESTION 1 OF 5</div>
                <h3 className="h3" style={{ marginBottom: "16px" }}>What's your main goal?</h3>
                <div style={{ display: "grid", gap: "10px" }}>
                  <div style={{ border: "2px solid var(--b)", borderRadius: "16px", padding: "16px", fontWeight: 800, background: "var(--soft)" }}>💼 Career change into a new field</div>
                  <div style={{ border: "1.5px solid var(--line)", borderRadius: "16px", padding: "16px", fontWeight: 800 }}>📈 Progress in my current career</div>
                  <div style={{ border: "1.5px solid var(--line)", borderRadius: "16px", padding: "16px", fontWeight: 800 }}>🎓 Finally get my degree</div>
                </div>
                <a className="btn black" style={{ width: "100%", marginTop: "16px" }} href="/apply">Continue →</a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6: SUBJECT LIST */}
      {data?.section_6?.status !== false && (
        <section className="sec">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow b">{data?.section_6?.badge}</span>
                <h2 className="h1" style={{ marginTop: "16px" }}>{data?.section_6?.title}</h2>
              </div>
              <a className="btn outline" href="/degrees/subjects">All subjects →</a>
            </div>
            <div className="g3 ys-carousel-mobile">
              {(() => {
                const displaySubjects = ((subjects || []) as any[]).map((sub) => {
                  const title = sub.title || sub.name || "";
                  let count = 0;
                  allCourses.forEach((c) => {
                    const cSub = c.subject || c.subjects;
                    const subs = Array.isArray(cSub) ? cSub : cSub ? [cSub] : [];
                    const match = subs.some((s) => {
                      const sTitle = s?.title || s?.name || (typeof s === "string" ? s : "");
                      return sTitle.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(sTitle.toLowerCase());
                    });
                    if (match) count++;
                  });
                  return {
                    title,
                    count: `${count} course${count !== 1 ? "s" : ""}`,
                    image: sub.fullImageUrl || sub.image || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
                    slug: sub.slug
                  };
                });
                return displaySubjects.map((s, idx) => (
                  <a key={idx} href={`/degrees?subject=${encodeURIComponent(s.title)}`} className="subj">
                    <img src={s.image} alt="" />
                    <div className="lab">
                      <b>{s.title}</b>
                      <span>{s.count}</span>
                    </div>
                  </a>
                ));
              })()}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 7: FREE TOOLS SYSTEM */}
      {data?.section_7?.status !== false && (
        <section className="sec soft">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow o">{data?.section_7?.badge}</span>
                <h2 className="h1" style={{ marginTop: "16px" }}>{data?.section_7?.title}</h2>
              </div>
              <a className="btn outline" href="/tools">All tools →</a>
            </div>
            <div className="g4 ys-carousel-mobile">
              {(data?.section_7?.tools || [
                {
                  title: "Degree Match",
                  description: "Answer a few questions, get one recommended route.",
                  link: "/tools/degree-match",
                  btnLabel: "Start quiz →",
                  image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=80",
                  tag: "Quiz"
                },
                {
                  title: "Finance Calculator",
                  description: "Estimate tuition and maintenance support fast.",
                  link: "/tools/finance-calculator",
                  btnLabel: "Calculate →",
                  image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=700&q=80",
                  tag: "Calculator"
                },
                {
                  title: "Salary Checker",
                  description: "Compare salary ranges by subject and stage.",
                  link: "/tools/salary-checker",
                  btnLabel: "Check →",
                  image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=80",
                  tag: "Checker"
                },
                {
                  title: "English Checker",
                  description: "Check your English level before you apply.",
                  link: "/tools/english-level-checker",
                  btnLabel: "Start test →",
                  image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=700&q=80",
                  tag: "English"
                }
              ]).map((t: any, idx: number) => (
                <article key={idx} className="c-wrap tool">
                  <div className="img"><img src={t.image} alt="" /><span className="tag">{t.tag}</span></div>
                  <div className="body">
                    <h3 className="h3">{t.title}</h3>
                    <p className="desc">{t.description}</p>
                    <a className="btn orange sm" href={t.link}>{t.btnLabel}</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 8: COMPARISON TABLE */}
      {data?.section_8?.status !== false && (
        <section className="sec">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow o">Why YStudy</span>
                <h2 className="h1" style={{ marginTop: "16px" }}>Why apply through us?</h2>
              </div>
              <p className="lead">Free guidance and funding clarity you don't get going direct.</p>
            </div>
            <ComparisonTable
              className="why"
              variant="grid"
              headers={[
                data?.section_8?.headers?.feature_header || "What you get",
                data?.section_8?.headers?.ystudy_header || "With YStudy",
                data?.section_8?.headers?.direct_header || "Going direct"
              ]}
              rows={data?.section_8?.rows || [
                { feature: "Free adviser guidance", with_ystudy: "✓", going_direct: "✕" },
                { feature: "Funding & eligibility check", with_ystudy: "✓", going_direct: "✕" },
                { feature: "Compare flexible routes", with_ystudy: "✓", going_direct: "Limited" },
                { feature: "Application support", with_ystudy: "✓", going_direct: "✕" },
                { feature: "Always free", with_ystudy: "✓", going_direct: "—" }
              ]}
              renderCell={(val) => renderCell(val)}
            />
          </div>
        </section>
      )}

      {/* SECTION 9: STUDENT FINANCE BANNER & CALCULATOR */}
      {data?.section_9?.status !== false && (
        <section className="sec soft">
          <div className="wrap">
            <div className="povl bleed">
              <img className="bg" src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2000&q=85" alt="" />
              <div className="sc sc-orange"></div>
              <div className="inner wide" style={{ maxWidth: "100%", display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: "clamp(28px,3.5vw,56px)", alignItems: "center", width: "100%" }}>
                <div>
                  <span className="eyebrow glass" style={{ marginBottom: "16px" }}>{data?.section_9?.badge}</span>
                  <h2 className="h2" style={{ color: "#fff", marginBottom: "14px" }}>{data?.section_9?.title}</h2>
                  <p className="lead" style={{ color: "#fff", opacity: 0.92, marginBottom: "24px", maxWidth: "460px" }}>{data?.section_9?.description}</p>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <a className="btn black lg" href="/tools/finance-calculator">Open calculator →</a>
                    <a className="btn white lg" href="/funding">Read funding guide</a>
                  </div>
                </div>
                <div className="widget">
                  <h3 className="h3" style={{ marginBottom: "16px" }}>Finance calculator</h3>
                  <div className="g2" style={{ gap: "12px" }}>
                    <div className="field"><label>Household income</label><div className="inp">£25k–£30k</div></div>
                    <div className="field"><label>Location</label><div className="inp">London</div></div>
                  </div>
                  <a className="btn orange" style={{ width: "100%" }} href="/tools/finance-calculator">Calculate →</a>
                  <div className="result"><div className="lbl">Total support</div><div className="big">£23,925</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 10: IMMIGRATION STATUS CHECK */}
      {data?.section_10?.status !== false && (
        <section className="sec ink">
          <div className="wrap">
            <div className="g2" style={{ alignItems: "start", gap: "clamp(28px,3.5vw,56px)" }}>
              <div>
                <span className="eyebrow gold" style={{ marginBottom: "16px" }}>{data?.section_10?.badge}</span>
                <h2 className="h1" style={{ color: "#fff", marginBottom: "14px" }}>{data?.section_10?.title}</h2>
                <p className="lead" style={{ color: "#aebed6", marginBottom: "20px" }}>{data?.section_10?.description}</p>
                <div className="note-box">
                  <b>{data?.section_10?.important_box?.title}</b>
                  <p>{data?.section_10?.important_box?.text}</p>
                </div>
              </div>
              <div className="imm-grid">
                {data?.section_10?.status_cards ? (
                  data?.section_10.status_cards.map((card: any, idx: number) => (
                    <article key={idx} className="imm">
                      <div className="top">
                        <span className="code">{card.code}</span>
                        <span className={`badge ${getBadgeClass(card.badge, card.code)}`}>{card.badge}</span>
                      </div>
                      <p className="desc">{card.description}</p>
                    </article>
                  ))
                ) : (
                  <>
                    <article className="imm"><div className="top"><span className="code">UK</span><span className="badge full">Full support route</span></div><p className="desc">Usually able to apply for Tuition Fee Loan and Maintenance Loan if England residence and course rules are met.</p></article>
                    <article className="imm"><div className="top"><span className="code">ILR</span><span className="badge full">Full support route</span></div><p className="desc">Usually treated as settled. Check England home address and continuous residence before the course starts.</p></article>
                    <article className="imm"><div className="top"><span className="code">EU</span><span className="badge full">Full support route</span></div><p className="desc">Can be a strong full-support route where the student meets residence, course and age requirements.</p></article>
                    <article className="imm"><div className="top"><span className="code">RF</span><span className="badge prot">Protected status</span></div><p className="desc">Often eligible under protected-status rules, but evidence and exact status wording must be checked carefully.</p></article>
                  </>
                )}
                {data?.section_10?.ps_box && (
                  <article className="imm dark" style={{ gridColumn: "1/-1" }}>
                    <div className="top">
                      <span className="code">{data?.section_10.ps_box.code}</span>
                      <span className="badge part">{data?.section_10.ps_box.badge}</span>
                    </div>
                    <h4>{data?.section_10.ps_box.title}</h4>
                    <p className="desc">{data?.section_10.ps_box.description}</p>
                  </article>
                )}
              </div>
            </div>
            <p className="small" style={{ color: "#7e90ad", marginTop: "24px" }}>{data?.section_10?.disclaimer}</p>
          </div>
        </section>
      )}

      {/* SECTION 11: SALARY PROJECTION */}
      {data?.section_11?.status !== false && (
        <section className="sec">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow o">{data?.section_11?.badge}</span>
                <h2 className="h1" style={{ marginTop: "16px" }}>{data?.section_11?.title}</h2>
              </div>
              <p className="lead">{data?.section_11?.description}</p>
            </div>
            <div className="sal-grid" style={{ marginBottom: "30px" }}>
              {data?.section_11?.projection_cards ? (
                data?.section_11.projection_cards.map((c: any, idx: number) => (
                  <article key={idx} className="sal">
                    <div className="stage">{c.level}</div>
                    <div className="yr">{c.years}</div>
                    <div className="amt">{c.salary}</div>
                    <div className="role">{c.description}</div>
                  </article>
                ))
              ) : (
                <>
                  <article className="sal"><div className="stage">Entry</div><div className="yr">Year 1</div><div className="amt">£28k</div><div className="role">Graduate or junior role.</div></article>
                  <article className="sal"><div className="stage">Junior</div><div className="yr">Year 2–3</div><div className="amt">£36k</div><div className="role">Specialist or team role.</div></article>
                  <article className="sal"><div className="stage">Mid-career</div><div className="yr">Year 4–6</div><div className="amt">£47k</div><div className="role">Manager or analyst role.</div></article>
                  <article className="sal"><div className="stage">Senior</div><div className="yr">Year 7+</div><div className="amt">£75k+</div><div className="role">Senior management path.</div></article>
                </>
              )}
            </div>
            {data?.section_11?.cta_banner && (
              <div className="sal-band">
                <div>
                  <h3 className="h2" style={{ marginBottom: "8px", color: "#fff" }}>{data?.section_11.cta_banner.title}</h3>
                  <p style={{ color: "#cdd9ec", fontWeight: 600 }}>{data?.section_11.cta_banner.subtitle}</p>
                </div>
                <a className="btn orange lg" href="/tools/salary-checker">Open Salary Checker →</a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* SECTION 12: HONEST TRUTH ABOUT STUDENT FINANCE */}
      {data?.section_12?.status !== false && (
        <section className="sec ink">
          <div className="wrap">
            <div className="g2" style={{ alignItems: "center", gap: "clamp(28px,3.5vw,56px)" }}>
              <div>
                <span className="eyebrow gold" style={{ marginBottom: "16px" }}>{data?.section_12?.badge}</span>
                <h2 className="h1" style={{ color: "#fff", marginBottom: "14px" }}>{data?.section_12?.title}</h2>
                <p className="lead" style={{ color: "#aebed6", marginBottom: "24px" }}>{data?.section_12?.description}</p>
                <a className="btn white lg" href="/funding/maintenance-loan">See full repayment details →</a>
              </div>
              <div style={{ display: "grid", gap: "14px" }}>
                {data?.section_12?.truth_cards ? (
                  data?.section_12.truth_cards.map((c: any, idx: number) => (
                    <div key={idx} className="note-box">
                      <b>{c.title}</b>
                      <p>{c.description}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="note-box"><b>It's a loan, not a grant</b><p>Tuition is paid to university. Maintenance is paid to you.</p></div>
                    <div className="note-box"><b>You only repay above £25,000</b><p>Repayment is based on income, not the balance.</p></div>
                    <div className="note-box"><b>Wiped after 30 / 40 years</b><p>Many graduates do not repay the full amount.</p></div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* INTAKE STRIP */}
      {data?.section_12?.next_intake && (
        <section className="sec tight">
          <div className="wrap">
            <div style={{ background: "linear-gradient(135deg,var(--b-deep),var(--b))", color: "#fff", borderRadius: "20px", padding: "22px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "18px", flexWrap: "wrap" }}>
              <div>
                <b style={{ fontSize: "21px", fontWeight: 900 }}>{data?.section_12.next_intake.title}</b>
                <div style={{ color: "#cdd9ec", fontWeight: 700 }}>{data?.section_12.next_intake.description}</div>
              </div>
              <a className="btn white" href="/apply">Start your application →</a>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 13: SUCCESS STORIES */}
      {data?.section_13?.status !== false && (
        <section className="sec">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow o">{data?.section_13?.badge}</span>
                <h2 className="h1" style={{ marginTop: "16px" }}>{data?.section_13?.title}</h2>
              </div>
              <a className="btn outline" style={{ border: '2px solid var(--ink)' }} href="/success-stories">More stories →</a>
            </div>
            <div className="g3 ys-carousel-mobile">
              {(() => {
                const stories = (dbStories && dbStories.length > 0)
                  ? dbStories.map((s: any) => ({
                      image: "",
                      title: s.description,
                      name: s.name,
                      year: s.year && s.subject ? `${s.year} · ${s.subject}` : (s.year || s.subject || "")
                    }))
                  : data?.section_13?.card;

                if (!stories) return null;

                return stories.map((c: any, idx: number) => {
                  const fallbackImages = [
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80",
                    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=700&q=80"
                  ];
                  return (
                    <article key={idx} className="c-full" style={{ minHeight: "clamp(340px,30vw,420px)" }}>
                      <img src={c.fullImageUrl || c.image || fallbackImages[idx % 3]} alt="" />
                      <div className="sc"></div>
                      <div className="inner">
                        <div style={{ color: "var(--o-gold)", fontWeight: 900, letterSpacing: "2px", marginBottom: "8px" }}>★★★★★</div>
                        <h3 className="h3" style={{ marginBottom: "14px", color: "#fff" }}>"{c.title}"</h3>
                        <b style={{ fontWeight: 900 }}>{c.name}</b>
                        <span style={{ display: "block", color: "#cdd9ec", fontSize: "13px", fontWeight: 700 }}>{c.year}</span>
                      </div>
                    </article>
                  );
                });
              })()}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 14: GUIDES & NEWS */}
      {data?.section_14?.status !== false && (
        <section className="sec soft">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow o">{data?.section_14?.badge}</span>
                <h2 className="h1" style={{ marginTop: "16px" }}>{data?.section_14?.title}</h2>
              </div>
              <a className="btn outline" href="/guides">All guides →</a>
            </div>
            <div className="g3 ys-carousel-mobile">
              {data?.section_14?.card ? (
                data?.section_14.card.map((c: any, idx: number) => {
                  const fallbackImages = [
                    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80"
                  ];
                  return (
                    <article key={idx} className="c-wrap">
                      <div className="img" style={{ height: "170px" }}>
                        <img src={c.fullImageUrl || c.image || fallbackImages[idx % 3]} alt="" />
                        <span className="tag">{c.badge}</span>
                      </div>
                      <div className="body">
                        <h3 className="h3">{c.title}</h3>
                        <p className="desc">{c.description}</p>
                        <div className="metric"><span>{c.time}</span><b style={{ color: "var(--b)", fontSize: "15px" }}>Read →</b></div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <>
                  <article className="c-wrap">
                    <div className="img" style={{ height: "170px" }}>
                      <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80" alt="" />
                      <span className="tag">Funding</span>
                    </div>
                    <div className="body">
                      <h3 className="h3">Maintenance Loan explained</h3>
                      <p className="desc">What affects your amount and how it's paid termly.</p>
                      <div className="metric"><span>5 min read</span><b style={{ color: "var(--b)", fontSize: "15px" }}>Read →</b></div>
                    </div>
                  </article>
                  <article className="c-wrap">
                    <div className="img" style={{ height: "170px" }}>
                      <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="" />
                      <span className="tag">Applying</span>
                    </div>
                    <div className="body">
                      <h3 className="h3">Personal statement structure</h3>
                      <p className="desc">The four sections admissions teams expect.</p>
                      <div className="metric"><span>7 min read</span><b style={{ color: "var(--b)", fontSize: "15px" }}>Read →</b></div>
                    </div>
                  </article>
                  <article className="c-wrap">
                    <div className="img" style={{ height: "170px" }}>
                      <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80" alt="" />
                      <span className="tag">Careers</span>
                    </div>
                    <div className="body">
                      <h3 className="h3">Which degree pays off?</h3>
                      <p className="desc">Salary outcomes by subject and route.</p>
                      <div className="metric"><span>8 min read</span><b style={{ color: "var(--b)", fontSize: "15px" }}>Read →</b></div>
                    </div>
                  </article>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 15: STUDENT JOURNEY / ORBIT DECO */}
      {data?.section_15?.status !== false && (
        <section className="sec ink">
          <div className="wrap">
            <div className="g2" style={{ alignItems: "center", gap: "clamp(28px,3.5vw,56px)" }}>
              <div>
                <span className="eyebrow gold" style={{ marginBottom: "16px" }}>{data?.section_15?.badge}</span>
                <h2 className="h1" style={{ color: "#fff", marginBottom: "14px" }}>{data?.section_15?.title}</h2>
                <p className="lead" style={{ color: "#aebed6", marginBottom: "24px" }}>{data?.section_15?.description}</p>
                <HomeJourneyWidget changingCard={data?.section_15?.changing_card} />
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <a className="btn orange lg" href="/apply">Start my journey →</a>
                  <a className="btn white lg" href="/lead/adviser-call">Talk to adviser</a>
                </div>
              </div>
              <div className="orbit-deco" style={{ position: "relative", width: "600px", height: "600px", maxWidth: "100%", margin: "0 auto", background: "radial-gradient(circle at 50% 50%,rgba(255,255,255,.04),transparent 70%)", borderRadius: "30px", border: "1px solid rgba(255,255,255,.1)", transform: "scale(min(1,calc(100% / 600)))" }}>
                <div style={{ position: "absolute", left: "300.0px", top: "60.0px", transform: "translate(-50%,-50%)", width: "108px", height: "108px", borderRadius: "24px", background: "#2f6fe0", boxShadow: "0 14px 34px rgba(0,0,0,.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <span style={{ fontSize: "10px", fontWeight: 900, opacity: 0.85, textTransform: "uppercase", letterSpacing: ".05em" }}>Step 1</span><b style={{ fontSize: "16px", fontWeight: 900 }}>Life fit</b>
                </div>
                <div style={{ position: "absolute", left: "469.7056274847714px", top: "130.29437251522862px", transform: "translate(-50%,-50%)", width: "108px", height: "108px", borderRadius: "24px", background: "#2ec4b6", boxShadow: "0 14px 34px rgba(0,0,0,.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <span style={{ fontSize: "10px", fontWeight: 900, opacity: 0.85, textTransform: "uppercase", letterSpacing: ".05em" }}>Step 2</span><b style={{ fontSize: "16px", fontWeight: 900 }}>Course</b>
                </div>
                <div style={{ position: "absolute", left: "540.0px", top: "300.0px", transform: "translate(-50%,-50%)", width: "108px", height: "108px", borderRadius: "24px", background: "#ff9f1c", boxShadow: "0 14px 34px rgba(0,0,0,.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <span style={{ fontSize: "10px", fontWeight: 900, opacity: 0.85, textTransform: "uppercase", letterSpacing: ".05em" }}>Step 3</span><b style={{ fontSize: "16px", fontWeight: 900 }}>Finance</b>
                </div>
                <div style={{ position: "absolute", left: "469.7056274847714px", top: "469.7056274847714px", transform: "translate(-50%,-50%)", width: "108px", height: "108px", borderRadius: "24px", background: "#e71d36", boxShadow: "0 14px 34px rgba(0,0,0,.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <span style={{ fontSize: "10px", fontWeight: 900, opacity: 0.85, textTransform: "uppercase", letterSpacing: ".05em" }}>Step 4</span><b style={{ fontSize: "16px", fontWeight: 900 }}>English</b>
                </div>
                <div style={{ position: "absolute", left: "300.0px", top: "540.0px", transform: "translate(-50%,-50%)", width: "108px", height: "108px", borderRadius: "24px", background: "#7209b7", boxShadow: "0 14px 34px rgba(0,0,0,.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <span style={{ fontSize: "10px", fontWeight: 900, opacity: 0.85, textTransform: "uppercase", letterSpacing: ".05em" }}>Step 5</span><b style={{ fontSize: "16px", fontWeight: 900 }}>Adviser</b>
                </div>
                <div style={{ position: "absolute", left: "130.29437251522868px", top: "469.7056274847714px", transform: "translate(-50%,-50%)", width: "108px", height: "108px", borderRadius: "24px", background: "#4361ee", boxShadow: "0 14px 34px rgba(0,0,0,.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <span style={{ fontSize: "10px", fontWeight: 900, opacity: 0.85, textTransform: "uppercase", letterSpacing: ".05em" }}>Step 6</span><b style={{ fontSize: "16px", fontWeight: 900 }}>Application</b>
                </div>
                <div style={{ position: "absolute", left: "60.0px", top: "300.0px", transform: "translate(-50%,-50%)", width: "108px", height: "108px", borderRadius: "24px", background: "#4cc9f0", boxShadow: "0 14px 34px rgba(0,0,0,.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <span style={{ fontSize: "10px", fontWeight: 900, opacity: 0.85, textTransform: "uppercase", letterSpacing: ".05em" }}>Step 7</span><b style={{ fontSize: "16px", fontWeight: 900 }}>University</b>
                </div>
                <div style={{ position: "absolute", left: "130.2943725152286px", top: "130.29437251522868px", transform: "translate(-50%,-50%)", width: "108px", height: "108px", borderRadius: "24px", background: "#f72585", boxShadow: "0 14px 34px rgba(0,0,0,.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <span style={{ fontSize: "10px", fontWeight: 900, opacity: 0.85, textTransform: "uppercase", letterSpacing: ".05em" }}>Step 8</span><b style={{ fontSize: "16px", fontWeight: 900 }}>Success</b>
                </div>
                <div style={{ position: "absolute", left: "300px", top: "300px", transform: "translate(-50%,-50%)", width: "190px", height: "190px", borderRadius: "50%", background: "#fff", boxShadow: "0 10px 40px rgba(0,0,0,.15)", border: "1.5px solid #eef2f6", display: "grid", placeItems: "center", padding: "18px", boxSizing: "border-box" }}>
                  <img src="/assets/ystudy-logo.png" alt="Y Study Logo" style={{ width: "94px", height: "94px", objectFit: "contain", filter: "drop-shadow(0 8px 16px rgba(0,0,0,.08))" }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 16: BREAKER (QUOTE BAND) */}
      {data?.section_16?.status !== false && (
        <section className="sec">
          <div className="wrap">
            <div className="breaker">
              <div className="mark">“</div>
              <blockquote>{data?.section_16?.title || "You're not behind. You're exactly where your next step begins — and we'll walk it with you."}</blockquote>
              <div className="by">{data?.section_16?.description || "— The YStudy promise to every adult learner"}</div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 17: HOW IT WORKS (FOUR STEPS) */}
      {data?.section_17?.status !== false && (
        <section className="sec">
          <div className="wrap">
            <div className="shead">
              <span className="eyebrow b">{data?.section_17?.badge || "How it works"}</span>
              <h2 className="h1" style={{ marginTop: "16px" }}>{data?.section_17?.title || "From unsure to enrolled, in four steps."}</h2>
            </div>
            <div className="steps">
              <div className="step"><div className="n">1</div><h3 className="h3">Find your route</h3><p className="desc">Use the match finder or search to shortlist degrees that fit your life.</p></div>
              <div className="step"><div className="n">2</div><h3 className="h3">Check funding</h3><p className="desc">See your Student Finance support with the free calculator.</p></div>
              <div className="step"><div className="n">3</div><h3 className="h3">Apply with support</h3><p className="desc">A free adviser helps with documents, choices and your application.</p></div>
              <div className="step"><div className="n">4</div><h3 className="h3">Start studying</h3><p className="desc">Begin a flexible degree built around work and family.</p></div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 18: FAQ */}
      {data?.section_17?.status !== false && (
        <section className="sec soft">
          <div className="wrap">
            <div className="shead" style={{ textAlign: "center" }}>
              <span className="eyebrow o">FAQ</span>
              <h2 className="h1" style={{ marginTop: "16px" }}>{data?.section_17?.faq?.[0]?.title || "Quick answers."}</h2>
            </div>
            <div className="faq">
              {faqs && faqs.length > 0 ? (
                faqs.map((q: any, idx: number) => (
                  <div key={q._id || idx} className="q">
                    <h3 className="h3">{q.question}</h3>
                    <p className="desc">{q.answer}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="q"><h3 className="h3">Is YStudy really free?</h3><p className="desc">Yes — guidance, tools and adviser support are always free. We're funded by partner universities, not by you.</p></div>
                  <div className="q"><h3 className="h3">Am I too old to study?</h3><p className="desc">No. Our courses are built for adult learners and career changers — many students are 25, 35, 45+.</p></div>
                  <div className="q"><h3 className="h3">Do I need existing qualifications?</h3><p className="desc">Not always. Foundation years and Access routes exist for people without traditional A-levels.</p></div>
                  <div className="q"><h3 className="h3">Will I get funding?</h3><p className="desc">Most eligible UK residents can access tuition and maintenance loans. Use the eligibility check to see your likely support.</p></div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 19: REFER A FRIEND */}
      {data?.section_18?.status !== false && (
        <section className="sec soft">
          <div className="wrap">
            <div className="g2" style={{ alignItems: "center", gap: "clamp(28px,3.5vw,56px)" }}>
              <div>
                <span className="eyebrow o" style={{ marginBottom: "16px" }}>{data?.section_18?.badge || "Refer a friend"}</span>
                <h2 className="h1" style={{ marginBottom: "14px" }}>{data?.section_18?.title || "Know someone who'd thrive at university?"}</h2>
                <p className="lead" style={{ marginBottom: "24px" }}>{data?.section_18?.description || "Pass on their details, with permission. We'll guide them for free, and we'll thank you when they enrol."}</p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <a className="btn blue lg" href="/partners/refer-a-friend">Read more &amp; refer someone →</a>
                  <a className="btn outline lg" href="/lead/adviser-call">Check adviser details →</a>
                </div>
              </div>
              <div className="refer-grid">
                {data?.section_18?.card ? (
                  data?.section_18.card.map((c: any, idx: number) => {
                    const fallbackImages = [
                      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=700&q=80",
                      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80",
                      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80",
                      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=700&q=80"
                    ];
                    return (
                      <article key={idx} className="refer">
                        <img src={c.fullImageUrl || c.image || fallbackImages[idx % 4]} alt="" />
                        <div className="sc"></div>
                        <div className="in">
                          <span className="tg">{c.badge}</span>
                          <h4>{c.title}</h4>
                          <p>{c.description}</p>
                        </div>
                      </article>
                    );
                  })
                ) : (
                  <>
                    <article className="refer"><img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=700&q=80" alt="" /><div className="sc"></div><div className="in"><span className="tg">Most common</span><h4>Content creators</h4><p>TikTok, Instagram, YouTube — for UK adults thinking about study or career change.</p></div></article>
                    <article className="refer"><img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80" alt="" /><div className="sc"></div><div className="in"><span className="tg">Highest trust</span><h4>Community voices</h4><p>Facebook groups, WhatsApp communities and local networks.</p></div></article>
                    <article className="refer"><img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80" alt="" /><div className="sc"></div><div className="in"><span className="tg">Real stories</span><h4>Peer mentors</h4><p>You went back to university and want to help others.</p></div></article>
                    <article className="refer"><img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=700&q=80" alt="" /><div className="sc"></div><div className="in"><span className="tg">Long-form</span><h4>Bloggers &amp; podcasters</h4><p>Education, careers, mature study or money content.</p></div></article>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 20: ADVISER CALL BANNER */}
      {data?.section_19?.status !== false && (
        <PhotoOverlayBand bgImage="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=85" scrimColor="blue" minHeight="clamp(360px,32vw,460px)">
          <div className="inner">
            <span className="eyebrow gold" style={{ marginBottom: "16px" }}>{data?.section_19?.badge || "Free adviser support"}</span>
            <h2 className="h1" style={{ color: "#fff", marginBottom: "14px" }}>{data?.section_19?.title || "Not sure what to choose?"}</h2>
            <p className="lead" style={{ color: "#fff", opacity: 0.92, marginBottom: "26px", maxWidth: "480px" }}>{data?.section_19?.description || "Book a free call with a real adviser. We'll talk through your goals, funding and the best route — no pressure, no cost."}</p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a className="btn orange lg" href="/lead/adviser-call">Book a free call →</a>
              <a className="btn white lg" href="/lead/contact-adviser">WhatsApp us</a>
            </div>
          </div>
        </PhotoOverlayBand>
      )}

      {/* SECTION 21: FINAL CTA */}
      <FinalCta title={data?.section_20?.title} description={data?.section_20?.description} status={data?.section_20?.status} />
    </SiteLayout>
  );
}
