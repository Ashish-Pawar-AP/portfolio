import mongoose from "mongoose";

/**
 * Profile Schema
 * Only ONE profile document will exist
 */
const profileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },

    tagline: {
      type: String
    },

    bio: {
      type: String
    },

    yearsOfExperience: {
      type: Number,
      default: 0
    },

    resumeUrl: {
      type: String
    },

    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      portfolio: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
