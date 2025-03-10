import bcrypt from "bcryptjs";
import transporter from "../config/nodemailer.js";
// import { JsonWebTokenError } from "jsonwebtoken";
import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  // console.log("In register");
  const { name, email, password } = req.body;
  try {
    const user = await userModel.findOne({ email }).exec();
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      expiresIn: "7d",
      httpOnly: true,
      sameSite: "None",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    //sending welcome email
    const sendingmail = {
      from: process.env.Smtp_User_Email,
      to: email,
      subject: "Welcome to our platform",
      text: `Hello ${name}, welcome to our platform`,
    };
    await transporter.sendMail(sendingmail);
    // res.status(201).json({ message: "mail sent" });
    // console.log("mail sent");
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  console.log("In login");
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email }).exec();
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      expiresIn: "7d",
      httpOnly: true,
      sameSite: "None",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: false,
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const sendVerifyOtp = async (req, res) => {
  console.log("In verifyOtp");
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId).exec();
    console.log(req.body);
    if (user.isAccountVerified) {
      return res.status(400).json({ message: "Account verified" });
    }
    const otp = String(Math.floor(1000 + Math.random() * 9000));
    user.verifyOtp = otp;
    user.verifyOtpExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    //sending OTP to user
    const sendingmail = {
      from: process.env.Smtp_User_Email,
      to: user.email,
      subject: "OTP for account verification",
      text: `Hello ${user.name}, your OTP for account verification is ${user.verifyOtp}`,
    };
    await transporter.sendMail(sendingmail);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  const otp = req.body.otp;
  const userId = req.body.userId;
  if (!userId || !otp) {
    return res.status(400).json({ message: "Invalid data" });
  }
  try {
    const user = await userModel.findById({ _id: userId }).exec();
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (user.verifyOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.verifyOtpExpiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }
    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpiresAt = 0;

    await user.save();
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const isAuthenticated = async (req, res) => {
  try {
    return res.status(200).json({ success: true, message: "Authenticated" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const sendResetPasswordOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email }).exec();
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const otp = String(Math.floor(1000 + Math.random() * 9000));
    user.resetOtp = otp;
    user.resetOtpExpiresAt = Date.now() + 15 * 60 * 60 * 1000;
    await user.save();

    //sending OTP to user
    const mailOptions = {
      from: process.env.Smtp_User_Email,
      to: user.email,
      subject: "OTP for password reset",
      text: `Hello ${user.name}, your OTP for password reset is ${user.resetOtp}`,
    };
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, password } = req.body;
  try {
    const user = await userModel.findOne({ email }).exec();
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    if (user.resetOtpExpiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }
    if (user.resetOtp == "" || user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpiresAt = null;
    await user.save();
    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
