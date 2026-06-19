import Image from "next/image";
import Link from "next/link";
import { HEADER_ACTIONS } from "@/lib/navigation";
import { HeaderActions, MainNav } from "./MainNav";

type SiteHeaderProps = {
  pathname?: string;
};

export function SiteHeader({ pathname }: SiteHeaderProps) {
  return (
    <header className="header">
      <div className="container nav">
        <Link className="logo" href="/">
          <Image
            className="logo-img"
            src="/ystudy-logo.png"
            alt="YStudy"
            width={48}
            height={48}
            priority
          />
          YStudy
        </Link>
        <MainNav pathname={pathname} />
        <HeaderActions />
        <div aria-label="Mobile quick actions" className="mobile-head-actions">
          <button
            type="button"
            aria-label={HEADER_ACTIONS.searchLabel}
            className="mobile-head-icon mobile-search-icon ystudy-search-open"
            data-search-trigger
          >
            ⌕
          </button>
          <Link
            aria-label="Sign in or open account"
            className="mobile-head-icon mobile-account-icon"
            href={HEADER_ACTIONS.signInHref}
          >
            👤
          </Link>
        </div>
        <button
          type="button"
          aria-label="Open menu"
          className="mobile-nav-toggle"
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
