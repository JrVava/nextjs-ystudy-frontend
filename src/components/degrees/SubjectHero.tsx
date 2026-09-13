import React from "react";
import Link from "next/link";
import "@/app/degrees/subject.css";

export interface SubjectHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  sfeText?: React.ReactNode;
  viewCoursesHref?: string;
  secondaryBtnText?: string;
  secondaryBtnHref?: string;
}

export function SubjectHero({
  eyebrow,
  title,
  description,
  heroImage,
  sfeText,
  viewCoursesHref = "#courses",
  secondaryBtnText = "Check eligibility",
  secondaryBtnHref = "/tools/eligibility-checker"
}: SubjectHeroProps) {
  return (
    <section className="sbjhero">
      <img className="bg" src={heroImage} alt={title} />
      <div className="sc"></div>
      <div className="in">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p className="lead">{description}</p>
        <div className="sfe">
          <span className="ck">✓</span>
          <span>
            {sfeText || (
              <>
                Courses in this area may be eligible for <b>Tuition Fee Loan</b>, <b>Maintenance Loan</b> and grants depending on your circumstances.{" "}
                <Link href="/funding">Estimate your funding →</Link>
              </>
            )}
          </span>
        </div>
        <div className="btnrow">
          <a className="sbtn white" href={viewCoursesHref}>View courses ↓</a>
          <Link className="sbtn ghost" href={secondaryBtnHref}>{secondaryBtnText}</Link>
        </div>
      </div>
    </section>
  );
}

export default SubjectHero;
