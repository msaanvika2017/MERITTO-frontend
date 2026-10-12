import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Zap,
  Bell,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  LayoutDashboard,
  Users,
  ShieldCheck,
} from "lucide-react";
import "./AppNavbar.css";

export default function AppNavbar({ onShowToast }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = () => {
    if (onShowToast) {
      onShowToast("You're all caught up! ✨ No new unread notifications.");
    }
  };

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const isDashboardActive =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/club") ||
    location.pathname.startsWith("/admin");

  return (
    <header className="navbar">
      {/* Brand logo */}
      <Link to="/" className="brand" aria-label="Meritto Home" onClick={closeAllMenus}>
        <span className="brand-symbol">
          <Zap size={22} fill="currentColor" />
        </span>
        <span className="brand-name">
          meritto<span className="brand-dot">.</span>
        </span>
      </Link>

      {/* Desktop Navigation Links */}
      <nav
        className={`nav-links ${mobileMenuOpen ? "nav-open" : ""}`}
        aria-label="Main Navigation"
      >
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={closeAllMenus}
        >
          Home
        </NavLink>

        <NavLink
          to="/opportunities"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={closeAllMenus}
        >
          Explore Gigs
        </NavLink>

        <NavLink
          to="/applications"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={closeAllMenus}
        >
          Applications
        </NavLink>

        <NavLink
          to="/earnings"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={closeAllMenus}
        >
          Earnings
        </NavLink>

        {/* Dashboards Dropdown (Desktop) */}
        <div className="nav-dropdown-wrapper" ref={dropdownRef}>
          <button
            type="button"
            className={`nav-dropdown-trigger ${isDashboardActive ? "active" : ""}`}
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            <span>Dashboards</span>
            <ChevronDown size={14} />
          </button>

          {dropdownOpen && (
            <div className="nav-dropdown-menu" role="menu">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `nav-dropdown-item ${isActive ? "active" : ""}`
                }
                onClick={closeAllMenus}
                role="menuitem"
              >
                <LayoutDashboard size={15} />
                <span>Student Hub</span>
                <span className="nav-role-badge badge-student">Student</span>
              </NavLink>

              <NavLink
                to="/club"
                className={({ isActive }) =>
                  `nav-dropdown-item ${isActive ? "active" : ""}`
                }
                onClick={closeAllMenus}
                role="menuitem"
              >
                <Users size={15} />
                <span>Club Hub</span>
                <span className="nav-role-badge badge-club">Club</span>
              </NavLink>

              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `nav-dropdown-item ${isActive ? "active" : ""}`
                }
                onClick={closeAllMenus}
                role="menuitem"
              >
                <ShieldCheck size={15} />
                <span>Admin Console</span>
                <span className="nav-role-badge badge-admin">Admin</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile menu additions */}
        {mobileMenuOpen && (
          <>
            <div className="mobile-nav-heading">Role Dashboards</div>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeAllMenus}
            >
              Student Hub
            </NavLink>
            <NavLink
              to="/club"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeAllMenus}
            >
              Club Dashboard
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeAllMenus}
            >
              Admin Console
            </NavLink>
            <div className="mobile-nav-heading">Account</div>
            <Link
              to="/login"
              onClick={closeAllMenus}
            >
              Log in
            </Link>
            <Link
              to="/register"
              onClick={closeAllMenus}
            >
              Get started (Register)
            </Link>
          </>
        )}
      </nav>

      {/* Right actions */}
      <div className="nav-actions">
        <button
          className="icon-button notification-button"
          aria-label="Notifications"
          onClick={handleNotificationClick}
          type="button"
        >
          <Bell size={19} />
          <span className="notification-indicator" />
        </button>

        <Link to="/login" className="nav-login" onClick={closeAllMenus}>
          Log in
        </Link>

        <Link to="/register" className="button-primary nav-join" onClick={closeAllMenus}>
          <span>Get started</span>
          <ArrowRight size={16} />
        </Link>

        <button
          className="icon-button mobile-menu-button"
          aria-label="Toggle navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
          type="button"
        >
          {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
    </header>
  );
}
