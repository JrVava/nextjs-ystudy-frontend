"use client";

import Link from "next/link";
import { MOBILE_NAV, MOBILE_QUICK_ACTIONS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

// Mappings for backend slugs to frontend routes
const SLUG_TO_URL_MAP: Record<string, string> = {
  // Top levels
  "degrees": "/degrees",
  "funding": "/funding",
  "tools": "/tools",
  "resources": "/guides",
  "partners": "/partners",

  // Degrees sublinks
  "search-degrees": "/degrees",
  "study-subjects": "/degrees/subjects",
  "study-locations": "/degrees/locations",
  "study-routes": "/degrees/study-routes",
  "foundation-year": "/degrees/qualifications/foundation-year",
  "hnc": "/degrees/qualifications/hnc",
  "hnd": "/degrees/qualifications/hnd",
  "foundation-degree": "/degrees/qualifications/foundation-degree",
  "certificate-of-higher-education": "/degrees/qualifications/certhe",
  "top-up-degree": "/degrees/qualifications/top-up-degree",
  "masters-degree": "/degrees/qualifications/masters",

  // Funding sublinks
  "funding-hub": "/funding",
  "maintenance-loan": "/funding/maintenance-loan",
  "tuition-fee-loan": "/funding/tuition-fee-loan",
  "grants-support": "/funding/grants",
  "student-money-hub": "/money",
  "eligibility": "/tools/eligibility-checker",
  "finance-calculator": "/tools/finance-calculator",
  "previous-study": "/guides/student-finance",
  "childcare-grant": "/funding/childcare-grant",
  "dsa": "/funding/disabled-students-allowance",

  // Tools sublinks
  "degree-match-finder": "/tools/degree-match",
  "career-quiz": "/tools/career-quiz",
  "english-test": "/tools/english-level-checker",
  "eligibility-checker": "/tools/eligibility-checker",
  "funding-checker": "/tools/finance-calculator",
  "salary-checker": "/tools/salary-checker",
  "cv-builder": "/tools/cv-builder",
  "personal-statement": "/tools/personal-statement-calculator",

  // Resources sublinks
  "resources-hub": "/guides",
  "polish-community": "/guides/polish-community",
  "university-routes": "/guides/university-routes",
  "student-finance-guides": "/guides/student-finance",
  "career-change": "/guides/career-change",
  "success-stories": "/success-stories",
  "why-ystudy": "/why-ystudy",
  "how-guidance-works": "/how-guidance-works",
  "news-updates": "/guides/news",
  "faqs": "/faq",

  // Partners sublinks
  "become-a-student-adviser": "/partners/become-an-adviser",
  "creator-programme": "/partners/influencers",
  "affiliate-programme": "/partners/affiliate-partners",
  "refer-a-friend": "/partners/refer-a-friend",
  "advertise-to-students": "/business/advertise",
  "brand-partnerships": "/business/brand-partner",
  "sponsored-content": "/business",
  "business-opportunities": "/business",
};

const getNavigationUrl = (item: any, parentSlug?: string) => {
  if (item.directHref) {
    return item.directHref;
  }
  if (SLUG_TO_URL_MAP[item.slug]) {
    return SLUG_TO_URL_MAP[item.slug];
  }
  if (parentSlug) {
    return `/${parentSlug}/${item.slug}`;
  }
  return `/${item.slug}`;
};

const getUnifiedMobileNav = (navigationProp?: any[]): any[] => {
  if (navigationProp && navigationProp.length > 0) {
    return navigationProp;
  }
  
  // Fallback: Map static MOBILE_NAV to unified structure
  return MOBILE_NAV.map((group, gIdx) => ({
    _id: group.id || `group-${gIdx}`,
    slug: group.id,
    pageName: group.label,
    defaultOpen: group.defaultOpen,
    children: group.links.map((link, lIdx) => ({
      _id: `${link.href}-${lIdx}`,
      slug: link.href.startsWith("/") ? link.href.split("/").pop() || "" : link.href,
      pageName: link.label,
      directHref: link.href,
    })),
  }));
};

type MobileNavProps = {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
  navigation?: any[];
};

export function MobileNav({
  isOpen = false,
  onClose,
  className,
  navigation,
}: MobileNavProps) {
  const navGroups = getUnifiedMobileNav(navigation);

  return (
    <div
      id="mobileNav"
      aria-hidden={!isOpen}
      className={cn("mobile-nav-shell", isOpen && "is-open", className)}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div className="mobile-nav-card mobile-student-first">
        <div className="mobile-nav-header">
          <strong>YStudy Menu</strong>
          <button
            type="button"
            aria-label="Close menu"
            className="mobile-nav-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="mobile-quick-actions">
          {MOBILE_QUICK_ACTIONS.map((action, aIdx) => (
            <Link key={`${action.href}-${aIdx}`} href={action.href} onClick={onClose}>
              {action.label}
            </Link>
          ))}
        </div>

        {navGroups.map((group, gIdx) => {
          const defaultOpen = group.defaultOpen || group.slug === "degrees";
          return (
            <div
              key={group._id || group.slug || `group-${gIdx}`}
              className={cn(
                "mobile-nav-group",
                defaultOpen && "mobile-nav-open"
              )}
            >
              <div className="mobile-nav-title">{group.pageName}</div>
              <div className="mobile-nav-links">
                {group.children && group.children
                  .sort((a: any, b: any) => (a.position || 0) - (b.position || 0))
                  .map((link: any, lIdx: number) => {
                    const linkUrl = getNavigationUrl(link, group.slug);
                    const linkKey = `${link._id || link.slug || 'link'}-${link.pageName || ''}-${lIdx}`;
                    return (
                      <Link key={linkKey} href={linkUrl} onClick={onClose}>
                        {link.pageName}
                      </Link>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
