export type SiteTheme = "wash" | "sunset" | "split" | "default";

export type SiteMetadata = {
  title: string;
  description: string;
  path: string;
  theme?: SiteTheme;
};

export type BreadcrumbItem = {
  label: string;
  href?: string;
};
