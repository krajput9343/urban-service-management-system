import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css";

export default function AdminLogin() {
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

    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: loginData.email.trim(),
          password: loginData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Invalid email or password!");
        return;
      }

      if (!data.token) {
        alert("Login failed: backend did not return an authentication token.");
        return;
      }

      if (String(data.role || "").toUpperCase() !== "ADMIN") {
        alert("Access denied! Only an admin account can access the Admin Panel.");
        return;
      }

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("loggedInUser", JSON.stringify(data));
      localStorage.setItem("adminLoggedIn", "true");

      alert("Admin Login Successful!");
      navigate("/admin");
    } catch (error) {
      console.error("Admin login error:", error);
      alert("Backend se connect nahi ho pa raha. Check karo ki Spring Boot running hai.");
    } finally {
      setLoading(false);
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
                autoComplete="username"
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
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="admin-login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Admin Login"}
              {!loading && <span>→</span>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}