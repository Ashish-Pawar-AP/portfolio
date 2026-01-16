import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { getBlogs } from "../../api/blog.api";
import { createBlog, deleteBlog } from "../../api/admin.blog.api";
import MDEditor from "@uiw/react-md-editor";

/**
 * Admin Blogs Management (Advanced UI + Animations)
 */
const BlogsAdmin = () => {
  const {
    data: blogs = [],
    refetch,
    isLoading,
  } = useQuery({
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
    <div className="space-y-14">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Create and manage blog articles
          </p>
        </div>

        <span
          className="
            rounded-full
            bg-blue-500/10
            px-4 py-1
            text-sm
            text-blue-600 dark:text-blue-400
          "
        >
          {blogs.length} Blogs
        </span>
      </motion.div>

      {/* ================= CREATE BLOG ================= */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          rounded-3xl
          border border-slate-200 dark:border-slate-800
          bg-white/70 dark:bg-slate-900/60
          backdrop-blur
          p-8
          shadow-xl
        "
      >
        <h2 className="mb-6 text-xl font-semibold">New Blog Post</h2>

        <form onSubmit={handleCreate} className="space-y-6">
          {/* Title */}
          <input
            name="title"
            placeholder="Blog title"
            value={form.title}
            onChange={handleChange}
            required
            className="
              w-full rounded-xl
              border border-slate-300 dark:border-slate-700
              bg-white dark:bg-slate-950
              px-4 py-3
              text-slate-900 dark:text-white
              outline-none
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
            "
          />

          {/* Slug */}
          <input
            name="slug"
            placeholder="slug-like-this"
            value={form.slug}
            onChange={handleChange}
            required
            className="
              w-full rounded-xl
              border border-slate-300 dark:border-slate-700
              bg-white dark:bg-slate-950
              px-4 py-3
              text-slate-900 dark:text-white
              outline-none
              focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
            "
          />

          {/* Excerpt */}
          <input
            name="excerpt"
            placeholder="Short description / excerpt"
            value={form.excerpt}
            onChange={handleChange}
            className="
              w-full rounded-xl
              border border-slate-300 dark:border-slate-700
              bg-white dark:bg-slate-950
              px-4 py-3
              text-slate-900 dark:text-white
              outline-none
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
            "
          />

          {/* Markdown Editor */}
          <div className="rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700">
            <MDEditor
              value={form.content}
              onChange={(value) => setForm({ ...form, content: value })}
            />
          </div>

          {/* Publish */}
          <div className="flex justify-end pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="
                rounded-xl px-8 py-3
                bg-linear-to-r from-blue-600 to-purple-600
                font-medium text-white
                shadow-lg shadow-blue-500/30
              "
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
        <h2 className="text-xl font-semibold">Published Blogs</h2>

        {isLoading && <p className="text-slate-400">Loading blogs...</p>}

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
              className="
                relative overflow-hidden
                rounded-2xl
                border border-slate-200 dark:border-slate-800
                bg-white/70 dark:bg-slate-900/60
                backdrop-blur
                p-6
                shadow-lg
              "
            >
              {/* Hover Glow */}
              <div
                className="
                  absolute inset-0
                  bg-linear-to-br
                  from-blue-600/10 to-purple-600/10
                  opacity-0 hover:opacity-100
                  transition
                "
              />

              <div className="relative flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-lg font-semibold">{b.title}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {b.excerpt}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(b._id)}
                  className="
                    rounded-lg px-4 py-2
                    text-sm font-medium
                    text-red-500
                    hover:bg-red-500/10
                    transition
                  "
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {!isLoading && blogs.length === 0 && (
          <div
            className="
              rounded-2xl
              border border-dashed
              border-slate-300 dark:border-slate-700
              p-10
              text-center
              text-slate-500
            "
          >
            No blogs published yet.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BlogsAdmin;
