import React, { useState, useEffect } from "react";
import MenuList from "./MenuList";
import AddMenuItem from "./AddMenuItem";
import EditMenuItem from "./EditMenuItem";
import { ref, onValue, set } from "firebase/database";
import { database } from "../firebase";

const App = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [error, setError] = useState(null);

  // Fetch menu items from Firebase and localStorage
  useEffect(() => {
    const menuRef = ref(database, "menuItems");

    const storedMenuItems = JSON.parse(localStorage.getItem("menuItems"));
    if (storedMenuItems) {
      setMenuItems(storedMenuItems);
    }

    // Listen for changes in Firebase
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

  // Sync menu items to Firebase and localStorage whenever the menu items change
  useEffect(() => {
    if (menuItems.length > 0) {
      const menuRef = ref(database, "menuItems");

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

  // Delete a menu item
  const deleteMenuItem = (id) => {
    const updatedMenuItems = menuItems.filter((item) => item.id !== id);

    localStorage.setItem("menuItems", JSON.stringify(updatedMenuItems));
    setMenuItems(updatedMenuItems);

    const menuRef = ref(database, "menuItems");

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
      {/* Display error message */}
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
    </div>
  );
};

export default App;
