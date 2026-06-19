"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOTTOM_NAV } from "@/lib/navigation";
import { cn, isActivePath } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Quick mobile navigation" className="mobile-bottom-nav">
      {BOTTOM_NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(isActivePath(pathname, item.href) && "is-active")}
        >
          <span>{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
