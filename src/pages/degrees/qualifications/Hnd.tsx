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
import React from "react";

export default async function Hnd() {
  const data = await getCMSPageContent("hnd");

  return (
    <div className="qualification-page hnd-page">
      {/* SECTION 2: HERO */}
      <section className="qhero">
        <HeroBanner
          slug="hnd"
          layoutType="qualification"
          fallbackBadgeText="YStudy qualification guide"
          fallbackBgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=85"
        />
        <QualificationSection2
          section2Data={data?.section_2}
          fallbackBadge="Degree Year 1 & 2"
          fallbackTitle="HND — Higher National Diploma"
          fallbackDescription="A two-year Level 5 qualification focused on practical higher education, often used as a stepping stone into the final year of a degree."
          fallbackStats={[
            { title: "2 years", description: "Typical duration" },
            { title: "Level 5", description: "Qualification level" },
            { title: "Funding", description: "Check SFE route" },
          ]}
        />
      </section>

      {/* QUICK EXPLANATION / STEP CARDS */}
      <QualificationQuickExplanation
        sectionData={data?.section_3}
        fallbackTitle="What is HND?"
      />

      {/* ENTRY REQUIREMENTS AND PROGRESSION */}
      <QualificationEntryRequirements
        sectionData={data?.section_4}
      />

      {/* SFE FUNDING CHECK */}
      <QualificationFundingCheck
        sectionData={data?.section_5}
      />

      {/* FAQS */}
      <QualificationFaqs
        slug="hnd"
        sectionData={data?.section_6}
        fallbackTitle="HND FAQ."
      />

      {/* CTA CONVERSION PANEL */}
      <QualificationCtaPanel
        sectionData={data?.section_7}
      />

      {/* THREE LINK CARDS CONVERSION SYSTEM */}
      <QualificationConversionCards
        sectionData={data?.section_8}
      />

      {/* CROSSLINKS SECTION */}
      <QualificationCrosslinks
        sectionData={data?.section_9}
      />
    </div>
  );
}
