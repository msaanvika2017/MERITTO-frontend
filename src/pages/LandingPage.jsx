import { useState, useMemo } from "react";
import {
  Sparkles,
  ArrowUpRight,
  Search,
  CheckCircle2,
  Wallet,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  Briefcase,
  ChevronDown,
  Compass,
  Star,
  Quote,
  GraduationCap,
} from "lucide-react";
import { CATEGORIES } from "../data/categories";
import { MOCK_OPPORTUNITIES } from "../data/mockOpportunities";
import OpportunityCarousel from "../components/opportunities/OpportunityCarousel";
import OpportunityCard from "../components/opportunities/OpportunityCard";
import CategoryCard from "../components/opportunities/CategoryCard";
import "./LandingPage.css";

export default function LandingPage({
  onOpenAuthModal,
  onSelectOpportunity,
  onApplyOpportunity,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());

  const handleToggleBookmark = (id) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    const target = document.getElementById("opportunities-grid-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filter & Sort opportunities
  const filteredOpportunities = useMemo(() => {
    return MOCK_OPPORTUNITIES.filter((item) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        `${item.title} ${item.company} ${item.college || ""} ${item.category} ${item.skills.join(" ")}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        item.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        selectedCategory.toLowerCase().includes(item.category.toLowerCase());

      const matchesType =
        selectedType === "All" || item.type.toLowerCase() === selectedType.toLowerCase();

      return matchesSearch && matchesCategory && matchesType;
    }).sort((a, b) => {
      if (sortBy === "pay") {
        const getVal = (str) => parseInt(str.replace(/[^0-9]/g, "") || "0", 10);
        return getVal(b.payment) - getVal(a.payment);
      }
      return 0; // default recent
    });
  }, [searchQuery, selectedCategory, selectedType, sortBy]);

  return (
    <div className="landing-page-wrap">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="hero-section">
        <div className="hero-ambient-orb orb-purple"></div>
        <div className="hero-ambient-orb orb-pink"></div>
        <div className="hero-ambient-orb orb-blue"></div>

        <div className="container hero-container">
          <div className="hero-text-col">
            {/* Announcement Pill */}
            <div
              className="hero-announcement-pill"
              onClick={() => onOpenAuthModal && onOpenAuthModal("register")}
            >
              <span className="live-pulse-badge"></span>
              <span className="pill-text">SPRING 2026 COHORT LIVE</span>
              <span className="pill-divider">·</span>
              <span className="pill-highlight">2,400+ Students Earning</span>
              <ArrowUpRight size={14} className="pill-arrow" />
            </div>

            {/* Headline */}
            <h1 className="hero-heading">
              Your Skills.
              <br />
              Your <span className="gradient-text">Campus Hustle.</span>
              <br />
              Real Money.
            </h1>

            {/* Subheading */}
            <p className="hero-subtext">
              The verified collegiate marketplace where student developers,
              designers, peer tutors, and creators turn their talent into paid gigs,
              hackathons, and high-impact campus projects.
            </p>

            {/* Dual CTAs */}
            <div className="hero-cta-group">
              <a href="#opportunities" className="btn btn-primary btn-lg hero-btn-primary">
                <span>Explore Live Gigs</span>
                <ArrowUpRight size={18} />
              </a>

              <button
                className="btn btn-secondary btn-lg"
                onClick={() => onOpenAuthModal && onOpenAuthModal("post")}
              >
                <span>Post an Opportunity</span>
              </button>
            </div>

            {/* Social Trust Strip */}
            <div className="hero-trust-strip">
              <div className="avatar-overlap-group">
                <span className="avatar-chip av-1">AS</span>
                <span className="avatar-chip av-2">RM</span>
                <span className="avatar-chip av-3">TK</span>
                <span className="avatar-chip av-4">PL</span>
                <span className="avatar-count">+2.4k</span>
              </div>
              <div className="trust-label-box">
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="star-gold" />
                  ))}
                  <span className="star-rating">4.9/5</span>
                </div>
                <span className="trust-campus-text">
                  Trusted by students from IITB, BITS, DTU, SRCC & 40+ colleges
                </span>
              </div>
            </div>
          </div>

          {/* Hero Visual / Interactive Floating Glass Showcase */}
          <div className="hero-showcase-col">
            <div className="showcase-glow-backdrop"></div>

            {/* Floating Card 1: Earnings Tracker */}
            <div className="hero-card hero-card-earnings">
              <div className="card-top-meta">
                <div className="pill-icon-box purple">
                  <Wallet size={18} />
                </div>
                <span className="verified-pill-small">
                  <ShieldCheck size={13} />
                  <span>Escrow Secured</span>
                </span>
              </div>

              <div className="earnings-numbers">
                <span className="card-muted-label">Semester Payouts</span>
                <strong className="card-big-stat">₹18,400</strong>
              </div>

              <div className="payout-progress-track">
                <div className="payout-progress-fill" style={{ width: "82%" }}></div>
              </div>

              <div className="card-bottom-row">
                <span className="student-earner-tag">Arjun S. (IIT Bombay CS)</span>
                <span className="instant-upi-tag">⚡ Instant UPI</span>
              </div>
            </div>

            {/* Floating Card 2: Live Gig Snippet */}
            <div className="hero-card hero-card-gig">
              <div className="gig-snippet-left">
                <div className="pill-icon-box pink">
                  <Sparkles size={18} />
                </div>
                <div>
                  <strong className="gig-snippet-title">React Web Developer</strong>
                  <span className="gig-snippet-company">Apex Tech Society · ₹5,000</span>
                </div>
              </div>
              <button
                className="mini-apply-btn"
                onClick={() => onOpenAuthModal && onOpenAuthModal("register")}
              >
                Apply
              </button>
            </div>

            {/* Floating Card 3: Trust Metric Pill */}
            <div className="hero-card hero-card-trust">
              <div className="pill-icon-box emerald">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <strong>Zero Platform Fees</strong>
                <span>Keep 100% of your first 3 completed gigs</span>
              </div>
            </div>

            {/* Background floating sparkle runes */}
            <div className="floating-rune rune-1">✳</div>
            <div className="floating-rune rune-2">✦</div>
            <div className="floating-rune rune-3">◆</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          METRICS & IMPACT STRIP
          ========================================================================= */}
      <section className="metrics-strip-section">
        <div className="container">
          <div className="metrics-strip-grid glass-panel">
            <div className="metric-box">
              <div className="metric-icon-wrap purple">
                <TrendingUp size={22} />
              </div>
              <div>
                <strong className="metric-value">₹14.2L+</strong>
                <span className="metric-label">Earned by Students</span>
              </div>
            </div>

            <div className="metric-divider"></div>

            <div className="metric-box">
              <div className="metric-icon-wrap pink">
                <Briefcase size={22} />
              </div>
              <div>
                <strong className="metric-value">850+</strong>
                <span className="metric-label">Gigs & Projects Done</span>
              </div>
            </div>

            <div className="metric-divider"></div>

            <div className="metric-box">
              <div className="metric-icon-wrap blue">
                <Users size={22} />
              </div>
              <div>
                <strong className="metric-value">40+</strong>
                <span className="metric-label">Campus Clubs & Councils</span>
              </div>
            </div>

            <div className="metric-divider"></div>

            <div className="metric-box">
              <div className="metric-icon-wrap emerald">
                <Award size={22} />
              </div>
              <div>
                <strong className="metric-value">100%</strong>
                <span className="metric-label">Escrow Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED CAROUSEL SECTION
          ========================================================================= */}
      <section className="carousel-section" id="featured-carousel">
        <div className="container">
          <OpportunityCarousel
            opportunities={MOCK_OPPORTUNITIES}
            onSelectOpportunity={onSelectOpportunity}
            onApply={onApplyOpportunity}
          />
        </div>
      </section>

      {/* =========================================================================
          CATEGORIES EXPLORER
          ========================================================================= */}
      <section className="categories-section" id="categories">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">MONETIZE WHAT YOU LOVE</span>
              <h2 className="section-title">What are you great at?</h2>
              <p className="section-desc">
                From coding frontend web apps to campus fest photography, there are
                dozens of high-paying tracks tailored for students.
              </p>
            </div>

            <a href="#opportunities" className="view-all-text-link">
              <span>View all categories</span>
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                isSelected={selectedCategory === cat.name}
                onSelect={handleCategorySelect}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          LIVE OPPORTUNITIES DIRECTORY
          ========================================================================= */}
      <section className="opportunities-directory-section" id="opportunities">
        <div className="container" id="opportunities-grid-section">
          <div className="directory-header-box">
            <div>
              <span className="section-eyebrow">LIVE CAMPUS BOARD</span>
              <h2 className="section-title">
                Explore Verified Opportunities<span className="brand-dot">.</span>
              </h2>
              <p className="section-desc">
                Find your next gig, apply in one click, and get paid with zero delays.
              </p>
            </div>

            <div className="live-counter-pill">
              <span className="live-pulse-dot"></span>
              <span>{filteredOpportunities.length} Gigs Available</span>
            </div>
          </div>

          {/* Interactive Search & Filter Toolbar */}
          <div className="directory-toolbar glass-panel">
            {/* Search Input */}
            <div className="search-input-group">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search by skill, title, college, or club..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search opportunities"
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchQuery("")}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="filter-dropdowns-group">
              <div className="select-wrap">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  aria-label="Filter by category"
                >
                  <option value="All">All Categories</option>
                  <option value="Tech & Coding">Tech & Coding</option>
                  <option value="Design & Creative">Design & Creative</option>
                  <option value="Events & Media">Events & Media</option>
                  <option value="Tutoring & STEM">Tutoring & STEM</option>
                  <option value="Hackathons & Bounties">Hackathons</option>
                  <option value="Music & Cultural">Music & Cultural</option>
                  <option value="Campus Ambassador">Campus Ambassador</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>

              <div className="select-wrap">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  aria-label="Filter by mode"
                >
                  <option value="All">All Modes</option>
                  <option value="Remote">Remote</option>
                  <option value="On Campus">On Campus</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>

              <div className="select-wrap">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort opportunities"
                >
                  <option value="recent">Most Recent</option>
                  <option value="pay">Highest Compensation</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {(selectedCategory !== "All" || selectedType !== "All" || searchQuery) && (
            <div className="active-filters-row">
              <span className="filters-label">Active Filters:</span>
              {selectedCategory !== "All" && (
                <span className="filter-chip">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory("All")}>×</button>
                </span>
              )}
              {selectedType !== "All" && (
                <span className="filter-chip">
                  Mode: {selectedType}
                  <button onClick={() => setSelectedType("All")}>×</button>
                </span>
              )}
              {searchQuery && (
                <span className="filter-chip">
                  Keyword: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")}>×</button>
                </span>
              )}
              <button
                className="reset-all-filters-btn"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedType("All");
                  setSearchQuery("");
                }}
              >
                Reset All
              </button>
            </div>
          )}

          {/* Opportunities Cards Grid */}
          <div className="opportunities-grid">
            {filteredOpportunities.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                isBookmarked={bookmarkedIds.has(opp.id)}
                onToggleBookmark={handleToggleBookmark}
                onSelect={() => onSelectOpportunity && onSelectOpportunity(opp)}
                onApply={() => onApplyOpportunity && onApplyOpportunity(opp)}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredOpportunities.length === 0 && (
            <div className="empty-search-state glass-panel">
              <div className="empty-icon-box">
                <Compass size={36} className="empty-icon" />
              </div>
              <h3>No matching gigs found</h3>
              <p>
                Try searching for broader keywords (e.g. "React", "Python", "Video",
                or "Tutor") or clearing your active filters.
              </p>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedType("All");
                  setSearchQuery("");
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          HOW IT WORKS SECTION
          ========================================================================= */}
      <section className="how-it-works-section" id="how-it-works">
        <div className="container">
          <div className="section-center-header">
            <span className="section-eyebrow">SIMPLE. SECURE. STUDENT-FIRST.</span>
            <h2 className="section-title">How Meritto Works</h2>
            <p className="section-desc">
              From your first gig application to instant UPI payout in three straightforward steps.
            </p>
          </div>

          <div className="steps-cards-grid">
            <div className="step-card glass-panel">
              <span className="step-num-watermark">01</span>
              <div className="step-card-content">
                <div className="step-icon-box purple">
                  <GraduationCap size={26} />
                </div>
                <h3>Verify Campus ID</h3>
                <p>
                  Register using your college email (`.ac.in` / `.edu`). We verify
                  your student status to keep the marketplace exclusive and scam-free.
                </p>
                <span className="step-perk">✓ Instant verified student badge</span>
              </div>
            </div>

            <div className="step-card glass-panel">
              <span className="step-num-watermark">02</span>
              <div className="step-card-content">
                <div className="step-icon-box pink">
                  <Briefcase size={26} />
                </div>
                <h3>Pick a Gig & Deliver</h3>
                <p>
                  Browse open bounties, submit your proposal with one click, and collaborate
                  directly with campus societies, clubs, or student founders.
                </p>
                <span className="step-perk">✓ Transparent milestones</span>
              </div>
            </div>

            <div className="step-card glass-panel">
              <span className="step-num-watermark">03</span>
              <div className="step-card-content">
                <div className="step-icon-box emerald">
                  <Wallet size={26} />
                </div>
                <h3>Get Paid via Escrow</h3>
                <p>
                  Recruiters deposit funds before you begin. Once your work is approved,
                  money lands straight in your account without delays or deductions.
                </p>
                <span className="step-perk">✓ 100% Escrow Protection</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STUDENT PERKS & TRUST SECTION
          ========================================================================= */}
      <section className="perks-section" id="perks">
        <div className="container">
          <div className="perks-box-wrapper glass-panel">
            <div className="perks-content-left">
              <span className="section-eyebrow">WHY STUDENTS CHOOSE MERITTO</span>
              <h2>Built for college life, not corporate bureaucracy.</h2>
              <p>
                Traditional freelance platforms charge 20% fees and compete you against
                full-time professionals. Meritto is tailor-made for college students.
              </p>

              <div className="perks-checklist">
                <div className="check-item">
                  <CheckCircle2 size={18} className="check-icon" />
                  <span><strong>Zero Cut on First 3 Gigs:</strong> Keep 100% of your earnings.</span>
                </div>
                <div className="check-item">
                  <CheckCircle2 size={18} className="check-icon" />
                  <span><strong>Escrow Protection:</strong> Funds locked in escrow before you write a single line of code.</span>
                </div>
                <div className="check-item">
                  <CheckCircle2 size={18} className="check-icon" />
                  <span><strong>Verified Portfolios:</strong> Completed work yields authentic merit credentials.</span>
                </div>
                <div className="check-item">
                  <CheckCircle2 size={18} className="check-icon" />
                  <span><strong>Flexible Milestones:</strong> Works around your exam and semester schedules.</span>
                </div>
              </div>
            </div>

            <div className="perks-stats-right">
              <div className="mini-stat-card">
                <strong className="stat-num">0%</strong>
                <span className="stat-desc">Fee for starter student gigs</span>
              </div>
              <div className="mini-stat-card">
                <strong className="stat-num">&lt;24h</strong>
                <span className="stat-desc">Average milestone turnaround</span>
              </div>
              <div className="mini-stat-card">
                <strong className="stat-num">40+</strong>
                <span className="stat-desc">Partner campus student councils</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STUDENT TESTIMONIALS
          ========================================================================= */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-center-header">
            <span className="section-eyebrow">REAL EXPERIENCES</span>
            <h2 className="section-title">Students already hustling on Meritto</h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card glass-panel">
              <Quote size={24} className="quote-icon" />
              <p className="test-body">
                "Built the fest landing page for our tech symposium in 3 days. Got
                paid ₹5,000 directly to UPI and added a real production project to
                my resume before placements started!"
              </p>
              <div className="test-author">
                <div className="test-avatar purple">AS</div>
                <div>
                  <strong>Arjun Sharma</strong>
                  <span>3rd Year CS · IIT Bombay</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card glass-panel">
              <Quote size={24} className="quote-icon" />
              <p className="test-body">
                "I used to tutor juniors informally for free. With Meritto, I conduct
                weekend DSA problem solving sessions at ₹900/hr. It covers my hostel
                expenses completely."
              </p>
              <div className="test-author">
                <div className="test-avatar pink">RM</div>
                <div>
                  <strong>Ria Mukherjee</strong>
                  <span>4th Year Math & Computing · DTU</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card glass-panel">
              <Quote size={24} className="quote-icon" />
              <p className="test-body">
                "Our design agency club needed an aftermovie editor for our cultural
                night. Found a gifted sophomore videographer within 4 hours.
                Escrow made it seamless."
              </p>
              <div className="test-author">
                <div className="test-avatar blue">TK</div>
                <div>
                  <strong>Tanmay Kapoor</strong>
                  <span>Cultural Head · SRCC Delhi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HIGH-ENERGY CTA BANNER
          ========================================================================= */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-sparkle-blob"></div>
            <div className="cta-content">
              <span className="section-eyebrow">YOUR NEXT MOVE STARTS HERE</span>
              <h2>
                You've got the talent.<br />
                <span className="gradient-text">Let's put it to work.</span>
              </h2>
              <p>
                Your skills deserve more than a line on your resume. Join your campus
                community and start earning from your very first gig.
              </p>
              <div className="cta-buttons-row">
                <button
                  className="btn btn-primary btn-lg cta-main-btn"
                  onClick={() => onOpenAuthModal && onOpenAuthModal("register")}
                >
                  <span>Get Started with Meritto</span>
                  <ArrowUpRight size={18} />
                </button>
                <button
                  className="btn btn-secondary btn-lg"
                  onClick={() => onOpenAuthModal && onOpenAuthModal("post")}
                >
                  <span>Post an Opportunity</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
