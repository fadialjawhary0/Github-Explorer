export interface RepositoryFilters {
  sort: 'stars' | 'forks';
  order: 'asc' | 'desc';
  language: string;
}

export const DEFAULT_FILTERS: RepositoryFilters = {
  sort: 'stars',
  order: 'desc',
  language: '',
};

export const SORT_OPTIONS = [
  { value: 'stars', label: 'Stars' },
  { value: 'forks', label: 'Forks' },
] as const;

export const ORDER_OPTIONS = [
  { value: 'desc', label: 'Descending' },
  { value: 'asc', label: 'Ascending' },
] as const;

export const POPULAR_LANGUAGES = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'Go',
  'Rust',
  'C++',
  'C#',
  'PHP',
  'Ruby',
  'Swift',
  'Kotlin',
  'Dart',
  'Scala',
  'R',
  'Shell',
  'PowerShell',
  'HTML',
  'CSS',
  'Vue',
  'React',
  'Angular',
  'Svelte',
] as const;
