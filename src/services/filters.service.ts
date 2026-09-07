import api from "@/lib/api";
import { decrypt } from "@/lib/crypto";

export interface FilterItem {
  _id: string;
  title: string;
}

async function fetchAndDecryptFilter(endpoint: string): Promise<FilterItem[]> {
  try {
    const res = await api.get(endpoint);
    const json = res.data;
    if (json && json.data) {
      const decrypted = decrypt(json.data);
      if (decrypted && decrypted.success && decrypted.data) {
        return decrypted.data;
      }
    }
    return [];
  } catch (error) {
    console.error(`[filters.service] Failed to fetch filters from ${endpoint}:`, error);
    return [];
  }
}

export function getSubjects(pageSize?: number): Promise<FilterItem[]> {
  const url = pageSize ? `/frontend/subject?pageSize=${pageSize}` : "/frontend/subject";
  return fetchAndDecryptFilter(url);
}

export function getQualifications(): Promise<FilterItem[]> {
  return fetchAndDecryptFilter("/frontend/qualifications");
}

export function getModes(): Promise<FilterItem[]> {
  return fetchAndDecryptFilter("/frontend/modes");
}

export function getDurations(): Promise<FilterItem[]> {
  return fetchAndDecryptFilter("/frontend/durations");
}

export function getFundings(): Promise<FilterItem[]> {
  return fetchAndDecryptFilter("/frontend/fundings");
}

export function getLocations(): Promise<FilterItem[]> {
  return fetchAndDecryptFilter("/frontend/locations");
}
