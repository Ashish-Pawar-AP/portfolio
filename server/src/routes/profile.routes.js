import express from "express";
import {
  getProfile,
  upsertProfile
} from "../controllers/profile.controller.js";
import { protectAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* Public */
router.get("/", getProfile);

/* Admin */
router.post("/", protectAdmin, upsertProfile);

export default router;
