import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* Navbar links (public) */
const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

/* Sidebar links (secondary) */
const SIDEBAR_LINKS = [
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "Resume AI", path: "/resume-ai" },
  { name: "Admin", path: "/login" },
];

/* Animations */
const sidebarVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 260, damping: 30 },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.3 },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08 },
  }),
};

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          sticky top-0 z-50
          border-b border-slate-200 dark:border-slate-800
          bg-white/70 dark:bg-slate-900/70
          backdrop-blur-md
        "
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Ashish.dev
            </span>
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={`relative ${
                    isActive
                      ? "text-blue-600"
                      : "text-slate-700 dark:text-slate-300 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-underline"
                      className="absolute left-0 -bottom-1 h-0.5 w-full bg-blue-600"
                    />
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Animated Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="relative h-8 w-8"
            aria-label="Toggle Menu"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="absolute left-0 top-2 h-0.5 w-8 bg-slate-800 dark:bg-white"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="absolute left-0 top-4 h-0.5 w-8 bg-slate-800 dark:bg-white"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="absolute left-0 top-6 h-0.5 w-8 bg-slate-800 dark:bg-white"
            />
          </button>
        </div>
      </motion.nav>

      {/* SIDEBAR */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            {/* Sidebar Panel */}
            <motion.aside
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="
                fixed right-0 top-0 z-50 h-full w-80
                bg-white dark:bg-slate-900
                border-l border-slate-200 dark:border-slate-800
                p-10
              "
            >
              <nav className="mt-20 space-y-6 text-lg font-medium">
                {SIDEBAR_LINKS.map((link, i) => (
                  <motion.div
                    key={link.path}
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        isActive
                          ? "block text-blue-600"
                          : "block text-slate-700 dark:text-slate-300 hover:text-blue-600"
                      }
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
