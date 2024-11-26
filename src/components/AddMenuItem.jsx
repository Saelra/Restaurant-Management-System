/**
 * @description
 * A form component that allows users to add new menu items to the Restaurant Management System.
 * Handles input for the item's name, price, and description. After submission, it triggers the onAdd callback to save the item.
 *
 * @author
 * Ratanachat Saelee
 */

import React, { useState } from "react";
import PropTypes from "prop-types";

const AddMenuItem = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedPrice = parseFloat(price).toFixed(2);
    onAdd({ name, price: parseFloat(formattedPrice), description });
    setName("");
    setPrice("");
    setDescription("");
  };

  // Restrict price input to valid numbers (up to two decimal places)
  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setPrice(value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={handlePriceChange}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

AddMenuItem.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddMenuItem;
