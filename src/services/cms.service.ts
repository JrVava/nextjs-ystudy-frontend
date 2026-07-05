import "server-only";
import { decrypt } from "@/lib/crypto";
import { CMSPageData } from "@/types/cms";
import fallbackHome from "@/content/fallback-cms-home.json";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function getCMSPageContent(pageName: string): Promise<CMSPageData | null> {
  try {
    const res = await fetch(`${API_URL}/public/cms-pages/page/${pageName}`, {
      next: { revalidate: 3600 }, // Cache on CDN / server for 1 hour
    });

    if (!res.ok) {
      console.warn(`[cms.service] Failed to fetch CMS page '${pageName}' from backend. Status: ${res.status}`);
      return getFallbackData(pageName);
    }

    const json = await res.json();
    if (!json.data) {
      console.warn(`[cms.service] CMS page '${pageName}' returned empty data.`);
      return getFallbackData(pageName);
    }

    const decrypted = decrypt(json.data);
    if (decrypted && decrypted.success && decrypted.data) {
      return decrypted.data;
    }

    console.warn(`[cms.service] CMS decryption failed or returned unsuccessful status.`);
    return getFallbackData(pageName);
  } catch (error) {
    console.error(`[cms.service] Error calling CMS API for page '${pageName}':`, error);
    return getFallbackData(pageName);
  }
}

function getFallbackData(pageName: string): CMSPageData | null {
  console.info(`[cms.service] Using static fallback data for page: ${pageName}`);
  if (pageName === "home") {
    return fallbackHome as unknown as CMSPageData;
  }
  return null;
}
