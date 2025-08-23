'use client';
import React, { useEffect, useState } from 'react';
import { GithubLogo } from '@phosphor-icons/react';

const GitHubButton = () => {
  const [stars, setStarCount] = useState<number | null>(null);
  const repoUrl = `https://github.com/fossuchennai/communities`;

  useEffect(() => {
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
      className='inline-flex items-center rounded-lg px-4 py-2 text-black transition-colors duration-200 hover:bg-black/5 dark:text-white dark:hover:bg-white/10'
    >
      <GithubLogo size={20} weight='fill' className='mr-2' />
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
