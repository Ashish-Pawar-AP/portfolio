import { motion } from "framer-motion";

/**
 * Admin Dashboard (Advanced UI + Animations)
 */
const Dashboard = () => {
  const cards = [
    {
      title: "Total Projects",
      value: "—",
      gradient: "from-blue-600 to-cyan-500",
    },
    {
      title: "Skills",
      value: "—",
      gradient: "from-purple-600 to-pink-500",
    },
    {
      title: "Messages",
      value: "—",
      gradient: "from-emerald-600 to-teal-500",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Overview of your portfolio system
        </p>
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="grid gap-6 md:grid-cols-3"
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="
              relative overflow-hidden
              rounded-2xl border
              border-slate-200 dark:border-slate-800
              bg-white/70 dark:bg-slate-900/60
              backdrop-blur
              p-6
              shadow-xl
            "
          >
            {/* Gradient Glow */}
            <div
              className={`
                absolute inset-0 opacity-0 hover:opacity-20 transition
                bg-linear-to-br ${card.gradient}
              `}
            />

            {/* Content */}
            <div className="relative space-y-3">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold">{card.value}</h2>

              <div className="h-1 w-16 rounded-full bg-linear-to-r from-slate-300 to-slate-500 dark:from-slate-700 dark:to-slate-500" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Activity / Welcome Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="
          rounded-3xl
          border border-slate-200 dark:border-slate-800
          bg-linear-to-br from-white/80 to-white/40
          dark:from-slate-900/70 dark:to-slate-900/40
          backdrop-blur
          p-8
          shadow-xl
        "
      >
        <h3 className="text-xl font-semibold mb-2">Welcome back 👋</h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl">
          From here you can manage projects, skills, blogs, messages, and
          monitor analytics. This dashboard is designed to scale as your
          portfolio grows.
        </p>
      </motion.div>
    </div>
  );
};

export default Dashboard;
