import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import UrbanLogo from "../assets/images/urbanLogo.png";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {

    localStorage.removeItem("loggedInUser");

    alert("Logout successful!");

    closeMenu();

    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">

        <Link to="/" onClick={closeMenu}>
          <img
            src={UrbanLogo}
            alt="UrbanService"
          />
        </Link>

      </div>

      {/* Toggle */}
      <button
        className="toggle-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Menu */}
      <div className={`menu ${menuOpen ? "active" : ""}`}>

        <ul>

          <li>
            <a
              href="/"
              onClick={closeMenu}
            >
              Home
            </a>
          </li>

          <li>
            <a
              href="/#featured-services"
              onClick={closeMenu}
            >
              Services
            </a>
          </li>

          <li>
            <a
              href="#how-it-works"
              onClick={closeMenu}
            >
              How It Works
            </a>
          </li>

          {/* Reviews
          <li>
            <a
              href="#reviews"
              onClick={closeMenu}
            >
              Reviews
            </a>
          </li>
          */}

          <li>
            <a
              href="#contact"
              onClick={closeMenu}
            >
              Contact
            </a>
          </li>

          <li>
            <Link
              to="/mybooking"
              onClick={closeMenu}
            >
              My Booking
            </Link>
          </li>

        </ul>

      </div>

      {/* Auth Buttons */}
      <div className="auth-btn">

        {loggedInUser ? (

          <>
            <span className="user-name">
              Hi, {loggedInUser.name}
            </span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>

        ) : (

          <>
            <Link
              to="/login"
              className="login-btn"
              onClick={closeMenu}
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="signup-btn"
              onClick={closeMenu}
            >
              Signup
            </Link>
          </>

        )}

      </div>

    </nav>
  );
}