import React, { useState } from "react";
import "../Styles/Services.css";
import { Link } from "react-router-dom";

import AcRepair from "../assets/images/ac-repair.jpg";
import Plumber from "../assets/images/plumber.jpg";
import Electrician from "../assets/images/electrician.jpg";
import Cleaning from "../assets/images/cleaning.jpg";
import Painter from "../assets/images/painter.jpg";
import Carpenter from "../assets/images/carpenter.jpg";

export default function Services() {

    const defaultServices = [
        {
            id: 1,
            image: AcRepair,
            title: "AC Repair",
            category: "Repair",
            rating: "4.9",
            duration: "30-45 mins",
            price: "₹499"
        },
        {
            id: 2,
            image: Plumber,
            title: "Plumbing",
            category: "Plumbing",
            rating: "4.8",
            duration: "25-40 mins",
            price: "₹299"
        },
        {
            id: 3,
            image: Electrician,
            title: "Electrician",
            category: "Electrical",
            rating: "4.9",
            duration: "20-35 mins",
            price: "₹399"
        },
        {
            id: 4,
            image: Cleaning,
            title: "Home Cleaning",
            category: "Cleaning",
            rating: "4.7",
            duration: "2 Hours",
            price: "₹699"
        },
        {
            id: 5,
            image: Painter,
            title: "Painting",
            category: "Painting",
            rating: "4.8",
            duration: "1 Day",
            price: "₹999"
        },
        {
            id: 6,
            image: Carpenter,
            title: "Carpenter",
            category: "Repair",
            rating: "4.9",
            duration: "45 mins",
            price: "₹449"
        }
    ];

    /* =========================
       DEFAULT IMAGE FALLBACK
    ========================= */

    const getServiceImage = (title) => {

        const imageMap = {
            "AC Repair": AcRepair,
            "Plumbing": Plumber,
            "Electrician": Electrician,
            "Home Cleaning": Cleaning,
            "Painting": Painter,
            "Carpenter": Carpenter
        };

        return imageMap[title] || AcRepair;
    };


    /* =========================
       GET ADMIN SERVICES
    ========================= */

    const savedServices = JSON.parse(
        localStorage.getItem("services")
    );


    const services = savedServices
        ? savedServices.map((service) => ({

            ...service,

            // Admin uploaded image will be used first
            image: service.image || getServiceImage(service.title),

            rating: String(service.rating),

            price: `₹${service.price}`

        }))
        : defaultServices;


    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");


    /* =========================
       SEARCH + CATEGORY FILTER
    ========================= */

    const filteredServices = services.filter((service) => {

        const matchesSearch = service.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            category === "All" ||
            service.category === category;

        return matchesSearch && matchesCategory;
    });


    return (

        <section className="services-section">

            <div className="services-container">


                {/* =========================
                    HEADING
                ========================= */}

                <div className="services-heading">

                    <span>OUR SERVICES</span>

                    <h1>
                        Find the Right <strong>Service</strong>
                    </h1>

                    <p>
                        Choose from our trusted home services and book
                        verified professionals easily.
                    </p>

                </div>


                {/* =========================
                    SEARCH
                ========================= */}

                <div className="services-search">

                    <input
                        type="text"
                        placeholder="Search for a service..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>


                {/* =========================
                    CATEGORIES
                ========================= */}

                <div className="service-filters">

                    {[
                        "All",
                        "Cleaning",
                        "Plumbing",
                        "Electrical",
                        "Repair",
                        "Painting"
                    ].map((item) => (

                        <button
                            key={item}
                            className={
                                category === item ? "active" : ""
                            }
                            onClick={() => setCategory(item)}
                        >
                            {item}
                        </button>

                    ))}

                </div>


                {/* =========================
                    SERVICES
                ========================= */}

                <div className="services-grid">

                    {filteredServices.length > 0 ? (

                        filteredServices.map((service) => (

                            <div
                                className="service-card"
                                key={service.id}
                            >


                                {/* =========================
                                    SERVICE IMAGE
                                ========================= */}

                                <div className="service-image">

                                    <img
                                        src={service.image}
                                        alt={service.title}
                                    />

                                    <span className="service-rating">
                                        ⭐ {service.rating}
                                    </span>

                                </div>


                                {/* =========================
                                    SERVICE CONTENT
                                ========================= */}

                                <div className="service-content">

                                    <span className="service-category">
                                        {service.category}
                                    </span>

                                    <h3>
                                        {service.title}
                                    </h3>

                                    <p>
                                        Professional and reliable service
                                        for your home.
                                    </p>


                                    <div className="service-details">

                                        <span>
                                            ⏱ {service.duration}
                                        </span>

                                        <strong>
                                            {service.price}
                                        </strong>

                                    </div>


                                    {/* =========================
                                        BOOK NOW
                                    ========================= */}

                                    <Link
                                        to={`/booking?service=${encodeURIComponent(
                                            service.title
                                        )}`}
                                        className="service-btn"
                                    >
                                        Book Now →
                                    </Link>

                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="no-service">

                            <h3>
                                No Service Found
                            </h3>

                            <p>
                                Try searching for another service.
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </section>

    );
}