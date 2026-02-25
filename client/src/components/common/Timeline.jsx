import { motion } from "framer-motion";

/**
 * Premium Theme-Based Vertical Timeline
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
        <h2
          className="text-3xl font-bold tracking-tight"
          style={{ color: "rgb(var(--text-primary))" }}
        >
          Experience Timeline
        </h2>

        <div
          className="mt-3 h-1 w-24 rounded-full"
          style={{
            background:
              "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
          }}
        />
      </motion.div>

      {/* Timeline Container */}
      <div className="relative pl-10">
        {/* Vertical Line */}
        <div
          className="absolute left-4 top-0 h-full w-px"
          style={{
            background:
              "linear-gradient(to bottom, rgb(var(--accent-primary)), rgb(var(--accent-secondary)), transparent)",
          }}
        />

        {/* Items */}
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
              <span className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center">
                <span
                  className="absolute inline-flex h-4 w-4 rounded-full opacity-70 animate-ping"
                  style={{
                    backgroundColor: "rgb(var(--accent-primary))",
                  }}
                />
                <span
                  className="relative inline-flex h-4 w-4 rounded-full"
                  style={{
                    background:
                      "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
                  }}
                />
              </span>

              {/* Card */}
              <div
                className="ml-10 rounded-2xl p-6 backdrop-blur-2xl shadow-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl"
                style={{
                  backgroundColor: "rgba(var(--bg-secondary),0.7)",
                  border: "1px solid rgb(var(--border-color))",
                }}
              >
                <h4
                  className="text-lg font-semibold"
                  style={{ color: "rgb(var(--text-primary))" }}
                >
                  {item.title}
                </h4>

                <p
                  className="mt-1 text-sm"
                  style={{ color: "rgb(var(--text-secondary))" }}
                >
                  {item.period}
                </p>

                <p
                  className="mt-4 leading-relaxed"
                  style={{ color: "rgb(var(--text-secondary))" }}
                >
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