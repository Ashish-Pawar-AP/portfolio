import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../utils/axios";

/**
 * Admin Messages (Theme-Based + Premium UI)
 */
const MessagesAdmin = () => {
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => (await api.get("/contact")).data,
  });

  return (
    <div
      className="relative space-y-10"
      style={{ backgroundColor: "rgb(var(--bg-primary))" }}
    >
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: "rgb(var(--text-primary))" }}
          >
            Messages
          </h1>

          <p
            className="mt-1"
            style={{ color: "rgb(var(--text-secondary))" }}
          >
            Contact form submissions from visitors
          </p>
        </div>

        <span
          className="rounded-full px-4 py-1 text-sm font-medium"
          style={{
            backgroundColor: "rgba(var(--accent-primary),0.08)",
            color: "rgb(var(--accent-primary))",
          }}
        >
          {messages.length} Messages
        </span>
      </motion.div>

      {/* ================= LIST ================= */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
          },
        }}
        className="space-y-6"
      >
        {/* Loading */}
        {isLoading && (
          <div style={{ color: "rgb(var(--text-secondary))" }}>
            Loading messages...
          </div>
        )}

        <AnimatePresence>
          {!isLoading &&
            messages.map((msg) => (
              <motion.div
                key={msg._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260 }}
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
                  {/* Sender */}
                  <div className="flex flex-wrap items-center gap-2">
                    <p
                      className="font-semibold"
                      style={{ color: "rgb(var(--text-primary))" }}
                    >
                      {msg.name}
                    </p>

                    <span
                      className="text-sm"
                      style={{ color: "rgb(var(--text-secondary))" }}
                    >
                      ({msg.email})
                    </span>
                  </div>

                  {/* Message */}
                  <p
                    className="leading-relaxed"
                    style={{ color: "rgb(var(--text-secondary))" }}
                  >
                    {msg.message}
                  </p>

                  {/* Meta */}
                  {msg.createdAt && (
                    <p
                      className="text-xs pt-2"
                      style={{ color: "rgb(var(--text-secondary))" }}
                    >
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
        </AnimatePresence>

        {/* Empty State */}
        {!isLoading && messages.length === 0 && (
          <div
            className="rounded-3xl border-dashed p-10 text-center backdrop-blur-xl"
            style={{
              border: "1px dashed rgb(var(--border-color))",
              color: "rgb(var(--text-secondary))",
              backgroundColor: "rgba(var(--bg-secondary),0.5)",
            }}
          >
            No messages received yet.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MessagesAdmin;