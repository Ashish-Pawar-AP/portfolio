import Analytics from "../models/Analytics.model.js";

/**
 * Track Visitor Analytics
 */
export const trackAnalytics = async (req, res, next) => {
  try {
    await Analytics.create({
      ip: req.ip,
      pageVisited: req.originalUrl,
      referrer: req.headers.referer || "direct",
      userAgent: req.headers["user-agent"],
      device: req.headers["user-agent"]?.includes("Mobile")
        ? "mobile"
        : "desktop"
    });
  } catch (error) {
    console.error("Analytics Error:", error);
  }

  next();
};
