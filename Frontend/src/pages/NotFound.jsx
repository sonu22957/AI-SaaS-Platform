import { Link } from "react-router-dom";
import { Home, ArrowLeft, AlertCircle } from "lucide-react";

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-icon">
          <AlertCircle size={42} />
        </div>

        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="not-found-home-btn">
            <Home size={18} />
            Go Home
          </Link>

          <button
            type="button"
            className="not-found-back-btn"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;