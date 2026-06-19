import { SEARCH_INDEX } from "@/lib/navigation";
import type { SearchFilter, SearchResult } from "@/types";

function scoreEntry(
  query: string,
  title: string,
  description: string,
  keywords: string[]
): number {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return 0;

  const haystack = [title, description, ...keywords]
    .join(" ")
    .toLowerCase();

  if (title.toLowerCase().includes(normalized)) return 100;
  if (keywords.some((word) => word.includes(normalized))) return 80;
  if (haystack.includes(normalized)) return 60;

  const tokens = normalized.split(/\s+/).filter(Boolean);
  const tokenHits = tokens.filter((token) => haystack.includes(token)).length;
  return tokenHits * 20;
}

export function searchSite({
  query,
  category,
  limit = 12,
}: SearchFilter): SearchResult[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  return SEARCH_INDEX.map((entry) => ({
    title: entry.title,
    href: entry.href,
    category: entry.category,
    description: entry.description,
    score: scoreEntry(
      normalizedQuery,
      entry.title,
      entry.description,
      entry.keywords
    ),
  }))
    .filter((entry) => entry.score > 0)
    .filter((entry) => !category || entry.category === category)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, limit)
    .map(({ score: _score, ...entry }) => entry);
}

export function getPopularSearchLinks(): SearchResult[] {
  return SEARCH_INDEX.slice(0, 8).map(
    ({ title, href, category, description }) => ({
      title,
      href,
      category,
      description,
    })
  );
}
