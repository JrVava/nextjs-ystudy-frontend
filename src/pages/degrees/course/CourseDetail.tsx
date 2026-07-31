"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatSalaryRange } from "@/components/degrees/CourseCard";
import CourseHero from "@/components/degrees/CourseHero";
import "@/app/degrees/course/course.css";
import defaultCourseData from "@/content/fallbacks/course/business-management-ba.json";

function getSectionWithFallback(cmsSec: any, backendSec: any, defaultSec: any) {
  const merged = { ...cmsSec, ...backendSec };

  // If status is explicitly false, keep it disabled
  if (merged.status === false) {
    return { status: false };
  }

  // Check if merged has any actual content keys (ignoring status)
  const contentKeys = Object.keys(merged).filter(
    (k) => k !== "status" && merged[k] !== undefined && merged[k] !== null
  );

  const hasContent = contentKeys.some((k) => {
    const val = merged[k];
    if (Array.isArray(val)) return val.length > 0;
    if (typeof val === "string") return val.trim().length > 0;
    if (typeof val === "object" && val !== null) return Object.keys(val).length > 0;
    return true;
  });

  // If no content, return default section
  if (!hasContent) {
    return defaultSec || {};
  }

  // Merge default section with custom section data
  const result = { ...defaultSec, ...merged };

  // Fallback lists if empty
  if (Array.isArray(result.cards) && result.cards.length === 0 && defaultSec?.cards) {
    result.cards = defaultSec.cards;
  }
  if (Array.isArray(result.tiles) && result.tiles.length === 0 && defaultSec?.tiles) {
    result.tiles = defaultSec.tiles;
  }
  if (Array.isArray(result.rows) && result.rows.length === 0 && defaultSec?.rows) {
    result.rows = defaultSec.rows;
  }
  if (Array.isArray(result.faqs) && result.faqs.length === 0 && defaultSec?.faqs) {
    result.faqs = defaultSec.faqs;
  }

  return result;
}

interface CourseDetailProps {
  slug: string;
  cmsData: any;
  backendCourse: any;
  faqs?: any[];
}

export default function CourseDetail({ slug, cmsData, backendCourse, faqs }: CourseDetailProps) {
  const [isSaved, setIsSaved] = useState(false);

  // Quick Estimate state
  const [calcLocation, setCalcLocation] = useState('london');
  const [calcMode, setCalcMode] = useState('blended');
  const [calcIncome, setCalcIncome] = useState('low');
  const [calcResult, setCalcResult] = useState('£23,925');

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Dynamic values
  const title = backendCourse?.title || cmsData?.title || (slug || "").replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const description = backendCourse?.description || backendCourse?.shortDescription || cmsData?.description || "A practical degree route designed for working adults.";
  const kicker = backendCourse?.courseCms?.kicker || cmsData?.kicker || "Featured Course";
  const image = backendCourse?.fullImageUrl || backendCourse?.image || cmsData?.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80";

  const formattedSalary = formatSalaryRange(backendCourse?.salaryRange || backendCourse?.salary);

  // Fallback defaults mapping
  const snapshot = {
    match: backendCourse?.matchScore ? `${backendCourse.matchScore}% match` : (cmsData?.snapshot?.match || "92% match"),
    salary: formattedSalary || cmsData?.snapshot?.salary || "£24k – £55k+",
    duration: (backendCourse?.durations && (backendCourse.durations[0]?.duration || backendCourse.durations[0]?.label || backendCourse.durations[0]?.name || backendCourse.durations[0]?.title)) || cmsData?.snapshot?.duration || "3 yrs",
    mode: (backendCourse?.modeType && (backendCourse.modeType[0]?.name || backendCourse.modeType[0]?.title)) || cmsData?.snapshot?.mode || "Blended",
    maintenance: cmsData?.snapshot?.maintenance || "£14k+",
    funding: (backendCourse?.fundings && (backendCourse.fundings[0]?.name || backendCourse.fundings[0]?.title)) || cmsData?.snapshot?.funding || "SFE"
  };

  const handleCalculate = () => {
    if (calcMode === 'online') {
      setCalcResult('£9,790');
      return;
    }
    const fee = 9790;
    let maintenance = 0;
    if (calcLocation === 'london') {
      if (calcIncome === 'low') maintenance = 14135;
      else if (calcIncome === 'medium') maintenance = 12000;
      else if (calcIncome === 'high') maintenance = 8000;
      else maintenance = 11000;
    } else if (calcLocation === 'outside') {
      if (calcIncome === 'low') maintenance = 10544;
      else if (calcIncome === 'medium') maintenance = 8500;
      else if (calcIncome === 'high') maintenance = 6000;
      else maintenance = 8000;
    } else { // home
      if (calcIncome === 'low') maintenance = 8900;
      else if (calcIncome === 'medium') maintenance = 7000;
      else if (calcIncome === 'high') maintenance = 5000;
      else maintenance = 6500;
    }
    setCalcResult(`£${(fee + maintenance).toLocaleString()}`);
  };

  let customSec3 = backendCourse?.courseCms?.section_3;
  let customSec4 = backendCourse?.courseCms?.section_4;
  let customSec5 = backendCourse?.courseCms?.section_5;
  let customSec6 = backendCourse?.courseCms?.section_6;
  let customSec7 = backendCourse?.courseCms?.section_7;
  let customSec8 = backendCourse?.courseCms?.section_8;
  let customSec9 = backendCourse?.courseCms?.section_9;
  let customSec10 = backendCourse?.courseCms?.section_10;
  let customSec11 = backendCourse?.courseCms?.section_11;
  let customSec12 = backendCourse?.courseCms?.section_12;
  let customSec13 = backendCourse?.courseCms?.section_13;
  let customSec14 = backendCourse?.courseCms?.section_14;
  let customSec15 = backendCourse?.courseCms?.section_15;

  if (backendCourse?.courseType === "Social" && backendCourse?.courseCms) {
    const socialCms = backendCourse.courseCms;
    customSec3 = {
      badge: socialCms.overview?.badge,
      title: socialCms.overview?.title,
      description: socialCms.overview?.description,
      cards: socialCms.overview?.cards,
      tiles: socialCms.overview?.statsCards?.map((sc: any) => ({
        value: sc.title,
        label: sc.description
      })),
      status: socialCms.overview?.status
    };

    customSec4 = {
      badge: socialCms.salary?.badge,
      title: socialCms.salary?.title,
      description: socialCms.salary?.description,
      cards: socialCms.salary?.cards?.map((c: any) => ({
        ...c,
        role: c.title
      })),
      status: socialCms.salary?.status
    };

    customSec5 = {
      badge: socialCms.funding?.section_1?.badge,
      title: socialCms.funding?.section_1?.title,
      description: socialCms.funding?.section_1?.description,
      totalSupport: socialCms.funding?.section_1?.cardDescription,
      tiles: socialCms.funding?.section_1?.cards?.map((c: any) => ({
        value: c.title,
        label: c.description,
        link: c.link
      })),
      status: socialCms.funding?.section_1?.status
    };

    customSec6 = {
      badge: socialCms.funding?.section_2?.badge,
      title: socialCms.funding?.section_2?.title,
      description: socialCms.funding?.section_2?.description,
      cards: socialCms.funding?.section_2?.cards,
      status: socialCms.funding?.section_2?.status
    };

    customSec7 = {
      badge: socialCms.study?.section_1?.badge,
      title: socialCms.study?.section_1?.title,
      description: socialCms.study?.section_1?.description,
      cards: socialCms.study?.section_1?.cards?.map((c: any) => ({
        year: c.number || c.icon,
        title: c.title,
        subtitle: c.description,
        modules: c.points
      })),
      status: socialCms.study?.section_1?.status
    };

    customSec8 = {
      badge: socialCms.study?.section_2?.badge,
      title: socialCms.study?.section_2?.title,
      description: socialCms.study?.section_2?.description,
      status: socialCms.study?.section_2?.status
    };

    customSec9 = {
      badge: socialCms.reviews?.badge,
      title: socialCms.reviews?.title,
      description: socialCms.reviews?.description,
      status: socialCms.reviews?.status
    };

    customSec10 = {
      badge: socialCms.Entry?.section_1?.badge,
      title: socialCms.Entry?.section_1?.title,
      description: socialCms.Entry?.section_1?.description,
      rows: socialCms.Entry?.section_1?.cards?.map((c: any) => ({
        parentClass: c.parentClass,
        icon: c.icon,
        label: c.title,
        desc: c.description
      })),
      status: socialCms.Entry?.section_1?.status
    };

    customSec11 = {
      badge: socialCms.Entry?.section_2?.badge,
      title: socialCms.Entry?.section_2?.title,
      description: socialCms.Entry?.section_2?.description,
      status: socialCms.Entry?.section_2?.status
    };

    customSec12 = {
      badge: socialCms.Entry?.section_3?.badge,
      title: socialCms.Entry?.section_3?.title,
      description: socialCms.Entry?.section_3?.description,
      cards: socialCms.Entry?.section_3?.cards?.map((c: any) => ({
        icon: c.icons,
        title: c.title,
        desc: c.description,
        btnName: c.btnName,
        link: c.link
      })),
      status: socialCms.Entry?.section_3?.status
    };

    customSec13 = {
      title: socialCms.Entry?.section_4?.title,
      subtitle: socialCms.Entry?.section_4?.description,
      status: socialCms.Entry?.section_4?.status
    };

    customSec14 = {
      badge: socialCms.Entry?.section_5?.badge,
      title: socialCms.Entry?.section_5?.title,
      description: socialCms.Entry?.section_5?.description,
      status: socialCms.Entry?.section_5?.status
    };

    customSec15 = {
      badge: socialCms.FAQ?.section_1?.badge,
      title: socialCms.FAQ?.section_1?.title,
      description: socialCms.FAQ?.section_1?.description,
      faqs: socialCms.FAQ?.section_3?.cards?.map((c: any) => ({
        question: c.title,
        answer: c.description
      })),
      status: socialCms.FAQ?.section_1?.status
    };
  }

  // Section data fallback maps (completely dynamic)
  const sec3 = getSectionWithFallback(cmsData?.section_3, customSec3, defaultCourseData?.section_3);
  const sec4 = getSectionWithFallback(cmsData?.section_4, customSec4, defaultCourseData?.section_4);
  const sec5 = getSectionWithFallback(cmsData?.section_5, customSec5, defaultCourseData?.section_5);
  const sec6 = getSectionWithFallback(cmsData?.section_6, customSec6, defaultCourseData?.section_6);
  const sec7 = getSectionWithFallback(cmsData?.section_7, customSec7, defaultCourseData?.section_7);
  const sec8 = getSectionWithFallback(cmsData?.section_8, customSec8, defaultCourseData?.section_8);
  const sec9 = getSectionWithFallback(cmsData?.section_9, customSec9, defaultCourseData?.section_9);
  const sec10 = getSectionWithFallback(cmsData?.section_10, customSec10, defaultCourseData?.section_10);
  const sec11 = getSectionWithFallback(cmsData?.section_11, customSec11, defaultCourseData?.section_11);
  const sec12 = getSectionWithFallback(cmsData?.section_12, customSec12, defaultCourseData?.section_12);
  const sec13 = getSectionWithFallback(cmsData?.section_13, customSec13, defaultCourseData?.section_13);
  const sec14 = getSectionWithFallback(cmsData?.section_14, customSec14, defaultCourseData?.section_14);
  const sec15 = getSectionWithFallback(cmsData?.section_15, customSec15, defaultCourseData?.section_15);

  const displayFaqs = (faqs && faqs.length > 0) ? faqs : (sec15.faqs || []);

  const entryRows = (backendCourse?.entryRequirement && backendCourse.entryRequirement.length > 0)
    ? backendCourse.entryRequirement.map((req: string) => {
      return { label: req, desc: "" };
    })
    : (sec10.rows || []);

  const bannerStyle = backendCourse?.courseCms?.bannerStyle || "blue";

  return (
    <div className="qualification-page course-detail-page animate-fade-in">
      {/* 1. HERO BANNER WITH DYNAMIC API */}
      <CourseHero
        title={title}
        description={description}
        image={image}
        kicker={kicker}
        bannerStyle={bannerStyle}
        isSaved={isSaved}
        onSaveToggle={() => setIsSaved(!isSaved)}
        snapshot={snapshot}
      />

      {/* 2. STICKY SUBNAV */}
      <div className="subnav">
        <div className="wrap">
          <a href="#overview">Overview</a>
          <a href="#salary">Salary</a>
          <a href="#funding">Funding</a>
          <a href="#study">Study</a>
          <a href="#reviews">Reviews</a>
          <a href="#entry">Entry</a>
          <a href="#faq">FAQ</a>
        </div>
      </div>

      {/* 3. COURSE OVERVIEW */}
      {sec3.status !== false && (
        <section className="sec" id="overview">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow o" style={{ marginBottom: "16px", display: "inline-block" }}>{sec3.badge}</span>
                <h2 className="h1">{sec3.title}</h2>
              </div>
              <p className="lead">{sec3.description}</p>
            </div>
            <div className="g3 ys-carousel-mobile" style={{ alignItems: "start" }}>
              {sec3.cards?.map((card: any, idx: number) => (
                <div className="rolecard" key={idx}>
                  <div style={{ fontSize: "28px", marginBottom: "10px" }}>{card.icon || "🎯"}</div>
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
            <div className="g4 ys-carousel-mobile" style={{ marginTop: "clamp(18px,2vw,28px)" }}>
              {sec3.tiles?.map((tile: any, idx: number) => (
                <div className="snaptile" key={idx}>
                  <b>{tile.value}</b>
                  <span>{tile.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. SALARY & CAREERS */}
      {sec4.status !== false && (
        <section className="sec soft" id="salary">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow o" style={{ marginBottom: "16px", display: "inline-block" }}>{sec4.badge}</span>
                <h2 className="h1">{sec4.title}</h2>
              </div>
              <p className="lead">{sec4.description}</p>
            </div>
            <div className="g4 ys-carousel-mobile">
              {(sec4.cards || [
                {
                  role: "Business Analyst",
                  pay: "£28k–£45k",
                  description: "Analyse data, processes and business decisions.",
                  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
                  link: "/tools/salary-checker"
                },
                {
                  role: "Operations Manager",
                  pay: "£40k–£65k",
                  description: "Lead teams, performance and operational systems.",
                  image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
                  link: "/tools/salary-checker"
                },
                {
                  role: "Project Manager",
                  pay: "£42k–£70k",
                  description: "Plan and deliver business projects.",
                  image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80",
                  link: "/tools/salary-checker"
                },
                {
                  role: "Commercial Manager",
                  pay: "£50k–£90k+",
                  description: "Manage budgets, contracts and commercial growth.",
                  image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?auto=format&fit=crop&w=900&q=80",
                  link: "/tools/salary-checker"
                }
              ])?.map((card: any, idx: number) => (
                <Link className="pcard" href={card.link || "/tools/salary-checker"} key={idx}>
                  <img className="bg" src={card.image} alt={card.role} />
                  <div className="scrim"></div>
                  <div className="pc-inner">
                    <h4>{card.role}</h4>
                    <div className="pay">{card.pay}</div>
                    <p>{card.description}</p>
                    <span className="pc-cta">See this route →</span>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ marginTop: "24px" }}>
              <Link className="btn outline" href="/tools/salary-checker">Explore salaries →</Link>
            </div>
          </div>
        </section>
      )}

      {/* 5. STUDENT FINANCE SUPPORT */}
      {sec5.status !== false && (
        <section className="sec" id="funding">
          <div className="wrap">
            <div className="g2" style={{ alignItems: "start", gap: "clamp(30px, 4vw, 60px)" }}>
              <div>
                <span className="eyebrow o" style={{ marginBottom: "16px", display: "inline-block" }}>{sec5.badge}</span>
                <h2 className="h1" style={{ marginBottom: "14px" }}>{sec5.title}</h2>
                <p className="lead" style={{ marginBottom: "24px" }}>{sec5.description}</p>

                <div className="snapcard" style={{ boxShadow: "var(--shadow)", padding: "24px", border: "1px solid var(--panel-border)", borderRadius: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "14px" }}>
                    <span style={{ fontWeight: 800, color: "var(--muted)" }}>Total possible support</span>
                    <b style={{ color: "var(--b)", fontSize: "30px", fontWeight: 900 }}>{sec5.totalSupport}</b>
                  </div>
                  <div className="snapgrid" style={{ margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "12px" }}>
                    {sec5.tiles?.map((tile: any, idx: number) => (
                      <div className="snaptile" key={idx} style={{ padding: "12px", textAlign: "center" }}>
                        <b style={{ fontSize: "20px", display: "block" }}>{tile.value}</b>
                        <span style={{ fontSize: "12px", color: "var(--muted)" }}>{tile.label}</span>
                      </div>
                    ))}
                    <div className="snaptile" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "12px" }}>
                      <Link className="btn blue sm" href="/tools/finance-calculator">Open full calculator</Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estimate Widget */}
              <div className="widget" style={{ border: "1px solid var(--panel-border)", borderRadius: "24px", padding: "26px", boxShadow: "var(--shadow-lg)", background: "var(--bg-surface)" }}>
                <div style={{ fontWeight: 900, fontSize: "18px", marginBottom: "14px" }}>Quick estimate</div>
                <div className="field" style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>Location</label>
                  <select
                    className="ysf-quick-select"
                    value={calcLocation}
                    onChange={(e) => setCalcLocation(e.target.value)}
                    style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid var(--panel-border)", background: "var(--bg-body)", color: "var(--text-primary)" }}
                  >
                    <option value="london">London</option>
                    <option value="outside">Outside London</option>
                    <option value="home">Living at home</option>
                  </select>
                </div>
                <div className="field" style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>Study mode</label>
                  <select
                    className="ysf-quick-select"
                    value={calcMode}
                    onChange={(e) => setCalcMode(e.target.value)}
                    style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid var(--panel-border)", background: "var(--bg-body)", color: "var(--text-primary)" }}
                  >
                    <option value="blended">Blended / campus</option>
                    <option value="campus">Campus weekly</option>
                    <option value="online">Online / distance</option>
                  </select>
                </div>
                <div className="field" style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>Household income</label>
                  <select
                    className="ysf-quick-select"
                    value={calcIncome}
                    onChange={(e) => setCalcIncome(e.target.value)}
                    style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid var(--panel-border)", background: "var(--bg-body)", color: "var(--text-primary)" }}
                  >
                    <option value="notsure">Not sure</option>
                    <option value="low">Under £25k</option>
                    <option value="medium">£25k–£45k</option>
                    <option value="high">£45k+</option>
                  </select>
                </div>
                <button
                  className="btn orange"
                  onClick={handleCalculate}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", fontWeight: 700, cursor: "pointer", border: "none" }}
                  type="button"
                >
                  Check eligibility →
                </button>
                <div className="result" style={{ marginTop: "16px", padding: "16px", borderRadius: "12px", background: "linear-gradient(135deg, var(--b-deep), var(--b))", color: "#fff" }}>
                  <div className="lbl" style={{ fontSize: "12px", opacity: 0.8 }}>Indicative total support</div>
                  <div className="big" style={{ fontSize: "28px", fontWeight: 900 }}>{calcResult}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. WHY THIS COURSE */}
      {sec6.status !== false && (
        <section className="sec soft">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow b" style={{ marginBottom: "16px", display: "inline-block" }}>{sec6.badge}</span>
                <h2 className="h1">{sec6.title}</h2>
              </div>
              <p className="lead">{sec6.description}</p>
            </div>
            <div className="g3 ys-carousel-mobile">
              {(sec6.cards || [
                {
                  icon: "💼",
                  title: "Career-focused",
                  description: "Build practical business knowledge for management, operations and analyst roles."
                },
                {
                  icon: "⏱",
                  title: "Flexible schedule",
                  description: "Designed for working adults who need a realistic weekly study rhythm."
                },
                {
                  icon: "💷",
                  title: "Student Finance route",
                  description: "Check tuition and maintenance support before applying."
                },
                {
                  icon: "🤝",
                  title: "Adviser support",
                  description: "YStudy can help organise documents, interview prep and next steps."
                },
                {
                  icon: "📈",
                  title: "Transferable skills",
                  description: "Leadership, communication, data, finance and business decision-making."
                },
                {
                  icon: "🎓",
                  title: "Progression routes",
                  description: "Move into postgraduate study, professional routes or management positions."
                }
              ])?.map((card: any, idx: number) => (
                <div className="rolecard" key={idx}>
                  <div style={{ fontSize: "28px", marginBottom: "10px" }}>{card.icon}</div>
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. STUDY STRUCTURE */}
      {sec7.status !== false && (
        <section className="sec" id="study">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow o" style={{ marginBottom: "16px", display: "inline-block" }}>{sec7.badge}</span>
                <h2 className="h1">{sec7.title}</h2>
              </div>
              <p className="lead">{sec7.description}</p>
            </div>
            <div className="g3 ys-carousel-mobile">
              {sec7.cards?.map((card: any, idx: number) => (
                <div className="yearcard" key={idx}>
                  <div className="yn">{card.year}</div>
                  <h4>{card.title}</h4>
                  <p style={{ color: "var(--muted)", fontWeight: 600, fontSize: "14px", marginBottom: "12px" }}>{card.subtitle}</p>
                  <ul>
                    {card.modules?.map((mod: string, mIdx: number) => (
                      <li key={mIdx}>{mod}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. STUDY MODES */}
      {sec8.status !== false && (
        <section className="sec soft">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow gold" style={{ marginBottom: "16px", display: "inline-block" }}>{sec8.badge}</span>
                <h2 className="h1">{sec8.title}</h2>
              </div>
              <p className="lead">{sec8.description}</p>
            </div>
            <div className="g3 ys-carousel-mobile">
              {sec8.cards?.map((card: any, idx: number) => (
                <div className={`modecard ${idx === 0 ? 'best' : idx === 1 ? 'warn' : 'remote'}`} key={idx}>
                  <span className="tag">{card.tag}</span>
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                  <div className="row"><span>Attendance</span><span>{card.attendance}</span></div>
                  <div className="row"><span>Maintenance</span><span>{card.maintenance}</span></div>
                  <div className="row"><span>Networking / Support</span><span>{card.networking || card.travel}</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. STORIES / REVIEWS */}
      {sec9.status !== false && (
        <section className="sec" id="reviews">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow b" style={{ marginBottom: "16px", display: "inline-block" }}>{sec9.badge}</span>
                <h2 className="h1">{sec9.title}</h2>
              </div>
              <p className="lead">{sec9.description}</p>
            </div>
            <div className="g3 ys-carousel-mobile">
              {sec9.cards?.map((card: any, idx: number) => (
                <div className="pstory" key={idx}>
                  <img className="bg" src={card.image} alt={card.name} />
                  <div className="scrim"></div>
                  <span className="pbadge">{card.badge}</span>
                  <div className="ps-inner">
                    <div className="stars">★★★★★</div>
                    <blockquote>"{card.quote}"</blockquote>
                    <div className="who"><b>{card.name}</b><span>{card.status}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. ENTRY */}
      {sec10.status !== false && (
        <section className="sec soft" id="entry">
          <div className="wrap">
            <div className="g2" style={{ alignItems: "start", gap: "clamp(30px, 4vw, 60px)" }}>
              <div>
                <span className="eyebrow o" style={{ marginBottom: "16px", display: "inline-block" }}>{sec10.badge}</span>
                <h2 className="h1" style={{ marginBottom: "14px" }}>{sec10.title}</h2>
                <p className="lead" style={{ marginBottom: "22px" }}>{sec10.description}</p>
                <Link className="btn orange lg" href="/tools/eligibility-checker">Free eligibility check →</Link>
              </div>
              <div>
                {entryRows?.map((row: any, idx: number) => (
                  <div className={`entryrow ${row.label === 'Not sure?' ? 'q' : ''}`} key={idx}>
                    <div className="ic">{row.label === 'Not sure?' ? '?' : '✓'}</div>
                    <div><b>{row.label}</b> &nbsp;{row.desc && <span>{row.desc}</span>}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 11. INTAKES */}
      {sec11.status !== false && (
        <section className="sec">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow gold" style={{ marginBottom: "16px", display: "inline-block" }}>{sec11.badge}</span>
                <h2 className="h1">{sec11.title}</h2>
              </div>
              <p className="lead">{sec11.description}</p>
            </div>
            <div className="g4 ys-carousel-mobile">
              {sec11.cards?.map((card: any, idx: number) => (
                <div className="intake" key={idx}>
                  <div className="mo"><b>{card.month}</b><span>{card.year}</span></div>
                  <h4 style={{ fontWeight: 900, fontSize: "17px", marginBottom: "4px" }}>{card.title}</h4>
                  <p style={{ color: "var(--muted)", fontWeight: 700, fontSize: "14px", marginBottom: "12px" }}>{card.desc}</p>
                  <Link className="btn orange sm" href={card.link || "/apply"}>Apply →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12. TOOLKIT */}
      {sec12.status !== false && (
        <section className="sec soft">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow b" style={{ marginBottom: "16px", display: "inline-block" }}>{sec12.badge}</span>
                <h2 className="h1">{sec12.title}</h2>
              </div>
              <p className="lead">{sec12.description}</p>
            </div>
            <div className="g4 ys-carousel-mobile">
              {sec12.cards?.map((card: any, idx: number) => (
                <div className="rolecard" key={idx}>
                  <div style={{ fontSize: "26px", marginBottom: "10px" }}>{card.icon}</div>
                  <h4>{card.title}</h4>
                  <p style={{ marginBottom: "14px" }}>{card.desc}</p>
                  <Link className="btn blue sm" href={card.link}>Build route →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 13. CONVERSION BAND */}
      {sec13.status !== false && (
        <section className="sec tight">
          <div className="wrap">
            <div className="cband" >
              <div>
                <h3 style={{ fontSize: "22px", fontWeight: 900, margin: 0 }}>{sec13.title}</h3>
                <div className="sub" style={{ color: "var(--muted)", fontWeight: 700, fontSize: "14px", marginTop: "4px" }}>{sec13.subtitle}</div>
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link className="btn orange lg" href="/apply">Apply now</Link>
                <Link className="btn white lg" href="/lead/adviser-call">Book adviser</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 14. RELATED + ALTERNATIVES */}
      {sec14.status !== false && (
        <section className="sec">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow o" style={{ marginBottom: "16px", display: "inline-block" }}>{sec14.badge}</span>
                <h2 className="h1">{sec14.title}</h2>
              </div>
              <p className="lead">{sec14.description}</p>
            </div>
            <div className="g4 ys-carousel-mobile">
              {sec14.cards?.map((card: any, idx: number) => (
                <div className="ptop" key={idx}>
                  <div className="ph" style={{ position: "relative", height: "180px", overflow: "hidden", borderRadius: "16px 16px 0 0" }}>
                    <img src={card.image} alt={card.role} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <span className="badge" style={{ position: "absolute", top: "12px", left: "12px", background: "var(--b)", color: "#fff", padding: "4px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 800 }}>
                      High Match
                    </span>
                  </div>
                  <div className="pb" style={{ padding: "18px", border: "1px solid var(--panel-border)", borderTop: "none", borderRadius: "0 0 16px 16px" }}>
                    <h4 style={{ margin: 0, fontSize: "18px", fontWeight: 900 }}>{card.role}</h4>
                    <p style={{ fontSize: "13px", color: "var(--muted)", margin: "8px 0 14px", minHeight: "38px" }}>{card.description}</p>
                    <div className="mrow" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <b>{card.pay}</b>
                      <Link className="btn outline sm" href={card.link}>View →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 15. FAQ */}
      {sec15.status !== false && (
        <section className="sec soft" id="faq">
          <div className="wrap">
            <div className="shead row">
              <div>
                <span className="eyebrow o" style={{ marginBottom: "16px", display: "inline-block" }}>{sec15.badge}</span>
                <h2 className="h1">{sec15.title}</h2>
              </div>
              <p className="lead">{sec15.description}</p>
            </div>
            <div style={{ maxWidth: "820px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {displayFaqs?.map((faq: any, idx: number) => (
                <div
                  className={`faqq ${activeFaq === idx ? 'open' : ''}`}
                  key={idx}
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--panel-border)",
                    borderRadius: "16px",
                    padding: "20px",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <b style={{ fontSize: "16px", fontWeight: 800 }}>{faq.question}</b>
                    <span style={{ fontSize: "20px", fontWeight: "300" }}>{activeFaq === idx ? "−" : "+"}</span>
                  </div>
                  <div
                    style={{
                      maxHeight: activeFaq === idx ? "200px" : "0",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      marginTop: activeFaq === idx ? "12px" : "0",
                      color: "var(--muted)",
                      fontSize: "14px",
                      lineHeight: "1.5"
                    }}
                  >
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 16. FINAL CTA */}
      <section className="sec ink">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="eyebrow glass" style={{ marginBottom: "18px", display: "inline-block" }}>Ready to apply?</span>
          <h2 className="h1" style={{ color: "#fff", marginBottom: "14px" }}>Get help before submitting anything important.</h2>
          <p className="lead" style={{ color: "#cdd9ec", maxWidth: "560px", margin: "0 auto 26px" }}>
            YStudy can help with course selection, Student Finance, documents and application steps.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link className="btn orange lg" href="/apply">Apply now</Link>
            <Link className="btn white lg" href="/lead/adviser-call">Book adviser call</Link>
          </div>
        </div>
      </section>

      {/* 17. CONVERSION BAND */}
      <section className="ys-conversion-system" aria-label="YStudy next steps">
        <div className="ys-conversion-wrap">
          <Link className="ys-conversion-card blue" href="/tools/eligibility-checker">
            <div>
              <h2>Check if you can get funded.</h2>
              <p>Quickly understand if you may qualify for Student Finance, grants and flexible university routes.</p>
            </div>
            <span>Check eligibility</span>
          </Link>
          <Link className="ys-conversion-card orange" href="/apply">
            <div>
              <h2>Apply with YStudy.</h2>
              <p>Send us your details and we’ll help you choose the right course, prepare documents and move forward.</p>
            </div>
            <span>Start application</span>
          </Link>
          <Link className="ys-conversion-card dark" href="/lead/adviser-call">
            <div>
              <h2>Speak with an adviser.</h2>
              <p>Not sure what to study, what you can get or which documents you need? Book a free call.</p>
            </div>
            <span>Book free call</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
