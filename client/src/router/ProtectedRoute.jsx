import { Navigate, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

/**
 * Protected Route (Theme-Based + Smooth UX)
 */
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="flex h-screen items-center justify-center transition-colors duration-500"
        style={{
          backgroundColor: "rgb(var(--bg-primary))",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl px-6 py-4 backdrop-blur-xl shadow-lg"
          style={{
            backgroundColor: "rgba(var(--bg-secondary),0.7)",
            border: "1px solid rgb(var(--border-color))",
            color: "rgb(var(--text-secondary))",
          }}
        >
          Checking authentication...
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;