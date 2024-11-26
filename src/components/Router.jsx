/**
 * @description
 * Defines the routing structure for the Restaurant Management System application.
 * Configures routes for login, menu management, and the main app functionality.
 *
 * @author Ratanachat Saelee
 * */

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import App from "./app";
import Menu from "./Menu";

/**
 * Router Component
 * Sets up the application's routing using React Router.
 *
 * Routes:
 * - `/`       : Displays the Login component.
 * - `/add-menu`: Displays the App component for menu management.
 * - `/menu`    : Displays the Menu component.
 *
 * Includes a persistent Header component visible across all routes.
 *
 * @returns {JSX.Element} The routing structure for the application.
 */
const Router = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/add-menu" element={<App />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
