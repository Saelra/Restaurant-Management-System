import React from "react";
import { createRoot } from "react-dom/client";
import Router from "./components/Router";
import "./css/style.css";

// Get the root element
const rootElement = document.getElementById("root");

// Check if the root element exists before rendering
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
