import mongoose from "mongoose";

/**
 * Skill Schema
 */
const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    category: {
      type: String,
      enum: ["frontend", "backend", "database", "tools"],
      required: true
    },

    level: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },

    icon: {
      type: String // icon URL or name
    }
  },
  { timestamps: true }  
);

export default mongoose.model("Skill", skillSchema);
