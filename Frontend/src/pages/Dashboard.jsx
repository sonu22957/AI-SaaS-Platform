import { Link } from "react-router-dom";
import {
  Sparkles,
  Code2,
  History,
  UserRound,
  ArrowRight,
  Zap,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const tools = [
  {
    title: "AI Writer",
    description: "Generate blog posts, emails, and creative content with AI.",
    icon: Sparkles,
    link: "/ai-writer",
    color: "purple",
    label: "CREATE",
  },
  {
    title: "Code Explainer",
    description: "Understand complex code with simple explanations.",
    icon: Code2,
    link: "/code-explainer",
    color: "blue",
    label: "DEVELOP",
  },
  {
    title: "AI History",
    description: "Explore your previous AI generations.",
    icon: History,
    link: "/history",
    color: "orange",
    label: "YOUR ACTIVITY",
  },
  {
    title: "My Profile",
    description: "View your account and personal information.",
    icon: UserRound,
    link: "/profile",
    color: "green",
    label: "ACCOUNT",
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  const displayName =
    user?.name || user?.fullName || user?.email?.split("@")[0] || "User";

  return (
    <div className="home-dashboard">
      <div className="home-dashboard-inner">
        {/* Welcome section */}
        <header className="home-dashboard-header">
          <div>
            <p className="home-dashboard-eyebrow">YOUR CREATIVE WORKSPACE</p>

            <h1>Welcome back, {displayName}!</h1>

            <p className="home-dashboard-subtitle">
              What would you like to create today?
            </p>
          </div>

          <div className="home-dashboard-status">
            <span className="home-dashboard-status-icon"><Zap size={18} /></span>
            <span><strong>AI Workspace</strong><small>Ready when you are</small></span>
          </div>
        </header>

        {/* Overview card */}
        <section className="home-dashboard-hero">
          <div className="home-dashboard-hero-content">
            <div className="home-dashboard-hero-label">
              <Sparkles size={16} />
              YOUR AI WORKSPACE
            </div>

            <h2>Turn your ideas<br className="home-dashboard-desktop-break" /> into reality.</h2>

            <p>
              Create content, understand code, and improve your
              productivity with your AI-powered workspace.
            </p>

            <Link to="/ai-writer" className="home-dashboard-cta">
              Start creating <ArrowRight size={18} />
            </Link>
          </div>
          <div className="home-dashboard-art">
            <img
              className="home-dashboard-preview"
              src="/images/Dashboad.png"
              alt="Preview of the AI SaaS dashboard"
            />
            <span className="home-dashboard-art-dot home-dashboard-art-dot-one" />
            <span className="home-dashboard-art-dot home-dashboard-art-dot-two" />
          </div>
        </section>

        {/* Tools heading */}
        <div className="home-dashboard-section-heading">
          <div>
            <p className="home-dashboard-eyebrow">MADE FOR YOUR NEXT BIG IDEA</p>
            <h2>Explore your tools</h2>
          </div>
          <span>Pick a tool to get started <ArrowRight size={16} /></span>
        </div>

        {/* Tools grid */}
        <div className="home-dashboard-tools">
          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link
                to={tool.link}
                key={tool.title}
                className={`home-dashboard-tool home-dashboard-tool-${tool.color}`}
              >
                <div className="home-dashboard-tool-top">
                  <span className="home-dashboard-tool-icon"><Icon size={23} /></span>
                  <span className="home-dashboard-tool-label">{tool.label}</span>
                </div>

                <h3>{tool.title}</h3>

                <p>{tool.description}</p>

                <span className="home-dashboard-tool-action">
                  Open tool <ArrowRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="home-dashboard-footer">
          <span>AI Studio</span>
          <span>Ideas in. Great things out.</span>
        </footer>
      </div>
    </div>
  );
}