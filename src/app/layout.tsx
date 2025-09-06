'use client';

import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Suspense } from 'react';
import { SEARCH_TYPES } from '@/constants';
import { searchStore } from '@/store';
import { Analytics } from '@vercel/analytics/next';

import Navbar from '@/components/layout/Navbar';
import { ScrollToTop } from '@/components/ui';
import Spinner from '@/components/ui/Spinner';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  const handleSearch = (query: string, type: typeof SEARCH_TYPES.REPOSITORIES | typeof SEARCH_TYPES.USERS, exactSearch: boolean) => {
    searchStore.setQuery(query);
    searchStore.setType(type);
    searchStore.setExactSearch(exactSearch);
  };

  const navbarFallback = (
    <div className="sticky top-2 mx-2 py-4 z-50 border border-border bg-navbar/70 backdrop-blur-sm rounded-lg">
      <Spinner size="md" />
    </div>
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="data-theme" defaultTheme="dark">
          <Suspense fallback={navbarFallback}>
            <Navbar onSearch={handleSearch} />
          </Suspense>
          {children}
          <ScrollToTop />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
};

export default Layout;
