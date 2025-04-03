import React, { useState, useRef, useEffect, useContext } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { userData, setIsLogged, setUserData, backendUrl } =
    useContext(AppContent);

  const adjustedUserName = (userData) => {
    if (!userData?.name) return "";
    const firstWord = userData.name.trim().split(" ")[0];
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
  };

  const logout = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/auth/logout", {
        withCredentials: true,
      });
      data.success && setIsLogged(false);
      data.success && setUserData(false);
      // data.
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to logged Out");
    }
  };

  const verifyEmail = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/auth/sendverifyotp");
      console.log(data.success);
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to logged Out");
    }
  };

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
          <h3>Hello {adjustedUserName(userData)}!</h3>
          <div className="relative inline-block text-left" ref={menuRef}>
            {/* Avatar (click toggles dropdown) */}
            <img
              src={assets.profile}
              alt="User"
              className="w-12 h-12 rounded-full cursor-pointer"
              onClick={() => setIsOpen((prev) => !prev)}
            />

            {/* Dropdown */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={verifyEmail}
                >
                  Verify Email
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
