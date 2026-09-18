import { Skeleton } from "@/components/ui/skeleton";

export const ProductSkeleton = () => {
  return (
    <section className="container mx-auto px-4 md:px-8 mt-10 mb-20">
      <div className="flex flex-col gap-3 mb-10 items-center">
        <Skeleton className="h-12 w-64 rounded-xl" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      {/* Filter Tabs Skeleton */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>

      {/* Grid Product Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 justify-items-center">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="flex flex-col gap-4 border border-border/40 p-5 rounded-3xl w-full max-w-[320px]">
            <Skeleton className="w-full aspect-square rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-1/3 mt-2" />
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-border/40 mt-auto">
              <Skeleton className="h-10 flex-1 rounded-xl" />
              <Skeleton className="h-10 w-10 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};