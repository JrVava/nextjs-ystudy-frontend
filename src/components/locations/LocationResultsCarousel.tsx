"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CourseCard } from "@/components/degrees/CourseCard";
import { BackendCourse } from "@/types/course";
import { getCoursesByLocationId } from "@/services/location.service";

interface CityTab {
  id: string;
  name: string;
  slug?: string;
  _id?: string;
  carouselDescription?: string;
}

interface LocationResultsCarouselProps {
  cities: CityTab[];
  coursesData?: Record<string, BackendCourse[]>;
  initialTab?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export function LocationResultsCarousel({
  cities = [],
  coursesData = {},
  initialTab = "london",
  activeTab: controlledActiveTab,
  onTabChange,
}: LocationResultsCarouselProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<string>(initialTab);
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;
  const carouselRef = useRef<HTMLDivElement>(null);

  const [locationCourses, setLocationCourses] = useState<Record<string, BackendCourse[]>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const activeCity =
    cities.find((c) => c.id === activeTab || c.slug === activeTab || c.name.toLowerCase() === activeTab.toLowerCase()) ||
    cities[0] ||
    { id: "london", name: "London" };

  const handleTabClick = (tabId: string) => {
    setInternalActiveTab(tabId);
    onTabChange?.(tabId);
  };

  useEffect(() => {
    if (!activeCity) return;
    const cacheKey = activeCity.id || activeCity.slug || activeCity.name.toLowerCase();

    // If courses are already cached for this location, skip network call
    if (locationCourses[cacheKey] !== undefined) return;

    let isMounted = true;
    setLoading(true);

    const locationIdToFetch = activeCity._id || activeCity.slug || activeCity.id || activeCity.name.toLowerCase();

    getCoursesByLocationId(locationIdToFetch)
      .then((courses) => {
        if (isMounted) {
          setLocationCourses((prev) => ({
            ...prev,
            [cacheKey]: courses,
          }));
        }
      })
      .catch((err) => {
        console.error(`[LocationResultsCarousel] Failed to load courses for ${activeCity.name}`, err);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [activeCity?.id, activeCity?.slug, activeCity?._id, activeCity?.name, locationCourses]);

  const cacheKey = activeCity.id || activeCity.slug || activeCity.name.toLowerCase();
  const currentCourses =
    locationCourses[cacheKey] ??
    coursesData[activeCity.id] ??
    coursesData[activeCity.name.toLowerCase()] ??
    [];

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
        {cities.map((city) => {
          const isActive =
            activeTab === city.id ||
            activeTab === city.slug ||
            activeTab.toLowerCase() === city.name.toLowerCase();

          return (
            <button
              key={city.id}
              className={`location-tab ${isActive ? "active" : ""}`}
              type="button"
              onClick={() => handleTabClick(city.id)}
            >
              {city.name}
            </button>
          );
        })}
      </div>

      <div className="location-course-panel active" role="tabpanel">
        <div className="location-title-row">
          <div>
            <h3 style={{ textTransform: "capitalize" }}>{activeCity.name} courses</h3>
            <p>
              {activeCity.carouselDescription ||
                `Popular routes for mature students who can travel into ${activeCity.name} for flexible or blended study.`}
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
            {loading && currentCourses.length === 0 ? (
              <p style={{ padding: "24px 0", color: "#46566f" }}>
                Loading courses for {activeCity.name}...
              </p>
            ) : currentCourses.length > 0 ? (
              currentCourses.map((course, idx) => (
                <CourseCard
                  key={course._id || idx}
                  course={{
                    ...course,
                    location: course.location || activeCity.name,
                  }}
                  variant="mini"
                  showPills={false}
                />
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
