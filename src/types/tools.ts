export type ToolSlug =
  | "eligibility-checker"
  | "degree-match"
  | "career-quiz"
  | "finance-calculator"
  | "student-finance-calculator"
  | "loan-repayment-calculator"
  | "salary-checker"
  | "english-level-checker"
  | "cv-builder"
  | "personal-statement-calculator";

export type ToolType =
  | "eligibility"
  | "degree"
  | "career"
  | "funding"
  | "salary"
  | "english"
  | "cv"
  | "statement"
  | "tool";

export type SavedToolResult = {
  type: ToolType;
  title: string;
  summary: string;
  url: string;
  savedAt: string;
  extra?: Record<string, unknown>;
};

export type WizardStep = {
  id: string;
  title: string;
  description?: string;
};
