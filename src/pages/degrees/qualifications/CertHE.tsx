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

export default async function CertHE() {
  const data = await getCMSPageContent("certificate-of-higher-education");

  return (
    <div className="qualification-page certhe-page">
      {/* SECTION 2: HERO */}
      <section className="qhero">
        <HeroBanner
          slug="certhe"
          layoutType="qualification"
          fallbackBadgeText="YStudy qualification guide"
          fallbackBgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=85"
        />
        <QualificationSection2
          section2Data={data?.section_2}
          fallbackBadge="Degree Year 1"
          fallbackTitle="CertHE — Certificate of Higher Education"
          fallbackDescription="A Level 4 higher education qualification equal to the first year of a degree. Useful if you want a shorter recognised university route."
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
        fallbackTitle="What is CertHE?"
      />

      {/* SECTION 4: ENTRY REQUIREMENTS AND PROGRESSION */}
      <QualificationEntryRequirements
        sectionData={data?.section_4}
        fallbackCards={[
          { badge: "Entry requirements", title: "What universities usually check", points: ["Usually Level 3 or mature entry route", "Strong personal statement helps", "Some providers assess English and academic writing"] },
          { badge: "Progression", title: "Where this route can lead", points: ["Progress into Year 2 of a degree where accepted", "Use it as an exit award", "Return later to continue study"] },
          { badge: "Career options", title: "Possible outcomes", points: ["Team leader", "Care coordinator", "Admin officer", "Junior business role"] },
          { badge: "Important", title: "Check before committing", points: ["Previous higher education study can affect funding.", "Part-time, online and weekend routes may be assessed differently.", "Use the eligibility checker before applying."] }
        ]}
      />

      {/* SECTION 5: SFE FUNDING CHECK */}
      <QualificationFundingCheck
        sectionData={data?.section_5}
      />

      {/* SECTION 6: FAQS SECTION */}
      <QualificationFaqs
        slug="certificate-of-higher-education"
        sectionData={data?.section_6}
        fallbackTitle="CertHE FAQ."
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
