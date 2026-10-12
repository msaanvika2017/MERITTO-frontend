import { useState } from "react";
import {
  X,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  User,
  Lock,
  Mail,
} from "lucide-react";
import "./AuthModal.css";

export default function AuthModal({
  isOpen,
  onClose,
  initialTab = "login", // "login", "register", "post"
  onAuthSuccess,
}) {
  const [tab, setTab] = useState(initialTab === "post" ? "register" : initialTab);
  const [role, setRole] = useState(initialTab === "post" ? "RECRUITER" : "STUDENT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [college, setCollege] = useState("IIT Bombay");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(
        tab === "login"
          ? `Welcome back to Meritto, ${email.split("@")[0] || "Student"}!`
          : `Account created for ${name || "Student"}! Campus email verification link sent.`
      );

      if (onAuthSuccess) {
        onAuthSuccess({
          name: name || "Demo User",
          email,
          role,
          college,
        });
      }

      setTimeout(() => {
        setSuccessMsg("");
        onClose();
      }, 1600);
    }, 700);
  };

  const handleQuickDemo = (demoRole) => {
    setRole(demoRole);
    if (demoRole === "STUDENT") {
      setEmail("arjun.sharma@iitb.ac.in");
      setName("Arjun Sharma");
      setCollege("IIT Bombay");
    } else {
      setEmail("president@apex-tech.org");
      setName("Apex Tech Society");
      setCollege("Campus Tech Council");
    }
    setPassword("demoPass123!");
    setSuccessMsg(`Loaded Demo ${demoRole === "STUDENT" ? "Student" : "Club / Recruiter"} profile.`);
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="auth-modal-card glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Brand header */}
        <div className="auth-header">
          <div className="logo-sparkle-box">
            <Sparkles size={20} className="sparkle-icon" />
          </div>
          <h2>
            {tab === "login" ? "Welcome Back to Meritto" : "Join Your Campus Marketplace"}
          </h2>
          <p>
            {tab === "login"
              ? "Access your applications, active contracts, and instant earnings."
              : "Turn your skills into verified experience and real compensation."}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${tab === "login" ? "active" : ""}`}
            onClick={() => { setTab("login"); setSuccessMsg(""); }}
          >
            Sign In
          </button>
          <button
            className={`auth-tab ${tab === "register" ? "active" : ""}`}
            onClick={() => { setTab("register"); setSuccessMsg(""); }}
          >
            Create Account
          </button>
        </div>

        {/* Role toggle (on register) */}
        {tab === "register" && (
          <div className="role-selector">
            <button
              type="button"
              className={`role-option ${role === "STUDENT" ? "selected" : ""}`}
              onClick={() => setRole("STUDENT")}
            >
              <GraduationCap size={18} />
              <div>
                <strong>Student Freelancer</strong>
                <span>Find gigs & earn</span>
              </div>
            </button>

            <button
              type="button"
              className={`role-option ${role === "RECRUITER" ? "selected" : ""}`}
              onClick={() => setRole("RECRUITER")}
            >
              <Briefcase size={18} />
              <div>
                <strong>Club / Recruiter</strong>
                <span>Post gigs & hire</span>
              </div>
            </button>
          </div>
        )}

        {/* Quick Demo Fill Buttons */}
        <div className="quick-demo-strip">
          <span className="quick-demo-label">Quick Preview:</span>
          <button
            type="button"
            className="demo-pill-btn"
            onClick={() => handleQuickDemo("STUDENT")}
          >
            ⚡ Student Demo
          </button>
          <button
            type="button"
            className="demo-pill-btn"
            onClick={() => handleQuickDemo("RECRUITER")}
          >
            🏢 Club Demo
          </button>
        </div>

        {successMsg && (
          <div className="auth-alert-box">
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Auth form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {tab === "register" && (
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrap">
                <User size={16} className="input-icon" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Arjun Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>College or Organization Email</label>
            <div className="input-wrap">
              <Mail size={16} className="input-icon" />
              <input
                type="email"
                required
                placeholder="you@campus.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {tab === "register" && (
            <div className="form-group">
              <label>College / University</label>
              <select
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="auth-select"
              >
                <option value="IIT Bombay">IIT Bombay</option>
                <option value="Delhi Technological Univ">Delhi Technological Univ</option>
                <option value="BITS Pilani">BITS Pilani</option>
                <option value="SRCC Delhi">SRCC Delhi</option>
                <option value="Manipal University">Manipal University</option>
                <option value="VIT Vellore">VIT Vellore</option>
                <option value="Other Recognized Campus">Other Campus</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrap">
              <Lock size={16} className="input-icon" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg full-width submit-auth-btn"
            disabled={loading}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{tab === "login" ? "Sign In to Meritto" : "Complete Registration"}</span>
                <ArrowUpRight size={18} />
              </>
            )}
          </button>

          <div className="auth-footer-notice">
            <ShieldCheck size={14} className="notice-icon" />
            <span>Encrypted with BCrypt & JWT. No spam, strictly college opportunities.</span>
          </div>
        </form>
      </div>
    </div>
  );
}
