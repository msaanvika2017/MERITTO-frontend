import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Code2,
  Compass,
  DollarSign,
  Eye,
  Filter,
  Heart,
  Music2,
  Palette,
  Search,
  Sparkles,
  Star,
  Trophy,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import {
  MOCK_OPPORTUNITIES,
  CATEGORIES,
  formatAmount,
} from "../data/mockData";

function OpportunityCard({
  opportunity,
  saved,
  onSave,
  onApply,
}) {
  const Icon = opportunity.icon || Code2;

  return (
    <article className="opportunity-card">
      <div className="card-top">
        <div className={`opportunity-icon ${opportunity.color}`}>
          <Icon size={23} strokeWidth={1.8} />
        </div>

        <button
          className={`icon-button save-button ${saved ? "saved" : ""}`}
          onClick={() => onSave(opportunity.id)}
          aria-label={saved ? "Remove saved opportunity" : "Save opportunity"}
          title={saved ? "Remove from saved" : "Save opportunity"}
        >
          <Heart
            size={19}
            fill={saved ? "currentColor" : "none"}
          />
        </button>
      </div>

      {opportunity.featured && (
        <span className="featured-badge">
          <Sparkles size={12} />
          Featured
        </span>
      )}

      <p className="company-name">{opportunity.company}</p>

      <h3>{opportunity.title}</h3>

      <p className="opportunity-description">
        {opportunity.description}
      </p>

      <div className="skill-list">
        {opportunity.skills.map((skill) => (
          <span key={skill} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>

      <div className="card-divider" />

      <div className="opportunity-card-bottom">
        <div>
          <p className="amount-label">
            {opportunity.category === "Competition"
              ? "Win up to"
              : "Earn"}
          </p>

          <h4 className={`amount ${opportunity.color}`}>
            {formatAmount(opportunity.amount)}
            <span>{opportunity.suffix || ""}</span>
          </h4>
        </div>

        <button
          className="apply-button"
          onClick={() => onApply(opportunity)}
        >
          View details
          <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="card-deadline">
        <span className="status-dot" />
        {opportunity.deadline}
        <span className="opportunity-type">
          {opportunity.type}
        </span>
      </div>
    </article>
  );
}

export default function HomePage({ onShowToast }) {
  const [activeCategory, setActiveCategory] = useState("All opportunities");
  const [searchTerm, setSearchTerm] = useState("");
  const [savedIds, setSavedIds] = useState([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const filteredOpportunities = MOCK_OPPORTUNITIES.filter((opportunity) => {
    const matchesCategory =
      activeCategory === "All opportunities" ||
      opportunity.category === activeCategory;

    const searchableText = [
      opportunity.title,
      opportunity.company,
      opportunity.category,
      opportunity.description,
      ...opportunity.skills,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(searchTerm.toLowerCase());
    const matchesSaved = !showSavedOnly || savedIds.includes(opportunity.id);

    return matchesCategory && matchesSearch && matchesSaved;
  });

  const displayedOpportunities = showAll
    ? filteredOpportunities
    : filteredOpportunities.slice(0, 3);

  const toggleSave = (id) => {
    const alreadySaved = savedIds.includes(id);

    setSavedIds((current) =>
      alreadySaved
        ? current.filter((savedId) => savedId !== id)
        : [...current, id]
    );

    if (onShowToast) {
      onShowToast(
        alreadySaved
          ? "Removed from your saved opportunities"
          : "Opportunity saved to your collection 💜"
      );
    }
  };

  const scrollToOpportunities = () => {
    document
      .getElementById("opportunities")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleApply = (opportunity) => {
    setSelectedOpportunity(opportunity);
  };

  return (
    <>
      <main>
        {/* HERO SECTION */}
        <section className="hero section-container" id="home">
          <div className="hero-content">
            <div className="announcement">
              <span className="announcement-sparkle">
                <Sparkles size={14} />
              </span>

              <span>Your talent. Your time. Your money.</span>

              <ArrowRight size={14} />
            </div>

            <h1>
              Your skills
              <br />
              deserve to <span className="gradient-text">earn.</span>
            </h1>

            <p className="hero-description">
              Turn what you're good at into something that pays.
              Discover exciting opportunities, build real experience,
              and make your college journey count.
            </p>

            <div className="hero-actions">
              <button
                className="button-primary hero-primary"
                onClick={scrollToOpportunities}
              >
                Find your opportunity
                <ArrowRight size={18} />
              </button>

              <a href="#how-it-works" className="button-secondary">
                See how it works
                <ArrowDownRight size={17} />
              </a>
            </div>

            <div className="hero-social-proof">
              <div className="avatar-stack">
                <span className="avatar avatar-purple">S</span>
                <span className="avatar avatar-pink">A</span>
                <span className="avatar avatar-blue">R</span>
                <span className="avatar avatar-orange">M</span>
              </div>

              <div>
                <div className="rating-stars">
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                </div>

                <p>Built for students who dream big.</p>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />

            <div className="hero-graphic-card main-graphic-card">
              <div className="graphic-top">
                <span className="graphic-label">
                  <span className="live-dot" />
                  YOUR NEXT OPPORTUNITY
                </span>

                <span className="graphic-menu">•••</span>
              </div>

              <div className="graphic-art">
                <div className="graphic-glow" />

                <div className="graphic-square square-one">
                  <Code2 size={31} />
                </div>

                <div className="graphic-square square-two">
                  <Palette size={27} />
                </div>

                <div className="graphic-square square-three">
                  <Music2 size={26} />
                </div>

                <div className="graphic-square square-four">
                  <Trophy size={28} />
                </div>

                <div className="graphic-center">
                  <Sparkles size={39} />
                </div>
              </div>

              <div className="graphic-bottom">
                <div>
                  <span className="graphic-small-label">
                    YOUR TALENT IS VALUABLE
                  </span>

                  <h3>Make it count.</h3>
                </div>

                <div className="graphic-arrow">
                  <ArrowUpRight size={22} />
                </div>
              </div>
            </div>

            <div className="floating-card floating-earnings">
              <span className="floating-icon earnings-icon">
                <Wallet size={19} />
              </span>

              <div>
                <p>Potential earnings</p>
                <h4>₹3,000</h4>
              </div>

              <span className="floating-trend">
                <ArrowUpRight size={15} />
              </span>
            </div>

            <div className="floating-card floating-match">
              <span className="match-icon">
                <CheckCircle2 size={19} />
              </span>

              <div>
                <h4>It's a match!</h4>
                <p>Your skills, their needs.</p>
              </div>
            </div>

            <span className="floating-star star-one">✳</span>
            <span className="floating-star star-two">✦</span>
          </div>
        </section>

        {/* VALUE STRIP */}
        <section className="value-strip section-container">
          <div className="value-item">
            <span className="value-icon purple">
              <DollarSign size={19} />
            </span>

            <div>
              <h4>Earn from your skills</h4>
              <p>Your talent has real value.</p>
            </div>
          </div>

          <div className="value-separator" />

          <div className="value-item">
            <span className="value-icon pink">
              <BriefcaseBusiness size={19} />
            </span>

            <div>
              <h4>Build real experience</h4>
              <p>Create work worth showing.</p>
            </div>
          </div>

          <div className="value-separator" />

          <div className="value-item">
            <span className="value-icon blue">
              <Users size={19} />
            </span>

            <div>
              <h4>Find your people</h4>
              <p>Meet people who get your vibe.</p>
            </div>
          </div>
        </section>

        {/* OPPORTUNITIES SECTION */}
        <section
          className="opportunities-section section-container"
          id="opportunities"
        >
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-line" />
                YOUR NEXT BIG THING
              </div>

              <h2>
                Opportunities that
                <br />
                <span className="gradient-text">get you.</span>
              </h2>

              <p className="section-description">
                From your first paid gig to your next big win.
                There's room for every kind of talent.
              </p>
            </div>

            <button
              className={`saved-toggle ${showSavedOnly ? "saved-toggle-active" : ""}`}
              onClick={() => {
                setShowSavedOnly((value) => !value);
                setShowAll(true);
              }}
            >
              <Heart
                size={17}
                fill={showSavedOnly ? "currentColor" : "none"}
              />
              Saved
              <span className="saved-count">{savedIds.length}</span>
            </button>
          </div>

          <div className="marketplace-controls">
            <div className="search-box">
              <Search size={19} />

              <input
                type="text"
                placeholder="Search skills, gigs, opportunities..."
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setShowAll(true);
                }}
                aria-label="Search opportunities"
              />

              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <div className="results-label">
              <Filter size={16} />
              Find your fit
            </div>
          </div>

          <div className="category-list">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.name}
                  className={`category-pill ${
                    activeCategory === category.name
                      ? "category-active"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveCategory(category.name);
                    setShowAll(true);
                  }}
                >
                  <Icon size={16} />
                  {category.name}
                </button>
              );
            })}
          </div>

          <div className="opportunity-grid">
            {displayedOpportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                saved={savedIds.includes(opportunity.id)}
                onSave={toggleSave}
                onApply={handleApply}
              />
            ))}
          </div>

          {displayedOpportunities.length === 0 && (
            <div className="empty-state">
              <span className="empty-state-icon">
                <Search size={27} />
              </span>

              <h3>
                {showSavedOnly
                  ? "No saved opportunities yet"
                  : "No matches just yet"}
              </h3>

              <p>
                {showSavedOnly
                  ? "Tap the heart on an opportunity to save it here."
                  : "Try a different search or explore another category."}
              </p>

              <button
                className="button-secondary"
                onClick={() => {
                  setActiveCategory("All opportunities");
                  setSearchTerm("");
                  setShowSavedOnly(false);
                  setShowAll(false);
                }}
              >
                Reset filters
              </button>
            </div>
          )}

          {filteredOpportunities.length > 3 && (
            <div className="view-all-wrapper">
              <button
                className="button-secondary view-all-button"
                onClick={() => setShowAll((value) => !value)}
              >
                {showAll ? "Show less" : "Explore all opportunities"}
                {showAll ? (
                  <ChevronDown className="rotate-chevron" size={18} />
                ) : (
                  <ArrowRight size={18} />
                )}
              </button>
            </div>
          )}
        </section>

        {/* HOW IT WORKS SECTION */}
        <section
          className="how-section section-container"
          id="how-it-works"
        >
          <div className="center-heading">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              EASY AS 1, 2, 3
              <span className="eyebrow-line" />
            </div>

            <h2>
              Less scrolling.
              <br />
              <span className="gradient-text">More doing.</span>
            </h2>

            <p>
              Your journey from student to earner starts with three
              simple steps.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-top">
                <span className="step-number">01</span>

                <span className="step-icon purple">
                  <Compass size={25} />
                </span>
              </div>

              <h3>Find your thing.</h3>

              <p>
                Explore paid gigs, creative projects, campus events,
                and opportunities that match your skills.
              </p>

              <span className="step-decoration purple-decoration" />
            </div>

            <div className="step-card">
              <div className="step-top">
                <span className="step-number">02</span>

                <span className="step-icon pink">
                  <Zap size={25} />
                </span>
              </div>

              <h3>Show what you can do.</h3>

              <p>
                Apply with your skills, portfolio, and ideas.
                Let your work speak for itself.
              </p>

              <span className="step-decoration pink-decoration" />
            </div>

            <div className="step-card">
              <div className="step-top">
                <span className="step-number">03</span>

                <span className="step-icon blue">
                  <Wallet size={25} />
                </span>
              </div>

              <h3>Do good work. Earn.</h3>

              <p>
                Complete your assignment, get your work approved,
                and track your payment.
              </p>

              <span className="step-decoration blue-decoration" />
            </div>
          </div>
        </section>

        {/* CREATIVE BANNER */}
        <section className="creative-section section-container" id="about">
          <div className="creative-banner">
            <div className="creative-glow" />

            <div className="creative-content">
              <div className="creative-label">
                <Sparkles size={15} />
                MADE FOR YOUR KIND OF TALENT
              </div>

              <h2>
                Your side quest
                <br />
                could be your <span>next big win.</span>
              </h2>

              <p>
                Code it. Design it. Capture it. Perform it.
                Whatever your thing is, there's a place for it here.
              </p>

              <button
                className="button-primary creative-button"
                onClick={scrollToOpportunities}
              >
                Find your opportunity
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="creative-art">
              <div className="creative-orbit creative-orbit-one" />
              <div className="creative-orbit creative-orbit-two" />

              <div className="creative-floating creative-float-one">
                <Code2 size={27} />
              </div>

              <div className="creative-floating creative-float-two">
                <Palette size={27} />
              </div>

              <div className="creative-floating creative-float-three">
                <Music2 size={27} />
              </div>

              <div className="creative-floating creative-float-four">
                <Trophy size={27} />
              </div>

              <div className="creative-center">
                <Sparkles size={48} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* OPPORTUNITY DETAILS MODAL (100% PRESERVED IN-PLACE BEHAVIOR) */}
      {selectedOpportunity && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedOpportunity(null)}
        >
          <div
            className="opportunity-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="icon-button modal-close"
              onClick={() => setSelectedOpportunity(null)}
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            <div
              className={`opportunity-icon modal-icon ${selectedOpportunity.color}`}
            >
              {(() => {
                const Icon = selectedOpportunity.icon || Code2;
                return <Icon size={27} />;
              })()}
            </div>

            <span className="modal-eyebrow">
              {selectedOpportunity.category}
            </span>

            <h2 id="modal-title">
              {selectedOpportunity.title}
            </h2>

            <p className="modal-company">
              {selectedOpportunity.company}
            </p>

            <p className="modal-description">
              {selectedOpportunity.description}
            </p>

            <div className="modal-amount-card">
              <span>
                {selectedOpportunity.category === "Competition"
                  ? "Prize pool"
                  : "Potential earnings"}
              </span>

              <strong>
                {formatAmount(selectedOpportunity.amount)}
                {selectedOpportunity.suffix || ""}
              </strong>
            </div>

            <div className="modal-meta">
              <span>
                <BriefcaseBusiness size={16} />
                {selectedOpportunity.type}
              </span>

              <span>
                <Eye size={16} />
                {selectedOpportunity.deadline}
              </span>
            </div>

            <h4 className="modal-skills-title">Skills involved</h4>

            <div className="skill-list modal-skills">
              {selectedOpportunity.skills.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>

            <button
              className="button-primary modal-action"
              onClick={() => {
                const title = selectedOpportunity.title;
                setSelectedOpportunity(null);
                if (onShowToast) {
                  onShowToast(
                    `Application submitted for ${title}! ✨ View status in Applications.`
                  );
                }
              }}
            >
              Apply for opportunity
              <ArrowRight size={18} />
            </button>

            <p className="modal-disclaimer">
              Demo opportunity for the current frontend design. Application submission is simulated in this preview.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
