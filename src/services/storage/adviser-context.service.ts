import { STORAGE_KEYS } from "@/lib/constants";
import type { AdviserContext } from "@/types";
import { readJson, writeJson } from "./client-storage.service";

export function getAdviserContext(): AdviserContext | null {
  return readJson<AdviserContext | null>(STORAGE_KEYS.adviserContext, null);
}

export function saveAdviserContext(context: AdviserContext): AdviserContext {
  writeJson(STORAGE_KEYS.adviserContext, context);
  return context;
}

export function clearAdviserContext(): void {
  writeJson(STORAGE_KEYS.adviserContext, null);
}
