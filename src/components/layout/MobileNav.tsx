"use client";

import Link from "next/link";
import { MOBILE_NAV, MOBILE_QUICK_ACTIONS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
};

export function MobileNav({
  isOpen = false,
  onClose,
  className,
}: MobileNavProps) {
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
          {MOBILE_QUICK_ACTIONS.map((action) => (
            <Link key={action.href} href={action.href} onClick={onClose}>
              {action.label}
            </Link>
          ))}
        </div>

        {MOBILE_NAV.map((group) => (
          <div
            key={group.id}
            className={cn(
              "mobile-nav-group",
              group.defaultOpen && "mobile-nav-open"
            )}
          >
            <div className="mobile-nav-title">{group.label}</div>
            <div className="mobile-nav-links">
              {group.links.map((link) => (
                <Link key={link.href} href={link.href} onClick={onClose}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
