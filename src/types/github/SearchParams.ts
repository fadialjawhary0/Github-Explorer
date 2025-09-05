import { SEARCH_TYPES } from '@/constants';

export interface SearchParams {
  query: string;
  type: typeof SEARCH_TYPES.REPOSITORIES | typeof SEARCH_TYPES.USERS;
  page: number;
  per_page: number;
  exactSearch?: boolean;
}
