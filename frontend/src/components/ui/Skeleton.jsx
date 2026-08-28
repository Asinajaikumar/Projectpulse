import React from 'react';

export const Skeleton = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-navy-800/80 rounded-xl ${className}`} />
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Top Stats KPI Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-panel p-5 rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-8 h-8 rounded-lg" />
            </div>
            <Skeleton className="w-16 h-8" />
            <Skeleton className="w-32 h-3" />
          </div>
        ))}
      </div>

      {/* Main Charts & Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl space-y-4">
          <Skeleton className="w-48 h-6" />
          <Skeleton className="w-full h-64 rounded-xl" />
        </div>
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <Skeleton className="w-36 h-6" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-3 items-center">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="w-3/4 h-4" />
                <Skeleton className="w-1/2 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ProjectCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex justify-between items-start">
            <Skeleton className="w-36 h-6" />
            <Skeleton className="w-20 h-6 rounded-full" />
          </div>
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-3 rounded-full" />
          <div className="flex justify-between items-center pt-2">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-24 h-8 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
