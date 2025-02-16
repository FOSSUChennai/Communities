'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure theme is applied only after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent SSR hydration issues
  }

  return (
    <footer
      className={`flex w-full flex-1 items-center justify-center px-4 py-4 md:px-8 lg:px-16 ${
        theme === 'dark' ? 'bg-transparent text-gray-300' : 'bg-[#fafafa] text-black'
      }`}
    >
      <p className='mb-2 mt-16 text-center'>
        Made with luv from Hari and Justin 💚
        <a
          href='https://fossunited.org/c/chennai'
          className='ml-2 font-semibold text-[#03b051] hover:underline'
        >
          FOSS United Chennai
        </a>
      </p>
    </footer>
  );
}
