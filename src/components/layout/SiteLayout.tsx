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

      // Handle carousel prev/next scroll buttons (v731-carousel-system.js)
      const prevBtn = target.closest("[data-carousel-prev], .ys-carousel-prev");
      const nextBtn = target.closest("[data-carousel-next], .ys-carousel-next");
      if (prevBtn || nextBtn) {
        event.preventDefault();
        const btn = (prevBtn || nextBtn) as HTMLElement;
        const dir = prevBtn ? -1 : 1;
        const area = btn.closest(".location-course-panel, .ys-carousel-shell, section, .wrap, body");
        const row = area?.querySelector("[data-course-carousel], .ys-course-carousel, .ys-card-carousel, .ys-guide-carousel, .ys-story-carousel, .ys-carousel-mobile");
        if (row) {
          const card = row.children[0] as HTMLElement | undefined;
          const amount = card ? card.getBoundingClientRect().width + 12 : 320;
          row.scrollBy({ left: dir * amount, behavior: "smooth" });
        }
        return;
      }

      // Handle general carousel buttons (v737-desktop-carousel-polish.js / ystudy-carousel-system.js)
      const ctrlBtn = target.closest(".v735-ctrl, .sdx-ctrl, .carousel-btn, .ctrl");
      if (ctrlBtn) {
        event.preventDefault();
        const btn = ctrlBtn as HTMLElement;
        const block = btn.closest(".v735-tabs-and-carousel, .sdx-block, .carousel-section, .guide-section, .story-section, .related-section, #journey, .location-block, .course-section");
        const row = block?.querySelector(".v735-course-carousel, .course-carousel, .ys-course-carousel, .card-carousel, .guide-carousel, .story-carousel, .sdx-row, .jcards, .ys-carousel");
        if (block && row) {
          const amount = Math.max(260, Math.round(row.clientWidth * 0.86));
          const btns = Array.from(block.querySelectorAll(".v735-ctrl, .sdx-ctrl, .carousel-btn, .ctrl"));
          const index = btns.indexOf(btn);
          const dir = index === 0 ? -1 : 1;
          row.scrollBy({ left: dir * amount, behavior: "smooth" });
        }
        return;
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [mobileNav, searchModal]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const toast = (msg?: string) => {
      let t = document.getElementById("saveToast");
      if (!t) {
        t = document.createElement("div");
        t.id = "saveToast";
        t.className = "save-toast";
        document.body.appendChild(t);
      }
      t.textContent = msg || "Saved";
      t.classList.add("show");
      setTimeout(() => {
        t?.classList.remove("show");
      }, 2200);
    };

    const text = (sel: string) => {
      const el = document.querySelector(sel);
      return el ? el.textContent?.trim() || "" : "";
    };

    const htmlToPlain = (el: HTMLElement | null) => {
      return (el ? el.innerText : "").replace(/\n{3,}/g, "\n\n").trim();
    };

    const win = window as any;

    win.ystudySaveToolResult = (type?: string, title?: string, summary?: string, extra?: any) => {
      let list = [];
      try {
        list = JSON.parse(localStorage.getItem("ystudy_saved_tools") || "[]");
      } catch (e) {}
      const item = {
        type: type || "tool",
        title: title || document.title.replace(/^YStudy\s*[—|-]\s*/, "") || "YStudy tool",
        summary: summary || "",
        url: location.pathname,
        savedAt: new Date().toISOString(),
        extra: extra || {},
      };
      list.unshift(item);
      localStorage.setItem("ystudy_saved_tools", JSON.stringify(list.slice(0, 50)));
      toast("Saved to dashboard");
      return item;
    };

    win.ystudyToolType = () => {
      const t = document.title.toLowerCase();
      if (t.includes("cv")) return "cv";
      if (t.includes("statement")) return "statement";
      if (t.includes("degree")) return "degree";
      if (t.includes("finance") || t.includes("loan") || t.includes("funding")) return "funding";
      if (t.includes("english")) return "english";
      if (t.includes("salary")) return "salary";
      if (t.includes("career")) return "career";
      return "tool";
    };

    win.ystudySummary = () => {
      return [
        text("#degreeResultTitle"),
        text("#degreeResultText"),
        text("#eligResultTitle"),
        text("#eligResultText"),
        text("#scoreText"),
        text("#levelText"),
        text("#totalSupport"),
        text("#maintOut"),
        text("#salMain"),
        text("#salGain"),
        text("#repay"),
        text("#cvScore"),
        text("#psScore")
      ]
        .filter(Boolean)
        .join(" · ") || "Tool result saved.";
    };

    win.ystudySaveCurrentTool = () => {
      return win.ystudySaveToolResult(win.ystudyToolType(), document.title, win.ystudySummary());
    };

    win.ystudyPrepareAdviser = () => {
      const item = win.ystudySaveCurrentTool();
      localStorage.setItem("ystudy_adviser_context", JSON.stringify(item));
      return true;
    };

    win.prepareAdviser = (title?: string) => {
      win.ystudySaveToolResult(win.ystudyToolType(), title || document.title, win.ystudySummary());
      location.href = "/lead/adviser-call";
    };

    win.showAccountModal = (action?: string) => {
      const act = action || document.title;
      const label = act.toLowerCase();
      if (label.includes("copy")) {
        const area = document.querySelector(".print-area") || document.getElementById("cvPreview") || document.getElementById("psPreview");
        if (navigator.clipboard) navigator.clipboard.writeText(htmlToPlain(area as HTMLElement));
        toast("Copied");
        return;
      }
      if (label.includes("print") || label.includes("download")) {
        window.print();
        return;
      }
      const area = document.querySelector(".print-area") || document.getElementById("cvPreview") || document.getElementById("psPreview");
      win.ystudySaveToolResult(win.ystudyToolType(), act, htmlToPlain(area as HTMLElement).slice(0, 220));
    };

    win.closeAccountModal = () => {
      const m = document.getElementById("accountModal");
      if (m) m.classList.remove("is-open");
    };
  }, []);

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
