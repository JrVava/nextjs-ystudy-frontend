import { getCMSPageContent } from "@/services/cms.service";
import { Banner } from "@/components/ui/Banner";
import LocationsBody from "@/components/locations/LocationsBody";

export default async function Locations() {
  const data = await getCMSPageContent("study-locations");

  // Define the fallback right card matching the old loc-glass sidebar
  const fallbackRightCard = {
    layoutType: 'list-items' as const,
    title: 'Built for mature students',
    description: 'Most adult learners choose by city first: travel time, timetable, childcare, work pattern and funding all matter.',
    items: [
      { title: 'Flexible study', subtitle: 'Day / evening / weekend' },
      { title: 'Funding routes', subtitle: 'SFE checks' },
      { title: 'Course choice', subtitle: 'Subject + location' }
    ]
  };

  return (
    <main className="locations-page">
      {/* HERO SECTION DYNAMIZED WITH BANNER MODULE */}
      <Banner
        slug="locations"
        fallbackTitle="Study Locations Across England"
        fallbackDescription="Find flexible degree opportunities in cities that work for real adult life. Start with location, choose your subject, then compare funding, timetable and course options."
        fallbackBadgeText="📍 Study Locations"
        fallbackBgImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2200&q=85"
        fallbackRightCard={fallbackRightCard}
      >
        <div style={{ textAlign: "left", width: "100%" }}>
          <div className="loc-actions" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}>
            <a className="btn blue" href="/degrees#results">Search degrees</a>
            <a className="btn blue" href="/tools/eligibility-checker">Check eligibility</a>
            <a className="btn orange" href="/apply">Apply with YStudy</a>
          </div>
        </div>
      </Banner>

      <LocationsBody data={data} />
    </main>
  );
}
