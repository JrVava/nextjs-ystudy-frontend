import React from "react";
import { SiteLayout } from "@/components/layout";
import Advertise from "@/pages/business/Advertise";

export const metadata = {
  title: "YStudy — Advertise to adult learners",
  description: "Reach adult learners and career changers at the moment of decision. High intent, UK-wide, brand-safe advertising.",
};

export default function Page() {
  return (
    <SiteLayout>
      <Advertise />
    </SiteLayout>
  );
}
