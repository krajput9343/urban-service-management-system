import React from "react";
import "../Styles/HowItWork.css";

import { FaSearch, FaCalendarCheck, FaHome } from "react-icons/fa";

export default function HowItWorks() {

  const steps = [
    {
      id: 1,
      icon: <FaSearch />,
      title: "Choose a Service",
      description:
        "Select the home service you need from our wide range of trusted services."
    },

    {
      id: 2,
      icon: <FaCalendarCheck />,
      title: "Book a Professional",
      description:
        "Choose a verified professional and select a convenient time for your service."
    },

    {
      id: 3,
      icon: <FaHome />,
      title: "Get the Service",
      description:
        "Our professional arrives at your doorstep and provides the service you booked."
    }
  ];

  return (
    <section className="how-it-works">

      {/* Section Heading */}

      <div className="how-title">

        <h2>How It Works</h2>

        <p>
          Book trusted home services in just three simple steps.
        </p>

      </div>


      {/* Steps */}

      <div className="steps-container">

        {steps.map((step) => (

          <div className="step-card" key={step.id}>

            {/* Number */}

            <div className="step-number">
              {step.id}
            </div>

            {/* Icon */}

            <div className="step-icon">
              {step.icon}
            </div>

            {/* Content */}

            <h3>
              {step.title}
            </h3>

            <p>
              {step.description}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}