import { Skeleton } from "@/components/ui/skeleton";

export const AboutSkeleton = () => {
  return (
    <section className="container mx-auto px-4 md:px-8 mt-10 lg:mt-24 mb-24">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
        {/* --- SKELETON KIRI: TEKS & STATISTIK --- */}
        <div className="flex w-full lg:w-[55%] xl:w-[60%] flex-col justify-start gap-6 lg:pr-8">
          <Skeleton className="h-7 w-64 rounded-full" />

          <div className="space-y-3">
            <Skeleton className="h-10 sm:h-12 lg:h-14 w-full max-w-[500px]" />
            <Skeleton className="h-10 sm:h-12 lg:h-14 w-[85%]" />
          </div>

          <div className="space-y-2 mt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[80%]" />
          </div>

          <div className="bg-sidebar-primary-foreground/50 p-6 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-6 w-full border border-border/40 mt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
            ))}
          </div>
        </div>

        {/* --- SKELETON KANAN: GAMBAR & BADGE --- */}
        <div className="w-full lg:w-[45%] flex justify-center mt-12 lg:mt-0 relative">
          <div className="relative w-[90%] sm:w-[70%] lg:w-[420px] max-w-full">
            <Skeleton className="w-full h-[500px] rounded-md shadow-md" />

            <div className="absolute bottom-4 left-4 right-4 bg-background/80 p-4 rounded-sm flex items-center justify-between">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-5 w-16 rounded-sm" />
            </div>

            <div className="absolute -bottom-8 -left-4 md:-left-16 bg-background p-4 rounded shadow-lg flex items-center gap-3 w-72 md:w-[320px] border border-border">
              <Skeleton className="size-10 rounded-full shrink-0" />
              <div className="space-y-1.5 w-full">
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 w-full">
        <Skeleton className="h-14 w-full rounded-none" />
      </div>
    </section>
  );
};