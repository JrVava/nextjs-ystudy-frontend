import Link from "next/link";
import { HEADER_ACTIONS, MAIN_NAV } from "@/lib/navigation";
import { cn, isActivePath } from "@/lib/utils";

type MainNavProps = {
  pathname?: string;
  className?: string;
};

export function MainNav({ pathname = "/", className }: MainNavProps) {
  return (
    <nav aria-label="Main navigation" className={cn("main-nav", className)}>
      {MAIN_NAV.map((section) => {
        const active = isActivePath(pathname, section.href);

        return (
          <div
            key={section.id}
            className={cn("main-nav-item simple-nav-item", active && "is-active")}
          >
            <Link className="main-nav-link" href={section.href}>
              {section.label} <span className="nav-caret">⌄</span>
            </Link>
            <div className="ds-mega simple-hover-card">
              <div className="simple-menu-grid">
                {section.links.map((link) => (
                  <Link
                    key={`${link.label}-${link.href}`}
                    className="simple-menu-link"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}

export function HeaderActions({ className }: { className?: string }) {
  return (
    <div className={cn("actions nav-actions-v626", className)}>
      <button
        type="button"
        aria-label={HEADER_ACTIONS.searchLabel}
        className="nav-icon-btn nav-search-big ystudy-search-open ic-chip"
        data-search-trigger
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.5-4.5" />
        </svg>
      </button>
      <Link
        className="signin-icon"
        href={HEADER_ACTIONS.signInHref}
        aria-label="Sign in"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4.5 20c0-4 3.4-6.2 7.5-6.2s7.5 2.2 7.5 6.2" />
        </svg>
      </Link>
      <Link className="btn btn-blue" href={HEADER_ACTIONS.eligibilityHref}>
        Eligibility
      </Link>
      <Link className="btn btn-orange" href={HEADER_ACTIONS.applyHref}>
        Apply
      </Link>
    </div>
  );
}
