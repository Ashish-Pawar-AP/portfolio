/**
 * Advanced Tailwind-only App Loader
 * No custom CSS, no keyframes
 */
const AppLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
      <div className="relative flex items-center justify-center">

        {/* Outer rotating ring */}
        <div className="
          absolute
          h-32 w-32
          rounded-full
          border-4
          border-slate-700
          border-t-blue-500
          animate-spin
        " />

        {/* Middle pulsing ring */}
        <div className="
          absolute
          h-24 w-24
          rounded-full
          border-2
          border-blue-500/40
          animate-ping
        " />

        {/* Core */}
        <div className="
          h-12 w-12
          rounded-full
          bg-linear-to-r
          from-blue-500
          to-purple-600
          animate-pulse
        " />

        {/* Orbiting dots */}
        <div className="absolute h-40 w-40 animate-spin-slow">
          <span className="
            absolute top-0 left-1/2 -translate-x-1/2
            h-3 w-3 rounded-full bg-blue-400
          " />
          <span className="
            absolute bottom-0 left-1/2 -translate-x-1/2
            h-3 w-3 rounded-full bg-purple-400
          " />
        </div>
      </div>

      {/* Text */}
      <p className="
        absolute bottom-24
        text-sm text-slate-400
        tracking-wide
        animate-pulse
      ">
        Initializing system…
      </p>
    </div>
  );
};

export default AppLoader;
