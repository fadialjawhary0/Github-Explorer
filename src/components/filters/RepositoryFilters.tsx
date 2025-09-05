import React from 'react';
import { RepositoryFilters, SORT_OPTIONS, ORDER_OPTIONS, POPULAR_LANGUAGES } from '@/types/filters';
import { Select } from '../ui';
import { RotateCcw } from 'lucide-react';
import { Tooltip } from 'react-tooltip';

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
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-foreground">Sort by:</label>
        <Select value={filters.sort} onChange={e => handleSortChange(e.target.value as RepositoryFilters['sort'])} className="w-40">
          {SORT_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-foreground">Order:</label>
        <Select value={filters.order} onChange={e => handleOrderChange(e.target.value as RepositoryFilters['order'])} className="w-40">
          {ORDER_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-foreground">Language:</label>
        <Select value={filters.language} onChange={e => handleLanguageChange(e.target.value)} className="w-40">
          <option value="">All Languages</option>
          {POPULAR_LANGUAGES.map(language => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </Select>
      </div>
      <div data-tooltip-id="reset-filters" data-tooltip-content="Reset Filters">
        <RotateCcw className="w-5 h-5 text-blue-500 cursor-pointer" onClick={handleResetFilters} />
        <Tooltip id="reset-filters" className="!bg-foreground !text-background !text-xs !rounded-md !px-2 !py-1" />
      </div>
    </div>
  );
};

export default RepositoryFiltersComponent;
