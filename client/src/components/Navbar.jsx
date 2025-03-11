import React from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { assets } from "../assets/assets";
function Navbar() {
  return (
    <div>
      <nav
        className="bg-white shadow-md p5 
       flex justify-between items-center w-full"
      >
        {/* Left Section - Logo */}
        <div className="flex items-center px-4 ">
          <img
            src={assets.logo} // Replace with your logo path
            alt="Logo"
            className="w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20"
          />
        </div>

        {/* Center Section - Search Bar */}
        <div className="hidden md:flex flex-grow max-w-xs ml-auto mr-auto">
          <div className="relative w-full">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Section - Notification, Profile, Button */}
        <div className="flex items-center gap-4 p-4">
          <FaBell className="text-gray-500 hover:text-blue-500 cursor-pointer text-lg" />

          <img
            src={assets.profile} // Replace with user avatar
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
