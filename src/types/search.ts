export type SearchResult = {
  title: string;
  href: string;
  category: string;
  description: string;
  score?: number;
};

export type SearchFilter = {
  query: string;
  category?: string;
  limit?: number;
};
