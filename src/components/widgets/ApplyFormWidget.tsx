"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import { encrypt, decrypt } from "@/lib/crypto";

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

const fallbackFields: FormField[] = [
  { name: "firstName", label: "First Name", type: "text", placeholder: "e.g. Sarah", required: true },
  { name: "lastName", label: "Last Name", type: "text", placeholder: "e.g. Smith", required: true },
  { name: "email", label: "Email Address", type: "email", placeholder: "you@example.com", required: true },
  { name: "phone", label: "Phone / WhatsApp", type: "text", placeholder: "07XXX XXX XXX", required: true },
  { name: "location", label: "Where do you live in the UK?", type: "text", placeholder: "e.g. London", required: true },
  {
    name: "residency",
    label: "What is your residency status?",
    type: "select",
    required: true,
    options: [
      "Not sure",
      "British citizen",
      "EU Settled Status",
      "EU Pre-Settled Status",
      "Indefinite Leave to Remain",
      "Refugee status",
      "Other"
    ]
  },
  {
    name: "qualification",
    label: "Highest qualification you hold?",
    type: "select",
    required: true,
    options: [
      "Not sure",
      "GCSE / school qualifications",
      "Level 3 / A Level / BTEC",
      "Access Course",
      "HNC / HND",
      "Bachelor's degree",
      "Foreign qualification",
      "No formal qualifications"
    ]
  },
  {
    name: "subject",
    label: "Which subject interests you?",
    type: "select",
    required: true,
    options: [
      "Not sure — I need advice",
      "Business Management",
      "Computing / IT",
      "Cyber Security",
      "Health & Social Care",
      "Construction Management",
      "Psychology",
      "Law",
      "Marketing"
    ]
  },
  {
    name: "callTime",
    label: "Best time for a free advisory call?",
    type: "select",
    required: true,
    options: ["Anytime 9am–7pm", "Morning", "Afternoon", "Evening", "WhatsApp first"]
  },
  {
    name: "contactMethod",
    label: "Preferred contact method?",
    type: "select",
    required: true,
    options: ["Phone", "WhatsApp", "Email first"]
  },
  { name: "notes", label: "Anything else you want to tell us?", type: "textarea", placeholder: "e.g. Previous study details, specific concerns..." },
  {
    name: "legalCheck",
    label: "I agree to be contacted by YStudy about eligible courses and student finance support.",
    type: "checkbox",
    required: true
  }
];

export function ApplyFormWidget() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFormConfig() {
      try {
        const res = await api.post("/frontend/dynamic-forms/config");
        if (res.data && res.data.data) {
          const decrypted = decrypt(res.data.data);
          if (decrypted && decrypted.success && decrypted.data && Array.isArray(decrypted.data.fields)) {
            setFields(decrypted.data.fields);
            return;
          }
        }
        setFields(fallbackFields);
      } catch (err: any) {
        console.warn("[ApplyFormWidget] Failed to fetch dynamic form config. Using fallbacks.", err.message || err);
        setFields(fallbackFields);
      } finally {
        setLoading(false);
      }
    }
    fetchFormConfig();
  }, []);

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    // Validate required fields
    for (const f of fields) {
      if (f.required && !formData[f.name]) {
        setErrorMsg(`Please fill in all required fields: ${f.label}`);
        setSubmitting(false);
        return;
      }
    }

    try {
      const encryptedPayload = encrypt({ formData });
      const res = await api.post("/frontend/dynamic-forms/submit", { data: encryptedPayload });
      
      let success = false;
      if (res.data && res.data.data) {
        const decrypted = decrypt(res.data.data);
        if (decrypted && decrypted.success) {
          success = true;
        }
      }

      // Fallback success if API response resolves
      if (res.status === 200) {
        success = true;
      }

      if (success) {
        // Save to localStorage for CSV compatibility
        if (typeof window !== "undefined") {
          const existing = localStorage.getItem("ystudy_apply_logs");
          const logs = existing ? JSON.parse(existing) : [];
          logs.push({
            id: Math.random().toString(36).substring(2, 9),
            timestamp: new Date().toISOString(),
            formData
          });
          localStorage.setItem("ystudy_apply_logs", JSON.stringify(logs));
          localStorage.setItem("ystudy_apply", JSON.stringify({
            savedAt: new Date().toISOString(),
            data: formData,
            source: "apply"
          }));
        }
        setSubmitted(true);
      } else {
        setErrorMsg("Submission was not successful. Please try again.");
      }
    } catch (err: any) {
      console.error("[ApplyFormWidget] Submission error:", err.message || err);
      setErrorMsg("Failed to connect to the server. Please check your internet connection.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
        <div className="loader" style={{ border: "4px solid var(--soft)", borderTop: "4px solid var(--b)", borderRadius: "50%", width: "40px", height: "40px", animation: "spin 1s linear infinite" }}></div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="apply-success-panel" style={{ textAlign: "center", padding: "3rem", background: "var(--soft)", borderRadius: "16px", marginTop: "20px" }}>
        <span style={{ fontSize: "4rem" }}>🎉</span>
        <h2 style={{ fontSize: "2rem", fontWeight: 800, marginTop: "1rem", color: "var(--b)" }}>Application Received!</h2>
        <p style={{ marginTop: "1rem", fontSize: "1.1rem", color: "var(--muted)", maxWidth: "500px", margin: "1rem auto" }}>
          We have saved your details. A professional YStudy adviser will review your qualifications and contact you shortly.
        </p>
        <div style={{ marginTop: "2rem", display: "flex", gap: "12px", justifyContent: "center" }}>
          <a href="/" className="btn btn-blue">Go to Home</a>
          <a href="/tools/eligibility-checker" className="btn btn-orange">Check eligibility</a>
        </div>
      </div>
    );
  }

  return (
    <div className="apply-form-container" style={{ background: "#fff", padding: "2rem", borderRadius: "16px", border: "1px solid var(--border)", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
      {errorMsg && (
        <div style={{ padding: "1rem", background: "#fdf0f0", color: "#d93838", borderRadius: "8px", marginBottom: "1.5rem", fontWeight: 600 }}>
          ⚠️ {errorMsg}
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div className="form-fields-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          {fields.map((f) => {
            const isFullWidth = f.type === "textarea" || f.type === "checkbox" || f.name === "email" || f.name === "location";
            return (
              <div
                key={f.name}
                style={{
                  gridColumn: isFullWidth ? "span 2" : "span 1",
                  display: "flex",
                  flexDirection: f.type === "checkbox" ? "row" : "column",
                  alignItems: f.type === "checkbox" ? "flex-start" : "stretch",
                  gap: f.type === "checkbox" ? "8px" : "6px"
                }}
              >
                {f.type !== "checkbox" && (
                  <label htmlFor={f.name} style={{ fontWeight: 700, fontSize: "14px", color: "var(--dark)" }}>
                    {f.label} {f.required && <span style={{ color: "#d93838" }}>*</span>}
                  </label>
                )}

                {f.type === "text" && (
                  <input
                    id={f.name}
                    type="text"
                    placeholder={f.placeholder}
                    required={f.required}
                    value={formData[f.name] || ""}
                    onChange={(e) => handleInputChange(f.name, e.target.value)}
                    style={{ padding: "12px", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "15px" }}
                  />
                )}

                {f.type === "email" && (
                  <input
                    id={f.name}
                    type="email"
                    placeholder={f.placeholder}
                    required={f.required}
                    value={formData[f.name] || ""}
                    onChange={(e) => handleInputChange(f.name, e.target.value)}
                    style={{ padding: "12px", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "15px" }}
                  />
                )}

                {f.type === "select" && (
                  <select
                    id={f.name}
                    required={f.required}
                    value={formData[f.name] || ""}
                    onChange={(e) => handleInputChange(f.name, e.target.value)}
                    style={{ padding: "12px", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "15px", background: "#fff", cursor: "pointer" }}
                  >
                    <option value="">Select option...</option>
                    {f.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}

                {f.type === "textarea" && (
                  <textarea
                    id={f.name}
                    placeholder={f.placeholder}
                    required={f.required}
                    value={formData[f.name] || ""}
                    onChange={(e) => handleInputChange(f.name, e.target.value)}
                    rows={4}
                    style={{ padding: "12px", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "15px", fontFamily: "inherit", resize: "vertical" }}
                  />
                )}

                {f.type === "checkbox" && (
                  <>
                    <input
                      id={f.name}
                      type="checkbox"
                      required={f.required}
                      checked={!!formData[f.name]}
                      onChange={(e) => handleInputChange(f.name, e.target.checked)}
                      style={{ marginTop: "4px", width: "16px", height: "16px", cursor: "pointer" }}
                    />
                    <label htmlFor={f.name} style={{ fontSize: "13.5px", color: "var(--muted)", cursor: "pointer", userSelect: "none" }}>
                      {f.label} {f.required && <span style={{ color: "#d93838" }}>*</span>}
                    </label>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn btn-orange"
          style={{ padding: "14px", fontSize: "16px", fontWeight: 800, width: "100%", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50px" }}
        >
          {submitting ? (
            <div className="loader" style={{ border: "2px solid #fff", borderTop: "2px solid transparent", borderRadius: "50%", width: "18px", height: "18px", animation: "spin 1s linear infinite" }}></div>
          ) : (
            "Submit Application →"
          )}
        </button>
      </form>
    </div>
  );
}

export default ApplyFormWidget;
