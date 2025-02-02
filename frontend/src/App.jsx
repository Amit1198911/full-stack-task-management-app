import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";
import LoginPage from "./pages/Login";
import Cards from "./pages/Cards";
import ItemDetails from "./pages/ItemsDetails";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Orders from "./pages/Orders";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/itemdetails/:id" element={<ItemDetails />} />
        <Route path="/order/orders" element={<Orders />} />
      </Routes>
    </>
  );
}

export default App;
