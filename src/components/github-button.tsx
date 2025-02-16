'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import githubIcon from '../../public/githubIcon.svg';
import githubIcons from '../../public/githubIcons.svg';
import { useTheme } from 'next-themes';

const GitHubButton = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<number | null>(null);

  const repoUrl = 'https://github.com/FOSSUChennai/Communities';

  // Prevent SSR mismatch by ensuring it mounts first
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch GitHub Stars after mounting
  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/FOSSUChennai/Communities`);
        if (!response.ok) throw new Error('Failed to fetch repository data');
        const data = await response.json();
        setStars(data.stargazers_count);
      } catch (error) {
        console.error('Error fetching star count:', error);
      }
    };

    fetchStars();
  }, []);

  if (!mounted) return null; // Avoid SSR mismatch

  return (
    <a
      href={repoUrl}
      target='_blank'
      rel='noopener noreferrer'
      className={`inline-flex items-center rounded-lg px-4 py-2 shadow transition duration-200 ${theme === 'dark' ? 'bg-transparent text-white' : 'bg-[#fafafa] text-black'}`}
    >
      <Image
        src={theme === 'dark' ? githubIcons : githubIcon}
        alt='Github star icon'
        width={20}
        height={20}
        className='mr-2'
      />
      <span className='hidden text-sm font-medium sm:inline'>
        {stars !== null ? `Contribute ${stars} ⭐` : 'Loading...'}
      </span>
      <span className='text-sm font-medium sm:hidden'>
        {stars !== null ? `${stars} ⭐` : 'Loading...'}
      </span>
    </a>
  );
};

export default GitHubButton;
