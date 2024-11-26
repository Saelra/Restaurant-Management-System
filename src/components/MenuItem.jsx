/**
 * @description
 * Represents a single menu item in the Restaurant Management System.
 * Provides edit and delete functionality for each item.
 * 
 * @author Ratanachat Saelee
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * MenuItem Component
 * Displays the details of a menu item and provides options to edit or delete it.
 * 
 * @param {Object} item - The menu item details.
 * @param {number} item.id - Unique identifier for the menu item.
 * @param {string} item.name - Name of the menu item.
 * @param {number} item.price - Price of the menu item.
 * @param {string} item.description - Description of the menu item.
 * @param {Function} onEdit - Callback function triggered when editing the menu item.
 * @param {Function} onDelete - Callback function triggered when deleting the menu item.
 * 
 * @returns {JSX.Element} The rendered menu item component.
 */
const MenuItem = ({ item, onEdit, onDelete }) => (
  <div className="menu-item">
    <h3>{item.name}</h3>
    <p>Price: ${item.price}</p>
    <p>Description: {item.description}</p>
    {/* Edit button triggers the onEdit callback with the item */}
    <button onClick={() => onEdit(item)}>Edit</button>
    {/* Delete button triggers the onDelete callback with the item ID */}
    <button onClick={() => onDelete(item.id)}>Delete</button>
  </div>
);

// Define expected prop types for the component
MenuItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MenuItem;