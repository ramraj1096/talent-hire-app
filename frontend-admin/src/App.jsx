import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import DashBoard from "./DashBoard";
import Login from "./Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [adminToken, setAdminToken] = useState(null);

  // UseEffect to check for adminToken in localStorage when the app mounts
  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    setAdminToken(token);
  }, []); // Empty dependency array to run only once after the component mounts

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Routes>
        {/* Redirect root path based on auth status */}
        <Route
          path="/"
          element={adminToken ? <DashBoard /> : <Navigate to="/login" />}
        />
        {/* Login Route */}
        <Route
          path="/login"
          element={adminToken ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
    </div>
  );
};

export default App;
