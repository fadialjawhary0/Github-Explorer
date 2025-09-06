import { SearchStore } from '@/store';
import { SEARCH_TYPES } from '@/constants';

import HeaderSkeleton from '../skeletons/HeaderSkeleton';
import RepositoryFiltersComponent from '@/app/search/components/RepositoryFilters';

interface SearchResultsHeaderProps {
  store: typeof SearchStore;
  totalCount: number;
}

const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({ store, totalCount }) => {
  if (store?.loading) return <HeaderSkeleton />;
  if (!store?.hasSearched || !store?.query) return null;

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-foreground mb-2">Search Results</h1>
      <p className="text-muted-foreground mb-4">
        {!!totalCount ? `Found ${totalCount?.toLocaleString()} ${store?.type} for "${store?.query}"` : `No ${store?.type} found for "${store?.query}"`}
      </p>

      {store?.type === SEARCH_TYPES?.REPOSITORIES && <RepositoryFiltersComponent filters={store.filters} onFiltersChange={store.setFilters} />}
    </div>
  );
};

export default SearchResultsHeader;
