export type ApplyFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location?: string;
  residency?: string;
  studyInterest?: string;
  message?: string;
};

export type LeadCaptureData = {
  firstName: string;
  email: string;
  phone?: string;
  callTime?: string;
  message?: string;
  consent: boolean;
};

export type PartnerApplicationData = {
  name: string;
  email: string;
  phone?: string;
  organisation?: string;
  message?: string;
};

export type ApplyDraft = {
  savedAt: string;
  data: ApplyFormData;
  source: string;
};
