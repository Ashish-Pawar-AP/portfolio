import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import useSEO from "../../hooks/useSEO";

/**
 * Admin Login Page (Theme-Based + Premium UI)
 */
const Login = () => {
  useSEO({
    title: "Admin Login",
    description: "Admin access to portfolio dashboard",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form.email, form.password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative flex min-h-screen items-center justify-center px-4 overflow-hidden"
      style={{ backgroundColor: "rgb(var(--bg-primary))" }}
    >
      {/* Background Glow */}
      <div
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-[140px]"
        style={{ backgroundColor: "rgba(var(--accent-primary),0.1)" }}
      />
      <div
        className="absolute bottom-0 -right-40 h-96 w-96 rounded-full blur-[140px]"
        style={{ backgroundColor: "rgba(var(--accent-secondary),0.1)" }}
      />

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="relative w-full max-w-md space-y-6 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl"
        style={{
          backgroundColor: "rgba(var(--bg-secondary),0.75)",
          border: "1px solid rgb(var(--border-color))",
        }}
      >
        <h1
          className="text-center text-2xl font-bold"
          style={{ color: "rgb(var(--text-primary))" }}
        >
          Admin Login
        </h1>

        {error && (
          <p
            className="rounded-lg px-4 py-2 text-sm"
            style={{
              backgroundColor: "rgba(220,38,38,0.08)",
              color: "rgb(220 38 38)",
            }}
          >
            {error}
          </p>
        )}

        {/* Email */}
        <div className="space-y-2">
          <label
            className="text-sm"
            style={{ color: "rgb(var(--text-secondary))" }}
          >
            Email
          </label>

          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl px-4 py-3 outline-none transition-all duration-300"
            style={{
              backgroundColor: "rgba(var(--bg-secondary),0.9)",
              border: "1px solid rgb(var(--border-color))",
              color: "rgb(var(--text-primary))",
            }}
            onFocus={(e) =>
              (e.target.style.border =
                "1px solid rgb(var(--accent-primary))")
            }
            onBlur={(e) =>
              (e.target.style.border =
                "1px solid rgb(var(--border-color))")
            }
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label
            className="text-sm"
            style={{ color: "rgb(var(--text-secondary))" }}
          >
            Password
          </label>

          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl px-4 py-3 outline-none transition-all duration-300"
            style={{
              backgroundColor: "rgba(var(--bg-secondary),0.9)",
              border: "1px solid rgb(var(--border-color))",
              color: "rgb(var(--text-primary))",
            }}
            onFocus={(e) =>
              (e.target.style.border =
                "1px solid rgb(var(--accent-primary))")
            }
            onBlur={(e) =>
              (e.target.style.border =
                "1px solid rgb(var(--border-color))")
            }
          />
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full rounded-xl py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
          style={{
            background:
              "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p
          className="text-center text-xs"
          style={{ color: "rgb(var(--text-secondary))" }}
        >
          Authorized access only
        </p>
      </motion.form>
    </section>
  );
};

export default Login;