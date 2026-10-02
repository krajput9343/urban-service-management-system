import React from "react";
import { Routes, Route } from "react-router-dom";
import Booking from "./pages/Booking";
import MyBooking from "./pages/MyBooking";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Services from "./pages/Services";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminServices from "./pages/AdminServices";

function App() {
  return (
    <Routes>

      {/* Main Single Page */}
      <Route path="/" element={<Home />} />

      {/* Authentication Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/booking" element={<Booking />} />
      <Route path="/mybooking" element={<MyBooking />} />
      
      <Route path="/services" element={<Services/>}/>

      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin-services" element={<AdminServices />} />


    </Routes>
  );
}

export default App;