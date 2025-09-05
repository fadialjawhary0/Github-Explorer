import React from 'react';
import { RepositoryFilters, SORT_OPTIONS, ORDER_OPTIONS, POPULAR_LANGUAGES } from '@/types/filters';
import { Select } from '../ui';
import { RotateCcw } from 'lucide-react';

interface RepositoryFiltersProps {
  filters: RepositoryFilters;
  onFiltersChange: (filters: RepositoryFilters) => void;
}

const RepositoryFiltersComponent: React.FC<RepositoryFiltersProps> = ({ filters, onFiltersChange }) => {
  const handleSortChange = (sort: RepositoryFilters['sort']) => onFiltersChange({ ...filters, sort });
  const handleOrderChange = (order: RepositoryFilters['order']) => onFiltersChange({ ...filters, order });
  const handleLanguageChange = (language: string) => onFiltersChange({ ...filters, language });
  const handleResetFilters = () => onFiltersChange({ sort: 'stars', order: 'desc', language: '' });

  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
      <div className="flex flex-col md:flex-row gap-3 sm:gap-4 flex-1">
        <div className="flex flex-col md:flex-row md:items-center gap-2 min-w-0">
          <label className="text-sm font-medium text-foreground whitespace-nowrap">Sort by:</label>
          <Select value={filters.sort} onChange={e => handleSortChange(e.target.value as RepositoryFilters['sort'])} className="w-full md:w-40">
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2 min-w-0">
          <label className="text-sm font-medium text-foreground whitespace-nowrap">Order:</label>
          <Select value={filters.order} onChange={e => handleOrderChange(e.target.value as RepositoryFilters['order'])} className="w-full md:w-40">
            {ORDER_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2 min-w-0">
          <label className="text-sm font-medium text-foreground whitespace-nowrap">Language:</label>
          <Select value={filters.language} onChange={e => handleLanguageChange(e.target.value)} className="w-full md:w-40">
            <option value="">All Languages</option>
            {POPULAR_LANGUAGES.map(language => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex justify-start lg:justify-end">
        <button
          onClick={handleResetFilters}
          className="flex items-center gap-2 text-sm text-foreground hover:text-foreground/90
              border border-border bg-background hover:bg-button-hover hover:text-accent-foreground 
              rounded-md px-4 py-2 cursor-pointer transition-colors w-full md:w-auto md:min-w-32"
        >
          <RotateCcw className="w-4 h-4 text-blue-500" />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default RepositoryFiltersComponent;
