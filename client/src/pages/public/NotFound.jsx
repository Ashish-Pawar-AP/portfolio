import { Link } from "react-router-dom";
import useSEO from "../../hooks/useSEO";

const NotFound = () => {
  useSEO({
    title: "404",
    description: "Page not found",
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center">
      <h1 className="text-7xl font-bold text-white">404</h1>
      <p className="mt-4 text-slate-400">
        The page you’re looking for doesn’t exist.
      </p>

      <Link
        to="/"
        className="
          mt-6 rounded-xl px-6 py-3
          bg-linear-to-r from-blue-600 to-purple-600
          text-white font-medium
        "
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
