import Skeleton from "../common/Skeleton";

const HomeSkeleton = () => {
  return (
    <div className="mx-auto max-w-6xl px-8 py-24 space-y-8">
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-24 w-full max-w-xl" />

      <div className="flex gap-4">
        <Skeleton className="h-12 w-40" />
        <Skeleton className="h-12 w-40" />
      </div>
    </div>
  );
};

export default HomeSkeleton;
