import mongoose from "mongoose";

/**
 * Project Schema
 * Case-study based project model
 */
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    shortDescription: {
      type: String,
      required: true
    },

    detailedDescription: {
      type: String // full case study text
    },

    techStack: [
      {
        type: String
      }
    ],

    githubUrl: {
      type: String
    },

    liveUrl: {
      type: String
    },

    images: [
      {
        type: String // Cloudinary image URLs
      }
    ],

    challenges: {
      type: String
    },

    learnings: {
      type: String
    },

    featured: {
      type: Boolean,
      default: false
    },

    order: {
      type: Number,
      default: 0 // control display order
    }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
