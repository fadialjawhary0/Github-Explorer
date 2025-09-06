'use client';

import React, { Suspense } from 'react';

import Spinner from '@/components/ui/Spinner';
import SearchPageContent from './components/SearchPageContent';

const SearchPage = () => {
  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage;
