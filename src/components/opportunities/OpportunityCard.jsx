import {
  ArrowUpRight,
  ShieldCheck,
  Clock,
  MapPin,
  Users,
  Bookmark,
} from "lucide-react";
import "./OpportunityCard.css";

export default function OpportunityCard({
  opportunity,
  onSelect,
  onApply,
  isBookmarked = false,
  onToggleBookmark,
}) {
  const {
    id,
    title,
    company,
    category,
    type,
    location,
    payment,
    paymentType,
    deadline,
    description,
    skills = [],
    applicantsCount,
    verified,
    colorAccent = "purple",
    college,
  } = opportunity;

  return (
    <article className={`opp-card border-accent-${colorAccent}`} key={id}>
      <div className="opp-card-glow"></div>

      {/* Header bar */}
      <div className="opp-card-header">
        <div className="opp-badges">
          <span className={`badge-pill badge-${colorAccent}`}>{category}</span>
          <span className="type-badge">{type}</span>
          {verified && (
            <span className="verified-pill" title="Verified Campus Entity">
              <ShieldCheck size={13} />
            </span>
          )}
        </div>

        <button
          className={`bookmark-btn ${isBookmarked ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleBookmark) onToggleBookmark(id);
          }}
          aria-label="Bookmark opportunity"
        >
          <Bookmark size={16} />
        </button>
      </div>

      {/* Main info */}
      <div className="opp-card-main">
        <span className="opp-company-name">{college || company}</span>
        <h3 className="opp-title">{title}</h3>
        <p className="opp-desc">{description}</p>
      </div>

      {/* Skills */}
      <div className="opp-skills-row">
        {skills.slice(0, 3).map((skill) => (
          <span key={skill} className="opp-skill-pill">
            {skill}
          </span>
        ))}
        {skills.length > 3 && (
          <span className="opp-skill-pill more">+{skills.length - 3}</span>
        )}
      </div>

      {/* Meta Strip: Location, Deadline & Applicants */}
      <div className="opp-meta-row">
        <span className="opp-meta-item">
          <MapPin size={13} /> {location}
        </span>
        <span className="opp-meta-item">
          <Users size={13} /> {applicantsCount} applied
        </span>
        <span className="opp-meta-item deadline">
          <Clock size={13} /> {deadline}
        </span>
      </div>

      {/* Bottom Footer: Payment & Apply */}
      <div className="opp-card-footer">
        <div className="opp-payment-box">
          <span className="opp-pay-type">{paymentType}</span>
          <strong className="opp-pay-val">{payment}</strong>
        </div>

        <div className="opp-action-buttons">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onSelect && onSelect(opportunity)}
          >
            Details
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onApply && onApply(opportunity)}
          >
            Apply <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
