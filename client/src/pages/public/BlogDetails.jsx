import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getBlogBySlug } from "../../api/blog.api";
import { explainWithAI } from "../../api/ai.api";
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

  // AI Explain Mutation
  const mutation = useMutation({
    mutationFn: explainWithAI,
  });

  // SEO (always called safely)
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

      {/* ================= AI SECTION ================= */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="
          mt-16
          rounded-3xl
          border border-slate-200 dark:border-slate-800
          bg-white/70 dark:bg-slate-900/60
          p-8
          backdrop-blur-xl
          shadow-xl
        "
      >
        <h2 className="mb-4 text-xl font-semibold">AI Explanation</h2>

        <p className="mb-6 text-slate-600 dark:text-slate-400">
          Let AI summarize and explain this blog in simple terms.
        </p>

        {/* Explain Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={mutation.isPending}
          onClick={() => mutation.mutate(blog.content)}
          className="
            inline-flex items-center gap-2
            rounded-xl
            bg-linear-to-r from-blue-600 to-purple-600
            px-6 py-3
            font-medium text-white
            shadow-lg shadow-blue-500/30
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {mutation.isPending ? "Explaining with AI…" : "Explain with AI"}
        </motion.button>

        {/* AI Result */}
        {mutation.data && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              mt-6
              rounded-xl
              border border-slate-200 dark:border-slate-800
              bg-slate-50 dark:bg-slate-900
              p-6
            "
          >
            <h3 className="mb-2 font-semibold text-slate-700 dark:text-slate-200">
              AI Summary
            </h3>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              {mutation.data.result}
            </p>
          </motion.div>
        )}

        {/* Error */}
        {mutation.isError && (
          <p className="mt-4 text-sm text-red-500">
            Failed to get AI explanation. Please try again.
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default BlogDetails;
