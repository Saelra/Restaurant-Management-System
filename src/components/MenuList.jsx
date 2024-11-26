/**
 * @description
 * Renders a list of menu items with options to edit or delete each item.
 * Displays a fallback message if no items are available.
 *
 * @author Ratanachat Saelee
 * */

import React from "react";
import PropTypes from "prop-types";
import MenuItem from "./MenuItem";

/**
 * MenuList Component
 * Displays a list of menu items with edit and delete functionality.
 *
 * @param {Object[]} items - Array of menu items to display.
 * @param {number} items[].id - Unique identifier for the menu item.
 * @param {string} items[].name - Name of the menu item.
 * @param {number} items[].price - Price of the menu item.
 * @param {string} items[].description - Description of the menu item.
 * @param {Function} onEdit - Callback function triggered when editing an item.
 * @param {Function} onDelete - Callback function triggered when deleting an item.
 *
 * @returns {JSX.Element} The rendered list of menu items or a fallback message if no items exist.
 */
const MenuList = ({ items, onEdit, onDelete }) => (
  <div className="menu-list">
    {items.length ? (
      // Render a MenuItem component for each item in the list
      items.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))
    ) : (
      // Fallback message when there are no menu items
      <p>No items in the menu.</p>
    )}
  </div>
);

// Define expected prop types for the component
MenuList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MenuList;
