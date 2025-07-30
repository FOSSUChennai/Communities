'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import githubIcon from '../../public/githubIcon.svg';

const GitHubButton = () => {
  const [stars, setStarCount] = useState<number | null>(null);
  const repoUrl = 'https://github.com/fossuchennai/communities';

  useEffect(() => {
    fetchStars();
  }, []);

  const fetchStars = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/fossuchennai/communities');
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
      className='text-black-800 dark:text-white-300 inline-flex items-center rounded-md bg-white px-3 py-1.5 text-sm font-medium transition hover:text-green-600 dark:bg-gray-800 dark:hover:text-green-400'
    >
      <Image src={githubIcon} alt='GitHub star icon' className='mr-2 h-5 w-5' />

      {/* Large screens: show full label */}
      <span className='hidden sm:inline'>
        {stars !== null ? `Contribute ${stars} ⭐` : 'Loading...'}
      </span>

      {/* Small screens: just stars */}
      <span className='sm:hidden'>{stars !== null ? `${stars} ⭐` : '...'}</span>
    </a>
  );
};

export default GitHubButton;
