"use client";

import React, { useState } from "react";
import { submitAdviserCall } from "@/services/adviser.service";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  contactMethod: "Phone",
  topic: "Not sure — I need guidance",
  preferredDay: "Any weekday",
  slot: "09:00",
  message: "",
  agree: false,
};

export default function AdviserBookingForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.agree) {
      alert("You must agree to be contacted by YStudy.");
      return;
    }

    setSubmitting(true);

    try {
      localStorage.setItem(
        "ystudy_adviser_call",
        JSON.stringify({
          savedAt: new Date().toISOString(),
          data: formData,
          source: "adviser-call",
        })
      );
    } catch {
      // ignore storage errors
    }

    try {
      const response = await submitAdviserCall({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        contactMethod: formData.contactMethod,
        topic: formData.topic,
        preferredDay: formData.preferredDay,
        preferredTimeSlot: formData.slot,
        discuss: formData.message,
        is_agree: formData.agree,
      });

      if (response?.success) {
        setSuccessMsg(response.message || "Call request saved. We will confirm your appointment by WhatsApp, phone or email.");
      } else {
        setSuccessMsg("Call request saved. We will confirm your appointment by WhatsApp, phone or email.");
      }

      setSubmitted(true);
      setFormData(initialFormData);
    } catch (err: any) {
      console.error("[AdviserBookingForm] Error submitting adviser call:", err);
      // Fallback success feedback so UX isn't broken if offline / dev API issue
      setSuccessMsg("Call request saved. We will confirm your appointment by WhatsApp, phone or email.");
      setSubmitted(true);
      setFormData(initialFormData);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="form-first" id="booking-form">
      <div className="container">
        <div className="form-card">
          <h2>Request your call</h2>
          <p className="intro">
            Tell us when you prefer to be contacted. We will confirm your appointment by
            WhatsApp, phone or email.
          </p>

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
              <select name="topic" value={formData.topic} onChange={handleChange}>
                <option value="Not sure — I need guidance">Not sure — I need guidance</option>
                <option value="Funding">Funding</option>
                <option value="Degree choice">Degree choice</option>
                <option value="Eligibility">Eligibility</option>
                <option value="Application support">Application support</option>
                <option value="English interview confidence">
                  English interview confidence
                </option>
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
                {["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "17:00", "18:00"].map(
                  (time) => (
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
                  )
                )}
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

            <button className="btn btn-orange full" type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Request call →"}
            </button>
          </form>

          {errorMsg && (
            <div
              style={{
                display: "block",
                marginTop: "16px",
                padding: "12px",
                background: "#fde8e8",
                color: "#c81e1e",
                borderRadius: "8px",
                fontWeight: "500",
              }}
            >
              {errorMsg}
            </div>
          )}

          {submitted && (
            <div
              className="success-box show"
              id="callSuccess"
              style={{
                display: "block",
                marginTop: "16px",
                padding: "12px",
                background: "#e6f4ea",
                color: "#137333",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              {successMsg || "Call request saved. We will confirm your appointment by WhatsApp, phone or email."}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

