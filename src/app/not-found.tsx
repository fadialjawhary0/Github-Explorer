'use client';

import { Suspense } from 'react';
import NotFoundContent from '@/components/ui/NotFoundContent';
import { Loader2 } from 'lucide-react';

const NotFound = () => {
  const spinner = (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );

  return (
    <Suspense fallback={spinner}>
      <NotFoundContent />
    </Suspense>
  );
};

export default NotFound;
