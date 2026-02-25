/**
 * Reusable Theme-Based Skeleton
 * No hardcoded colors
 */
const Skeleton = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse rounded-lg ${className}`}
      style={{
        backgroundColor: "rgba(var(--bg-secondary),0.7)",
        border: "1px solid rgb(var(--border-color))",
      }}
    />
  );
};

export default Skeleton;