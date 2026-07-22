import { encrypt, decrypt } from "@/lib/crypto";
import api from "@/lib/api";

export interface FAQItem {
  _id?: string;
  question: string;
  answer: string;
}

export interface FAQResponse {
  slug: string;
  faqs: FAQItem[];
}

export async function getFAQBySlug(slug: string): Promise<FAQItem[] | null> {
  if (!slug || typeof slug !== "string") {
    return null;
  }
  try {
    const encryptedBody = encrypt({ slug });
    const res = await api.post("/frontend/faqs", { data: encryptedBody });

    const json = res.data;
    if (!json || !json.data) {
      return null;
    }

    const decrypted = decrypt(json.data);
    if (decrypted && decrypted.success && decrypted.data?.faqs) {
      return decrypted.data.faqs;
    }

    return null;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      // FAQ not found in backend DB, will fallback to CMS section_6 faqs
      return null;
    }
    console.error(`[faq.service] Error calling FAQ API for slug '${slug}':`, error.message || error);
    return null;
  }
}
