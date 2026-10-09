
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Signup.css";

export default function Signup() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8080/api/users/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name: user.name.trim(),
            mobile: user.mobile.trim(),
            email: user.email.trim().toLowerCase(),
            password: user.password,
            address: user.address.trim()
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Account creation failed!"
        );
      }

      alert("Account created successfully!");

      navigate("/login");

    } catch (error) {

      console.error("Signup Error:", error);

      alert(
        error.message === "Failed to fetch"
          ? "Backend is not running. Please try again."
          : error.message
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <section className="signup-section">

      <div className="signup-container">

        <div className="signup-card">

          <div className="signup-heading">
            <span>CREATE ACCOUNT</span>

            <h1>
              Join <strong>Urban Service</strong>
            </h1>

            <p>
              Create your account and book trusted home services easily.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="signup-grid">

              {/* Full Name */}
              <div className="signup-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>

              {/* Mobile */}
              <div className="signup-group">
                <label>Mobile Number</label>

                <input
                  type="tel"
                  name="mobile"
                  value={user.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  pattern="[0-9]{10}"
                  autoComplete="tel"
                  required
                />
              </div>

              {/* Email */}
              <div className="signup-group full-width">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </div>

              {/* Password */}
              <div className="signup-group">
                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  minLength="6"
                  autoComplete="new-password"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="signup-group">
                <label>Confirm Password</label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  minLength="6"
                  autoComplete="new-password"
                  required
                />
              </div>

              {/* Address */}
              <div className="signup-group full-width">
                <label>Address</label>

                <textarea
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  placeholder="Enter your complete address"
                  rows="3"
                  autoComplete="street-address"
                  required
                ></textarea>
              </div>

            </div>

            <button
              type="submit"
              className="signup-submit-btn"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <span>→</span>}
            </button>

          </form>

          <div className="signup-login">
            <p>
              Already have an account?
              <Link to="/login"> Login</Link>
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}