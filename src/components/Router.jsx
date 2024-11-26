import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import App from "./app";
import Menu from "./Menu";

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
