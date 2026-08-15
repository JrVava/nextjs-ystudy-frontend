import { decrypt } from "@/lib/crypto";
import api from "@/lib/api";

export interface GuideItem {
  _id?: string;
  title: string;
  subTitle: string;
  description: string;
  link: string;
  fullImageUrl?: string;
}

export async function getGuidesList(): Promise<GuideItem[] | null> {
  try {
    const res = await api.get("/frontend/guides/list");

    const json = res.data;
    if (!json || !json.data) {
      return null;
    }

    const decrypted = decrypt(json.data);
    if (decrypted && decrypted.success && decrypted.data) {
      return decrypted.data;
    }

    return null;
  } catch (error: any) {
    console.error(`[guide.service] Error calling Guide List API:`, error.message || error);
    return null;
  }
}
