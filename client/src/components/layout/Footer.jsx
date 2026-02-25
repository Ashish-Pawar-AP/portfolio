import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative backdrop-blur-xl transition-colors duration-500"
      style={{
        backgroundColor: "rgba(var(--bg-secondary),0.8)",
        borderTop: "1px solid rgb(var(--border-color))",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-12 text-center">

        {/* Brand */}
        <h2 className="text-lg font-semibold">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
            }}
          >
            Ashish.dev
          </span>
        </h2>

        {/* Tagline */}
        <p
          className="mt-3 text-sm"
          style={{ color: "rgb(var(--text-secondary))" }}
        >
          Full Stack Developer • MERN Stack • Clean UI
        </p>

        {/* Social Icons */}
        <div className="mt-8 flex justify-center gap-6">
          {[
            { icon: Github, href: "https://github.com/" },
            { icon: Linkedin, href: "https://linkedin.com/" },
            { icon: Mail, href: "mailto:example@gmail.com" },
          ].map(({ icon: Icon, href }, index) => (
            <motion.a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full p-3 transition-all duration-300 backdrop-blur-xl"
              style={{
                border: "1px solid rgb(var(--border-color))",
                color: "rgb(var(--text-secondary))",
                backgroundColor: "rgba(var(--bg-primary),0.6)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "rgb(var(--accent-primary))";
                e.currentTarget.style.borderColor =
                  "rgb(var(--accent-primary))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  "rgb(var(--text-secondary))";
                e.currentTarget.style.borderColor =
                  "rgb(var(--border-color))";
              }}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div
          className="mt-10 h-px w-full"
          style={{
            background:
              "linear-gradient(to right, transparent, rgb(var(--border-color)), transparent)",
          }}
        />

        {/* Copyright */}
        <p
          className="mt-6 text-xs"
          style={{ color: "rgb(var(--text-secondary))" }}
        >
          © {new Date().getFullYear()} Ashish Pawar. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;