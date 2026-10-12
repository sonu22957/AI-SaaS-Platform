
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  PenTool,
  Code2,
  Zap,
  LoaderCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
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
    setLoading(true);

    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-shell">
        {/* LEFT PANEL */}
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
              YOUR AI WORKSPACE
            </span>

            <h1>
              Build smarter
              <br />
              with <span>AI.</span>
            </h1>

            <p className="hero-description">
              Create amazing content, understand complex code,
              and boost your productivity with the power of AI.
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-icon purple">
                  <PenTool size={22} />
                </span>

                <div>
                  <h3>AI Content Writer</h3>
                  <p>Generate quality content in seconds.</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-icon blue">
                  <Code2 size={22} />
                </span>

                <div>
                  <h3>Code Explainer</h3>
                  <p>Understand code with AI assistance.</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-icon pink">
                  <Zap size={22} />
                </span>

                <div>
                  <h3>Work Smarter</h3>
                  <p>Save time and improve productivity.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-bottom">
            <div className="floating-card floating-card-one">
              <Sparkles size={19} />
              <span>Ideas into reality</span>
            </div>

            <img
              className="login-home-preview"
              src="/images/HomePage.png"
              alt="Preview of the AI SaaS home page"
            />

            <div className="floating-card floating-card-two">
              <Code2 size={20} />
              <span>Powered by AI</span>
            </div>
          </div>

          <div className="hero-footer">
            © 2026 AI SaaS Platform. Built for creators.
          </div>
        </section>

        {/* RIGHT PANEL */}
        <section className="login-form-panel">
          <div className="form-top">
            <span className="mobile-brand">
              <Sparkles size={20} />
              AI SaaS
            </span>

            <span className="secure-badge">
              <LockKeyhole size={13} />
              Secure Login
            </span>
          </div>

          <div className="form-container">
            <div className="form-heading-icon">
              <Sparkles size={31} />
            </div>

            <h2>Welcome Back 👋</h2>

            <p className="form-subtitle">
              Login to your AI SaaS account.
            </p>

            {error && (
              <div className="form-error" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
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

              <div className="input-group">
                <label htmlFor="password">Password</label>

                <div className="input-wrapper">
                  <LockKeyhole size={19} />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
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
              </div>

              <div className="form-options">
                <label className="remember-option">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />

                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  className="forgot-link"
                  onClick={() =>
                    setError("Password recovery is not configured yet.")
                  }
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="login-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoaderCircle className="spin" size={20} />
                    Logging in...
                  </>
                ) : (
                  <>
                    <span>Login to your account</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="form-divider">
              <span></span>
              <p>Start creating with AI</p>
              <span></span>
            </div>

            <div className="signup-prompt">
              <p>Don't have an account?</p>

              <Link to="/register">
                Create Account <ArrowRight size={16} />
              </Link>
            </div>

            <p className="form-terms">
              By continuing, you agree to our{" "}
              <span>Terms of Service</span> and{" "}
              <span>Privacy Policy</span>.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}