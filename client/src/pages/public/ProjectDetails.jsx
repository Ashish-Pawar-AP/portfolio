import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getProjectById } from "../../api/project.api";
import useSEO from "../../hooks/useSEO";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

const ProjectDetails = () => {
  const { id } = useParams();

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
  });

  useSEO({
    title: project?.title || "Project Details",
    description: project?.shortDescription || "",
  });

  if (isLoading) {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center"
        style={{ color: "rgb(var(--text-secondary))" }}
      >
        Loading project…
      </div>
    );
  }

  return (
    <section
      className="relative mx-auto max-w-5xl px-6 md:px-8 py-24 overflow-hidden"
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

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative space-y-14"
      >
        {/* HEADER */}
        <motion.div variants={fadeUp} className="space-y-4">
          <h1
            className="text-4xl font-bold md:text-5xl"
            style={{ color: "rgb(var(--text-primary))" }}
          >
            {project.title}
          </h1>

          <p
            className="max-w-2xl text-base md:text-lg"
            style={{ color: "rgb(var(--text-secondary))" }}
          >
            {project.shortDescription}
          </p>
        </motion.div>

        {/* TECH STACK */}
        <motion.div variants={fadeUp}>
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ color: "rgb(var(--text-primary))" }}
          >
            Tech Stack
          </h2>

          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech, index) => (
              <motion.span
                key={index}
                whileHover={{ y: -3 }}
                className="rounded-full px-4 py-1.5 text-sm backdrop-blur-xl transition-all duration-300"
                style={{
                  backgroundColor: "rgba(var(--bg-secondary),0.7)",
                  border: "1px solid rgb(var(--border-color))",
                  color: "rgb(var(--text-secondary))",
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* CASE STUDY SECTIONS */}
        {[
          { title: "Overview", content: project.detailedDescription },
          { title: "Challenges", content: project.challenges },
          { title: "Learnings", content: project.learnings },
        ].map((section) => (
          <motion.div
            key={section.title}
            variants={fadeUp}
            className="rounded-3xl p-8 backdrop-blur-2xl shadow-xl transition-all duration-500"
            style={{
              backgroundColor: "rgba(var(--bg-secondary),0.7)",
              border: "1px solid rgb(var(--border-color))",
            }}
          >
            <h2
              className="mb-4 text-xl font-semibold"
              style={{ color: "rgb(var(--text-primary))" }}
            >
              {section.title}
            </h2>

            <p
              className="leading-relaxed"
              style={{ color: "rgb(var(--text-secondary))" }}
            >
              {section.content}
            </p>
          </motion.div>
        ))}

        {/* LINKS */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
          {project.githubUrl && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl px-6 py-3 transition-all duration-300"
              style={{
                backgroundColor: "rgba(var(--bg-secondary),0.7)",
                border: "1px solid rgb(var(--border-color))",
                color: "rgb(var(--text-primary))",
              }}
            >
              GitHub Repo
            </motion.a>
          )}

          {project.liveUrl && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl px-6 py-3 font-medium text-white shadow-lg transition-all duration-300"
              style={{
                background:
                  "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
              }}
            >
              Live Demo
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectDetails;