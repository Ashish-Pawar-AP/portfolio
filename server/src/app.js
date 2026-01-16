import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

const app = express();

/* Security */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

/* Middlewares */
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(limiter);

/*      */
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import projectRoutes from "./routes/project.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import { trackAnalytics } from "./middlewares/analytics.middleware.js";
import resumeRoutes from "./routes/resume.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import aiRoutes from "./routes/ai.routes.js";

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/ai", aiRoutes);

/* Analytics middleware (global) */
app.use(trackAnalytics);

/* Health Check */
app.get("/", (req, res) => {
  res.json({ status: "API running 🚀" });
});

export default app;
