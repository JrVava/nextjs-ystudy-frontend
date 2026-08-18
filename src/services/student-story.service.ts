import { decrypt } from "@/lib/crypto";
import api from "@/lib/api";

export interface StudentStoryItem {
  _id: string;
  badge?: string;
  star: number;
  description: string;
  name: string;
  age?: number;
  subject?: string;
  year?: string;
  status: boolean;
}

export async function getStudentStoriesList(): Promise<StudentStoryItem[] | null> {
  try {
    const res = await api.get("/frontend/student-stories");

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
    console.error(`[student-story.service] Error calling Student Story List API:`, error.message || error);
    return null;
  }
}
