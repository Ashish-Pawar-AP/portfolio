import nodemailer from "nodemailer";
import { env } from "../config/env.js";

/**
 * Email transporter
 */
export const transporter = nodemailer.createTransport({
  host: env.host,
  port: 2525,
  auth: {
    user: env.emailUser,
    pass: env.emailPass
  }
});

/**
 * Send email helper
 */
export const sendMail = async (from, to, subject, html) => {
  await transporter.sendMail({
    from,
    to,
    subject,
    html
  });
};
