import { useState } from "react";
import {
  X,
  ShieldCheck,
  MapPin,
  Clock,
  Users,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import "./OpportunityDetailModal.css";

export default function OpportunityDetailModal({
  opportunity,
  isOpen,
  onClose,
  initialMode = "view", // "view" or "apply"
}) {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pitch: "",
    portfolioLink: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !opportunity) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setMode("view");
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-container glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="modal-success-state">
            <div className="success-icon-box">
              <CheckCircle2 size={44} className="success-check" />
            </div>
            <h2>Application Submitted!</h2>
            <p>
              Your proposal for <strong>{opportunity.title}</strong> has been
              received by {opportunity.college || opportunity.company}. You will receive
              status notifications on your student email.
            </p>
            <div className="demo-pill-alert">
              <Sparkles size={14} />
              <span>Demo Mode: Ready for backend API integration</span>
            </div>
            <button className="btn btn-primary" onClick={handleReset}>
              Back to Opportunities
            </button>
          </div>
        ) : (
          <div className="modal-content-grid">
            {/* Left Header & Meta */}
            <div className="modal-left-pane">
              <div className="modal-badges">
                <span className={`badge-pill badge-${opportunity.colorAccent || "purple"}`}>
                  {opportunity.category}
                </span>
                <span className="badge-pill badge-emerald">
                  <ShieldCheck size={14} />
                  <span>Verified Campus Poster</span>
                </span>
              </div>

              <h2 className="modal-title">{opportunity.title}</h2>
              <span className="modal-company">{opportunity.college || opportunity.company}</span>

              {/* Price Banner */}
              <div className="modal-pay-card">
                <div>
                  <span className="pay-type-label">{opportunity.paymentType}</span>
                  <div className="pay-amount-display">{opportunity.payment}</div>
                </div>
                <div className="escrow-chip">
                  <ShieldCheck size={16} />
                  <span>Protected by Escrow</span>
                </div>
              </div>

              {/* Quick Specs */}
              <div className="modal-specs-list">
                <div className="spec-row">
                  <MapPin size={16} className="spec-icon" />
                  <div>
                    <span className="spec-label">Location / Mode</span>
                    <strong className="spec-value">{opportunity.location} ({opportunity.type})</strong>
                  </div>
                </div>

                <div className="spec-row">
                  <Clock size={16} className="spec-icon" />
                  <div>
                    <span className="spec-label">Application Deadline</span>
                    <strong className="spec-value">{opportunity.deadline}</strong>
                  </div>
                </div>

                <div className="spec-row">
                  <Users size={16} className="spec-icon" />
                  <div>
                    <span className="spec-label">Competition</span>
                    <strong className="spec-value">{opportunity.applicantsCount} student applicants</strong>
                  </div>
                </div>
              </div>

              {/* Required Skills */}
              <div className="modal-skills-section">
                <h4>Required Skills</h4>
                <div className="modal-skills-chips">
                  {opportunity.skills?.map((skill) => (
                    <span key={skill} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Pane: Description or Application Form */}
            <div className="modal-right-pane">
              <div className="modal-tabs">
                <button
                  className={`modal-tab-btn ${mode === "view" ? "active" : ""}`}
                  onClick={() => setMode("view")}
                >
                  Opportunity Scope
                </button>
                <button
                  className={`modal-tab-btn ${mode === "apply" ? "active" : ""}`}
                  onClick={() => setMode("apply")}
                >
                  Apply Directly
                </button>
              </div>

              {mode === "view" ? (
                <div className="modal-desc-container">
                  <div className="desc-box">
                    <h4>About this project</h4>
                    <p>{opportunity.description}</p>
                    <p>
                      This opportunity is managed through Meritto's verified
                      student framework. Upon acceptance, project deliverables and
                      milestones are tracked transparently with payout disbursed directly
                      upon milestone approval.
                    </p>
                  </div>

                  <div className="desc-box perks-box">
                    <h4>What you'll gain:</h4>
                    <ul>
                      <li>Verified portfolio credential badge added to your Meritto profile</li>
                      <li>Direct recommendation rating from {opportunity.company}</li>
                      <li>Prompt payout without agency cuts or delay</li>
                    </ul>
                  </div>

                  <button
                    className="btn btn-primary btn-lg full-width"
                    onClick={() => setMode("apply")}
                  >
                    <span>Proceed to Apply</span>
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              ) : (
                <form className="modal-apply-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>College Email (.edu / .ac.in)</label>
                    <input
                      type="email"
                      required
                      placeholder="ananya@campus.ac.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Portfolio / GitHub / Drive Link</label>
                    <input
                      type="url"
                      placeholder="https://github.com/yourhandle or Figma link"
                      value={formData.portfolioLink}
                      onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Why are you a great fit? (Short pitch)</label>
                    <textarea
                      rows="3"
                      required
                      placeholder="Briefly mention relevant experience or coursework..."
                      value={formData.pitch}
                      onChange={(e) => setFormData({ ...formData, pitch: e.target.value })}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg full-width"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>Sending proposal...</span>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <ArrowUpRight size={18} />
                      </>
                    )}
                  </button>

                  <span className="apply-disclaimer">
                    🔒 Protected under Student Terms. Your email is verified against your college domain.
                  </span>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
