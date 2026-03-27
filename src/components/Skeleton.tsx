"use client";

interface SkeletonProps {
  className?: string;
  count?: number;
}

export function SkeletonCard({ className = "" }: SkeletonProps) {
  return (
    <div className={`skeleton-shimmer border border-border-custom/20 ${className}`} />
  );
}

export function SkeletonFilmGrid({ count = 6 }: SkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          <SkeletonCard className="h-48 w-full" />
          <SkeletonCard className="h-4 w-3/4" />
          <SkeletonCard className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonToolGrid({ count = 6 }: SkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-6 border border-border-custom/20">
          <SkeletonCard className="h-8 w-8 mb-4" />
          <SkeletonCard className="h-5 w-2/3 mb-2" />
          <SkeletonCard className="h-3 w-full mb-1" />
          <SkeletonCard className="h-3 w-4/5" />
        </div>
      ))}
    </div>
  );
}
