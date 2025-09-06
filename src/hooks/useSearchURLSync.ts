import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { encodeParams, decodeParams, updateQueryParams } from '@/utils/urlParams';
import { searchStore } from '@/store';
import { SEARCH_TYPES } from '@/constants';
import { RepositoryFilters } from '@/types/filters';

export const useSearchURLSync = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!searchParams) return;

    const encodedString = searchParams.get('encoded');
    if (encodedString) {
      const { query, type, sort, order, language } = decodeParams(encodedString);
      const filters = { sort, order, language };

      searchStore.setQuery(query);
      searchStore.setType(type as typeof SEARCH_TYPES.REPOSITORIES | typeof SEARCH_TYPES.USERS);
      searchStore.setFilters(filters as RepositoryFilters);

      if (query) searchStore.search();
    }
    isInitialized.current = true;
  }, []);

  useEffect(() => {
    if (isInitialized.current) {
      const { query, type, filters } = searchStore;

      const encodedParams = encodeParams({
        query,
        type,
        sort: filters.sort,
        order: filters.order,
        language: filters.language,
      });

      updateQueryParams(router, { encoded: encodedParams });
    }
  }, [searchStore.query, searchStore.type, searchStore.filters, searchStore.exactSearch, router]);
};
