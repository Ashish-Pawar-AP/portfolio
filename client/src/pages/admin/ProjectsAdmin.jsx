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
 * Admin Projects Management (Theme-Based + Premium CMS)
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

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    await deleteProject(id);
    refetch();
  };

  return (
    <div
      className="space-y-14"
      style={{ backgroundColor: "rgb(var(--bg-primary))" }}
    >
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl p-6"
        style={{
          border: "1px solid rgb(var(--border-color))",
          background:
            "linear-gradient(to bottom right, rgba(var(--accent-primary),0.08), rgba(var(--accent-secondary),0.08))",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-3xl font-bold tracking-tight"
              style={{ color: "rgb(var(--text-primary))" }}
            >
              Projects
            </h1>

            <p style={{ color: "rgb(var(--text-secondary))" }}>
              Manage portfolio case studies
            </p>
          </div>

          <span
            className="rounded-full px-4 py-1 text-sm font-medium"
            style={{
              backgroundColor: "rgba(var(--accent-primary),0.15)",
              color: "rgb(var(--accent-primary))",
            }}
          >
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
        className="rounded-3xl p-8 space-y-5 backdrop-blur-2xl shadow-xl"
        style={{
          backgroundColor: "rgba(var(--bg-secondary),0.7)",
          border: "1px solid rgb(var(--border-color))",
        }}
      >
        <h2
          className="text-xl font-semibold"
          style={{ color: "rgb(var(--text-primary))" }}
        >
          Add New Project
        </h2>

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
              className="rounded-xl px-4 py-3 outline-none transition"
              style={{
                backgroundColor: "rgba(var(--bg-secondary),0.9)",
                border: "1px solid rgb(var(--border-color))",
                color: "rgb(var(--text-primary))",
              }}
            />
          ))}
        </div>

        {[
          ["Short description", "shortDescription"],
          ["Detailed description", "detailedDescription"],
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
            className="w-full rounded-xl px-4 py-3 outline-none resize-none transition"
            style={{
              backgroundColor: "rgba(var(--bg-secondary),0.9)",
              border: "1px solid rgb(var(--border-color))",
              color: "rgb(var(--text-primary))",
            }}
          />
        ))}

        <label
          className="flex items-center gap-2 text-sm font-medium"
          style={{ color: "rgb(var(--text-secondary))" }}
        >
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
          className="rounded-xl px-10 py-3 text-white font-medium shadow-lg"
          style={{
            background:
              "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
          }}
        >
          Add Project
        </motion.button>
      </motion.form>

      {/* ================= PROJECT LIST ================= */}
      {isLoading && (
        <p style={{ color: "rgb(var(--text-secondary))" }}>
          Loading…
        </p>
      )}

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
              className="group relative rounded-2xl p-6 backdrop-blur-xl shadow-lg transition-all"
              style={{
                backgroundColor: "rgba(var(--bg-secondary),0.7)",
                border: "1px solid rgb(var(--border-color))",
              }}
            >
              {/* Accent Bar */}
              <div
                className="absolute inset-x-0 top-0 h-1 rounded-t-2xl"
                style={{
                  background:
                    "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
                }}
              />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2
                    className="text-lg font-semibold"
                    style={{ color: "rgb(var(--text-primary))" }}
                  >
                    {p.title}
                  </h2>

                  {p.featured && (
                    <span
                      className="rounded-full px-3 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor:
                          "rgba(var(--accent-secondary),0.15)",
                        color: "rgb(var(--accent-secondary))",
                      }}
                    >
                      Featured
                    </span>
                  )}
                </div>

                <p
                  className="text-sm line-clamp-2"
                  style={{ color: "rgb(var(--text-secondary))" }}
                >
                  {p.shortDescription}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {p.techStack?.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-3 py-1 text-xs"
                      style={{
                        backgroundColor:
                          "rgba(var(--accent-primary),0.1)",
                        color: "rgb(var(--accent-primary))",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-sm"
                  style={{ color: "rgb(var(--accent-secondary))" }}
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