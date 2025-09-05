import CardRepoSkeleton from '@/components/ui/CardRepoSkeleton';
import CardUserSkeleton from '@/components/ui/CardUserSkeleton';
import { SEARCH_TYPES } from '@/constants';

interface GridSkeletonProps {
  count: number;
  type: typeof SEARCH_TYPES.REPOSITORIES | typeof SEARCH_TYPES.USERS;
}

const GridSkeleton: React.FC<GridSkeletonProps> = ({ count, type }) => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
    {Array.from({ length: count }).map((_, index) =>
      type === SEARCH_TYPES.REPOSITORIES ? <CardRepoSkeleton key={index} /> : <CardUserSkeleton key={index} />
    )}
  </div>
);

export default GridSkeleton;
