import type { Metadata } from "next";
import type { SiteMetadata } from "@/types";
import { SITE_NAME } from "@/lib/constants";

export function createPageMetadata({
  title,
  description,
  path,
}: SiteMetadata): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
    },
  };
}
