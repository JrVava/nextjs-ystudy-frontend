"use client";

import { useState } from "react";
import Link from "next/link";
import { forgotPassword } from "@/services/auth.service";
import "@/styles/auth.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await forgotPassword(email);
      if (response.success) {
        setSuccess(response.message || "If an account with that email exists, we have sent a password reset link.");
      } else {
        setError(response.message || "Failed to process request");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-brand">
            <img src="/assets/ystudy-logo.png" alt="YStudy Logo" className="auth-logo" />
            <span className="auth-brand-text">YStudy</span>
          </div>
          <h1>Reset Password</h1>
          <p>Enter your email to receive a password reset link</p>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading || !!success}
            />
          </div>
          <button type="submit" className="auth-submit" disabled={loading || !!success}>
            {loading ? (
              <span className="auth-spinner-container">
                <span className="auth-spinner"></span> Sending Link...
              </span>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
        <div className="auth-footer">
          <p>
            Remember your password? <Link href="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
