import express from "express";
import {
  submitContact,
  getMessages,
  markAsReplied
} from "../controllers/contact.controller.js";
import { protectAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* Public */
router.post("/", submitContact);

/* Admin */
router.get("/", protectAdmin, getMessages);
router.put("/:id/reply", protectAdmin, markAsReplied);

export default router;
