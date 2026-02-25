/**
 * Full About Page Skeleton
 * Fully Theme-Based
 */
const AboutSkeleton = () => {
  return (
    <section
      className="relative overflow-hidden animate-pulse transition-colors duration-500"
      style={{
        backgroundColor: "rgb(var(--bg-primary))",
      }}
    >
      {/* Background Glow */}
      <div
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-[140px]"
        style={{
          backgroundColor: "rgba(var(--accent-primary),0.08)",
        }}
      />
      <div
        className="absolute top-1/3 -right-40 h-96 w-96 rounded-full blur-[140px]"
        style={{
          backgroundColor: "rgba(var(--accent-secondary),0.08)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10 py-20 md:py-28 space-y-24">

        {/* ================= ABOUT INTRO ================= */}
        <div
          className="rounded-3xl p-10 backdrop-blur-2xl shadow-xl space-y-6"
          style={{
            backgroundColor: "rgba(var(--bg-secondary),0.7)",
            border: "1px solid rgb(var(--border-color))",
          }}
        >
          <div
            className="h-10 w-56 rounded-lg"
            style={{ backgroundColor: "rgba(var(--bg-primary),0.7)" }}
          />

          <div className="space-y-3">
            {[100, 92, 85].map((w, i) => (
              <div
                key={i}
                className="h-4 rounded-lg"
                style={{
                  width: `${w}%`,
                  backgroundColor: "rgba(var(--bg-primary),0.7)",
                }}
              />
            ))}
          </div>
        </div>

        {/* ================= SKILLS ================= */}
        <div className="space-y-10">
          <div>
            <div
              className="h-8 w-64 rounded-lg"
              style={{ backgroundColor: "rgba(var(--bg-secondary),0.8)" }}
            />
            <div
              className="mt-3 h-4 w-80 rounded-lg"
              style={{ backgroundColor: "rgba(var(--bg-secondary),0.8)" }}
            />
          </div>

          {/* Skills Grid Skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-16 rounded-xl"
                style={{
                  backgroundColor: "rgba(var(--bg-secondary),0.8)",
                  border: "1px solid rgb(var(--border-color))",
                }}
              />
            ))}
          </div>
        </div>

        {/* ================= EXPERIENCE ================= */}
        <div className="space-y-10">
          <div>
            <div
              className="h-8 w-72 rounded-lg"
              style={{ backgroundColor: "rgba(var(--bg-secondary),0.8)" }}
            />
            <div
              className="mt-3 h-4 w-80 rounded-lg"
              style={{ backgroundColor: "rgba(var(--bg-secondary),0.8)" }}
            />
          </div>

          {/* Timeline Skeleton */}
          <div
            className="rounded-3xl p-10 backdrop-blur-2xl shadow-xl space-y-8"
            style={{
              backgroundColor: "rgba(var(--bg-secondary),0.7)",
              border: "1px solid rgb(var(--border-color))",
            }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div
                  className="h-5 w-48 rounded-lg"
                  style={{
                    backgroundColor: "rgba(var(--bg-primary),0.7)",
                  }}
                />
                <div
                  className="h-4 w-full rounded-lg"
                  style={{
                    backgroundColor: "rgba(var(--bg-primary),0.7)",
                  }}
                />
                <div
                  className="h-4 w-10/12 rounded-lg"
                  style={{
                    backgroundColor: "rgba(var(--bg-primary),0.7)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ================= RESUME BUTTON ================= */}
        <div className="flex justify-center">
          <div
            className="h-14 w-56 rounded-xl"
            style={{
              background:
                "linear-gradient(to right, rgba(var(--accent-primary),0.4), rgba(var(--accent-secondary),0.4))",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSkeleton;