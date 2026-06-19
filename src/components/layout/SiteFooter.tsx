import Image from "next/image";
import Link from "next/link";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import { FOOTER_BADGES, FOOTER_COLUMNS } from "@/lib/navigation";

export function SiteFooter({ minimal = false }: { minimal?: boolean }) {
  if (minimal) {
    return (
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h3>{SITE_NAME}</h3>
            <p>{SITE_DESCRIPTION}</p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Link className="logo" href="/">
            <Image
              className="logo-img"
              src="/ystudy-logo.png"
              alt="YStudy"
              width={48}
              height={48}
            />
            {SITE_NAME}
          </Link>
          <p>{SITE_DESCRIPTION}</p>
          <div className="footer-badges">
            {FOOTER_BADGES.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </div>
        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <h4>{column.title}</h4>
            <div className="footer-links">
              {column.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
      </div>
    </footer>
  );
}
