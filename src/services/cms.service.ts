import { encrypt, decrypt } from "@/lib/crypto";
import { CMSPageData } from "@/types/cms";
import fallbackHome from "@/content/fallbacks/home.json";
import fallbackDegrees from "@/content/fallbacks/degrees.json";
import fallbackStudyLocations from "@/content/fallbacks/study-locations.json";
import fallbackFoundationYear from "@/content/fallbacks/qualifications/foundation-year.json";
import fallbackHND from "@/content/fallbacks/qualifications/hnd.json";
import api from "@/lib/api";

export async function getCMSPageContent(pageName: string): Promise<CMSPageData | null> {
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
  console.info(`[cms.service] Using static fallback data for page: ${pageName}`);
  if (pageName === "home") {
    return fallbackHome as unknown as CMSPageData;
  }
  if (pageName === "degrees") {
    return fallbackDegrees as unknown as CMSPageData;
  }
  if (pageName === "study-locations") {
    return fallbackStudyLocations as unknown as CMSPageData;
  }
  if (pageName === "foundation-year") {
    return fallbackFoundationYear as unknown as CMSPageData;
  }
  if (pageName === "hnd") {
    return fallbackHND as unknown as CMSPageData;
  }
  return null;
}

