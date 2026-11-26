import { encrypt, decrypt } from "@/lib/crypto";
import api from "@/lib/api";

export type PartnerFormModule =
  | 'becomeAnAdviser'
  | 'influencers'
  | 'affiliatePartners'
  | 'business'
  | 'referAFriend'
  | string;

export type BecomeAnAdviserModule = PartnerFormModule;

export interface PartnerFormPayload {
  module?: PartnerFormModule;
  fullName: string;
  email: string;
  phone?: string;
  bestDescription?: string;
  audienceEnquiry?: string;
}

export type BecomeAnAdviserPayload = PartnerFormPayload;

export async function submitPartnerForm(
  payload: PartnerFormPayload
): Promise<{ success: boolean; message?: string; id?: string } | null> {
  try {
    const encryptedBody = encrypt(payload);
    const res = await api.post("/frontend/partner-form", { data: encryptedBody });

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
    console.error(`[partner.service] Error submitting partner form:`, error.message || error);
    throw error;
  }
}

// Backwards compatibility alias
export const submitBecomeAnAdviser = submitPartnerForm;
