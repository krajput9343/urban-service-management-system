
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8080/api/users/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: loginData.email.trim().toLowerCase(),
            password: loginData.password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Invalid email or password!"
        );
      }

      // Login user ko localStorage me save karna
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(data)
      );

      alert("Login successful!");

      navigate("/");

    } catch (error) {

      console.error("Login Error:", error);

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
    <section className="login-section">

      <div className="login-container">

        <div className="login-card">

          <div className="login-heading">

            <span>WELCOME BACK</span>

            <h1>
              Login to <strong>Urban Service</strong>
            </h1>

            <p>
              Login to manage your bookings and home services.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="login-group">

              <label>Email Address</label>

              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                required
              />

            </div>

            <div className="login-group">

              <label>Password</label>

              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

            </div>

            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
              {!loading && <span>→</span>}
            </button>

          </form>

          <div className="login-signup">

            <p>
              Don't have an account?
              <Link to="/signup"> Create Account</Link>
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}