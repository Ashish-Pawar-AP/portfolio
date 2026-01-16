import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../../api/blog.api";
import useSEO from "../../hooks/useSEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * Blogs Listing Page (Advanced UI)
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
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="animate-pulse text-slate-500">Loading blogs…</div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-14 space-y-4"
      >
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Blog</h1>

        <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Technical articles, project learnings, and insights from my journey as
          a developer.
        </p>

        <div className="h-1 w-24 rounded-full bg-linear-to-r from-blue-500 to-purple-500" />
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
          className="grid gap-8 md:grid-cols-2"
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
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border border-slate-200 dark:border-slate-800
                bg-white/70 dark:bg-slate-900/60
                p-8
                backdrop-blur-xl
                shadow-xl
                transition
              "
            >
              {/* Gradient Accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-500 to-purple-500 opacity-70" />

              <h2 className="mb-3 text-2xl font-semibold leading-snug">
                {blog.title}
              </h2>

              {blog.excerpt && (
                <p className="mb-6 text-slate-600 dark:text-slate-400">
                  {blog.excerpt}
                </p>
              )}

              <Link
                to={`/blog/${blog.slug}`}
                className="
                  inline-flex items-center gap-2
                  font-medium
                  text-blue-600 dark:text-blue-400
                  group-hover:underline
                "
              >
                Read more
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      ) : (
        /* ================= EMPTY STATE ================= */
        <div className="text-center text-slate-500">
          No blogs published yet.
        </div>
      )}
    </section>
  );
};

export default Blogs;
