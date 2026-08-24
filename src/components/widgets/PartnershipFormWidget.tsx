"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface SideItem {
  title: string;
  description: string;
}

export interface PartnershipFormWidgetProps {
  workflow: string;
  kicker: string;
  title: string;
  description: string;
  submitText: string;
  sideKicker: string;
  sideTitle: string;
  sideItems: SideItem[];
}

export default function PartnershipFormWidget({
  workflow,
  kicker,
  title,
  description,
  submitText,
  sideKicker,
  sideTitle,
  sideItems
}: PartnershipFormWidgetProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Student adviser",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (e.target.required && e.target.value.trim()) {
      setErrors({
        ...errors,
        [e.target.name]: false
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation check
    const newErrors: Record<string, boolean> = {};
    let hasError = false;

    if (!formData.name.trim()) {
      newErrors.name = true;
      hasError = true;
    }
    if (!formData.email.trim()) {
      newErrors.email = true;
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      alert("Please complete the required fields first.");
      return;
    }

    // Save to localStorage
    const key = "ystudyWorkflowSubmissions";
    let list = [];
    try {
      list = JSON.parse(localStorage.getItem(key) || "[]");
    } catch (err) {
      console.error("Failed to parse submissions list from localStorage", err);
    }

    list.unshift({
      type: workflow,
      date: new Date().toISOString(),
      data: formData
    });

    try {
      localStorage.setItem(key, JSON.stringify(list.slice(0, 20)));
    } catch (err) {
      console.error("Failed to save submission to localStorage", err);
    }

    setSubmitted(true);
  };

  return (
    <section className="workflow-section" id="enquiry-form">
      <div className="container">
        <div className="workflow-grid">
          <div className="workflow-card">
            <span className="kicker" style={{ color: "#ff8b3d" }}>{kicker}</span>
            <h2>{title}</h2>
            <p>{description}</p>

            <form className="workflow-form" onSubmit={handleSubmit}>
              <div className="field">
                <label>Full name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ borderColor: errors.name ? "#ef4444" : undefined }}
                />
              </div>
              <div className="field">
                <label>Email *</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ borderColor: errors.email ? "#ef4444" : undefined }}
                />
              </div>
              <div className="field">
                <label>Phone / WhatsApp</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label>Best description</label>
                <select name="type" value={formData.type} onChange={handleChange}>
                  <option value="Student adviser">Student adviser</option>
                  <option value="Creator / influencer">Creator / influencer</option>
                  <option value="Affiliate website">Affiliate website</option>
                  <option value="Business partner">Business partner</option>
                  <option value="University / provider">University / provider</option>
                  <option value="Refer a friend">Refer a friend</option>
                </select>
              </div>
              <div className="field full">
                <label>Tell us about your audience / enquiry</label>
                <textarea
                  name="message"
                  placeholder="Your community, website, social audience, business or referral idea..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="workflow-actions">
                <button className="btn btn-orange" type="submit">
                  {submitText}
                </button>
                <Link className="btn btn-white" href="/lead/adviser-call">
                  Book discovery call
                </Link>
              </div>
            </form>

            {submitted && (
              <div className="workflow-success show" style={{ marginTop: "16px", padding: "12px", background: "#e6f4ea", color: "#137333", borderRadius: "8px", fontWeight: "bold" }}>
                ✓ Enquiry saved. In production this should go to the partnerships team.
              </div>
            )}
          </div>

          <div className="workflow-card dark">
            <span className="kicker" style={{ color: "#ffb17a" }}>{sideKicker}</span>
            <h2>{sideTitle}</h2>
            <div className="workflow-side-list">
              {sideItems.map((item, idx) => (
                <div key={idx}>
                  <b>{item.title}</b>
                  <span>{item.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
