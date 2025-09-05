'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
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

  const getTooltip = () => {
    if (!mounted) return 'Switch theme';

    if (theme === 'light') return 'Switch to dark mode';
    if (theme === 'dark') return 'Switch to light mode';
  };

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer p-2 rounded-lg bg-card hover:bg-card-hover border border-border transition-colors duration-200 z-100 relative"
      title={getTooltip()}
    >
      {getIcon()}
    </button>
  );
};

export default ThemeToggle;
