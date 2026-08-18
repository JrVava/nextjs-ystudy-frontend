import { decrypt } from "@/lib/crypto";
import api from "@/lib/api";

export interface UpcomingIntakeItem {
  _id: string;
  year: string;
  month: string;
  subjectId: string;
  qualificationId: string;
  link: string;
  status: boolean;
}

export async function getUpcomingIntakesList(): Promise<UpcomingIntakeItem[] | null> {
  try {
    const res = await api.get("/frontend/upcoming-intakes");

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
    console.error(`[upcoming-intake.service] Error calling Upcoming Intake List API:`, error.message || error);
    return null;
  }
}
