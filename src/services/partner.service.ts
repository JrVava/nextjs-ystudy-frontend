import { encrypt, decrypt } from "@/lib/crypto";
import api from "@/lib/api";

export interface BecomeAnAdviserPayload {
  fullName: string;
  email: string;
  phone?: string;
  bestDescription?: string;
  audienceEnquiry?: string;
}

export async function submitBecomeAnAdviser(
  payload: BecomeAnAdviserPayload
): Promise<{ success: boolean; message?: string; id?: string } | null> {
  try {
    const encryptedBody = encrypt(payload);
    const res = await api.post("/frontend/become-an-adviser", { data: encryptedBody });

    const json = res.data;
    if (!json || !json.data) {
      return null;
    }

    const decrypted = decrypt(json.data);
    if (decrypted && decrypted.success) {
      return decrypted;
    }

    return decrypted || null;
  } catch (error: any) {
    console.error(`[partner.service] Error submitting become an adviser enquiry:`, error.message || error);
    throw error;
  }
}
