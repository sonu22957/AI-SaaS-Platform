import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Mail,
  LockKeyhole,
  UserRound,
  Eye,
  EyeOff,
  ArrowRight,
  PenTool,
  Code2,
  Zap,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!acceptedTerms) {
      setError("Please accept the Terms and Conditions.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      await register(form);

      // If registration logs the user in, go to dashboard.
      // Otherwise, send the user to the login page.
      const token = localStorage.getItem("token");

      navigate(token ? "/dashboard" : "/login", {
        replace: true,
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-shell register-shell">
        {/* LEFT AI BRANDING PANEL */}
        <section className="login-hero">
          <Link to="/" className="brand">
            <span className="brand-icon">
              <Sparkles size={30} />
            </span>

            <span>
              <strong>AI SaaS</strong>
              <small>Platform</small>
            </span>
          </Link>

          <div className="hero-content">
            <span className="hero-badge">
              <Sparkles size={14} />
              START YOUR AI JOURNEY
            </span>

            <h1>
              Your ideas.
              <br />
              Your future.
              <br />
              <span>Powered by AI.</span>
            </h1>

            <p className="hero-description">
              Create your free account and discover a smarter
              way to write content, understand code, and get
              more done every day.
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-icon purple">
                  <PenTool size={22} />
                </span>

                <div>
                  <h3>Create amazing content</h3>
                  <p>Turn your ideas into quality content.</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-icon blue">
                  <Code2 size={22} />
                </span>

                <div>
                  <h3>Understand code faster</h3>
                  <p>Get help understanding complex code.</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-icon pink">
                  <Zap size={22} />
                </span>

                <div>
                  <h3>Boost your productivity</h3>
                  <p>Spend less time on repetitive tasks.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-bottom">
            <div className="floating-card floating-card-one">
              <Sparkles size={19} />
              <span>Imagine. Create. Innovate.</span>
            </div>

            <div className="ai-orb">
              <div className="orb-inner">
                <Sparkles size={65} />
              </div>
              <div className="orb-ring"></div>
            </div>

            <div className="floating-card floating-card-two">
              <CheckCircle2 size={20} />
              <span>Your AI journey starts here</span>
            </div>
          </div>

          <div className="hero-footer">
            © 2026 AI SaaS Platform. Built for creators.
          </div>
        </section>

        {/* RIGHT REGISTRATION PANEL */}
        <section className="login-form-panel register-form-panel">
          <div className="form-top">
            <span className="mobile-brand">
              <Sparkles size={20} />
              AI SaaS
            </span>

            <span className="secure-badge">
              <LockKeyhole size={13} />
              Secure Registration
            </span>
          </div>

          <div className="form-container register-form-container">
            <div className="form-heading-icon">
              <Sparkles size={31} />
            </div>

            <h2>Create Account ✨</h2>

            <p className="form-subtitle">
              Join us and start creating with AI.
            </p>

            {error && (
              <div className="form-error" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* FULL NAME */}
              <div className="input-group">
                <label htmlFor="name">Full Name</label>

                <div className="input-wrapper">
                  <UserRound size={19} />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    minLength={2}
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="input-group">
                <label htmlFor="email">Email Address</label>

                <div className="input-wrapper">
                  <Mail size={19} />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="input-group">
                <label htmlFor="password">Password</label>

                <div className="input-wrapper">
                  <LockKeyhole size={19} />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    minLength={6}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                <p className="password-hint">
                  Use at least 6 characters.
                </p>
              </div>

              {/* TERMS */}
              <label className="remember-option register-terms">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />

                <span>
                  I agree to the <strong>Terms & Conditions</strong>
                  {" "}and <strong>Privacy Policy</strong>.
                </span>
              </label>

              {/* SUBMIT */}
              <button
                type="submit"
                className="login-submit register-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoaderCircle className="spin" size={20} />
                    Creating account...
                  </>
                ) : (
                  <>
                    <span>Create My Account</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="form-divider">
              <span></span>
              <p>Already part of our community?</p>
              <span></span>
            </div>

            <div className="signup-prompt">
              <p>Already have an account?</p>

              <Link to="/login">
                Login here <ArrowRight size={16} />
              </Link>
            </div>

            <p className="form-terms">
              Your account information is handled by your
              application's authentication system.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}