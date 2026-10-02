import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      loginData.email === "admin@urbanservice.com" &&
      loginData.password === "admin123"
    ) {

      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      alert("Admin Login Successful!");

      navigate("/admin");

    } else {

      alert("Invalid Admin Email or Password!");

    }
  };

  return (
    <section className="admin-login-section">

      <div className="admin-login-container">

        <div className="admin-login-card">

          <div className="admin-login-heading">

            <span>ADMIN PANEL</span>

            <h1>
              Admin <strong>Login</strong>
            </h1>

            <p>
              Login to manage Urban Service bookings.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="admin-login-group">

              <label>Email Address</label>

              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Enter admin email"
                required
              />

            </div>

            <div className="admin-login-group">

              <label>Password</label>

              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter admin password"
                required
              />

            </div>

            <button
              type="submit"
              className="admin-login-btn"
            >
              Admin Login
              <span>→</span>
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}