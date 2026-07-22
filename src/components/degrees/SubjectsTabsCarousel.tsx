"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getAllCourses } from "@/services/course.service";
import { BackendCourse } from "@/types/course";
import { formatSalaryRange } from "./CourseCard";

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

const FALLBACK_SUBJECTS_DATA: TabData[] = [
  {
    tabName: "Business",
    heading: "Business courses",
    description: "Popular flexible routes for adult learners aiming for management, finance and leadership careers.",
    buttonLink: "/degrees?subject=Business",
    courses: [
      {
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
        tag: "Business",
        title: "Business Management BA (Hons)",
        description: "Management, marketing and leadership route for adults aiming to progress at work.",
        metas: ["📍 London + more", "📅 Flexible", "💷 SFE eligible", "💰 £24k–£55k+"],
        viewLink: "/degrees/course/business-management-ba",
      },
      {
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
        tag: "Business",
        title: "Accounting & Finance BSc (Advanced Entry)",
        description: "Fast-track route to a finance degree, accepting previous Level 4/5 credits.",
        metas: ["📍 London", "📅 Blended", "💷 SFE eligible", "💰 £28k–£60k+"],
        viewLink: "/degrees",
      },
    ],
  },
  {
    tabName: "Health",
    heading: "Health & Social Care courses",
    description: "Prepare for impactful roles in the NHS, community groups, public health and social care sectors.",
    buttonLink: "/degrees?subject=Health",
    courses: [
      {
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
        tag: "Health",
        title: "Health & Social Care with Foundation Year",
        description: "Supported route into care, community and wellbeing-focused study.",
        metas: ["📍 London + more", "📅 Flexible", "💷 SFE route", "💰 NHS focus"],
        viewLink: "/degrees/course/health-social-care-ba",
      },
    ],
  },
  {
    tabName: "Computing",
    heading: "Computing & IT courses",
    description: "Fast-growing computing pathways built for career changers looking to enter software or cybersecurity.",
    buttonLink: "/degrees?subject=Computing",
    courses: [
      {
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80",
        tag: "Computing",
        title: "Computing & Cybersecurity BSc (Hons)",
        description: "Practical cybersecurity route for digital and network security careers.",
        metas: ["📍 London + Birmingham", "📅 Blended", "💷 SFE eligible", "💰 £28k–£75k+"],
        viewLink: "/degrees/course/computing-cybersecurity-bsc",
      },
    ],
  },
  {
    tabName: "Construction",
    heading: "Construction management",
    description: "Academic and practical routes for adult learners targeting operations, project planning and site supervisor careers.",
    buttonLink: "/degrees?subject=Construction",
    courses: [
      {
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
        tag: "Construction",
        title: "Construction Management with Foundation Year",
        description: "Build academic skills alongside construction principles.",
        metas: ["📍 London", "📅 Evening/Weekend", "💷 SFE route", "💰 £30k–£65k"],
        viewLink: "/degrees",
      },
    ],
  },
  {
    tabName: "Law",
    heading: "Law & Legal studies",
    description: "Develop legal advocacy, compliance, public service knowledge and critical problem-solving.",
    buttonLink: "/degrees?subject=Law",
    courses: [
      {
        image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=900&q=80",
        tag: "Law",
        title: "Law LLB (Hons)",
        description: "Qualifying law degree offering comprehensive legal theory and practice.",
        metas: ["📍 London + Online", "📅 Flexible", "💷 SFE eligible", "💰 £26k–£70k+"],
        viewLink: "/degrees",
      },
    ],
  },
  {
    tabName: "Psychology",
    heading: "Psychology routes",
    description: "Understand human cognition, behavioral science, development, and counselor pathways.",
    buttonLink: "/degrees?subject=Psychology",
    courses: [
      {
        image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
        tag: "Psychology",
        title: "Psychology BSc (Hons)",
        description: "Explore human behavior, cognition, development and social dynamics.",
        metas: ["📍 London + Manchester", "📅 Flexible", "💷 SFE eligible", "💰 £24k–£55k"],
        viewLink: "/degrees",
      },
    ],
  },
];

export function SubjectsTabsCarousel() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [subjectsData, setSubjectsData] = useState<TabData[]>(FALLBACK_SUBJECTS_DATA);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadApiCourses() {
      const apiCourses: BackendCourse[] = await getAllCourses();
      if (!apiCourses || apiCourses.length === 0) return;

      const updatedSubjects = FALLBACK_SUBJECTS_DATA.map((tab) => {
        const tabLower = tab.tabName.toLowerCase();
        const matching = apiCourses.filter((c) => {
          let subjName = "";
          if (typeof c.subject === "string") subjName = c.subject;
          else if (c.subject?.name) subjName = c.subject.name;
          else if (Array.isArray(c.subject) && c.subject.length > 0) subjName = c.subject[0]?.name || c.subject[0];

          return subjName.toLowerCase().includes(tabLower) || c.title.toLowerCase().includes(tabLower);
        });

        if (matching.length > 0) {
          const formattedCourses: CourseCardData[] = matching.map((c) => ({
            image: c.fullImageUrl || c.image || "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
            tag: tab.tabName,
            title: c.title,
            description: c.shortDescription || c.description || "Flexible degree route.",
            metas: [
              `📍 ${Array.isArray(c.locations) && c.locations.length > 0 ? c.locations.map((l: any) => (typeof l === 'string' ? l : l.name || l.title || l.city || '')).filter(Boolean).join(", ") || "London & UK" : "London & UK"}`,
              "📅 Flexible",
              "💷 SFE eligible",
              `💰 ${formatSalaryRange(c.salaryRange || (c as any).salary)}`,
            ],
            viewLink: `/degrees/course/${c.slug}`,
          }));

          return { ...tab, courses: formattedCourses };
        }
        return tab;
      });

      setSubjectsData(updatedSubjects);
    }

    loadApiCourses();
  }, []);

  const activeTab = subjectsData[activeTabIdx] || subjectsData[0];

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
        {subjectsData.map((tab, idx) => (
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
              View all {activeTab.tabName.toLowerCase()} routes →
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

export default SubjectsTabsCarousel;
