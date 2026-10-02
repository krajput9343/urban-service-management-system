import React from "react";
import "../styles/Contact.css";

export default function Contact() {
  return (
    <section className="contact-section" id="contact">

      <div className="contact-container">

        {/* Left Side */}
        <div className="contact-info">

          <span className="contact-tag">GET IN TOUCH</span>

          <h2>
            Need Help?
            <span> We’re Here For You.</span>
          </h2>

          <p>
            Have a question about our services or your booking?
            Contact Urban Service and our team will be happy to help you.
          </p>

          <div className="contact-details">

            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <h4>Our Location</h4>
                <p>Indore, Madhya Pradesh</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div>
                <h4>Call Us</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div>
                <h4>Email Us</h4>
                <p>support@urbanservice.com</p>
              </div>
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="contact-form">

          <h3>Send Us a Message</h3>

          <p>
            Fill out the form and we’ll get back to you soon.
          </p>

          <form>

            <div className="form-row">

              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                rows="5"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button type="submit" className="contact-btn">
              Send Message
              <span>→</span>
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}