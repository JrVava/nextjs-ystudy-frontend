import "@/app/tools/tools.css";
import DegreeMatchWidget from "@/components/tools/DegreeMatchWidget";
import { Banner, QualificationConversionCards, QualificationCrosslinks, ToolAdviserBand } from "@/components/ui";
import { getCMSPageContent } from "@/services/cms.service";
import Link from "next/link";

export default async function DegreeMatchFinder() {
  const data = await getCMSPageContent("degree-match-finder");

  return (
    <div className="tools-page degree-match-page">
      {/* HERO BANNER WITH CMS INTEGRATION */}
      <Banner
        slug="degree-match"
        fallbackBadgeText={data?.section_2?.badge || "★ Free · no sign-up"}
        fallbackTitle={data?.section_2?.title || "Not sure what to study? Find out in 2 minutes."}
        fallbackDescription={
          data?.section_2?.description ||
          "A few quick questions about your goals — and we'll shortlist degrees built for your life and background."
        }
        fallbackBgImage="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=85"
        fallbackRightCard={{
          layoutType: "stats-highlight",
          title: "Sample Match Result",
          mainValue: "96%",
          items: [
            { value: "SFE", subtitle: "Eligible degree route" },
            { value: "Direct", subtitle: "Or Foundation entry" },
          ],
        }}
      >
        <div className="tlhrow" style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <a className="hubbtn white" href="#match">
            Start the quiz →
          </a>
          <Link className="hubbtn ghost" href="/lead/adviser-call">
            Talk to an adviser
          </Link>
        </div>
      </Banner>

      {/* DEGREE MATCH INTERACTIVE WIDGET */}
      <DegreeMatchWidget sectionData={data?.section_2} />

      {/* ADVISER BAND */}
      {data?.section_3?.status !== false && (
        <footer className="section white">
          <div className="container">
            <div
              className="final-cta"
              style={{
                background:
                  'linear-gradient(135deg, rgba(6, 17, 38, 0.94), rgba(6, 17, 38, 0.55)), url("https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=85") center/cover',
                padding: 'clamp(32px, 4.5vw, 64px)',
                borderRadius: '42px',
                gridTemplate: 'none',
                gap: 0,
              }}
            >
              <span className="kicker">{data?.section_3?.badge || "YStudy"}</span>
              <h2>{data?.section_3?.title || "Not sure what to do next?"}</h2>
              <p style={{ fontSize: 'var(--fs-body) !important' }}>
                {data?.section_3?.description ||
                  "Start with a quick route check, then speak to a YStudy adviser before you apply."}
              </p>
              <div className="btnrow">
                <Link className="btn btn-orange" href="/tools/degree-match">
                  Degree Match Finder
                </Link>
                <Link className="btn btn-white" href="/lead/adviser-call">
                  Book Adviser Call
                </Link>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* THREE LINK CARDS CONVERSION SYSTEM */}
      <QualificationConversionCards sectionData={data?.section_4} />

      {/* CROSSLINKS SECTION */}
      <QualificationCrosslinks sectionData={data?.section_5} />
    </div>
  );
}
