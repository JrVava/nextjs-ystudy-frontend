import { getBannerBySlug } from "@/services/banner.service";
import React from "react";

interface BannerProps {
  slug: string;
  children?: React.ReactNode;
}

export async function Banner({ slug, children }: BannerProps) {
  const banner = await getBannerBySlug(slug);
  console.log('banner ===>', banner);

  if (!banner || !banner.isActive) {
    const isHome = slug === "home";
    const title = isHome ? "Find a degree that builds your bright future." : `${slug.charAt(0).toUpperCase() + slug.slice(1)} — Guidance & Support`;
    const description = isHome
      ? "Compare courses, Student Finance and flexible study routes before you apply — built for mature students and career changers."
      : "Access professional guidance and find flexible pathways matching your personal work and life schedules.";
    const eyebrow = isHome ? "Free guidance for working adults" : "YStudy Portal";
    const bgImage = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=85";

    return (
      <section className="hhero">
        <img className="hbg" src={bgImage} alt="" />
        <div className="hscrim"></div>
        <div className="hinner">
          <div className="hcopy">
            <span className="eyebrow glass" style={{ marginBottom: "24px" }}>{eyebrow}</span>
            <h1>{title}</h1>
            <p className="lead">{description}</p>
            {children}
          </div>
          {isHome ? (
            <div className="hcards">
              <a className="hcard light" href="/tools/english-level-checker">
                <span className="hk">English check</span>
                <b>Take the English test</b>
                <p>2-min level check — see if you meet course requirements.</p>
                <span className="go">Start test →</span>
              </a>
              <div className="hcard dark">
                <span className="hk">Free adviser support</span>
                <b>Not sure what to choose?</b>
                <p>Book a free adviser call before applying.</p>
                <div style={{ display: "flex", gap: "8px" }}>
                  <a className="btn orange sm" href="/lead/adviser-call">Book call</a>
                  <a className="btn white sm" href="/lead/contact-adviser">WhatsApp</a>
                </div>
              </div>
            </div>
          ) : (
            <div className="hcards">
              <div className="hcard light">
                <span className="hk">Generic Fallback</span>
                <b>YStudy Support</b>
                <p>Use our tools or talk to an advisor to configure this page banner.</p>
                <a className="btn black sm" href="/lead/adviser-call" style={{ textDecoration: 'none', color: '#fff', display: 'inline-block', width: '100%', textAlign: 'center' }}>Book advisor call</a>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  const { leftContent, rightCard, fullImageUrl } = banner;

  return (
    <section className="hhero">
      {fullImageUrl && (
        <img className="hbg" src={fullImageUrl} alt="" />
      )}
      <div className="hscrim"></div>
      <div className="hinner">
        {/* Left Column (Main Copy & Page Specific controls/widgets) */}
        <div className="hcopy">
          {leftContent.badgeText && (
            <span className="eyebrow glass" style={{ marginBottom: "24px" }}>
              {leftContent.badgeText}
            </span>
          )}
          <h1>{leftContent.title}</h1>
          {leftContent.description && (
            <p className="lead">{leftContent.description}</p>
          )}

          {/* Children holds home page search bar, sub-buttons, or stats */}
          {children}
        </div>

        {/* Right Column (Adaptive Side Card) */}
        {rightCard && (
          <div className="hcards-container">
            <div className="banner-card">
              {rightCard.title && (
                <h3 className="card-title">{rightCard.title}</h3>
              )}
              {rightCard.description && (
                <p className="card-description">{rightCard.description}</p>
              )}

              {rightCard.layoutType === 'stacked-cards' && rightCard.items && (
                <div className="layout-stacked-cards">
                  {rightCard.items.map((item, idx) => (
                    <div key={idx} className="stacked-card-item">
                      {item.subtitle && (
                        <div className="item-subtitle">{item.subtitle}</div>
                      )}
                      <div className="item-title">{item.title}</div>
                      {item.description && (
                        <div className="item-desc">{item.description}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {rightCard.layoutType === 'grid-2x2' && rightCard.items && (
                <div className="layout-grid-2x2">
                  {rightCard.items.map((item, idx) => (
                    <div key={idx} className="grid-item">
                      <div className="grid-item-title">{item.title}</div>
                      <div className="grid-item-value">{item.value || item.subtitle || '—'}</div>
                    </div>
                  ))}
                </div>
              )}

              {rightCard.layoutType === 'list-items' && rightCard.items && (
                <div className="layout-list-items">
                  {rightCard.items.map((item, idx) => (
                    <div key={idx} className="list-item-row">
                      <div className="list-item-left">
                        <div className="list-item-title">{item.title}</div>
                        {item.subtitle && <div className="list-item-subtitle">{item.subtitle}</div>}
                      </div>
                      <div className="list-item-value">{item.value || ''}</div>
                    </div>
                  ))}
                </div>
              )}

              {rightCard.layoutType === 'stats-highlight' && (
                <div className="layout-stats-highlight">
                  <div className="stats-label">{rightCard.mainValue ? "Highlights" : ""}</div>
                  <div className="stats-value">{rightCard.mainValue || '~£0'}</div>
                  {rightCard.items && (
                    <div className="stats-subgrid">
                      {rightCard.items.map((item, idx) => (
                        <div key={idx} className="stats-subitem">
                          <div className="stats-subitem-val">{item.value || item.title || '£0'}</div>
                          <div className="stats-subitem-lbl">{item.subtitle || item.description || 'Stat'}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Banner;
