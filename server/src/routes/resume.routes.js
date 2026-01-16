import express from "express";
import multer from "multer";
import CloudinaryStorage from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";
import { uploadResume, getResume } from "../controllers/resume.controller.js";
import { protectAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * Multer + Cloudinary Storage
 */
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "resumes",
    allowed_formats: ["pdf"],
  },
});

const upload = multer({ storage });

/* Public */
router.get("/", getResume);

/* Admin */
router.post("/upload", protectAdmin, upload.single("resume"), uploadResume);

export default router;
