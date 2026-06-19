import type { ApplyDraft } from "./forms";
import type { FundingEstimate, FundingProfile } from "./funding";
import type { SavedToolResult } from "./tools";

export type AdviserContext = SavedToolResult;

export type StorageSchema = {
  savedTools: SavedToolResult[];
  fundingProfile: FundingProfile | null;
  fundingEstimate: FundingEstimate | null;
  adviserContext: AdviserContext | null;
  applyDraft: ApplyDraft | null;
};

export type StorageKey = keyof typeof import("@/lib/constants/storage-keys").STORAGE_KEYS;
