/**
 * Advanced Theme-Based App Loader
 * Fully controlled by CSS variables
 */
const AppLoader = () => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center transition-colors duration-500"
      style={{
        backgroundColor: "rgb(var(--bg-primary))",
      }}
    >
      <div className="relative flex items-center justify-center">

        {/* Outer rotating ring */}
        <div
          className="absolute h-32 w-32 rounded-full border-4 animate-spin"
          style={{
            borderColor: "rgb(var(--border-color))",
            borderTopColor: "rgb(var(--accent-primary))",
          }}
        />

        {/* Middle pulse ring */}
        <div
          className="absolute h-24 w-24 rounded-full border-2 animate-ping"
          style={{
            borderColor: "rgba(var(--accent-primary),0.4)",
          }}
        />

        {/* Core Gradient Circle */}
        <div
          className="h-14 w-14 rounded-full animate-pulse shadow-xl"
          style={{
            background:
              "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
            boxShadow:
              "0 0 40px rgba(var(--accent-primary),0.4)",
          }}
        />

        {/* Orbiting Dots */}
        <div className="absolute h-40 w-40 animate-spin-slow">
          <span
            className="absolute top-0 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full"
            style={{
              backgroundColor: "rgb(var(--accent-primary))",
            }}
          />
          <span
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full"
            style={{
              backgroundColor: "rgb(var(--accent-secondary))",
            }}
          />
        </div>
      </div>

      {/* Loading Text */}
      <p
        className="absolute bottom-24 text-sm tracking-wide animate-pulse"
        style={{
          color: "rgb(var(--text-secondary))",
        }}
      >
        Initializing system…
      </p>
    </div>
  );
};

export default AppLoader;