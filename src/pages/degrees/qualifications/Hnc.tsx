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

export default async function Hnc() {
  const data = await getCMSPageContent("hnc");

  return (
    <div className="qualification-page hnc-page">
      {/* SECTION 2: HERO */}
      <section className="qhero">
        <HeroBanner
          slug="hnc"
          layoutType="qualification"
          fallbackBadgeText="YStudy qualification guide"
          fallbackBgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=85"
        />
        <QualificationSection2
          section2Data={data?.section_2}
          fallbackBadge="Practical route"
          fallbackTitle="HNC — Higher National Certificate"
          fallbackDescription="A one-year Level 4 qualification designed to build practical skills and a clear route into work, an HND or a degree."
          fallbackStats={[
            { title: "1 year", description: "Typical duration" },
            { title: "Level 4", description: "Qualification level" },
            { title: "Funding", description: "Check SFE route" },
          ]}
        />
      </section>

      {/* SECTION 3: QUICK EXPLANATION / STEP CARDS */}
      <QualificationQuickExplanation
        sectionData={data?.section_3}
        fallbackTitle="What is HNC?"
      />

      {/* SECTION 4: ENTRY REQUIREMENTS AND PROGRESSION */}
      <QualificationEntryRequirements
        sectionData={data?.section_4}
        fallbackCards={[
          { badge: "Entry requirements", title: "What universities usually check", points: ["Usually Level 3 or relevant work experience", "English and maths may be checked", "Mature students can often apply with CV experience"] },
          { badge: "Progression", title: "Where this route can lead", points: ["Move into an HND Year 2", "Apply for Year 1 of a degree", "Use it for career progression"] },
          { badge: "Career options", title: "Possible outcomes", points: ["Engineering technician", "Business administrator", "Computing support", "Construction supervisor"] },
          { badge: "Important", title: "Check before committing", points: ["Previous higher education study can affect funding.", "Part-time, online and weekend routes may be assessed differently.", "Use the eligibility checker before applying."] }
        ]}
      />

      {/* SECTION 5: SFE FUNDING CHECK */}
      <QualificationFundingCheck
        sectionData={data?.section_5}
      />

      {/* SECTION 6: FAQS SECTION */}
      <QualificationFaqs
        slug="hnc"
        sectionData={data?.section_6}
        fallbackTitle="HNC FAQ."
      />

      {/* SECTION 7: FINAL CALL TO ACTION / CTA PANEL */}
      <QualificationCtaPanel
        sectionData={data?.section_7}
      />

      {/* SECTION 8: THREE LINK CARDS CONVERSION SYSTEM */}
      <QualificationConversionCards
        sectionData={data?.section_8}
      />

      {/* SECTION 9: CROSSLINKS SECTION */}
      <QualificationCrosslinks
        sectionData={data?.section_9}
      />
    </div>
  );
}
