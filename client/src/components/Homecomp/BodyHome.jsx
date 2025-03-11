import React from "react";
import { assets } from "../../assets/assets";
export const BodyHome = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center px-6 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Organize your <br />
            work and <br />
            <span className="text-black">life, finally.</span>
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Simplify life for both you and your team with the world’s #1 task
            manager and to-do list app.
          </p>
          <div className="flex items-center mt-4 text-gray-700 text-sm">
            <span className="font-semibold">374K+</span>
            <span className="mx-1">★★★★★ reviews from</span>
            <span className="ml-2">🍏 🐰</span>
          </div>
          <button className="mt-6 bg-red-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-red-600 transition">
            Start for free
          </button>
        </div>

        {/* Right Side - UI Mockups */}
        <div className="relative">
          <div className="bg-white-100 rounded-3xl w-full h-[400px] flex justify-center items-center overflow-hidden">
            <video
              src={assets.HomeVideo}
              autoPlay
              loop
              muted
              playsInline
              className="rounded-xl shadow-md w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyHome;
