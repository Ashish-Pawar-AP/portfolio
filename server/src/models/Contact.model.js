import mongoose from "mongoose";

/**
 * Contact Messages Schema
 */
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    replied: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
