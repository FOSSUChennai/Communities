'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import githubIcon from '../../public/githubIcon.svg';

const GitHubButton = ({ initialStars = null }: { initialStars?: number | null }) => {
  const [stars, setStarCount] = useState<number | null>(initialStars);
  const [isLoading, setIsLoading] = useState(initialStars === null);
  const repoUrl = `https://github.com/fossuchennai/communities`;

  useEffect(() => {
    if (initialStars !== null) return;
    fetchStars();
  }, [initialStars]);

  const fetchStars = async () => {
    try {
      const response = await fetch(`https://api.github.com/repos/fossuchennai/communities`);
      if (!response.ok) {
        throw new Error('Failed to fetch repository data');
      }
      const data = await response.json();
      setStarCount(data.stargazers_count);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching star count:', error);
      setIsLoading(false);
    }
  };

  return (
    <a
      href={repoUrl}
      target='_blank'
      rel='noopener noreferrer'
      className='inline-flex items-center rounded-lg px-4 py-2 text-black shadow transition duration-200'
    >
      <Image src={githubIcon} alt='Github star icon' className='mr-2 h-5 w-5' priority />
      <span className='hidden text-sm font-medium sm:inline' style={{ minWidth: '120px' }}>
        {isLoading ? (
          <span className='inline-block h-4 w-full animate-pulse rounded bg-gray-200'></span>
        ) : (
          `Contribute ${stars} ⭐`
        )}
      </span>
      <span className='text-sm font-medium sm:hidden' style={{ minWidth: '48px' }}>
        {isLoading ? (
          <span className='inline-block h-4 w-full animate-pulse rounded bg-gray-200'></span>
        ) : (
          `${stars} ⭐`
        )}
      </span>
    </a>
  );
};

export default GitHubButton;
