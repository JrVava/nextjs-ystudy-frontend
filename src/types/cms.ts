export interface CMSPageData {
  _id?: string;
  page: string;
  updatedAt?: string;
  createdAt?: string;
  [sectionKey: string]: any; // Allow indexing sections e.g. data.section_2
}

export interface StatisticsItem {
  value: string;
  label: string;
}

export interface BadgeItem {
  value: string;
  class: string;
}

export interface TableRow {
  feature: string;
  with_ystudy: string;
  going_direct: string;
}

export interface StatusCardItem {
  code: string;
  badge: string;
  description: string;
}

export interface ProjectionCardItem {
  level: string;
  years: string;
  salary: string;
  description: string;
}

export interface TruthCardItem {
  title: string;
  description: string;
}

export interface SuccessStoryItem {
  image: string;
  fullImageUrl?: string;
  title: string;
  name: string;
  year: string;
}

export interface GuideNewsItem {
  badge: string;
  title: string;
  description: string;
  image: string;
  fullImageUrl?: string;
  time: string;
}

export interface JourneyStepItem {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  title: string;
  description: string;
}

export interface ReferCardItem {
  badge: string;
  title: string;
  description: string;
  image: string;
  fullImageUrl?: string;
}
