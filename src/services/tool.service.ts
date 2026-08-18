import { decrypt } from "@/lib/crypto";
import api from "@/lib/api";

export interface ToolItem {
  _id: string;
  image: string;
  title: string;
  description: string;
  time: string;
  link: string;
  mode: "paid" | "free";
  status: boolean;
  fullImageUrl?: string;
}

export async function getToolsList(): Promise<ToolItem[] | null> {
  try {
    const res = await api.get("/frontend/tools");

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
    console.error(`[tool.service] Error calling Tool List API:`, error.message || error);
    return null;
  }
}
