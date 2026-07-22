import React from "react";
import Link from "next/link";

interface DegreesPageNavProps {
  activeTab: "search" | "subjects" | "routes" | "locations" | "business" | "computing" | "psychology" | "health" | "construction" | "law";
}

export function DegreesPageNav({ activeTab }: DegreesPageNavProps) {
  return (
    <div className="page-nav-wrap">
      <div className="page-nav-head">
        <div style={{ textAlign: "left" }}>
          <h2>Degrees</h2>
          <p>Search, shortlist and choose a realistic route.</p>
        </div>
        <Link className="btn btn-orange" href="/tools/degree-match">
          Degree Match Finder
        </Link>
      </div>
      <div className="page-nav-tabs">
        <Link className={activeTab === "search" ? "active" : ""} href="/degrees/#results">
          Search degrees
        </Link>
        <Link className={activeTab === "business" ? "active" : ""} href="/degrees/#results">
          Business
        </Link>
        <Link className={activeTab === "computing" ? "active" : ""} href="/degrees/#results">
          Computing
        </Link>
        <Link className={activeTab === "psychology" ? "active" : ""} href="/degrees/#results">
          Psychology
        </Link>
        <Link className={activeTab === "health" ? "active" : ""} href="/degrees/#results">
          Health &amp; Social Care
        </Link>
        <Link className={activeTab === "construction" ? "active" : ""} href="/degrees/#results">
          Construction
        </Link>
        <Link className={activeTab === "law" ? "active" : ""} href="/degrees/#results">
          Law
        </Link>
        <Link className={activeTab === "subjects" ? "active" : ""} href="/degrees/#results">
          Check courses
        </Link>
      </div>
    </div>
  );
}

export default DegreesPageNav;
