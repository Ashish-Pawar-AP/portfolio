import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { getProjects } from "../../api/project.api";
import { deleteProject } from "../../api/admin.project.api";

/**
 * Admin Projects Management (Advanced UI)
 */
const ProjectsAdmin = () => {
  const {
    data: projects = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const handleDelete = async (id) => {
    const ok = confirm("Are you sure you want to delete this project?");
    if (!ok) return;

    await deleteProject(id);
    refetch();
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Manage your portfolio projects
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
          {projects.length} Total
        </span>
      </motion.div>

      {/* Loading State */}
      {isLoading && <div className="text-slate-400">Loading projects...</div>}

      {/* Projects List */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="grid gap-6"
      >
        <AnimatePresence>
          {projects.map((p) => (
            <motion.div
              key={p._id}
              layout
              exit={{ opacity: 0, scale: 0.95 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="
                relative overflow-hidden
                rounded-2xl border
                border-slate-200 dark:border-slate-800
                bg-white/70 dark:bg-slate-900/60
                backdrop-blur
                p-6
                shadow-lg
              "
            >
              {/* Gradient Hover Glow */}
              <div
                className="
                absolute inset-0
                bg-linear-to-br
                from-blue-600/10 to-purple-600/10
                opacity-0 hover:opacity-100
                transition
              "
              />

              <div className="relative flex items-start justify-between gap-6">
                {/* Project Info */}
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">{p.title}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
                    {p.shortDescription}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="
                      rounded-lg px-4 py-2
                      text-sm font-medium
                      text-red-500
                      hover:bg-red-500/10
                      transition
                    "
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {!isLoading && projects.length === 0 && (
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
          No projects added yet.
        </div>
      )}
    </div>
  );
};

export default ProjectsAdmin;
