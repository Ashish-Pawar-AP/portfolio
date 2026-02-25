import { motion } from "framer-motion";

/**
 * Skill Bar (Theme-Based + Premium UI)
 */
const SkillBar = ({ skill, compact = true }) => {
  // Convert 1–5 scale → percentage
  const percent = Math.round(
    Math.min(Math.max((skill.level / 5) * 100, 0), 100)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ scale: 1.02 }}
      className="space-y-1 group"
    >
      {/* Label */}
      <div className="flex items-center justify-between">
        <span
          className={`font-medium ${
            compact ? "text-xs" : "text-sm"
          }`}
          style={{
            color: "rgb(var(--text-primary))",
          }}
        >
          {skill.name}
        </span>

        {/* Percentage */}
        <span
          className={`${compact ? "text-[10px]" : "text-xs"}`}
          style={{
            color: "rgb(var(--text-secondary))",
          }}
        >
          {percent}%
        </span>
      </div>

      {/* Track */}
      <div
        className={`relative overflow-hidden rounded-full ${
          compact ? "h-1.5" : "h-2"
        }`}
        style={{
          backgroundColor: "rgba(var(--bg-secondary),0.8)",
          border: "1px solid rgb(var(--border-color))",
        }}
      >
        {/* Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
          }}
        />

        {/* Subtle Glow on Hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(to right, rgba(var(--accent-primary),0.25), rgba(var(--accent-secondary),0.25))",
          }}
        />
      </div>
    </motion.div>
  );
};

export default SkillBar;