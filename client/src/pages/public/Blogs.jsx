import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../../api/blog.api";
import useSEO from "../../hooks/useSEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * Blogs Listing Page (Theme-Based Premium UI)
 */
const Blogs = () => {
  useSEO({
    title: "Blog",
    description: "Technical blogs and learnings by Ashish Pawar",
  });

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center"
        style={{ color: "rgb(var(--text-secondary))" }}
      >
        Loading blogs…
      </div>
    );
  }

  return (
    <section
      className="relative mx-auto max-w-5xl px-6 py-20 overflow-hidden"
      style={{ backgroundColor: "rgb(var(--bg-primary))" }}
    >
      {/* Background Glow */}
      <div
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-[140px]"
        style={{ backgroundColor: "rgba(var(--accent-primary),0.08)" }}
      />
      <div
        className="absolute top-1/3 -right-40 h-96 w-96 rounded-full blur-[140px]"
        style={{ backgroundColor: "rgba(var(--accent-secondary),0.08)" }}
      />

      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-14 space-y-4"
      >
        <h1
          className="text-4xl font-bold tracking-tight md:text-5xl"
          style={{ color: "rgb(var(--text-primary))" }}
        >
          Blog
        </h1>

        <p
          className="max-w-2xl text-base md:text-lg"
          style={{ color: "rgb(var(--text-secondary))" }}
        >
          Technical articles, project learnings, and insights from my journey as
          a developer.
        </p>

        <div
          className="h-1 w-24 rounded-full"
          style={{
            background:
              "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
          }}
        />
      </motion.div>

      {/* ================= BLOG LIST ================= */}
      {blogs.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 },
            },
          }}
          className="relative grid gap-8 md:grid-cols-2"
        >
          {blogs.map((blog) => (
            <motion.article
              key={blog._id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5 },
                },
              }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl p-8 backdrop-blur-2xl shadow-xl transition-all duration-500"
              style={{
                backgroundColor: "rgba(var(--bg-secondary),0.7)",
                border: "1px solid rgb(var(--border-color))",
              }}
            >
              {/* Accent Line */}
              <div
                className="absolute inset-x-0 top-0 h-1 opacity-80"
                style={{
                  background:
                    "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
                }}
              />

              <h2
                className="mb-3 text-2xl font-semibold leading-snug"
                style={{ color: "rgb(var(--text-primary))" }}
              >
                {blog.title}
              </h2>

              {blog.excerpt && (
                <p
                  className="mb-6"
                  style={{ color: "rgb(var(--text-secondary))" }}
                >
                  {blog.excerpt}
                </p>
              )}

              <Link
                to={`/blog/${blog.slug}`}
                className="inline-flex items-center gap-2 font-medium transition-all duration-300 group-hover:translate-x-1"
                style={{ color: "rgb(var(--accent-primary))" }}
              >
                Read more →
              </Link>
            </motion.article>
          ))}
        </motion.div>
      ) : (
        /* ================= EMPTY STATE ================= */
        <div
          className="relative text-center py-20"
          style={{ color: "rgb(var(--text-secondary))" }}
        >
          No blogs published yet.
        </div>
      )}
    </section>
  );
};

export default Blogs;