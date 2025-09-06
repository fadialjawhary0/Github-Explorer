import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchResultsHeader from '../SearchResultsHeader';
import { SEARCH_TYPES } from '@/constants';

jest.mock('../../skeletons/HeaderSkeleton', () => {
  return function HeaderSkeleton() {
    return <div data-testid="header-skeleton">Loading...</div>;
  };
});

jest.mock('../RepositoryFilters', () => {
  return function RepositoryFiltersComponent({ filters, onFiltersChange }: any) {
    return <div data-testid="repository-filters">Filters: {JSON.stringify(filters)}</div>;
  };
});

describe('SearchResultsHeader', () => {
  const mockStore = {
    loading: false,
    results: [],
    type: SEARCH_TYPES.REPOSITORIES,
    query: 'test query',
    filters: {
      sort: 'stars',
      order: 'desc',
      language: 'JavaScript',
    },
  };

  it('should render loading skeleton when loading', () => {
    const loadingStore = { ...mockStore, loading: true };

    render(<SearchResultsHeader store={loadingStore as any} totalCount={0} />);

    expect(screen.getByTestId('header-skeleton')).toBeInTheDocument();
  });

  it('should not render when user has not searched', () => {
    const notSearchedStore = { ...mockStore, hasSearched: false, query: '' };

    const { container } = render(<SearchResultsHeader store={notSearchedStore as any} totalCount={0} />);

    expect(container.firstChild).toBeNull();
  });

  it('should not render when query is empty', () => {
    const emptyQueryStore = { ...mockStore, hasSearched: true, query: '' };

    const { container } = render(<SearchResultsHeader store={emptyQueryStore as any} totalCount={0} />);

    expect(container.firstChild).toBeNull();
  });

  it('should render search results header with results', () => {
    const storeWithResults = { ...mockStore, hasSearched: true, query: 'react' };

    render(<SearchResultsHeader store={storeWithResults as any} totalCount={150} />);

    expect(screen.getByText('Search Results')).toBeInTheDocument();
    expect(screen.getByText('Found 150 repositories for "react"')).toBeInTheDocument();
  });

  it('should render no results message when totalCount is 0', () => {
    const storeWithNoResults = { ...mockStore, hasSearched: true, query: 'nonexistent' };

    render(<SearchResultsHeader store={storeWithNoResults as any} totalCount={0} />);

    expect(screen.getByText('Search Results')).toBeInTheDocument();
    expect(screen.getByText('No repositories found for "nonexistent"')).toBeInTheDocument();
  });

  it('should render repository filters for repositories', () => {
    const storeWithResults = { ...mockStore, hasSearched: true, query: 'react', type: SEARCH_TYPES.REPOSITORIES };

    render(<SearchResultsHeader store={storeWithResults as any} totalCount={10} />);

    expect(screen.getByTestId('repository-filters')).toBeInTheDocument();
  });

  it('should not render repository filters for users', () => {
    const storeWithResults = { ...mockStore, hasSearched: true, query: 'john', type: SEARCH_TYPES.USERS };

    render(<SearchResultsHeader store={storeWithResults as any} totalCount={5} />);

    expect(screen.queryByTestId('repository-filters')).not.toBeInTheDocument();
    expect(screen.getByText('Found 5 users for "john"')).toBeInTheDocument();
  });

  it('should format large numbers with commas', () => {
    const storeWithResults = { ...mockStore, hasSearched: true, query: 'javascript' };

    render(<SearchResultsHeader store={storeWithResults as any} totalCount={1234567} />);

    expect(screen.getByText('Found 1,234,567 repositories for "javascript"')).toBeInTheDocument();
  });

  it('should handle different search types in messages', () => {
    const userStore = { ...mockStore, hasSearched: true, query: 'test', type: SEARCH_TYPES.USERS };

    render(<SearchResultsHeader store={userStore as any} totalCount={0} />);

    expect(screen.getByText('No users found for "test"')).toBeInTheDocument();
  });

  it('should pass correct filters to RepositoryFiltersComponent', () => {
    const storeWithResults = {
      ...mockStore,
      hasSearched: true,
      query: 'react',
      filters: {
        sort: 'forks',
        order: 'asc',
        language: 'TypeScript',
      },
    };

    render(<SearchResultsHeader store={storeWithResults as any} totalCount={10} />);

    const filtersElement = screen.getByTestId('repository-filters');
    expect(filtersElement).toHaveTextContent('"sort":"forks"');
    expect(filtersElement).toHaveTextContent('"order":"asc"');
    expect(filtersElement).toHaveTextContent('"language":"TypeScript"');
  });
});
