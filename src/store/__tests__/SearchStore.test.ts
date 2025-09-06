import { SearchStore } from '../SearchStore';
import { SEARCH_TYPES } from '@/constants';
import { RepositoryFilters } from '@/types/filters';

jest.mock('@/services/githubService', () => ({
  githubService: {
    searchRepositories: jest.fn(),
    searchUsers: jest.fn(),
    getRepositoryFileExtensions: jest.fn(),
    getRepositoryFullFileExtensions: jest.fn(),
  },
}));

jest.mock('@/utils/cacheUtils', () => ({
  CacheManager: {
    getSearchResults: jest.fn(),
    setSearchResults: jest.fn(),
    getRepositoryExtensions: jest.fn(),
    setRepositoryExtensions: jest.fn(),
    getRepositoryFullExtensions: jest.fn(),
    setRepositoryFullExtensions: jest.fn(),
  },
}));

describe('SearchStore', () => {
  let searchStore: SearchStore;

  beforeEach(() => {
    searchStore = new SearchStore();
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should have correct initial values', () => {
      expect(searchStore.query).toBe('');
      expect(searchStore.type).toBe(SEARCH_TYPES.REPOSITORIES);
      expect(searchStore.results).toEqual([]);
      expect(searchStore.loading).toBe(false);
      expect(searchStore.loadingMore).toBe(false);
      expect(searchStore.error).toBeNull();
      expect(searchStore.page).toBe(1);
      expect(searchStore.hasMore).toBe(true);
      expect(searchStore.totalCount).toBe(0);
      expect(searchStore.hasSearched).toBe(false);
      expect(searchStore.exactSearch).toBe(false);
    });
  });

  describe('setQuery', () => {
    it('should update query', () => {
      searchStore.setQuery('test query');
      expect(searchStore.query).toBe('test query');
    });
  });

  describe('setType', () => {
    it('should update type and reset search', () => {
      searchStore.setQuery('test');
      searchStore.setType(SEARCH_TYPES.USERS);

      expect(searchStore.type).toBe(SEARCH_TYPES.USERS);
      expect(searchStore.results).toEqual([]);
      expect(searchStore.page).toBe(1);
      expect(searchStore.hasMore).toBe(true);
    });
  });

  describe('setExactSearch', () => {
    it('should update exactSearch flag', () => {
      searchStore.setExactSearch(true);
      expect(searchStore.exactSearch).toBe(true);
    });
  });

  describe('setFilters', () => {
    it('should update filters and reset search', () => {
      const newFilters: RepositoryFilters = {
        sort: 'forks',
        order: 'asc',
        language: 'TypeScript',
      };

      searchStore.setQuery('test');
      searchStore.setFilters(newFilters);

      expect(searchStore.filters).toEqual(newFilters);
      expect(searchStore.results).toEqual([]);
      expect(searchStore.page).toBe(1);
    });
  });

  describe('resetSearch', () => {
    it('should reset all search-related state', () => {
      searchStore.setQuery('test');
      searchStore.results = [{ id: 1 } as any];
      searchStore.page = 2;
      searchStore.hasMore = false;
      searchStore.error = 'Some error';
      searchStore.totalCount = 100;
      searchStore.hasSearched = true;

      searchStore.resetSearch();

      expect(searchStore.results).toEqual([]);
      expect(searchStore.page).toBe(1);
      expect(searchStore.hasMore).toBe(true);
      expect(searchStore.error).toBeNull();
      expect(searchStore.totalCount).toBe(0);
      expect(searchStore.hasSearched).toBe(false);
    });
  });

  describe('setLoading', () => {
    it('should set loading state for new search', () => {
      searchStore.setLoading(true, false);
      expect(searchStore.loading).toBe(true);
      expect(searchStore.loadingMore).toBe(false);
    });

    it('should set loadingMore state for pagination', () => {
      searchStore.setLoading(true, true);
      expect(searchStore.loading).toBe(false);
      expect(searchStore.loadingMore).toBe(true);
    });
  });

  describe('setError', () => {
    it('should set error message', () => {
      searchStore.setError('Test error');
      expect(searchStore.error).toBe('Test error');
    });

    it('should clear error when set to null', () => {
      searchStore.setError('Test error');
      searchStore.setError(null);
      expect(searchStore.error).toBeNull();
    });
  });

  describe('Computed Properties', () => {
    it('should return true for isEmpty when hasSearched is true and no results', () => {
      searchStore.hasSearched = true;
      searchStore.results = [];
      searchStore.loading = false;
      searchStore.error = null;

      expect(searchStore.isEmpty).toBe(true);
    });

    it('should return false for isEmpty when loading', () => {
      searchStore.hasSearched = true;
      searchStore.results = [];
      searchStore.loading = true;

      expect(searchStore.isEmpty).toBe(false);
    });

    it('should return false for isEmpty when there are results', () => {
      searchStore.hasSearched = true;
      searchStore.results = [{ id: 1 } as any];

      expect(searchStore.isEmpty).toBe(false);
    });

    it('should filter repositories correctly', () => {
      searchStore.type = SEARCH_TYPES.REPOSITORIES;
      searchStore.results = [{ id: 1, full_name: 'repo1' } as any, { id: 2, login: 'user1' } as any];

      expect(searchStore.repositories).toHaveLength(1);
      expect(searchStore.repositories[0]).toEqual({ id: 1, full_name: 'repo1' });
    });

    it('should filter users correctly', () => {
      searchStore.type = SEARCH_TYPES.USERS;
      searchStore.results = [{ id: 1, full_name: 'repo1' } as any, { id: 2, login: 'user1' } as any];

      expect(searchStore.users).toHaveLength(1);
      expect(searchStore.users[0]).toEqual({ id: 2, login: 'user1' });
    });

    it('should return true for canLoadMore when conditions are met', () => {
      searchStore.hasMore = true;
      searchStore.loading = false;
      searchStore.results = [{ id: 1 } as any];

      expect(searchStore.canLoadMore).toBe(true);
    });

    it('should return false for canLoadMore when loading', () => {
      searchStore.hasMore = true;
      searchStore.loading = true;
      searchStore.results = [{ id: 1 } as any];

      expect(searchStore.canLoadMore).toBe(false);
    });
  });

  describe('search method', () => {
    it('should reset search when query is empty', async () => {
      searchStore.setQuery('');
      await searchStore.search();

      expect(searchStore.results).toEqual([]);
      expect(searchStore.hasSearched).toBe(false);
    });

    it('should set hasSearched to true when searching', async () => {
      searchStore.setQuery('test');
      const mockSearch = jest.fn().mockResolvedValue({ items: [], total_count: 0 });
      require('@/services/githubService').githubService.searchRepositories = mockSearch;

      await searchStore.search();

      expect(searchStore.hasSearched).toBe(true);
    });
  });

  describe('loadMore method', () => {
    it('should not load more when already loading', async () => {
      searchStore.loading = true;
      searchStore.hasMore = true;
      searchStore.hasSearched = true;

      await searchStore.loadMore();

      expect(searchStore.page).toBe(1);
    });

    it('should not load more when no more results', async () => {
      searchStore.loading = false;
      searchStore.hasMore = false;
      searchStore.hasSearched = true;

      await searchStore.loadMore();

      expect(searchStore.page).toBe(1);
    });

    it('should increment page and call search when conditions are met', async () => {
      searchStore.loading = false;
      searchStore.hasMore = true;
      searchStore.hasSearched = true;
      searchStore.page = 1;
      searchStore.query = 'test';

      const mockSearch = jest.fn().mockResolvedValue(undefined);
      const originalSearch = searchStore.search;
      searchStore.search = mockSearch;

      await searchStore.loadMore();

      expect(searchStore.page).toBe(2);
      expect(mockSearch).toHaveBeenCalledWith(false);

      searchStore.search = originalSearch;
    });
  });
});
