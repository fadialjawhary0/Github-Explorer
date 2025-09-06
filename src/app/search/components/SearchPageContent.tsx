'use client';

import React, { useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { searchStore } from '@/store';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useSearchURLSync } from '@/hooks/useSearchURLSync';

import WelcomeState from '@/components/ui/WelcomeState';
import SearchResultsHeader from './SearchResultsHeader';
import SearchResultsGrid from './SearchResultsGrid';

const SearchPageContent = observer(() => {
  useSearchURLSync();

  const loadingRef = useInfiniteScroll({
    onLoadMore: searchStore.loadMore,
    hasMore: searchStore?.hasMore,
    loading: searchStore?.loadingMore,
  });

  useEffect(() => {
    const dispose = reaction(
      () => ({
        query: searchStore.query,
        type: searchStore.type,
        exactSearch: searchStore.exactSearch,
        filters: searchStore.filters,
      }),
      () => {
        searchStore.search();
      },
      { fireImmediately: true }
    );

    return dispose;
  }, []);

  const shouldShowWelcome = !searchStore.hasSearched && !searchStore.query;

  const handleRetry = () => searchStore.search();

  return (
    <div className="bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {shouldShowWelcome && <WelcomeState />}

        <SearchResultsHeader store={searchStore} totalCount={searchStore?.totalCount} />

        <SearchResultsGrid store={searchStore} onRetry={handleRetry} />

        <div ref={loadingRef} className="h-12" />
      </main>
    </div>
  );
});

export default SearchPageContent;
