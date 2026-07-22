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

export default async function Masters() {
  const data = await getCMSPageContent("masters");

  return (
    <div className="qualification-page masters-page">
      {/* SECTION 2: HERO */}
      <section className="qhero">
        <HeroBanner
          slug="masters"
          layoutType="qualification"
          fallbackBadgeText="YStudy qualification guide"
          fallbackBgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=85"
        />
        <QualificationSection2
          section2Data={data?.section_2}
          fallbackBadge="Postgraduate"
          fallbackTitle="Master's Degree"
          fallbackDescription="A postgraduate qualification for graduates or experienced professionals who want deeper expertise, promotion or a career change."
          fallbackStats={[
            { title: "1 year FT / 2 years PT", description: "Typical duration" },
            { title: "Level 7", description: "Qualification level" },
            { title: "Funding", description: "Check SFE route" },
          ]}
        />
      </section>

      {/* SECTION 3: QUICK EXPLANATION / STEP CARDS */}
      <QualificationQuickExplanation
        sectionData={data?.section_3}
        fallbackTitle="What is Master's Degree?"
      />

      {/* SECTION 4: ENTRY REQUIREMENTS AND PROGRESSION */}
      <QualificationEntryRequirements
        sectionData={data?.section_4}
        fallbackCards={[
          { badge: "Entry requirements", title: "What universities usually check", points: ["Usually Bachelor's degree or strong professional experience", "English requirement may be higher", "Postgraduate finance is a different loan system"] },
          { badge: "Progression", title: "Where this route can lead", points: ["Specialist career progression", "Professional conversion route", "Possible PhD or research route"] },
          { badge: "Career options", title: "Possible outcomes", points: ["Project manager", "Consultant", "Senior analyst", "Specialist practitioner"] },
          { badge: "Important", title: "Check before committing", points: ["Previous higher education study can affect funding.", "Part-time, online and weekend routes may be assessed differently.", "Use the eligibility checker before applying."] }
        ]}
      />

      {/* SECTION 5: SFE FUNDING CHECK */}
      <QualificationFundingCheck
        sectionData={data?.section_5}
      />

      {/* SECTION 6: FAQS SECTION */}
      <QualificationFaqs
        slug="masters"
        sectionData={data?.section_6}
        fallbackTitle="Master's Degree FAQ."
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
