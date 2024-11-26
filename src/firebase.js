/**
 * @description
 * Firebase utility module for the Restaurant Management System.
 * Handles Firebase initialization, authentication, and real-time database operations.
 *
 * @author Ratanachat Saelee
 * */

import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Firebase configuration details
const firebaseConfig = {
  apiKey: "AIzaSyB_Aiy2LT_FXLCm6ZF8MDWs3jsBu4uSI-k",
  authDomain: "restaurantsys-650cd.firebaseapp.com",
  databaseURL: "https://restaurantsys-650cd-default-rtdb.firebaseio.com",
  projectId: "restaurantsys-650cd",
  storageBucket: "restaurantsys-650cd.firebasestorage.app",
  messagingSenderId: "863299727597",
  appId: "1:863299727597:web:c9ce5eac56d2154c29dce4",
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);
const githubProvider = new GithubAuthProvider();

/**
 * Signs in a user with GitHub.
 * @returns {Promise<import("firebase/auth").User>} A promise resolving to the signed-in user object.
 * @throws {Error} If the sign-in process fails.
 */
const signInWithGitHub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    return result.user; // Returns the authenticated user
  } catch (error) {
    console.error("GitHub sign-in error:", error.message);
    throw new Error("Failed to sign in with GitHub");
  }
};

/**
 * Signs out the currently authenticated user.
 * @returns {Promise<void>} A promise resolving once the user is signed out.
 * @throws {Error} If the sign-out process fails.
 */
const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign-out error:", error.message);
    throw new Error("Failed to sign out");
  }
};

/**
 * Fetches the menu items from the Firebase Realtime Database.
 * @returns {Promise<Object|null>} A promise resolving to the menu items object or null if no data is available.
 * @throws {Error} If fetching data fails.
 */
const fetchMenuItems = async () => {
  try {
    const dbRef = ref(database, "menuItems");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val(); // Returns the data object
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching menu items:", error.message);
    throw new Error("Failed to fetch menu items");
  }
};

/**
 * Updates a menu item in the Firebase Realtime Database.
 * @param {string} id - The unique identifier of the menu item.
 * @param {Object} data - The updated menu item data.
 * @returns {Promise<void>} A promise resolving once the update is complete.
 * @throws {Error} If updating the data fails.
 */
const updateMenuItem = async (id, data) => {
  try {
    const dbRef = ref(database, "menuItems/" + id);
    await set(dbRef, data); // Updates the data at the specified reference
  } catch (error) {
    console.error("Error updating menu item:", error.message);
    throw new Error("Failed to update menu item");
  }
};

export {
  firebaseApp,
  database,
  auth,
  signInWithGitHub,
  signOutUser,
  fetchMenuItems,
  updateMenuItem,
};
