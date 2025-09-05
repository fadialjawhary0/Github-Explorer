import { GitHubRepository, GitHubUser } from '@/types/github';

const CACHE_DURATION = 1 * 60 * 60 * 1000;

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface SearchResultsCache {
  results: (GitHubRepository | GitHubUser)[];
  totalCount: number;
}

export class CacheManager {
  private static getCacheKey(type: string, identifier: string): string {
    return `github-explorer-${type}-${identifier}`;
  }

  private static isExpired(timestamp: number): boolean {
    return Date.now() - timestamp > CACHE_DURATION;
  }

  static set<T>(type: string, identifier: string, data: T): void {
    if (typeof window === 'undefined') return;

    try {
      const cacheItem: CacheItem<T> = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(this.getCacheKey(type, identifier), JSON.stringify(cacheItem));
    } catch (error) {
      console.warn('Failed to write to localStorage:', error);
    }
  }

  static get<T>(type: string, identifier: string): T | null {
    if (typeof window === 'undefined') return null;

    try {
      const cached = localStorage.getItem(this.getCacheKey(type, identifier));
      if (!cached) return null;

      const parsed: CacheItem<T> = JSON.parse(cached);

      if (this.isExpired(parsed.timestamp)) {
        this.delete(type, identifier);
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return null;
    }
  }

  static delete(type: string, identifier: string): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(this.getCacheKey(type, identifier));
    } catch (error) {
      console.warn('Failed to delete from localStorage:', error);
    }
  }

  static clear(type?: string): void {
    if (typeof window === 'undefined') return;

    try {
      const keys = Object.keys(localStorage);
      const prefix = type ? `github-explorer-${type}-` : 'github-explorer-';

      keys.forEach(key => {
        if (key.startsWith(prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }

  static setRepositoryExtensions(owner: string, repo: string, extensions: string[]): void {
    this.set('repo-extensions', `${owner}/${repo}`, extensions);
  }

  static getRepositoryExtensions(owner: string, repo: string): string[] | null {
    return this.get<string[]>('repo-extensions', `${owner}/${repo}`);
  }

  static setRepositoryFullExtensions(owner: string, repo: string, extensions: string[]): void {
    this.set('repo-full-extensions', `${owner}/${repo}`, extensions);
  }

  static getRepositoryFullExtensions(owner: string, repo: string): string[] | null {
    return this.get<string[]>('repo-full-extensions', `${owner}/${repo}`);
  }

  static setSearchResults(query: string, type: 'repositories' | 'users', results: (GitHubRepository | GitHubUser)[], totalCount: number): void {
    this.set('search-results', `${type}-${query}`, { results, totalCount });
  }

  static getSearchResults(query: string, type: 'repositories' | 'users'): SearchResultsCache | null {
    return this.get<SearchResultsCache>('search-results', `${type}-${query}`);
  }

  static setUserDetails(username: string, userDetails: GitHubUser): void {
    this.set('user-details', username, userDetails);
  }

  static getUserDetails(username: string): GitHubUser | null {
    return this.get<GitHubUser>('user-details', username);
  }

  static setRepositoryDetails(owner: string, repo: string, repoDetails: GitHubRepository): void {
    this.set('repo-details', `${owner}/${repo}`, repoDetails);
  }

  static getRepositoryDetails(owner: string, repo: string): GitHubRepository | null {
    return this.get<GitHubRepository>('repo-details', `${owner}/${repo}`);
  }
}

if (typeof window !== 'undefined') {
  const cleanupExpiredCache = () => {
    try {
      const keys = Object.keys(localStorage);
      const prefix = 'github-explorer-';

      keys.forEach(key => {
        if (key.startsWith(prefix)) {
          try {
            const cached = localStorage.getItem(key);
            if (cached) {
              const parsed = JSON.parse(cached);
              if (parsed.timestamp && Date.now() - parsed.timestamp > CACHE_DURATION) {
                localStorage.removeItem(key);
              }
            }
          } catch (error) {
            localStorage.removeItem(key);
          }
        }
      });
    } catch (error) {
      console.warn('Failed to cleanup expired cache:', error);
    }
  };

  cleanupExpiredCache();
}
