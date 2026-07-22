"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getAllCourses } from "@/services/course.service";
import { BackendCourse } from "@/types/course";

interface CourseCardData {
  image: string;
  tag: string;
  title: string;
  description: string;
  metas: string[];
  viewLink: string;
}

interface TabData {
  tabName: string;
  heading: string;
  description: string;
  buttonLink: string;
  courses: CourseCardData[];
}

const FALLBACK_STUDY_ROUTES: TabData[] = [
  {
    tabName: "Foundation Year",
    heading: "Foundation Year routes",
    description: "For adult learners who need a supported start before progressing into degree-level study.",
    buttonLink: "/degrees/qualifications/foundation-year",
    courses: [
      {
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
        tag: "Foundation",
        title: "Health & Social Care with Foundation Year",
        description: "Supported route into care, community and wellbeing-focused study.",
        metas: ["📍 London + more", "🎓 Foundation", "📅 Flexible", "💷 SFE route"],
        viewLink: "/degrees/course/health-social-care-ba",
      },
      {
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
        tag: "Foundation",
        title: "Construction Management with Foundation Year",
        description: "Build academic skills alongside construction principles.",
        metas: ["📍 London", "🎓 Foundation", "📅 Evening/Weekend", "💷 SFE route"],
        viewLink: "/degrees",
      },
      {
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
        tag: "Foundation",
        title: "Business Management with Foundation Year",
        description: "A supported pathway to management, leadership and finance.",
        metas: ["📍 London + more", "🎓 Foundation", "📅 Flexible", "💷 SFE route"],
        viewLink: "/degrees/course/business-management-ba",
      },
    ],
  },
  {
    tabName: "CertHE",
    heading: "CertHE routes",
    description: "A one-year higher education certificate (Level 4) equivalent to the first year of a Bachelor's degree.",
    buttonLink: "/degrees/qualifications/certhe",
    courses: [
      {
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
        tag: "CertHE",
        title: "Business Management CertHE",
        description: "One-year Level 4 certificate equal to first year of standard degree.",
        metas: ["📍 London + Birmingham", "🎓 CertHE (Level 4)", "📅 Flexible", "💷 SFE route"],
        viewLink: "/degrees",
      },
      {
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
        tag: "CertHE",
        title: "Healthcare Practice CertHE",
        description: "Practical introduction into care management, health and wellness.",
        metas: ["📍 London", "🎓 CertHE (Level 4)", "📅 Blended", "💷 SFE route"],
        viewLink: "/degrees",
      },
    ],
  },
  {
    tabName: "Bachelor’s",
    heading: "Bachelor’s degrees",
    description: "Standard undergraduate route in England, usually running 3 years or 4 years with a foundation year.",
    buttonLink: "/degrees",
    courses: [
      {
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
        tag: "Bachelor's",
        title: "Business Management BA (Hons)",
        description: "Full 3-year degree focusing on marketing, operations, and leadership.",
        metas: ["📍 London + more", "🎓 BA (Hons) Level 6", "📅 2 days/week", "💷 SFE eligible"],
        viewLink: "/degrees/course/business-management-ba",
      },
      {
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80",
        tag: "Bachelor's",
        title: "Computing & Cybersecurity BSc (Hons)",
        description: "Practical cybersecurity route for digital and network security careers.",
        metas: ["📍 London + Birmingham", "🎓 BSc (Hons) Level 6", "📅 Blended", "💷 SFE eligible"],
        viewLink: "/degrees/course/computing-cybersecurity-bsc",
      },
    ],
  },
  {
    tabName: "Advanced Entry",
    heading: "Advanced Entry routes",
    description: "Allows entry directly into Year 2 or Year 3 of a Bachelor's degree using prior Level 4 or 5 study credits.",
    buttonLink: "/degrees",
    courses: [
      {
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
        tag: "Advanced Entry",
        title: "Accounting & Finance BSc (Advanced Entry)",
        description: "Allows entry directly to Year 2 or 3 using previous qualifications.",
        metas: ["📍 London", "🎓 BSc (Hons)", "📅 Blended", "💷 SFE eligible"],
        viewLink: "/degrees",
      },
    ],
  },
  {
    tabName: "Top-Up",
    heading: "Top-Up degrees",
    description: "A one-year Level 6 route converting an HND, Foundation Degree or equivalent Level 5 into a full Bachelor's degree.",
    buttonLink: "/degrees/qualifications/top-up-degree",
    courses: [
      {
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
        tag: "Top-Up",
        title: "Business Management BSc (Top-Up)",
        description: "Convert HND or Foundation Degree into a full Bachelor's degree in 1 year.",
        metas: ["📍 London + Birmingham", "🎓 BSc (Hons) Level 6", "📅 1 year", "💷 SFE eligible"],
        viewLink: "/degrees",
      },
    ],
  },
  {
    tabName: "Master’s",
    heading: "Master’s degrees",
    description: "Postgraduate Level 7 degrees (MA / MSc / MBA) for degree graduates or experienced leaders.",
    buttonLink: "/degrees/qualifications/masters",
    courses: [
      {
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80",
        tag: "Master's",
        title: "International Business Management MSc",
        description: "Advanced postgraduate study for future global business leaders.",
        metas: ["📍 London + more", "🎓 MSc (Level 7)", "📅 Flexible", "💷 SFE eligible"],
        viewLink: "/degrees",
      },
    ],
  },
];

export function RoutesTabsCarousel() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [routesData, setRoutesData] = useState<TabData[]>(FALLBACK_STUDY_ROUTES);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadApiCourses() {
      const apiCourses: BackendCourse[] = await getAllCourses();
      if (!apiCourses || apiCourses.length === 0) return;

      const updatedRoutes = FALLBACK_STUDY_ROUTES.map((tab) => {
        const tabLower = tab.tabName.toLowerCase();
        const matching = apiCourses.filter((c) => {
          const qualName = (c.qualification?.name || c.qualification?.slug || "").toLowerCase();
          const titleName = c.title.toLowerCase();
          return qualName.includes(tabLower) || titleName.includes(tabLower);
        });

        if (matching.length > 0) {
          const formattedCourses: CourseCardData[] = matching.map((c) => ({
            image: c.fullImageUrl || c.image || "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
            tag: tab.tabName,
            title: c.title,
            description: c.shortDescription || c.description || "Flexible degree route.",
            metas: [
              `📍 ${Array.isArray(c.locations) && c.locations.length > 0 ? c.locations.map((l: any) => (typeof l === 'string' ? l : l.name || l.title || l.city || '')).filter(Boolean).join(", ") || "London & UK" : "London & UK"}`,
              `🎓 ${tab.tabName}`,
              "📅 Flexible",
              "💷 SFE eligible",
            ],
            viewLink: `/degrees/course/${c.slug}`,
          }));

          return { ...tab, courses: formattedCourses };
        }
        return tab;
      });

      setRoutesData(updatedRoutes);
    }

    loadApiCourses();
  }, []);

  const activeTab = routesData[activeTabIdx] || routesData[0];

  const handleScroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = Math.max(280, Math.round(carouselRef.current.clientWidth * 0.88));
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="v735-tabs-and-carousel">
      {/* Left Tabs Selection */}
      <div className="v735-tabs">
        {routesData.map((tab, idx) => (
          <button
            key={idx}
            className={`v735-tab ${activeTabIdx === idx ? "active" : ""}`}
            type="button"
            onClick={() => {
              setActiveTabIdx(idx);
              if (carouselRef.current) {
                carouselRef.current.scrollTo({ left: 0 });
              }
            }}
          >
            {tab.tabName}
          </button>
        ))}
      </div>

      {/* Right Carousel Area */}
      <div className="v735-carousel-area">
        <div className="v735-carousel-top">
          <div style={{ textAlign: "left" }}>
            <h3>{activeTab.heading}</h3>
            <p>{activeTab.description}</p>
          </div>
          <div className="v735-actions">
            <Link className="v735-btn blue" href={activeTab.buttonLink}>
              View details →
            </Link>
            <div className="v735-controls">
              <button type="button" className="v735-ctrl" onClick={() => handleScroll("left")}>
                ‹
              </button>
              <button type="button" className="v735-ctrl" onClick={() => handleScroll("right")}>
                ›
              </button>
            </div>
          </div>
        </div>

        <div className="v735-course-carousel" ref={carouselRef}>
          {activeTab.courses.map((course, idx) => (
            <article className="v735-course-card" key={idx}>
              <div className="v735-course-photo">
                <img src={course.image} alt={course.title} />
                <span className="v735-badge">{course.tag}</span>
              </div>
              <div className="v735-course-body" style={{ textAlign: "left" }}>
                <h4>{course.title}</h4>
                <p>{course.description}</p>
                <div className="v735-meta">
                  {course.metas.map((meta, mIdx) => (
                    <span key={mIdx}>{meta}</span>
                  ))}
                </div>
                <div className="v735-course-actions">
                  <Link className="v735-btn blue" href={course.viewLink}>
                    View course
                  </Link>
                  <Link className="v735-btn orange" href="/apply">
                    Apply
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoutesTabsCarousel;
