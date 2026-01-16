import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getProfile } from "../../api/profile.api";
import { getSkills } from "../../api/skill.api";
import SkillsSection from "../../components/common/SkillsSection";
import Timeline from "../../components/common/Timeline";
import useSEO from "../../hooks/useSEO";
import SkillsSkeleton from "../../components/skeletons/SkillsSkeleton";

/**
 * About Page (Advanced UI + Animations)
 */
const About = () => {
  useSEO({
    title: "About Me",
    description:
      "Learn about my skills, experience, and journey as a Full Stack Developer.",
  });

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { data: skills = [], isLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });
  if (isLoading) {
  return <SkillsSkeleton />;
}

  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-blue-500/20 blur-[120px]" />
      <div className="absolute top-1/3 -right-40 h-125 w-125 rounded-full bg-purple-500/20 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-8 py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                staggerChildren: 0.2,
              },
            },
          }}
          className="space-y-24"
        >
          {/* ================= ABOUT INTRO ================= */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="
              rounded-3xl
              border border-slate-200 dark:border-slate-800
              bg-white/70 dark:bg-slate-900/60
              backdrop-blur
              p-10
              shadow-xl
              space-y-6
            "
          >
            <h1 className="text-4xl font-bold">
              About{" "}
              <span className="bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Me
              </span>
            </h1>

            <p className="max-w-3xl text-slate-600 dark:text-slate-400 leading-relaxed">
              {profile?.bio}
            </p>
          </motion.div>

          {/* ================= SKILLS ================= */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-3xl font-semibold">
                Skills & Expertise
              </h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Technologies and tools I use to build real-world applications
              </p>
            </div>

            {/* Skills Section (kept reusable) */}
            <SkillsSection skills={skills} />
          </motion.div>

          {/* ================= EXPERIENCE ================= */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-3xl font-semibold">
                Experience & Journey
              </h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                My professional growth and learning timeline
              </p>
            </div>

            {/* Timeline Component */}
            <div
              className="
                rounded-3xl
                border border-slate-200 dark:border-slate-800
                bg-white/70 dark:bg-slate-900/60
                backdrop-blur
                p-10
                shadow-xl
              "
            >
              <Timeline />
            </div>
          </motion.div>

          {/* ================= RESUME ================= */}
          {profile?.resumeUrl && (
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
              className="text-center"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex items-center justify-center
                  rounded-xl px-10 py-4
                  bg-linear-to-r from-blue-600 to-purple-600
                  text-white font-medium
                  shadow-lg shadow-blue-500/30
                "
              >
                Download Resume
              </motion.a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
