import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getProjectById } from "../../api/project.api";
import { explainWithAI } from "../../api/ai.api";
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

  const explainMutation = useMutation({
    mutationFn: explainWithAI,
  });

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
      <div className="flex min-h-[60vh] items-center justify-center text-slate-500">
        Loading project…
      </div>
    );
  }

  return (
    <section className="relative mx-auto max-w-5xl px-8 py-24">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="space-y-14"
      >
        {/* HEADER */}
        <motion.div variants={fadeUp} className="space-y-3">
          <h1 className="text-4xl font-bold md:text-5xl">{project.title}</h1>
          <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            {project.shortDescription}
          </p>
        </motion.div>

        {/* TECH STACK */}
        <motion.div variants={fadeUp}>
          <h2 className="mb-4 text-xl font-semibold">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech, index) => (
              <motion.span
                key={index}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className="
                  rounded-full border
                  border-slate-300 dark:border-slate-700
                  bg-white/70 dark:bg-slate-900/60
                  px-4 py-1.5 text-sm
                  text-slate-700 dark:text-slate-300
                  backdrop-blur
                "
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
            className="
              rounded-2xl
              border border-slate-200 dark:border-slate-800
              bg-white/80 dark:bg-slate-900/70
              p-8
              backdrop-blur-xl
              shadow-lg
            "
          >
            <h2 className="mb-3 text-xl font-semibold">{section.title}</h2>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              {section.content}
            </p>
          </motion.div>
        ))}

        {/* AI EXPLAINER */}
        <motion.div variants={fadeUp} className="space-y-4">
          <h2 className="text-xl font-semibold">AI Explanation</h2>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            disabled={explainMutation.isPending}
            onClick={() =>
              explainMutation.mutate(`
                Project: ${project.title}
                Tech Stack: ${project.techStack.join(", ")}
                Description: ${project.detailedDescription}
              `)
            }
            className="
              rounded-xl px-7 py-3
              bg-linear-to-r from-blue-600 to-purple-600
              text-white font-medium
              shadow-lg shadow-blue-500/30
              disabled:opacity-60
            "
          >
            {explainMutation.isPending
              ? "Explaining with AI..."
              : "Explain Project with AI"}
          </motion.button>

          {explainMutation.data && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                rounded-xl
                border border-slate-200 dark:border-slate-800
                bg-white/80 dark:bg-slate-900/70
                p-6
                backdrop-blur
              "
            >
              <p className="text-slate-700 dark:text-slate-300">
                {explainMutation.data.result}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* LINKS */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
          {project.githubUrl && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="
                rounded-lg px-6 py-3
                border border-slate-300 dark:border-slate-700
                bg-white/70 dark:bg-slate-900/60
                text-slate-700 dark:text-slate-200
                backdrop-blur
              "
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
              className="
                rounded-lg px-6 py-3
                bg-blue-600 text-white
                shadow-lg shadow-blue-500/30
              "
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
