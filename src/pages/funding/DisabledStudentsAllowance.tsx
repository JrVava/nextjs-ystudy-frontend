import React from "react";
import Banner from "@/components/ui/Banner";
import FundingBottomSections from "@/components/widgets/FundingBottomSections";

interface DisabledStudentsAllowanceProps {
  data?: any;
}

export function DisabledStudentsAllowance({ data }: DisabledStudentsAllowanceProps) {
  const s2 = data?.section_2; // snapshot
  const s3 = data?.section_3; // journey
  const s4 = data?.section_4; // myths
  const s5 = data?.section_5; // certainty

  return (
    <div className="qualification-page funding-sub-page">
      {/* HERO BANNER */}
      <Banner
        slug="disabled-students-allowance"
        fallbackBadgeText="★ DSA · 2026/27"
        fallbackTitle="Extra support, if a condition makes study harder."
        fallbackDescription="Non-repayable help for equipment, software, support workers and travel — it doesn't depend on your household income."
        fallbackBgImage="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: "list-items",
          title: "Up to £27,783 / year covers",
          items: [
            { value: "Tech", description: "Equipment & software" },
            { value: "People", description: "Support workers" },
            { value: "Travel", description: "Uncapped" },
            { value: "£0", description: "To repay" }
          ]
        }}
      >
        <div className="btnrow" style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          <a className="btn btn-orange" href="/tools/eligibility-checker">
            Check if you qualify →
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

export default DisabledStudentsAllowance;
