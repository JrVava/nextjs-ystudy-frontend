import { encrypt, decrypt } from "@/lib/crypto";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

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
  };
  leftContent: {
    badgeText?: string;
    badgeIcon?: string;
    title: string;
    description?: string;
    footerItems?: Array<{ label: string; value: string }>;
  };
  rightCard: {
    layoutType: 'stacked-cards' | 'stats-highlight' | 'grid-2x2' | 'list-items' | 'none';
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
    const res = await fetch(`${API_URL}/frontend/banners`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: encryptedBody }),
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
      console.warn(`[banner.service] Failed to fetch banner for slug '${slug}'. Status: ${res.status}`);
      return null;
    }

    const json = await res.json();
    if (!json.data) {
      console.warn(`[banner.service] Banner API returned empty data for slug '${slug}'.`);
      return null;
    }

    const decrypted = decrypt(json.data);
    if (decrypted && decrypted.success && decrypted.data) {
      console.log('decrypted banner data =>', decrypted.data);
      return decrypted.data;
    }

    console.warn(`[banner.service] Banner API returned unsuccessful status for slug '${slug}'.`);
    return null;
  } catch (error) {
    console.error(`[banner.service] Error calling banner API for slug '${slug}':`, error);
    return null;
  }
}
