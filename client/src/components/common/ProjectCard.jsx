import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * Project Card Component
 * Fully Theme-Based + Premium UI
 */
const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative rounded-2xl backdrop-blur-2xl transition-all duration-500 overflow-hidden"
      style={{
        backgroundColor: "rgba(var(--bg-secondary),0.7)",
        border: "1px solid rgb(var(--border-color))",
      }}
    >
      {/* Gradient Glow Hover Layer */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
        }}
      />

      <div className="relative p-6 space-y-5">
        {/* Title */}
        <h3
          className="text-lg font-semibold transition-colors duration-300"
          style={{
            color: "rgb(var(--text-primary))",
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm line-clamp-3"
          style={{
            color: "rgb(var(--text-secondary))",
          }}
        >
          {project.shortDescription}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack?.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="text-xs px-3 py-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor: "rgba(var(--bg-primary),0.6)",
                border: "1px solid rgb(var(--border-color))",
                color: "rgb(var(--text-secondary))",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          to={`/projects/${project._id}`}
          className="inline-block text-sm font-medium transition-all duration-300 hover:translate-x-1"
          style={{
            color: "rgb(var(--accent-primary))",
          }}
        >
          View Case Study →
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
