import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

const PublicLayout = () => {
  return (
    <div
      className="relative min-h-screen flex flex-col transition-colors duration-500 overflow-hidden"
      style={{
        backgroundColor: "rgb(var(--bg-primary))",
      }}
    >
      {/* Global Background Glow */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-125 w-125 rounded-full blur-[160px]"
        style={{
          backgroundColor: "rgba(var(--accent-primary),0.05)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 -right-40 h-125 w-125 rounded-full blur-[160px]"
        style={{
          backgroundColor: "rgba(var(--accent-secondary),0.05)",
        }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative flex-1">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
          <Analytics />
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
