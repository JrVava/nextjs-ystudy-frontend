import { encrypt, decrypt } from "@/lib/crypto";
import api from "@/lib/api";

export interface AdviserCallPayload {
  name: string;
  email: string;
  phone: string;
  contactMethod?: string;
  topic?: string;
  preferredDay?: string;
  preferredTimeSlot?: string;
  discuss?: string;
  is_agree?: boolean;
}

export async function submitAdviserCall(
  payload: AdviserCallPayload
): Promise<{ success: boolean; message?: string; id?: string } | null> {
  try {
    const encryptedBody = encrypt(payload);
    const res = await api.post("/frontend/adviser-call", { data: encryptedBody });

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
    console.error(`[adviser.service] Error submitting adviser call:`, error.message || error);
    throw error;
  }
}
