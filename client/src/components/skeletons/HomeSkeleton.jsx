import Skeleton from "../common/Skeleton";

/**
 * Premium Home Page Skeleton
 * Matches actual Home layout
 */
const HomeSkeleton = () => {
  return (
    <section className="relative overflow-hidden">

      {/* Background Glow (same as Home page) */}
      <div
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-[140px] animate-pulse"
        style={{
          backgroundColor: "rgba(var(--accent-primary),0.08)",
        }}
      />
      <div
        className="absolute top-1/3 -right-40 h-96 w-96 rounded-full blur-[140px] animate-pulse"
        style={{
          backgroundColor: "rgba(var(--accent-secondary),0.08)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 py-20 md:py-32 grid gap-16 md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="space-y-8">
          <Skeleton className="h-12 w-3/4 rounded-xl" />
          <Skeleton className="h-6 w-1/2 rounded-xl" />
          <Skeleton className="h-24 w-full max-w-xl rounded-xl" />

          <div className="flex flex-wrap gap-4 pt-4">
            <Skeleton className="h-12 w-40 rounded-xl" />
            <Skeleton className="h-12 w-40 rounded-xl" />
          </div>
        </div>

        {/* RIGHT CARD */}
        <div
          className="rounded-3xl p-10 space-y-6 backdrop-blur-2xl"
          style={{
            backgroundColor: "rgba(var(--bg-secondary),0.7)",
            border: "1px solid rgb(var(--border-color))",
          }}
        >
          <Skeleton className="h-3 w-20 rounded-full" />
          <Skeleton className="h-8 w-48 rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />

          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-20 rounded-full" />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeSkeleton;