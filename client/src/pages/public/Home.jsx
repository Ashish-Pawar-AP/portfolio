import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getProfile } from "../../api/profile.api";
import useSEO from "../../hooks/useSEO";
import HomeSkeleton from "../../components/skeletons/HomeSkeleton";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Home = () => {
  useSEO({
    title: "Home",
    description:
      "Full Stack MERN Developer specializing in React, Node.js, MongoDB, and scalable web applications.",
  });

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (isLoading) return <HomeSkeleton />;

  return (
    <section className="relative overflow-hidden">
      {/* Animated Background Glows */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-40 -left-40 h-130 w-130 rounded-full bg-blue-500/20 blur-[120px] md:blur-[140px]
"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/3 -right-40 h-130 w-130 rounded-full bg-purple-500/20 blur-[120px] md:blur-[140px]
"
      />

      <div className="relative mx-auto max-w-6xl px-8 py-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-20 md:grid-cols-2"
        >
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            <motion.h1
              variants={fadeUp}
              className="text-3xl font-bold leading-tight md:text-5xl"
            >
              Hi, I’m{" "}
              <span className="bg-linear-to-r from-blue-500 via-cyan-400 to-purple-600 bg-clip-text text-transparent">
                {profile.fullName}
              </span>
              <br />
              <span className="text-slate-800 dark:text-slate-200 text-xl md:text-2xl font-medium">
                Full Stack MERN Developer
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl font-medium text-slate-700 dark:text-slate-300"
            >
              {profile.tagline ||
                "I build scalable, production-ready web applications using MERN stack."}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="max-w-xl text-slate-600 dark:text-slate-400"
            >
              {profile.bio}
            </motion.p>

            {/* CTA BUTTONS */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-5 pt-4">
              <motion.a
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                href="/projects"
                className="
                  relative overflow-hidden
                  rounded-xl px-8 py-3
                  bg-linear-to-r from-blue-600 to-purple-600
                  font-medium text-white
                  shadow-xl shadow-blue-500/30
                "
              >
                <span className="relative z-10">View Projects</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity hover:opacity-100" />
              </motion.a>

              {
                <motion.a
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  href={"/Ashish_CV.pdf"}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    rounded-xl px-8 py-3
                    border border-slate-300 dark:border-slate-700
                    bg-white/70 dark:bg-slate-900/60
                    backdrop-blur
                    font-medium
                    text-slate-700 dark:text-slate-200
                    shadow-lg
                  "
                >
                  Download Resume
                </motion.a>
              }
            </motion.div>
          </div>

          {/* RIGHT CARD */}
          <motion.div
            variants={scaleIn}
            whileHover={{ y: -6 }}
            className="
              relative rounded-3xl
              border border-slate-200 dark:border-slate-800
              bg-white/80 dark:bg-slate-900/70
              backdrop-blur-xl
              p-10
              shadow-2xl
            "
          >
            <div className="space-y-6">
              <div className="h-2 w-16 rounded-full bg-linear-to-r from-blue-500 to-purple-600" />

              <h3 className="text-2xl font-semibold">What I Do Best</h3>

              <p className="text-slate-600 dark:text-slate-400">
                I design and build full-stack applications with clean
                architecture, secure authentication, and scalable APIs.
              </p>

              <div className="flex flex-wrap gap-3 text-sm">
                {[
                  "React",
                  "Node.js",
                  "MongoDB",
                  "AI",
                  "Express",
                  "JWT",
                  "TailwindCSS",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="
                      rounded-full
                      border border-slate-300 dark:border-slate-700
                      px-4 py-1
                      bg-white/60 dark:bg-slate-800/60
                      text-slate-600 dark:text-slate-300
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
