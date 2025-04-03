import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function SetresetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/auth/resetPassword`, {
        email,
        otp,
        newPassword,
      });
      if (data.success) toast.success(data.message);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-4">Enter New Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="OTP"
          className="w-full px-4 py-2 mb-2 border rounded"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full px-4 py-2 mb-4 border rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default SetresetPassword;
