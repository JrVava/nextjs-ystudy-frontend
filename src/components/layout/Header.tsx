import Link from "next/link";
import { MAIN_NAV } from "@/lib/navigation";

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

const getUnifiedNav = (navigationProp?: any[]): any[] => {
  if (navigationProp && navigationProp.length > 0) {
    return navigationProp;
  }
  
  // Fallback: Map static MAIN_NAV to unified structure
  return MAIN_NAV.map((section) => ({
    _id: section.id,
    slug: section.id,
    pageName: section.label,
    children: section.links.map((link) => ({
      _id: link.href,
      slug: link.href.startsWith("/") ? link.href.split("/").pop() || "" : link.href,
      pageName: link.label,
      directHref: link.href,
    })),
  }));
};

interface HeaderProps {
  navigation?: any[];
}

export default function Header({ navigation }: HeaderProps) {
  const navItems = getUnifiedNav(navigation);

  return (
    <header className="header">
      <div className="container nav">
        <Link className="logo" href="/">
          <img className="logo-img" src="/assets/ystudy-logo.png" alt="YStudy" />
          YStudy
        </Link>
        
        <nav aria-label="Main navigation" className="main-nav">
          {navItems.map((section: any) => {
            const sectionUrl = getNavigationUrl(section);
            return (
              <div key={section._id || section.slug} className="main-nav-item simple-nav-item">
                <Link className="main-nav-link" href={sectionUrl}>
                  {section.pageName} <span className="nav-caret">⌄</span>
                </Link>
                {section.children && section.children.length > 0 && (
                  <div className="ds-mega simple-hover-card">
                    <div className="simple-menu-grid">
                      {section.children
                        .sort((a: any, b: any) => (a.position || 0) - (b.position || 0))
                        .map((link: any) => {
                          const linkUrl = getNavigationUrl(link, section.slug);
                          return (
                            <Link key={link._id || link.slug} className="simple-menu-link" href={linkUrl}>
                              {link.pageName}
                            </Link>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="actions nav-actions-v626">
          <button
            aria-label="Search YStudy"
            className="nav-icon-btn nav-search-big ystudy-search-open ic-chip"
            type="button"
            data-search-trigger
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.5-4.5" />
            </svg>
          </button>
          <Link className="signin-icon" href="/dashboard" aria-label="Sign in">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4.5 20c0-4 3.4-6.2 7.5-6.2s7.5 2.2 7.5 6.2" />
            </svg>
          </Link>
          <Link className="btn btn-blue" href="/tools/eligibility-checker">Eligibility</Link>
          <Link className="btn btn-orange" href="/apply">Apply</Link>
        </div>

        <div aria-label="Mobile quick actions" className="mobile-head-actions">
          <button
            aria-label="Search YStudy"
            className="mobile-head-icon mobile-search-icon ystudy-search-open"
            type="button"
            data-search-trigger
          >
            ⌕
          </button>
          <Link
            aria-label="Sign in or open account"
            className="mobile-head-icon mobile-account-icon"
            href="/dashboard"
          >
            👤
          </Link>
        </div>
        <button
          aria-label="Open menu"
          className="mobile-nav-toggle"
          type="button"
          aria-controls="mobileNav"
          aria-expanded="false"
          data-mobile-nav-trigger
        >
          ☰
        </button>
      </div>
    </header>
  );
}
