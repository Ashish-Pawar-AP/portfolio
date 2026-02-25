import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "../../hooks/useSEO";

const NotFound = () => {
  useSEO({
    title: "404",
    description: "Page not found",
  });

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center overflow-hidden"
      style={{ backgroundColor: "rgb(var(--bg-primary))" }}
    >
      {/* Background Glow */}
      <div
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-[140px]"
        style={{ backgroundColor: "rgba(var(--accent-primary),0.1)" }}
      />
      <div
        className="absolute bottom-0 -right-40 h-96 w-96 rounded-full blur-[140px]"
        style={{ backgroundColor: "rgba(var(--accent-secondary),0.1)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative space-y-6"
      >
        <h1
          className="text-7xl md:text-8xl font-bold tracking-tight"
          style={{
            background:
              "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          404
        </h1>

        <p
          className="text-base md:text-lg"
          style={{ color: "rgb(var(--text-secondary))" }}
        >
          The page you’re looking for doesn’t exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-4 rounded-xl px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background:
              "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
          }}
        >
          Go Home
        </Link>
      </motion.div>
    </section>
  );
};

export default NotFound;