import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import AppLoader from "./components/common/AppLoader";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loader only on first load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // adjust duration if needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <AppLoader />;
  }

  return <RouterProvider router={router} />;
};

export default App;
