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
  {/* Animated Theme Glow Background */}
  <motion.div
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ duration: 10, repeat: Infinity }}
    className="absolute -top-40 -left-40 h-96 w-96 rounded-full 
    bg-[rgb(var(--accent-primary))]/20 blur-[140px]"
    style={{
          backgroundColor: "rgba(var(--accent-primary),0.18)",
        }}
  />
  <motion.div
    animate={{ scale: [1, 1.15, 1] }}
    transition={{ duration: 12, repeat: Infinity }}
    className="absolute top-1/3 -right-40 h-96 w-96 rounded-full 
    bg-[rgb(var(--accent-secondary))]/20 blur-[140px]"
    style={{
          backgroundColor: "rgba(var(--accent-primary),0.18)",
        }}
  />

  <div className="relative mx-auto max-w-7xl px-6 sm:px-10 py-20 md:py-32">
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid items-center gap-16 md:grid-cols-2"
    >
      {/* LEFT SIDE */}
      <div className="space-y-8 text-center md:text-left">
        <motion.h1
          variants={fadeUp}
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
        >
          Hi, I’m{" "}
          <span
            className="bg-clip-text text-transparent bg-linear-to-r"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
            }}
          >
            {profile.fullName}
          </span>
          <br />
          <span className="text-lg md:text-xl font-medium text-[rgb(var(--text-secondary))]">
            Full Stack MERN Developer
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg text-[rgb(var(--text-secondary))]"
        >
          {profile.tagline ||
            "I build scalable, production-ready web applications using MERN stack."}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="max-w-xl mx-auto md:mx-0 text-sm sm:text-base text-[rgb(var(--text-secondary))]"
        >
          {profile.bio}
        </motion.p>

        {/* CTA BUTTONS */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center md:justify-start gap-4 pt-4"
        >
          {/* PRIMARY BUTTON */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            href="/projects"
            className="relative overflow-hidden rounded-xl px-8 py-3 
            font-medium text-white shadow-lg transition-all duration-300"
            style={{
              background:
                "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
            }}
          >
            View Projects
          </motion.a>

          {/* SECONDARY BUTTON */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            href="/Ashish_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl px-8 py-3 font-medium 
            border backdrop-blur-lg transition-all duration-300"
            style={{
              borderColor: "rgb(var(--border-color))",
              backgroundColor: "rgba(var(--bg-secondary),0.6)",
              color: "rgb(var(--text-primary))",
            }}
          >
            Download Resume
          </motion.a>
        </motion.div>
      </div>

      {/* RIGHT SIDE CARD */}
      <motion.div
        variants={scaleIn}
        whileHover={{ y: -8 }}
        className="relative rounded-3xl p-8 sm:p-10 backdrop-blur-2xl 
        border transition-all duration-500"
        style={{
          backgroundColor: "rgba(var(--bg-secondary),0.7)",
          borderColor: "rgb(var(--border-color))",
        }}
      >
        <div className="space-y-6">
          <div
            className="h-1 w-20 rounded-full"
            style={{
              background:
                "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
            }}
          />

          <h3 className="text-2xl font-semibold">
            What I Do Best
          </h3>

          <p className="text-[rgb(var(--text-secondary))]">
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
                className="rounded-full px-4 py-1 border transition-all duration-300"
                style={{
                  borderColor: "rgb(var(--border-color))",
                  backgroundColor: "rgba(var(--bg-primary),0.5)",
                  color: "rgb(var(--text-secondary))",
                }}
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
