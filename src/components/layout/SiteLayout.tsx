"use client";

import { useEffect, useState, type PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { useMobileNav } from "@/hooks/use-mobile-nav";
import { useSearchModal } from "@/hooks/use-search-modal";
import { cn, getThemeClass } from "@/lib/utils";
import type { SiteTheme } from "@/types";
import { decrypt } from "@/lib/crypto";
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
  const [navigation, setNavigation] = useState<any[]>([]);

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
        const res = await fetch(`${apiBase}/frontend/navigations`);
        if (!res.ok) throw new Error("Failed to fetch navigations");
        
        const json = await res.json();
        if (json && json.data) {
          const decrypted = decrypt(json.data);
          if (decrypted && decrypted.success && decrypted.data) {
            setNavigation(decrypted.data);
          }
        }
      } catch (error) {
        console.error("[SiteLayout] Error loading navigation menu:", error);
      }
    };
    
    fetchNavigation();
  }, []);

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
      <Header navigation={navigation} />
      <SearchModal isOpen={searchModal.isOpen} onClose={searchModal.close} />
      <MobileNav isOpen={mobileNav.isOpen} onClose={mobileNav.close} navigation={navigation} />
      <main>{children}</main>
      <Footer />
      {showBottomNav ? <MobileBottomNav /> : null}
    </div>
  );
}
