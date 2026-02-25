import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { getSkills } from "../../api/skill.api";
import {
  addSkill,
  updateSkill,
  deleteSkill,
} from "../../api/admin.skill.api";

/**
 * Admin Skills Management (Theme-Based + Premium CMS)
 */
const SkillsAdmin = () => {
  const {
    data: skills = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });

  const [form, setForm] = useState({
    name: "",
    category: "frontend",
    level: 3,
  });

  const [editing, setEditing] = useState(null);

  /* ---------------- ADD ---------------- */
  const handleAdd = async (e) => {
    e.preventDefault();

    await addSkill({
      ...form,
      level: Number(form.level),
    });

    setForm({ name: "", category: "frontend", level: 3 });
    refetch();
  };

  /* ---------------- UPDATE ---------------- */
  const handleUpdate = async (e) => {
    e.preventDefault();

    await updateSkill(editing._id, {
      name: editing.name,
      category: editing.category,
      level: Number(editing.level),
    });

    setEditing(null);
    refetch();
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Remove this skill?")) return;
    await deleteSkill(id);
    refetch();
  };

  return (
    <div
      className="space-y-12"
      style={{ backgroundColor: "rgb(var(--bg-primary))" }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-3xl font-bold"
            style={{ color: "rgb(var(--text-primary))" }}
          >
            Skills
          </h1>
          <p style={{ color: "rgb(var(--text-secondary))" }}>
            Add, update and manage skills
          </p>
        </div>

        <span
          className="rounded-full px-4 py-1 text-sm font-medium"
          style={{
            backgroundColor: "rgba(var(--accent-primary),0.12)",
            color: "rgb(var(--accent-primary))",
          }}
        >
          {skills.length} Skills
        </span>
      </div>

      {/* ADD SKILL */}
      <motion.form
        onSubmit={handleAdd}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-6 space-y-4 backdrop-blur-2xl shadow-xl"
        style={{
          backgroundColor: "rgba(var(--bg-secondary),0.7)",
          border: "1px solid rgb(var(--border-color))",
        }}
      >
        <h2
          className="text-xl font-semibold"
          style={{ color: "rgb(var(--text-primary))" }}
        >
          Add New Skill
        </h2>

        <div className="grid md:grid-cols-4 gap-4">
          <input
            placeholder="Skill name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
            className="rounded-xl px-4 py-3 outline-none"
            style={{
              backgroundColor: "rgba(var(--bg-secondary),0.9)",
              border: "1px solid rgb(var(--border-color))",
              color: "rgb(var(--text-primary))",
            }}
          />

          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="rounded-xl px-4 py-3 outline-none"
            style={{
              backgroundColor: "rgba(var(--bg-secondary),0.9)",
              border: "1px solid rgb(var(--border-color))",
              color: "rgb(var(--text-primary))",
            }}
          >
            {["frontend", "backend", "database", "tools"].map(
              (c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              )
            )}
          </select>

          <input
            type="number"
            min="1"
            max="5"
            step="0.1"
            value={form.level}
            onChange={(e) =>
              setForm({ ...form, level: e.target.value })
            }
            className="rounded-xl px-4 py-3 outline-none"
            style={{
              backgroundColor: "rgba(var(--bg-secondary),0.9)",
              border: "1px solid rgb(var(--border-color))",
              color: "rgb(var(--text-primary))",
            }}
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="rounded-xl text-white font-medium"
            style={{
              background:
                "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
            }}
          >
            Add Skill
          </motion.button>
        </div>
      </motion.form>

      {/* SKILLS LIST */}
      {isLoading && (
        <p style={{ color: "rgb(var(--text-secondary))" }}>
          Loading…
        </p>
      )}

      <motion.div
        className="grid md:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        <AnimatePresence>
          {skills.map((skill) => {
            const percent = Math.round((skill.level / 5) * 100);

            return (
              <motion.div
                key={skill._id}
                layout
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl p-6 backdrop-blur-xl shadow-lg"
                style={{
                  backgroundColor:
                    "rgba(var(--bg-secondary),0.7)",
                  border: "1px solid rgb(var(--border-color))",
                }}
              >
                <h3
                  className="font-semibold text-lg"
                  style={{ color: "rgb(var(--text-primary))" }}
                >
                  {skill.name}
                </h3>

                <p
                  className="text-xs uppercase"
                  style={{ color: "rgb(var(--text-secondary))" }}
                >
                  {skill.category}
                </p>

                <div
                  className="mt-3 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      "rgba(var(--accent-primary),0.1)",
                  }}
                >
                  <div
                    style={{
                      width: `${percent}%`,
                      background:
                        "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
                    }}
                    className="h-full rounded-full transition-all"
                  />
                </div>

                <p
                  className="mt-2 text-sm"
                  style={{ color: "rgb(var(--text-secondary))" }}
                >
                  {percent}%
                </p>

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    onClick={() => setEditing({ ...skill })}
                    style={{
                      color: "rgb(var(--accent-primary))",
                    }}
                    className="text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id)}
                    style={{
                      color: "rgb(var(--accent-secondary))",
                    }}
                    className="text-sm"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          >
            <motion.form
              onSubmit={handleUpdate}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-md rounded-3xl p-6 space-y-4 backdrop-blur-2xl"
              style={{
                backgroundColor:
                  "rgba(var(--bg-secondary),0.95)",
                border: "1px solid rgb(var(--border-color))",
              }}
            >
              <h2
                className="text-xl font-semibold"
                style={{
                  color: "rgb(var(--text-primary))",
                }}
              >
                Update Skill
              </h2>

              <input
                value={editing.name}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-xl px-4 py-3 outline-none"
                style={{
                  backgroundColor:
                    "rgba(var(--bg-secondary),0.9)",
                  border:
                    "1px solid rgb(var(--border-color))",
                  color: "rgb(var(--text-primary))",
                }}
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  style={{
                    color: "rgb(var(--text-secondary))",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl px-6 py-2 text-white"
                  style={{
                    background:
                      "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
                  }}
                >
                  Save
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillsAdmin;