import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Building2,
  BookOpen,
  Calendar,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Loader2,
} from "lucide-react";
import "./RegisterPage.css";

const YEAR_OPTIONS = [
  "1st Year (Freshman)",
  "2nd Year (Sophomore)",
  "3rd Year (Junior)",
  "4th Year (Senior)",
  "Postgraduate / Master's",
  "PhD / Doctoral",
];

export default function RegisterPage({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    course: "",
    year: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.college.trim()) {
      newErrors.college = "College / university name is required.";
    }

    if (!formData.course.trim()) {
      newErrors.course = "Course or degree program is required.";
    }

    if (!formData.year) {
      newErrors.year = "Please select your year of study.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleQuickDemoFill = () => {
    setFormData({
      name: "Rhea Deshmukh",
      email: "rhea.deshmukh@campus.ac.in",
      college: "IIT Bombay",
      course: "B.Tech Computer Science",
      year: "3rd Year (Junior)",
      password: "StudentSecure123!",
    });
    setErrors({});
    if (onShowToast) {
      onShowToast("Loaded demo student profile 🎓");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulated registration workflow
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      if (onShowToast) {
        onShowToast(`Account created for ${formData.name}! Welcome to Meritto ✨`);
      }
    }, 700);
  };

  return (
    <div className="register-page-container">
      <div className="register-card">
        {isSuccess ? (
          <div className="auth-success-card">
            <div className="success-icon-wrap">
              <CheckCircle2 size={36} />
            </div>
            <h2>Welcome to Meritto!</h2>
            <p>
              Your student account for <strong>{formData.name}</strong> ({formData.college}) has been created in demo mode.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "20px", flexWrap: "wrap" }}>
              <Link to="/" className="button-secondary" style={{ padding: "0 20px" }}>
                Return to Homepage
              </Link>
              <Link to="/dashboard" className="button-primary" style={{ padding: "0 20px" }}>
                Open Student Hub Preview
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="register-header">
              <div className="register-badge-icon">
                <Sparkles size={24} />
              </div>
              <h1>Create Student Account</h1>
              <p>Turn your skills into verified campus gigs and real payouts.</p>
            </div>

            {/* Clear Demo Notice */}
            <div className="demo-auth-banner">
              <Sparkles size={16} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <span>
                  <strong>Demo Mode:</strong> Previews registration UI before backend integration.
                </span>
                <button
                  type="button"
                  onClick={handleQuickDemoFill}
                  style={{
                    background: "rgba(168, 85, 247, 0.2)",
                    border: "1px solid rgba(168, 85, 247, 0.4)",
                    color: "#ffffff",
                    borderRadius: "8px",
                    padding: "4px 8px",
                    fontSize: "11px",
                    fontWeight: "600",
                    cursor: "pointer",
                    flexShrink: 0,
                    marginLeft: "8px",
                  }}
                >
                  Quick Fill Demo
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="reg-name">Full Student Name</label>
                <div className="input-wrapper">
                  <User size={17} className="input-icon-left" />
                  <input
                    id="reg-name"
                    type="text"
                    className={`auth-input ${errors.name ? "has-error" : ""}`}
                    placeholder="e.g. Arjun Sharma"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    autoComplete="name"
                  />
                </div>
                {errors.name && (
                  <span className="form-error-msg">
                    <AlertCircle size={13} />
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="reg-email">College / Student Email</label>
                <div className="input-wrapper">
                  <Mail size={17} className="input-icon-left" />
                  <input
                    id="reg-email"
                    type="email"
                    className={`auth-input ${errors.email ? "has-error" : ""}`}
                    placeholder="student@campus.ac.in"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
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

              {/* College & Course (Two Columns on Desktop) */}
              <div className="form-grid-two-col">
                <div className="form-group">
                  <label htmlFor="reg-college">College / University</label>
                  <div className="input-wrapper">
                    <Building2 size={17} className="input-icon-left" />
                    <input
                      id="reg-college"
                      type="text"
                      className={`auth-input ${errors.college ? "has-error" : ""}`}
                      placeholder="e.g. IIT Bombay"
                      value={formData.college}
                      onChange={(e) => handleChange("college", e.target.value)}
                    />
                  </div>
                  {errors.college && (
                    <span className="form-error-msg">
                      <AlertCircle size={13} />
                      {errors.college}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="reg-course">Degree / Course</label>
                  <div className="input-wrapper">
                    <BookOpen size={17} className="input-icon-left" />
                    <input
                      id="reg-course"
                      type="text"
                      className={`auth-input ${errors.course ? "has-error" : ""}`}
                      placeholder="e.g. B.Tech CS / B.Des"
                      value={formData.course}
                      onChange={(e) => handleChange("course", e.target.value)}
                    />
                  </div>
                  {errors.course && (
                    <span className="form-error-msg">
                      <AlertCircle size={13} />
                      {errors.course}
                    </span>
                  )}
                </div>
              </div>

              {/* Year of Study */}
              <div className="form-group">
                <label htmlFor="reg-year">Year of Study</label>
                <div className="select-wrapper">
                  <Calendar size={17} className="input-icon-left" />
                  <select
                    id="reg-year"
                    className={`auth-select ${errors.year ? "has-error" : ""}`}
                    value={formData.year}
                    onChange={(e) => handleChange("year", e.target.value)}
                  >
                    <option value="" disabled>
                      Select your current academic year
                    </option>
                    {YEAR_OPTIONS.map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={17} className="select-chevron" />
                </div>
                {errors.year && (
                  <span className="form-error-msg">
                    <AlertCircle size={13} />
                    {errors.year}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="reg-password">Choose Password</label>
                <div className="input-wrapper">
                  <Lock size={17} className="input-icon-left" />
                  <input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    className={`auth-input ${errors.password ? "has-error" : ""}`}
                    placeholder="Minimum 6 characters"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    autoComplete="new-password"
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

              {/* Submit */}
              <button
                type="submit"
                className="button-primary auth-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={17} className="rotate-chevron" />
                    <span>Creating your profile...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Registration</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>

            <div className="auth-footer">
              <span>Already registered on Meritto?</span>
              <Link to="/login">Sign in here</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
