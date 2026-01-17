import { motion } from "framer-motion";

/**
 * Full About Page Skeleton
 */
const AboutSkeleton = () => {
  return (
    <section className="relative overflow-hidden animate-pulse">
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute top-1/3 -right-40 h-125 w-125 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-8 py-24 space-y-24">
        {/* ================= ABOUT INTRO ================= */}
        <div
          className="
            rounded-3xl
            border border-slate-200 dark:border-slate-800
            bg-white/70 dark:bg-slate-900/60
            backdrop-blur
            p-10
            shadow-xl
            space-y-6
          "
        >
          <div className="h-10 w-56 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-4 w-11/12 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-4 w-10/12 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>

        {/* ================= SKILLS ================= */}
        <div className="space-y-10">
          <div>
            <div className="h-8 w-64 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-3 h-4 w-96 rounded bg-slate-200 dark:bg-slate-700" />
          </div>

          {/* Skills Grid Skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="
                  h-16
                  rounded-xl
                  bg-slate-200 dark:bg-slate-800
                "
              />
            ))}
          </div>
        </div>

        {/* ================= EXPERIENCE ================= */}
        <div className="space-y-10">
          <div>
            <div className="h-8 w-72 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-3 h-4 w-80 rounded bg-slate-200 dark:bg-slate-700" />
          </div>

          {/* Timeline Skeleton */}
          <div
            className="
              rounded-3xl
              border border-slate-200 dark:border-slate-800
              bg-white/70 dark:bg-slate-900/60
              backdrop-blur
              p-10
              shadow-xl
              space-y-8
            "
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-5 w-48 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-10/12 rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            ))}
          </div>
        </div>

        {/* ================= RESUME BUTTON ================= */}
        <div className="flex justify-center">
          <div className="h-14 w-56 rounded-xl bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </section>
  );
};

export default AboutSkeleton;
