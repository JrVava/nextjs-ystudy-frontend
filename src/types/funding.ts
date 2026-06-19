export type ResidencyStatus =
  | "british"
  | "settled"
  | "pre-settled"
  | "ilr"
  | "refugee"
  | "other"
  | "not-sure";

export type PreviousStudyLevel =
  | "none"
  | "incomplete"
  | "hnd-diphe"
  | "bachelor-plus"
  | "not-sure";

export type FundingEstimate = {
  label: string;
  maintenance: number;
  tuition: number;
  eligible: boolean;
  note: string;
  savedAt: string;
  source: string;
};

export type FundingProfile = {
  answers: Record<string, string>;
  savedAt: string;
};
