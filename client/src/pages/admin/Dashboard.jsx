import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

/**
 * Admin Dashboard (Theme-Based + Premium UI)
 */
const Dashboard = () => {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div
        className="flex h-[60vh] items-center justify-center"
        style={{ color: "rgb(var(--text-secondary))" }}
      >
        Loading dashboard...
      </div>
    );
  }

  const cards = [
    { title: "Total Projects", value: "—" },
    { title: "Skills", value: "—" },
    { title: "Messages", value: "—" },
  ];

  return (
    <div
      className="relative space-y-12"
      style={{ backgroundColor: "rgb(var(--bg-primary))" }}
    >
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-start justify-between gap-4"
      >
        <div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: "rgb(var(--text-primary))" }}
          >
            Dashboard
          </h1>

          <p
            className="mt-2"
            style={{ color: "rgb(var(--text-secondary))" }}
          >
            Welcome back{user?.name ? `, ${user.name}` : ""} 👋
          </p>
        </div>

        <button
          onClick={logout}
          className="rounded-xl px-5 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            color: "rgb(220 38 38)",
            backgroundColor: "rgba(220,38,38,0.08)",
          }}
        >
          Logout
        </button>
      </motion.div>

      {/* STAT CARDS */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
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
            className="relative overflow-hidden rounded-3xl p-6 backdrop-blur-2xl shadow-xl transition-all duration-500"
            style={{
              backgroundColor: "rgba(var(--bg-secondary),0.7)",
              border: "1px solid rgb(var(--border-color))",
            }}
          >
            {/* Hover Accent Glow */}
            <div
              className="absolute inset-0 opacity-0 hover:opacity-10 transition-all duration-500"
              style={{
                background:
                  "linear-gradient(to bottom right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
              }}
            />

            <div className="relative space-y-3">
              <p
                className="text-sm"
                style={{ color: "rgb(var(--text-secondary))" }}
              >
                {card.title}
              </p>

              <h2
                className="text-3xl font-bold"
                style={{ color: "rgb(var(--text-primary))" }}
              >
                {card.value}
              </h2>

              <div
                className="h-1 w-16 rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* WELCOME CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="rounded-3xl p-8 backdrop-blur-2xl shadow-xl"
        style={{
          backgroundColor: "rgba(var(--bg-secondary),0.7)",
          border: "1px solid rgb(var(--border-color))",
        }}
      >
        <h3
          className="mb-3 text-xl font-semibold"
          style={{ color: "rgb(var(--text-primary))" }}
        >
          Admin Control Center
        </h3>

        <p
          className="max-w-xl leading-relaxed"
          style={{ color: "rgb(var(--text-secondary))" }}
        >
          Manage projects, skills, blogs, messages, and resume data
          from a single secure dashboard. Built to scale with your
          portfolio.
        </p>
      </motion.div>
    </div>
  );
};

export default Dashboard;