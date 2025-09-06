'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Tooltip } from 'react-tooltip';

const ThemeToggle: React.FC = React.memo(() => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (!mounted) return <Sun className="h-5 w-5 text-yellow-500" />;

    if (theme === 'light') {
      return <Moon className="h-5 w-6 text-gray-600" />;
    } else {
      return <Sun className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div
      data-tooltip-id="theme-toggle"
      data-tooltip-content={mounted ? (theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode') : ''}
      onClick={toggleTheme}
      className="cursor-pointer p-2 rounded-lg bg-card hover:bg-card-hover border border-border transition-colors duration-200 z-100 relative"
    >
      {getIcon()}
      <Tooltip id="theme-toggle" className="!bg-foreground !text-background !text-xs !rounded-md !px-2 !py-1" />
    </div>
  );
});

ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle;
