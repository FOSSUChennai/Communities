'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

type Theme = 'light' | 'dark';

function getSystemPrefersDark(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyThemeClass(theme: Theme): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  const [showPing, setShowPing] = useState(false);

  useEffect(() => {
    const stored = (typeof localStorage !== 'undefined' &&
      localStorage.getItem('theme')) as Theme | null;
    const initial: Theme = stored ?? (getSystemPrefersDark() ? 'dark' : 'light');
    setTheme(initial);
    applyThemeClass(initial);
  }, []);

  function toggleTheme() {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      applyThemeClass(next);
      if (typeof localStorage !== 'undefined') localStorage.setItem('theme', next);
      setShowPing(true);
      setTimeout(() => setShowPing(false), 300);
      return next;
    });
  }

  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      type='button'
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileTap={{ scale: 0.9 }}
      className='relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-transparent bg-transparent p-2 text-black transition-colors hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:hover:bg-white/10'
    >
      <AnimatePresence mode='wait' initial={false}>
        <motion.span
          key={isDark ? 'sun' : 'moon'}
          initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
          className='flex items-center justify-center'
        >
          {isDark ? <Sun size={20} weight='bold' /> : <Moon size={20} weight='bold' />}
        </motion.span>
      </AnimatePresence>
      {showPing && (
        <span className='pointer-events-none absolute inset-0 animate-ping rounded-lg bg-blue-500/20' />
      )}
    </motion.button>
  );
}
