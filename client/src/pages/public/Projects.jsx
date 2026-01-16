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

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-500">
        Loading projects…
      </div>
    );
  }

  return (
    <section className="relative mx-auto max-w-7xl px-8 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 max-w-3xl"
      >
        <h1 className="text-4xl font-bold md:text-5xl">
          <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Projects
          </span>
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
          Real-world projects with architecture, decisions, and case studies
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="
          grid gap-10
          sm:grid-cols-2
          lg:grid-cols-3
        "
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
