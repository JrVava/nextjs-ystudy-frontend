import { getBannerBySlug } from "@/services/banner.service";
import "@/app/degrees/degrees.css";

import { getMediaUrl } from "@/lib/utils";
import React from "react";

interface BannerProps {
  slug: string;
  children?: React.ReactNode;
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackBadgeText?: string;
  fallbackBgImage?: string;
  fallbackRightCard?: {
    layoutType: 'stacked-cards' | 'stats-highlight' | 'grid-2x2' | 'list-items' | 'none';
    title?: string;
    description?: string;
    mainValue?: string;
    items?: Array<{
      title?: string;
      subtitle?: string;
      description?: string;
      value?: string;
      icon?: string;
    }>;
  };
}

export async function Banner({
  slug,
  children,
  fallbackTitle,
  fallbackDescription,
  fallbackBadgeText,
  fallbackBgImage,
  fallbackRightCard
}: BannerProps) {
  const banner = await getBannerBySlug(slug);

  if (!banner || !banner.isActive) {
    const isHome = slug === "home";
    const title = fallbackTitle || (isHome ? "Find a degree that builds your bright future." : `${slug.charAt(0).toUpperCase() + slug.slice(1)} — Guidance & Support`);
    const description = fallbackDescription || (isHome
      ? "Compare courses, Student Finance and flexible study routes before you apply — built for mature students and career changers."
      : "Access professional guidance and find flexible pathways matching your personal work and life schedules.");
    const eyebrow = fallbackBadgeText || (isHome ? "Free guidance for working adults" : "YStudy Portal");
    const bgImage = fallbackBgImage || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=85";

    const hasLeft = !!(title || description || eyebrow || children);
    const hasRight = isHome || !!(fallbackRightCard && fallbackRightCard.layoutType && fallbackRightCard.layoutType !== 'none');

    return (
      <section className={`hhero${(!hasLeft && !hasRight) ? ' only-bg' : ''}${hasLeft && !hasRight ? ' only-left' : ''}`}>
        <img className="hbg" src={bgImage} alt="" />
        <div className="hscrim" ></div>
        <div className="hinner">
          {hasLeft && (
            <div className="hcopy">
              {eyebrow && <span className={`${isHome ? 'eyebrow glass' : 'dsx-eyebrow'}`} style={{ marginBottom: "24px" }}>{eyebrow}</span>}
              {title && <h1>{title}</h1>}
              {description && <p className="lead">{description}</p>}
              {isHome && children}
            </div>
          )}

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
            fallbackRightCard && fallbackRightCard.layoutType && fallbackRightCard.layoutType !== 'none' && (
              <div className={`${fallbackRightCard.layoutType === 'list-items' ? 'tlh' : 'hcards-container'}`}>
                {fallbackRightCard.layoutType === 'list-items' && fallbackRightCard.items ? (
                  <div className="loc-glass tlpanel">
                    <div className="tph">{fallbackRightCard.title || 'Sample result'}</div>
                    {fallbackRightCard.mainValue && <div className="big">{fallbackRightCard.mainValue}</div>}
                    <div className="sub">{fallbackRightCard.description || 'BA Business Management · SFE eligible'}</div>
                    <div className="tlgrid loc-mini-list">
                      {fallbackRightCard.items.map((item, idx) => (
                        <div className="c loc-mini" key={idx}>
                          <b>{item.value || item.title || '0%'}</b>
                          <span>{item.description || item.subtitle || item.title || ''}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="banner-card">
                    {fallbackRightCard.title && (
                      <h3 className="card-title">{fallbackRightCard.title}</h3>
                    )}
                    {fallbackRightCard.description && (
                      <p className="card-description">{fallbackRightCard.description}</p>
                    )}

                    {fallbackRightCard.layoutType === 'stacked-cards' && fallbackRightCard.items && (
                      <div className="layout-stacked-cards">
                        {fallbackRightCard.items.map((item, idx) => (
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

                    {fallbackRightCard.layoutType === 'grid-2x2' && fallbackRightCard.items && (
                      <div className="layout-grid-2x2">
                        {fallbackRightCard.items.map((item, idx) => (
                          <div key={idx} className="grid-item">
                            <div className="grid-item-title">{item.title}</div>
                            <div className="grid-item-value">{item.value || item.subtitle || '—'}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {fallbackRightCard.layoutType === 'stats-highlight' && (
                      <div className="layout-stats-highlight">
                        <div className="stats-label">{fallbackRightCard.mainValue ? "Highlights" : ""}</div>
                        <div className="stats-value">{fallbackRightCard.mainValue || '~£0'}</div>
                        {fallbackRightCard.items && (
                          <div className="stats-subgrid">
                            {fallbackRightCard.items.map((item, idx) => (
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
                )}
              </div>
            )
          )}

          {!isHome && children && (
            <div className="hfull-width">
              {children}
            </div>
          )}
        </div>
      </section>
    );
  }

  const { leftContent, rightCard, background } = banner;
  const bgUrl = getMediaUrl(background?.imageUrl, banner.fullImageUrl);
  const isHome = slug === "home";

  const hasLeft = !!(leftContent?.title || leftContent?.description || leftContent?.badgeText || children);
  const hasRight = slug === "home" || !!(rightCard && rightCard.layoutType && rightCard.layoutType !== 'none');

  return (
    <section className={`loc-hero hhero${(!hasLeft && !hasRight) ? ' only-bg' : ''}${hasLeft && !hasRight ? ' only-left' : ''}`}>
      {bgUrl && (
        <img className="hbg" src={bgUrl} alt="" />
      )}
      <div
        className="hscrim"
        style={{
          background: background?.bgColor || undefined
        }}
      ></div>
      <div className="hinner">
        {/* Left Column (Main Copy & Page Specific controls/widgets) */}
        {hasLeft && (
          <div className="hcopy">
            {leftContent.badgeText && (
              <span className={`${isHome ? 'eyebrow glass' : 'dsx-eyebrow'}`} style={{ marginBottom: "24px" }}>
                {leftContent.badgeText}
              </span>
            )}
            {leftContent.title && <h1>{leftContent.title}</h1>}
            {leftContent.description && (
              <p className="lead">{leftContent.description}</p>
            )}
            {isHome && children}
          </div>
        )}

        <div>
          {/* Right Column (Adaptive Side Card) */}
          {slug === "home" ? (
            <div className="hcards">
              <a className="hcard light" href="/tools/english-level-checker">
                <span className="hk">{rightCard?.items?.[0]?.subtitle || "English check"}</span>
                <b>{rightCard?.items?.[0]?.title || "Take the English test"}</b>
                <p>{rightCard?.items?.[0]?.description || "2-min level check — see if you meet course requirements."}</p>
                <span className="go">{rightCard?.items?.[0]?.value || "Start test →"}</span>
              </a>
              <div className="hcard dark">
                <span className="hk">{rightCard?.items?.[1]?.subtitle || "Free adviser support"}</span>
                <b>{rightCard?.items?.[1]?.title || "Not sure what to choose?"}</b>
                <p>{rightCard?.items?.[1]?.description || "Book a free adviser call before applying."}</p>
                <div style={{ display: "flex", gap: "8px" }}>
                  <a className="btn orange sm" href="/lead/adviser-call">Book call</a>
                  <a className="btn white sm" href="/lead/contact-adviser">WhatsApp</a>
                </div>
              </div>
            </div>
          ) : (
            rightCard && rightCard.layoutType && rightCard.layoutType !== 'none' && (
              <div className={`${rightCard.layoutType === 'list-items' ? 'tlh' : 'hcards-container'}`}>
                {rightCard.layoutType === 'list-items' && rightCard.items ? (
                  <div className="loc-glass tlpanel">
                    <div className="tph">{rightCard.title || 'Sample result'}</div>
                    {rightCard.mainValue && <div className="big">{rightCard.mainValue}</div>}
                    <div className="sub">{rightCard.description || 'BA Business Management · SFE eligible'}</div>
                    <div className="tlgrid loc-mini-list">
                      {rightCard.items.map((item, idx) => (
                        <div className="c loc-mini" key={idx}>
                          <b>{item.value || item.title || '0%'}</b>
                          <span>{item.description || item.subtitle || item.title || ''}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
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
                )}
              </div>
            )
          )}
        </div>

        {!isHome && children && (
          <div className="hfull-width">
            {children}
          </div>
        )}
      </div>
    </section >
  );
}

export default Banner;
