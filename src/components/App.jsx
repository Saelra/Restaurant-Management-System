/**
 * @description
 * The main component that manages the menu items for the Restaurant Management System.
 * Handles fetching, adding, editing, and deleting menu items. Syncs data with Firebase and localStorage.
 * Access control and user authentication are also handled here.
 *
 * @author
 * Ratanachat Saelee
 */

import React, { useState, useEffect } from "react";
import MenuList from "./MenuList";
import AddMenuItem from "./AddMenuItem";
import EditMenuItem from "./EditMenuItem";
import { ref, onValue, set } from "firebase/database";
import { database } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./Login";

const App = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // User state to track authentication

  // Firebase Authentication check
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch menu items from Firebase and localStorage when the component mounts
  useEffect(() => {
    const menuRef = ref(database, "menuItems");

    const storedMenuItems = JSON.parse(localStorage.getItem("menuItems"));
    if (storedMenuItems) {
      setMenuItems(storedMenuItems);
    }

    onValue(
      menuRef,
      (snapshot) => {
        const data = snapshot.val() || [];
        console.log("Fetched data from Firebase:", data);
        setMenuItems(data);
      },
      (error) => {
        console.error("Error fetching data from Firebase:", error);
        setError("Failed to load menu items.");
      }
    );
  }, []);

  // Sync menu items to Firebase and localStorage whenever menuItems changes
  useEffect(() => {
    if (menuItems.length > 0) {
      const menuRef = ref(database, "menuItems");

      // Save the menu items to Firebase and localStorage
      set(menuRef, menuItems)
        .then(() => {
          console.log("Menu items added to Firebase");
          localStorage.setItem("menuItems", JSON.stringify(menuItems));
        })
        .catch((err) => {
          console.error("Error syncing menu items to Firebase:", err);
          setError("Failed to save menu items.");
        });
    }
  }, [menuItems]);

  // Add a new menu item
  const addMenuItem = (item) => {
    try {
      const formattedPrice = parseFloat(item.price).toFixed(2);
      const newMenuItem = { ...item, price: formattedPrice, id: Date.now() };

      setMenuItems((prevMenuItems) => [...prevMenuItems, newMenuItem]);
    } catch (err) {
      console.error("Error adding menu item:", err);
      setError("Failed to add menu item.");
    }
  };

  // Delete a menu item by its ID
  const deleteMenuItem = (id) => {
    const updatedMenuItems = menuItems.filter((item) => item.id !== id);

    localStorage.setItem("menuItems", JSON.stringify(updatedMenuItems));
    setMenuItems(updatedMenuItems);

    const menuRef = ref(database, "menuItems");

    // Remove the deleted menu item from Firebase
    set(menuRef, updatedMenuItems)
      .then(() => {
        console.log("Menu item deleted");
      })
      .catch((err) => {
        console.error("Error deleting menu item:", err);
        setError("Failed to delete menu item.");
      });
  };

  // Save an edited menu item
  const saveMenuItem = (updatedItem) => {
    const updatedMenuItems = menuItems.map((item) =>
      item.id === updatedItem.id
        ? { ...updatedItem, price: parseFloat(updatedItem.price).toFixed(2) }
        : item
    );

    setMenuItems(updatedMenuItems);
    setEditingItem(null);

    const menuRef = ref(database, "menuItems");

    // Update the edited menu item in Firebase
    set(menuRef, updatedMenuItems)
      .then(() => {
        console.log("Menu item updated");
      })
      .catch((err) => {
        console.error("Error saving menu item:", err);
        setError("Failed to save menu item.");
      });
  };

  return (
    <div className="container">
      <h1>Menu Management</h1>
      {error && <div className="error-message">{error}</div>}{" "}
      {/* Conditional Rendering based on user authentication */}
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

export default App;
