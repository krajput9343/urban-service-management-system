import React, { useEffect, useState } from "react";
import "../styles/AdminServices.css";

export default function AdminServices() {

  const defaultServices = [
    {
      id: 1,
      title: "AC Repair",
      category: "Repair",
      price: 499,
      duration: "30-45 mins",
      rating: 4.9
    },
    {
      id: 2,
      title: "Plumbing",
      category: "Plumbing",
      price: 299,
      duration: "25-40 mins",
      rating: 4.8
    },
    {
      id: 3,
      title: "Electrician",
      category: "Electrical",
      price: 399,
      duration: "20-35 mins",
      rating: 4.9
    },
    {
      id: 4,
      title: "Home Cleaning",
      category: "Cleaning",
      price: 699,
      duration: "2 Hours",
      rating: 4.7
    }
  ];

  // =========================
  // SERVICES
  // =========================

  const [services, setServices] = useState(defaultServices);

  // =========================
  // GET SERVICES FROM BACKEND
  // =========================

  useEffect(() => {
    fetch("http://localhost:8080/api/services")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        return response.json();
      })
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  const [showForm, setShowForm] = useState(false);

  const [editId, setEditId] = useState(null);

  // =========================
  // FORM DATA
  // =========================

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    duration: "",
    rating: "",
    image: ""
  });

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // HANDLE IMAGE
  // =========================

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Only image files
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file!");
      return;
    }

    // File size check - 2 MB
    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2 MB!");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {

      setFormData((prev) => ({
        ...prev,
        image: reader.result
      }));

    };

    reader.readAsDataURL(file);
  };

  // =========================
  // ADD / EDIT SERVICE
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !formData.title ||
      !formData.category ||
      !formData.price ||
      !formData.duration ||
      !formData.rating
    ) {
      alert("Please fill all fields!");
      return;
    }

    // Image required only while adding
    if (editId === null && !formData.image) {
      alert("Please select a service image!");
      return;
    }

    try {

      // =========================
      // EDIT SERVICE
      // =========================

      if (editId !== null) {

        const existingService = services.find(
          (service) => service.id === editId
        );

        const serviceData = {
          title: formData.title,
          category: formData.category,
          price: Number(formData.price),
          duration: formData.duration,
          rating: Number(formData.rating),

          // Keep old image if new image is not selected
          image:
            formData.image ||
            existingService?.image ||
            ""
        };

        const response = await fetch(
          `http://localhost:8080/api/services/${editId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(serviceData)
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update service");
        }

        const updatedService = await response.json();

        setServices((prevServices) =>
          prevServices.map((service) =>
            service.id === editId
              ? updatedService
              : service
          )
        );

        alert("Service updated successfully!");
      }

      // =========================
      // ADD SERVICE
      // =========================

      else {

        const newServiceData = {
          title: formData.title,
          category: formData.category,
          price: Number(formData.price),
          duration: formData.duration,
          rating: Number(formData.rating),
          image: formData.image
        };

        const response = await fetch(
          "http://localhost:8080/api/services",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newServiceData)
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add service");
        }

        const newService = await response.json();

        setServices((prevServices) => [
          ...prevServices,
          newService
        ]);

        alert("Service added successfully!");
      }

      // =========================
      // RESET FORM
      // =========================

      setFormData({
        title: "",
        category: "",
        price: "",
        duration: "",
        rating: "",
        image: ""
      });

      setEditId(null);

      setShowForm(false);

    } catch (error) {

      console.error("Error:", error);

      alert("Something went wrong!");

    }
  };

  // =========================
  // EDIT SERVICE
  // =========================

  const handleEdit = (service) => {

    setFormData({

      title: service.title,

      category: service.category,

      price: service.price,

      duration: service.duration,

      rating: service.rating,

      image: service.image || ""
    });

    setEditId(service.id);

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // =========================
  // DELETE SERVICE
  // =========================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:8080/api/services/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete service");
      }

      setServices((prevServices) =>
        prevServices.filter(
          (service) => service.id !== id
        )
      );

      alert("Service deleted successfully!");

    } catch (error) {

      console.error("Error deleting service:", error);

      alert("Something went wrong!");

    }
  };

  // =========================
  // CANCEL FORM
  // =========================

  const handleCancel = () => {

    setFormData({
      title: "",
      category: "",
      price: "",
      duration: "",
      rating: "",
      image: ""
    });

    setEditId(null);

    setShowForm(false);
  };

  return (

    <section className="admin-services">

      <div className="admin-services-container">

        {/* =========================
            HEADER
        ========================= */}

        <div className="admin-services-header">

          <div>

            <span>
              ADMIN PANEL
            </span>

            <h1>
              Manage <strong>Services</strong>
            </h1>

            <p>
              Add, edit and manage your home services.
            </p>

          </div>

          <button
            className="add-service-btn"
            onClick={() => {

              if (showForm) {

                handleCancel();

              } else {

                setShowForm(true);

              }

            }}
          >

            {showForm
              ? "✕ Close Form"
              : "+ Add Service"}

          </button>

        </div>


        {/* =========================
            ADD / EDIT FORM
        ========================= */}

        {showForm && (

          <div className="admin-service-form">

            <h2>
              {editId !== null
                ? "Edit Service"
                : "Add New Service"}
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="service-form-grid">

                {/* Service Name */}

                <div className="service-form-group">

                  <label>
                    Service Name
                  </label>

                  <input
                    type="text"
                    name="title"
                    placeholder="e.g. Fan Repair"
                    value={formData.title}
                    onChange={handleChange}
                  />

                </div>


                {/* Category */}

                <div className="service-form-group">

                  <label>
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Category
                    </option>

                    <option value="Cleaning">
                      Cleaning
                    </option>

                    <option value="Plumbing">
                      Plumbing
                    </option>

                    <option value="Electrical">
                      Electrical
                    </option>

                    <option value="Repair">
                      Repair
                    </option>

                    <option value="Painting">
                      Painting
                    </option>

                  </select>

                </div>


                {/* Price */}

                <div className="service-form-group">

                  <label>
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    placeholder="e.g. 499"
                    value={formData.price}
                    onChange={handleChange}
                  />

                </div>


                {/* Duration */}

                <div className="service-form-group">

                  <label>
                    Duration
                  </label>

                  <input
                    type="text"
                    name="duration"
                    placeholder="e.g. 30-45 mins"
                    value={formData.duration}
                    onChange={handleChange}
                  />

                </div>


                {/* Rating */}

                <div className="service-form-group">

                  <label>
                    Rating
                  </label>

                  <input
                    type="number"
                    name="rating"
                    placeholder="e.g. 4.8"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={handleChange}
                  />

                </div>


                {/* IMAGE UPLOAD */}

                <div className="service-form-group">

                  <label>
                    Service Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />

                  <small className="image-help-text">
                    JPG, PNG, WEBP — Max 2 MB
                  </small>

                </div>

              </div>


              {/* IMAGE PREVIEW */}

              {formData.image && (

                <div className="service-image-preview">

                  <span>
                    Image Preview
                  </span>

                  <img
                    src={formData.image}
                    alt="Service Preview"
                  />

                </div>

              )}


              {/* FORM BUTTONS */}

              <div className="service-form-actions">

                <button
                  type="button"
                  className="service-form-cancel"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="service-form-save"
                >

                  {editId !== null
                    ? "Save Changes"
                    : "Save Service"}

                </button>

              </div>

            </form>

          </div>

        )}


        {/* =========================
            SERVICE LIST
        ========================= */}

        <div className="admin-services-list">

          {services.map((service) => (

            <div
              className="admin-service-card"
              key={service.id}
            >

              {/* SERVICE IMAGE */}

              <div className="admin-service-image">

                {service.image ? (

                  <img
                    src={service.image}
                    alt={service.title}
                  />

                ) : (

                  <div className="admin-service-icon">
                    🛠️
                  </div>

                )}

              </div>


              {/* SERVICE INFO */}

              <div className="admin-service-info">

                <h3>
                  {service.title}
                </h3>

                <p>
                  Category: {service.category}
                </p>

                <p>
                  Duration: {service.duration}
                </p>

                <p>
                  ⭐ {service.rating}
                </p>

              </div>


              {/* PRICE */}

              <div className="admin-service-price">

                <h3>
                  ₹{service.price}
                </h3>

                <span>
                  Starting Price
                </span>

              </div>


              {/* ACTIONS */}

              <div className="admin-service-actions">

                <button
                  className="edit-service-btn"
                  onClick={() => handleEdit(service)}
                >
                  Edit
                </button>

                <button
                  className="delete-service-btn"
                  onClick={() => handleDelete(service.id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );
}