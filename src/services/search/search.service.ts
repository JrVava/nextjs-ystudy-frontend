import { encrypt, decrypt } from "@/lib/crypto";
import api from "@/lib/api";

export interface SearchResultItem {
  module: "Course" | "Subject" | "Tools" | string;
  title: string;
  description: string;
  link: string;
}

export async function searchFrontend(
  query: string,
  type: string = "all"
): Promise<SearchResultItem[]> {
  const trimmed = query.trim();
  if (trimmed.length < 3) return [];

  try {
    const encryptedBody = encrypt({ search: trimmed, type });
    const res = await api.post("/frontend/search", { data: encryptedBody });

    const json = res.data;
    if (!json || !json.data) {
      return [];
    }

    const decrypted = decrypt(json.data);
    if (decrypted && decrypted.success && Array.isArray(decrypted.data?.combined)) {
      return decrypted.data.combined;
    }

    return [];
  } catch (error: any) {
    console.error("[search.service] Error calling frontend search API:", error?.message || error);
    return [];
  }
}

