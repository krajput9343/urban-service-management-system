import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyBooking.css";

export default function MyBooking() {

  const navigate = useNavigate();

  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  const [bookings, setBookings] = useState([]);


  // =========================
  // BACKEND SE BOOKINGS FETCH
  // =========================
  useEffect(() => {

    if (!loggedInUser) {
      return;
    }

    fetch("http://localhost:8080/api/bookings")
      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        return response.json();

      })
      .then((data) => {

        const userBookings = data.filter(
          (booking) =>
            booking.userEmail === loggedInUser.email &&
            booking.status !== "Cancelled"
        );

        setBookings(userBookings);

      })
      .catch((error) => {

        console.error(
          "Error fetching bookings:",
          error
        );

      });

  }, [loggedInUser?.email]);


  // =========================
  // LOGIN NAHI HAI
  // =========================
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


  // =========================
  // CANCEL BOOKING
  // =========================
  const handleCancel = async (id) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:8080/api/bookings/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            status: "Cancelled"
          })
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to cancel booking"
        );
      }

      await response.json();

      // Customer side se cancelled booking remove
      setBookings((prevBookings) =>
        prevBookings.filter(
          (booking) => booking.id !== id
        )
      );

      alert("Booking cancelled successfully!");

    } catch (error) {

      console.error(
        "Cancel Booking Error:",
        error
      );

      alert("Failed to cancel booking.");

    }

  };


  // =========================
  // UI
  // =========================
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

                  <h3>
                    {booking.service}
                  </h3>

                  <p>
                    👤 {booking.name}
                  </p>

                  <p>
                    📅 {booking.date}
                  </p>

                  <p>
                    ⏰ {booking.time}
                  </p>

                  <p>
                    📍 {booking.address}
                  </p>

                </div>


                <div
                  className={`mybooking-status ${
                    booking.status?.toLowerCase()
                  }`}
                >
                  {booking.status}
                </div>


                {/* CANCEL BUTTON */}

                {booking.status !== "Cancelled" &&
                  booking.status !== "Completed" && (

                    <button
                      className="cancel-booking-btn"
                      onClick={() =>
                        handleCancel(booking.id)
                      }
                    >
                      Cancel Booking
                    </button>

                  )}

              </div>

            ))

          )}

        </div>

      </div>

    </section>
  );
}