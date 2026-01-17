import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlogBySlug } from "../../api/blog.api";
import useSEO from "../../hooks/useSEO";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";

/**
 * Blog Details Page (Advanced UI)
 */
const BlogDetails = () => {
  const { slug } = useParams();

  // Fetch blog
  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlogBySlug(slug),
  });

  // SEO (safe even when blog is undefined initially)
  useSEO({
    title: blog?.title || "Blog",
    description: blog?.excerpt || "",
  });

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="animate-pulse text-slate-500">Loading blog…</div>
      </div>
    );
  }

  /* ================= NOT FOUND ================= */
  if (!blog) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-500">
        Blog not found
      </div>
    );
  }

  return (
    <section className="relative mx-auto max-w-3xl px-6 py-20">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 space-y-4"
      >
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {blog.title}
        </h1>

        {blog.excerpt && (
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {blog.excerpt}
          </p>
        )}

        <div className="h-1 w-24 rounded-full bg-linear-to-r from-blue-500 to-purple-500" />
      </motion.div>

      {/* ================= CONTENT ================= */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="
          prose prose-slate dark:prose-invert
          max-w-none
          prose-headings:font-semibold
          prose-a:text-blue-600
          prose-code:rounded
          prose-code:bg-slate-100 dark:prose-code:bg-slate-800
          prose-code:px-1
        "
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.content}
        </ReactMarkdown>
      </motion.article>
    </section>
  );
};

export default BlogDetails;
