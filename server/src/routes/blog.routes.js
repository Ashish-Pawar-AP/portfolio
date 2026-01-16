import express from "express";
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { protectAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* Public */
router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

/* Admin */
router.post("/", protectAdmin, createBlog);
router.put("/:id", protectAdmin, updateBlog);
router.delete("/:id", protectAdmin, deleteBlog);

export default router;
