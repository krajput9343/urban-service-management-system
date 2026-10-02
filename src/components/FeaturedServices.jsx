import React from "react";
import "../Styles/FeaturedServices.css";
import { Link } from "react-router-dom";

import AcRepair from "../assets/images/ac-repair.jpg";
import Plumber from "../assets/images/plumber.jpg";
import Electrician from "../assets/images/electrician.jpg";
import Cleaning from "../assets/images/cleaning.jpg";
import Painter from "../assets/images/painter.jpg";
import Carpenter from "../assets/images/carpenter.jpg";

export default function FeaturedServices() {

    const services = [

        {
            id: 1,
            image: AcRepair,
            title: "AC Repair",
            rating: "4.9",
            duration: "30-45 mins",
            price: "₹499"
        },

        {
            id: 2,
            image: Plumber,
            title: "Plumbing",
            rating: "4.8",
            duration: "25-40 mins",
            price: "₹299"
        },

        {
            id: 3,
            image: Electrician,
            title: "Electrician",
            rating: "4.9",
            duration: "20-35 mins",
            price: "₹399"
        },

        {
            id: 4,
            image: Cleaning,
            title: "Home Cleaning",
            rating: "4.7",
            duration: "2 Hours",
            price: "₹699"
        },

        {
            id: 5,
            image: Painter,
            title: "Painting",
            rating: "4.8",
            duration: "1 Day",
            price: "₹999"
        },

        {
            id: 6,
            image: Carpenter,
            title: "Carpenter",
            rating: "4.9",
            duration: "45 mins",
            price: "₹449"
        }

    ];

    return (

        <section
            className="featured-services"
            id="featured-services"
        >

            <div className="section-title">

                <h2>Featured Services</h2>

                <p>
                    Book the most trusted professionals for your home.
                </p>

            </div>

            <div className="services-grid">

                {

                    services.map((service) => (

                        <div className="service-card" key={service.id}>

                            <div className="service-image">

                                <img
                                    src={service.image}
                                    alt={service.title}
                                />

                                <span className="rating">

                                    ⭐ {service.rating}

                                </span>

                            </div>

                            <div className="service-content">

                                <h3>{service.title}</h3>

                                <p>{service.duration}</p>

                                <div className="price-row">

                                    <h4>{service.price}</h4>

                                    <Link
                                        to={`/booking?service=${encodeURIComponent(service.title)}`}
                                        className="service-btn"
                                    >
                                        Book Now
                                        <span>→</span>
                                    </Link>

                                </div>

                                <div className="view-all-services">
                                    <Link to="/services" className="view-all-btn">
                                        View All Services
                                        <span>→</span>
                                    </Link>
                                </div>
                            </div>

                        </div>

                    ))

                }

            </div>

        </section>

    )

}