export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavSection = {
  id: string;
  label: string;
  href: string;
  links: NavLink[];
};

export type MobileNavGroup = {
  id: string;
  label: string;
  links: NavLink[];
  defaultOpen?: boolean;
};

export type BottomNavItem = {
  label: string;
  href: string;
  icon: string;
};

export type SearchIndexEntry = {
  title: string;
  href: string;
  category: string;
  description: string;
  keywords: string[];
};
