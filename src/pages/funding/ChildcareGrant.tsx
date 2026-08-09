import React from "react";
import Banner from "@/components/ui/Banner";
import FundingBottomSections from "@/components/widgets/FundingBottomSections";

interface ChildcareGrantProps {
  data?: any;
}

export function ChildcareGrant({ data }: ChildcareGrantProps) {
  const s2 = data?.section_2; // snapshot
  const s3 = data?.section_3; // journey
  const s4 = data?.section_4; // myths
  const s5 = data?.section_5; // certainty

  return (
    <div className="qualification-page funding-sub-page">
      {/* HERO BANNER */}
      <Banner
        slug="childcare-grant"
        fallbackBadgeText="★ Childcare Grant · 2026/27"
        fallbackTitle="Studying with kids? This helps."
        fallbackDescription="Covers up to 85% of registered childcare while you study — paid termly, and it doesn't reduce your maintenance loan."
        fallbackBgImage="https://images.unsplash.com/photo-1484665754804-74b091211472?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: "list-items",
          title: "Per week · non-repayable",
          items: [
            { value: "£199.62", description: "1 child" },
            { value: "£342.24", description: "2+ children" }
          ]
        }}
      >
        <div className="btnrow" style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          <a className="btn btn-orange" href="/tools/eligibility-checker">
            Check what you can claim →
          </a>
          <a className="btn btn-white" href="/lead/adviser-call">
            Book adviser
          </a>
        </div>
      </Banner>

      {/* SHARED BOTTOM SECTIONS */}
      <FundingBottomSections
        snapshot={s2}
        journey={s3}
        myths={s4}
        certainty={s5}
      />
    </div>
  );
}

export default ChildcareGrant;
