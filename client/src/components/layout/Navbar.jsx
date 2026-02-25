import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

/* ===================== LINKS ===================== */
const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
  { name: "Admin", path: "/login" },
];

/* ===================== NAVBAR ===================== */
const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= FLOATING NAVBAR ================= */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-1/2 z-50 w-[94%] max-w-6xl -translate-x-1/2 rounded-2xl backdrop-blur-2xl shadow-xl transition-all duration-500"
        style={{
          backgroundColor: "rgba(var(--bg-secondary),0.7)",
          border: "1px solid rgb(var(--border-color))",
        }}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link to="/" className="text-lg font-bold tracking-tight">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
              }}
            >
              Ashish.dev
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="relative hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className="relative transition-colors duration-300"
                  style={{
                    color: isActive
                      ? "rgb(var(--accent-primary))"
                      : "rgb(var(--text-secondary))",
                  }}
                >
                  {link.name}

                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full"
                      style={{
                        background:
                          "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
                      }}
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "rgba(var(--bg-primary),0.6)",
                color: "rgb(var(--text-primary))",
                border: "1px solid rgb(var(--border-color))",
              }}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden rounded-lg p-2 transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "rgba(var(--bg-primary),0.6)",
                border: "1px solid rgb(var(--border-color))",
              }}
              aria-label="Open Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ================= MOBILE OVERLAY ================= */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 backdrop-blur-sm"
              style={{
                backgroundColor: "rgba(0,0,0,0.4)",
              }}
            />

            {/* Mobile Panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed right-4 top-4 z-50 w-72 rounded-2xl p-6 shadow-2xl backdrop-blur-2xl"
              style={{
                backgroundColor: "rgba(var(--bg-secondary),0.9)",
                border: "1px solid rgb(var(--border-color))",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-semibold text-[rgb(var(--text-primary))]">
                  Menu
                </span>
                <button onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>

              {/* Links */}
              <nav className="space-y-5 text-base font-medium">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className="block transition-colors duration-300"
                    style={({ isActive }) => ({
                      color: isActive
                        ? "rgb(var(--accent-primary))"
                        : "rgb(var(--text-secondary))",
                    })}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>

              {/* Divider */}
              <div
                className="my-6 h-px"
                style={{
                  backgroundColor: "rgb(var(--border-color))",
                }}
              />

              {/* Theme Toggle (Mobile) */}
              <button
                onClick={toggleTheme}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-2 transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "rgba(var(--bg-primary),0.7)",
                  border: "1px solid rgb(var(--border-color))",
                }}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                <span className="text-sm">Toggle Theme</span>
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-24" />
    </>
  );
};

export default Navbar;