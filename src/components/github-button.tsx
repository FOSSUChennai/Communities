'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import githubIcon from '../../public/githubIcon.svg';
import githubIconDark from '../../public/githubIcon-dark.svg';
import { useTheme } from '../contexts/ThemeContext';

const GitHubButton = () => {
  const [stars, setStarCount] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const repoUrl = `https://github.com/fossuchennai/communities`;

  useEffect(() => {
    setMounted(true);
    fetchStars();
  }, []);

  const fetchStars = async () => {
    try {
      const response = await fetch(`https://api.github.com/repos/fossuchennai/communities`);
      if (!response.ok) {
        throw new Error('Failed to fetch repository data');
      }
      const data = await response.json();
      setStarCount(data.stargazers_count);
    } catch (error) {
      console.error('Error fetching star count:', error);
    }
  };

  return (
    <a
      href={repoUrl}
      target='_blank'
      rel='noopener noreferrer'
      className='inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--card-background)] px-4 py-2 text-[var(--foreground)] shadow transition duration-200 hover:bg-[var(--accent)]'
    >
      <Image
        src={mounted && theme === 'dark' ? githubIconDark : githubIcon}
        alt='Github star icon'
        className='mr-2 h-5 w-5'
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
