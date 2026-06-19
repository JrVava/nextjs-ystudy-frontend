"use client";

import { useEffect, type PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { useMobileNav } from "@/hooks/use-mobile-nav";
import { useSearchModal } from "@/hooks/use-search-modal";
import { cn, getThemeClass } from "@/lib/utils";
import type { SiteTheme } from "@/types";
import { MobileBottomNav } from "./MobileBottomNav";
import { MobileNav } from "./MobileNav";
import { SearchModal } from "./SearchModal";
import Footer from "./Footer";
import Header from "./Header";

type SiteLayoutProps = PropsWithChildren<{
  theme?: SiteTheme;
  showBottomNav?: boolean;
  minimalFooter?: boolean;
  className?: string;
}>;

export function SiteLayout({
  children,
  theme = "default",
  showBottomNav = true,
  minimalFooter = false,
  className,
}: SiteLayoutProps) {
  const pathname = usePathname();
  const mobileNav = useMobileNav();
  const searchModal = useSearchModal();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (target.closest("[data-search-trigger]")) {
        event.preventDefault();
        searchModal.open();
      }

      if (target.closest("[data-mobile-nav-trigger]")) {
        event.preventDefault();
        mobileNav.toggle();
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [mobileNav, searchModal]);

  return (
    <div className={cn("ys-unified", getThemeClass(theme), className)}>
      <Header />
      <SearchModal isOpen={searchModal.isOpen} onClose={searchModal.close} />
      <MobileNav isOpen={mobileNav.isOpen} onClose={mobileNav.close} />
      <main>{children}</main>
      <Footer />
      {showBottomNav ? <MobileBottomNav /> : null}
    </div>
  );
}
