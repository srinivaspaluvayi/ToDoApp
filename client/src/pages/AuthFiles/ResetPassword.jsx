import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { evaluatePasswordStrength } from "../../utils/evaluatePasswordStrength";
const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const { level, color, score } = evaluatePasswordStrength(password);
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/auth/sendOtpPassword`, {
        email,
      });
      if (data.success) {
        toast.success(data.message);
        setStep(2);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending OTP");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/auth/resetPassword`, {
        email,
        otp,
        password,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src={assets.logo} alt="Logo" className="h-10 mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">
            Reset Your Password
          </h1>
          <p className="text-sm text-gray-500">
            {step === 1
              ? "Enter your registered email to receive an OTP"
              : "Enter the OTP and set a new password"}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSendOtp}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-rose-400 text-white font-semibold py-2 rounded-md hover:bg-rose-500 transition"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OTP
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
              placeholder="Enter 4-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {password && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div
                    className={`h-2 rounded ${color}`}
                    style={{ width: `${(score / 5) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-1 text-gray-600">
                  Strength: <span className="font-semibold">{level}</span>
                </p>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-rose-400 text-white font-semibold py-2 rounded-md hover:bg-rose-500 transition"
            >
              Reset Password
            </button>
          </form>
        )}

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <span
              className="text-rose-400 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
