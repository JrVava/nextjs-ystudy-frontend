import type { PropsWithChildren } from "react";
import React from "react";
import Link from "next/link";

/** Hero banner structure for degrees and subject pages. */
export function HeroFullBleed({
  badge,
  title,
  description,
  children
}: PropsWithChildren<{
  badge?: string;
  title?: string;
  description?: string;
}>) {
  return (
    <section className="section search-degree-focus">
      <div className="container">
        <div className="degree-search-hero">
          <span className="kicker">{badge || "Find degrees"}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          {children}
        </div>
      </div>
    </section>
  );
}

/** Container for sections with photo backgrounds and scrims. */
export function PhotoOverlayBand({
  bgImage,
  scrimColor = "blue",
  minHeight,
  children
}: PropsWithChildren<{
  bgImage: string;
  scrimColor?: "blue" | "orange";
  minHeight?: string;
}>) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="povl bleed" style={minHeight ? { minHeight } : undefined}>
          <img className="bg" src={bgImage} alt="" />
          <div className={`sc sc-${scrimColor}`}></div>
          {children}
        </div>
      </div>
    </section>
  );
}

/** Trust strip showcasing badges/features. */
export function TrustBar({ dotPoints, status }: { dotPoints?: string[]; status?: boolean }) {
  if (status === false) return null;
  return (
    <section className="sec tight">
      <div className="wrap">
        <div className="trust">
          {dotPoints ? (
            dotPoints.map((pt: string, idx: number) => (
              <React.Fragment key={idx}>
                <span className="d"></span>
                <span>{pt}</span>
              </React.Fragment>
            ))
          ) : (
            <>
              <span className="d"></span><span>✓ SFE eligible courses</span>
              <span className="d"></span><span>✓ Free adviser guidance</span>
              <span className="d"></span><span>✓ Flexible &amp; blended study</span>
              <span className="d"></span><span>✓ UCAS-style search</span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/** Final page CTA band with background gradients. */
export function FinalCta({ title, description, status }: { title?: string; description?: string; status?: boolean }) {
  if (status === false) return null;
  return (
    <section className="sec">
      <div className="wrap">
        <div className="finalcta">
          <h2 className="display" style={{ color: "#fff" }}>{title || "Your future starts with one step."}</h2>
          <p className="lead">{description || "Find your degree, check your funding and apply with free guidance — built around the life you already have."}</p>
          <div className="row">
            <Link className="btn black lg" href="/apply">Start your application →</Link>
            <Link className="btn white lg" href="/lead/adviser-call">Book adviser call</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Reusable header for sections. */
export function SectionHeader({
  badge,
  title,
  description,
  align = "left"
}: {
  badge?: string;
  title?: string;
  description?: string;
  align?: "left" | "center" | "row";
}) {
  if (align === "row") {
    return (
      <div className="shead row">
        <div>
          <span className="eyebrow o">{badge}</span>
          <h2 className="h1" style={{ marginTop: "16px" }}>{title}</h2>
        </div>
        {description && <p className="lead">{description}</p>}
      </div>
    );
  }
  return (
    <div className="title-row">
      <div style={{ textAlign: align }}>
        <span className="kicker">{badge}</span>
        <h2>{title}</h2>
      </div>
      {description && <p style={{ textAlign: align }}>{description}</p>}
    </div>
  );
}

/** Conversion system strip (Eligibility check, Apply, adviser callback). */
export function ConversionStrip({ cards, status }: { cards?: { title?: string; description?: string }[]; status?: boolean }) {
  if (status === false) return null;
  const defaultCards = [
    {
      title: "Check if you can get funded.",
      description: "Quickly understand if you may qualify for Student Finance, grants and flexible university routes.",
      link: "/tools/eligibility-checker",
      btnText: "Check eligibility",
      className: "blue",
    },
    {
      title: "Apply with YStudy.",
      description: "Send us your details and we’ll help you choose the right course, prepare documents and move forward.",
      link: "/apply",
      btnText: "Start application",
      className: "orange",
    },
    {
      title: "Speak with an adviser.",
      description: "Not sure what to study, what you can get or which documents you need? Book a free call.",
      link: "/lead/adviser-call",
      btnText: "Book free call",
      className: "dark",
    },
  ];

  return (
    <section className="ys-conversion-system" aria-label="YStudy next steps">
      <div className="ys-conversion-wrap">
        {defaultCards.map((c, idx) => {
          const cmsCard = cards?.[idx];
          return (
            <Link key={idx} className={`ys-conversion-card ${c.className}`} href={c.link}>
              <div>
                <h2>{cmsCard?.title || c.title}</h2>
                <p>{cmsCard?.description || c.description}</p>
              </div>
              <span>{c.btnText}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/** Grid of crosslinks for SEO and navigation. */
export function CrossLinks({ title, description, cards, status }: { title?: string; description?: string; cards?: { title?: string; link?: string }[]; status?: boolean }) {
  if (status === false) return null;
  const defaultCards = [
    { title: "Find degrees", link: "/degrees/" },
    { title: "Funding hub", link: "/funding/" },
    { title: "Careers & salaries", link: "/careers/" },
    { title: "Degree Match", link: "/tools/degree-match" },
    { title: "Salary Checker", link: "/tools/salary-checker" },
    { title: "Student guides", link: "/guides/" }
  ];

  const displayCards = cards || defaultCards;

  return (
    <section className="ys-crosslinks" aria-label="Useful links">
      <div className="inner">
        <div>
          <h2>{title || "Useful next steps"}</h2>
          <p>{description || "Move from information to action. Compare degrees, check funding, explore careers and apply with support."}</p>
        </div>
        <div className="ys-link-grid">
          {displayCards.map((item: any, idx: number) => {
            const href = item.link || (
              item.title === "Find degrees" ? "/degrees/" :
                item.title === "Funding hub" ? "/funding/" :
                  item.title === "Careers & salaries" ? "/careers/" :
                    item.title === "Degree Match" ? "/tools/degree-match" :
                      item.title === "Salary Checker" ? "/tools/salary-checker" :
                        item.title === "Student guides" ? "/guides/" : "/degrees/"
            );
            return (
              <Link key={idx} href={href}>
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Warning/Funding details. Placeholder matched. */
export function FundingWidget() {
  return null;
}

/** Generic comparison table component. */
export function ComparisonTable({
  className = "comp-table",
  headers,
  rows,
  renderCell,
  variant = "table",
}: {
  className?: string;
  headers: string[];
  rows: any[];
  renderCell?: (val: any, colKey: string) => React.ReactNode;
  variant?: "table" | "grid";
}) {
  if (variant === "grid") {
    return (
      <div className={className}>
        <div className="r h">
          {headers.map((h, idx) => (
            <div key={idx}>{h}</div>
          ))}
        </div>
        {rows.map((row, rIdx) => (
          <div key={rIdx} className="r">
            {Object.keys(row).map((key, cIdx) => (
              <div key={cIdx}>
                {renderCell ? renderCell(row[key], key) : String(row[key])}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      <table>
        <thead>
          <tr>
            {headers.map((h, idx) => (
              <th key={idx}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rIdx) => (
            <tr key={rIdx}>
              {Object.keys(row).map((key, cIdx) => (
                <td key={cIdx}>
                  {renderCell ? renderCell(row[key], key) : String(row[key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Page footer CTA ribbon. */
export function FooterCta({ title, description, badge, status }: { title?: string; description?: string; badge?: string; status?: boolean }) {
  if (status === false) return null;
  return (
    <div className="footer-cta" style={{ textAlign: "left" }}>
      <div>
        <span className="kicker">{badge || "Stay in touch"}</span>
        <h2>{title || "Your next step should feel organised."}</h2>
        <p>{description || "Create a free account to save progress, find your best degree and track applications."}</p>
      </div>
      <div className="btnrow">
        <Link className="btn btn-white" href="/dashboard/">
          Create account
        </Link>
        <Link className="btn btn-orange" href="/apply/">
          Apply now
        </Link>
      </div>
    </div>
  );
}

/** Side-by-side promotional band layout. */
export function PromoBand({
  badge,
  title,
  description,
  fullImageUrl,
  btnText = "Build my preparation list",
  btnLink = "/tools/degree-match",
  color = "orange",
  reverse = true,
  status
}: {
  badge?: string;
  title?: string;
  description?: string;
  fullImageUrl?: string;
  btnText?: string;
  btnLink?: string;
  color?: "orange" | "blue" | "dark";
  reverse?: boolean;
  status?: boolean;
}) {
  if (status === false) return null;
  return (
    <section className="section tight">
      <section className={`promo-band ${color}${reverse ? " reverse" : ""}`}>
        <div className="promo-inner">
          <div className="promo-figure">
            <img
              alt={title || "Promo"}
              src={fullImageUrl || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1500&q=85"}
            />
          </div>
          <div className="promo-copy">
            <span className="promo-kicker">{badge || "Starting university"}</span>
            <h2 className="promo-title">{title || "What to prepare before your course starts"}</h2>
            <p className="promo-text">
              {description || "Not sure what you'll need for student life? Use a simple checklist to plan the essentials, avoid last-minute stress and feel ready before your first week."}
            </p>
            <Link className="btn promo-cta" href={btnLink}>
              {btnText}
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}

/** Student reviews, community voices and support callbacks cards grid. */
export function TrustTestimonials({
  badge,
  title,
  description,
  status
}: {
  badge?: string;
  title?: string;
  description?: string;
  status?: boolean;
}) {
  if (status === false) return null;
  return (
    <section className="section blue ds-added-trust">
      <div className="container">
        <div className="title-row">
          <div style={{ textAlign: "left" }}>
            <span className="kicker">{badge || "Student and community"}</span>
            <h2>{title || "Trust and SEO card families."}</h2>
          </div>
          <p style={{ textAlign: "left" }}>
            {description || "Use these for community guides, student stories, adviser trust and testimonials."}
          </p>
        </div>
        <div className="story-grid story-carousel">
          <article className="story-card">
            <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=85" alt="Maria" />
            <div className="body" style={{ textAlign: "left" }}>
              <h3>Maria, 38</h3>
              <p>“I needed to know if university could fit around my children and full-time work.”</p>
              <div className="stars">★★★★★</div>
              <div className="pills">
                <span className="pill">Mature student</span>
                <span className="pill">Health &amp; Social Care</span>
              </div>
            </div>
          </article>
          <article className="story-card">
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85" alt="Andrei" />
            <div className="body" style={{ textAlign: "left" }}>
              <h3>Andrei, 34</h3>
              <p>“The adviser helped me shortlist the right business route and check finance before applying.”</p>
              <div className="stars">★★★★★</div>
              <div className="pills">
                <span className="pill">Career changer</span>
                <span className="pill">Business</span>
              </div>
            </div>
          </article>
          <article className="story-card">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=85" alt="Samira" />
            <div className="body" style={{ textAlign: "left" }}>
              <h3>Samira, 29</h3>
              <p>“The career comparison showed exactly what roles I could target.”</p>
              <div className="stars">★★★★★</div>
              <div className="pills">
                <span className="pill">Computing</span>
                <span className="pill">Now studying</span>
              </div>
            </div>
          </article>
        </div>
        <div className="adviser-grid" style={{ marginTop: "22px" }}>
          <article className="adviser-card">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85" alt="Student Adviser" />
            <div style={{ textAlign: "left" }}>
              <h3>Student Adviser</h3>
              <p>Course and funding guidance.</p>
              <Link href="/lead/adviser-call">Book callback →</Link>
            </div>
          </article>
          <article className="adviser-card">
            <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=85" alt="Application Support" />
            <div style={{ textAlign: "left" }}>
              <h3>Application Support</h3>
              <p>Documents, interview and next steps.</p>
              <Link href="/lead/adviser-call">Ask a question →</Link>
            </div>
          </article>
          <article className="adviser-card">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=85" alt="Finance Guidance" />
            <div style={{ textAlign: "left" }}>
              <h3>Finance Guidance</h3>
              <p>SFE steps explained clearly.</p>
              <Link href="/tools/eligibility-checker">Check funding →</Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/** Finance hubs strip link tools. */
export function FinanceHubStrip({
  badge,
  title,
  description,
  status
}: {
  badge?: string;
  title?: string;
  description?: string;
  status?: boolean;
}) {
  if (status === false) return null;
  return (
    <section className="section tight ds-finance-integrated">
      <div className="container">
        <div className="finance-hub-strip" style={{ textAlign: "left" }}>
          <div>
            <span className="kicker">{badge || "Student Finance"}</span>
            <h2>{title || "Check funding before you choose a course."}</h2>
            <p>{description || "Check Maintenance Loan, Tuition Fee Loan, grants, study mode risk and repayment basics before applying."}</p>
          </div>
          <div className="finance-strip-actions">
            <Link className="btn btn-orange" href="/tools/student-finance-calculator">
              Open calculator
            </Link>
            <Link className="btn btn-white" href="/tools/eligibility-checker">
              Check eligibility
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Warning banner for study mode maintenance support. */
export function FinanceWarningBanner({
  badge,
  title,
  description,
  status
}: {
  badge?: string;
  title?: string;
  description?: string;
  status?: boolean;
}) {
  if (status === false) return null;
  return (
    <section className="section tight ds-finance-integrated">
      <div className="container">
        <div className="finance-warning-banner" style={{ textAlign: "left" }}>
          <div>
            <span className="kicker">{badge || "Important funding rule"}</span>
            <h2>{title || "Study mode can affect Maintenance Loan."}</h2>
            <p>
              {description || "Online, distance-learning and weekend-only routes may not qualify for Maintenance Loan. Ask an adviser before choosing the course."}
            </p>
          </div>
          <Link className="btn btn-orange" href="/tools/eligibility-checker">
            Check study mode risk
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Free adviser floating popup. */
export function FloatingAdviser() {
  return (
    <div className="floating-adviser" style={{ textAlign: "left" }}>
      <span className="pill" style={{ background: "rgba(255,255,255,.12)", color: "#fff", borderColor: "rgba(255,255,255,.18)" }}>
        Free adviser support
      </span>
      <h3>Not sure what to choose?</h3>
      <p>Book a free adviser call before applying.</p>
      <div className="btnrow">
        <Link className="btn btn-orange" href="/lead/adviser-call">
          Book call
        </Link>
        <Link className="btn btn-white" href="/lead/adviser-call">
          WhatsApp
        </Link>
      </div>
    </div>
  );
}
