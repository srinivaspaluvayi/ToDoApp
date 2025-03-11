import React from "react";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { assets } from "../../assets/assets";
export const NavBarHome = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="container mx-auto flex items-center">
        {/* Left - Logo */}
        <div className="flex-shrink-0 flex items-center space-x-4">
          <a href="/">
            <img src={assets.logo} alt="Todoist Logo" className="w-20 h-auto" />
          </a>
          <h1 className="text-3xl font-bold text-red-500">ToDoList</h1>
        </div>

        {/* Right - Navigation & Buttons (Wrapped in a Div) */}
        <div className="flex items-center space-x-8 ml-auto">
          {/* Navigation Links (Hidden on Mobile) */}
          <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <a href="#" className="hover:text-red-500 transition">
              About Us
            </a>
            <a href="#" className="hover:text-red-500 transition">
              Resources
            </a>
            <a href="#" className="hover:text-red-500 transition">
              Pricing
            </a>
          </div>

          {/* Login & CTA Button */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition">
              Login
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition">
              SignIn
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg mt-2">
          <a
            href="#"
            className="block px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            About Us
          </a>
          <a
            href="#"
            className="block px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            Resources
          </a>
          <a
            href="#"
            className="block px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            Pricing
          </a>
          <button className="w-full bg-red-500 text-white py-3 rounded-lg mt-2 hover:bg-red-600 transition">
            Login
          </button>
          <button className="w-full bg-red-500 text-white py-3 rounded-lg mt-2 hover:bg-red-600 transition">
            SignIn
          </button>
        </div>
      )}
    </nav>
  );
};
