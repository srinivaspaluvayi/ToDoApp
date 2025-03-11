import express from "express";
import {
  register,
  login,
  logout,
  sendVerifyOtp,
  verifyOtp,
  isAuthenticated,
  sendResetPasswordOtp,
  resetPassword,
} from "../controllers/AuthController.js";
import userauth from "../middleware/usermiddleware.js";
const Authrouter = express.Router();

Authrouter.post("/register", register);
Authrouter.post("/login", login);
Authrouter.post("/logout", logout);
Authrouter.post("/sendverifyotp", userauth, sendVerifyOtp);
Authrouter.post("/verifyotp", userauth, verifyOtp);
Authrouter.post("/isAuth", userauth, isAuthenticated);
Authrouter.post("/sendOtpPassword", sendResetPasswordOtp);
Authrouter.post("/resetPassword", resetPassword);

export default Authrouter;
