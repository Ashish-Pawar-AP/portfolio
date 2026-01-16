import { useEffect } from "react";

/**
 * React 19 compatible SEO hook
 * No external dependency
 */
const useSEO = ({ title, description }) => {
  useEffect(() => {
    // Title
    if (title) {
      document.title = `${title} | Ashish Pawar`;
    }

    // Description
    if (description) {
      let meta = document.querySelector("meta[name='description']");

      if (meta) meta.setAttribute("content", description);

      meta.content = description;
    }
  }, [title, description]);
};

export default useSEO;
