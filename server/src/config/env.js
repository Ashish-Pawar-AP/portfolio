import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  host: process.env.MAILTRAP_HOST,
  clientUrl: process.env.CLIENT_URL,
  cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryKey: process.env.CLOUDINARY_API_KEY,
  cloudinarySecret: process.env.CLOUDINARY_API_SECRET,
  openAi: process.env.OPENAI_API_KEY,
};
