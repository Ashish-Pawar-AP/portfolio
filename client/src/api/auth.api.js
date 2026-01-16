import api from "../utils/axios";

/**
 * Admin login
 */
export const loginAdmin = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

/**
 * Admin logout
 */
export const logoutAdmin = async () => {
  await api.post("/auth/logout");
};
