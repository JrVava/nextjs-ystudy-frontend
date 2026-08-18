import { encrypt, decrypt } from "@/lib/crypto";
import api from "@/lib/api";

export interface BannerItem {
  title?: string;
  subtitle?: string;
  description?: string;
  value?: string;
  icon?: string;
}

export interface BannerData {
  _id?: string;
  internalName: string;
  background?: {
    imageUrl?: string | null;
    bgColor?: string;
  };
  leftContent: {
    badgeText?: string;
    badgeIcon?: string;
    title: string;
    description?: string;
    footerItems?: Array<{ label: string; value: string }>;
  };
  rightCard: {
    layoutType: 'stacked-cards' | 'stats-highlight' | 'grid-2x2' | 'list-items' | 'guide-hero' | 'none';
    title?: string;
    description?: string;
    mainValue?: string;
    items?: BannerItem[];
  };
  isActive: boolean;
  fullImageUrl?: string;
}

export async function getBannerBySlug(slug: string): Promise<BannerData | null> {
  try {
    const encryptedBody = encrypt({ slug });
    const res = await api.post("/frontend/banners", { data: encryptedBody });

    const json = res.data;
    if (!json || !json.data) {
      console.warn(`[banner.service] Banner API returned empty data for slug '${slug}'.`);
      return null;
    }

    const decrypted = decrypt(json.data);
    if (decrypted && decrypted.success && decrypted.data) {
      return decrypted.data;
    }

    console.warn(`[banner.service] Banner API returned unsuccessful status for slug '${slug}'.`);
    return null;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.warn(`[banner.service] Banner not found for slug '${slug}' (Status: 404).`);
    } else {
      console.error(`[banner.service] Error calling banner API for slug '${slug}':`, error.message || error);
    }
    return null;
  }
}
