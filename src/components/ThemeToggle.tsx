'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  if (!mounted) return null; // prevents hydration mismatch

  return (
    <button
      onClick={toggleTheme}
      className='flex items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-900 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
