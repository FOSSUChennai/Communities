'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import githubIcon from '../../public/githubIcon.svg';

const GitHubButton = () => {
  const [stars, setStarCount] = useState<number | null>(null);
  const repoUrl = `https://github.com/FOSSUChennai/Communities`;

  useEffect(() => {
    fetchStars();
  }, []);

  const fetchStars = async () => {
    try {
      const response = await fetch(`https://api.github.com/repos/FOSSUChennai/Communities`);
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
      className='inline-flex items-center rounded-lg bg-white px-4 py-2 text-black shadow dark:bg-gray-800 dark:text-white'
    >
      <Image
        src={githubIcon}
        alt='Github star icon'
        className='mr-2 h-5 w-5 rounded-full border border-black dark:border-white dark:invert'
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
