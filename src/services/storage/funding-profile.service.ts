import { STORAGE_KEYS } from "@/lib/constants";
import type { FundingEstimate, FundingProfile } from "@/types";
import { readJson, writeJson } from "./client-storage.service";

export function getFundingProfile(): FundingProfile | null {
  return readJson<FundingProfile | null>(STORAGE_KEYS.fundingProfile, null);
}

export function saveFundingProfile(profile: FundingProfile): FundingProfile {
  writeJson(STORAGE_KEYS.fundingProfile, profile);
  return profile;
}

export function getFundingEstimate(): FundingEstimate | null {
  return readJson<FundingEstimate | null>(STORAGE_KEYS.fundingEstimate, null);
}

export function saveFundingEstimate(estimate: FundingEstimate): FundingEstimate {
  writeJson(STORAGE_KEYS.fundingEstimate, estimate);
  return estimate;
}
