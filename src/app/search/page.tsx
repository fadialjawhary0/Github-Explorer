'use client';

import React, { useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { searchStore } from '@/store';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

import WelcomeState from '@/components/ui/WelcomeState';
import SearchResultsHeader from '@/components/search/SearchResultsHeader';
import SearchResultsGrid from '@/components/search/SearchResultsGrid';

const SearchPage = observer(() => {
  const loadingRef = useInfiniteScroll({
    onLoadMore: searchStore.loadMore,
    hasMore: searchStore?.hasMore,
    loading: searchStore?.loadingMore,
  });

  useEffect(() => {
    searchStore.search();
  }, [searchStore?.query, searchStore?.type, searchStore?.exactSearch]);

  const handleRetry = () => searchStore.search();

  return (
    <div className="bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!searchStore?.hasSearched && <WelcomeState />}

        <SearchResultsHeader store={searchStore} totalCount={searchStore?.totalCount} />

        <SearchResultsGrid store={searchStore} onRetry={handleRetry} />

        <div ref={loadingRef} className="h-4" />
      </main>
    </div>
  );
});

export default SearchPage;
