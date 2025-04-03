// routes/profileRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
// import userModel from "../models/userModel.js";
// import { userauth } from "../middlewares/userauth.js";
import userauth from "../middleware/usermiddleware.js";
import {
  getProfile,
  UploadProfile,
} from "../controllers/profileControllers.js";
// userauth is your middleware that sets req.body.userId or req.user._id

const Profilerouter = express.Router();

// 1) Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // local folder "uploads" at project root
  },
  filename: function (req, file, cb) {
    // create unique file name
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// 2) Get Profile Info
Profilerouter.get("/profile", userauth, getProfile);

// 3) Upload Profile Image
Profilerouter.post(
  "/upload-profile",
  userauth,
  upload.single("profileImage"),
  UploadProfile
);

export default Profilerouter;
