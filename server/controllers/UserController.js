import userModel from "../models/userModels.js";

export const getUsersData = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId).exec();
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    res.status(200).json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
