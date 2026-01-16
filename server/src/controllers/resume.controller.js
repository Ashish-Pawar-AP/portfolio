import Profile from "../models/Profile.model.js";
import cloudinary from "../utils/cloudinary.js";

/**
 * Upload / Update Resume (Admin)
 */
export const uploadResume = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",
      folder: "resumes"
    });

    // Update resume URL in profile
    const profile = await Profile.findOne();
    profile.resumeUrl = result.secure_url;
    await profile.save();

    res.json({
      message: "Resume uploaded successfully",
      resumeUrl: result.secure_url
    });
  } catch (error) {
    console.error("Resume Upload Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get Resume URL (Public)
 */
export const getResume = async (req, res) => {
  const profile = await Profile.findOne();
  res.json({ resumeUrl: profile?.resumeUrl });
};
