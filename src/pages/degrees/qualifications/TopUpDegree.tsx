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

export default async function TopUpDegree() {
  const data = await getCMSPageContent("top-up-degree");
  const title = "Top-Up Degree";

  return (
    <div className="qualification-page top-up-degree-page">
      {/* SECTION 2: HERO */}
      <section className="qhero">
        <HeroBanner
          slug="top-up-degree"
          layoutType="qualification"
          fallbackBadgeText="YStudy qualification guide"
          fallbackBgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=85"
        />
        <QualificationSection2
          section2Data={data?.section_2}
          fallbackBadge="Final year"
          fallbackTitle="Top-Up Degree"
          fallbackDescription="A final-year route that converts an HND, Foundation Degree or equivalent Level 5 qualification into a full Bachelor's degree."
          fallbackStats={[
            { title: "1 year", description: "Typical duration" },
            { title: "Level 6", description: "Qualification level" },
            { title: "Funding", description: "Check SFE route" }
          ]}
        />
      </section>

      {/* SECTION 3: QUICK EXPLANATION / STEP CARDS */}
      <QualificationQuickExplanation
        sectionData={data?.section_3}
        fallbackTitle={`What is ${title}?`}
      />

      {/* SECTION 4: ENTRY REQUIREMENTS AND PROGRESSION */}
      <QualificationEntryRequirements
        sectionData={data?.section_4}
        fallbackCards={[
          { badge: "Entry requirements", title: "What universities usually check", points: ["HND, Foundation Degree or Level 5 equivalent", "Relevant subject match required", "Previous credits must be checked"] },
          { badge: "Progression", title: "Where this route can lead", points: ["Graduate with a full Bachelor's degree", "Apply for graduate roles", "Progress to postgraduate study"] },
          { badge: "Career options", title: "Possible outcomes", points: ["Graduate trainee", "Manager", "Business analyst", "Project coordinator"] },
          { badge: "Important", title: "Check before committing", points: ["Previous higher education study can affect funding.", "Part-time, online and weekend routes may be assessed differently.", "Use the eligibility checker before applying."] }
        ]}
      />

      {/* SECTION 5: SFE FUNDING CHECK */}
      <QualificationFundingCheck
        sectionData={data?.section_5}
      />

      {/* SECTION 6: FAQS SECTION */}
      <QualificationFaqs
        slug="top-up-degree"
        sectionData={data?.section_6}
        fallbackTitle="Top-Up Degree FAQ."
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
