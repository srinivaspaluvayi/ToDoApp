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

export const getUserTasks = async (req, res) => {
  try{
    const { userId } = req.body;
    const user = await userModel.findById(userId).exec();
    if(user){
      res.status(200).json({
        tasks: user.tasks
      });
    }
    else{
      return res.status(400).json({ message: "User does not exist" });
    }
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addUserTasks = async (req, res) => {
  try{
    const { userId } = req.body;
    const user = await userModel.findById(userId).exec();
    if(user){

      const userTask = {
        taskName: req.body.taskName
      }
      user.tasks.push(userTask);
      await user.save();
      res.status(200).redirect("/home");
    }
    else{
      return res.status(400).json({ message: "User does not exist" });
    }
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}
