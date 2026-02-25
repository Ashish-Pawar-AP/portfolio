import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { getBlogs } from "../../api/blog.api";
import { createBlog, deleteBlog } from "../../api/admin.blog.api";
import MDEditor from "@uiw/react-md-editor";

/**
 * Admin Blogs Management (Theme-Based + Premium UI)
 */
const BlogsAdmin = () => {
  const { data: blogs = [], refetch, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await createBlog(form);
    setForm({ title: "", slug: "", excerpt: "", content: "" });
    refetch();
  };

  const handleDelete = async (id) => {
    const ok = confirm("Delete this blog permanently?");
    if (!ok) return;
    await deleteBlog(id);
    refetch();
  };

  return (
    <div
      className="relative space-y-14"
      style={{ backgroundColor: "rgb(var(--bg-primary))" }}
    >
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: "rgb(var(--text-primary))" }}
          >
            Blogs
          </h1>

          <p
            className="mt-1"
            style={{ color: "rgb(var(--text-secondary))" }}
          >
            Create and manage blog articles
          </p>
        </div>

        <span
          className="rounded-full px-4 py-1 text-sm font-medium"
          style={{
            backgroundColor: "rgba(var(--accent-primary),0.08)",
            color: "rgb(var(--accent-primary))",
          }}
        >
          {blogs.length} Blogs
        </span>
      </motion.div>

      {/* ================= CREATE BLOG ================= */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl p-8 backdrop-blur-2xl shadow-xl"
        style={{
          backgroundColor: "rgba(var(--bg-secondary),0.7)",
          border: "1px solid rgb(var(--border-color))",
        }}
      >
        <h2
          className="mb-6 text-xl font-semibold"
          style={{ color: "rgb(var(--text-primary))" }}
        >
          New Blog Post
        </h2>

        <form onSubmit={handleCreate} className="space-y-6">
          {/* Title */}
          <input
            name="title"
            placeholder="Blog title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-xl px-4 py-3 outline-none transition-all duration-300"
            style={{
              backgroundColor: "rgba(var(--bg-secondary),0.9)",
              border: "1px solid rgb(var(--border-color))",
              color: "rgb(var(--text-primary))",
            }}
          />

          {/* Slug */}
          <input
            name="slug"
            placeholder="slug-like-this"
            value={form.slug}
            onChange={handleChange}
            required
            className="w-full rounded-xl px-4 py-3 outline-none transition-all duration-300"
            style={{
              backgroundColor: "rgba(var(--bg-secondary),0.9)",
              border: "1px solid rgb(var(--border-color))",
              color: "rgb(var(--text-primary))",
            }}
          />

          {/* Excerpt */}
          <input
            name="excerpt"
            placeholder="Short description / excerpt"
            value={form.excerpt}
            onChange={handleChange}
            className="w-full rounded-xl px-4 py-3 outline-none transition-all duration-300"
            style={{
              backgroundColor: "rgba(var(--bg-secondary),0.9)",
              border: "1px solid rgb(var(--border-color))",
              color: "rgb(var(--text-primary))",
            }}
          />

          {/* Markdown Editor */}
          <div
            className="rounded-xl overflow-hidden"
            style={{
              border: "1px solid rgb(var(--border-color))",
              backgroundColor: "rgba(var(--bg-secondary),0.9)",
            }}
          >
            <MDEditor
              value={form.content}
              onChange={(value) =>
                setForm({ ...form, content: value })
              }
            />
          </div>

          {/* Publish */}
          <div className="flex justify-end pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="rounded-xl px-8 py-3 font-medium text-white shadow-lg transition-all duration-300"
              style={{
                background:
                  "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
              }}
            >
              Publish Blog
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* ================= BLOG LIST ================= */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="space-y-4"
      >
        <h2
          className="text-xl font-semibold"
          style={{ color: "rgb(var(--text-primary))" }}
        >
          Published Blogs
        </h2>

        {isLoading && (
          <p style={{ color: "rgb(var(--text-secondary))" }}>
            Loading blogs...
          </p>
        )}

        <AnimatePresence>
          {blogs.map((b) => (
            <motion.div
              key={b._id}
              layout
              exit={{ opacity: 0, scale: 0.95 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="relative overflow-hidden rounded-3xl p-6 backdrop-blur-2xl shadow-xl"
              style={{
                backgroundColor: "rgba(var(--bg-secondary),0.7)",
                border: "1px solid rgb(var(--border-color))",
              }}
            >
              {/* Hover Glow */}
              <div
                className="absolute inset-0 opacity-0 hover:opacity-10 transition-all duration-500"
                style={{
                  background:
                    "linear-gradient(to bottom right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
                }}
              />

              <div className="relative flex items-start justify-between gap-6">
                <div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "rgb(var(--text-primary))" }}
                  >
                    {b.title}
                  </h3>

                  <p
                    className="mt-1 text-sm"
                    style={{ color: "rgb(var(--text-secondary))" }}
                  >
                    {b.excerpt}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(b._id)}
                  className="rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300"
                  style={{
                    color: "rgb(220 38 38)",
                    backgroundColor: "rgba(220,38,38,0.08)",
                  }}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {!isLoading && blogs.length === 0 && (
          <div
            className="rounded-3xl p-10 text-center backdrop-blur-xl"
            style={{
              border: "1px dashed rgb(var(--border-color))",
              color: "rgb(var(--text-secondary))",
              backgroundColor: "rgba(var(--bg-secondary),0.5)",
            }}
          >
            No blogs published yet.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BlogsAdmin;