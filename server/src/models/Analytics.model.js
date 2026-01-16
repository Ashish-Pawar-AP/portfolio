import mongoose from "mongoose";

/**
 * Visitor Analytics Schema
 */
const analyticsSchema = new mongoose.Schema(
  {
    ip: String,
    pageVisited: String,
    referrer: String,
    userAgent: String,
    device: String,
    country: String,
    city: String,
    isBot: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Analytics", analyticsSchema);
