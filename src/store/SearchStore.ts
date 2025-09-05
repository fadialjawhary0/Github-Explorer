import { makeAutoObservable, runInAction } from 'mobx';
import { GitHubRepository, GitHubUser, SearchParams } from '@/types/github/index';
import { githubService } from '@/services/githubService';
import { DEFAULT_PER_PAGE, SEARCH_TYPES } from '@/constants';
import { CacheManager } from '@/utils';

export class SearchStore {
  query = '';
  type: typeof SEARCH_TYPES.REPOSITORIES | typeof SEARCH_TYPES.USERS = SEARCH_TYPES.REPOSITORIES;
  results: (GitHubRepository | GitHubUser)[] = [];
  loading = false;
  loadingMore = false;
  error: string | null = null;
  page = 1;
  hasMore = true;
  totalCount = 0;
  hasSearched = false;
  exactSearch = false;

  constructor() {
    makeAutoObservable(this);
  }

  setQuery = (query: string) => {
    this.query = query;
  };

  setType = (type: typeof SEARCH_TYPES.REPOSITORIES | typeof SEARCH_TYPES.USERS) => {
    this.type = type;
    this.resetSearch();
  };

  setExactSearch = (exactSearch: boolean) => {
    this.exactSearch = exactSearch;
  };

  resetSearch = () => {
    this.results = [];
    this.page = 1;
    this.hasMore = true;
    this.error = null;
    this.totalCount = 0;
    this.hasSearched = false;
  };

  setLoading = (loading: boolean, isLoadMore = false) => {
    if (isLoadMore) {
      this.loadingMore = loading;
    } else {
      this.loading = loading;
    }
  };

  setError = (error: string | null) => {
    this.error = error;
  };

  getRepositoryExtensions = async (owner: string, repo: string): Promise<string[]> => {
    const cached = CacheManager.getRepositoryExtensions(owner, repo);
    if (cached) return cached;

    try {
      const extensions = await githubService.getRepositoryFileExtensions(owner, repo);

      CacheManager.setRepositoryExtensions(owner, repo, extensions);

      return extensions;
    } catch (error) {
      console.warn(`Failed to fetch extensions for ${owner}/${repo}:`, error);
      return [];
    }
  };

  getRepositoryFullExtensions = async (owner: string, repo: string): Promise<string[]> => {
    const cached = CacheManager.getRepositoryFullExtensions(owner, repo);
    if (cached) return cached;

    try {
      const extensions = await githubService.getRepositoryFullFileExtensions(owner, repo);
      CacheManager.setRepositoryFullExtensions(owner, repo, extensions);
      return extensions;
    } catch (error) {
      console.warn(`Failed to fetch full extensions for ${owner}/${repo}:`, error);
      return [];
    }
  };

  search = async (isNewSearch: boolean = true) => {
    if (!this.query.trim()) {
      this.resetSearch();
      return;
    }

    if (isNewSearch) {
      this.page = 1;
      this.resetSearch();
    }

    this.hasSearched = true;
    this.setLoading(true, !isNewSearch);
    this.setError(null);

    try {
      if (isNewSearch && this.page === 1) {
        const cacheKey = `${this.query.trim()}-${this.type}-${this.exactSearch}`;
        const cached = CacheManager.getSearchResults(cacheKey, this.type);
        if (cached) {
          runInAction(() => {
            this.results = cached.results.slice(0, DEFAULT_PER_PAGE);
            this.totalCount = cached.totalCount;
            this.hasMore = this.results.length < cached.totalCount;
            this.setLoading(false, false);
          });
          return;
        }
      }

      const params: SearchParams = {
        query: this.query.trim(),
        type: this.type,
        page: this.page,
        per_page: DEFAULT_PER_PAGE,
        exactSearch: this.exactSearch,
      };

      const response = await githubService.search(params);

      runInAction(() => {
        if (isNewSearch) {
          this.results = response.items;

          if (this.page === 1) {
            const cacheKey = `${this.query.trim()}-${this.type}-${this.exactSearch}`;
            CacheManager.setSearchResults(cacheKey, this.type, response.items, response.total_count);
          }
        } else {
          this.results.push(...response.items);

          const cacheKey = `${this.query.trim()}-${this.type}-${this.exactSearch}`;
          const originalCached = CacheManager.getSearchResults(cacheKey, this.type);
          const firstPageResults = originalCached ? originalCached.results : this.results.slice(0, DEFAULT_PER_PAGE);

          CacheManager.setSearchResults(cacheKey, this.type, firstPageResults, response.total_count);
        }

        this.totalCount = response.total_count;
        this.hasMore = this.results.length < response.total_count;
      });
    } catch (error) {
      runInAction(() => {
        this.setError(error instanceof Error ? error.message : 'An error occurred');
        this.hasMore = false;
      });
    } finally {
      runInAction(() => {
        this.setLoading(false, !isNewSearch);
      });
    }
  };

  loadMore = async () => {
    if (this.loading || this.loadingMore || !this.hasMore || !this.hasSearched) return;

    this.page += 1;
    await this.search(false);
  };

  get isEmpty() {
    return this.hasSearched && !this.loading && this.results.length === 0 && !this.error;
  }

  get repositories() {
    return this.results.filter((item): item is GitHubRepository => this.type === SEARCH_TYPES.REPOSITORIES && 'full_name' in item);
  }

  get users() {
    return this.results.filter((item): item is GitHubUser => this.type === SEARCH_TYPES.USERS && 'login' in item);
  }

  get canLoadMore() {
    return this.hasMore && !this.loading && this.results.length > 0;
  }
}

export const searchStore = new SearchStore();
export default searchStore;
