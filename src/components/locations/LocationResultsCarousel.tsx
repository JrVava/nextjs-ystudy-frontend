"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { CourseCard } from "@/components/degrees/CourseCard";
import { BackendCourse } from "@/types/course";

interface CityTab {
  id: string;
  name: string;
}

interface LocationResultsCarouselProps {
  cities: CityTab[];
  coursesData: Record<string, BackendCourse[]>;
  initialTab?: string;
}

export function LocationResultsCarousel({
  cities = [],
  coursesData = {},
  initialTab = "london",
}: LocationResultsCarouselProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const carouselRef = useRef<HTMLDivElement>(null);

  const activeCity = cities.find((c) => c.id === activeTab) || cities[0] || { id: "london", name: "London" };
  const currentCourses = coursesData[activeCity.id] || coursesData[activeCity.name.toLowerCase()] || [];

  const handleScroll = (direction: "prev" | "next") => {
    if (!carouselRef.current) return;
    const scrollAmount = Math.max(300, Math.round(carouselRef.current.clientWidth * 0.8));
    carouselRef.current.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="location-results" data-location-tabs>
      <div className="location-tabs" role="tablist" aria-label="Choose location">
        {cities.map((city) => (
          <button
            key={city.id}
            className={`location-tab ${activeTab === city.id ? "active" : ""}`}
            type="button"
            onClick={() => setActiveTab(city.id)}
          >
            {city.name}
          </button>
        ))}
      </div>

      <div className="location-course-panel active" role="tabpanel">
        <div className="location-title-row">
          <div>
            <h3 style={{ textTransform: "capitalize" }}>{activeCity.name} courses</h3>
            <p>
              Popular routes for mature students who can travel into {activeCity.name} for flexible or blended study.
            </p>
          </div>
          <div className="carousel-controls">
            <Link className="loc-btn blue" href="/degrees#results">
              View all {activeCity.name} courses →
            </Link>
            <button
              className="carousel-btn"
              type="button"
              onClick={() => handleScroll("prev")}
              aria-label="Previous courses"
            >
              ‹
            </button>
            <button
              className="carousel-btn"
              type="button"
              onClick={() => handleScroll("next")}
              aria-label="Next courses"
            >
              ›
            </button>
          </div>
        </div>

        <div className="carousel-wrap">
          <div className="medium-course-grid" ref={carouselRef} data-course-carousel>
            {currentCourses.length > 0 ? (
              currentCourses.map((course, idx) => (
                <CourseCard key={course._id || idx} course={course} variant="mini" />
              ))
            ) : (
              <p style={{ padding: "24px 0", color: "#46566f" }}>
                No courses available for {activeCity.name} currently.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationResultsCarousel;
