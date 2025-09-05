'use client';

import Link from 'next/link';
import { Home, Github } from 'lucide-react';
import { ROUTES } from '@/constants';

const NotFound = () => {
  return (
    <div className="min-h-screen-minus-navbar bg-background flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="relative mb-4">
            <div className="text-8xl font-bold text-primary/40 mb-4">404</div>
            <Github className="h-12 w-12 text-secondary absolute -top-8 right-39" />
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h1>

          <p className="text-secondary mb-6 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back to exploring GitHub repositories and users.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Link
            href={ROUTES?.SEARCH}
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
