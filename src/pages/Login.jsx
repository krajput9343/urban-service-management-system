import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {

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

    const existingUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    const loggedUser = existingUsers.find(
      (user) =>
        user.email === loginData.email &&
        user.password === loginData.password
    );

    if (!loggedUser) {
      alert("Invalid email or password!");
      return;
    }

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(loggedUser)
    );

    alert("Login successful!");

    navigate("/");
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
                required
              />

            </div>

            <button
              type="submit"
              className="login-submit-btn"
            >
              Login
              <span>→</span>
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