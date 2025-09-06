import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/next';

import { ScrollToTop, Spinner } from '@/components/ui';

import Navbar from '@/components/layout/Navbar';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const Layout = ({ children }: { children: React.ReactNode }) => {
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
            <Navbar />
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
