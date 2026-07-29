import api from "@/lib/api";
import { decrypt } from "@/lib/crypto";
import { BackendCourse } from "@/types/course";

// Fallback courses dataset for graceful fallback when backend API is offline or returning empty
const FALLBACK_COURSES: BackendCourse[] = [
  {
    _id: "1",
    title: "Business Management BA (Hons)",
    slug: "business-management-ba",
    description: "3 years · daytime or evening/weekend options · leadership, marketing and business decision-making.",
    shortDescription: "Flexible business degree for adults aiming for management and analyst roles.",
    fullImageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    locations: [{ name: "London", slug: "london" }, { name: "Birmingham", slug: "birmingham" }],
    subject: { name: "Business", slug: "business" },
    qualification: { name: "BA (Hons)", slug: "bachelors" },
    salaryRange: "£24k–£55k+",
    flexibilityScore: 95,
    matchScore: 96,
    tags: ["2 days/week", "Blended", "SFE eligible"]
  },
  {
    _id: "2",
    title: "BSc Computing & Cybersecurity",
    slug: "computing-cybersecurity-bsc",
    description: "Practical computing route for digital, cybersecurity and IT careers.",
    shortDescription: "Practical computing route for digital, cybersecurity and IT careers.",
    fullImageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80",
    locations: [{ name: "London", slug: "london" }, { name: "Manchester", slug: "manchester" }, { name: "Leeds", slug: "leeds" }],
    subject: { name: "Computing", slug: "computing" },
    qualification: { name: "BSc (Hons)", slug: "bachelors" },
    salaryRange: "£28k–£75k+",
    flexibilityScore: 91,
    matchScore: 93,
    tags: ["Cybersecurity", "Blended", "SFE eligible"]
  },
  {
    _id: "3",
    title: "BSc Health & Social Care",
    slug: "health-social-care-ba",
    description: "3 years or foundation route · care, community support, wellbeing and service leadership.",
    shortDescription: "Care, community and wellbeing-focused degree for adult learners.",
    fullImageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
    locations: [{ name: "London", slug: "london" }, { name: "Birmingham", slug: "birmingham" }],
    subject: { name: "Health", slug: "health" },
    qualification: { name: "BSc (Hons)", slug: "bachelors" },
    salaryRange: "£22k–£48k+",
    flexibilityScore: 90,
    matchScore: 89,
    tags: ["Health", "Community", "Flexible"]
  },
  {
    _id: "4",
    title: "Accounting & Finance Advanced Entry",
    slug: "accounting-finance-bsc",
    description: "For learners with relevant Level 4 study who want a finance-focused route.",
    shortDescription: "Finance, accounting and advanced-entry business routes.",
    fullImageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
    locations: [{ name: "Leeds", slug: "leeds" }],
    subject: { name: "Business", slug: "business" },
    qualification: { name: "BSc (Hons)", slug: "bachelors" },
    salaryRange: "£26k–£60k+",
    flexibilityScore: 88,
    matchScore: 90,
    tags: ["Finance", "2 years", "SFE route"]
  },
  {
    _id: "5",
    title: "Construction Management BSc",
    slug: "construction-management-bsc",
    description: "Site, project management and built environment degree route.",
    shortDescription: "Practical route into commercial and site construction management.",
    fullImageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    locations: [{ name: "London", slug: "london" }, { name: "Birmingham", slug: "birmingham" }],
    subject: { name: "Construction", slug: "construction" },
    qualification: { name: "BSc (Hons)", slug: "bachelors" },
    salaryRange: "£30k–£70k+",
    flexibilityScore: 86,
    matchScore: 88,
    tags: ["Construction", "Built Environment", "SFE eligible"]
  },
  {
    _id: "6",
    title: "Law LLB (Hons)",
    slug: "law-llb-hons",
    description: "Legal, compliance and business-oriented degree for career changers.",
    shortDescription: "Rigorous legal foundation for commercial and public service careers.",
    fullImageUrl: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=900&q=80",
    locations: [{ name: "London", slug: "london" }, { name: "Manchester", slug: "manchester" }],
    subject: { name: "Law", slug: "law" },
    qualification: { name: "LLB (Hons)", slug: "bachelors" },
    salaryRange: "£28k–£80k+",
    flexibilityScore: 85,
    matchScore: 87,
    tags: ["Law", "Legal", "Compliance"]
  }
];

export async function getAllCourses(pageSize?: number): Promise<BackendCourse[]> {
  try {
    // Try primary backend endpoint: GET /frontend/course/allcourses
    let res;
    const url = pageSize ? `/frontend/course/allcourses?pageSize=${pageSize}` : "/frontend/course/allcourses";
    try {
      res = await api.get(url);
    } catch (err: any) {
      // Fallback try: GET /frontend/course/degree
      const fallbackUrl = pageSize ? `/frontend/course/degree?pageSize=${pageSize}` : "/frontend/course/degree";
      res = await api.get(fallbackUrl);
    }

    const json = res?.data;

    if (json && json.data) {
      const decrypted = decrypt(json.data);

      if (decrypted && decrypted.success && decrypted.data) {
        const courses = decrypted.data.courses || decrypted.data;
        if (Array.isArray(courses) && courses.length > 0) {
          return courses;
        }
      }
    }
  } catch (error: any) {
    console.warn("[course.service] Error calling course API, using fallbacks:", error.message || error);
  }
  return FALLBACK_COURSES;
}

export async function getCourseBySlug(slug: string): Promise<BackendCourse | null> {
  if (!slug) return null;
  try {
    let res;
    try {
      res = await api.get(`/frontend/course/${slug}`);
    } catch (err: any) {
      res = await api.get(`/frontend/course/degree/${slug}`);
    }

    const json = res?.data;
    if (json && json.data) {
      const decrypted = decrypt(json.data);
      if (decrypted && decrypted.success && decrypted.data) {
        return decrypted.data;
      }
    }
  } catch (error: any) {
    console.warn(`[course.service] Error fetching course slug '${slug}':`, error.message || error);
  }

  const fallback = FALLBACK_COURSES.find((c) => c.slug === slug || c.slug.includes(slug));
  return fallback || null;
}
