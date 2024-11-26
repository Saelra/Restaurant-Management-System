/**
 * @description
 * Handles user login functionality using GitHub authentication with Firebase.
 * After successful login, it stores user information in localStorage and navigates
 * the user to the menu management page.
 *
 * @author
 * Ratanachat Saelee
 */

import React, { useState } from "react";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

/**
 * Login Component
 * Renders the login interface and allows users to sign in with their GitHub account.
 * Displays error messages if login fails.
 *
 * @returns {JSX.Element} The login form or error message if login fails.
 */
const Login = () => {
  const [error, setError] = useState(null); // State to track any login errors
  const navigate = useNavigate(); // Hook for navigating after successful login

  /**
   * handleGithubLogin function
   * Initiates GitHub authentication using Firebase and navigates to the add-menu page
   * upon successful login. The user's display name and email are stored in localStorage.
   */
  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem(
        "user",
        JSON.stringify({ username: user.displayName, email: user.email })
      );

      navigate("/add-menu");
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login">
      <h2>Login to Restaurant Management</h2>
      {error && <p className="error">{error}</p>}
      <button onClick={handleGithubLogin}>Login with GitHub</button>
    </div>
  );
};

export default Login;
