import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlogBySlug } from "../../api/blog.api";
import useSEO from "../../hooks/useSEO";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";

/**
 * Blog Details Page (Theme-Based Premium UI)
 */
const BlogDetails = () => {
  const { slug } = useParams();

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlogBySlug(slug),
  });

  useSEO({
    title: blog?.title || "Blog",
    description: blog?.excerpt || "",
  });

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center"
        style={{ color: "rgb(var(--text-secondary))" }}
      >
        Loading blog…
      </div>
    );
  }

  /* ================= NOT FOUND ================= */
  if (!blog) {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center"
        style={{ color: "rgb(var(--text-secondary))" }}
      >
        Blog not found
      </div>
    );
  }

  return (
    <section
      className="relative mx-auto max-w-3xl px-6 py-20 overflow-hidden"
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
        className="relative mb-12 space-y-4"
      >
        <h1
          className="text-4xl font-bold tracking-tight md:text-5xl"
          style={{ color: "rgb(var(--text-primary))" }}
        >
          {blog.title}
        </h1>

        {blog.excerpt && (
          <p
            className="text-base md:text-lg"
            style={{ color: "rgb(var(--text-secondary))" }}
          >
            {blog.excerpt}
          </p>
        )}

        <div
          className="h-1 w-24 rounded-full"
          style={{
            background:
              "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
          }}
        />
      </motion.div>

      {/* ================= CONTENT ================= */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="max-w-none space-y-6 leading-relaxed"
        style={{ color: "rgb(var(--text-secondary))" }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1
                {...props}
                style={{ color: "rgb(var(--text-primary))" }}
                className="mt-8 text-3xl font-semibold"
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                {...props}
                style={{ color: "rgb(var(--text-primary))" }}
                className="mt-8 text-2xl font-semibold"
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                {...props}
                style={{ color: "rgb(var(--text-primary))" }}
                className="mt-6 text-xl font-semibold"
              />
            ),
            a: ({ node, ...props }) => (
              <a
                {...props}
                style={{ color: "rgb(var(--accent-primary))" }}
                className="underline underline-offset-4"
              />
            ),
            code: ({ inline, ...props }) =>
              inline ? (
                <code
                  {...props}
                  className="rounded px-1 py-0.5 text-sm"
                  style={{
                    backgroundColor:
                      "rgba(var(--bg-secondary),0.8)",
                    border: "1px solid rgb(var(--border-color))",
                  }}
                />
              ) : (
                <pre
                  style={{
                    backgroundColor:
                      "rgba(var(--bg-secondary),0.9)",
                    border: "1px solid rgb(var(--border-color))",
                  }}
                  className="overflow-x-auto rounded-xl p-4"
                >
                  <code {...props} />
                </pre>
              ),
          }}
        >
          {blog.content}
        </ReactMarkdown>
      </motion.article>
    </section>
  );
};

export default BlogDetails;