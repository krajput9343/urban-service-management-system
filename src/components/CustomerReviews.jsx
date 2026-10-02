import React from "react";
import "../Styles/CustomerReviews.css";

export default function CustomerReviews() {

  const reviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      service: "AC Repair Service",
      rating: "4.9",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      review:
        "Very quick and professional service. The technician arrived on time and fixed my AC perfectly."
    },

    {
      id: 2,
      name: "Priya Verma",
      service: "Home Cleaning Service",
      rating: "5.0",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      review:
        "Excellent cleaning service. The professional was polite, experienced and did a great job."
    },

    {
      id: 3,
      name: "Amit Patel",
      service: "Plumbing Service",
      rating: "4.8",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      review:
        "The booking process was very easy and the plumber solved the issue quickly. Highly recommended."
    }
  ];

  return (
    <section className="customer-reviews">

      {/* Heading */}

      <div className="reviews-heading">

        <div className="reviews-label">
          <span>★</span>
          CUSTOMER REVIEWS
        </div>

        <h2>
          What Our Customers Say
        </h2>

        <p>
          Thousands of customers trust our professionals
          for their everyday home services.
        </p>

      </div>


      {/* Review Cards */}

      <div className="reviews-container">

        {reviews.map((review) => (

          <div className="review-card" key={review.id}>

            {/* Quote */}

            <div className="quote-icon">
              “
            </div>


            {/* Customer */}

            <div className="customer-info">

              <img
                src={review.image}
                alt={review.name}
                className="customer-image"
              />

              <div>
                <h3>
                  {review.name}
                </h3>

                <p>
                  {review.service}
                </p>
              </div>

            </div>


            {/* Rating */}

            <div className="review-rating">

              <div className="stars">
                ★★★★★
              </div>

              <span>
                {review.rating}
              </span>

            </div>


            {/* Review */}

            <p className="review-text">
              {review.review}
            </p>


            {/* Verified */}

            <div className="verified-customer">

              <span>✓</span>

              Verified Customer

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}