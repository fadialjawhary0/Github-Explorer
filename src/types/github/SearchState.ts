import { GitHubRepository } from './Repository';
import { GitHubUser } from './User';
import { SEARCH_TYPES } from '@/constants';

export interface SearchState {
  query: string;
  type: typeof SEARCH_TYPES.REPOSITORIES | typeof SEARCH_TYPES.USERS;
  results: (GitHubRepository | GitHubUser)[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  totalCount: number;
}
