export type StudyMode = "full-time" | "part-time" | "online" | "blended";

export type QualificationSlug =
  | "foundation-year"
  | "hnc"
  | "hnd"
  | "foundation-degree"
  | "certhe"
  | "top-up-degree"
  | "masters";

export type SubjectSlug =
  | "business"
  | "computing"
  | "health"
  | "construction"
  | "psychology"
  | "law";

export type CourseSummary = {
  slug: string;
  title: string;
  subject: SubjectSlug;
  qualification: string;
  studyModes: StudyMode[];
  salaryRange?: string;
  tags?: string[];
};

export type CourseDetail = CourseSummary & {
  description: string;
  entryRequirements?: string[];
  modules?: string[];
  careerOutcomes?: string[];
};
