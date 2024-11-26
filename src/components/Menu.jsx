/**
 * @description
 * Displays the menu items stored in local storage for the Restaurant Management System.
 * If no items are available, it prompts the user to add menu items.
 *
 * @author
 * Ratanachat Saelee
 */

import React, { useState, useEffect } from "react";

/**
 * Menu Component
 * Fetches and displays the menu items stored in local storage.
 * If no menu items are found, it prompts the user to add menu items.
 *
 * @returns {JSX.Element} The rendered menu component displaying list of menu items or a message if no items exist.
 */
const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  // Fetch menu items from local storage when the component is mounted
  useEffect(() => {
    const storedMenu = JSON.parse(localStorage.getItem("menuItems")) || [];
    setMenuItems(storedMenu);
  }, []);

  return (
    <div className="menu">
      <h2>Menu</h2>

      {menuItems.length === 0 ? (
        // If there are no menu items, show a message to the user
        <p>No menu items available. Please add some.</p>
      ) : (
        <ul>
          {/* Render each menu item as a list item */}
          {menuItems.map((item, index) => (
            <li key={index}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p className="price">${item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Menu;
