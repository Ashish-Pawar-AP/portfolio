import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";

const app = express();

/* Security */
const limiter = rateLimit({
  windowMs: 15 * 60 * 10000,
  max: 500,
});

// basic configurations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(limiter);

const allowedOrigins = env.corsOrigin
  ? env.corsOrigin.split(",")
  : ["http://localhost:5173"];

// Cors configurations
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);

/*   import routes   */
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import projectRoutes from "./routes/project.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import blogRoutes from "./routes/blog.routes.js";

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/blogs", blogRoutes);

/* Health Check */
app.get("/", (req, res) => {
  res.json({ status: "API running 🚀" });
});

export default app;
