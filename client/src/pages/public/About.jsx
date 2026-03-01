import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getProfile } from "../../api/profile.api";
import { getSkills } from "../../api/skill.api";
import SkillsSection from "../../components/common/SkillsSection";
import Timeline from "../../components/common/Timeline";
import useSEO from "../../hooks/useSEO";
import AboutSkeleton from "../../components/skeletons/AboutSkeleton";

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
    return <AboutSkeleton />;
  }

  return (
    <section className="relative overflow-hidden">
      {/* Animated Theme Glow Background */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-[140px]"
        style={{
          backgroundColor: "rgba(var(--accent-primary),0.18)",
        }}
      />

      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-1/3 -right-40 h-96 w-96 rounded-full blur-[140px]"
        style={{
          backgroundColor: "rgba(var(--accent-secondary),0.18)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 py-20 md:py-32">
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
          className="space-y-20 md:space-y-28"
        >
          {/* ================= ABOUT INTRO ================= */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="rounded-3xl p-8 md:p-12 backdrop-blur-2xl border transition-all duration-500"
            style={{
              backgroundColor: "rgba(var(--bg-secondary),0.7)",
              borderColor: "rgb(var(--border-color))",
            }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              About{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
                }}
              >
                Me
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-base md:text-lg leading-relaxed text-[rgb(var(--text-secondary))]">
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
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-semibold">
                Skills & Expertise
              </h2>
              <p className="mt-2 text-sm md:text-base text-[rgb(var(--text-secondary))]">
                Technologies and tools I use to build real-world applications
              </p>
            </div>

            {/* Reusable Skills Section */}
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
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-semibold">
                Experience & Journey
              </h2>
              <p className="mt-2 text-sm md:text-base text-[rgb(var(--text-secondary))]">
                My professional growth and learning timeline
              </p>
            </div>

            <div
              className="rounded-3xl p-8 md:p-12 backdrop-blur-2xl border transition-all duration-500"
              style={{
                backgroundColor: "rgba(var(--bg-secondary),0.7)",
                borderColor: "rgb(var(--border-color))",
              }}
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
              className="text-center pt-6"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                href="/Ashish_CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl px-10 py-4 font-medium text-white shadow-lg transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
                }}
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
