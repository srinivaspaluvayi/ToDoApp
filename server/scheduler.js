// scheduler.js
import cron from "node-cron";
import TaskModel from "./models/taskModels.js";
import userModel from "./models/userModels.js";
import { sendReminderEmail } from "./utils/sendReminderEmail.js";
import { format } from "date-fns";
// This function simulates getting a user's email by their ID.
// Replace with your actual user lookup.

const getUserEmailById = async (userId) => {
  // e.g., use your userModel to find the user and return their email.
  const user = await userModel.findById(userId);
  // console.log("user");
  return user ? user.email : null;
};
console.log("inside Scheudler");
// Schedule the job to run every hour
cron.schedule("0 9 * * *", async () => {
  const now = new Date();
  const upcoming = new Date(now.getTime() + 24 * 60 * 60 * 1000); // next 1 hour
  const formattedDateNow = format(new Date(now), "PPpp");
  const formattedDateUpcoming = format(new Date(upcoming), "PPpp");

  const tasksDueSoon = await TaskModel.find({
    dueDate: { $gte: now, $lte: upcoming },
    completed: false,
  });
  console.log("tasksDueSoon");

  for (let task of tasksDueSoon) {
    const userEmail = await getUserEmailById(task.userId);
    // console.log(userEmail);
    if (userEmail) {
      sendReminderEmail(userEmail, task).catch((err) =>
        console.error("Failed to send reminder:", err)
      );
    }
  }
});
