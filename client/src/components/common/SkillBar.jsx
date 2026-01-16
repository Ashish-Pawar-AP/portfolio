import { motion } from "framer-motion";

/**
 * Skill Bar (Compact + Animated)
 * - Smaller height & text
 * - Smooth fill animation
 * - Gradient glow on hover
 */
const SkillBar = ({ skill, compact = true }) => {
  const percent = (skill.level / 5) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ scale: 1.02 }}
      className="space-y-1"
    >
      {/* Label */}
      <div className="flex items-center justify-between">
        <span
          className={`font-medium text-slate-700 dark:text-slate-300 ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          {skill.name}
        </span>

        <span
          className={`text-slate-500 ${compact ? "text-[10px]" : "text-xs"}`}
        >
          {skill.level}/5
        </span>
      </div>

      {/* Track */}
      <div
        className={`
          relative overflow-hidden rounded-full
          bg-slate-200 dark:bg-slate-800
          ${compact ? "h-1.5" : "h-2"}
        `}
      >
        {/* Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="
            h-full rounded-full
            bg-linear-to-r
            from-blue-500 to-purple-600
          "
        />

        {/* Glow */}
        <div
          className="
            pointer-events-none
            absolute inset-0
            rounded-full
            bg-linear-to-r
            from-blue-500/30 to-purple-500/30
            opacity-0
            transition
            group-hover:opacity-100
          "
        />
      </div>
    </motion.div>
  );
};

export default SkillBar;
