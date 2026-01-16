import api from "../utils/axios";

/**
 * Send contact message
 */
export const sendContactMessage = async (data) => {
  const res = await api.post("/contact", data);
  return res.data;
};
