'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Tooltip } from 'react-tooltip';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const checkScrollable = () => {
      const isScrollable = document.documentElement.scrollHeight > window.innerHeight;
      if (!isScrollable) setIsVisible(false);
    };

    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('resize', checkScrollable);

    checkScrollable();
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('resize', checkScrollable);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'w-8 h-8 rounded-full',
        'cursor-pointer',
        'bg-blue-600/80 hover:bg-blue-600/90',
        'border border-blue-400/30 hover:border-blue-400/50',
        'text-white',
        'shadow-lg hover:shadow-xl',
        'backdrop-blur-sm',
        'transition-all duration-300 ease-in-out',
        'flex items-center justify-center',
        'group',
        'hover:scale-105 active:scale-95',
        'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2',
        'animate-bounce'
      )}
      style={{
        animationDuration: '3s',
        animationTimingFunction: 'ease-in-out',
      }}
      aria-label="Scroll to top"
      data-tooltip-id="scroll-to-top"
      data-tooltip-content="Scroll to top"
    >
      <ChevronUp className={cn('w-5 h-5 transition-transform duration-200', 'group-hover:-translate-y-1')} />
      <Tooltip id="scroll-to-top" className="!bg-foreground !text-background !text-xs !rounded-md !px-2 !py-1" />
    </button>
  );
};

export default ScrollToTop;
