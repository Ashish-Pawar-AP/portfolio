import api from "../utils/axios";

export const getBlogs = async () => {
  const res = await api.get("/blogs");
  return res.data;
};

export const getBlogBySlug = async (slug) => {
  const res = await api.get(`/blogs/${slug}`);
  return res.data;
};
