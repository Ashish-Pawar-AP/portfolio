import Profile from "../models/Profile.model.js";

/**
 * Get Profile (Public)
 */
export const getProfile = async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile);
};

/**
 * Create or Update Profile (Admin)
 */
export const upsertProfile = async (req, res) => {
  try {
    const existingProfile = await Profile.findOne();

    if (existingProfile) {
      const updated = await Profile.findByIdAndUpdate(
        existingProfile._id,
        req.body,
        { new: true }
      );
      return res.json(updated);
    }

    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
