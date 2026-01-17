import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { getProjects } from "../../api/project.api";
import {
  createProject,
  updateProject,
  deleteProject,
} from "../../api/admin.project.api";

/**
 * Admin Projects Management (FULL CRUD + Advanced UI)
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

  const emptyForm = {
    title: "",
    shortDescription: "",
    detailedDescription: "",
    techStack: "",
    githubUrl: "",
    liveUrl: "",
    images: "",
    challenges: "",
    learnings: "",
    featured: false,
    order: 0,
  };

  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);

  /* ---------------- ADD ---------------- */
  const handleAdd = async (e) => {
    e.preventDefault();

    await createProject({
      ...form,
      techStack: form.techStack.split(",").map(t => t.trim()).filter(Boolean),
      images: form.images.split(",").map(i => i.trim()).filter(Boolean),
      order: Number(form.order),
    });

    setForm(emptyForm);
    refetch();
  };

  /* ---------------- UPDATE ---------------- */
  const handleUpdate = async (e) => {
    e.preventDefault();

    await updateProject(editing._id, {
      ...editing,
      techStack: editing.techStack.split(",").map(t => t.trim()).filter(Boolean),
      images: editing.images.split(",").map(i => i.trim()).filter(Boolean),
      order: Number(editing.order),
    });

    setEditing(null);
    refetch();
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    await deleteProject(id);
    refetch();
  };

  return (
    <div className="space-y-14">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          relative overflow-hidden
          rounded-3xl
          border border-slate-200 dark:border-slate-800
          bg-linear-to-br from-blue-600/10 to-purple-600/10
          p-6
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400">
              Manage portfolio case studies
            </p>
          </div>

          <span className="rounded-full bg-blue-500/20 px-4 py-1 text-sm font-medium text-blue-600">
            {projects.length} Projects
          </span>
        </div>
      </motion.div>

      {/* ================= ADD PROJECT ================= */}
      <motion.form
        onSubmit={handleAdd}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          rounded-3xl
          border border-slate-200 dark:border-slate-800
          bg-white/70 dark:bg-slate-900/60
          backdrop-blur-xl
          p-8
          shadow-xl
          space-y-5
        "
      >
        <h2 className="text-xl font-semibold">Add New Project</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            ["Project title", "title"],
            ["Order (0 = top)", "order"],
            ["GitHub URL", "githubUrl"],
            ["Live URL", "liveUrl"],
          ].map(([label, key]) => (
            <input
              key={key}
              placeholder={label}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              type={key === "order" ? "number" : "text"}
              className="
                rounded-xl border border-slate-300 dark:border-slate-700
                bg-white/80 dark:bg-slate-900/80
                px-4 py-3
                shadow-sm
                transition
                focus:outline-none
                focus:ring-2 focus:ring-blue-500/40
              "
            />
          ))}
        </div>

        {[
          ["Short description", "shortDescription"],
          ["Detailed description (case study)", "detailedDescription"],
          ["Tech stack (React, Node, MongoDB)", "techStack"],
          ["Image URLs (comma separated)", "images"],
          ["Challenges faced", "challenges"],
          ["Key learnings", "learnings"],
        ].map(([label, key]) => (
          <textarea
            key={key}
            placeholder={label}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            rows={key === "detailedDescription" ? 4 : 2}
            className="
              w-full rounded-xl
              border border-slate-300 dark:border-slate-700
              bg-white/80 dark:bg-slate-900/80
              px-4 py-3
              shadow-sm
              focus:outline-none
              focus:ring-2 focus:ring-purple-500/40
            "
          />
        ))}

        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Featured Project
        </label>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="
            inline-flex items-center justify-center
            rounded-xl
            bg-linear-to-r from-blue-600 to-purple-600
            px-10 py-3
            text-white font-medium
            shadow-lg shadow-blue-500/30
          "
        >
          Add Project
        </motion.button>
      </motion.form>

      {/* ================= PROJECT LIST ================= */}
      {isLoading && <p className="text-slate-400">Loading…</p>}

      <div className="grid gap-6">
        <AnimatePresence>
          {projects.map((p) => (
            <motion.div
              key={p._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220 }}
              className="
                group relative overflow-hidden
                rounded-2xl
                border border-slate-200 dark:border-slate-800
                bg-white/70 dark:bg-slate-900/60
                backdrop-blur
                p-6
                shadow-lg hover:shadow-2xl
                transition
              "
            >
              {/* Accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-500 to-purple-500 opacity-70" />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{p.title}</h2>
                  {p.featured && (
                    <span className="rounded-full bg-purple-500/20 px-3 py-0.5 text-xs font-medium text-purple-600">
                      Featured
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-500 line-clamp-2">
                  {p.shortDescription}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {p.techStack?.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-slate-200 dark:bg-slate-800 px-3 py-1 text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() =>
                    setEditing({
                      ...p,
                      techStack: p.techStack.join(", "),
                      images: p.images.join(", "),
                    })
                  }
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsAdmin;
