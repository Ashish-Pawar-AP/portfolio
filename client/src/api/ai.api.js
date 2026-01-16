import api from "../utils/axios";

export const explainWithAI = async (text) => {
  const res = await api.post("/ai/explain", { text });
  return res.data;
};
