import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContent } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const EmailVerify = () => {
  const [otp, setOtp] = useState("");
  const { backendUrl, isLogged, userData } = useContext(AppContent);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 4) {
      toast.error("Please enter a 4-digit OTP");
      return;
    }

    try {
      const { data } = await axios.post(
        backendUrl + "/auth/verifyotp",
        { otp },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message || "Email verified successfully!");
        navigate("/afterLoggedIn");
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };

  useEffect(() => {
    if (isLogged && userData?.isAccountVerified) {
      navigate("/afterLoggedIn");
    }
  }, [isLogged, userData, navigate]);

  const handleResend = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/auth/sendverifyotp");
      // console.log(data.success);
      if (data.success) {
        // navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to logged Out");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src={assets.logo} alt="Logo" className="h-10 mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">
            Email Verification
          </h1>
          <p className="text-sm text-gray-500">
            Enter the 4-digit OTP sent to your email
          </p>
        </div>
        <form onSubmit={handleVerify}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            OTP
          </label>
          <input
            type="text"
            maxLength={4}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400 mb-4"
            placeholder="Enter 4-digit code"
          />
          <button
            type="submit"
            className="w-full bg-rose-400 text-white font-semibold py-2 rounded-md hover:bg-rose-500 transition"
          >
            Verify Email
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Didn't receive the code?{" "}
            <span
              className="text-rose-400 hover:underline cursor-pointer"
              onClick={handleResend}
            >
              Resend
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
