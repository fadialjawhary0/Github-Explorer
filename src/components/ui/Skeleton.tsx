import React from 'react';
import { cn } from '@/utils/cn';

interface SkeletonProps {
  className?: string;
  backgroundColor?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className, backgroundColor = 'bg-muted' }) => {
  return <div className={cn('animate-pulse rounded-md', backgroundColor, className)} />;
};

export default Skeleton;
