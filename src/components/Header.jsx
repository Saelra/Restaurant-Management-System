import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../firebase";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

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
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
