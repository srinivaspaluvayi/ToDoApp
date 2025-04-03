// import userauth from "../middleware/usermiddleware";
import userModel from "../models/userModels.js";
export const getProfile = async (req, res) => {
  try {
    // If your userauth sets req.body.userId, use that:
    const user = await userModel.findById(req.body.userId).exec();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const UploadProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId).exec();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // store the local path in DB
    const profileImagePath = `/uploads/${req.file.filename}`;
    user.profilePic = profileImagePath;
    await user.save();

    return res.json({
      success: true,
      message: "Profile image updated",
      profileImage: profileImagePath,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
