import express from "express";
import {
  getAnalytics,
  trackVisit,
} from "../controllers/analytics.controller.js";
import { protectAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/track", trackVisit); // public
router.get("/", protectAdmin, getAnalytics); // admin

export default router;
