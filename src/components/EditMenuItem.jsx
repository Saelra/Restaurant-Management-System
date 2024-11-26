/**
 * @description
 * Renders a form to edit an existing menu item. Allows users to update the name, price, and description of the menu item.
 * After saving, it triggers the `onSave` function passed via props to persist the changes.
 *
 * @author
 * Ratanachat Saelee
 */

import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * EditMenuItem Component
 * Provides a form to edit an existing menu item and save the changes.
 *
 * @param {Object} item - The menu item to be edited.
 * @param {Function} onSave - Callback function to save the edited item.
 *
 * @returns {JSX.Element} The form for editing the menu item.
 */
const EditMenuItem = ({ item, onSave }) => {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.description);

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedPrice = parseFloat(price).toFixed(2);
    onSave({ ...item, name, price: parseFloat(formattedPrice), description });
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
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input type="text" value={price} onChange={handlePriceChange} required />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

// Prop validation to ensure correct data types for the props
EditMenuItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditMenuItem;
