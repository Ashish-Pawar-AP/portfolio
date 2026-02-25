import { motion } from "framer-motion";
import SkillBar from "./SkillBar";

/**
 * Group skills by category
 */
const groupByCategory = (skills = []) => {
  return skills.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const SkillsSection = ({ skills }) => {
  const grouped = groupByCategory(skills);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid gap-8 md:grid-cols-2"
    >
      {Object.entries(grouped).map(([category, items]) => (
        <motion.div
          key={category}
          variants={item}
          whileHover={{ y: -4 }}
          className="relative rounded-3xl overflow-hidden p-6 backdrop-blur-2xl shadow-xl transition-all duration-500"
          style={{
            backgroundColor: "rgba(var(--bg-secondary),0.7)",
            border: "1px solid rgb(var(--border-color))",
          }}
        >
          {/* Category Accent Line */}
          <div
            className="absolute inset-x-0 top-0 h-1 rounded-t-3xl opacity-80"
            style={{
              background:
                "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
            }}
          />

          {/* Category Title */}
          <h3
            className="mb-6 text-xs md:text-sm font-semibold uppercase tracking-wider"
            style={{
              color: "rgb(var(--text-secondary))",
            }}
          >
            {category}
          </h3>

          {/* Skills */}
          <motion.div
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.06 },
              },
            }}
            className="space-y-4"
          >
            {items.map((skill) => (
              <motion.div
                key={skill._id}
                variants={{
                  hidden: { opacity: 0, scale: 0.96 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.25 },
                  },
                }}
                whileHover={{ scale: 1.02 }}
                className="rounded-xl px-4 py-3 transition-all duration-300"
                style={{
                  backgroundColor: "rgba(var(--bg-primary),0.6)",
                  border: "1px solid rgb(var(--border-color))",
                }}
              >
                <SkillBar skill={skill} compact />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SkillsSection;