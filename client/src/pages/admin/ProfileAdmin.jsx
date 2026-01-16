import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import api from "../../utils/axios";

/**
 * Admin Profile Editor (Advanced UI + Animations)
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
    return <div className="text-slate-400">Loading profile...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        max-w-2xl
        rounded-3xl
        border border-slate-200 dark:border-slate-800
        bg-white/70 dark:bg-slate-900/60
        backdrop-blur
        p-8
        shadow-xl
      "
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Edit Profile
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
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
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Full Name
          </label>
          <input
            name="fullName"
            defaultValue={profile?.fullName}
            className="
              w-full rounded-xl
              border border-slate-300 dark:border-slate-700
              bg-white dark:bg-slate-950
              px-4 py-3
              text-slate-900 dark:text-white
              outline-none
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
            "
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
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Tagline
          </label>
          <input
            name="tagline"
            defaultValue={profile?.tagline}
            className="
              w-full rounded-xl
              border border-slate-300 dark:border-slate-700
              bg-white dark:bg-slate-950
              px-4 py-3
              text-slate-900 dark:text-white
              outline-none
              focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
            "
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
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Bio
          </label>
          <textarea
            name="bio"
            rows={5}
            defaultValue={profile?.bio}
            className="
              w-full rounded-xl
              border border-slate-300 dark:border-slate-700
              bg-white dark:bg-slate-950
              px-4 py-3
              text-slate-900 dark:text-white
              outline-none
              resize-none
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
            "
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
            className="
              rounded-xl px-8 py-3
              bg-linear-to-r from-blue-600 to-purple-600
              font-medium text-white
              shadow-lg shadow-blue-500/30
            "
          >
            Save Changes
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default ProfileAdmin;
