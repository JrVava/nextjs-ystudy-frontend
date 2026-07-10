import config from "../config";

export const SITE_NAME = "YStudy";

export const SITE_DESCRIPTION =
  "Free guidance for adults choosing degrees, funding and career routes in the UK.";

export const SITE_URL =
  config.siteUrl;

export const CONTACT = {
  supportEmail: "support@ystudy.co.uk",
} as const;

export const LAYOUT = {
  maxWidth: 1680,
  mobileGutter: 12,
} as const;
