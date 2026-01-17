import express from "express";
import { uploadResume, getResume } from "../controllers/resume.controller.js";
import { protectAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

/* Public */
router.get("/", getResume);

/* Admin */
router.post("/upload", protectAdmin, upload.single("resume"), uploadResume);

export default router;
