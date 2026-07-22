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

export default async function FoundationDegree() {
  const data = await getCMSPageContent("foundation-degree");

  return (
    <div className="qualification-page foundation-degree-page">
      {/* SECTION 2: HERO */}
      <section className="qhero">
        <HeroBanner
          slug="foundation-degree"
          layoutType="qualification"
          fallbackBadgeText="YStudy qualification guide"
          fallbackBgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=85"
        />
        <QualificationSection2
          section2Data={data?.section_2}
          fallbackBadge="Work-focused"
          fallbackTitle="Foundation Degree — FdA / FdSc"
          fallbackDescription="A work-focused Level 5 qualification, usually equal to the first two years of a Bachelor's degree, with the option to top up."
          fallbackStats={[
            { title: "2 years", description: "Typical duration" },
            { title: "Level 5", description: "Qualification level" },
            { title: "Funding", description: "Check SFE route" },
          ]}
        />
      </section>

      {/* SECTION 3: QUICK EXPLANATION / STEP CARDS */}
      <QualificationQuickExplanation
        sectionData={data?.section_3}
        fallbackTitle="What is Foundation Degree?"
      />

      {/* SECTION 4: ENTRY REQUIREMENTS AND PROGRESSION */}
      <QualificationEntryRequirements
        sectionData={data?.section_4}
        fallbackCards={[
          { badge: "Entry requirements", title: "What universities usually check", points: ["Usually Level 3 or relevant experience", "Often suitable for employed adults", "Some courses include workplace learning"] },
          { badge: "Progression", title: "Where this route can lead", points: ["Top-up to a full Bachelor's degree", "Enter a professional pathway", "Use work experience alongside study"] },
          { badge: "Career options", title: "Possible outcomes", points: ["Early years practitioner", "Business officer", "Health support lead", "Technical specialist"] },
          { badge: "Important", title: "Check before committing", points: ["Previous higher education study can affect funding.", "Part-time, online and weekend routes may be assessed differently.", "Use the eligibility checker before applying."] }
        ]}
      />

      {/* SECTION 5: SFE FUNDING CHECK */}
      <QualificationFundingCheck
        sectionData={data?.section_5}
      />

      {/* SECTION 6: FAQS SECTION */}
      <QualificationFaqs
        slug="foundation-degree"
        sectionData={data?.section_6}
        fallbackTitle="Foundation Degree FAQ."
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
