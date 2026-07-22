import { HeroBanner, HeroBannerProps } from "./HeroBanner";
import React from "react";

export interface QBannerProps extends Omit<HeroBannerProps, "layoutType"> {
  layoutType?: "qhero" | "v735-hero" | "qualification" | "overview";
}

export async function QBanner(props: QBannerProps) {
  const mappedLayout: "qualification" | "overview" =
    props.layoutType === "v735-hero" || props.layoutType === "overview"
      ? "overview"
      : "qualification";

  return <HeroBanner {...props} layoutType={mappedLayout} />;
}

export default QBanner;
