import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import api from "../../utils/axios";

/**
 * Admin Profile Editor (Theme-Based + Premium UI)
 */
const ProfileAdmin = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => (await api.get("/profile")).data,
  });

  const handleSave = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    await api.post("/profile", {
      fullName: form.get("fullName"),
      tagline: form.get("tagline"),
      bio: form.get("bio"),
    });

    alert("Profile updated successfully");
  };

  if (isLoading) {
    return (
      <div style={{ color: "rgb(var(--text-secondary))" }}>
        Loading profile...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl rounded-3xl p-8 backdrop-blur-2xl shadow-xl"
      style={{
        backgroundColor: "rgba(var(--bg-secondary),0.7)",
        border: "1px solid rgb(var(--border-color))",
      }}
    >
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ color: "rgb(var(--text-primary))" }}
        >
          Edit Profile
        </h1>

        <p
          className="mt-1"
          style={{ color: "rgb(var(--text-secondary))" }}
        >
          Update your public portfolio information
        </p>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleSave}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12 },
          },
        }}
        className="space-y-6"
      >
        {/* Full Name */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          className="space-y-2"
        >
          <label
            className="text-sm font-medium"
            style={{ color: "rgb(var(--text-secondary))" }}
          >
            Full Name
          </label>

          <input
            name="fullName"
            defaultValue={profile?.fullName}
            className="w-full rounded-xl px-4 py-3 outline-none transition-all duration-300"
            style={{
              backgroundColor: "rgba(var(--bg-secondary),0.9)",
              border: "1px solid rgb(var(--border-color))",
              color: "rgb(var(--text-primary))",
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          className="space-y-2"
        >
          <label
            className="text-sm font-medium"
            style={{ color: "rgb(var(--text-secondary))" }}
          >
            Tagline
          </label>

          <input
            name="tagline"
            defaultValue={profile?.tagline}
            className="w-full rounded-xl px-4 py-3 outline-none transition-all duration-300"
            style={{
              backgroundColor: "rgba(var(--bg-secondary),0.9)",
              border: "1px solid rgb(var(--border-color))",
              color: "rgb(var(--text-primary))",
            }}
          />
        </motion.div>

        {/* Bio */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          className="space-y-2"
        >
          <label
            className="text-sm font-medium"
            style={{ color: "rgb(var(--text-secondary))" }}
          >
            Bio
          </label>

          <textarea
            name="bio"
            rows={5}
            defaultValue={profile?.bio}
            className="w-full rounded-xl px-4 py-3 outline-none resize-none transition-all duration-300"
            style={{
              backgroundColor: "rgba(var(--bg-secondary),0.9)",
              border: "1px solid rgb(var(--border-color))",
              color: "rgb(var(--text-primary))",
            }}
          />
        </motion.div>

        {/* Actions */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 },
          }}
          className="flex justify-end pt-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-xl px-8 py-3 font-medium text-white shadow-lg transition-all duration-300"
            style={{
              background:
                "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
            }}
          >
            Save Changes
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default ProfileAdmin;