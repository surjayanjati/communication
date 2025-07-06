import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { EmailOptions } from "../interface/other.interface";

dotenv.config();

export const sendEmail = async ({
  email,
  subject,
  html,
}: EmailOptions): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // true for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const recipients = Array.isArray(email) ? email.join(", ") : email;

    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || "MyApp"}" <${
        process.env.SMTP_FROM_EMAIL
      }>`,
      to: recipients,
      subject,
      html, // use the provided HTML directly
    });

    console.log(`✅ Email sent to ${recipients}`);
  } catch (error) {
    console.error(`❌ Failed to send email:`, error);
    throw new Error("Failed to send email.");
  }
};
