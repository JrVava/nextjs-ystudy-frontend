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
    layoutType: 'stacked-cards' | 'stats-highlight' | 'grid-2x2' | 'list-items';
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
    console.log('api ===========>', `${API_URL}/frontend/banners/${slug}`);

    const res = await fetch(`${API_URL}/frontend/banners/${slug}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
      console.warn(`[banner.service] Failed to fetch banner for slug '${slug}'. Status: ${res.status}`);
      return null;
    }

    const json = await res.json();
    if (json && json.success && json.data) {
      console.log('json.data =>', json.data);

      return json.data;
    }

    console.warn(`[banner.service] Banner API returned unsuccessful status for slug '${slug}'.`);
    return null;
  } catch (error) {
    console.error(`[banner.service] Error calling banner API for slug '${slug}':`, error);
    return null;
  }
}
