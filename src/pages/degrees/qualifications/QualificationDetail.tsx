import { getCMSPageContent } from "@/services/cms.service";
import "@/app/degrees/qualifications/qualifications.css";
import {
  HeroBanner,
  QualificationSection2,
  QualificationQuickExplanation,
  QualificationEntryRequirements,
  QualificationFundingCheck,
  QualificationFaqs,
  QualificationCtaPanel,
  QualificationConversionCards,
  QualificationCrosslinks,
} from "@/components/ui";
import Link from "next/link";
import React from "react";

interface QualificationDetailProps {
  slug: string;
}

export default async function QualificationDetail({ slug }: QualificationDetailProps) {
  const data = await getCMSPageContent(slug);

  if (!data) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
        <h2>Qualification Route Not Found</h2>
        <p>We couldn't retrieve the qualification details for "{slug}".</p>
        <Link href="/degrees" className="btn btn-blue" style={{ marginTop: "1rem" }}>
          Browse Degrees
        </Link>
      </div>
    );
  }

  // Format title for fallback
  const title = (slug || "").replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  // Determine fallback statistics based on slug
  let fallbackDuration = "1 year";
  let fallbackLevel = "Level 4";
  if (slug === "hnd" || slug === "foundation-degree") {
    fallbackDuration = "2 years";
    fallbackLevel = "Level 5";
  } else if (slug === "masters-degree" || slug === "masters") {
    fallbackDuration = "1 yr FT / 2 yr PT";
    fallbackLevel = "Level 7";
  } else if (slug === "top-up-degree") {
    fallbackDuration = "1 year";
    fallbackLevel = "Level 6";
  } else if (slug === "foundation-year") {
    fallbackDuration = "1 year";
    fallbackLevel = "Level 3 / Year 0";
  }

  return (
    <div className="qualification-page qualification-detail-page">
      <section className="qhero">
        <HeroBanner
          slug={slug}
          layoutType="qualification"
          fallbackBadgeText="YStudy qualification guide"
          fallbackBgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=85"
        />
        <QualificationSection2
          section2Data={data.section_2}
          fallbackBadge="Qualification Guide"
          fallbackTitle={`${title} Qualification`}
          fallbackDescription={`Learn how an integrated ${title} works as a standard funding-supported entry route for mature students.`}
          fallbackStats={[
            { title: fallbackDuration, description: "Typical duration" },
            { title: fallbackLevel, description: "Qualification level" },
            { title: "Funding", description: "Check SFE route" },
          ]}
        />
      </section>

      {/* QUICK EXPLANATION / STEP CARDS */}
      <QualificationQuickExplanation
        sectionData={data.section_3}
        fallbackTitle={`What is ${title}?`}
      />

      {/* ENTRY REQUIREMENTS AND PROGRESSION */}
      <QualificationEntryRequirements
        sectionData={data.section_4}
        fallbackTitle="Entry requirements and pathways"
      />

      {/* SFE FUNDING CHECK */}
      <QualificationFundingCheck
        sectionData={data.section_5}
      />

      {/* FAQS SECTION */}
      <QualificationFaqs
        slug={slug}
        sectionData={data.section_6}
        fallbackTitle={`${title} FAQ.`}
      />

      {/* FINAL CALL TO ACTION / CTA PANEL */}
      <QualificationCtaPanel
        sectionData={data.section_7}
        fallbackDescription={`Speak with YStudy before applying. We can check your qualification, funding route and course options.`}
      />

      {/* THREE LINK CARDS CONVERSION SYSTEM */}
      <QualificationConversionCards
        sectionData={data.section_8}
      />

      {/* CROSSLINKS SECTION */}
      <QualificationCrosslinks
        sectionData={data.section_9}
      />
    </div>
  );
}
