import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import useSEO from "../../hooks/useSEO";

/**
 * Admin Login Page
 */
const Login = () => {
  useSEO({
    title: "Admin Login",
    description: "Admin access to portfolio dashboard",
  });

  const navigate = useNavigate();

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
      const res = await api.post("/auth/login", form);

      // Save token
      localStorage.setItem("accessToken", res.data.accessToken);

      // Redirect to admin dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-md space-y-6
          rounded-2xl border border-slate-800
          bg-slate-900/80 backdrop-blur
          p-8 shadow-xl
        "
      >
        <h1 className="text-center text-2xl font-bold text-white">
          Admin Login
        </h1>

        {error && (
          <p className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">
            {error}
          </p>
        )}

        <div className="space-y-2">
          <label className="text-sm text-slate-400">Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="
              w-full rounded-lg border border-slate-700
              bg-slate-950 px-4 py-3
              text-white outline-none
              focus:border-blue-500
            "
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-400">Password</label>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            className="
              w-full rounded-lg border border-slate-700
              bg-slate-950 px-4 py-3
              text-white outline-none
              focus:border-blue-500
            "
          />
        </div>

        <button
          disabled={loading}
          className="
            w-full rounded-xl py-3
            bg-linear-to-r from-blue-600 to-purple-600
            font-medium text-white
            hover:opacity-90
            disabled:opacity-60
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-xs text-slate-500">
          Authorized access only
        </p>
      </form>
    </div>
  );
};

export default Login;
