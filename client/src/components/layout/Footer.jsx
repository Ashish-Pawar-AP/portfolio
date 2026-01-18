import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900"
    >
      <div className="mx-auto max-w-7xl px-6 py-10 text-center">
        
        {/* Brand */}
        <h2 className="text-lg font-semibold">
          <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Ashish.dev
          </span>
        </h2>

        {/* Tagline */}
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Full Stack Developer • MERN Stack • Clean UI
        </p>

        {/* Social Icons */}
        <div className="mt-6 flex justify-center gap-6">
          {[
            {
              icon: Github,
              href: "https://github.com/",
            },
            {
              icon: Linkedin,
              href: "https://linkedin.com/",
            },
            {
              icon: Mail,
              href: "mailto:example@gmail.com",
            },
          ].map(({ icon: Icon, href }, index) => (
            <motion.a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border border-gray-300 dark:border-slate-700 p-3 text-gray-600 dark:text-gray-300 transition-colors hover:border-blue-600 hover:text-blue-600"
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-8 h-px w-full bg-linear-to-r from-transparent via-gray-300 dark:via-slate-700 to-transparent" />

        {/* Copyright */}
        <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Ashish Pawar. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
