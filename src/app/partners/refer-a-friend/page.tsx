import React from "react";
import { SiteLayout } from "@/components/layout";
import ReferAFriend from "@/pages/partners/ReferAFriend";
import { getCMSPageContent } from "@/services/cms.service";

export const metadata = {
  title: "YStudy — Refer a friend who wants to study",
  description: "Know someone who'd thrive at university? Refer your friends to YStudy and we'll guide them for free, and reward you upon successful enrolment.",
};

export default async function Page() {
  const data = await getCMSPageContent("refer-a-friend");

  if (!data) {
    return (
      <SiteLayout>
        <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
          <h2>Refer a Friend Details Not Found</h2>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <ReferAFriend data={data} />
    </SiteLayout>
  );
}
