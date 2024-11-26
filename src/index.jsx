/**
 * @description
 * jsx entry point for the Restaurant Management System React application.
 * Initializes the app and renders the root component into the DOM.
 *
 * @author Ratanachat Saelee
 */

import React from "react";
import { createRoot } from "react-dom/client";
import Router from "./components/Router";
import "./css/style.css";

// Get the root element from the HTML document
const rootElement = document.getElementById("root");

/**
 * Checks if the root element exists before attempting to render.
 * Uses React's StrictMode for highlighting potential issues in the app.
 * Handles errors gracefully during rendering to provide meaningful feedback.
 */
if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <Router />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Error during rendering:", error.message);
  }
} else {
  console.error("Error: Root element with id 'root' not found in the HTML.");
}
