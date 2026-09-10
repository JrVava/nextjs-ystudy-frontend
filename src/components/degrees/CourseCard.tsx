"use client";

import React from "react";
import Link from "next/link";
import { BackendCourse } from "@/types/course";

export interface CourseCardProps {
  course: BackendCourse | any;
  variant?: "grid" | "mini" | "list";
  onSave?: (courseId: string) => void;
}

export function formatSalaryRange(salaryInput: any, fallback = "£24k–£55k+"): string {
  if (!salaryInput) return fallback;
  if (typeof salaryInput === "string") return salaryInput;
  if (typeof salaryInput === "number") return `£${Math.round(salaryInput / 1000)}k`;
  if (typeof salaryInput === "object") {
    const { from, to } = salaryInput;
    const formatVal = (val: any) => {
      if (val === undefined || val === null || val === "") return "";
      if (typeof val === "number") {
        return val >= 1000 ? `£${Math.round(val / 1000)}k` : `£${val}`;
      }
      const str = String(val);
      return str.startsWith("£") ? str : `£${str}`;
    };
    const fStr = formatVal(from);
    const tStr = formatVal(to);
    if (fStr && tStr) return `${fStr}–${tStr}`;
    if (fStr) return `${fStr}+`;
    if (tStr) return `Up to ${tStr}`;
  }
  return fallback;
}

export function CourseCard({ course, variant = "grid", onSave }: CourseCardProps) {
  if (!course) return null;

  const title = typeof course.title === "string" ? course.title : "Degree Course";
  const slug = typeof course.slug === "string" ? course.slug : title.toLowerCase().replace(/[\s\(\)]+/g, "-");
  const imageUrl =
    (typeof course.fullImageUrl === "string" && course.fullImageUrl) ||
    (typeof course.image === "string" && course.image) ||
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80";

  // Extract subject name
  let subjectName = "";
  if (typeof course.subject === "string" && course.subject) {
    subjectName = course.subject;
  } else if (course.subject?.name && typeof course.subject.name === "string") {
    subjectName = course.subject.name;
  } else if (course.subject?.title && typeof course.subject.title === "string") {
    subjectName = course.subject.title;
  } else if (Array.isArray(course.subject) && course.subject.length > 0) {
    const s0 = course.subject[0];
    subjectName = typeof s0 === "string" ? s0 : s0?.name || s0?.title || "";
  } else if (course.subjects && course.subjects.length > 0) {
    const s0 = course.subjects[0];
    subjectName = typeof s0 === "string" ? s0 : s0?.name || s0?.title || "";
  }

  // Fallback to entryRequirement if subjectName is empty or "General"
  if (!subjectName || subjectName.toLowerCase() === "general") {
    const req = course.entryRequirement || course.entryRequirements;
    if (Array.isArray(req) && req.length > 0 && typeof req[0] === "string" && req[0]) {
      subjectName = req[0];
    } else if (typeof req === "string" && req) {
      subjectName = req;
    }
  }

  if (!subjectName) {
    subjectName = "General";
  }

  // Extract location names
  let locationText = "London & UK";
  if (Array.isArray(course.locations) && course.locations.length > 0) {
    const locNames = course.locations
      .map((l: any) => (typeof l === "string" ? l : (typeof l === "object" && l ? l.name || l.title || l.city : null)))
      .filter((l: any): l is string => Boolean(l) && typeof l === "string");
    if (locNames.length > 0) {
      locationText = locNames.join(", ");
    }
  }

  // Extract badges for grid-label
  const badgesList: string[] = [];
  if (Array.isArray(course.badges)) {
    course.badges.forEach((b: any) => {
      if (typeof b === "string" && b.trim()) badgesList.push(b.trim());
      else if (b && typeof b === "object") {
        const val = b.name || b.title || b.label;
        if (typeof val === "string" && val.trim()) badgesList.push(val.trim());
      }
    });
  } else if (typeof course.badges === "string" && course.badges.trim()) {
    badgesList.push(course.badges.trim());
  }

  const badgeLabel = badgesList.length > 0 ? badgesList.join(" • ") : subjectName;

  // Extract tags for pills container
  const tagsRaw: string[] = [];
  if (Array.isArray(course.tags)) {
    course.tags.forEach((t: any) => {
      if (typeof t === "string" && t.trim()) tagsRaw.push(t.trim());
      else if (t && typeof t === "object") {
        const val = t.name || t.title || t.label;
        if (typeof val === "string" && val.trim()) tagsRaw.push(val.trim());
      }
    });
  } else if (typeof course.tags === "string" && course.tags.trim()) {
    tagsRaw.push(course.tags.trim());
  }

  if (tagsRaw.length === 0) {
    const reqs = course.entryRequirement || course.entryRequirements;
    if (Array.isArray(reqs)) {
      reqs.forEach((r: any) => {
        if (typeof r === "string" && r.trim()) tagsRaw.push(r.trim());
      });
    } else if (typeof reqs === "string" && reqs.trim()) {
      tagsRaw.push(reqs.trim());
    }
  }

  if (tagsRaw.length === 0) {
    tagsRaw.push("2 days/week", "Blended", "SFE eligible");
  }

  const tags = Array.from(new Set(tagsRaw)).slice(0, 4);

  const salary = formatSalaryRange(course.salaryRange || course.salary);
  const description = typeof course.shortDescription === "string" ? course.shortDescription : (typeof course.description === "string" ? course.description : "Flexible higher education degree route for mature students.");
  const detailLink = `/degrees/course/${slug}`;

  if (variant === "list") {
    return (
      <article className="list-result-card" style={{ textAlign: "left" }}>
        <div className="list-result-img">
          <img src={imageUrl} alt={title} />
          <div className="grid-label">{badgeLabel}</div>
        </div>
        <div className="list-result-body">
          <div className="list-result-content">
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="pills" style={{ marginBottom: "12px" }}>
              {tags.map((tag, i) => (
                <span className="pill" key={i}>{tag}</span>
              ))}
            </div>
            <div className="list-result-info-row">
              <span>📍 {locationText}</span>
              <span>💷 SFE eligible</span>
              <span>📅 Flexible timetable</span>
            </div>
          </div>
        </div>
        <div className="list-result-right">
          <div className="two-metrics" style={{ margin: 0 }}>
            <div className="small-metric">
              <span>Salary range</span>
              <strong>{salary}</strong>
            </div>
            <div className="small-metric">
              <span>Flexibility</span>
              <strong>{course.flexibilityScore || 92}%</strong>
            </div>
          </div>
          <div className="btnrow" style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
            <Link className="btn btn-blue" href={detailLink} style={{ textAlign: "center", width: "100%" }}>
              View course
            </Link>
            <Link className="btn btn-orange" href="/apply" style={{ textAlign: "center", width: "100%" }}>
              Apply
            </Link>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "mini") {
    return (
      <article className="mini-course-card" style={{ textAlign: "left" }}>
        <img src={imageUrl} alt={title} />
        <div className="mini-course-body">
          <span className="course-chip">{badgeLabel}</span>
          <h4>{title}</h4>
          <p>{description}</p>
          <div className="mini-course-info">
            <span>📍 {locationText}</span>
            <span>💷 SFE eligible</span>
            <span>📅 Flexible timetable</span>
            <span>💰 {salary}</span>
          </div>
          {tags.length > 0 && (
            <div className="pills" style={{ marginTop: "8px", marginBottom: "12px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {tags.map((tag, i) => (
                <span className="pill" key={i} style={{ background: "#f4f8ff", border: "1px solid #e2ecfa", color: "#344054", borderRadius: "999px", padding: "4px 8px", fontSize: "11px", fontWeight: 700 }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="course-actions">
            <Link className="loc-btn blue" href={detailLink}>
              View course
            </Link>
            <Link className="loc-btn orange" href="/apply">
              Apply
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Default: Grid Result Card
  return (
    <article className="grid-result-card" style={{ textAlign: "left" }}>
      <div className="grid-result-img">
        <img src={imageUrl} alt={title} />
        <div className="grid-label">{badgeLabel}</div>
      </div>
      <div className="grid-result-body">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="pills">
          {tags.map((tag, i) => (
            <span className="pill" key={i}>{tag}</span>
          ))}
        </div>
        <div className="two-metrics">
          <div className="small-metric">
            <span>Salary range</span>
            <strong>{salary}</strong>
          </div>
          <div className="small-metric">
            <span>Flexibility</span>
            <strong>{course.flexibilityScore || 92}%</strong>
          </div>
        </div>
        <div className="btnrow">
          <Link className="btn btn-blue" href={detailLink}>
            View course
          </Link>
          <Link className="btn btn-orange" href="/apply">
            Apply
          </Link>
        </div>
      </div>
    </article>
  );
}

export default CourseCard;
