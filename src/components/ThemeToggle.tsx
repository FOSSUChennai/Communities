'use client';

import React from 'react';
import { Sun, Moon } from '@phosphor-icons/react';
import { useTheme } from './ThemeProvider';

interface ThemeToggleProps {
  isScrolled?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isScrolled }) => {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <button
        className={`relative inline-flex items-center rounded-lg px-3 py-2 transition duration-200 ${
          isScrolled
            ? 'bg-black/5 text-black hover:bg-black/10 dark:bg-white/10 dark:text-white'
            : 'bg-white text-black shadow hover:bg-gray-100 dark:bg-white/10 dark:text-white'
        }`}
        style={{ width: '44px', height: '40px' }}
        aria-hidden='true'
        disabled
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center rounded-lg px-3 py-2 transition duration-200 ${
        isScrolled
          ? 'bg-black/5 text-black hover:bg-black/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'
          : 'bg-white text-black shadow hover:bg-gray-100 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'
      }`}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          theme === 'dark' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <Moon size={20} weight='bold' />
      </span>
      <span
        className={`flex items-center justify-center transition-all duration-300 ${
          theme === 'dark' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <Sun size={20} weight='bold' />
      </span>
    </button>
  );
};

export default ThemeToggle;
