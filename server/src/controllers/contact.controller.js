import Contact from "../models/Contact.model.js";
import { sendMail } from "../utils/mailer.js";
import { env } from "../config/env.js";

/**
 * Submit Contact Form (Public)
 */
export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields required" });
    }
    const from = `ashishpawar010904@gmail.com`;
    // Save message
    await Contact.create({ name, email, message });

    // Auto reply to sender
    await sendMail(
      from,
      email,
      "Thanks for contacting me",
      `<p>Hi ${name},</p><p>Thanks for reaching out. I’ll get back to you soon.</p>`
    );

    setTimeout(async () => {
      // Notify admin
      await sendMail(
        email,
        from,
        "New Portfolio Message",
        `
        <p><b>${name}</b> (${email}) sent a message:</p>
        <p>${message}</p> 
        `
      );
    }, 11000);

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get All Messages (Admin)
 */
export const getMessages = async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json(messages);
};

/**
 * Mark Message as Replied (Admin)
 */
export const markAsReplied = async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, { replied: true });
  res.json({ message: "Marked as replied" });
};
