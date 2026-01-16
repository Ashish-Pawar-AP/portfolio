import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../utils/axios";

/**
 * Admin Messages (Advanced UI)
 */
const MessagesAdmin = () => {
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => (await api.get("/contact")).data,
  });

  return (
    <div className="space-y-10">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Contact form submissions from visitors
          </p>
        </div>

        <span
          className="
            rounded-full
            bg-blue-500/10
            px-4 py-1
            text-sm
            text-blue-600 dark:text-blue-400
          "
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
        {isLoading && <div className="text-slate-400">Loading messages...</div>}

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
                className="
                  relative overflow-hidden
                  rounded-2xl
                  border border-slate-200 dark:border-slate-800
                  bg-white/70 dark:bg-slate-900/60
                  backdrop-blur
                  p-6
                  shadow-lg
                "
              >
                {/* Hover Glow */}
                <div
                  className="
                    absolute inset-0
                    bg-linear-to-br
                    from-blue-600/10 to-purple-600/10
                    opacity-0 hover:opacity-100
                    transition
                  "
                />

                <div className="relative space-y-3">
                  {/* Sender */}
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {msg.name}
                    </p>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      ({msg.email})
                    </span>
                  </div>

                  {/* Message */}
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {msg.message}
                  </p>

                  {/* Meta */}
                  {msg.createdAt && (
                    <p className="text-xs text-slate-400 pt-2">
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
            className="
              rounded-2xl
              border border-dashed
              border-slate-300 dark:border-slate-700
              p-10
              text-center
              text-slate-500
            "
          >
            No messages received yet.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MessagesAdmin;
