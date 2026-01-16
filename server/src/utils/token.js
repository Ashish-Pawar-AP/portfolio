import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

/**
 * Generate Access Token (short-lived)
 */
export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, env.jwtSecret, {
    expiresIn: "15m"
  });
};

/**
 * Generate Refresh Token (long-lived)
 */
export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, env.jwtRefreshSecret, {
    expiresIn: "7d"
  });
};
