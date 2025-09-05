import React from 'react';
import Skeleton from './Skeleton';

const CardUserSkeleton: React.FC = () => {
  return (
    <div className="group rounded-lg border border-border bg-card p-6">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <Skeleton className="h-16 w-16 rounded-full" backgroundColor="bg-gray-500" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-6 w-24" backgroundColor="bg-gray-500" />
            <Skeleton className="h-4 w-4" backgroundColor="bg-gray-500" />
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Skeleton className="h-4 w-4" backgroundColor="bg-gray-500" />
            <Skeleton className="h-4 w-16" backgroundColor="bg-gray-500" />
          </div>

          <div className="mt-3">
            <Skeleton className="h-4 w-20" backgroundColor="bg-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardUserSkeleton;
