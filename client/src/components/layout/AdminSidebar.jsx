import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

/**
 * Admin Sidebar (Theme-Based + Animated + Toggle Added)
 */
const AdminSidebar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const logout = () => {
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Projects", path: "/admin/projects" },
    { name: "Skills", path: "/admin/skills" },
    { name: "Messages", path: "/admin/messages" },
    { name: "Profile", path: "/admin/profile" },
    { name: "Blogs", path: "/admin/blogs" },
    { name: "Resume", path: "/admin/resume" },
  ];

  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative w-64 min-h-screen p-6 flex flex-col justify-between backdrop-blur-2xl"
      style={{
        backgroundColor: "rgba(var(--bg-secondary),0.7)",
        borderRight: "1px solid rgb(var(--border-color))",
      }}
    >
      {/* Accent Glow */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(var(--accent-primary),0.08), transparent)",
        }}
      />

      {/* Top Section */}
      <div className="relative">
        {/* Brand */}
        <h2
          className="mb-10 text-xl font-bold tracking-tight"
          style={{
            background:
              "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          DevSphere Admin
        </h2>

        {/* Navigation */}
        <nav className="space-y-1 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive
                  ? "rgba(var(--accent-primary),0.08)"
                  : "transparent",
                color: isActive
                  ? "rgb(var(--accent-primary))"
                  : "rgb(var(--text-secondary))",
              })}
            >
              {({ isActive }) =>
                isActive && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
                    }}
                  />
                )
              }

              <span className="relative z-10">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="relative space-y-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm transition-all duration-300"
          style={{
            backgroundColor: "rgba(var(--bg-secondary),0.8)",
            border: "1px solid rgb(var(--border-color))",
            color: "rgb(var(--text-primary))",
          }}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          Toggle Theme
        </button>

        {/* Logout */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={logout}
          className="w-full rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300"
          style={{
            color: "rgb(220 38 38)",
            backgroundColor: "rgba(220,38,38,0.08)",
          }}
        >
          Logout
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;