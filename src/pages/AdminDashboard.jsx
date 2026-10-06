import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");


  // =========================
  // CHECK ADMIN LOGIN + FETCH BOOKINGS
  // =========================
  useEffect(() => {

    const adminLoggedIn =
      localStorage.getItem("adminLoggedIn");

    if (adminLoggedIn !== "true") {
      navigate("/admin-login");
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

        setBookings(data);

      })
      .catch((error) => {

        console.error(
          "Error fetching bookings:",
          error
        );

      });

  }, [navigate]);


  // =========================
  // UPDATE BOOKING STATUS
  // =========================
  const updateStatus = async (id, newStatus) => {

    try {

      const response = await fetch(
        `http://localhost:8080/api/bookings/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            status: newStatus
          })
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update booking status"
        );
      }

      const updatedBooking =
        await response.json();

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id
            ? updatedBooking
            : booking
        )
      );

      alert(
        `Booking ${newStatus} successfully!`
      );

    } catch (error) {

      console.error(
        "Update Status Error:",
        error
      );

      alert(
        "Failed to update booking status."
      );

    }

  };


  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {

    localStorage.removeItem(
      "adminLoggedIn"
    );

    alert("Admin Logout Successful!");

    navigate("/admin-login");

  };


  // =========================
  // STATS
  // =========================
  const totalBookings =
    bookings.length;

  const pendingBookings =
    bookings.filter(
      (booking) =>
        booking.status === "Pending"
    ).length;

  const confirmedBookings =
    bookings.filter(
      (booking) =>
        booking.status === "Confirmed"
    ).length;

  const completedBookings =
    bookings.filter(
      (booking) =>
        booking.status === "Completed"
    ).length;

  const cancelledBookings =
    bookings.filter(
      (booking) =>
        booking.status === "Cancelled"
    ).length;


  // =========================
  // SEARCH + FILTER
  // =========================
  const filteredBookings =
    bookings.filter((booking) => {

      const searchText =
        search.toLowerCase();

      const matchesSearch =
        booking.name
          ?.toLowerCase()
          .includes(searchText) ||

        booking.service
          ?.toLowerCase()
          .includes(searchText) ||

        booking.phone
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        booking.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );

    });


  return (

    <div className="admin-dashboard">


      {/* =========================
          HEADER
      ========================= */}

      <div className="admin-dashboard-header">

        <div>

          <span>
            ADMIN PANEL
          </span>

          <h1>
            Admin <strong>Dashboard</strong>
          </h1>

          <p>
            Manage customer bookings and service requests
          </p>

        </div>


        <button
          className="admin-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>


      {/* =========================
          STATS
      ========================= */}

      <div className="admin-stats">


        <div className="admin-stat-card">

          <div className="stat-icon">
            📋
          </div>

          <div>

            <span>
              Total Bookings
            </span>

            <h2>
              {totalBookings}
            </h2>

          </div>

        </div>


        <div className="admin-stat-card">

          <div className="stat-icon">
            ⏳
          </div>

          <div>

            <span>
              Pending
            </span>

            <h2>
              {pendingBookings}
            </h2>

          </div>

        </div>


        <div className="admin-stat-card">

          <div className="stat-icon">
            ✓
          </div>

          <div>

            <span>
              Confirmed
            </span>

            <h2>
              {confirmedBookings}
            </h2>

          </div>

        </div>


        <div className="admin-stat-card">

          <div className="stat-icon">
            ✔
          </div>

          <div>

            <span>
              Completed
            </span>

            <h2>
              {completedBookings}
            </h2>

          </div>

        </div>


        <div className="admin-stat-card">

          <div className="stat-icon">
            ✕
          </div>

          <div>

            <span>
              Cancelled
            </span>

            <h2>
              {cancelledBookings}
            </h2>

          </div>

        </div>


      </div>


      {/* =========================
          BOOKINGS SECTION
      ========================= */}

      <div className="admin-bookings-section">


        <div className="admin-bookings-header">

          <div>

            <h2>
              All Bookings
            </h2>

            <p>
              View and manage customer service bookings
            </p>

          </div>


          {/* SEARCH + FILTER */}

          <div className="admin-booking-filters">

            <input
              type="text"
              placeholder="Search booking..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />


            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
            >

              <option value="All">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Confirmed">
                Confirmed
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

          </div>

        </div>


        {/* =========================
            BOOKING LIST
        ========================= */}

        <div className="admin-bookings-list">


          {filteredBookings.length === 0 ? (

            <div className="no-bookings">

              <h3>
                No bookings found
              </h3>

              <p>
                There are no bookings matching your search or filter.
              </p>

            </div>

          ) : (

            filteredBookings.map(
              (booking) => (

                <div
                  className="admin-booking-card"
                  key={booking.id}
                >


                  {/* =========================
                      BOOKING TOP
                  ========================= */}

                  <div className="admin-booking-top">

                    <div>

                      <span className="booking-label">
                        SERVICE
                      </span>

                      <h3>
                        {booking.service}
                      </h3>

                    </div>


                    <span
                      className={`booking-status ${
                        booking.status
                          ?.toLowerCase()
                          .replace(
                            /\s+/g,
                            "-"
                          )
                      }`}
                    >
                      {booking.status}
                    </span>

                  </div>


                  {/* =========================
                      BOOKING DETAILS
                  ========================= */}

                  <div className="admin-booking-details">


                    <div>

                      <span>
                        Customer
                      </span>

                      <strong>
                        {booking.name}
                      </strong>

                    </div>


                    <div>

                      <span>
                        Phone
                      </span>

                      <strong>
                        {booking.phone}
                      </strong>

                    </div>


                    <div>

                      <span>
                        Date
                      </span>

                      <strong>
                        {booking.date}
                      </strong>

                    </div>


                    <div>

                      <span>
                        Time
                      </span>

                      <strong>
                        {booking.time}
                      </strong>

                    </div>


                  </div>


                  {/* =========================
                      ADDRESS
                  ========================= */}

                  <div className="admin-booking-address">

                    <span>
                      Address
                    </span>

                    <p>
                      {booking.address}
                    </p>

                  </div>


                  {/* =========================
                      MESSAGE
                  ========================= */}

                  {booking.message && (

                    <div className="admin-booking-message">

                      <span>
                        Message
                      </span>

                      <p>
                        {booking.message}
                      </p>

                    </div>

                  )}


                  {/* =========================
                      ACTION BUTTONS
                  ========================= */}

                  <div className="admin-action-buttons">


                    {/* PENDING */}

                    {booking.status === "Pending" && (

                      <>

                        <button
                          className="confirm-btn"
                          onClick={() =>
                            updateStatus(
                              booking.id,
                              "Confirmed"
                            )
                          }
                        >
                          Confirm
                        </button>


                        <button
                          className="cancel-btn"
                          onClick={() =>
                            updateStatus(
                              booking.id,
                              "Cancelled"
                            )
                          }
                        >
                          Cancel
                        </button>

                      </>

                    )}


                    {/* CONFIRMED */}

                    {booking.status === "Confirmed" && (

                      <>

                        <button
                          className="complete-btn"
                          onClick={() =>
                            updateStatus(
                              booking.id,
                              "Completed"
                            )
                          }
                        >
                          Complete
                        </button>


                        <button
                          className="cancel-btn"
                          onClick={() =>
                            updateStatus(
                              booking.id,
                              "Cancelled"
                            )
                          }
                        >
                          Cancel
                        </button>

                      </>

                    )}

                  </div>


                </div>

              )

            )

          )}

        </div>

      </div>

    </div>

  );

};

export default AdminDashboard;