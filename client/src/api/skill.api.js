import api from "../utils/axios";

/**
 * Fetch all skills
 */
export const getSkills = async () => {
  const res = await api.get("/skills");
  return res.data;
};
