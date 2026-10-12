import { ArrowUpRight } from "lucide-react";
import "./CategoryCard.css";

export default function CategoryCard({
  category,
  isSelected = false,
  onSelect,
}) {
  const { name, icon: Icon, count, accent, colorHex, glowColor, gradient, description } = category;

  return (
    <button
      className={`cat-card ${isSelected ? "selected" : ""} cat-${accent}`}
      onClick={() => onSelect && onSelect(name)}
      style={{
        "--cat-color": colorHex,
        "--cat-glow": glowColor,
        "--cat-gradient": gradient,
      }}
      aria-label={`Select category ${name} with ${count}`}
    >
      <div className="cat-card-glow"></div>

      <div className="cat-top-row">
        <div className="cat-icon-box">
          <Icon size={24} className="cat-icon" />
        </div>
        <span className="cat-count-badge">{count}</span>
      </div>

      <div className="cat-info">
        <h3 className="cat-title">{name}</h3>
        <p className="cat-desc">{description}</p>
      </div>

      <div className="cat-bottom-row">
        <span className="cat-browse-text">Explore gigs</span>
        <span className="cat-arrow-circle">
          <ArrowUpRight size={15} />
        </span>
      </div>
    </button>
  );
}
