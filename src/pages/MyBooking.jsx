import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyBooking.css";

export default function MyBooking() {

  const navigate = useNavigate();

  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  const [bookings, setBookings] = useState(() => {

    const allBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    if (!loggedInUser) {
      return [];
    }

    return allBookings.filter(
      (booking) => booking.userEmail === loggedInUser.email
    );
  });

  // Login nahi hai
  if (!loggedInUser) {

    return (
      <section className="mybooking-section">

        <div className="mybooking-container">

          <div className="no-booking">

            <div className="no-booking-icon">
              🔐
            </div>

            <h3>Please Login First</h3>

            <p>
              Login to view and manage your bookings.
            </p>

            <button
              className="cancel-booking-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

          </div>

        </div>

      </section>
    );
  }

  const handleCancel = (id) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }

    const allBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const updatedBookings = allBookings.filter(
      (booking) => booking.id !== id
    );

    setBookings(
      updatedBookings.filter(
        (booking) => booking.userEmail === loggedInUser.email
      )
    );

    localStorage.setItem(
      "bookings",
      JSON.stringify(updatedBookings)
    );
  };

  return (
    <section className="mybooking-section">

      <div className="mybooking-container">

        <div className="mybooking-heading">

          <span>MY BOOKINGS</span>

          <h2>
            Your Service <strong>Bookings</strong>
          </h2>

          <p>
            Track and manage your booked services from one place.
          </p>

        </div>

        <div className="mybooking-list">

          {bookings.length === 0 ? (

            <div className="no-booking">

              <div className="no-booking-icon">
                📋
              </div>

              <h3>No Bookings Found</h3>

              <p>
                You haven't booked any service yet.
              </p>

            </div>

          ) : (

            bookings.map((booking) => (

              <div
                className="mybooking-card"
                key={booking.id}
              >

                <div className="mybooking-icon">
                  🛠️
                </div>

                <div className="mybooking-info">

                  <h3>{booking.service}</h3>

                  <p>👤 {booking.name}</p>

                  <p>📅 {booking.date}</p>

                  <p>⏰ {booking.time}</p>

                  <p>📍 {booking.address}</p>

                </div>

                <div
                  className={`mybooking-status ${booking.status.toLowerCase()}`}
                >
                  {booking.status}
                </div>

                <button
                  className="cancel-booking-btn"
                  onClick={() => handleCancel(booking.id)}
                >
                  Cancel Booking
                </button>

              </div>

            ))

          )}

        </div>

      </div>

    </section>
  );
}