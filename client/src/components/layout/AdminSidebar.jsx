import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { clearAuth } from "../../store/auth.store";

/**
 * Admin Sidebar (Advanced UI + Animations)
 */
const AdminSidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    clearAuth();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Projects", path: "/admin/projects" },
    { name: "Skills", path: "/admin/skills" },
    { name: "Messages", path: "/admin/messages" },
    { name: "Analytics", path: "/admin/analytics" },
    { name: "Profile", path: "/admin/profile" },
    { name: "Blogs", path: "/admin/blogs" },
  ];

  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="
        relative
        w-64 min-h-screen
        border-r border-slate-200 dark:border-slate-800
        bg-white/70 dark:bg-slate-900/70
        backdrop-blur
        p-6
        flex flex-col justify-between
      "
    >
      {/* Glow Accent */}
      <div
        className="
        absolute inset-x-0 top-0 h-24
        bg-linear-to-b from-blue-500/10 to-transparent
        pointer-events-none
      "
      />

      {/* Top Section */}
      <div className="relative">
        {/* Brand */}
        <h2
          className="
          mb-10 text-xl font-bold tracking-tight
          bg-linear-to-r from-blue-600 to-purple-600
          bg-clip-text text-transparent
        "
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
                `
                group relative flex items-center gap-3
                rounded-xl px-4 py-3
                transition
                ${
                  isActive
                    ? "bg-linear-to-r from-blue-600/10 to-purple-600/10 text-blue-600 dark:text-blue-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }
              `
              }
            >
              {/* Active Indicator */}
              {({ isActive }) =>
                isActive && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="
                      absolute left-0 top-1/2 -translate-y-1/2
                      h-6 w-1 rounded-full
                      bg-linear-to-b from-blue-600 to-purple-600
                    "
                  />
                )
              }

              <span className="relative z-10">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={logout}
          className="
            w-full rounded-xl px-4 py-3
            text-sm font-medium
            text-red-500
            hover:bg-red-500/10
            transition
          "
        >
          Logout
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;
