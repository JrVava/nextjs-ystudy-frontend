import { STORAGE_KEYS } from "@/lib/constants";
import type { ApplyDraft } from "@/types";
import { readJson, writeJson } from "./client-storage.service";

export function getApplyDraft(): ApplyDraft | null {
  return readJson<ApplyDraft | null>(STORAGE_KEYS.applyDraft, null);
}

export function saveApplyDraft(draft: ApplyDraft): ApplyDraft {
  writeJson(STORAGE_KEYS.applyDraft, draft);
  return draft;
}

export function clearApplyDraft(): void {
  writeJson(STORAGE_KEYS.applyDraft, null);
}
