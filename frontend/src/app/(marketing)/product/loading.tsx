import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <section className="container mx-auto px-4 md:px-8 mt-10 mb-20">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-3 mb-10">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      {/* Grid Product Cards Skeleton (8 Items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="flex flex-col gap-4 border border-border/50 p-4 rounded-xl">
            {/* Image Placeholder */}
            <Skeleton className="w-full h-48 rounded-lg" />
            {/* Title & Category */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            {/* Price & Button */}
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-9 w-24 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
