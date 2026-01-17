import Profile from "../models/Profile.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

/**
 * Upload / Update Resume (Admin)
 */
export const uploadResume = asyncHandler(async (req, res) => {
  const resumeLocalPath = req.files?.resume?.[0]?.path;

  let resume;
  if (!resumeLocalPath) {
    throw new ApiError(400, "Resume file is required");
  }

  resume = await uploadOnCloudinary(resumeLocalPath);

  const updateResume = await Profile.findByIdAndUpdate(
    req.body,
    { resumeUrl: resume },
    { new: true },
  );

  if (!updateResume) {
    throw ApiError(500, "Error occured while updating resume");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedVideo, "Resume uploaded successfully"));
});

/**
 * Get Resume URL (Public)
 */
export const getResume = async (req, res) => {
  const profile = await Profile.findOne();
  res.json({ resumeUrl: profile?.resumeUrl });
};
