'use client';

import Link from 'next/link';
import GitHubButton from '../github-button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import ThemeSwitch from '../ThemeSwitch';

export default function Header() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure theme is only applied after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid SSR mismatches
  }

  return (
    <nav
      className={`flex w-full items-center justify-between px-4 py-4 md:px-8 lg:px-16 ${theme === 'dark' ? 'bg-transparent text-white' : 'bg-[#fafafa] text-black'}`}
    >
      <Link href='/' className='flex h-full items-center text-xl font-semibold'>
        tamilnadu.tech
      </Link>
      <div className='flex h-full items-center space-x-4'>
        <GitHubButton />
        <ThemeSwitch />
      </div>
    </nav>
  );
}
