import type {
  BottomNavItem,
  MobileNavGroup,
  NavSection,
  SearchIndexEntry,
} from "@/types";

export const MAIN_NAV: NavSection[] = [
  {
    id: "degrees",
    label: "Degrees",
    href: "/degrees",
    links: [
      { label: "Search Degrees", href: "/degrees" },
      { label: "Study Subjects", href: "/degrees/subjects" },
      { label: "Study Locations", href: "/degrees/locations" },
      { label: "Study Routes", href: "/degrees/study-routes" },
      {
        label: "Foundation Year",
        href: "/degrees/qualifications/foundation-year",
      },
      { label: "HNC", href: "/degrees/qualifications/hnc" },
      { label: "HND", href: "/degrees/qualifications/hnd" },
      {
        label: "Foundation Degree",
        href: "/degrees/qualifications/foundation-degree",
      },
      {
        label: "Certificate of Higher Education",
        href: "/degrees/qualifications/certhe",
      },
      {
        label: "Top-Up Degree",
        href: "/degrees/qualifications/top-up-degree",
      },
      { label: "Master's Degree", href: "/degrees/qualifications/masters" },
    ],
  },
  {
    id: "funding",
    label: "Funding",
    href: "/funding",
    links: [
      { label: "Funding Hub", href: "/funding" },
      { label: "Maintenance Loan", href: "/funding/maintenance-loan" },
      { label: "Tuition Fee Loan", href: "/funding/tuition-fee-loan" },
      { label: "Grants & Support", href: "/funding/grants" },
      { label: "Student Money Hub", href: "/money" },
      { label: "Eligibility", href: "/tools/eligibility-checker" },
      { label: "Funding Checker", href: "/tools/finance-calculator" },
      { label: "Previous Study", href: "/guides/student-finance" },
      { label: "Childcare Grant", href: "/funding/childcare-grant" },
      { label: "DSA", href: "/funding/disabled-students-allowance" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    href: "/tools",
    links: [
      { label: "Degree Match Finder", href: "/tools/degree-match" },
      { label: "Career Quiz", href: "/tools/career-quiz" },
      { label: "English Test", href: "/tools/english-level-checker" },
      { label: "Eligibility Checker", href: "/tools/eligibility-checker" },
      { label: "Funding Checker", href: "/tools/finance-calculator" },
      { label: "Salary Checker", href: "/tools/salary-checker" },
      { label: "CV Builder", href: "/tools/cv-builder" },
      {
        label: "Personal Statement",
        href: "/tools/personal-statement-calculator",
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    href: "/guides",
    links: [
      { label: "Resources Hub", href: "/guides" },
      { label: "Polish Community", href: "/guides/polish-community" },
      { label: "University Routes", href: "/guides/university-routes" },
      { label: "Student Finance Guides", href: "/guides/student-finance" },
      { label: "Career Change", href: "/guides/career-change" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Why YStudy", href: "/why-ystudy" },
      { label: "How Guidance Works", href: "/how-guidance-works" },
      { label: "News & Updates", href: "/guides/news" },
      { label: "FAQs", href: "/faq" },
    ],
  },
  {
    id: "partners",
    label: "Partners",
    href: "/partners",
    links: [
      { label: "Become a Student Adviser", href: "/partners/become-an-adviser" },
      { label: "Creator Programme", href: "/partners/influencers" },
      { label: "Affiliate Programme", href: "/partners/affiliate-partners" },
      { label: "Refer a Friend", href: "/partners/refer-a-friend" },
      { label: "Advertise to Students", href: "/business/advertise" },
      { label: "Brand Partnerships", href: "/business/brand-partner" },
      { label: "Sponsored Content", href: "/business" },
      { label: "Business Opportunities", href: "/business" },
    ],
  },
];

export const MOBILE_QUICK_ACTIONS = [
  { label: "Eligibility", href: "/tools/eligibility-checker" },
  { label: "Apply", href: "/apply" },
  { label: "Book adviser call", href: "/lead/adviser-call" },
  { label: "Sign in", href: "/dashboard" },
] as const;

export const MOBILE_NAV: MobileNavGroup[] = [
  {
    id: "degrees",
    label: "Degrees",
    defaultOpen: true,
    links: MAIN_NAV[0].links.slice(0, 8),
  },
  {
    id: "funding",
    label: "Funding",
    links: MAIN_NAV[1].links.slice(0, 6),
  },
  {
    id: "tools",
    label: "Tools",
    links: MAIN_NAV[2].links,
  },
  {
    id: "resources",
    label: "Resources",
    links: MAIN_NAV[3].links.slice(0, 8),
  },
  {
    id: "partners",
    label: "Partners",
    links: MAIN_NAV[4].links.slice(0, 7),
  },
];

export const BOTTOM_NAV: BottomNavItem[] = [
  { label: "Home", href: "/", icon: "⌂" },
  { label: "Degree", href: "/tools/degree-match", icon: "🎯" },
  { label: "Funding", href: "/tools/eligibility-checker", icon: "£" },
  { label: "Apply", href: "/apply", icon: "✍" },
  { label: "Account", href: "/dashboard", icon: "👤" },
];

export const HEADER_ACTIONS = {
  searchLabel: "Search YStudy",
  signInHref: "/dashboard",
  eligibilityHref: "/tools/eligibility-checker",
  applyHref: "/apply",
} as const;

/** Seed index — expand during page migration. */
export const SEARCH_INDEX: SearchIndexEntry[] = [
  {
    title: "Search degrees",
    href: "/degrees",
    category: "Degrees",
    description: "Browse courses by subject, route and study mode.",
    keywords: ["degree", "course", "search", "university"],
  },
  {
    title: "Eligibility Checker",
    href: "/tools/eligibility-checker",
    category: "Tools",
    description: "Check if you are likely to qualify before you choose.",
    keywords: ["eligibility", "student finance", "funding"],
  },
  {
    title: "Apply with YStudy",
    href: "/apply",
    category: "Apply",
    description: "Complete one short form and speak to an adviser.",
    keywords: ["apply", "application", "form"],
  },
  {
    title: "Funding hub",
    href: "/funding",
    category: "Funding",
    description: "Tuition fee loan, maintenance loan, grants and repayment.",
    keywords: ["funding", "finance", "loan", "maintenance"],
  },
  {
    title: "Student guides",
    href: "/guides",
    category: "Guides",
    description: "Helpful guides for mature students and career changers.",
    keywords: ["guides", "resources", "mature students"],
  },
];

export const FOOTER_COLUMNS = [
  {
    title: "Degrees",
    links: [
      { label: "Search degrees", href: "/degrees" },
      { label: "Subjects", href: "/degrees/business" },
      {
        label: "Course detail",
        href: "/degrees/course/business-management-ba",
      },
      { label: "Advanced filters", href: "/degrees#results" },
    ],
  },
  {
    title: "Funding",
    links: [
      { label: "Maintenance Loan", href: "/funding/maintenance-loan" },
      { label: "Tuition Fee Loan", href: "/funding/tuition-fee-loan" },
      { label: "Eligibility", href: "/tools/eligibility-checker" },
      {
        label: "Calculator",
        href: "/tools/student-finance-calculator",
      },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Degree Match Finder", href: "/tools/degree-match" },
      { label: "Salary Checker", href: "/tools/salary-checker" },
      {
        label: "Finance Calculator",
        href: "/tools/student-finance-calculator",
      },
      { label: "Eligibility Checker", href: "/tools/eligibility-checker" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Apply",
    links: [
      { label: "Apply", href: "/apply" },
      { label: "Book adviser", href: "/lead/adviser-call" },
      { label: "My Degrees", href: "/degrees/saved" },
      { label: "Account", href: "/dashboard" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/lead/adviser-call" },
      { label: "Funding help", href: "/tools/eligibility-checker" },
      { label: "Not sure?", href: "/tools/degree-match" },
      { label: "Guides & Resources", href: "/guides" },
      { label: "How guidance works", href: "/how-guidance-works" },
      { label: "Why YStudy", href: "/why-ystudy" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Home", href: "/" },
    ],
  },
] as const;

export const FOOTER_BADGES = [
  "Adult learners",
  "Funding guidance",
  "Free support",
] as const;
