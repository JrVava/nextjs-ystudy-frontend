import type { SiteTheme } from "@/types";

const THEME_CLASS: Record<SiteTheme, string> = {
  default: "",
  wash: "ys-theme-wash",
  sunset: "ys-theme-sunset",
  split: "ys-theme-split",
};

export function getThemeClass(theme: SiteTheme = "default"): string {
  return THEME_CLASS[theme];
}

export function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|tel:|#)/.test(href);
}

export function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

export function isActivePath(current: string, target: string): boolean {
  const normalizedCurrent = normalizePath(current);
  const normalizedTarget = normalizePath(target);

  if (normalizedTarget === "/") {
    return normalizedCurrent === "/";
  }

  return (
    normalizedCurrent === normalizedTarget ||
    normalizedCurrent.startsWith(`${normalizedTarget}/`)
  );
}
