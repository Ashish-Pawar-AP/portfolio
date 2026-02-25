import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getProjects } from "../../api/project.api";
import ProjectCard from "../../components/common/ProjectCard";
import useSEO from "../../hooks/useSEO";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Projects = () => {
  useSEO({
    title: "Projects",
    description:
      "Real-world MERN stack projects with detailed case studies and live demos.",
  });

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isLoading) {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center text-base"
        style={{ color: "rgb(var(--text-secondary))" }}
      >
        Loading projects…
      </div>
    );
  }

  return (
    <section
      className="relative mx-auto max-w-7xl px-6 md:px-8 py-24 md:py-28 overflow-hidden"
      style={{ backgroundColor: "rgb(var(--bg-primary))" }}
    >
      {/* Background Glow */}
      <div
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-[140px]"
        style={{
          backgroundColor: "rgba(var(--accent-primary),0.08)",
        }}
      />
      <div
        className="absolute top-1/3 -right-40 h-96 w-96 rounded-full blur-[140px]"
        style={{
          backgroundColor: "rgba(var(--accent-secondary),0.08)",
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-16 max-w-3xl"
      >
        <h1 className="text-4xl font-bold md:text-5xl">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
            }}
          >
            Projects
          </span>
        </h1>

        <p
          className="mt-4 text-base md:text-lg"
          style={{ color: "rgb(var(--text-secondary))" }}
        >
          Real-world projects with architecture, decisions, and case studies
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <motion.div key={project._id} variants={fadeUp}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;