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

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }

    const existingUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    const userExists = existingUsers.some(
      (item) => item.email === user.email
    );

    if (userExists) {
      alert("User already registered with this email!");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      password: user.password,
      address: user.address
    };

    existingUsers.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(existingUsers)
    );

    alert("Account created successfully!");

    navigate("/login");
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
                  required
                ></textarea>
              </div>

            </div>

            <button
              type="submit"
              className="signup-submit-btn"
            >
              Create Account
              <span>→</span>
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