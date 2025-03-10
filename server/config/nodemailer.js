import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.Smtp_Email,
    pass: process.env.Smtp_Password,
  },
});
export default transporter;
