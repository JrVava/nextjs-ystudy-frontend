import { encrypt, decrypt } from "@/lib/crypto";
import { CMSPageData } from "@/types/cms";
import fallbackHome from "@/content/fallbacks/home.json";
import fallbackDegrees from "@/content/fallbacks/degrees.json";
import fallbackStudyLocations from "@/content/fallbacks/study-locations.json";
import fallbackFoundationYear from "@/content/fallbacks/qualifications/foundation-year.json";
import fallbackHND from "@/content/fallbacks/qualifications/hnd.json";
import fallbackStudySubjects from "@/content/fallbacks/study-subjects.json";
import fallbackStudyRoutes from "@/content/fallbacks/study-routes.json";
import fallbackPolishCommunity from "@/content/fallbacks/guides/polish-community.json";
import fallbackBusinessCourse from "@/content/fallbacks/course/business-management-ba.json";
import fallbackComputingCourse from "@/content/fallbacks/course/computing-cybersecurity-bsc.json";
import fallbackHealthCourse from "@/content/fallbacks/course/health-social-care-ba.json";
import api from "@/lib/api";

export async function getCMSPageContent(pageName: string): Promise<CMSPageData | null> {
  if (!pageName || typeof pageName !== "string") {
    console.warn(`[cms.service] getCMSPageContent: invalid pageName '${pageName}'`);
    return null;
  }
  try {
    const encryptedBody = encrypt({ slug: pageName });
    const res = await api.post("/frontend/cms", { data: encryptedBody });

    const json = res.data;
    if (!json || !json.data) {
      console.warn(`[cms.service] CMS page '${pageName}' returned empty data.`);
      return getFallbackData(pageName);
    }

    const decrypted = decrypt(json.data);
    if (decrypted && decrypted.success && decrypted.data) {
      return decrypted.data;
    }

    console.warn(`[cms.service] CMS decryption failed or returned unsuccessful status.`);
    return getFallbackData(pageName);
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.warn(`[cms.service] CMS page not found for pageName '${pageName}' (Status: 404).`);
    } else {
      console.error(`[cms.service] Error calling CMS API for page '${pageName}':`, error.message || error);
    }
    return getFallbackData(pageName);
  }
}

function getFallbackData(pageName: string): CMSPageData | null {
  if (!pageName || typeof pageName !== "string") {
    return null;
  }
  console.info(`[cms.service] Using static fallback data for page: ${pageName}`);
  const slug = pageName.toLowerCase().trim();

  if (slug === "home") {
    return fallbackHome as unknown as CMSPageData;
  }
  if (slug === "degrees") {
    return fallbackDegrees as unknown as CMSPageData;
  }
  if (slug === "study-locations") {
    return fallbackStudyLocations as unknown as CMSPageData;
  }
  if (slug === "study-subjects" || slug === "subjects") {
    return fallbackStudySubjects as unknown as CMSPageData;
  }
  if (slug === "study-routes" || slug === "routes") {
    return fallbackStudyRoutes as unknown as CMSPageData;
  }
  if (slug === "polish-community" || slug === "polish-community-guide") {
    return fallbackPolishCommunity as unknown as CMSPageData;
  }
  if (slug === "foundation-year") {
    return fallbackFoundationYear as unknown as CMSPageData;
  }
  if (slug === "hnd") {
    return fallbackHND as unknown as CMSPageData;
  }
  if (slug === "business-management-ba") {
    return fallbackBusinessCourse as unknown as CMSPageData;
  }
  if (slug === "computing-cybersecurity-bsc") {
    return fallbackComputingCourse as unknown as CMSPageData;
  }
  if (slug === "health-social-care-ba") {
    return fallbackHealthCourse as unknown as CMSPageData;
  }

  // Handle other qualification pages dynamically
  const qualPages = [
    "certhe", 
    "certificate-of-higher-education", 
    "hnc", 
    "foundation-degree", 
    "top-up-degree", 
    "masters-degree", 
    "masters"
  ];
  
  if (qualPages.includes(slug)) {
    const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return {
      page: slug,
      section_2: {
        badge: "Degree Route",
        title: `${title} Qualification`,
        description: `Explore the dynamic ${title} qualification options, entry pathways, and funding rules for mature students.`,
        hndTimeLine: [
          { "title": "1-2 years", "description": "Typical duration" },
          { "title": "Level 5", "description": "Qualification level" },
          { "title": "SFE eligible", "description": "Funding check" }
        ],
        status: true
      },
      section_3: {
        badge: "Overview",
        title: `What is ${title}?`,
        description: `Learn how ${title} fits into higher education in the UK.`,
        cards: [
          { "number": "1", "title": "Core Subjects", "description": "Structured curriculum focusing on academic theory and practical work." },
          { "number": "2", "title": "Who it suits", "description": "Adults seeking flexible study that balances with work and home commitments." },
          { "number": "3", "title": "Graduation", "description": "Receive an officially recognized UK certificate upon successful completion." },
          { "number": "4", "title": "Progression", "description": "Apply for career progression or advance to subsequent degree years." }
        ],
        status: true
      },
      section_4: {
        badge: "Requirements",
        title: "Entry criteria and progression.",
        description: "Standard entry options for mature students returning to study.",
        cards: [
          {
            "badge": "Entry",
            "title": "Prerequisites",
            "points": [
              "Work experience considered in place of traditional A-levels",
              "Basic language and literacy review",
              "Personal statement and references"
            ]
          },
          {
            "badge": "Next steps",
            "title": "Pathways",
            "points": [
              "Direct employment entry",
              "Top-up or credit transfer options",
              "Specialized master's routes"
            ]
          },
          {
            "badge": "Advisory",
            "title": "Key notices",
            "points": [
              "Always check if previous study limits funding.",
              "Weekend or evening slots may run on blended models.",
              "Use YStudy checker before submitting."
            ]
          }
        ],
        status: true
      },
      section_5: {
        badge: "Finance",
        title: "Student finance coverage.",
        cards: [
          { "title": "Tuition", "description": "Designated courses may receive direct tuition cover." },
          { "title": "Maintenance", "description": "Living cost loan depending on intensity and status." },
          { "title": "Previous", "description": "Checked during eligibility review." },
          { "title": "Adviser", "description": "Free advice on application forms." }
        ],
        status: true
      },
      section_6: {
        badge: "FAQ",
        title: `Common questions about ${title}.`,
        faqs: [
          {
            "question": "Is this route suitable for working adults?",
            "answer": "Yes. Most providers design these qualifications to fit around typical work timetables."
          },
          {
            "question": "Can I progress to a higher degree level after?",
            "answer": "Absolutely. It builds the exact credits needed to advance your education."
          }
        ],
        status: true
      },
      section_7: {
        title: "Ready to explore your options?",
        description: "Speak to a YStudy adviser to verify your eligibility and find the right course.",
        status: true
      }
    } as unknown as CMSPageData;
  }

  return null;
}
