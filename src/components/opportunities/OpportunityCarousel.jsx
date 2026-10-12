import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import "./OpportunityCarousel.css";

export default function OpportunityCarousel({
  opportunities = [],
  onSelectOpportunity,
  onApply,
}) {
  const featuredItems = opportunities.filter((item) => item.featured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  const total = featuredItems.length;

  // Auto-advance carousel
  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5500);

    return () => clearInterval(interval);
  }, [total, isPaused]);

  if (total === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  return (
    <section
      className="carousel-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured Opportunities Carousel"
    >
      <div className="carousel-header">
        <div className="carousel-header-left">
          <span className="badge-pill badge-purple">
            <Sparkles size={14} />
            <span>EDITOR'S PICK · CAMPUS FEATURED</span>
          </span>
          <h3 className="carousel-title">High-Bounty Opportunities</h3>
        </div>

        {/* Carousel Prev / Next Controls */}
        <div className="carousel-controls">
          <button
            className="carousel-btn prev-btn"
            onClick={handlePrev}
            aria-label="Previous opportunity"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="slide-counter">
            <span>{String(currentIndex + 1).padStart(2, "0")}</span>
            <span className="counter-sep">/</span>
            <span>{String(total).padStart(2, "0")}</span>
          </div>
          <button
            className="carousel-btn next-btn"
            onClick={handleNext}
            aria-label="Next opportunity"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Main Sliding Viewport */}
      <div
        className="carousel-track-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="carousel-slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {featuredItems.map((item, idx) => (
            <div
              className={`carousel-slide ${idx === currentIndex ? "active-slide" : ""}`}
              key={item.id}
              aria-hidden={idx !== currentIndex}
            >
              <div className={`featured-hero-card border-${item.colorAccent}`}>
                <div className="card-ambient-glow"></div>

                {/* Top Metas */}
                <div className="slide-top-bar">
                  <div className="slide-badges">
                    <span className={`badge-pill badge-${item.colorAccent}`}>
                      {item.category}
                    </span>
                    <span className="badge-pill badge-emerald">
                      <ShieldCheck size={14} />
                      <span>Escrow Verified</span>
                    </span>
                  </div>

                  <div className="slide-compensation">
                    <span className="comp-type">{item.paymentType}</span>
                    <strong className="comp-amount">{item.payment}</strong>
                  </div>
                </div>

                {/* Title & Organization */}
                <div className="slide-body">
                  <div className="slide-college-tag">
                    <span className="council-name">{item.college || item.company}</span>
                    <span className="dot-divider">·</span>
                    <span className="deadline-tag">
                      <Clock size={13} /> {item.deadline}
                    </span>
                  </div>

                  <h2 className="slide-heading">{item.title}</h2>
                  <p className="slide-desc">{item.description}</p>

                  {/* Skills Tags */}
                  <div className="slide-skills">
                    {item.skills.map((skill) => (
                      <span key={skill} className="skill-chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Footer Actions */}
                <div className="slide-footer">
                  <div className="slide-meta-strip">
                    <span className="meta-info">
                      <MapPin size={14} /> {item.location}
                    </span>
                    <span className="meta-info">
                      <Users size={14} /> {item.applicantsCount} applicants
                    </span>
                  </div>

                  <div className="slide-action-btns">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => onSelectOpportunity && onSelectOpportunity(item)}
                    >
                      <span>Gig Details</span>
                    </button>

                    <button
                      className="btn btn-primary btn-sm slide-apply-btn"
                      onClick={() => onApply && onApply(item)}
                    >
                      <span>Apply Now</span>
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dot Navigation */}
      <div className="carousel-dots">
        {featuredItems.map((item, idx) => (
          <button
            key={item.id}
            className={`dot-indicator ${idx === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}: ${item.title}`}
          >
            <span className="dot-bar"></span>
          </button>
        ))}
      </div>
    </section>
  );
}
