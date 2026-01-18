import { motion } from "framer-motion";

/**
 * Advanced Vertical Timeline
 */
const Timeline = () => {
  const items = [
    {
      title: "Application Support Engineer (Intern)",
      period: "July 2025 – Present",
      description:
        "Worked on production issue analysis, SQL queries, system monitoring, and application troubleshooting.",
    },
    {
      title: "MERN Stack Developer (Self Projects)",
      period: "2024 – Present",
      description:
        "Built full-stack applications with authentication, real-time features, dashboards, and REST APIs.",
    },
  ];

  return (
    <section className="relative mx-auto max-w-3xl px-6 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <h2 className="text-3xl font-bold tracking-tight">
          Experience Timeline
        </h2>
        <div className="mt-3 h-1 w-24 rounded-full bg-linear-to-r from-blue-500 to-purple-500" />
      </motion.div>

      {/* Timeline Container */}
      <div className="relative pl-10">
        {/* Vertical Line */}
        <div className="absolute left-4 top-0 h-full w-px bg-linear-to-b from-blue-500 via-purple-500 to-transparent" />

        {/* Timeline Items */}
        <div className="space-y-12">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Dot */}
              <span
                className="
                  absolute left-0 top-2
                  flex h-4 w-4 items-center justify-center
                "
              >
                <span className="absolute inline-flex h-4 w-4 rounded-full bg-blue-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-blue-600" />
              </span>

              {/* Card */}
              <div
                className="
                  ml-10
                  rounded-2xl
                  border border-slate-200 dark:border-slate-800
                  bg-white/70 dark:bg-slate-900/60
                  p-6
                  backdrop-blur-xl
                  shadow-lg
                  transition
                  group-hover:shadow-2xl
                  group-hover:-translate-y-1
                "
              >
                <h4 className="text-lg font-semibold">{item.title}</h4>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {item.period}
                </p>

                <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
