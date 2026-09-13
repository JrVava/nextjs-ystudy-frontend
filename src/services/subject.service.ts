import api from "@/lib/api";
import { decrypt } from "@/lib/crypto";

export async function getSubjectBySlug(slug: string): Promise<any | null> {
  if (!slug) return null;
  try {
    const res = await api.get(`/frontend/subject/get-subject/${slug}`);
    const json = res?.data;
    if (json && json.data) {
      const decrypted = decrypt(json.data);
      if (decrypted && decrypted.success && decrypted.data) {
        return decrypted.data;
      }
    }
  } catch (error: any) {
    console.warn(`[subject.service] Error fetching subject slug '${slug}':`, error.message || error);
  }
  return null;
}
