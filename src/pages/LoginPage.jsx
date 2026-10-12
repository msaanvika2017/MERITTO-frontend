import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Users,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import "./LoginPage.css";

const DEMO_PERSONAS = [
  {
    role: "STUDENT",
    title: "Student",
    name: "Arjun Sharma",
    email: "arjun.sharma@iitb.ac.in",
    password: "Password123!",
    icon: GraduationCap,
    targetRoute: "/dashboard",
  },
  {
    role: "CLUB",
    title: "Club Lead",
    name: "Apex Tech Society",
    email: "president@apex-tech.org",
    password: "ClubPassword123!",
    icon: Users,
    targetRoute: "/club",
  },
  {
    role: "ADMIN",
    title: "Administrator",
    name: "Meritto Admin",
    email: "admin@meritto.edu",
    password: "AdminSecret123!",
    icon: ShieldCheck,
    targetRoute: "/admin",
  },
];

export default function LoginPage({ onShowToast }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("STUDENT");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successInfo, setSuccessInfo] = useState(null);

  const handleSelectPersona = (persona) => {
    setEmail(persona.email);
    setPassword(persona.password);
    setSelectedRole(persona.role);
    setErrors({});
    if (onShowToast) {
      onShowToast(`Loaded ${persona.title} demo credentials 🪄`);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g., student@campus.edu).";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulated login workflow (clearly labeled demo)
    setTimeout(() => {
      setIsSubmitting(false);

      const matchedPersona = DEMO_PERSONAS.find((p) => p.email.toLowerCase() === email.trim().toLowerCase());
      const destination = matchedPersona ? matchedPersona.targetRoute : "/dashboard";
      const userDisplay = matchedPersona ? matchedPersona.name : email.split("@")[0];

      setSuccessInfo({
        name: userDisplay,
        destination,
      });
      setIsSuccess(true);

      if (onShowToast) {
        onShowToast(`Signed in as ${userDisplay}! ✨`);
      }
    }, 700);
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        {isSuccess ? (
          <div className="auth-success-card">
            <div className="success-icon-wrap">
              <CheckCircle2 size={36} />
            </div>
            <h2>Signed In Successfully!</h2>
            <p>
              Welcome back, <strong>{successInfo?.name}</strong>. Simulated session active in demo mode.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "20px", flexWrap: "wrap" }}>
              <Link to="/" className="button-secondary" style={{ padding: "0 20px" }}>
                Return to Homepage
              </Link>
              <Link to={successInfo?.destination || "/dashboard"} className="button-primary" style={{ padding: "0 20px" }}>
                Open Workspace Preview
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="auth-header">
              <div className="auth-badge-icon">
                <Sparkles size={24} />
              </div>
              <h1>Welcome Back</h1>
              <p>Sign in to your Meritto student and campus account.</p>
            </div>

            {/* Clear Demo Notice */}
            <div className="demo-auth-banner">
              <Sparkles size={16} />
              <span>
                <strong>Demo Mode:</strong> Pre-filled personas simulate authentication prior to Step 3 backend integration.
              </span>
            </div>

            {/* Quick Demo Persona Switcher */}
            <div className="persona-selector">
              <span className="persona-label">Instant Demo Personas</span>
              <div className="persona-buttons-grid">
                {DEMO_PERSONAS.map((persona) => {
                  const Icon = persona.icon;
                  const isActive = selectedRole === persona.role;
                  return (
                    <button
                      key={persona.role}
                      type="button"
                      className={`persona-btn ${isActive ? "active" : ""}`}
                      onClick={() => handleSelectPersona(persona)}
                      aria-label={`Fill ${persona.title} demo credentials`}
                    >
                      <Icon size={16} />
                      <span>{persona.title}</span>
                      <span className="role-title">{persona.role}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              {/* Email field */}
              <div className="form-group">
                <label htmlFor="login-email">Email Address</label>
                <div className="input-wrapper">
                  <Mail size={17} className="input-icon-left" />
                  <input
                    id="login-email"
                    type="email"
                    className={`auth-input ${errors.email ? "has-error" : ""}`}
                    placeholder="student@campus.edu"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors((prev) => ({ ...prev, email: null }));
                      }
                    }}
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <span className="form-error-msg">
                    <AlertCircle size={13} />
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Password field */}
              <div className="form-group">
                <label htmlFor="login-password">
                  <span>Password</span>
                  <button
                    type="button"
                    style={{
                      background: "transparent",
                      border: 0,
                      color: "var(--lavender)",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (onShowToast) {
                        onShowToast("Demo note: You can use any test password (min 6 chars) or a demo persona.");
                      }
                    }}
                  >
                    Need help?
                  </button>
                </label>
                <div className="input-wrapper">
                  <Lock size={17} className="input-icon-left" />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    className={`auth-input ${errors.password ? "has-error" : ""}`}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors((prev) => ({ ...prev, password: null }));
                      }
                    }}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="form-error-msg">
                    <AlertCircle size={13} />
                    {errors.password}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="button-primary auth-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={17} className="rotate-chevron" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Account</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>

            <div className="auth-footer">
              <span>Don't have an account yet?</span>
              <Link to="/register">Create a student account</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
