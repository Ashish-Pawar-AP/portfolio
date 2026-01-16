import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * Project Card Component
 * Advanced Tailwind + Motion
 */
const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="
        group relative rounded-2xl border bg-white/70 backdrop-blur
        shadow-sm hover:shadow-xl transition-all
      "
    >
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition" />

      <div className="relative p-6 space-y-4">
        <h3 className="text-lg font-semibold group-hover:text-blue-600 transition">
          {project.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-3">
          {project.shortDescription}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack?.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="
                text-xs px-2 py-1 rounded-full
                bg-blue-50 text-blue-600
              "
            >
              {tech}
            </span>
          ))}
        </div>

        <Link
          to={`/projects/${project._id}`}
          className="
            inline-block text-sm font-medium text-blue-600
            hover:underline
          "
        >
          View Case Study →
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
