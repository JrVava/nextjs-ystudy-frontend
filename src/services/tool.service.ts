import { encrypt, decrypt } from "@/lib/crypto";
import api from "@/lib/api";

export interface ToolItem {
  _id: string;
  image: string;
  title: string;
  description: string;
  time: string;
  link: string;
  btnLabel?: string;
  badge?: string;
  mode: "paid" | "free";
  status: boolean;
  fullImageUrl?: string;
}

export interface DegreeMatchPayload {
  residencyStatus?: string;
  highestQualification?: string;
  subjectsInterest?: string;
  study?: string;
  salaryLevel?: string;
  situation?: string;
  ageRange?: string;
  languageConfident?: string;
  HouseholdIncome?: string;
  career?: string;
  responsibilities?: string;
  firstName?: string;
  email?: string;
  phone?: string;
  bestTimeToCall?: string;
  is_agree?: boolean;
}

export interface EligibilityCheckerPayload {
  residencyStatus?: string;
  studiedBefore?: string;
  study?: string;
  household?: string;
  firstName?: string;
  email?: string;
  phone?: string;
  bestTimeToCall?: string;
  is_agree?: boolean;
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

export async function submitDegreeMatch(
  payload: DegreeMatchPayload
): Promise<{ success: boolean; message?: string; id?: string } | null> {
  try {
    const encryptedBody = encrypt(payload);
    const res = await api.post("/frontend/degree-match", { data: encryptedBody });

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
    console.error(`[tool.service] Error submitting degree match:`, error.message || error);
    throw error;
  }
}

export async function submitEligibilityChecker(
  payload: EligibilityCheckerPayload
): Promise<{ success: boolean; message?: string; id?: string } | null> {
  try {
    const encryptedBody = encrypt(payload);
    const res = await api.post("/frontend/eligibility-checker", { data: encryptedBody });

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
    console.error(`[tool.service] Error submitting eligibility checker:`, error.message || error);
    throw error;
  }
}
