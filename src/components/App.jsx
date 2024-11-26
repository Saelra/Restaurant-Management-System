import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MenuList from "./MenuList";
import AddMenuItem from "./AddMenuItem";
import EditMenuItem from "./EditMenuItem";
import { ref, onValue, set } from "firebase/database";
import { database } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./Login";

/**
 * Main Application Component
 * Manages menu items with CRUD operations and authentication.
 */
const App = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // User authentication state

  // Monitor authentication state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  // Fetch menu items from Firebase/localStorage on component mount
  useEffect(() => {
    const menuRef = ref(database, "menuItems");
    const storedMenuItems = JSON.parse(localStorage.getItem("menuItems")) || [];
    setMenuItems(storedMenuItems);

    onValue(
      menuRef,
      (snapshot) => {
        const data = snapshot.val() || [];
        setMenuItems(data);
      },
      (fetchError) => {
        console.error("Error fetching data:", fetchError);
        setError("Failed to load menu items.");
      }
    );
  }, []);

  // Sync menu items to Firebase and localStorage
  useEffect(() => {
    if (menuItems.length > 0) {
      const menuRef = ref(database, "menuItems");
      set(menuRef, menuItems)
        .then(() => localStorage.setItem("menuItems", JSON.stringify(menuItems)))
        .catch((syncError) => {
          console.error("Error syncing menu items:", syncError);
          setError("Failed to save menu items.");
        });
    }
  }, [menuItems]);

  // Add a new menu item
  const addMenuItem = (item) => {
    const formattedPrice = parseFloat(item.price).toFixed(2);
    const newMenuItem = { ...item, price: formattedPrice, id: Date.now() };
    setMenuItems((prevItems) => [...prevItems, newMenuItem]);
  };

  // Delete a menu item
  const deleteMenuItem = (id) => {
    const updatedItems = menuItems.filter((item) => item.id !== id);
    setMenuItems(updatedItems);
  };

  // Save an edited menu item
  const saveMenuItem = (updatedItem) => {
    const updatedItems = menuItems.map((item) =>
      item.id === updatedItem.id
        ? { ...updatedItem, price: parseFloat(updatedItem.price).toFixed(2) }
        : item
    );
    setMenuItems(updatedItems);
    setEditingItem(null);
  };

  return (
    <div className="container">
      <h1>Menu Management</h1>
      {error && <div className="error-message">{error}</div>}
      {!user ? (
        <Login />
      ) : (
        <>
          {editingItem ? (
            <EditMenuItem item={editingItem} onSave={saveMenuItem} />
          ) : (
            <AddMenuItem onAdd={addMenuItem} />
          )}
          <MenuList
            items={menuItems}
            onEdit={setEditingItem}
            onDelete={deleteMenuItem}
          />
        </>
      )}
    </div>
  );
};

// PropTypes for App
App.propTypes = {
  user: PropTypes.object,
};

export default App;
