import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tasks: { type: Array, required: true },
    verifyOtp: { type: String, required: false },
    verifyOtpExpiresAt: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: "" },
    resetOtpExpiresAt: { type: Number, default: 0 },
    //   resetPasswordExpiresAt: { type: Number, default: 0 },
  },
  { versionKey: false }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;
