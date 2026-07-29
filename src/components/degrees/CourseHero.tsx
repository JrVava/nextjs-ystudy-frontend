import React from "react";
import Link from "next/link";

interface CourseHeroProps {
  title: string;
  description: string;
  image: string;
  kicker: string;
  bannerStyle?: "blue" | "black" | "white";
  isSaved: boolean;
  onSaveToggle: () => void;
  snapshot: {
    match: string;
    salary: string;
    duration: string;
    mode: string;
    maintenance: string;
    funding: string;
  };
}

export default function CourseHero({
  title,
  description,
  image,
  kicker,
  bannerStyle = "blue",
  isSaved,
  onSaveToggle,
  snapshot
}: CourseHeroProps) {
  const isWhite = bannerStyle === "white";
  const scrimClass = bannerStyle === "black" ? "black" : "blue";

  if (isWhite) {
    return (
      <section className="chero white">
        <div className="chinner">
          <div className="chcopy">
            <span className="eyebrow o" style={{ marginBottom: "24px" }}>
              {kicker}
            </span>
            <h1 className="display" style={{ color: "var(--ink)", fontSize: "clamp(40px,4.6vw,76px)", marginTop: "1rem" }}>
              {title}
            </h1>
            <p className="lead" style={{ color: "var(--muted)", marginTop: "1rem" }}>
              {description}
            </p>
            <div className="chbtns" style={{ marginTop: "2rem" }}>
              <Link className="btn orange lg large-btn-orange" href="/apply">Apply with YStudy →</Link>
              <Link className="btn outline lg large-btn-orange" href="/lead/adviser-call">Book adviser</Link>
              <button
                className={`chsave ${isSaved ? 'active' : ''}`}
                type="button"
                onClick={onSaveToggle}
                aria-pressed={isSaved}
                aria-label="Save course"
                title="Save"
                style={{
                  background: isSaved ? '#f43f5e' : 'var(--soft)',
                  borderColor: isSaved ? '#f43f5e' : 'var(--line)',
                  color: isSaved ? '#fff' : 'var(--muted)',
                  borderWidth: '1.5px',
                  borderStyle: 'solid',
                  borderRadius: '50%',
                  width: '62px',
                  height: '62px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  marginLeft: '0.75rem',
                  verticalAlign: 'middle',
                  transition: 'all 0.2s ease'
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="chwcard">
            <div className="chph">
              <img src={image} alt="" />
              <span className="match" style={{ height: 'auto', width: 'auto', background: 'none' }}>{snapshot.match}</span>
              <div className="sal2">
                <span>Typical salary range</span>
                <b>{snapshot.salary}</b>
              </div>
            </div>
            <div className="chwbody">
              <h3>Course snapshot</h3>
              <div className="chwtiles">
                <div className="chwtile"><b>{snapshot.duration}</b><span>Duration</span></div>
                <div className="chwtile"><b>{snapshot.mode}</b><span>Study mode</span></div>
                <div className="chwtile"><b>{snapshot.maintenance}</b><span>Maintenance</span></div>
                <div className="chwtile"><b>{snapshot.funding}</b><span>Funding route</span></div>
              </div>
              <div className="chwact">
                <Link className="chwbtn blue" href="/tools/salary-checker">Check salary →</Link>
                <Link className="chwbtn soft" href="/tools/english-level-checker">Free English test →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="chero">
      <img className="chbg" src={image} alt="" />
      <div className={`chscrim ${scrimClass}`}></div>
      <div className="chinner">
        <div className="chcopy">
          <span className="eyebrow glass" style={{ background: "rgba(255,255,255,.18)", color: "#fff", border: "1px solid rgba(255,255,255,.42)", padding: "9px 16px !important" }}>
            {kicker}
          </span>
          <h1 className="display" style={{ color: "#fff", fontSize: "clamp(40px,4.6vw,76px)", marginTop: "1rem" }}>
            {title}
          </h1>
          <p className="lead" style={{ color: "rgba(255,255,255,0.9)", marginTop: "1rem" }}>
            {description}
          </p>
          <div className="chbtns" style={{ marginTop: "2rem" }}>
            <Link className="btn orange lg large-btn-orange" href="/apply">Apply with YStudy →</Link>
            <Link className="btn ghost lg large-btn-orange" href="/lead/adviser-call">Book adviser</Link>
            <button
              className={`chsave ${isSaved ? 'active' : ''}`}
              type="button"
              onClick={onSaveToggle}
              aria-pressed={isSaved}
              aria-label="Save course"
              title="Save"
              style={{
                background: isSaved ? '#f43f5e' : 'rgba(255,255,255,0.2)',
                borderColor: isSaved ? '#f43f5e' : 'rgba(255,255,255,0.4)',
                color: '#fff',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: '50%',
                width: '62px',
                height: '62px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginLeft: '0.75rem',
                verticalAlign: 'middle',
                transition: 'all 0.2s ease'
              }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="chglass">
          <div className="chh">
            <h3>Course snapshot</h3>
            <span className="match" style={{ height: 'auto', width: 'auto', background: 'none' }}>{snapshot.match}</span>
          </div>
          <div className="chsalary" style={{ lineHeight: 'normal' }}>
            <span>Typical salary range</span>
            <b>{snapshot.salary}</b>
          </div>
          <div className="chtiles" style={{ lineHeight: 'normal' }}>
            <div className="chtile"><b>{snapshot.duration}</b><span>Duration</span></div>
            <div className="chtile"><b>{snapshot.mode}</b><span>Study mode</span></div>
            <div className="chtile"><b>{snapshot.maintenance}</b><span>Maintenance</span></div>
            <div className="chtile"><b>{snapshot.funding}</b><span>Funding route</span></div>
          </div>
          <div className="chactions">
            <Link className="chbtn line" href="/tools/salary-checker">Check salary →</Link>
            <Link className="chbtn solid" href="/tools/english-level-checker">Free English test →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
