import api from "../utils/axios";

/* Get all projects */
export const getProjects = async () => {
  const res = await api.get("/projects");
  return res.data;
};

/* Get featured projects */
export const getFeaturedProjects = async () => {
  const res = await api.get("/projects/featured");
  return res.data;
};

/* Get single project */
export const getProjectById = async (id) => {
  const res = await api.get(`/projects/${id}`);
  return res.data;
};
