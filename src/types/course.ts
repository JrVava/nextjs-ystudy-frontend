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

export interface CourseLocation {
  _id?: string;
  name?: string;
  slug?: string;
  city?: string;
  image?: string;
  fullImageUrl?: string;
}

export interface CourseSubject {
  _id?: string;
  name?: string;
  slug?: string;
  description?: string;
  image?: string;
  fullImageUrl?: string;
}

export interface CourseQualification {
  _id?: string;
  name?: string;
  slug?: string;
  code?: string;
}

export interface CourseDuration {
  _id?: string;
  duration?: string;
  label?: string;
}

export interface CourseFunding {
  _id?: string;
  name?: string;
  eligible?: boolean;
}

export interface CourseMode {
  _id?: string;
  name?: string;
  label?: string;
}

export interface CourseCmsSection {
  badge?: string;
  title?: string;
  description?: string;
  status?: boolean;
  cards?: Array<{
    title?: string;
    description?: string;
    badge?: string;
    salary?: string;
    link?: string;
    icon?: string;
  }>;
  tiles?: Array<{ value?: string; label?: string }>;
  totalSupport?: string;
  featured_course?: any;
}

export interface CourseCmsData {
  courseType?: "General" | "Social";
  kicker?: string;
  bannerStyle?: "blue" | "black" | "white";
  section_2?: CourseCmsSection;
  section_3?: CourseCmsSection;
  section_4?: CourseCmsSection;
  section_5?: CourseCmsSection;
  section_6?: CourseCmsSection;
  section_7?: CourseCmsSection;
  section_8?: CourseCmsSection;
  section_9?: CourseCmsSection;
  section_10?: CourseCmsSection;
  section_11?: CourseCmsSection;
  section_12?: CourseCmsSection;
  section_13?: CourseCmsSection;
  section_14?: CourseCmsSection;
  section_15?: CourseCmsSection;
}

export interface BackendCourse {
  _id?: string;
  title: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  image?: string;
  fullImageUrl?: string;
  locations?: CourseLocation[] | any[];
  subject?: CourseSubject | CourseSubject[] | any;
  subjects?: CourseSubject[];
  qualification?: CourseQualification | CourseQualification[] | any;
  qualifications?: CourseQualification[];
  duration?: CourseDuration | CourseDuration[] | any;
  durations?: CourseDuration[];
  funding?: CourseFunding | CourseFunding[] | any;
  fundings?: CourseFunding[];
  modeType?: CourseMode[];
  salaryRange?: string;
  flexibilityScore?: number;
  matchScore?: number;
  tags?: string[];
  badges?: string[];
  entryRequirement?: string[] | string;
  entryRequirements?: string[] | string;
  courseCms?: CourseCmsData;
}

export type CourseSummary = {
  slug: string;
  title: string;
  subject: SubjectSlug | string;
  qualification: string;
  studyModes: StudyMode[] | string[];
  salaryRange?: string;
  tags?: string[];
  image?: string;
  location?: string;
  funding?: string;
  timetable?: string;
};

export type CourseDetail = CourseSummary & {
  description: string;
  entryRequirements?: string[];
  modules?: string[];
  careerOutcomes?: string[];
  backendData?: BackendCourse;
};
