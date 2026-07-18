import { encrypt, decrypt } from "@/lib/crypto";
import { CMSPageData } from "@/types/cms";
import fallbackHome from "@/content/fallbacks/home.json";
import fallbackDegrees from "@/content/fallbacks/degrees.json";
import fallbackStudyLocations from "@/content/fallbacks/study-locations.json";
import fallbackFoundationYear from "@/content/fallbacks/qualifications/foundation-year.json";
import fallbackHND from "@/content/fallbacks/qualifications/hnd.json";
import fallbackCertHE from "@/content/fallbacks/qualifications/certhe.json";
import fallbackFoundationDegree from "@/content/fallbacks/qualifications/foundation-degree.json";
import fallbackHNC from "@/content/fallbacks/qualifications/hnc.json";
import fallbackMasters from "@/content/fallbacks/qualifications/masters.json";
import fallbackTopUpDegree from "@/content/fallbacks/qualifications/top-up-degree.json";
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
  if (slug === "certhe" || slug === "certificate-of-higher-education") {
    return fallbackCertHE as unknown as CMSPageData;
  }
  if (slug === "hnc") {
    return fallbackHNC as unknown as CMSPageData;
  }
  if (slug === "foundation-degree") {
    return fallbackFoundationDegree as unknown as CMSPageData;
  }
  if (slug === "top-up-degree") {
    return fallbackTopUpDegree as unknown as CMSPageData;
  }
  if (slug === "masters-degree" || slug === "masters") {
    return fallbackMasters as unknown as CMSPageData;
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

  return null;
}
