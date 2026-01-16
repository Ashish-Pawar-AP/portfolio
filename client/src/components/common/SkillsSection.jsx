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
          className="
            relative
            rounded-3xl
            border border-slate-200 dark:border-slate-800
            bg-white/70 dark:bg-slate-900/60
            backdrop-blur-xl
            p-6
            shadow-lg
            transition
            hover:shadow-xl
          "
        >
          {/* Category Accent */}
          <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-linear-to-r from-blue-500 to-purple-500 opacity-70" />

          {/* Category Title */}
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
            {category}
          </h3>

          {/* Skills */}
          <motion.div
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.05 },
              },
            }}
            className="space-y-4"
          >
            {items.map((skill) => (
              <motion.div
                key={skill._id}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.25 },
                  },
                }}
                whileHover={{ scale: 1.03 }}
                className="
                  rounded-xl
                  border border-slate-200 dark:border-slate-800
                  bg-slate-50 dark:bg-slate-900
                  px-3 py-2
                  transition
                "
              >
                {/* Smaller SkillBar */}
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
