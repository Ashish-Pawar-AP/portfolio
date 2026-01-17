import axios from "../utils/axios";

export const uploadResume = async (formData) => {
  const { data } = await axios.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  return data;
};
