'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Search, Github, Target } from 'lucide-react';
import { Select } from '@/components/ui';
import { SEARCH_TYPES, ROUTES } from '@/constants';
import { useDebounce } from '@/hooks/useDebounce';

import ThemeToggle from './ThemeToggle';
import { Tooltip } from 'react-tooltip';

interface NavbarProps {
  onSearch?: (query: string, type: typeof SEARCH_TYPES.REPOSITORIES | typeof SEARCH_TYPES.USERS, exactSearch: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<typeof SEARCH_TYPES.REPOSITORIES | typeof SEARCH_TYPES.USERS>(SEARCH_TYPES.REPOSITORIES);
  const [exactSearch, setExactSearch] = useState<boolean>(false);

  const debouncedQuery = useDebounce(searchQuery, 500);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as typeof SEARCH_TYPES.REPOSITORIES | typeof SEARCH_TYPES.USERS;
    setSearchType(newType);
  };

  useEffect(() => {
    if (debouncedQuery.trim() && onSearch) {
      onSearch(debouncedQuery.trim(), searchType, exactSearch);
    }
  }, [debouncedQuery, searchType, exactSearch]);

  const handleSearch = (e: React.FormEvent) => e.preventDefault();

  const handleExactSearch = () => setExactSearch(!exactSearch);

  return (
    <nav className="sticky top-2 mx-2 py-4 z-50 border border-border bg-navbar/70 backdrop-blur-sm rounded-lg">
      <div className="flex flex-col gap-2 justify-center items-center container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href={ROUTES?.SEARCH} className="flex items-center space-x-2">
              <Github className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">GitHub Explorer</span>
            </Link>
          </div>

          {/* theme toggle */}
          <ThemeToggle />
        </div>

        {/* search bar + type select */}
        <form onSubmit={handleSearch} className="flex justify-center items-center gap-4 w-full">
          <div className="relative w-full">
            <input
              className="h-10 w-full pr-3 pl-10 py-2 text-sm text-foreground placeholder:text-secondary transition-colors border rounded-md
                         focus:outline-none focus:ring-2 focus:ring-primary/20"
              type="text"
              placeholder={`Search ${searchType}...`}
              value={searchQuery}
              onChange={handleQueryChange}
            />

            <Search className="h-4 w-4 absolute left-3 top-3 text-secondary" />

            <div
              onClick={handleExactSearch}
              className="absolute right-3 top-3 cursor-pointer"
              data-tooltip-id="exact-search"
              data-tooltip-content={exactSearch ? 'Disable exact name match' : 'Enable exact name match'}
            >
              <Target className={`h-4 w-4  ${exactSearch ? 'text-green-500' : 'text-primary'}`} />
              <Tooltip id="exact-search" place="top" className="!bg-foreground !text-background !text-xs !rounded-md !px-2 !py-1 z-100" />
            </div>
          </div>

          <Select value={searchType} onChange={handleTypeChange} className="w-40">
            {Object.values(SEARCH_TYPES)?.map(type => (
              <option key={type} value={type}>
                {type?.charAt(0)?.toUpperCase() + type?.slice(1)}
              </option>
            ))}
          </Select>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
