import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

/**
 * Protect Admin Routes
 */
export const protectAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check token presence
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, env.jwtSecret);

    req.adminId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};
