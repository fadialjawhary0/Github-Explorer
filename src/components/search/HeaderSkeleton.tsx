import { Skeleton } from '../ui';

const HeaderSkeleton: React.FC = () => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold text-foreground mb-4">Search Results</h1>
    <Skeleton className="h-4 w-64" backgroundColor="bg-gray-500" />
  </div>
);

export default HeaderSkeleton;
