import HeaderSkeleton from './HeaderSkeleton';
import { SearchStore } from '@/store';

interface SearchResultsHeaderProps {
  store: typeof SearchStore;
  totalCount: number;
}

const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({ store, totalCount }) => {
  if (store.loading) return <HeaderSkeleton />;

  return (
    !!store?.results?.length && (
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Search Results</h1>
        <p className="text-muted-foreground">
          Found {totalCount?.toLocaleString()} {store?.type} for &ldquo;{store?.query}&rdquo;
        </p>
      </div>
    )
  );
};

export default SearchResultsHeader;
