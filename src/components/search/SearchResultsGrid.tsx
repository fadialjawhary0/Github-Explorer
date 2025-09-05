import { observer } from 'mobx-react-lite';
import CardRepo from '@/components/shared/CardRepo';
import CardUser from '@/components/shared/CardUser';
import EmptyState from '@/components/ui/EmptyState';
import ErrorMessage from '@/components/ui/ErrorMessage';
import PaginationEnd from '@/components/shared/PaginationEnd';
import { SearchStore } from '@/store';
import { GitHubRepository } from '@/types/github/index';
import { GitHubUser } from '@/types/github/index';
import GridSkeleton from './GridSkeleton';
import { SEARCH_TYPES } from '@/constants';

interface SearchResultsGridProps {
  store: typeof SearchStore;
  onRetry: () => void;
}

const SearchResultsGrid = observer<SearchResultsGridProps>(({ store, onRetry }) => {
  if (store?.loading) return <GridSkeleton count={6} type={store?.type} />;

  if (store?.error) return <ErrorMessage message={store?.error || 'Failed to load data'} onRetry={onRetry} />;

  if (store?.isEmpty) return <EmptyState type={store?.type} />;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {store?.type === SEARCH_TYPES?.REPOSITORIES
          ? store?.repositories.map((repo: GitHubRepository) => <CardRepo key={repo?.id} repository={repo} />)
          : store?.users.map((user: GitHubUser) => <CardUser key={user.id} user={user} />)}
      </div>

      {store?.loadingMore && <GridSkeleton count={6} type={store?.type} />}

      <PaginationEnd hasMore={store?.hasMore} totalCount={store?.totalCount} currentCount={store?.results?.length} />
    </>
  );
});

export default SearchResultsGrid;
