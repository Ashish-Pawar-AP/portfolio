import mongoose from "mongoose";

/**
 * User Schema
 * Only ADMIN user will exist for this portfolio
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      select: false // password will not return by default
    },

    role: {
      type: String,
      enum: ["admin"],
      default: "admin"
    },

    lastLogin: {
      type: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
