import { Skeleton } from '../../../components/ui';

const HeaderSkeleton: React.FC = () => (
  <div className="mb-6 flex flex-col gap-4">
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-4">Search Results</h1>
      <Skeleton className="h-4 w-64" backgroundColor="bg-gray-500" />
    </div>
    <div className="flex flex-col md:flex-row gap-3 sm:gap-4 flex-1">
      <div className="flex flex-col md:flex-row md:items-center gap-2 min-w-0">
        <Skeleton className="h-4 w-16" backgroundColor="bg-gray-500" />
        <Skeleton className="h-10 w-full md:w-40" backgroundColor="bg-gray-500" />
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-2 min-w-0">
        <Skeleton className="h-4 w-12" backgroundColor="bg-gray-500" />
        <Skeleton className="h-10 w-full md:w-40" backgroundColor="bg-gray-500" />
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-2 min-w-0">
        <Skeleton className="h-4 w-16" backgroundColor="bg-gray-500" />
        <Skeleton className="h-10 w-full md:w-40" backgroundColor="bg-gray-500" />
      </div>
    </div>
  </div>
);

export default HeaderSkeleton;
