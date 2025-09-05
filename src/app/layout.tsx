'use client';

import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { SEARCH_TYPES } from '@/constants';
import { searchStore } from '@/store';

import Navbar from '@/components/layout/Navbar';
import { ScrollToTop } from '@/components/ui';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  const handleSearch = (query: string, type: typeof SEARCH_TYPES.REPOSITORIES | typeof SEARCH_TYPES.USERS, exactSearch: boolean) => {
    searchStore.setQuery(query);
    searchStore.setType(type);
    searchStore.setExactSearch(exactSearch);
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="data-theme" defaultTheme="dark">
          <Navbar onSearch={handleSearch} />
          {children}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
