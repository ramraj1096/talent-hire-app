import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/Services/login";
import { addUserData } from "@/features/user/userFeatures";
import logo from "../../assets/logo.png";

function Header({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Printing From Header User Found");
    } else {
      console.log("Printing From Header User Not Found");
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.statusCode === 200) {
        dispatch(addUserData(""));
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 md:px-10 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
        </Link>
      </div>

      {user ? (
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-300 transition"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <Link to="/auth/sign-in">
          <Button className="bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition">
            Get Started
          </Button>
        </Link>
      )}
    </header>
  );
}

export default Header;
