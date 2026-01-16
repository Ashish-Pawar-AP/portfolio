import express from "express";
import {
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill
} from "../controllers/skill.controller.js";
import { protectAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* Public */
router.get("/", getSkills);

/* Admin */
router.post("/", protectAdmin, addSkill);
router.put("/:id", protectAdmin, updateSkill);
router.delete("/:id", protectAdmin, deleteSkill);

export default router;
