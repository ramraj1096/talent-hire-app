import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import logoImg from "./assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("admintoken");

  const handleLogout = () => {
    localStorage.removeItem("admintoken");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <Link
            to="/"
            className="flex items-center gap-4 text-blue-600 font-bold text-xl"
          >
            <img
              src={logoImg}
              alt="TalentHire Logo"
              className="h-8 sm:h-10 md:h-12"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/features"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Features
            </Link>
            <Link
              to="/about-us"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              About Us
            </Link>

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 text-sm font-semibold text-white bg-blue-500 cursor-pointer rounded-full shadow hover:bg-blue-500 transition duration-200"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu icon (non-functional now) */}
          <div className="lg:hidden">
            <FiMenu className="text-blue-700 w-6 h-6" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
