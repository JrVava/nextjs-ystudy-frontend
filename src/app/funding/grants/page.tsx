import React from "react";
import Grants from "@/pages/funding/Grants";
import { getCMSPageContent } from "@/services/cms.service";

export const metadata = {
  title: "YStudy — What extra support could you get",
  description: "Learn about student grants, bursaries, Childcare Grant, Parents' Learning Allowance, and Disabled Students' Allowance (DSA).",
};

export default async function Page() {
  const data = await getCMSPageContent("grants-support");
  return <Grants data={data} />;
}
