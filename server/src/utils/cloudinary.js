import cloudinary from "cloudinary";
import { env } from "../config/env.js";

/**
 * Cloudinary Configuration
 */
cloudinary.v2.config({
  cloud_name: env.cloudinaryName,
  api_key: env.cloudinaryKey,
  api_secret: env.cloudinarySecret
});

export default cloudinary.v2;
