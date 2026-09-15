import { getFAQBySlug } from "@/services/faq.service";
import React from "react";

export interface FaqItem {
  question?: string;
  q?: string;
  title?: string;
  answer?: string;
  a?: string;
  description?: string;
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
    : (sectionData?.faqs && sectionData.faqs.length > 0 ? sectionData.faqs : []);

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="v705-sec">
      <div className="v705-wrap v705-faq">
        <div className="v705-head">
          {badge && <span className="kicker">{badge}</span>}
          {title && <h2>{title}</h2>}
        </div>
        {faqs.map((faq, idx) => (
          <details key={idx} open={idx === 0}>
            <summary>{faq.question || faq.q || faq.title}</summary>
            <p>{faq.answer || faq.a || faq.description}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default QualificationFaqs;
