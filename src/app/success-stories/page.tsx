import { SiteLayout } from "@/components/layout";
import { getStudentStoriesList } from "@/services/student-story.service";
import "@/app/degrees/course/course.css";

const fallbackStories = [
  {
    badge: "Business Route",
    description: "A degree that fits around my kids. The flexibility of weekend/evening classes made all the difference.",
    name: "Aisha M.",
    year: "Year 2",
    subject: "Business Management",
    star: 5
  },
  {
    badge: "Computing Route",
    description: "The adviser showed me a route I didn't think was possible with my background. Extremely helpful.",
    name: "James T.",
    year: "Year 1",
    subject: "Computing & IT",
    star: 5
  },
  {
    badge: "Healthcare Route",
    description: "Best decision I've made. It's tough returning to study, but the support network is amazing.",
    name: "Priya K.",
    year: "Year 2",
    subject: "Health & Social Care",
    star: 5
  }
];

export default async function Page() {
  const dbStories = await getStudentStoriesList().catch(() => null);
  const stories = (dbStories && dbStories.length > 0) ? dbStories : fallbackStories;

  const fallbackImages = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=700&q=80"
  ];

  return (
    <SiteLayout>
      <div className="sec soft" style={{ background: "var(--soft)", minHeight: "80vh" }}>
        <div className="wrap">
          <div className="shead" style={{ marginBottom: "40px", textAlign: "center" }}>
            <span className="eyebrow o" style={{ display: "inline-block", marginBottom: "12px" }}>Real people · Real routes</span>
            <h1 className="h1">Student Success Stories</h1>
            <p className="lead" style={{ marginTop: "12px", maxWidth: "600px", marginInline: "auto" }}>
              Read about how mature learners and career changers are achieving their goals with flexible study options and Student Finance.
            </p>
          </div>

          <div className="g3" style={{ marginTop: "24px" }}>
            {stories.map((story: any, idx: number) => {
              const statusText = story.year && story.subject
                ? `${story.year} · ${story.subject}`
                : (story.year || story.subject || "");

              return (
                <div className="pstory" key={story._id || idx} style={{ minHeight: "360px" }}>
                  <img className="bg" src={fallbackImages[idx % 3]} alt={story.name} />
                  <div className="scrim"></div>
                  <span className="pbadge">{story.badge || "Success Story"}</span>
                  <div className="ps-inner">
                    <div className="stars" style={{ color: "var(--o-gold)", fontWeight: 900, marginBottom: "8px" }}>
                      {Array.from({ length: story.star || 5 }).map(() => "★").join("")}
                    </div>
                    <blockquote>"{story.description}"</blockquote>
                    <div className="who">
                      <b>{story.name}</b>
                      <span>{statusText}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
