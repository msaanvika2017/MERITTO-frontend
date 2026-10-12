import {
  Sparkles,
  Heart,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import "./Footer.css";

export default function Footer({ onOpenAuthModal }) {
  return (
    <footer className="meritto-footer">
      <div className="footer-glow-radial"></div>

      <div className="container footer-container">
        {/* Top Info Grid */}
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="brand-logo footer-logo">
              <div className="logo-sparkle-box">
                <Sparkles size={18} className="sparkle-icon" />
              </div>
              <div className="brand-text-wrap">
                <span className="brand-name">
                  meritto<span className="brand-accent-dot">.</span>
                </span>
                <span className="brand-subtext">CAMPUS GIGS</span>
              </div>
            </div>

            <p className="footer-description">
              The premier campus talent marketplace. Find verified paid gigs,
              micro-internships, hackathons, and tutoring gigs while in college.
            </p>

            <div className="footer-status-badge">
              <span className="status-ping"></span>
              <span>All Campus Nodes Operational · Spring 2026</span>
            </div>

            <div className="social-links-row">
              <a href="#" className="social-circle" aria-label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </a>
              <a href="#" className="social-circle" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
              </a>
              <a href="#" className="social-circle" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="social-circle" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="footer-links-col">
            <h4>Explore Tracks</h4>
            <ul>
              <li><a href="#opportunities">Tech & Coding Gigs</a></li>
              <li><a href="#opportunities">UI/UX & Creative Work</a></li>
              <li><a href="#opportunities">Campus Fest Videography</a></li>
              <li><a href="#opportunities">STEM & Code Tutoring</a></li>
              <li><a href="#opportunities">Hackathons & Bounties</a></li>
              <li><a href="#opportunities">Campus Brand Reps</a></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="footer-links-col">
            <h4>For Students</h4>
            <ul>
              <li><a href="#how-it-works">How Meritto Works</a></li>
              <li><a href="#perks">Student Escrow Guarantee</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); if (onOpenAuthModal) onOpenAuthModal("register"); }}>College Verification</a></li>
              <li><a href="#perks">Portfolio Credential Badges</a></li>
              <li><a href="#">Instant UPI Payouts</a></li>
              <li><a href="#">Campus Safety Guidelines</a></li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div className="footer-links-col">
            <h4>For Clubs & Founders</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); if (onOpenAuthModal) onOpenAuthModal("post"); }}>Post a Student Opportunity <ArrowUpRight size={13} /></a></li>
              <li><a href="#">Hire Verified Campus Talent</a></li>
              <li><a href="#">Hackathon Sponsorships</a></li>
              <li><a href="#">College Club Partnerships</a></li>
              <li><a href="#">Recruiter Guidelines</a></li>
              <li><a href="#">Terms & Compliance</a></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="demo-notice-bar">
          <ShieldCheck size={16} className="notice-icon" />
          <p>
            <strong>DEMO MARKETPLACE PREVIEW:</strong> Listed opportunities,
            providers, and compensation values are illustrative samples for product
            evaluation and student experience demonstration.
          </p>
        </div>

        {/* Bottom Copyright & Credit */}
        <div className="footer-bottom-row">
          <p className="copyright-text">
            © 2026 Meritto Inc. Built for ambitious student builders.
          </p>
          <div className="made-with-love">
            <span>Crafted with</span>
            <Heart size={14} className="heart-icon" />
            <span>for collegiate hustle & talent</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
