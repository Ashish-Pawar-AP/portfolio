import express from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  changePassword
} from "../controllers/auth.controller.js";
import { protectAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* One-time admin registration */
router.post("/register", registerAdmin);

/* Login */
router.post("/login", loginAdmin);

/* Logout */
router.post("/logout", protectAdmin, logoutAdmin);

/* Change password */
router.put("/change-password", protectAdmin, changePassword);

export default router;
