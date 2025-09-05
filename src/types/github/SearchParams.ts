import { SEARCH_TYPES } from '@/constants';
import { RepositoryFilters } from '@/types/filters';

export interface SearchParams {
  query: string;
  type: typeof SEARCH_TYPES.REPOSITORIES | typeof SEARCH_TYPES.USERS;
  page: number;
  per_page: number;
  exactSearch?: boolean;
  filters?: RepositoryFilters;
}
