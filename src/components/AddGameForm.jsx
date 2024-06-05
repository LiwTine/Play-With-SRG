// src/components/AddGameForm.js

import React, { useState } from "react";
import axios from "axios";
import "./styles/AddGameForm.css";

const AddGameForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageURL: "",
    rating: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Перевіряємо, чи введене значення знаходиться в межах від 0 до 100
    if (
      name === "rating" &&
      (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 100))
    ) {
      setFormData({ ...formData, [name]: value });
    } else if (name !== "rating") {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/games", formData);
      // Redirect to home page after successful submission
      window.location.href = "/";
    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  return (
    <div className="add-game-form-container">
      <h1>Add New Game</h1>
      <form className="add-game-form" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <label>Image URL:</label>
        <input
          type="text"
          name="imageURL"
          value={formData.imageURL}
          onChange={handleChange}
          required
        />
        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddGameForm;
