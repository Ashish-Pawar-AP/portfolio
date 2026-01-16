import express from "express";
import {
  getProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from "../controllers/project.controller.js";
import { protectAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* Public Routes */
router.get("/", getProjects);
router.get("/featured", getFeaturedProjects);
router.get("/:id", getProjectById);

/* Admin Routes */
router.post("/", protectAdmin, createProject);
router.put("/:id", protectAdmin, updateProject);
router.delete("/:id", protectAdmin, deleteProject);

export default router;
