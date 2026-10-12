import { Link } from "react-router-dom";
import { Zap, ExternalLink } from "lucide-react";
import "./AppFooter.css";

export default function AppFooter({ onShowToast }) {
  const handleContactClick = () => {
    if (onShowToast) {
      onShowToast("Contact & student support desk: support@meritto.campus ✨");
    }
  };

  return (
    <footer className="footer section-container">
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <span className="brand-symbol">
              <Zap size={22} fill="currentColor" />
            </span>
            <span className="brand-name">
              meritto<span className="brand-dot">.</span>
            </span>
          </Link>

          <p>
            Turning student skills into opportunities, experience, and earnings.
          </p>

          <div style={{ marginTop: "14px" }}>
            <span className="demo-environment-pill">
              <span className="demo-pulse-dot" />
              Demo Environment (Step 2 Preview)
            </span>
          </div>
        </div>

        <div className="footer-column">
          <h4>Explore</h4>
          <Link to="/opportunities">Browse Gigs</Link>
          <Link to="/applications">My Applications</Link>
          <Link to="/earnings">Earnings Dashboard</Link>
          <a href="#how-it-works">How It Works</a>
        </div>

        <div className="footer-column">
          <h4>Dashboards</h4>
          <Link to="/dashboard">Student Portal</Link>
          <Link to="/club">Club Management</Link>
          <Link to="/admin">Admin Console</Link>
          <Link to="/register">Create Account</Link>
        </div>

        <div className="footer-column">
          <h4>Meritto</h4>
          <Link to="/login">Sign In</Link>
          <a href="#about">About Platform</a>
          <button
            className="footer-contact"
            onClick={handleContactClick}
            type="button"
          >
            Contact
            <ExternalLink size={13} />
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Meritto. Made for the next generation.</p>

        <div className="footer-tagline">
          <span className="footer-live-dot" />
          Built for students, powered by possibilities.
        </div>
      </div>
    </footer>
  );
}
