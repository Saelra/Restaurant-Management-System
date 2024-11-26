import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_Aiy2LT_FXLCm6ZF8MDWs3jsBu4uSI-k",
  authDomain: "restaurantsys-650cd.firebaseapp.com",
  databaseURL: "https://restaurantsys-650cd-default-rtdb.firebaseio.com",
  projectId: "restaurantsys-650cd",
  storageBucket: "restaurantsys-650cd.firebasestorage.app",
  messagingSenderId: "863299727597",
  appId: "1:863299727597:web:c9ce5eac56d2154c29dce4",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

// Set up GitHub provider for authentication
const githubProvider = new GithubAuthProvider();

// Function to sign in with GitHub
const signInWithGitHub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    return result.user;
  } catch (error) {
    console.error("GitHub sign-in error:", error.message);
    throw new Error("Failed to sign in with GitHub");
  }
};

// Function to sign out
const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign-out error:", error.message);
    throw new Error("Failed to sign out");
  }
};

// Function to get data from the database
const fetchMenuItems = async () => {
  try {
    const dbRef = ref(database, "menuItems");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching menu items:", error.message);
    throw new Error("Failed to fetch menu items");
  }
};

// Function to update data in the database
const updateMenuItem = async (id, data) => {
  try {
    const dbRef = ref(database, "menuItems/" + id);
    await set(dbRef, data);
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
