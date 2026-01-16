import express from "express";
import { analyzeResume, explainText } from "../controllers/ai.controller.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
});

router.post("/explain", limiter, explainText);
router.post("/resume-review", limiter, analyzeResume);

export default router;
