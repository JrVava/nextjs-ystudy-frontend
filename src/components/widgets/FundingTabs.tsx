"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function FundingTabs() {
  const pathname = usePathname();

  const tabs = [
    { name: "Funding hub", href: "/funding" },
    { name: "Maintenance Loan", href: "/funding/maintenance-loan" },
    { name: "Tuition Fee Loan", href: "/funding/tuition-fee-loan" },
    { name: "Grants", href: "/funding/grants" },
    { name: "Eligibility", href: "/tools/eligibility-checker" },
    { name: "Repayment", href: "/funding/maintenance-loan#repayment" },
  ];

  return (
    <div className="page-nav-wrap">
      <div className="page-nav-head">
        <div>
          <h2>Funding</h2>
          <p>Loans, grants, eligibility and calculators.</p>
        </div>
        <Link className="btn btn-orange" href="/funding/maintenance-loan#calculator">
          Calculate support
        </Link>
      </div>
      <div className="page-nav-tabs">
        {tabs.map((tab, idx) => {
          const isActive = pathname === tab.href;
          return (
            <Link key={idx} className={isActive ? "active" : ""} href={tab.href}>
              {tab.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default FundingTabs;
