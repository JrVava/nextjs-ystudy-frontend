import { getCMSPageContent } from "@/services/cms.service";
import "@/app/tools/tools.css";
import { Banner, FundingRisksGrid, QualificationConversionCards, QualificationCrosslinks, ToolAdviserBand } from "@/components/ui";
import FinanceCalculatorWidget from "@/components/tools/FinanceCalculatorWidget";

import Link from "next/link";
import React from "react";

export default async function FinanceCalculator() {
  const data = await getCMSPageContent("funding-checker");
  console.log("data", data?.section_7)
  return (
    <div className="tools-page finance-calculator-page">
      {/* HERO BANNER WITH CMS INTEGRATION */}
      <Banner
        slug="finance-calculator"
        fallbackBadgeText="★ Free · no sign-up"
        fallbackTitle="See your funding before you commit."
        fallbackDescription="A quick estimate of tuition and maintenance support, based on current Student Finance rules — the number that makes it real."
        fallbackBgImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: "list-items",
          title: "Estimated / year",
          mainValue: "£23,925",
          items: [
            { value: "£9,790", subtitle: "Tuition loan" },
            { value: "£14k", subtitle: "Maintenance" },
          ],
        }}
      >
        <div className="tlhrow" style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <a className="hubbtn white" href="#calculator">
            Open calculator →
          </a>
          <Link className="hubbtn ghost" href="/lead/adviser-call">
            Talk to an adviser
          </Link>
        </div>
      </Banner>
      <aside aria-label="Important funding information" className="ys92-context-note"><strong>Illustrative funding
        information.</strong> Figures, examples and calculations are estimates, not an SFE award or eligibility
        decision. Actual support depends on the applicable academic year, course, provider, residency, previous study,
        study mode and individual circumstances. Check <a href="https://www.gov.uk/student-finance">GOV.UK</a> and your
        SFE account.</aside>

      {
        data?.section_3 !== undefined && data?.section_3?.status &&
        <FinanceCalculatorWidget sectionData={data?.section_3} />
      }

      {
        data?.section_4 !== undefined && data?.section_4?.status &&

        <section className="section ys-bg-cream ys114-section" id="all-funding-types">
          <div className="wrap ys114-wrap">
            <div className="ys114-heading"><span className="eyebrow o">{data?.section_4?.badge}</span>
              <h2 className="h1">{data?.section_4?.title}</h2>
              <p>{data?.section_4?.description1}</p>
            </div>
            <div className="ys114-grid">
              {data?.section_4?.cards?.map((item: any, index: number) => (
                <article className="ys114-card" key={index}>
                  <a aria-label={item?.title} className="ys114-photo" href={item?.link}>
                    <img alt={item?.title} loading="lazy" src={item?.fullImageUrl} />
                    <span className="ys114-photo-tag">{item.badge}</span>
                  </a>
                  <div className="ys114-card-body">
                    <h3>{item?.title}</h3>
                    <strong className="ys114-amount">{item?.fees}</strong><span
                      className="ys114-subtitle">{item?.subTitle}</span>
                    <p>
                      {item?.description}
                    </p>
                    <a className="ys114-link" href={item?.link}>{item?.linkName}
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className="ys114-disclaimer" dangerouslySetInnerHTML={{
              __html: data?.section_4?.description2 || "",
            }} />
          </div>
        </section >
      }
      {
        data?.section_5 !== undefined && data?.section_5?.status &&
        <section className="section ys-bg-light-blue ys114-followup">
          <div className="wrap">
            <div className="ys114-heading"><span className="eyebrow o">{data?.section_5?.badge}</span>
              <h2 className="h1">{data?.section_5?.title}</h2>
              <p>{data?.section_5?.description}</p>
              <a className="btn primary" href={data?.section_5?.link}>{data?.section_5?.linkName}</a>
            </div>
          </div>
        </section>
      }

      {
        data?.section_6 !== undefined && data?.section_6?.status &&
        <section className="section white ys-palette-cream">
          <div className="container">
            <div className="risk-grid">
              {data?.section_6?.cards?.map((item: any, index: number) => (
                <div className="risk-card"><b>{item?.title}</b>
                  <p>{item?.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      }

      {
        data?.section_7 !== undefined && data?.section_7?.status &&
        <section className="section tight ys-palette-light-blue">
          <div className="container">
            <div className="cta-wide">
              <div>
                <h2>{data?.section_7?.title}</h2>
                <p>{data?.section_7?.description}</p>
              </div><a className="btn btn-orange" href="/lead/adviser-call">Book free call →</a>
            </div>
          </div>
        </section>
      }

      {/* ADVISER BAND */}
      {
        data?.section_8 !== undefined && data?.section_8?.status &&
        <ToolAdviserBand sectionData={data?.section_8} />
      }

      {/* THREE LINK CARDS CONVERSION SYSTEM */}
      {
        data?.section_9 !== undefined && data?.section_9?.status &&
        <QualificationConversionCards sectionData={data?.section_9} />
      }

      {/* CROSSLINKS SECTION */}
      {
        data?.section_10 !== undefined && data?.section_10?.status &&
        <QualificationCrosslinks sectionData={data?.section_10} />
      }
    </div >
  );
}
