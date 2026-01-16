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
 * Admin Skills Management (FULL CRUD + Advanced UI)
 */
const SkillsAdmin = () => {
  const { data: skills = [], refetch, isLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });

  const [form, setForm] = useState({ name: "", level: 3 });
  const [editing, setEditing] = useState(null); // skill being edited

  /* ---------------- ADD SKILL ---------------- */
  const handleAdd = async (e) => {
    e.preventDefault();
    await addSkill(form);
    setForm({ name: "", level: 3 });
    refetch();
  };

  /* ---------------- UPDATE SKILL ---------------- */
  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateSkill(editing._id, {
      name: editing.name,
      level: editing.level,
    });
    setEditing(null);
    refetch();
  };

  /* ---------------- DELETE SKILL ---------------- */
  const handleDelete = async (id) => {
    if (!confirm("Remove this skill?")) return;
    await deleteSkill(id);
    refetch();
  };

  return (
    <div className="space-y-12">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Add, update and manage skills
          </p>
        </div>

        <span className="rounded-full bg-purple-500/10 px-4 py-1 text-sm text-purple-600">
          {skills.length} Skills
        </span>
      </div>

      {/* ================= ADD SKILL ================= */}
      <motion.form
        onSubmit={handleAdd}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          rounded-3xl border border-slate-200 dark:border-slate-800
          bg-white/70 dark:bg-slate-900/60 backdrop-blur
          p-6 shadow-xl space-y-4
        "
      >
        <h2 className="text-xl font-semibold">Add New Skill</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            placeholder="Skill name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
            className="rounded-xl border px-4 py-3"
          />

          <select
            value={form.level}
            onChange={(e) =>
              setForm({ ...form, level: Number(e.target.value) })
            }
            className="rounded-xl border px-4 py-3"
          >
            {[1, 2, 3, 4, 5].map((l) => (
              <option key={l} value={l}>
                Level {l}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="
              rounded-xl bg-linear-to-r
              from-purple-600 to-blue-600
              text-white font-medium
            "
          >
            Add Skill
          </button>
        </div>
      </motion.form>

      {/* ================= SKILLS GRID ================= */}
      {isLoading && <p className="text-slate-400">Loading…</p>}

      <motion.div
        className="grid md:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        <AnimatePresence>
          {skills.map((skill) => (
            <motion.div
              key={skill._id}
              layout
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -4 }}
              className="
                relative rounded-2xl border
                bg-white/70 dark:bg-slate-900/60
                backdrop-blur p-6 shadow-lg
              "
            >
              <h3 className="font-semibold text-lg">
                {skill.name}
              </h3>

              <div className="mt-2 h-2 bg-slate-200 rounded-full">
                <div
                  style={{ width: `${(skill.level / 5) * 100}%` }}
                  className="h-full rounded-full bg-linear-to-r from-purple-600 to-blue-600"
                />
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Level {skill.level}/5
              </p>

              {/* Actions */}
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setEditing({ ...skill })}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(skill._id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ================= EDIT MODAL ================= */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0 z-50
              bg-black/40 flex items-center justify-center
            "
          >
            <motion.form
              onSubmit={handleUpdate}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="
                w-full max-w-md rounded-3xl
                bg-white dark:bg-slate-900
                p-6 space-y-4
              "
            >
              <h2 className="text-xl font-semibold">
                Update Skill
              </h2>

              <input
                value={editing.name}
                onChange={(e) =>
                  setEditing({ ...editing, name: e.target.value })
                }
                className="w-full rounded-xl border px-4 py-3"
              />

              <select
                value={editing.level}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    level: Number(e.target.value),
                  })
                }
                className="w-full rounded-xl border px-4 py-3"
              >
                {[1, 2, 3, 4, 5].map((l) => (
                  <option key={l} value={l}>
                    Level {l}
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="
                    rounded-xl px-6 py-2
                    bg-linear-to-r from-blue-600 to-purple-600
                    text-white
                  "
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
