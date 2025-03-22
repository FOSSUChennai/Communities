'use client';

import React from 'react';
import { useTheme } from './themeContext';
import { Moon, Sun } from '@phosphor-icons/react';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className='rounded-full p-2 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700'
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun size={24} weight='fill' className='text-yellow-400' />
      ) : (
        <Moon size={24} weight='fill' className='text-gray-600' />
      )}
    </button>
  );
};

export default ThemeToggle;
