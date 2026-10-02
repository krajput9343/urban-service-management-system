import React, { useEffect, useState } from "react";
import "../styles/Booking.css";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Booking() {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const loggedInUser =
    localStorage.getItem("loggedInUser");

  const selectedService =
    searchParams.get("service") || "";

  useEffect(() => {

    if (!loggedInUser) {
      navigate("/login");
    }

  }, [loggedInUser, navigate]);


  const [booking, setBooking] = useState({
    service: selectedService,
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    message: ""
  });


  const handleChange = (e) => {

    setBooking({
      ...booking,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    const existingBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const loggedInUser =
      JSON.parse(localStorage.getItem("loggedInUser"));

    const newBooking = {

      ...booking,

      id: Date.now(),

      userEmail: loggedInUser.email,

      status: "Pending"

    };


    existingBookings.push(newBooking);

    localStorage.setItem(
      "bookings",
      JSON.stringify(existingBookings)
    );

    console.log("Booking Data:", newBooking);

    alert("Booking submitted successfully!");

  };


  // Login nahi hai to Booking page show nahi hoga
  if (!loggedInUser) {
    return null;
  }


  return (

    <section className="booking-section">

      <div className="booking-container">

        <div className="booking-heading">

          <span>BOOK A SERVICE</span>

          <h2>
            Get Your Service
            <strong> Booked</strong>
          </h2>

          <p>
            Choose your service and provide your details.
            Our trusted professional will take care of the rest.
          </p>

        </div>


        <div className="booking-card">

          <form onSubmit={handleSubmit}>

            <div className="booking-grid">


              <div className="booking-group">

                <label>Service</label>

                <select
                  name="service"
                  value={booking.service}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Service
                  </option>

                  <option value="Home Cleaning">
                    Home Cleaning
                  </option>

                  <option value="Plumbing">
                    Plumbing
                  </option>

                  <option value="Electrician">
                    Electrician
                  </option>

                  <option value="AC Repair">
                    AC Repair
                  </option>

                  <option value="Carpenter">
                    Carpenter
                  </option>

                  <option value="Appliance Repair">
                    Appliance Repair
                  </option>

                </select>

              </div>


              <div className="booking-group">

                <label>Your Name</label>

                <input
                  type="text"
                  name="name"
                  value={booking.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />

              </div>


              <div className="booking-group">

                <label>Mobile Number</label>

                <input
                  type="tel"
                  name="phone"
                  value={booking.phone}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  required
                />

              </div>


              <div className="booking-group">

                <label>Booking Date</label>

                <input
                  type="date"
                  name="date"
                  value={booking.date}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="booking-group">

                <label>Preferred Time</label>

                <input
                  type="time"
                  name="time"
                  value={booking.time}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="booking-group full-width">

                <label>Address</label>

                <input
                  type="text"
                  name="address"
                  value={booking.address}
                  onChange={handleChange}
                  placeholder="Enter your complete address"
                  required
                />

              </div>


              <div className="booking-group full-width">

                <label>Problem / Description</label>

                <textarea
                  name="message"
                  value={booking.message}
                  onChange={handleChange}
                  placeholder="Tell us about your service requirement..."
                  rows="4"
                ></textarea>

              </div>

            </div>


            <button
              type="submit"
              className="booking-btn"
            >

              Confirm Booking

              <span>→</span>

            </button>

          </form>

        </div>

      </div>

    </section>

  );

}