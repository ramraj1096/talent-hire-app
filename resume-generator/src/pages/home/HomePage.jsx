import Header from "@/components/custom/Header";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCircle, FaInfoCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { startUser } from "../../Services/login.js";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "@/features/user/userFeatures.js";

function HomePage() {
  const user = useSelector((state) => state.editUser.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await startUser();
        if (response.statusCode === 200) {
          dispatch(addUserData(response.data));
        } else {
          dispatch(addUserData(""));
        }
      } catch (error) {
        console.log("Error fetching user data: ", error.message);
        dispatch(addUserData(""));
      }
    };
    fetchResponse();
  }, []);

  const handleGetStartedClick = () => {
    user ? navigate("/dashboard") : navigate("/auth/sign-in");
  };

  return (
    <>
      <Header user={user} />

      <section className="pt-24 pb-20 bg-gradient-to-b from-white via-blue-100 to-white">
        <div className="px-6 md:px-12 mx-auto max-w-7xl">
          <div className="text-center md:w-10/12 xl:w-8/12 mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
              Build{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
                Smart AI Resumes
              </span>{" "}
              for TalentHire Roles
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 px-2 sm:px-0">
              A lightweight feature to boost your chances—AI-optimized resumes
              in seconds.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white text-base font-medium px-6 py-3 rounded-xl shadow-sm transition"
                onClick={handleGetStartedClick}
              >
                Get Started
              </Button>
              <Button
                className="bg-white border border-blue-300 text-blue-600 hover:bg-blue-50 text-base font-medium px-6 py-3 rounded-xl shadow-sm transition"
                onClick={() =>
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                  })
                }
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* <div className="mt-20">
            <div className="relative shadow-md rounded-xl overflow-hidden mx-auto max-w-3xl border border-blue-100 bg-white">
              <div className="flex items-center justify-between px-4 h-11 bg-gradient-to-r from-blue-100 to-blue-200">
                <div className="flex space-x-1.5">
                  {[...Array(3)].map((_, idx) => (
                    <FaCircle
                      key={idx}
                      className="w-2.5 h-2.5 text-blue-300 hover:text-blue-400 transition transform hover:scale-110"
                    />
                  ))}
                </div>
                <FaInfoCircle className="text-blue-400 hover:text-blue-500 transition transform hover:rotate-45" />
              </div>
              <div className="p-8 text-center text-gray-500 italic">
                [ A sneak peek of your future AI-powered resume goes here ]
              </div>
            </div>
          </div> */}
        </div>
      </section>

      <footer className="bg-white border-t border-gray-100 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center text-sm text-gray-500">
          <p>&copy; 2025 Talent Hire. All rights reserved.</p>
          <p>Powered by TalentHire AI Suite</p>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
