import { getFAQBySlug } from "@/services/faq.service";
import React from "react";

export interface FaqItem {
  question?: string;
  q?: string;
  answer?: string;
  a?: string;
}

export interface QualificationFaqsProps {
  slug?: string;
  sectionData?: {
    status?: boolean;
    badge?: string;
    title?: string;
    faqs?: FaqItem[];
  };
  faqsToDisplay?: FaqItem[];
  fallbackBadge?: string;
  fallbackTitle?: string;
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: "Is this suitable for mature students?",
    answer: "Yes. Many providers assess adults through qualifications, work experience, motivation and English level."
  },
  {
    question: "Can YStudy help me choose between this and a degree?",
    answer: "Yes. We compare the route against Foundation Year, HND, Top-Up and full Bachelor's options."
  },
  {
    question: "Should I apply before checking funding?",
    answer: "No. Check eligibility first, especially if you studied before or need maintenance support."
  }
];

export async function QualificationFaqs({
  slug,
  sectionData,
  faqsToDisplay,
  fallbackBadge = "FAQ",
  fallbackTitle = "Frequently Asked Questions"
}: QualificationFaqsProps) {
  if (sectionData?.status === false) {
    return null;
  }

  let backendFaqs: FaqItem[] | null = faqsToDisplay || null;
  if (!backendFaqs && slug) {
    backendFaqs = await getFAQBySlug(slug);
  }

  const badge = sectionData?.badge || fallbackBadge;
  const title = sectionData?.title || fallbackTitle;
  const faqs = (backendFaqs && backendFaqs.length > 0)
    ? backendFaqs
    : (sectionData?.faqs && sectionData.faqs.length > 0 ? sectionData.faqs : DEFAULT_FAQS);

  return (
    <section className="qf-sec" style={{ background: "var(--soft)", textAlign: "left" }}>
      <div className="qf">
        <div className="qf-head">
          {badge && <span className="kicker">{badge}</span>}
          {title && <h2>{title}</h2>}
        </div>
        {faqs && faqs.length > 0 && (
          <div className="qf-faq">
            {faqs.map((faq, idx) => (
              <details key={idx} className="faqi" open={idx === 0}>
                <summary>{faq.question || faq.q}</summary>
                <p>{faq.answer || faq.a}</p>
              </details>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default QualificationFaqs;
