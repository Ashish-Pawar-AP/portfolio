import Project from "../models/Project.model.js";

/**
 * Get All Projects (Public)
 */
export const getProjects = async (req, res) => {
  const projects = await Project.find().sort({ order: 1 });
  res.json(projects);
};

/**
 * Get Featured Projects (Public)
 */
export const getFeaturedProjects = async (req, res) => {
  const projects = await Project.find({ featured: true });
  res.json(projects);
};

/**
 * Get Single Project by ID (Public)
 */
export const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.json(project);
};

/**
 * Create Project (Admin)
 */
export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.error("Create Project Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update Project (Admin)
 */
export const updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(project);
};

/**
 * Delete Project (Admin)
 */
export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
};
