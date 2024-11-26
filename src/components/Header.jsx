/**
 * @description
 * Renders the header for the Restaurant Management System.
 * Displays navigation links for logged-in users and a logout button.
 * If no user is logged in, only the logo is shown.
 *
 * @author
 * Ratanachat Saelee
 */

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../firebase";

/**
 * Header Component
 * Displays the logo and navigation links for logged-in users.
 * If the user is logged in, it shows options to add/edit menu items, view the menu, and logout.
 *
 * @returns {JSX.Element} The header with navigation links and user information.
 */
const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if a user is logged in by retrieving user data from localStorage
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // Parse and set the user info if logged in
    }
  }, []);

  /**
   * handleLogout function
   * Signs the user out, removes user data from localStorage, and navigates to the login page.
   */
  const handleLogout = async () => {
    try {
      await signOutUser();
      setUser(null);
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Restaurant Management System</h1>
      </div>
      <nav>
        <ul>
          {user && (
            <>
              {/* Show navigation links for logged-in users */}
              <li>
                <Link to="/add-menu">Add/Edit Menu Item</Link>
              </li>
              <li>
                <Link to="/menu">View Menu</Link>
              </li>
              <li>
                <span>Welcome, {user.username}</span>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>{" "}
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
