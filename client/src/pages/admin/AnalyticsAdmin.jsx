import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../../utils/axios";

/**
 * Admin Visitor Analytics Dashboard
 */
const AnalyticsAdmin = () => {
  const {
    data: analytics = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => (await api.get("/analytics")).data,
  });

  /* ================= DERIVED STATS ================= */
  const totalVisits = analytics.length;
  const mobileVisits = analytics.filter((a) => a.device === "Mobile").length;
  const desktopVisits = analytics.filter((a) => a.device === "Desktop").length;

  const pageStats = analytics.reduce((acc, curr) => {
    acc[curr.pageVisited] = (acc[curr.pageVisited] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(pageStats).map(([page, visits]) => ({
    page,
    visits,
  }));

  /* ================= UI ================= */
  return (
    <div className="space-y-10">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Visitor Analytics
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Page visits, devices & activity
          </p>
        </div>

        <span className="rounded-full bg-emerald-500/10 px-4 py-1 text-sm text-emerald-600 dark:text-emerald-400">
          {totalVisits} Total Visits
        </span>
      </motion.div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Total Visits", value: totalVisits },
          { label: "Mobile Visits", value: mobileVisits },
          { label: "Desktop Visits", value: desktopVisits },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 backdrop-blur shadow"
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <h3 className="mt-2 text-3xl font-bold">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* ================= CHART ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 backdrop-blur shadow"
      >
        <h3 className="mb-4 text-lg font-semibold">Page Visits Overview</h3>

        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="page" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visits" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-slate-500">No data to visualize.</p>
        )}
      </motion.div>

      {/* ================= TABLE ================= */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur shadow-xl"
      >
        {isLoading && (
          <div className="p-6 text-slate-400">Loading analytics...</div>
        )}

        {isError && (
          <div className="p-6 text-red-500">Failed to load analytics.</div>
        )}

        {!isLoading && analytics.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left font-medium">Page</th>
                  <th className="px-6 py-4 text-left font-medium">Device</th>
                  <th className="px-6 py-4 text-left font-medium">Time</th>
                </tr>
              </thead>

              <AnimatePresence>
                <tbody>
                  {analytics.map((a, index) => (
                    <motion.tr
                      key={a._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      <td className="px-6 py-4 font-medium">{a.pageVisited}</td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium
                            ${
                              a.device === "Mobile"
                                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                            }`}
                        >
                          {a.device}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                        {new Date(a.createdAt).toLocaleString()}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </AnimatePresence>
            </table>
          </div>
        )}

        {!isLoading && analytics.length === 0 && (
          <div className="p-10 text-center text-slate-500">
            No analytics data available yet.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AnalyticsAdmin;
