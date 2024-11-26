import React, { useState, useEffect } from "react";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const storedMenu = JSON.parse(localStorage.getItem("menuItems")) || [];
    setMenuItems(storedMenu);
  }, []);

  return (
    <div className="menu">
      <h2>Menu</h2>

      {menuItems.length === 0 ? (
        <p>No menu items available. Please add some.</p>
      ) : (
        <ul>
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
