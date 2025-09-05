import { Skeleton } from '../ui';

const HeaderSkeleton: React.FC = () => (
  <div className="mb-6 flex flex-col gap-4">
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-4">Search Results</h1>
      <Skeleton className="h-4 w-64" backgroundColor="bg-gray-500" />
    </div>
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-18" backgroundColor="bg-gray-500" />
        <Skeleton className="h-10 w-32" backgroundColor="bg-gray-500" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-24" backgroundColor="bg-gray-500" />
        <Skeleton className="h-10 w-32" backgroundColor="bg-gray-500" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-24" backgroundColor="bg-gray-500" />
        <Skeleton className="h-10 w-32" backgroundColor="bg-gray-500" />
      </div>
    </div>
  </div>
);

export default HeaderSkeleton;
