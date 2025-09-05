import React from 'react';
import Skeleton from './Skeleton';

const CardRepoSkeleton: React.FC = () => {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-6 w-32" backgroundColor="bg-gray-500" />
            <Skeleton className="h-4 w-4" backgroundColor="bg-gray-500" />
          </div>
          <Skeleton className="h-4 w-full mb-3" backgroundColor="bg-gray-500" />
          <Skeleton className="h-4 w-3/4" backgroundColor="bg-gray-500" />
        </div>
      </div>

      <div className="space-y-4">
        {/* Language tags skeleton */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <Skeleton className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <Skeleton className="h-6 w-14 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>

        {/* Stats and metadata skeleton */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" backgroundColor="bg-gray-500" />
            <Skeleton className="h-4 w-8" backgroundColor="bg-gray-500" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" backgroundColor="bg-gray-500" />
            <Skeleton className="h-4 w-8" backgroundColor="bg-gray-500" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" backgroundColor="bg-gray-500" />
            <Skeleton className="h-4 w-20" backgroundColor="bg-gray-500" />
          </div>
        </div>

        {/* Owner info skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" backgroundColor="bg-gray-500" />
            <Skeleton className="h-4 w-16" backgroundColor="bg-gray-500" />
          </div>
        </div>

        {/* Fork avatars skeleton */}
        <div className="flex -space-x-2">
          <Skeleton className="h-6 w-6 rounded-full" backgroundColor="bg-gray-500" />
          <Skeleton className="h-6 w-6 rounded-full" backgroundColor="bg-gray-500" />
          <Skeleton className="h-6 w-6 rounded-full" backgroundColor="bg-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default CardRepoSkeleton;
