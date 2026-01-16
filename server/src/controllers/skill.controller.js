import Skill from "../models/Skill.model.js";

/**
 * Get All Skills (Public)
 */
export const getSkills = async (req, res) => {
  const skills = await Skill.find().sort({ category: 1 });
  res.json(skills);
};

/**
 * Add Skill (Admin)
 */
export const addSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update Skill (Admin)
 */
export const updateSkill = async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(skill);
};

/**
 * Delete Skill (Admin)
 */
export const deleteSkill = async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ message: "Skill removed" });
};
