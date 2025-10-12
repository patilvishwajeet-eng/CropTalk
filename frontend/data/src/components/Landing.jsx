import React from "react";
import { Home, Leaf, Cloud, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate("/signin");
  const handleSignin = () => navigate("/signin");

  return (
    <>
      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        {/* Hero Section */}
        <div
          className="relative w-full text-black text-center py-16 px-4 sm:px-6"
          style={{ backgroundColor: "#82AB78" }}
        >
          {/* Top-right buttons */}
          <div className="absolute top-4 right-4 space-x-2">
            <button
              className="bg-white text-green-600 hover:bg-gray-200 py-1.5 px-4 rounded-md text-sm"
              onClick={handleSignin}
            >
              Login
            </button>
            <button
              className="bg-white text-green-600 hover:bg-gray-200 py-1.5 px-4 rounded-md text-sm"
              onClick={handleSignin}
            >
              Sign Up
            </button>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold">
            Empowering Farmers, Connecting Communities
          </h1>
          <p className="mt-4 text-base sm:text-lg">
            Join Croptalk and grow smarter with expert insights and community support.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="bg-white text-black hover:bg-gray-200 py-2 px-6 rounded"
              onClick={handleSignin}
            >
              Join Now
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 px-4 sm:px-6">
          <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg">
            <Leaf className="h-10 w-10 text-green-600" />
            <div className="text-center mt-4">
              <h3 className="font-bold text-lg">Crop Discussions</h3>
              <p className="text-gray-600 text-sm mt-2">
                Share insights and get advice on best farming practices.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg">
            <Cloud className="h-10 w-10 text-blue-600" />
            <div className="text-center mt-4">
              <h3 className="font-bold text-lg">Weather & Reports</h3>
              <p className="text-gray-600 text-sm mt-2">
                Stay updated with real-time weather and crop reports.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg">
            <Users className="h-10 w-10 text-yellow-600" />
            <div className="text-center mt-4">
              <h3 className="font-bold text-lg">Expert Guidance</h3>
              <p className="text-gray-600 text-sm mt-2">
                Connect with agricultural experts and fellow farmers.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center my-12 px-4">
          <h2 className="text-xl sm:text-2xl font-bold">
            Join Croptalk Today & Grow Smarter!
          </h2>
          <button
            className="mt-4 bg-green-600 text-white hover:bg-green-700 py-2 px-6 rounded"
            onClick={handleClick}
          >
            Get Started
          </button>
        </div>

        {/* Footer */}
        <footer className="w-full bg-gray-900 text-white text-center py-4 px-4">
          <p className="text-sm sm:text-base">
            &copy; 2025 Croptalk. All Rights Reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Landing;
