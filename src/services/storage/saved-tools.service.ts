import { STORAGE_KEYS, STORAGE_LIMITS } from "@/lib/constants";
import type { SavedToolResult } from "@/types";
import { readJson, writeJson } from "./client-storage.service";

export function getSavedTools(): SavedToolResult[] {
  return readJson<SavedToolResult[]>(STORAGE_KEYS.savedTools, []);
}

export function saveToolResult(result: SavedToolResult): SavedToolResult[] {
  const existing = getSavedTools();
  const next = [result, ...existing].slice(0, STORAGE_LIMITS.maxSavedTools);
  writeJson(STORAGE_KEYS.savedTools, next);
  return next;
}

export function clearSavedTools(): void {
  writeJson(STORAGE_KEYS.savedTools, []);
}
