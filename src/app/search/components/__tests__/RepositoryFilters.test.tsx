import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RepositoryFiltersComponent from '../RepositoryFilters';
import { RepositoryFilters } from '@/types/filters';

jest.mock('../../ui', () => ({
  Select: ({ children, value, onChange, className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) => (
    <select data-testid="select" value={value} onChange={onChange} className={className} {...props}>
      {children}
    </select>
  ),
}));

describe('RepositoryFilters Component', () => {
  const mockFilters: RepositoryFilters = {
    sort: 'stars',
    order: 'desc',
    language: 'JavaScript',
  };

  const mockOnFiltersChange = jest.fn();

  beforeEach(() => {
    mockOnFiltersChange.mockClear();
  });

  it('should render all filter controls', () => {
    render(<RepositoryFiltersComponent filters={mockFilters} onFiltersChange={mockOnFiltersChange} />);

    expect(screen.getByText('Sort by:')).toBeInTheDocument();
    expect(screen.getByText('Order:')).toBeInTheDocument();
    expect(screen.getByText('Language:')).toBeInTheDocument();
    expect(screen.getByText('Reset Filters')).toBeInTheDocument();
  });

  it('should display current filter values', () => {
    render(<RepositoryFiltersComponent filters={mockFilters} onFiltersChange={mockOnFiltersChange} />);

    const selects = screen.getAllByTestId('select');
    expect(selects[0]).toHaveValue('stars');
    expect(selects[1]).toHaveValue('desc');
    expect(selects[2]).toHaveValue('JavaScript');
  });

  it('should call onFiltersChange when sort changes', async () => {
    const user = userEvent.setup();
    render(<RepositoryFiltersComponent filters={mockFilters} onFiltersChange={mockOnFiltersChange} />);

    const sortSelect = screen.getAllByTestId('select')[0];
    await user.selectOptions(sortSelect, 'forks');

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...mockFilters,
      sort: 'forks',
    });
  });

  it('should call onFiltersChange when order changes', async () => {
    const user = userEvent.setup();
    render(<RepositoryFiltersComponent filters={mockFilters} onFiltersChange={mockOnFiltersChange} />);

    const orderSelect = screen.getAllByTestId('select')[1];
    await user.selectOptions(orderSelect, 'asc');

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...mockFilters,
      order: 'asc',
    });
  });

  it('should call onFiltersChange when language changes', async () => {
    const user = userEvent.setup();
    render(<RepositoryFiltersComponent filters={mockFilters} onFiltersChange={mockOnFiltersChange} />);

    const languageSelect = screen.getAllByTestId('select')[2];
    await user.selectOptions(languageSelect, 'TypeScript');

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...mockFilters,
      language: 'TypeScript',
    });
  });

  it('should reset filters when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<RepositoryFiltersComponent filters={mockFilters} onFiltersChange={mockOnFiltersChange} />);

    const resetButton = screen.getByText('Reset Filters');
    await user.click(resetButton);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      sort: 'stars',
      order: 'desc',
      language: '',
    });
  });

  it('should render all sort options', () => {
    render(<RepositoryFiltersComponent filters={mockFilters} onFiltersChange={mockOnFiltersChange} />);

    const sortSelect = screen.getAllByTestId('select')[0];
    const options = Array.from(sortSelect.children).map(option => option.textContent);

    expect(options).toContain('Stars');
    expect(options).toContain('Forks');
  });

  it('should render all order options', () => {
    render(<RepositoryFiltersComponent filters={mockFilters} onFiltersChange={mockOnFiltersChange} />);

    const orderSelect = screen.getAllByTestId('select')[1];
    const options = Array.from(orderSelect.children).map(option => option.textContent);

    expect(options).toContain('Descending');
    expect(options).toContain('Ascending');
  });

  it('should render language options including "All Languages"', () => {
    render(<RepositoryFiltersComponent filters={mockFilters} onFiltersChange={mockOnFiltersChange} />);

    const languageSelect = screen.getAllByTestId('select')[2];
    const options = Array.from(languageSelect.children).map(option => option.textContent);

    expect(options).toContain('All Languages');
    expect(options).toContain('JavaScript');
    expect(options).toContain('TypeScript');
    expect(options).toContain('Python');
  });

  it('should handle empty language filter', () => {
    const filtersWithEmptyLanguage = {
      ...mockFilters,
      language: '',
    };

    render(<RepositoryFiltersComponent filters={filtersWithEmptyLanguage} onFiltersChange={mockOnFiltersChange} />);

    const languageSelect = screen.getAllByTestId('select')[2];
    expect(languageSelect).toHaveValue('');
  });

  it('should apply responsive classes correctly', () => {
    render(<RepositoryFiltersComponent filters={mockFilters} onFiltersChange={mockOnFiltersChange} />);

    const container = screen.getByText('Sort by:').closest('div')?.parentElement?.parentElement;
    expect(container).toHaveClass('flex', 'flex-col', 'lg:flex-row', 'gap-3', 'lg:gap-4');
  });

  it('should render reset button with correct styling', () => {
    render(<RepositoryFiltersComponent filters={mockFilters} onFiltersChange={mockOnFiltersChange} />);

    const resetButton = screen.getByText('Reset Filters');
    expect(resetButton).toHaveClass('flex', 'items-center', 'gap-2', 'text-sm', 'border', 'rounded-md', 'px-4', 'py-2', 'cursor-pointer');
  });

  it('should render reset icon', () => {
    render(<RepositoryFiltersComponent filters={mockFilters} onFiltersChange={mockOnFiltersChange} />);

    const resetIcon = screen.getByTestId('rotate-ccw-icon');
    expect(resetIcon).toBeInTheDocument();
  });

  it('should handle multiple filter changes in sequence', async () => {
    const user = userEvent.setup();
    render(<RepositoryFiltersComponent filters={mockFilters} onFiltersChange={mockOnFiltersChange} />);

    const selects = screen.getAllByTestId('select');

    await user.selectOptions(selects[0], 'forks');
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...mockFilters,
      sort: 'forks',
    });

    await user.selectOptions(selects[1], 'asc');
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...mockFilters,
      order: 'asc',
    });

    await user.selectOptions(selects[2], 'Python');
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...mockFilters,
      language: 'Python',
    });
  });
});
