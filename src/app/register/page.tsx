"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth.service";
import "@/styles/auth.css";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await registerUser({ name, email, password });
      if (response.success) {
        setSuccess(response.message || "Registration successful! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(response.message || "Registration failed");
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
          <h1>Create Account</h1>
          <p>Sign up to start your journey with YStudy</p>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading || !!success}
            />
          </div>
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
          <div className="auth-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading || !!success}
            />
          </div>
          <button type="submit" className="auth-submit" disabled={loading || !!success}>
            {loading ? (
              <span className="auth-spinner-container">
                <span className="auth-spinner"></span> Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        <div className="auth-footer">
          <p>
            Already have an account? <Link href="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
