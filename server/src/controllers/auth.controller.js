import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import {
  generateAccessToken,
  generateRefreshToken
} from "../utils/token.js";

/**
 * One-time Admin Registration
 * Allowed ONLY if no admin exists
 */
export const registerAdmin = async (req, res) => {
  try {
    const adminExists = await User.findOne();

    // Prevent multiple admins
    if (adminExists) {
      return res
        .status(403)
        .json({ message: "Admin already exists" });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: admin._id,
        email: admin.email
      }
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Admin Login
 */
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    user.lastLogin = new Date();
    await user.save();

    res.json({
      message: "Login successful",
      accessToken: generateAccessToken(user._id),
      refreshToken: generateRefreshToken(user._id)
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Admin Logout
 * (Client removes tokens — backend confirms)
 */
export const logoutAdmin = async (req, res) => {
  res.json({
    message: "Logged out successfully"
  });
};

/**
 * Change Admin Password
 * Protected Route
 */
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    const admin = await User.findById(req.adminId).select("+password");

    const isMatch = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Current password incorrect" });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
