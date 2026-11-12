import api from "@/lib/api";
import { decrypt } from "@/lib/crypto";
import { BackendCourse } from "@/types/course";

export interface LocationItem {
  _id: string;
  title: string;
  slug?: string;
  short_description?: string;
  long_description?: string;
  badge?: string;
  tags?: string[];
  image?: string;
  fullImageUrl?: string;
}

export async function getCoursesByLocationId(locationId: string): Promise<BackendCourse[]> {
  if (!locationId) return [];
  try {
    let res;
    try {
      res = await api.get(`/frontend/locations/courses/${encodeURIComponent(locationId)}`);
    } catch (err: any) {
      if (err?.response?.status === 404) {
        // Fallback to singular endpoint if mounted under /frontend/location
        try {
          res = await api.get(`/frontend/location/courses/${encodeURIComponent(locationId)}`);
        } catch (innerErr: any) {
          if (innerErr?.response?.status === 404) {
            return [];
          }
          throw innerErr;
        }
      } else {
        throw err;
      }
    }

    const json = res?.data;
    if (json && json.data) {
      const decrypted = decrypt(json.data);
      if (decrypted && decrypted.success && Array.isArray(decrypted.data)) {
        return decrypted.data;
      }
    }
    return [];
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return [];
    }
    console.error(`[location.service] Failed to fetch courses for location ${locationId}:`, error?.message || error);
    return [];
  }
}

export async function getFrontendLocations(): Promise<LocationItem[]> {
  try {
    let res;
    try {
      res = await api.get("/frontend/locations");
    } catch (err: any) {
      if (err?.response?.status === 404) {
        res = await api.get("/frontend/location");
      } else {
        throw err;
      }
    }

    const json = res?.data;
    if (json && json.data) {
      const decrypted = decrypt(json.data);
      if (decrypted && decrypted.success && Array.isArray(decrypted.data)) {
        return decrypted.data;
      }
    }
    return [];
  } catch (error: any) {
    console.error("[location.service] Failed to fetch locations:", error?.message || error);
    return [];
  }
}

