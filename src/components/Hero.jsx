import React from "react";
import "../Styles/Hero.css";
import HeroImage from "../assets/images/hero1.png"; 

export default function Hero() {
  return (
    <section className="hero">

      {/* Left Side */}
      <div className="hero-left">

     <div className="hero-badge">
      👨‍🔧 Trusted by 5000+ Customers
     </div>

        <h1>
         Find Trusted <br />
         <span>Home Services</span>
        </h1>

        <p>
          Book verified professionals for cleaning, plumbing,
          electrician, AC repair and more — all at your doorstep.
        </p>

        {/* Search Box */}

        <div className="search-box">

          <input
            type="text"
            placeholder="Search for services..."
          />

          <button className="search-btn">Search</button>

        </div>

        {/* Stats */}

        <div className="hero-stats">

          <div className="stat-card">
            <h3>5000+</h3>
            <p>Experts</p>
          </div>

          <div className="stat-card">
            <h3 className="star-icon">4.9 ⭐</h3>
            <p>Rating</p>
          </div>

          <div className="stat-card">
            <h3>24/7</h3>
            <p>Support</p>
          </div>

        </div>

        {/* CTA Button */}

       <div className="hero-buttons">
        <button className="hero-btn">
          Book a Service
        </button>
       </div>

      </div>

      {/* Right Side */}

      <div className="hero-right">

        <div className="hero-right-image">

          <img src={HeroImage} alt="Hero" />

        </div>

      </div>

    </section>
  );
}



