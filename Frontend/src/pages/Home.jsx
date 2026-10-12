import { Link } from "react-router-dom";
import {
  Sparkles,
  PenTool,
  Code2,
  Zap,
  ArrowRight,
  Menu,
  X,
  ShieldCheck,
  Clock,
  BrainCircuit,
  CheckCircle2,
  Github,
  ChevronRight,
  WandSparkles,
} from "lucide-react";

import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    {
      icon: <PenTool size={25} />,
      title: "AI Content Writer",
      description:
        "Create blogs, emails, social media posts, and creative content in seconds.",
      color: "purple",
    },
    {
      icon: <Code2 size={25} />,
      title: "Code Explainer",
      description:
        "Understand complex code, explore programming concepts, and learn faster.",
      color: "blue",
    },
    {
      icon: <BrainCircuit size={25} />,
      title: "AI Assistant",
      description:
        "Turn your ideas into actionable results with an intelligent AI workspace.",
      color: "pink",
    },
  ];

  const benefits = [
    "Easy-to-use interface",
    "AI-powered productivity tools",
    "Secure account authentication",
    "Access your workspace anytime",
  ];

  return (
    <div className="home-page">
      {/* NAVBAR */}
      <header className="home-navbar">
        <div className="home-nav-inner">
          <Link to="/" className="home-brand">
            <span className="home-brand-icon">
              <Sparkles size={25} />
            </span>

            <span>
              AI SaaS<span className="brand-dot">.</span>
            </span>
          </Link>

          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>

          <nav className={`home-nav-links ${menuOpen ? "menu-open" : ""}`}>
            <a
              href="#home"
              onClick={() => setMenuOpen(false)}
              className="nav-active"
            >
              Home
            </a>

            <a href="#features" onClick={() => setMenuOpen(false)}>
              Features
            </a>

            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>

            <div className="home-nav-actions">
              <Link
                to="/login"
                className="nav-login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="nav-get-started"
                onClick={() => setMenuOpen(false)}
              >
                Get Started <ArrowRight size={16} />
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="home-hero" id="home">
        <div className="hero-glow hero-glow-one"></div>
        <div className="hero-glow hero-glow-two"></div>

        <div className="home-hero-container">
          <div className="home-hero-content">
            <div className="home-eyebrow">
              <Sparkles size={15} />
              YOUR SMARTER AI WORKSPACE
              <span className="eyebrow-dot"></span>
            </div>

            <h1>
              Unlock Your
              <br />
              Potential with
              <br />
              <span className="gradient-text">Artificial Intelligence.</span>
            </h1>

            <p className="home-hero-description">
              Write better content, understand code faster, and boost
              your productivity. Everything you need to work smarter,
              all in one AI-powered platform.
            </p>

            <div className="home-hero-actions">
              <Link to="/register" className="hero-primary-button">
                Start Creating Free
                <ArrowRight size={19} />
              </Link>

              <a href="#features" className="hero-secondary-button">
                Explore Features
                <ChevronRight size={18} />
              </a>
            </div>

            <div className="hero-trust-row">
              <div className="trust-icon">
                <ShieldCheck size={19} />
              </div>

              <div>
                <strong>One platform. Endless possibilities.</strong>
                <p>Built for developers, creators, and learners.</p>
              </div>
            </div>
          </div>

          {/* AI VISUAL */}
          <div className="home-hero-visual">
            <div className="visual-orbit orbit-one"></div>
            <div className="visual-orbit orbit-two"></div>

            <div className="ai-main-card">
              <div className="ai-card-top">
                <div className="ai-card-brand">
                  <span className="ai-mini-logo">
                    <Sparkles size={19} />
                  </span>

                  <div>
                    <strong>AI Workspace</strong>
                    <small>Your creative assistant</small>
                  </div>
                </div>

                <span className="ai-status">
                  <span></span> Ready
                </span>
              </div>

              <div className="ai-card-divider"></div>

              <div className="ai-prompt-label">
                <WandSparkles size={16} />
                WHAT WOULD YOU LIKE TO CREATE?
              </div>

              <div className="ai-prompt-box">
                <p>
                  Write a creative introduction for my next
                  project...
                </p>

                <div className="prompt-bottom">
                  <span>AI-powered generation</span>
                  <span className="prompt-send">
                    <ArrowRight size={17} />
                  </span>
                </div>
              </div>

              <div className="ai-response-label">
                <Sparkles size={15} />
                YOUR AI TOOLKIT
              </div>

              <div className="ai-tool-row">
                <div className="ai-tool-icon purple">
                  <PenTool size={19} />
                </div>

                <div className="ai-tool-info">
                  <strong>Content Writer</strong>
                  <span>Create content with AI</span>
                </div>

                <ArrowRight size={17} className="tool-arrow" />
              </div>

              <div className="ai-tool-row">
                <div className="ai-tool-icon blue">
                  <Code2 size={19} />
                </div>

                <div className="ai-tool-info">
                  <strong>Code Explainer</strong>
                  <span>Understand code easily</span>
                </div>

                <ArrowRight size={17} className="tool-arrow" />
              </div>

              <div className="ai-card-footer">
                <span className="footer-sparkle">
                  <Sparkles size={14} />
                </span>

                <span>Your ideas, powered by AI.</span>
              </div>
            </div>

            <div className="floating-stat-card floating-stat-top">
              <span className="floating-stat-icon">
                <Zap size={20} />
              </span>

              <div>
                <strong>Work Smarter</strong>
                <span>Save valuable time</span>
              </div>
            </div>

            <div className="floating-stat-card floating-stat-bottom">
              <span className="floating-stat-icon blue-stat">
                <BrainCircuit size={20} />
              </span>

              <div>
                <strong>AI Assistance</strong>
                <span>Ideas to results</span>
              </div>
            </div>

            <div className="visual-sparkle sparkle-one">
              <Sparkles size={23} />
            </div>

            <div className="visual-sparkle sparkle-two">
              <Sparkles size={17} />
            </div>
          </div>
        </div>

        <a href="#features" className="hero-scroll">
          <span></span>
          Discover more
        </a>
      </section>

      {/* VALUE STRIP */}
      <section className="home-value-strip">
        <div className="value-strip-inner">
          <div className="value-item">
            <span><Zap size={19} /></span>
            <p>Built for productivity</p>
          </div>

          <div className="value-item">
            <span><BrainCircuit size={19} /></span>
            <p>AI-powered tools</p>
          </div>

          <div className="value-item">
            <span><ShieldCheck size={19} /></span>
            <p>Account authentication</p>
          </div>

          <div className="value-item">
            <span><Clock size={19} /></span>
            <p>Work more efficiently</p>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="home-features-section" id="features">
        <div className="home-section-container">
          <div className="home-section-heading">
            <span className="section-eyebrow">
              <Sparkles size={15} />
              WHAT YOU CAN DO
            </span>

            <h2>
              Everything you need.
              <br />
              <span className="gradient-text">
                One intelligent platform.
              </span>
            </h2>

            <p>
              Powerful tools designed to help you create, learn,
              and get things done with less effort.
            </p>
          </div>

          <div className="home-feature-grid">
            {features.map((feature, index) => (
              <article className="home-feature-card" key={feature.title}>
                <div className={`home-feature-icon ${feature.color}`}>
                  {feature.icon}
                </div>

                <span className="feature-number">
                  0{index + 1}
                </span>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>

                <Link
                  to="/register"
                  className="feature-card-link"
                >
                  Get Started <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="home-about-section" id="about">
        <div className="home-about-container">
          <div className="about-visual">
            <div className="about-visual-glow"></div>

            <div className="about-center-icon">
              <Sparkles size={55} />
            </div>

            <div className="about-mini-card about-mini-one">
              <CheckCircle2 size={19} />
              <span>Ideas simplified</span>
            </div>

            <div className="about-mini-card about-mini-two">
              <Zap size={19} />
              <span>Productivity boosted</span>
            </div>
          </div>

          <div className="about-content">
            <span className="section-eyebrow">
              <BrainCircuit size={15} />
              WHY AI SAAS?
            </span>

            <h2>
              Make technology
              <br />
              work <span className="gradient-text">for you.</span>
            </h2>

            <p>
              AI SaaS Platform brings useful AI tools together in
              one workspace. Whether you are creating content or
              learning programming, get started with a simpler workflow.
            </p>

            <div className="about-benefits">
              {benefits.map((benefit) => (
                <div className="about-benefit" key={benefit}>
                  <CheckCircle2 size={18} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <Link to="/register" className="about-button">
              Explore Your Workspace
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="home-cta-section">
        <div className="home-cta-card">
          <div className="cta-glow"></div>

          <div className="cta-content">
            <span className="cta-eyebrow">
              <Sparkles size={15} />
              YOUR NEXT IDEA STARTS HERE
            </span>

            <h2>
              Ready to create
              <br />
              something amazing?
            </h2>

            <p>
              Take the first step toward a smarter way of working.
            </p>

            <Link to="/register" className="cta-button">
              Create Your Account
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="cta-decoration">
            <div className="cta-decoration-ring"></div>
            <div className="cta-decoration-icon">
              <Sparkles size={65} />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className="home-footer-inner">
          <Link to="/" className="home-brand footer-brand">
            <span className="home-brand-icon">
              <Sparkles size={24} />
            </span>

            <span>
              AI SaaS<span className="brand-dot">.</span>
            </span>
          </Link>

          <p>
            © 2026 AI SaaS Platform. Built for smarter work.
          </p>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="footer-github"
            aria-label="GitHub"
          >
            <Github size={19} />
          </a>
        </div>
      </footer>
    </div>
  );
}