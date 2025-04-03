import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date },
});

// const userModel = mongoose.models.User || mongoose.model("User", userSchema);
// export default userModel;

const TaskModel = mongoose.model.Task || mongoose.model("Task", taskSchema);
export default TaskModel;
