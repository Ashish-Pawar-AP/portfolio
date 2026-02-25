import Skeleton from "../common/Skeleton";

/**
 * Premium Skills Section Skeleton
 * Matches actual SkillsSection layout
 */
const SkillsSkeleton = () => {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="rounded-3xl p-6 space-y-6 backdrop-blur-2xl"
          style={{
            backgroundColor: "rgba(var(--bg-secondary),0.7)",
            border: "1px solid rgb(var(--border-color))",
          }}
        >
          {/* Category Title */}
          <Skeleton className="h-4 w-1/3 rounded-lg" />

          {/* Skill Bars */}
          <div className="space-y-4">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="space-y-2">
                <Skeleton className="h-3 w-1/2 rounded-lg" />
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsSkeleton;