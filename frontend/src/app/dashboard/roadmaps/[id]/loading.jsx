export default function Loading() {
    const SkeletonCard = () => (
      <div className="bg-[#161b22] p-4 rounded-lg border border-neutral-800 flex items-center gap-4">
        <div className="w-6 h-6 rounded-full bg-neutral-700 animate-pulse" />
        <div className="flex-grow">
          <div className="w-3/4 h-4 bg-neutral-700 rounded animate-pulse" />
          <div className="w-1/2 h-3 bg-neutral-700 rounded animate-pulse mt-2" />
        </div>
      </div>
    );
  
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2">
          <div className="h-10 w-3/4 bg-neutral-700 rounded animate-pulse mb-8" />
          <div className="space-y-8">
            {[1, 2].map((i) => (
              <div key={i}>
                <div className="h-8 w-1/2 bg-neutral-700 rounded animate-pulse mb-4" />
                <div className="space-y-3">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Right Sidebar Skeleton */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#161b22] p-6 rounded-lg border border-neutral-800">
            <div className="h-6 w-3/5 bg-neutral-700 rounded animate-pulse mb-4" />
            <div className="w-48 h-48 mx-auto rounded-full bg-neutral-700 animate-pulse" />
            <div className="mt-6 space-y-3">
              <div className="h-4 w-full bg-neutral-700 rounded animate-pulse" />
              <div className="h-4 w-full bg-neutral-700 rounded animate-pulse" />
            </div>
          </div>
          <div className="bg-[#161b22] p-6 rounded-lg border border-neutral-800">
            <div className="h-6 w-4/5 bg-neutral-700 rounded animate-pulse mb-4" />
            <div className="space-y-4">
              <div className="h-10 w-full bg-neutral-700 rounded animate-pulse" />
              <div className="h-10 w-full bg-neutral-700 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  } 