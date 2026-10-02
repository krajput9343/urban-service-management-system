import React from "react";
import "../Styles/Categories.css";

import {
  FaBolt,
  FaFaucet,
  FaSnowflake,
  FaBroom,
  FaPaintRoller,
  FaHammer,
  FaEllipsisH,
} from "react-icons/fa";

export default function Categories() {

  const categories = [

    {
      icon: <FaBolt />,
      title: "Electrician",
    },

    {
      icon: <FaFaucet />,
      title: "Plumber",
    },

    {
      icon: <FaSnowflake />,
      title: "AC Repair",
    },

    {
      icon: <FaBroom />,
      title: "Cleaning",
    },

    {
      icon: <FaPaintRoller />,
      title: "Painter",
    },

    {
      icon: <FaHammer />,
      title: "Carpenter",
    },

    {
      icon: <FaEllipsisH />,
      title: "More",
    },

  ];

  return (

    <section className="categories">

      <div className="section-title">

        <h2>Popular Services</h2>

        <p>
          Choose from our most booked home services
        </p>

      </div>

      <div className="categories-grid">

        {

          categories.map((item, index) => (

            <div className="category-card" key={index}>

              <div className="category-icon">

                {item.icon}

              </div>

              <h4>{item.title}</h4>

            </div>

          ))

        }

      </div>

    </section>

  );
}