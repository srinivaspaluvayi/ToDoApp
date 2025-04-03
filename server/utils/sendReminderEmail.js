import nodemailer from "nodemailer";
import transporter from "../config/nodemailer.js";
export const sendReminderEmail = async (userEmail, task) => {
  // Compose the email
  const mailOptions = {
    from: process.env.Smtp_User_Email,
    to: userEmail,
    subject: "Task Reminder: Upcoming Due Date",
    text: `Reminder: Your task "${task.text}" is due on ${new Date(
      task.dueDate
    ).toLocaleDateString()}.`,
    html: `<p>Reminder: Your task "<strong>${
      task.text
    }</strong>" is due on <strong>${new Date(
      task.dueDate
    ).toLocaleDateString()}</strong>. Please complete it soon!</p>`,
  };

  // Send the email
  let info = await transporter.sendMail(mailOptions);
  console.log("Reminder email sent: %s", info.messageId);
};
