import { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowUpRight,
  Menu,
  X,
  Compass,
  Layers,
  HelpCircle,
  PlusCircle,
  User,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import "./Navbar.css";

export default function Navbar({ onOpenAuthModal, activeTab, onSelectTab }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId, tabName) => {
    setMobileMenuOpen(false);
    if (onSelectTab && tabName) {
      onSelectTab(tabName);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`meritto-navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <a href="#" className="brand-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="logo-sparkle-box">
            <Sparkles size={20} className="sparkle-icon" />
          </div>
          <div className="brand-text-wrap">
            <span className="brand-name">
              meritto<span className="brand-accent-dot">.</span>
            </span>
            <span className="brand-subtext">CAMPUS GIGS</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <button
            className={`nav-link ${activeTab === "explore" ? "active" : ""}`}
            onClick={() => handleNavClick("opportunities", "explore")}
          >
            <Compass size={16} />
            <span>Explore Gigs</span>
          </button>

          <button
            className={`nav-link ${activeTab === "categories" ? "active" : ""}`}
            onClick={() => handleNavClick("categories", "categories")}
          >
            <Layers size={16} />
            <span>Categories</span>
          </button>

          <button
            className={`nav-link ${activeTab === "how-it-works" ? "active" : ""}`}
            onClick={() => handleNavClick("how-it-works", "how-it-works")}
          >
            <HelpCircle size={16} />
            <span>How It Works</span>
          </button>

          <button
            className="nav-link special-pill"
            onClick={() => handleNavClick("perks", "perks")}
          >
            <ShieldCheck size={15} className="shield-icon" />
            <span>Student Perks</span>
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="navbar-actions">
          <button
            className="btn btn-outline btn-sm post-btn"
            onClick={() => {
              if (onOpenAuthModal) onOpenAuthModal("post");
              else alert("Connect to recruiter or club account to post opportunities.");
            }}
          >
            <PlusCircle size={15} />
            <span>Post a Gig</span>
          </button>

          <button
            className="login-trigger"
            onClick={() => {
              if (onOpenAuthModal) onOpenAuthModal("login");
              else alert("Student Sign In modal will appear.");
            }}
          >
            <User size={15} />
            <span>Sign In</span>
          </button>

          <button
            className="btn btn-primary btn-sm cta-get-started"
            onClick={() => {
              if (onOpenAuthModal) onOpenAuthModal("register");
              else alert("Join Meritto with your college email.");
            }}
          >
            <span>Get Started</span>
            <ArrowUpRight size={16} />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-drawer-content">
          <div className="mobile-drawer-badge">
            <span className="live-dot"></span>
            <span>Verified Student Opportunities Only</span>
          </div>

          <div className="mobile-nav-links">
            <button
              className="mobile-nav-item"
              onClick={() => handleNavClick("opportunities", "explore")}
            >
              <div className="nav-item-icon-title">
                <Compass size={18} className="icon-purple" />
                <span>Explore Live Gigs</span>
              </div>
              <ChevronRight size={18} className="chevron" />
            </button>

            <button
              className="mobile-nav-item"
              onClick={() => handleNavClick("categories", "categories")}
            >
              <div className="nav-item-icon-title">
                <Layers size={18} className="icon-pink" />
                <span>Browse Categories</span>
              </div>
              <ChevronRight size={18} className="chevron" />
            </button>

            <button
              className="mobile-nav-item"
              onClick={() => handleNavClick("how-it-works", "how-it-works")}
            >
              <div className="nav-item-icon-title">
                <HelpCircle size={18} className="icon-blue" />
                <span>How Campus Hustle Works</span>
              </div>
              <ChevronRight size={18} className="chevron" />
            </button>

            <button
              className="mobile-nav-item"
              onClick={() => handleNavClick("perks", "perks")}
            >
              <div className="nav-item-icon-title">
                <ShieldCheck size={18} className="icon-emerald" />
                <span>Student Escrow & Safety</span>
              </div>
              <ChevronRight size={18} className="chevron" />
            </button>
          </div>

          <div className="mobile-drawer-actions">
            <button
              className="btn btn-primary btn-lg full-width"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAuthModal) onOpenAuthModal("register");
              }}
            >
              <span>Join with College Email</span>
              <ArrowUpRight size={18} />
            </button>

            <div className="mobile-drawer-row">
              <button
                className="btn btn-secondary full-width"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAuthModal) onOpenAuthModal("login");
                }}
              >
                <User size={16} />
                <span>Sign In</span>
              </button>

              <button
                className="btn btn-outline full-width"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAuthModal) onOpenAuthModal("post");
                }}
              >
                <PlusCircle size={16} />
                <span>Post Gig</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
