"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Banner } from "@/components/ui/Banner";
import { QualificationConversionCards, QualificationCrosslinks } from "@/components/ui";
import Link from "next/link";
import { CMSPageData } from "@/types/cms";

interface AdviserCallProps {
  data: CMSPageData;
}

export default function AdviserCall({ data }: AdviserCallProps) {
  const s2 = data.section_2 || {};
  const s3 = data.section_3 || {};
  const s4 = data.section_4 || {};
  const s5 = data.section_5 || {};
  const s6 = data.section_6 || {};
  const s7 = data.section_7 || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    contactMethod: "Phone",
    topic: "Not sure — I need guidance",
    preferredDay: "Any weekday",
    slot: "09:00",
    message: "",
    agree: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData({
      ...formData,
      [name]: val
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("You must agree to be contacted by YStudy.");
      return;
    }

    localStorage.setItem(
      "ystudy_adviser_call",
      JSON.stringify({
        savedAt: new Date().toISOString(),
        data: formData,
        source: "adviser-call"
      })
    );
    setSubmitted(true);
  };

  const defaultFaqs = [
    { title: "Is the call free?", description: "Yes. The adviser call is free." },
    { title: "How long is the call?", description: "Usually around 15 minutes." },
    { title: "Can I use WhatsApp?", description: "Yes. Choose WhatsApp as your preferred contact method." },
    { title: "Do I need documents ready?", description: "No. If documents are needed, the adviser will explain what to prepare." }
  ];

  const faqs = s5.cards || defaultFaqs;

  return (
    <div className="adviser-call-page">
      {/* HERO SECTION */}
      <Banner
        slug="adviser-call"
        fallbackBadgeText="Book a free call"
        fallbackTitle="Speak with a student adviser."
        fallbackDescription="Choose a time that works for you and discuss your degree, funding and next steps."
        fallbackBgImage="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2200&q=85"
        isGuideHero={true}
        fallbackRightCard={{
          layoutType: "guide-hero",
          title: "Your next step, organised",
          description: "Clear, practical support before the next decision.",
          items: [
            { title: "Free", subtitle: "guidance" },
            { title: "Docs", subtitle: "check" },
            { title: "SFE", subtitle: "support" }
          ]
        }}
      >
        <div className="btnrow" style={{ marginTop: "18px" }}>
          <a className="btn btn-orange" href="#form">Book call</a>
          <Link className="btn btn-white" href="/lead/adviser-call">Book adviser call</Link>
        </div>
      </Banner>

      {/* CALL OPTIONS */}
      {s2.status !== false && (
        <section className="v705-sec">
          <div className="v705-wrap">
            <div className="v705-head">
              <span className="kicker">{s2.badge || "Call options"}</span>
              <h2>{s2.title || "Choose the right call for your situation."}</h2>
              <p>{s2.description || "Short, focused and practical. You should finish the call knowing what to do next."}</p>
            </div>
            <div className="v705-grid">
              {(s2.cards || []).map((card: any, idx: number) => (
                <div className="v705-card" key={idx}>
                  {card.number && <div className="v705-num">{card.number}</div>}
                  {card.icon && <div className="v705-icon" style={{ fontSize: "28px", fontWeight: "bold" }}>{card.icon}</div>}
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OUTCOMES */}
      {s3.status !== false && (
        <section className="v705-sec v705-soft">
          <div className="v705-wrap">
            <div className="v705-head">
              <span className="kicker">{s3.badge || "Outcomes"}</span>
              <h2>{s3.title || "What you should know after the call."}</h2>
            </div>
            <div className="v705-grid four">
              {(s3.cards || []).map((card: any, idx: number) => (
                <div className="v705-card" key={idx}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BOOKING FORM */}
      <span className="anchor-target" id="form"></span>
      <section className="form-first" id="booking-form">
        <div className="container">
          <div className="form-card">
            <h2>Request your call</h2>
            <p className="intro">Tell us when you prefer to be contacted. We will confirm your appointment by WhatsApp, phone or email.</p>
            
            <form className="ystudy-form" onSubmit={handleSubmit}>
              <label>
                Name *
                <input
                  name="name"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
              
              <label>
                Email *
                <input
                  name="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              
              <label>
                Phone / WhatsApp *
                <input
                  name="phone"
                  placeholder="07XXX XXX XXX"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </label>
              
              <label>
                Preferred contact method
                <select
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleChange}
                >
                  <option value="Phone">Phone</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Teams / video call">Teams / video call</option>
                  <option value="Email first">Email first</option>
                </select>
              </label>
              
              <label>
                Topic
                <select
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                >
                  <option value="Not sure — I need guidance">Not sure — I need guidance</option>
                  <option value="Funding">Funding</option>
                  <option value="Degree choice">Degree choice</option>
                  <option value="Eligibility">Eligibility</option>
                  <option value="Application support">Application support</option>
                  <option value="English interview confidence">English interview confidence</option>
                </select>
              </label>
              
              <label>
                Preferred day
                <select
                  name="preferredDay"
                  value={formData.preferredDay}
                  onChange={handleChange}
                >
                  <option value="Any weekday">Any weekday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </select>
              </label>

              <div className="full">
                <b>Preferred time slot</b>
                <div className="slot-grid" style={{ marginTop: "10px" }}>
                  {["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "17:00", "18:00"].map((time) => (
                    <label key={time}>
                      <input
                        type="radio"
                        name="slot"
                        value={time}
                        checked={formData.slot === time}
                        onChange={handleChange}
                      />
                      <span>{time}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="full">
                What would you like to discuss?
                <textarea
                  name="message"
                  placeholder="Course choice, funding, documents, English interview, application questions..."
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </label>

              <label className="full legal-check">
                <input
                  type="checkbox"
                  name="agree"
                  required
                  checked={formData.agree}
                  onChange={handleChange}
                />
                <span>I agree to be contacted by YStudy about this adviser call request.</span>
              </label>

              <button className="btn btn-orange full" type="submit">Request call →</button>
            </form>

            {submitted && (
              <div className="success-box show" id="callSuccess" style={{ display: "block", marginTop: "16px", padding: "12px", background: "#e6f4ea", color: "#137333", borderRadius: "8px", fontWeight: "bold" }}>
                Call request saved. We will confirm your appointment by WhatsApp, phone or email.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* AFTER FORM SECTION */}
      {s4.status !== false && (
        <section className="after-form">
          <div className="container after-grid">
            <div className="next-card">
              <span className="kicker">{s4.badge || "What happens next"}</span>
              <h2>{s4.title || "After you request the call"}</h2>
              <div className="next-steps">
                {(s4.cards || []).map((step: any, idx: number) => (
                  <div key={idx}>
                    <p>
                      <b>{step.title}</b>
                      <br />
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="faq-card">
              <span className="kicker">FAQ</span>
              <h2>Quick questions</h2>
              {faqs.map((faq: any, idx: number) => (
                <details key={idx} open={idx === 0}>
                  <summary>{faq.title}</summary>
                  <p>{faq.description}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONVERSION SYSTEM */}
      <QualificationConversionCards sectionData={s6} />

      {/* CROSSLINKS SECTION */}
      <QualificationCrosslinks sectionData={s7} />
    </div>
  );
}
