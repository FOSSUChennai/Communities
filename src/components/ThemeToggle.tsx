'use client';

import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from '../contexts/ThemeContext';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        className='inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--card-background)] p-2 text-sm transition-all duration-200 hover:bg-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        aria-label='Theme toggle'
        disabled
      >
        <div className='h-5 w-5' /> {/* Placeholder to maintain layout */}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className='inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--card-background)] p-2 text-sm transition-all duration-200 hover:bg-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={20} className='text-[var(--foreground)]' />
      ) : (
        <Sun size={20} className='text-[var(--foreground)]' />
      )}
    </button>
  );
}
