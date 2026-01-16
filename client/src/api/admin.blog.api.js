import api from "../utils/axios";

export const createBlog = (data) => api.post("/blogs", data);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);
