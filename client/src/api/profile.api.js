import api from "../utils/axios";

/**
 * Fetch profile data (public)
 */
export const getProfile = async () => {
  const res = await api.get("/profile");
  return res.data;
};
