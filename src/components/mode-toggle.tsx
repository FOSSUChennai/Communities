'use client';

import * as React from 'react';
import { Moon, Sun } from 'phosphor-react';
import { useTheme } from './theme-provider';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className='relative z-50 inline-flex cursor-pointer items-center justify-center'
    >
      <Sun
        weight='bold'
        className='absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all dark:scale-100 dark:text-white'
      />
      <Moon
        weight='bold'
        className='absolute h-[1.2rem] w-[1.2rem] transition-all dark:scale-0 dark:text-white'
      />
      <span className='sr-only'>Toggle theme</span>
    </button>
  );
}
