import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to={user ? "/dashboard" : "/"} className="brand-link">
          <span className="brand-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path d="M21 3L14.5 21L10 14L3 9.5L21 3Z" stroke="url(#nav_paint_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 14L21 3" stroke="url(#nav_paint_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="nav_paint_linear" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="brand-name">AI Powered Trip Planner</span>
        </Link>
      </div>

      {/* Hamburger for mobile */}
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        id="hamburger-btn"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
        {!user ? (
          <>
            <li>
              <Link
                to="/login"
                className={`nav-link ${isActive("/login") ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
                id="nav-login"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className={`nav-link nav-btn ${isActive("/register") ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
                id="nav-register"
              >
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/dashboard"
                className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
                id="nav-dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-user">
              <span className="user-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </span>
              <span className="user-name">{user.name}</span>
            </li>
            <li>
              <button
                className="nav-link nav-logout-btn"
                onClick={handleLogout}
                id="nav-logout"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
