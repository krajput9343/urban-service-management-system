import React from "react";
import "../Styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      {/* ================= CTA ================= */}

      <div className="footer-cta">

        <div className="footer-brand">

          <h2>
            Urban<span>Service</span>
          </h2>

          <p>
            Trusted professionals for all your
            home service needs.
          </p>

        </div>


        <div className="footer-cta-content">

          <div>
            <h3>Need a service?</h3>

            <p>
              Book a verified professional today.
            </p>
          </div>

          <button className="footer-book-btn">
            Book a Service →
          </button>

        </div>

      </div>


      {/* ================= Footer Links ================= */}

      <div className="footer-content">

        {/* Company */}

        <div className="footer-column">

          <h3>Company</h3>

          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
          <a href="#">Blog</a>

        </div>


        {/* Services */}

        <div className="footer-column">

          <h3>Services</h3>

          <a href="#">Cleaning</a>
          <a href="#">Plumbing</a>
          <a href="#">AC Repair</a>
          <a href="#">Electrician</a>

        </div>


        {/* Support */}

        <div className="footer-column">

          <h3>Support</h3>

          <a href="#">Help Center</a>
          <a href="#">FAQs</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>

        </div>


        {/* Contact */}

        <div className="footer-column footer-contact">

          <h3>Get in Touch</h3>

          <p>
            📍 Indore, Madhya Pradesh
          </p>

          <p>
            ✉ support@urbanservice.com
          </p>

          <p>
            ☎ +91 98765 43210
          </p>

        </div>

      </div>


      {/* ================= Bottom ================= */}

      <div className="footer-bottom">

        <p>
          © 2026 UrbanService. All rights reserved.
        </p>


        <div className="footer-social">

          <a href="#">f</a>
          <a href="#">𝕏</a>
          <a href="#">in</a>
          <a href="#">◎</a>

        </div>

      </div>

    </footer>
  );
}