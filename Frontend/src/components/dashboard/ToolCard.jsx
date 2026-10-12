import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import "./ToolCard.css";

function ToolCard({
  title = "AI Tool",
  description = "Use AI to improve your productivity.",
  icon: Icon = Sparkles,
  path = "/dashboard",
  color = "purple",
  badge = "AI Powered",
}) {
  return (
    <Link
      to={path}
      className={`tool-card tool-card-${color}`}
      aria-label={`Open ${title}`}
    >
      <div className="tool-card-top">
        <div className="tool-card-icon">
          <Icon size={25} strokeWidth={1.8} />
        </div>

        {badge && <span className="tool-card-badge">{badge}</span>}
      </div>

      <div className="tool-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="tool-card-footer">
        <span>Explore Tool</span>
        <ArrowRight size={18} />
      </div>
    </Link>
  );
}

export default ToolCard;