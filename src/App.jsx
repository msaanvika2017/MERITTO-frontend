import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

import AppNavbar from "./components/layout/AppNavbar";
import AppFooter from "./components/layout/AppFooter";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BrowseOpportunities from "./pages/BrowseOpportunities";
import OpportunityDetails from "./pages/OpportunityDetails";

import "./App.css";

// Temporary placeholders for pages not yet implemented
function PhasePlaceholder({ title, phase, description }) {
  return (
    <main
      className="section-container"
      style={{
        padding: "100px 24px",
        minHeight: "65vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#15151f",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "22px",
          padding: "50px 36px",
          maxWidth: "580px",
          width: "100%",
          textAlign: "center",
          boxShadow:
            "0 24px 48px rgba(0, 0, 0, 0.6), 0 0 35px rgba(168, 85, 247, 0.12)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 14px",
            borderRadius: "999px",
            background: "rgba(168, 85, 247, 0.15)",
            border: "1px solid rgba(168, 85, 247, 0.3)",
            color: "var(--lavender)",
            fontSize: "12px",
            fontWeight: "700",
            marginBottom: "18px",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
          }}
        >
          <Sparkles size={13} />
          {phase}
        </div>

        <h2
          style={{
            fontSize: "30px",
            fontWeight: "700",
            marginBottom: "14px",
            color: "var(--text)",
          }}
        >
          {title}
        </h2>

        <p
          style={{
            color: "var(--muted)",
            fontSize: "15px",
            lineHeight: "1.65",
            marginBottom: "30px",
          }}
        >
          {description}
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link to="/" className="button-primary">
            Return to Homepage
            <ArrowRight size={16} />
          </Link>

          <Link to="/opportunities" className="button-secondary">
            Explore Opportunities
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function App() {
  const [toast, setToast] = useState("");
  const location = useLocation();

  // Scroll to the top whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Global toast notification
  const showToast = (message) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2800);
  };

  return (
    <div className="meritto-app">
      {/* Ambient background effects */}
      <div className="ambient ambient-purple" />
      <div className="ambient ambient-pink" />
      <div className="ambient ambient-blue" />

      {/* Shared navigation */}
      <AppNavbar onShowToast={showToast} />

      {/* Application routes */}
      <Routes>
        {/* Phase A: Homepage */}
        <Route
          path="/"
          element={<HomePage onShowToast={showToast} />}
        />

        {/* Phase B: Authentication */}
        <Route
          path="/login"
          element={<LoginPage onShowToast={showToast} />}
        />

        <Route
          path="/register"
          element={<RegisterPage onShowToast={showToast} />}
        />

        {/* Phase C: Browse Opportunities */}
        <Route
          path="/opportunities"
          element={<BrowseOpportunities />}
        />

        {/* Phase C: Individual Opportunity Details */}
        <Route
          path="/opportunities/:id"
          element={<OpportunityDetails />}
        />

        {/* Phase D: Student Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PhasePlaceholder
              phase="Phase D: Pending"
              title="Student Dashboard"
              description="Your student profile, application summary, active gigs, and recommended opportunities will appear here."
            />
          }
        />

        {/* Phase D: My Applications */}
        <Route
          path="/applications"
          element={
            <PhasePlaceholder
              phase="Phase D: Pending"
              title="My Applications"
              description="Track your submitted applications and their statuses: Pending, Accepted, Rejected, and Completed."
            />
          }
        />

        {/* Phase E: Earnings */}
        <Route
          path="/earnings"
          element={
            <PhasePlaceholder
              phase="Phase E: Pending"
              title="Earnings Dashboard"
              description="View earnings summaries, payment records, and payout status. Real payments are not implemented."
            />
          }
        />

        {/* Phase E: Club Dashboard */}
        <Route
          path="/club"
          element={
            <PhasePlaceholder
              phase="Phase E: Pending"
              title="Club Management Dashboard"
              description="Manage club opportunities, review applications, and track work submissions."
            />
          }
        />

        {/* Phase E: Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <PhasePlaceholder
              phase="Phase E: Pending"
              title="Platform Administrator Console"
              description="Manage opportunity listings, student verification, and platform activity."
            />
          }
        />

        {/* Unknown routes */}
        <Route
          path="*"
          element={
            <PhasePlaceholder
              phase="404"
              title="Page Not Found"
              description="We couldn't find that page. Return home or explore available opportunities."
            />
          }
        />
      </Routes>

      {/* Shared footer */}
      <AppFooter onShowToast={showToast} />

      {/* Toast notification */}
      {toast && (
        <div className="toast-message" role="status">
          <span className="toast-icon">
            <CheckCircle2 size={19} />
          </span>

          {toast}
        </div>
      )}
    </div>
  );
}